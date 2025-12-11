'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useThemeTokens } from '../theme/index.js';
import type { SpinnerProps } from '../types';

export function Spinner({ size = 'md' }: SpinnerProps) {
  const { colors } = useThemeTokens();

  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  return (
    <Loader2
      size={sizeMap[size]}
      style={{
        color: colors.primary.default,
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}

