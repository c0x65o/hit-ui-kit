'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
import { Breadcrumb } from './Breadcrumb';
import type { PageProps } from '../types';

export function Page({ title, description, actions, breadcrumbs, onNavigate, children }: PageProps) {
  const { colors, textStyles: ts, spacing } = useThemeTokens();

  return (
    <div style={styles({ display: 'flex', flexDirection: 'column', gap: spacing['2xl'] })}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} showHome={false} />
      )}
      {(title || actions) && (
        <div style={styles({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: breadcrumbs ? `-${spacing.lg}` : 0 })}>
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

