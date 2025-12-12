'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ColorTokens } from '../tokens/colors';
import { darkColors, lightColors } from '../tokens/colors';
import { spacing, componentSpacing } from '../tokens/spacing';
import { typography, textStyles } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { shadows, darkShadows } from '../tokens/shadows';

/**
 * Complete theme object with all design tokens
 */
export interface Theme {
  name: 'dark' | 'light';
  colors: ColorTokens;
  spacing: typeof spacing;
  componentSpacing: typeof componentSpacing;
  typography: typeof typography;
  textStyles: typeof textStyles;
  radius: typeof radius;
  shadows: typeof shadows;
}

/**
 * Dark theme
 */
export const darkTheme: Theme = {
  name: 'dark',
  colors: darkColors,
  spacing,
  componentSpacing,
  typography,
  textStyles,
  radius,
  shadows: darkShadows,
};

/**
 * Light theme
 */
export const lightTheme: Theme = {
  name: 'light',
  colors: lightColors,
  spacing,
  componentSpacing,
  typography,
  textStyles,
  radius,
  shadows,
};

/**
 * Theme context
 */
interface ThemeContextValue {
  theme: Theme;
  setTheme: (name: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Check if we're inside a ThemeProvider (without throwing)
 */
export function useThemeContext(): ThemeContextValue | null {
  return useContext(ThemeContext);
}

/**
 * Hook to access the current theme
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get just the theme object (shorthand)
 */
export function useThemeTokens(): Theme {
  return useTheme().theme;
}

/**
 * Deep partial type for color overrides
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Merge color overrides into base colors
 */
function mergeColors(base: ColorTokens, overrides?: DeepPartial<ColorTokens>): ColorTokens {
  if (!overrides) return base;
  
  return {
    bg: { ...base.bg, ...overrides.bg },
    border: { ...base.border, ...overrides.border },
    text: { ...base.text, ...overrides.text },
    primary: { ...base.primary, ...overrides.primary },
    secondary: { ...base.secondary, ...overrides.secondary },
    accent: { ...base.accent, ...overrides.accent },
    success: { ...base.success, ...overrides.success },
    warning: { ...base.warning, ...overrides.warning },
    error: { ...base.error, ...overrides.error },
    info: { ...base.info, ...overrides.info },
  };
}

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'dark' | 'light';
  /** Storage key for persisting theme preference */
  storageKey?: string;
  /** Custom color overrides (applied to both light and dark themes) */
  colorOverrides?: DeepPartial<ColorTokens>;
  /** Custom color overrides for dark theme only */
  darkColorOverrides?: DeepPartial<ColorTokens>;
  /** Custom color overrides for light theme only */
  lightColorOverrides?: DeepPartial<ColorTokens>;
}

/**
 * Get the default theme from config or DOM
 * Used for SSR-safe theme initialization
 */
export function getConfiguredTheme(): 'light' | 'dark' {
  // First check DOM (set by blocking script) - most reliable
  if (typeof document !== 'undefined') {
    if (document.documentElement.classList.contains('dark')) return 'dark';
    if (document.documentElement.getAttribute('data-theme') === 'dark') return 'dark';
    if (document.documentElement.getAttribute('data-theme') === 'light') return 'light';
  }
  
  // Then check window config
  if (typeof window !== 'undefined') {
    const win = window as unknown as { __HIT_CONFIG?: { branding?: { defaultTheme?: string } } };
    const theme = win.__HIT_CONFIG?.branding?.defaultTheme;
    if (theme === 'dark') return 'dark';
    if (theme === 'light') return 'light';
    // Handle 'system' - check OS preference
    if (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  // Default to light (safer for SSR - matches most apps)
  return 'light';
}

/**
 * Theme Provider Component
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'hit-ui-theme',
  colorOverrides,
  darkColorOverrides,
  lightColorOverrides,
}: ThemeProviderProps): React.ReactElement {
  // Initialize from DOM first (set by blocking script in layout.tsx) to prevent flash.
  // Falls back to localStorage, then defaultTheme.
  const [themeName, setThemeName] = useState<'dark' | 'light'>(() => {
    // On client, read what the blocking script already set to avoid flash
    if (typeof document !== 'undefined') {
      const domTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      return domTheme;
    }
    // SSR fallback: check localStorage if available (it won't be on server)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    }
    return defaultTheme;
  });

  // Sync with localStorage on mount (in case DOM and localStorage are out of sync)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'dark' || stored === 'light') {
        // Only update if different from current state
        if (stored !== themeName) {
          setThemeName(stored);
        }
      }
    }
  }, [storageKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update document attributes when theme changes (skip initial if already correct)
  const isInitialMount = React.useRef(true);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Skip on initial mount if DOM already has correct theme (set by blocking script)
      const currentDomTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      if (isInitialMount.current && currentDomTheme === themeName) {
        isInitialMount.current = false;
        return;
      }
      isInitialMount.current = false;
      
      document.documentElement.setAttribute('data-theme', themeName);
      if (themeName === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [themeName]);

  const setTheme = useCallback((name: 'dark' | 'light') => {
    setThemeName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, name);
    }
  }, [storageKey]);

  const toggleTheme = useCallback(() => {
    setTheme(themeName === 'dark' ? 'light' : 'dark');
  }, [themeName, setTheme]);

  // Build theme with color overrides
  const theme: Theme = React.useMemo(() => {
    const baseTheme = themeName === 'dark' ? darkTheme : lightTheme;
    const themeSpecificOverrides = themeName === 'dark' ? darkColorOverrides : lightColorOverrides;
    
    // Merge: base colors -> global overrides -> theme-specific overrides
    const mergedColors = mergeColors(
      mergeColors(baseTheme.colors, colorOverrides),
      themeSpecificOverrides
    );
    
    return {
      ...baseTheme,
      colors: mergedColors,
    };
  }, [themeName, colorOverrides, darkColorOverrides, lightColorOverrides]);

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
  };

  return React.createElement(ThemeContext.Provider, { value }, children);
}

/**
 * Conditional Theme Provider
 * 
 * Only wraps with ThemeProvider if there's no parent ThemeProvider.
 * This prevents SSR hydration mismatches when used inside an app that
 * already provides theme context.
 * 
 * Use this in feature pack components that need to work both:
 * - Standalone (provides its own theme)
 * - Inside an app with an existing ThemeProvider (uses parent theme)
 */
interface ConditionalThemeProviderProps {
  children: React.ReactNode;
  /** Fallback theme if no parent provider and can't detect from DOM/config */
  fallbackTheme?: 'dark' | 'light';
}

export function ConditionalThemeProvider({
  children,
  fallbackTheme = 'light',
}: ConditionalThemeProviderProps): React.ReactElement {
  const parentTheme = useThemeContext();
  
  // If we're already inside a ThemeProvider, just render children
  if (parentTheme) {
    return <>{children}</>;
  }
  
  // No parent provider - wrap with our own, using smart defaults
  const detectedTheme = getConfiguredTheme();
  return (
    <ThemeProvider defaultTheme={detectedTheme || fallbackTheme}>
      {children}
    </ThemeProvider>
  );
}

