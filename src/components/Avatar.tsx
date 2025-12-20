'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index';
import { styles } from './utils';
import type { AvatarProps } from '../types';

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const { colors, textStyles: ts } = useThemeTokens();

  const sizeMap = {
    sm: { size: '2rem', fontSize: ts.bodySmall.fontSize },
    md: { size: '2.5rem', fontSize: ts.body.fontSize },
    lg: { size: '3rem', fontSize: ts.heading3.fontSize },
  };

  const sizeStyles = sizeMap[size];

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div style={styles({
      width: sizeStyles.size,
      height: sizeStyles.size,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${colors.primary.default}, ${colors.accent.default})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    })}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span style={styles({
          color: colors.text.inverse,
          fontSize: sizeStyles.fontSize,
          fontWeight: 500,
        })}>
          {initials || '?'}
        </span>
      )}
    </div>
  );
}

