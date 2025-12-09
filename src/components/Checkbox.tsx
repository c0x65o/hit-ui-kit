'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useThemeTokens } from '../theme';
import { styles } from './utils';
import type { CheckboxProps } from '../types';

export function Checkbox({ label, checked, onChange, disabled }: CheckboxProps) {
  const { colors, radius, textStyles: ts, spacing } = useThemeTokens();

  return (
    <label style={styles({
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    })}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        style={styles({
          width: '1.25rem',
          height: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: checked ? colors.primary.default : colors.bg.elevated,
          border: `1px solid ${checked ? colors.primary.default : colors.border.default}`,
          borderRadius: radius.sm,
          transition: 'all 150ms ease',
        })}
      >
        {checked && <Check size={14} style={{ color: colors.text.inverse }} />}
      </div>
      {label && (
        <span style={styles({
          fontSize: ts.body.fontSize,
          color: colors.text.secondary,
        })}>
          {label}
        </span>
      )}
    </label>
  );
}

