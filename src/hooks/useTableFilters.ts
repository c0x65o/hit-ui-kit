'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { getTableFilters, type TableFilterDefinition } from '../config/tableFilters';
import type { GlobalFilterConfig } from '../types';

/**
 * Hook that automatically builds filter configurations from the centralized registry.
 * 
 * Usage:
 * ```tsx
 * const { filters, loading } = useTableFilters('crm.activities');
 * 
 * <DataTable
 *   tableId="crm.activities"
 *   showGlobalFilters
 *   globalFilters={filters}  // Auto-configured filters!
 *   ...
 * />
 * ```
 */
export function useTableFilters(tableId: string | undefined) {
  const [optionsCache, setOptionsCache] = useState<Record<string, Array<{ value: string; label: string }>>>({});
  const [loading, setLoading] = useState(false);

  const filterDefs = useMemo(() => {
    if (!tableId) return [];
    return getTableFilters(tableId);
  }, [tableId]);

  // Fetch options for select/multiselect filters
  useEffect(() => {
    if (!filterDefs.length) return;

    const selectFilters = filterDefs.filter(
      (f) => (f.filterType === 'select' || f.filterType === 'multiselect') && f.optionsEndpoint
    );

    if (!selectFilters.length) return;

    let cancelled = false;
    setLoading(true);

    Promise.all(
      selectFilters.map(async (f) => {
        try {
          const res = await fetch(f.optionsEndpoint!);
          if (!res.ok) return { key: f.columnKey, options: [] };
          const json = await res.json();
          
          // Extract items from response
          const itemsPath = f.itemsPath || 'items';
          let items = json;
          for (const part of itemsPath.split('.')) {
            items = items?.[part];
          }
          if (!Array.isArray(items)) items = [];

          const valueField = f.valueField || 'id';
          const labelField = f.labelField || 'name';

          const options = items.map((item: any) => ({
            value: String(item[valueField] || item.id || ''),
            label: String(item[labelField] || item.name || item[valueField] || ''),
          }));

          return { key: f.columnKey, options };
        } catch {
          return { key: f.columnKey, options: [] };
        }
      })
    ).then((results) => {
      if (cancelled) return;
      const cache: Record<string, Array<{ value: string; label: string }>> = {};
      for (const { key, options } of results) {
        cache[key] = options;
      }
      setOptionsCache(cache);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [filterDefs]);

  // Build GlobalFilterConfig array
  const filters = useMemo<GlobalFilterConfig[]>(() => {
    return filterDefs.map((def): GlobalFilterConfig => {
      const base: GlobalFilterConfig = {
        columnKey: def.columnKey,
        label: def.label,
        filterType: def.filterType,
      };

      // Add options for select/multiselect
      if (def.filterType === 'select' || def.filterType === 'multiselect') {
        if (def.staticOptions) {
          base.filterOptions = def.staticOptions;
        } else if (optionsCache[def.columnKey]) {
          base.filterOptions = optionsCache[def.columnKey];
        }
      }

      // Add onSearch/resolveValue for autocomplete
      if (def.filterType === 'autocomplete' && def.searchEndpoint) {
        const valueField = def.valueField || 'id';
        const labelField = def.labelField || 'name';
        const itemsPath = def.itemsPath || 'items';

        base.onSearch = async (query: string, limit: number) => {
          try {
            const url = `${def.searchEndpoint}?search=${encodeURIComponent(query)}&pageSize=${limit}`;
            const res = await fetch(url);
            if (!res.ok) return [];
            const json = await res.json();
            
            let items = json;
            for (const part of itemsPath.split('.')) {
              items = items?.[part];
            }
            if (!Array.isArray(items)) items = [];

            return items.map((item: any) => ({
              value: String(item[valueField] || ''),
              label: String(item[labelField] || item[valueField] || ''),
            }));
          } catch {
            return [];
          }
        };

        if (def.resolveEndpoint) {
          base.resolveValue = async (value: string) => {
            if (!value) return null;
            try {
              const res = await fetch(`${def.resolveEndpoint}/${value}`);
              if (!res.ok) return null;
              const item = await res.json();
              return {
                value: String(item[valueField] || value),
                label: String(item[labelField] || item[valueField] || value),
              };
            } catch {
              return null;
            }
          };
        }
      }

      return base;
    });
  }, [filterDefs, optionsCache]);

  return { filters, loading, hasFilters: filterDefs.length > 0 };
}
