'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useThemeTokens } from '../theme/index.js';
import { styles } from './utils';
import type { BreadcrumbProps, BreadcrumbItem } from '../types';

export function Breadcrumb({ items, onNavigate, showHome = true, homeHref = '/' }: BreadcrumbProps) {
  const { colors, spacing } = useThemeTokens();

  const handleClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', href: homeHref, icon: <Home size={14} /> }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" style={styles({ marginBottom: spacing.md })}>
      <ol
        style={styles({
          display: 'flex',
          alignItems: 'center',
          gap: spacing.xs,
          listStyle: 'none',
          margin: 0,
          padding: 0,
          flexWrap: 'wrap',
        })}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li
              key={item.href || index}
              style={styles({
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs,
              })}
            >
              {index > 0 && (
                <ChevronRight
                  size={14}
                  style={{ color: colors.text.muted, flexShrink: 0 }}
                />
              )}
              {isLast ? (
                <span
                  style={styles({
                    fontSize: '0.875rem',
                    color: colors.text.primary,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.xs,
                  })}
                  aria-current="page"
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => item.href && handleClick(item.href, e)}
                  style={styles({
                    fontSize: '0.875rem',
                    color: colors.text.secondary,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.xs,
                    transition: 'color 0.15s ease',
                  })}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = colors.primary.default;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = colors.text.secondary;
                  }}
                >
                  {item.icon}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
