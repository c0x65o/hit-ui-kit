'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
import type { SelectProps } from '../types';

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  required,
  style,
}: SelectProps) {
  const { colors, radius, componentSpacing, textStyles: ts, spacing, shadows } = useThemeTokens();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : (placeholder || '');

  return (
    <div ref={containerRef} style={styles({ marginBottom: spacing.md, position: 'relative', ...style })}>
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
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={disabled}
        style={styles({
          width: '100%',
          height: componentSpacing.input.height,
          padding: `0 ${componentSpacing.input.paddingX}`,
          paddingRight: spacing.md,
          backgroundColor: colors.bg.elevated,
          border: `1px solid ${error ? colors.error.default : (hovered && !disabled ? colors.primary.default : colors.border.default)}`,
          borderRadius: radius.md,
          color: selectedOption ? colors.text.primary : colors.text.muted,
          fontSize: ts.body.fontSize,
          outline: 'none',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          transition: 'border-color 150ms ease',
        })}
      >
        <span>{displayValue}</span>
        <ChevronDown size={16} style={{ 
          color: colors.text.muted,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 150ms ease',
        }} />
      </button>
      {open && !disabled && (
        <div style={styles({
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1000,
          marginTop: spacing.xs,
          backgroundColor: colors.bg.surface,
          border: `1px solid ${colors.border.subtle}`,
          borderRadius: radius.md,
          boxShadow: shadows.xl,
          maxHeight: '200px',
          overflowY: 'auto',
        })}>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              disabled={opt.disabled}
              onMouseEnter={(e) => {
                if (!opt.disabled) {
                  e.currentTarget.style.backgroundColor = colors.bg.elevated;
                }
              }}
              onMouseLeave={(e) => {
                if (opt.value !== value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              style={styles({
                width: '100%',
                padding: `${spacing.sm} ${componentSpacing.input.paddingX}`,
                fontSize: ts.body.fontSize,
                textAlign: 'left',
                color: opt.disabled ? colors.text.muted : (opt.value === value ? colors.primary.default : colors.text.primary),
                backgroundColor: opt.value === value ? colors.bg.elevated : 'transparent',
                background: 'none',
                border: 'none',
                cursor: opt.disabled ? 'not-allowed' : 'pointer',
                opacity: opt.disabled ? 0.5 : 1,
                transition: 'background-color 150ms ease',
              })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
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

