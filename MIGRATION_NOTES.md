# Migration from Table to DataTable

## Summary

All `Table` components have been replaced with `DataTable` components which provide:
- Built-in sorting (click column headers)
- Built-in search/filtering
- Column visibility toggle
- CSV export
- Built-in pagination

## Changes Made

1. **hit-ui-kit/src/kit.ts** - Added DataTable export
2. **hit-ui-kit/src/types.ts** - Added DataTableProps type
3. **hit-feature-pack-auth-admin/src/pages/Users.tsx** - Replaced Table with DataTable

## Remaining Files to Update

The following files still use `Table` and should be updated to use `DataTable`:

- `hit-feature-pack-auth-admin/src/pages/Invites.tsx`
- `hit-feature-pack-auth-admin/src/pages/AuditLog.tsx`
- `hit-feature-pack-auth-admin/src/pages/Sessions.tsx`
- `hit-feature-pack-auth-admin/src/pages/UserDetail.tsx`
- `hit-feature-pack-notepad/src/pages/List.tsx`

## Migration Steps

1. Replace `Table` with `DataTable` in useUi destructuring:
   ```tsx
   // Before
   const { Table } = useUi();
   
   // After
   const { DataTable } = useUi();
   ```

2. Replace `<Table>` with `<DataTable>` and add features:
   ```tsx
   // Before
   <Table
     columns={columns}
     data={data}
     loading={loading}
   />
   
   // After
   <DataTable
     columns={columns}
     data={data}
     loading={loading}
     searchable
     exportable
     showColumnVisibility
     pageSize={25}
   />
   ```

3. Remove manual search inputs (DataTable has built-in search)

4. Remove manual pagination (DataTable has built-in pagination)

5. Add `sortable: true` to columns that should be sortable

6. Add `sortable: false, hideable: false` to action columns

## Note on Pagination

If your data is server-side paginated, DataTable will handle client-side pagination of the current page's data. For full search/filter across all data, consider fetching all data or implementing server-side search in DataTable (future enhancement).

## Theming

DataTable uses the same theme tokens as Table, so theming continues to work automatically.
