'use client';

import React, { useState } from 'react';
import { useThemeTokens } from '../theme';
import { styles } from './utils';
import type { TabsProps } from '../types';

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  const { colors, textStyles: ts, spacing } = useThemeTokens();
  const [localActive, setLocalActive] = useState(activeTab || tabs[0]?.id);
  const currentTab = activeTab ?? localActive;

  const handleChange = (tabId: string) => {
    setLocalActive(tabId);
    onChange?.(tabId);
  };

  return (
    <div>
      <div style={styles({ borderBottom: `1px solid ${colors.border.subtle}` })}>
        <nav style={styles({ display: 'flex', gap: spacing.lg })}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleChange(tab.id)}
              style={styles({
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
              })}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div style={styles({ marginTop: spacing.lg })}>
        {tabs.find((t) => t.id === currentTab)?.content}
      </div>
    </div>
  );
}

