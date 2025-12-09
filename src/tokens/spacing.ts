/**
 * Design Tokens: Spacing
 * 
 * Consistent spacing scale for margins, padding, and gaps.
 * Based on a 4px base unit.
 */

export interface SpacingTokens {
  /** 0px */
  none: string;
  /** 2px */
  px: string;
  /** 4px - 0.25rem */
  xs: string;
  /** 8px - 0.5rem */
  sm: string;
  /** 12px - 0.75rem */
  md: string;
  /** 16px - 1rem */
  lg: string;
  /** 20px - 1.25rem */
  xl: string;
  /** 24px - 1.5rem */
  '2xl': string;
  /** 32px - 2rem */
  '3xl': string;
  /** 40px - 2.5rem */
  '4xl': string;
  /** 48px - 3rem */
  '5xl': string;
  /** 64px - 4rem */
  '6xl': string;
}

export const spacing: SpacingTokens = {
  none: '0',
  px: '2px',
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
  '4xl': '2.5rem', // 40px
  '5xl': '3rem',   // 48px
  '6xl': '4rem',   // 64px
};

/**
 * Component-specific spacing presets
 */
export interface ComponentSpacing {
  card: {
    padding: string;
    gap: string;
  };
  input: {
    paddingX: string;
    paddingY: string;
    height: string;
    heightSm: string;
  };
  button: {
    paddingX: string;
    paddingY: string;
    height: string;
    heightSm: string;
    gap: string;
  };
  modal: {
    padding: string;
  };
  page: {
    padding: string;
    gap: string;
    maxWidth: string;
  };
}

export const componentSpacing: ComponentSpacing = {
  card: {
    padding: '1.5rem', // 24px
    gap: '1rem',       // 16px
  },
  input: {
    paddingX: '0.75rem', // 12px
    paddingY: '0.5rem',  // 8px
    height: '2.25rem',   // 36px
    heightSm: '2rem',    // 32px
  },
  button: {
    paddingX: '1rem',    // 16px
    paddingY: '0.5rem',  // 8px
    height: '2.25rem',   // 36px
    heightSm: '2rem',    // 32px
    gap: '0.5rem',       // 8px
  },
  modal: {
    padding: '1.5rem', // 24px
  },
  page: {
    padding: '1.5rem',   // 24px
    gap: '1.5rem',       // 24px
    maxWidth: '80rem',   // 1280px
  },
};

