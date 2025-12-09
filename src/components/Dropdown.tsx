'use client';

import React, { useState } from 'react';
import { useThemeTokens } from '../theme';
import { styles } from './utils';
import type { DropdownProps } from '../types';

export function Dropdown({ trigger, items, align = 'left' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const { colors, radius, textStyles: ts, spacing, shadows } = useThemeTokens();

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={styles({
              position: 'fixed',
              inset: 0,
              zIndex: 40,
            })}
          />
          <div style={styles({
            position: 'absolute',
            zIndex: 50,
            marginTop: spacing.sm,
            width: '14rem',
            backgroundColor: colors.bg.surface,
            border: `1px solid ${colors.border.subtle}`,
            borderRadius: radius.lg,
            boxShadow: shadows.xl,
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
          })}>
            <div style={styles({ padding: spacing.xs })}>
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setOpen(false);
                    item.onClick();
                  }}
                  disabled={item.disabled}
                  style={styles({
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.md,
                    padding: `${spacing.sm} ${spacing.md}`,
                    fontSize: ts.body.fontSize,
                    textAlign: 'left',
                    color: item.danger ? colors.error.default : colors.text.secondary,
                    background: 'none',
                    border: 'none',
                    borderRadius: radius.md,
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    opacity: item.disabled ? 0.5 : 1,
                    transition: 'background-color 150ms ease',
                  })}
                  onMouseEnter={(e) => {
                    if (!item.disabled) {
                      e.currentTarget.style.backgroundColor = colors.bg.elevated;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

