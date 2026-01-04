'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
import type { SpacingTokens } from '../tokens/spacing';

export type RowGap = keyof SpacingTokens | number;

export interface RowProps {
  /** Gap between children. Can be a spacing token key or a number (px). */
  gap?: RowGap;
  /** Vertical alignment of children */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Horizontal distribution of children */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Whether children should wrap to new lines */
  wrap?: boolean;
  /** Whether to render as inline-flex */
  inline?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Optional className for escape hatch */
  className?: string;
  children: React.ReactNode;
}

const alignMap: Record<NonNullable<RowProps['align']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap: Record<NonNullable<RowProps['justify']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

/**
 * Row - Horizontal layout with consistent spacing
 * 
 * Replaces Tailwind's `flex gap-*` and `flex items-center` patterns.
 * 
 * @example
 * <Row gap="sm" align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Row>
 * 
 * @example
 * <Row gap="lg" justify="between">
 *   <Text>Left</Text>
 *   <Button>Right</Button>
 * </Row>
 */
export function Row({
  gap = 'sm',
  align,
  justify,
  wrap = false,
  inline = false,
  style: customStyle,
  className,
  children,
}: RowProps) {
  const { spacing } = useThemeTokens();

  const gapValue = typeof gap === 'number' 
    ? `${gap}px` 
    : (spacing as unknown as Record<string, string>)[gap] || gap;

  return (
    <div
      className={className}
      style={styles({
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: 'row',
        gap: gapValue,
        alignItems: align ? alignMap[align] : undefined,
        justifyContent: justify ? justifyMap[justify] : undefined,
        flexWrap: wrap ? 'wrap' : undefined,
        ...customStyle,
      })}
    >
      {children}
    </div>
  );
}
