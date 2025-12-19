'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
/**
 * Hook for managing table views
 *
 * Requires the table-views feature pack to be installed for API endpoints.
 * If the feature pack is not installed, API calls will gracefully fail.
 *
 * @example
 * ```tsx
 * const { views, currentView, selectView, createView } = useTableView({
 *   tableId: 'projects',
 *   onViewChange: (view) => console.log('View changed:', view),
 * });
 * ```
 */
export function useTableView({ tableId, onViewChange }) {
    const [views, setViews] = useState([]);
    const [currentView, setCurrentView] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [available, setAvailable] = useState(true); // Whether the API is available
    const initialLoadDone = useRef(false);
    const onViewChangeRef = useRef(onViewChange);
    // Keep ref in sync
    useEffect(() => {
        onViewChangeRef.current = onViewChange;
    }, [onViewChange]);
    const fetchViews = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/table-views?tableId=${encodeURIComponent(tableId)}`);
            // If 404, the feature pack isn't installed
            if (res.status === 404) {
                setAvailable(false);
                setViews([]);
                setError(null);
                return;
            }
            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                throw new Error(json?.error || 'Failed to fetch views');
            }
            const json = await res.json();
            const fetchedViews = json.data || [];
            setViews(fetchedViews);
            setAvailable(true);
            setError(null);
            // On initial load, set the default view
            if (!initialLoadDone.current && fetchedViews.length > 0) {
                initialLoadDone.current = true;
                const defaultView = fetchedViews.find((v) => v.isDefault) || fetchedViews[0];
                setCurrentView(defaultView);
                onViewChangeRef.current?.(defaultView);
            }
        }
        catch (err) {
            // Network errors or other issues - mark as unavailable
            if (err?.name === 'TypeError') {
                setAvailable(false);
            }
            else {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            }
        }
        finally {
            setLoading(false);
        }
    }, [tableId]);
    useEffect(() => {
        initialLoadDone.current = false;
        fetchViews();
    }, [fetchViews]);
    const createView = useCallback(async (viewData) => {
        const res = await fetch('/api/table-views', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableId,
                ...viewData,
            }),
        });
        if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json?.error || 'Failed to create view');
        }
        const json = await res.json();
        const newView = json.data;
        setViews((prev) => [...prev, newView]);
        return newView;
    }, [tableId]);
    const updateView = useCallback(async (viewId, updates) => {
        const res = await fetch(`/api/table-views/${viewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json?.error || 'Failed to update view');
        }
        const json = await res.json();
        const updatedView = json.data;
        setViews((prev) => prev.map((v) => (v.id === viewId ? updatedView : v)));
        setCurrentView((current) => {
            if (current?.id === viewId) {
                onViewChangeRef.current?.(updatedView);
                return updatedView;
            }
            return current;
        });
        return updatedView;
    }, []);
    const deleteView = useCallback(async (viewId) => {
        const res = await fetch(`/api/table-views/${viewId}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json?.error || 'Failed to delete view');
        }
        setViews((prev) => {
            const remaining = prev.filter((v) => v.id !== viewId);
            setCurrentView((current) => {
                if (current?.id === viewId) {
                    const newCurrentView = remaining.find((v) => v.isDefault) || remaining[0] || null;
                    onViewChangeRef.current?.(newCurrentView);
                    return newCurrentView;
                }
                return current;
            });
            return remaining;
        });
    }, []);
    const selectView = useCallback(async (view) => {
        setCurrentView(view);
        onViewChangeRef.current?.(view);
        // Update lastUsedAt if view is selected
        if (view && !view.isSystem) {
            try {
                await fetch(`/api/table-views/${view.id}/use`, {
                    method: 'PATCH',
                });
            }
            catch {
                // Ignore errors for usage tracking
            }
        }
    }, []);
    return {
        views,
        currentView,
        loading,
        error,
        available, // Whether the table-views feature pack is installed
        createView,
        updateView,
        deleteView,
        selectView,
        refresh: fetchViews,
    };
}
//# sourceMappingURL=useTableView.js.map