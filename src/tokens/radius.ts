/**
 * Design Tokens: Border Radius
 * 
 * Consistent border radius values for components.
 */

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export const radius: RadiusTokens = {
  none: '0',
  sm: '0.25rem',  // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem',   // 8px
  xl: '0.75rem',  // 12px
  full: '9999px',
};

