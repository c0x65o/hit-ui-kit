'use client';

import React, { useMemo, useState } from 'react';
import { Plus, Users, X } from 'lucide-react';
import { useThemeTokens } from '../theme/index.js';
import { Button } from './Button.js';
import { Input } from './Input.js';
import { Select } from './Select.js';
import { styles } from './utils.js';
import type { TableViewShare } from '../hooks/useTableView';

export type TableViewShareRecipient = {
  principalType: 'user' | 'group' | 'role';
  principalId: string;
};

interface TableViewSharingPanelProps {
  /** If provided, shares will be added/removed via API immediately. If omitted, shares are queued in `pendingRecipients`. */
  viewId?: string | null;

  /** Existing shares (edit mode). */
  shares: TableViewShare[];
  setShares: React.Dispatch<React.SetStateAction<TableViewShare[]>>;
  sharesLoading?: boolean;

  /** Queued shares (create mode). */
  pendingRecipients: TableViewShareRecipient[];
  setPendingRecipients: React.Dispatch<React.SetStateAction<TableViewShareRecipient[]>>;

  /** API functions from `useTableView`. */
  addShare: (viewId: string, principalType: 'user' | 'group' | 'role', principalId: string) => Promise<TableViewShare>;
  removeShare: (viewId: string, principalType: 'user' | 'group' | 'role', principalId: string) => Promise<void>;

  /** If true, user can choose user/group/role. If false, principalType is forced to 'user'. */
  allowPrincipalTypeSelection?: boolean;
}

export function TableViewSharingPanel({
  viewId,
  shares,
  setShares,
  sharesLoading = false,
  pendingRecipients,
  setPendingRecipients,
  addShare,
  removeShare,
  allowPrincipalTypeSelection = false,
}: TableViewSharingPanelProps) {
  const { colors, radius, spacing, textStyles: ts } = useThemeTokens();
  const [principalType, setPrincipalType] = useState<'user' | 'group' | 'role'>('user');
  const [principalId, setPrincipalId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const effectivePrincipalType = allowPrincipalTypeSelection ? principalType : 'user';
  const isEditing = !!viewId;

  const items = useMemo(() => {
    if (isEditing) {
      return shares.map((share) => ({
        id: share.id,
        principalType: share.principalType,
        principalId: share.principalId,
      }));
    }
    return pendingRecipients.map((r) => ({
      id: `pending:${r.principalType}:${r.principalId}`,
      principalType: r.principalType,
      principalId: r.principalId,
    }));
  }, [isEditing, shares, pendingRecipients]);

  const count = items.length;

  async function handleAdd() {
    const id = principalId.trim();
    if (!id) return;
    try {
      setError(null);

      if (isEditing && viewId) {
        const newShare = await addShare(viewId, effectivePrincipalType, id);
        setShares((prev) => [...prev, newShare]);
      } else {
        setPendingRecipients((prev) => {
          const next = new Map(prev.map((p) => [`${p.principalType}:${p.principalId}`, p]));
          next.set(`${effectivePrincipalType}:${id}`, { principalType: effectivePrincipalType, principalId: id });
          return Array.from(next.values());
        });
      }

      setPrincipalId('');
    } catch (err: any) {
      setError(err?.message || 'Failed to share');
    }
  }

  async function handleRemove(item: { principalType: 'user' | 'group' | 'role'; principalId: string; id: string }) {
    try {
      setError(null);
      if (isEditing && viewId) {
        await removeShare(viewId, item.principalType, item.principalId);
        setShares((prev) => prev.filter((s) => s.id !== item.id));
      } else {
        setPendingRecipients((prev) =>
          prev.filter((p) => !(p.principalType === item.principalType && p.principalId === item.principalId))
        );
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to remove share');
    }
  }

  return (
    <div style={styles({ display: 'flex', flexDirection: 'column', gap: spacing.md })}>
      <p style={styles({ fontSize: ts.bodySmall.fontSize, color: colors.text.muted, margin: 0 })}>
        Share this view with other principals. They will see it in their "Shared with me" section.
      </p>

      <div
        style={styles({
          display: 'flex',
          gap: spacing.sm,
          alignItems: 'flex-end',
          flexWrap: 'wrap',
        })}
      >
        {allowPrincipalTypeSelection && (
          <div style={{ width: 180 }}>
            <Select
              label="Share as"
              value={effectivePrincipalType}
              onChange={(v) => setPrincipalType((v as any) || 'user')}
              options={[
                { value: 'user', label: 'User' },
                { value: 'group', label: 'Group' },
                { value: 'role', label: 'Role' },
              ]}
            />
          </div>
        )}

        <div style={{ flex: 1, minWidth: 260 }}>
          <Input
            label={
              effectivePrincipalType === 'user'
                ? 'Share with user (email or user id)'
                : effectivePrincipalType === 'group'
                  ? 'Share with group (group id)'
                  : 'Share with role (role key)'
            }
            value={principalId}
            onChange={(val) => {
              setPrincipalId(val);
              setError(null);
            }}
            placeholder={
              effectivePrincipalType === 'user'
                ? 'user@example.com'
                : effectivePrincipalType === 'group'
                  ? 'group-id'
                  : 'admin'
            }
          />
        </div>

        <Button variant="primary" size="sm" disabled={!principalId.trim()} onClick={handleAdd}>
          <Plus size={14} style={{ marginRight: spacing.xs }} />
          Share
        </Button>
      </div>

      {error && (
        <div
          style={styles({
            padding: spacing.sm,
            backgroundColor: '#fef2f2',
            color: colors.error?.default || '#ef4444',
            borderRadius: radius.md,
            fontSize: ts.bodySmall.fontSize,
          })}
        >
          {error}
        </div>
      )}

      {isEditing && sharesLoading ? (
        <div style={styles({ padding: spacing.xl, textAlign: 'center', color: colors.text.muted })}>Loading shares...</div>
      ) : count === 0 ? (
        <div
          style={styles({
            padding: spacing.xl,
            textAlign: 'center',
            color: colors.text.muted,
            fontSize: ts.body.fontSize,
            border: `1px dashed ${colors.border.subtle}`,
            borderRadius: radius.md,
          })}
        >
          {isEditing ? 'This view is not shared with anyone yet.' : 'This view will not be shared with anyone yet.'}
        </div>
      ) : (
        <div style={styles({ display: 'flex', flexDirection: 'column', gap: spacing.sm })}>
          <div
            style={styles({
              fontSize: ts.bodySmall.fontSize,
              fontWeight: ts.label.fontWeight,
              color: colors.text.secondary,
            })}
          >
            Shared with {count} {count === 1 ? 'principal' : 'principals'}
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              style={styles({
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
                padding: spacing.md,
                backgroundColor: colors.bg.elevated,
                borderRadius: radius.md,
                border: `1px solid ${colors.border.subtle}`,
              })}
            >
              <Users size={16} style={{ color: colors.text.muted }} />
              <div style={{ flex: 1 }}>
                <div style={styles({ fontSize: ts.body.fontSize, color: colors.text.primary })}>{item.principalId}</div>
                <div style={styles({ fontSize: '11px', color: colors.text.muted })}>
                  {item.principalType === 'user' ? 'User' : item.principalType === 'group' ? 'Group' : 'Role'}
                </div>
              </div>
              <button
                onClick={() => handleRemove(item)}
                style={styles({
                  padding: spacing.xs,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.error?.default || '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                })}
                title="Remove share"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


