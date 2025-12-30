'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Plus, Users, X } from 'lucide-react';
import { useThemeTokens } from '../theme/index.js';
import { Button } from './Button.js';
import { Input } from './Input.js';
import { Select } from './Select.js';
import { styles } from './utils.js';
export function TableViewSharingPanel({ viewId, shares, setShares, sharesLoading = false, pendingRecipients, setPendingRecipients, addShare, removeShare, allowPrincipalTypeSelection = false, }) {
    const { colors, radius, spacing, textStyles: ts } = useThemeTokens();
    const [principalType, setPrincipalType] = useState('user');
    const [principalId, setPrincipalId] = useState('');
    const [error, setError] = useState(null);
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
        if (!id)
            return;
        try {
            setError(null);
            if (isEditing && viewId) {
                const newShare = await addShare(viewId, effectivePrincipalType, id);
                setShares((prev) => [...prev, newShare]);
            }
            else {
                setPendingRecipients((prev) => {
                    const next = new Map(prev.map((p) => [`${p.principalType}:${p.principalId}`, p]));
                    next.set(`${effectivePrincipalType}:${id}`, { principalType: effectivePrincipalType, principalId: id });
                    return Array.from(next.values());
                });
            }
            setPrincipalId('');
        }
        catch (err) {
            setError(err?.message || 'Failed to share');
        }
    }
    async function handleRemove(item) {
        try {
            setError(null);
            if (isEditing && viewId) {
                await removeShare(viewId, item.principalType, item.principalId);
                setShares((prev) => prev.filter((s) => s.id !== item.id));
            }
            else {
                setPendingRecipients((prev) => prev.filter((p) => !(p.principalType === item.principalType && p.principalId === item.principalId)));
            }
        }
        catch (err) {
            setError(err?.message || 'Failed to remove share');
        }
    }
    return (_jsxs("div", { style: styles({ display: 'flex', flexDirection: 'column', gap: spacing.md }), children: [_jsx("p", { style: styles({ fontSize: ts.bodySmall.fontSize, color: colors.text.muted, margin: 0 }), children: "Share this view with other principals. They will see it in their \"Shared with me\" section." }), _jsxs("div", { style: styles({
                    display: 'flex',
                    gap: spacing.sm,
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                }), children: [allowPrincipalTypeSelection && (_jsx("div", { style: { width: 180 }, children: _jsx(Select, { label: "Share as", value: effectivePrincipalType, onChange: (v) => setPrincipalType(v || 'user'), options: [
                                { value: 'user', label: 'User' },
                                { value: 'group', label: 'Group' },
                                { value: 'role', label: 'Role' },
                            ] }) })), _jsx("div", { style: { flex: 1, minWidth: 260 }, children: _jsx(Input, { label: effectivePrincipalType === 'user'
                                ? 'Share with user (email or user id)'
                                : effectivePrincipalType === 'group'
                                    ? 'Share with group (group id)'
                                    : 'Share with role (role key)', value: principalId, onChange: (val) => {
                                setPrincipalId(val);
                                setError(null);
                            }, placeholder: effectivePrincipalType === 'user'
                                ? 'user@example.com'
                                : effectivePrincipalType === 'group'
                                    ? 'group-id'
                                    : 'admin' }) }), _jsxs(Button, { variant: "primary", size: "sm", disabled: !principalId.trim(), onClick: handleAdd, children: [_jsx(Plus, { size: 14, style: { marginRight: spacing.xs } }), "Share"] })] }), error && (_jsx("div", { style: styles({
                    padding: spacing.sm,
                    backgroundColor: '#fef2f2',
                    color: colors.error?.default || '#ef4444',
                    borderRadius: radius.md,
                    fontSize: ts.bodySmall.fontSize,
                }), children: error })), isEditing && sharesLoading ? (_jsx("div", { style: styles({ padding: spacing.xl, textAlign: 'center', color: colors.text.muted }), children: "Loading shares..." })) : count === 0 ? (_jsx("div", { style: styles({
                    padding: spacing.xl,
                    textAlign: 'center',
                    color: colors.text.muted,
                    fontSize: ts.body.fontSize,
                    border: `1px dashed ${colors.border.subtle}`,
                    borderRadius: radius.md,
                }), children: isEditing ? 'This view is not shared with anyone yet.' : 'This view will not be shared with anyone yet.' })) : (_jsxs("div", { style: styles({ display: 'flex', flexDirection: 'column', gap: spacing.sm }), children: [_jsxs("div", { style: styles({
                            fontSize: ts.bodySmall.fontSize,
                            fontWeight: ts.label.fontWeight,
                            color: colors.text.secondary,
                        }), children: ["Shared with ", count, " ", count === 1 ? 'principal' : 'principals'] }), items.map((item) => (_jsxs("div", { style: styles({
                            display: 'flex',
                            alignItems: 'center',
                            gap: spacing.sm,
                            padding: spacing.md,
                            backgroundColor: colors.bg.elevated,
                            borderRadius: radius.md,
                            border: `1px solid ${colors.border.subtle}`,
                        }), children: [_jsx(Users, { size: 16, style: { color: colors.text.muted } }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: styles({ fontSize: ts.body.fontSize, color: colors.text.primary }), children: item.principalId }), _jsx("div", { style: styles({ fontSize: '11px', color: colors.text.muted }), children: item.principalType === 'user' ? 'User' : item.principalType === 'group' ? 'Group' : 'Role' })] }), _jsx("button", { onClick: () => handleRemove(item), style: styles({
                                    padding: spacing.xs,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: colors.error?.default || '#ef4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                }), title: "Remove share", children: _jsx(X, { size: 16 }) })] }, item.id)))] }))] }));
}
//# sourceMappingURL=TableViewSharingPanel.js.map