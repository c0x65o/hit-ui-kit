'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
import type { SpacingTokens } from '../tokens/spacing';

export type BoxSpacing = keyof SpacingTokens | number;

export interface BoxProps {
  /** Padding on all sides */
  p?: BoxSpacing;
  /** Horizontal padding */
  px?: BoxSpacing;
  /** Vertical padding */
  py?: BoxSpacing;
  /** Top padding */
  pt?: BoxSpacing;
  /** Right padding */
  pr?: BoxSpacing;
  /** Bottom padding */
  pb?: BoxSpacing;
  /** Left padding */
  pl?: BoxSpacing;
  /** Margin on all sides */
  m?: BoxSpacing;
  /** Horizontal margin */
  mx?: BoxSpacing;
  /** Vertical margin */
  my?: BoxSpacing;
  /** Top margin */
  mt?: BoxSpacing;
  /** Right margin */
  mr?: BoxSpacing;
  /** Bottom margin */
  mb?: BoxSpacing;
  /** Left margin */
  ml?: BoxSpacing;
  /** Background color token */
  bg?: 'page' | 'surface' | 'elevated' | 'muted';
  /** Border style */
  border?: boolean | 'subtle' | 'default' | 'strong';
  /** Border radius token */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether the box takes full width */
  fullWidth?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Optional className for escape hatch */
  className?: string;
  /** HTML element to render as */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav';
  children?: React.ReactNode;
}

/**
 * Box - Container with spacing, background, and border
 * 
 * Replaces Tailwind's `p-* m-* bg-* rounded-* border` patterns.
 * 
 * @example
 * <Box p="lg" bg="surface" rounded="lg" border>
 *   <Text>Card-like content</Text>
 * </Box>
 * 
 * @example
 * <Box px="xl" py="md" mt="lg">
 *   <Stack gap="sm">...</Stack>
 * </Box>
 */
export function Box({
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  bg,
  border,
  rounded,
  fullWidth,
  style: customStyle,
  className,
  as: Component = 'div',
  children,
}: BoxProps) {
  const { spacing, colors, radius } = useThemeTokens();

  const resolveSpacing = (s: BoxSpacing | undefined): string | undefined => {
    if (s === undefined) return undefined;
    if (typeof s === 'number') return `${s}px`;
    return (spacing as unknown as Record<string, string>)[s] || s;
  };

  // Resolve padding
  const pAll = resolveSpacing(p);
  const pxVal = resolveSpacing(px);
  const pyVal = resolveSpacing(py);
  const ptVal = resolveSpacing(pt);
  const prVal = resolveSpacing(pr);
  const pbVal = resolveSpacing(pb);
  const plVal = resolveSpacing(pl);

  const paddingTop = ptVal || pyVal || pAll;
  const paddingRight = prVal || pxVal || pAll;
  const paddingBottom = pbVal || pyVal || pAll;
  const paddingLeft = plVal || pxVal || pAll;

  // Resolve margin
  const mAll = resolveSpacing(m);
  const mxVal = resolveSpacing(mx);
  const myVal = resolveSpacing(my);
  const mtVal = resolveSpacing(mt);
  const mrVal = resolveSpacing(mr);
  const mbVal = resolveSpacing(mb);
  const mlVal = resolveSpacing(ml);

  const marginTop = mtVal || myVal || mAll;
  const marginRight = mrVal || mxVal || mAll;
  const marginBottom = mbVal || myVal || mAll;
  const marginLeft = mlVal || mxVal || mAll;

  // Resolve background
  const bgColor = bg ? colors.bg[bg] : undefined;

  // Resolve border
  let borderStyle: string | undefined;
  if (border === true || border === 'default') {
    borderStyle = `1px solid ${colors.border.default}`;
  } else if (border === 'subtle') {
    borderStyle = `1px solid ${colors.border.subtle}`;
  } else if (border === 'strong') {
    borderStyle = `1px solid ${colors.border.strong}`;
  }

  // Resolve border radius
  const borderRadius = rounded ? (radius as unknown as Record<string, string>)[rounded] : undefined;

  return (
    <Component
      className={className}
      style={styles({
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        backgroundColor: bgColor,
        border: borderStyle,
        borderRadius,
        width: fullWidth ? '100%' : undefined,
        ...customStyle,
      })}
    >
      {children}
    </Component>
  );
}
