'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
import type { PageProps } from '../types';

export function Page({ title, description, actions, children }: PageProps) {
  const { colors, textStyles: ts, spacing } = useThemeTokens();

  return (
    <div style={styles({ display: 'flex', flexDirection: 'column', gap: spacing['2xl'] })}>
      {(title || actions) && (
        <div style={styles({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
          <div>
            {title && (
              <h1 style={styles({
                fontSize: ts.heading1.fontSize,
                fontWeight: ts.heading1.fontWeight,
                lineHeight: ts.heading1.lineHeight,
                letterSpacing: ts.heading1.letterSpacing,
                color: colors.text.primary,
                margin: 0,
              })}>
                {title}
              </h1>
            )}
            {description && (
              <p style={styles({
                marginTop: spacing.xs,
                fontSize: ts.body.fontSize,
                color: colors.text.secondary,
                margin: title ? `${spacing.xs} 0 0 0` : 0,
              })}>
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div style={styles({ display: 'flex', alignItems: 'center', gap: spacing.md })}>
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

