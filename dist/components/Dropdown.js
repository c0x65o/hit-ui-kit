'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useThemeTokens } from '../theme';
import { styles } from './utils';
export function Dropdown({ trigger, items, align = 'left' }) {
    const [open, setOpen] = useState(false);
    const { colors, radius, textStyles: ts, spacing, shadows } = useThemeTokens();
    return (_jsxs("div", { style: { position: 'relative' }, children: [_jsx("div", { onClick: () => setOpen(!open), children: trigger }), open && (_jsxs(_Fragment, { children: [_jsx("div", { onClick: () => setOpen(false), style: styles({
                            position: 'fixed',
                            inset: 0,
                            zIndex: 40,
                        }) }), _jsx("div", { style: styles({
                            position: 'absolute',
                            zIndex: 50,
                            marginTop: spacing.sm,
                            width: '14rem',
                            backgroundColor: colors.bg.surface,
                            border: `1px solid ${colors.border.subtle}`,
                            borderRadius: radius.lg,
                            boxShadow: shadows.xl,
                            ...(align === 'right' ? { right: 0 } : { left: 0 }),
                        }), children: _jsx("div", { style: styles({ padding: spacing.xs }), children: items.map((item, idx) => (_jsxs("button", { onClick: () => {
                                    setOpen(false);
                                    item.onClick();
                                }, disabled: item.disabled, style: styles({
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
                                }), onMouseEnter: (e) => {
                                    if (!item.disabled) {
                                        e.currentTarget.style.backgroundColor = colors.bg.elevated;
                                    }
                                }, onMouseLeave: (e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }, children: [item.icon, item.label] }, idx))) }) })] }))] }));
}
//# sourceMappingURL=Dropdown.js.map