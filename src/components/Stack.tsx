'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
import type { SpacingTokens } from '../tokens/spacing';

export type StackGap = keyof SpacingTokens | number;

export interface StackProps {
  /** Gap between children. Can be a spacing token key or a number (px). */
  gap?: StackGap;
  /** Horizontal alignment of children */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Vertical distribution of children */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Whether to render as inline-flex */
  inline?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Optional className for escape hatch */
  className?: string;
  children: React.ReactNode;
}

const alignMap: Record<NonNullable<StackProps['align']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyMap: Record<NonNullable<StackProps['justify']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

/**
 * Stack - Vertical layout with consistent spacing
 * 
 * Replaces Tailwind's `flex flex-col gap-*` and `space-y-*` patterns.
 * 
 * @example
 * <Stack gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Stack>
 * 
 * @example
 * <Stack gap={4} align="center">
 *   <Text>Centered text</Text>
 *   <Button>Action</Button>
 * </Stack>
 */
export function Stack({
  gap = 'md',
  align,
  justify,
  inline = false,
  style: customStyle,
  className,
  children,
}: StackProps) {
  const { spacing } = useThemeTokens();

  const gapValue = typeof gap === 'number' 
    ? `${gap}px` 
    : (spacing as unknown as Record<string, string>)[gap] || gap;

  return (
    <div
      className={className}
      style={styles({
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: 'column',
        gap: gapValue,
        alignItems: align ? alignMap[align] : undefined,
        justifyContent: justify ? justifyMap[justify] : undefined,
        ...customStyle,
      })}
    >
      {children}
    </div>
  );
}
