'use client';

import React from 'react';
import { useThemeTokens } from '../theme/index';
import { styles } from './utils';
import type { TextAreaProps } from '../types';

export function TextArea({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  disabled,
  required,
}: TextAreaProps) {
  const { colors, radius, componentSpacing, textStyles: ts, spacing } = useThemeTokens();

  return (
    <div style={styles({ marginBottom: spacing.md })}>
      {label && (
        <label style={styles({
          display: 'block',
          fontSize: ts.label.fontSize,
          fontWeight: ts.label.fontWeight,
          color: colors.text.primary,
          marginBottom: spacing.xs,
        })}>
          {label}
          {required && <span style={{ color: colors.error.default, marginLeft: spacing.xs }}>*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        style={styles({
          width: '100%',
          padding: componentSpacing.input.paddingX,
          backgroundColor: colors.bg.elevated,
          border: `1px solid ${error ? colors.error.default : colors.border.default}`,
          borderRadius: radius.md,
          color: colors.text.primary,
          fontSize: ts.body.fontSize,
          outline: 'none',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          resize: 'vertical',
          boxSizing: 'border-box',
        })}
      />
      {error && (
        <p style={styles({
          marginTop: spacing.xs,
          fontSize: ts.bodySmall.fontSize,
          color: colors.error.default,
        })}>
          {error}
        </p>
      )}
    </div>
  );
}

