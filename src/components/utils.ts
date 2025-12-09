/**
 * Utility functions for components
 */

/**
 * Combine class names, filtering out falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Create inline styles from theme tokens
 */
export function styles(obj: Record<string, string | number | undefined>): React.CSSProperties {
  const result: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as React.CSSProperties;
}

