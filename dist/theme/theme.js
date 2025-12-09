'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { darkColors, lightColors } from '../tokens/colors';
import { spacing, componentSpacing } from '../tokens/spacing';
import { typography, textStyles } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { shadows, darkShadows } from '../tokens/shadows';
/**
 * Dark theme
 */
export const darkTheme = {
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
export const lightTheme = {
    name: 'light',
    colors: lightColors,
    spacing,
    componentSpacing,
    typography,
    textStyles,
    radius,
    shadows,
};
const ThemeContext = createContext(null);
/**
 * Hook to access the current theme
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
/**
 * Hook to get just the theme object (shorthand)
 */
export function useThemeTokens() {
    return useTheme().theme;
}
/**
 * Theme Provider Component
 */
export function ThemeProvider({ children, defaultTheme = 'dark', storageKey = 'hit-ui-theme', }) {
    const [themeName, setThemeName] = useState(defaultTheme);
    // Load theme from storage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(storageKey);
            if (stored === 'dark' || stored === 'light') {
                setThemeName(stored);
            }
        }
    }, [storageKey]);
    // Update document attributes when theme changes
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', themeName);
            if (themeName === 'dark') {
                document.documentElement.classList.add('dark');
            }
            else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [themeName]);
    const setTheme = useCallback((name) => {
        setThemeName(name);
        if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, name);
        }
    }, [storageKey]);
    const toggleTheme = useCallback(() => {
        setTheme(themeName === 'dark' ? 'light' : 'dark');
    }, [themeName, setTheme]);
    const theme = themeName === 'dark' ? darkTheme : lightTheme;
    const value = {
        theme,
        setTheme,
        toggleTheme,
    };
    return React.createElement(ThemeContext.Provider, { value }, children);
}
//# sourceMappingURL=theme.js.map