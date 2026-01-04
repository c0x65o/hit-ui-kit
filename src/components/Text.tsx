'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';

export interface TextProps {
  /** Text size variant */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text color variant */
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'error' | 'success' | 'warning' | 'info';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether text should truncate with ellipsis */
  truncate?: boolean;
  /** Whether text should not wrap */
  nowrap?: boolean;
  /** Whether to render as span (inline) instead of p (block) */
  inline?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Optional className for escape hatch */
  className?: string;
  /** HTML element to render as */
  as?: 'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'em';
  children: React.ReactNode;
}

const sizeMap: Record<NonNullable<TextProps['size']>, { fontSize: string; lineHeight: string }> = {
  xs: { fontSize: '0.75rem', lineHeight: '1rem' },      // 12px
  sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },  // 14px
  base: { fontSize: '1rem', lineHeight: '1.5rem' },     // 16px
  lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },  // 18px
  xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },   // 20px
  '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },    // 24px
  '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' }, // 30px
};

const weightMap: Record<NonNullable<TextProps['weight']>, number> = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

/**
 * Text - Typography with consistent sizing and colors
 * 
 * Replaces Tailwind's `text-sm font-medium text-muted-foreground` patterns.
 * 
 * @example
 * <Text size="sm" color="muted">Helper text</Text>
 * 
 * @example
 * <Text size="2xl" weight="bold">Page Title</Text>
 * 
 * @example
 * <Text size="base" truncate>This is a very long text that will be truncated...</Text>
 */
export function Text({
  size = 'base',
  weight = 'normal',
  color = 'primary',
  align,
  truncate = false,
  nowrap = false,
  inline = false,
  style: customStyle,
  className,
  as,
  children,
}: TextProps) {
  const { colors } = useThemeTokens();

  // Resolve color
  let textColor: string;
  switch (color) {
    case 'primary':
      textColor = colors.text.primary;
      break;
    case 'secondary':
      textColor = colors.text.secondary;
      break;
    case 'muted':
      textColor = colors.text.muted;
      break;
    case 'inverse':
      textColor = colors.text.inverse;
      break;
    case 'error':
      textColor = colors.error.default;
      break;
    case 'success':
      textColor = colors.success.default;
      break;
    case 'warning':
      textColor = colors.warning.default;
      break;
    case 'info':
      textColor = colors.info.default;
      break;
    default:
      textColor = colors.text.primary;
  }

  const sizeStyle = sizeMap[size];
  const fontWeight = weightMap[weight];

  // Determine element
  const Component = as || (inline ? 'span' : 'p');

  return (
    <Component
      className={className}
      style={styles({
        fontSize: sizeStyle.fontSize,
        lineHeight: sizeStyle.lineHeight,
        fontWeight,
        color: textColor,
        textAlign: align,
        margin: Component === 'p' ? 0 : undefined,
        overflow: truncate ? 'hidden' : undefined,
        textOverflow: truncate ? 'ellipsis' : undefined,
        whiteSpace: truncate || nowrap ? 'nowrap' : undefined,
        ...customStyle,
      })}
    >
      {children}
    </Component>
  );
}

/**
 * Heading - Semantic heading with consistent styling
 * 
 * @example
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2}>Section Title</Heading>
 */
export interface HeadingProps {
  /** Heading level (1-6) */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** Override visual size (defaults to match level) */
  size?: TextProps['size'];
  /** Font weight (defaults to bold for h1-h2, semibold for h3-h6) */
  weight?: TextProps['weight'];
  /** Text color */
  color?: TextProps['color'];
  /** Text alignment */
  align?: TextProps['align'];
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Optional className */
  className?: string;
  children: React.ReactNode;
}

const levelDefaults: Record<number, { size: TextProps['size']; weight: TextProps['weight'] }> = {
  1: { size: '3xl', weight: 'bold' },
  2: { size: '2xl', weight: 'bold' },
  3: { size: 'xl', weight: 'semibold' },
  4: { size: 'lg', weight: 'semibold' },
  5: { size: 'base', weight: 'semibold' },
  6: { size: 'sm', weight: 'semibold' },
};

export function Heading({
  level,
  size,
  weight,
  color = 'primary',
  align,
  style,
  className,
  children,
}: HeadingProps) {
  const defaults = levelDefaults[level];
  const tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <Text
      as={tag}
      size={size || defaults.size}
      weight={weight || defaults.weight}
      color={color}
      align={align}
      style={style}
      className={className}
    >
      {children}
    </Text>
  );
}
