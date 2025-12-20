'use client';

import React from 'react';
import { FileQuestion } from 'lucide-react';
import { useThemeTokens } from '../theme/index';
import { styles } from './utils';
import type { EmptyStateProps } from '../types';

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  const { colors, textStyles: ts, spacing } = useThemeTokens();

  return (
    <div style={styles({
      textAlign: 'center',
      padding: spacing['5xl'],
    })}>
      <div style={styles({
        display: 'flex',
        justifyContent: 'center',
        marginBottom: spacing.lg,
        color: colors.text.muted,
      })}>
        {icon || <FileQuestion size={48} />}
      </div>
      <h3 style={styles({
        fontSize: ts.heading2.fontSize,
        fontWeight: ts.heading2.fontWeight,
        color: colors.text.primary,
        margin: 0,
      })}>
        {title}
      </h3>
      {description && (
        <p style={styles({
          marginTop: spacing.sm,
          fontSize: ts.body.fontSize,
          color: colors.text.muted,
        })}>
          {description}
        </p>
      )}
      {action && (
        <div style={styles({ marginTop: spacing.lg })}>
          {action}
        </div>
      )}
    </div>
  );
}

