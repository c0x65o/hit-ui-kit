'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Compact form input for auth forms.
 * Includes password visibility toggle.
 */
export function FormInput({
  label,
  error,
  type = 'text',
  className,
  onChange,
  ...props
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const { colors, radius, textStyles: ts, spacing } = useThemeTokens();

  return (
    <div style={styles({ marginBottom: spacing.md })}>
      {label && (
        <label style={styles({
          display: 'block',
          fontSize: ts.bodySmall.fontSize,
          fontWeight: ts.label.fontWeight,
          marginBottom: spacing.xs,
          color: colors.text.primary,
        })}>
          {label}
        </label>
      )}
      <div style={styles({ position: 'relative', width: '100%' })}>
        <input
          type={isPassword && showPassword ? 'text' : type}
          onChange={onChange}
          style={styles({
            width: '100%',
            height: '2.25rem',
            paddingLeft: spacing.md,
            paddingRight: isPassword ? '2.5rem' : spacing.md,
            backgroundColor: colors.bg.elevated,
            border: `1px solid ${error ? colors.error.default : colors.border.default}`,
            borderRadius: radius.md,
            color: colors.text.primary,
            fontSize: ts.body.fontSize,
            outline: 'none',
            boxSizing: 'border-box',
          })}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            style={styles({
              position: 'absolute',
              right: spacing.sm,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.75rem',
              height: '1.75rem',
              padding: 0,
              background: 'transparent',
              border: 'none',
              borderRadius: radius.sm,
              color: colors.text.muted,
              cursor: 'pointer',
            })}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p style={styles({
          marginTop: spacing.xs,
          fontSize: ts.bodySmall.fontSize,
          fontWeight: ts.label.fontWeight,
          color: colors.error.default,
        })}>
          {error}
        </p>
      )}
    </div>
  );
}

