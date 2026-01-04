'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
import type { SpacingTokens } from '../tokens/spacing';

export type GridGap = keyof SpacingTokens | number;

export interface GridProps {
  /** Number of columns. Can be a number or responsive object. */
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap between grid items. Can be a spacing token key or a number (px). */
  gap?: GridGap;
  /** Row gap (overrides gap for rows) */
  rowGap?: GridGap;
  /** Column gap (overrides gap for columns) */
  colGap?: GridGap;
  /** Horizontal alignment of items within cells */
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  /** Vertical alignment of items within cells */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Optional className for escape hatch */
  className?: string;
  children: React.ReactNode;
}

const alignMap: Record<NonNullable<GridProps['alignItems']>, string> = {
  start: 'start',
  center: 'center',
  end: 'end',
  stretch: 'stretch',
};

/**
 * Grid - CSS Grid layout with consistent spacing
 * 
 * Replaces Tailwind's `grid grid-cols-* gap-*` patterns.
 * 
 * @example
 * <Grid cols={3} gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 * 
 * @example
 * <Grid cols={7} gap="md" alignItems="center">
 *   <Text>Col 1</Text>
 *   <Text>Col 2</Text>
 *   ...
 * </Grid>
 */
export function Grid({
  cols = 1,
  gap = 'md',
  rowGap,
  colGap,
  alignItems,
  justifyItems,
  style: customStyle,
  className,
  children,
}: GridProps) {
  const { spacing } = useThemeTokens();

  const resolveGap = (g: GridGap | undefined): string | undefined => {
    if (g === undefined) return undefined;
    if (typeof g === 'number') return `${g}px`;
    return (spacing as unknown as Record<string, string>)[g] || g;
  };

  const gapValue = resolveGap(gap);
  const rowGapValue = resolveGap(rowGap);
  const colGapValue = resolveGap(colGap);

  // For now, we only support simple number cols (responsive would need CSS media queries or JS)
  const colCount = typeof cols === 'number' ? cols : cols.md || cols.sm || 1;
  const gridTemplateColumns = `repeat(${colCount}, minmax(0, 1fr))`;

  return (
    <div
      className={className}
      style={styles({
        display: 'grid',
        gridTemplateColumns,
        gap: !rowGapValue && !colGapValue ? gapValue : undefined,
        rowGap: rowGapValue,
        columnGap: colGapValue,
        alignItems: alignItems ? alignMap[alignItems] : undefined,
        justifyItems: justifyItems ? alignMap[justifyItems] : undefined,
        ...customStyle,
      })}
    >
      {children}
    </div>
  );
}

/**
 * GridItem - Control individual grid item placement
 */
export interface GridItemProps {
  /** Number of columns to span */
  colSpan?: number;
  /** Number of rows to span */
  rowSpan?: number;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Optional className for escape hatch */
  className?: string;
  children: React.ReactNode;
}

export function GridItem({
  colSpan,
  rowSpan,
  style: customStyle,
  className,
  children,
}: GridItemProps) {
  return (
    <div
      className={className}
      style={styles({
        gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : undefined,
        gridRow: rowSpan ? `span ${rowSpan} / span ${rowSpan}` : undefined,
        ...customStyle,
      })}
    >
      {children}
    </div>
  );
}
