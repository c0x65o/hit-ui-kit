'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
export function Tabs({ tabs, activeTab, onChange }) {
    const { colors, textStyles: ts, spacing } = useThemeTokens();
    const [localActive, setLocalActive] = useState(activeTab || tabs[0]?.id);
    const currentTab = activeTab ?? localActive;
    const handleChange = (tabId) => {
        setLocalActive(tabId);
        onChange?.(tabId);
    };
    return (_jsxs("div", { children: [_jsx("div", { style: styles({ borderBottom: `1px solid ${colors.border.subtle}` }), children: _jsx("nav", { style: styles({ display: 'flex', gap: spacing.lg }), children: tabs.map((tab) => (_jsx("button", { onClick: () => handleChange(tab.id), style: styles({
                            padding: `${spacing.md} ${spacing.xs}`,
                            fontSize: ts.body.fontSize,
                            fontWeight: ts.label.fontWeight,
                            color: currentTab === tab.id ? colors.primary.default : colors.text.muted,
                            borderBottom: currentTab === tab.id
                                ? `2px solid ${colors.primary.default}`
                                : '2px solid transparent',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 150ms ease',
                        }), children: tab.label }, tab.id))) }) }), _jsx("div", { style: styles({ marginTop: spacing.lg }), children: tabs.find((t) => t.id === currentTab)?.content })] }));
}
//# sourceMappingURL=Tabs.js.map