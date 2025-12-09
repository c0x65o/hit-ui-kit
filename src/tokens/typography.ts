/**
 * Design Tokens: Typography
 * 
 * Font families, sizes, weights, and line heights.
 */

export interface TypographyTokens {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: string;    // 12px
    sm: string;    // 14px
    base: string;  // 16px
    lg: string;    // 18px
    xl: string;    // 20px
    '2xl': string; // 24px
    '3xl': string; // 30px
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

export const typography: TypographyTokens = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.05em',
  },
};

/**
 * Preset text styles for common use cases
 */
export interface TextStyles {
  heading1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
    letterSpacing: string;
  };
  heading2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  heading3: {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  body: {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  bodySmall: {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  caption: {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
  label: {
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
  };
}

export const textStyles: TextStyles = {
  heading1: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  heading2: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
  },
  heading3: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.tight,
  },
  body: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
};

