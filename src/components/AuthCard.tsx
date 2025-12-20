'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index';
import { styles } from './utils';

export interface AuthCardProps {
  children: React.ReactNode;
  /** Max width of the card. Default: 380px */
  maxWidth?: string;
}

/**
 * Compact card for auth forms (login, signup, forgot password, etc.)
 */
export function AuthCard({ children, maxWidth = '380px' }: AuthCardProps) {
  const { colors, radius, shadows, spacing } = useThemeTokens();

  return (
    <div style={styles({
      width: '100%',
      maxWidth,
      padding: spacing['2xl'],
      backgroundColor: colors.bg.surface,
      border: `1px solid ${colors.border.subtle}`,
      borderRadius: radius.xl,
      boxShadow: shadows.lg,
    })}>
      {children}
    </div>
  );
}

