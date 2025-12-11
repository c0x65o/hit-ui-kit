'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Full-screen centered layout for auth pages (login, signup, etc.)
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  const { colors, spacing } = useThemeTokens();

  return (
    <div style={styles({
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg.page,
      padding: spacing.lg,
      overflow: 'auto',
    })}>
      {children}
    </div>
  );
}

