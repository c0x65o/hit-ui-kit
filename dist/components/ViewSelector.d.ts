import { type TableView } from '../hooks/useTableView.js';
/**
 * Filter operators for table views
 */
export declare const FILTER_OPERATORS: {
    readonly EQUALS: "equals";
    readonly NOT_EQUALS: "notEquals";
    readonly CONTAINS: "contains";
    readonly NOT_CONTAINS: "notContains";
    readonly STARTS_WITH: "startsWith";
    readonly ENDS_WITH: "endsWith";
    readonly GREATER_THAN: "greaterThan";
    readonly LESS_THAN: "lessThan";
    readonly GREATER_THAN_OR_EQUAL: "greaterThanOrEqual";
    readonly LESS_THAN_OR_EQUAL: "lessThanOrEqual";
    readonly DATE_EQUALS: "dateEquals";
    readonly DATE_BEFORE: "dateBefore";
    readonly DATE_AFTER: "dateAfter";
    readonly IS_NULL: "isNull";
    readonly IS_NOT_NULL: "isNotNull";
};
interface ViewSelectorProps {
    tableId: string;
    onViewChange?: (view: TableView | null) => void;
    availableColumns?: Array<{
        key: string;
        label: string;
        type?: string;
    }>;
}
/**
 * ViewSelector - Dropdown for selecting and managing table views
 *
 * Provides a dropdown menu showing:
 * - Default (system) views
 * - User's custom views
 * - Option to create new views
 *
 * Requires the table-views feature pack for the API backend.
 * If not installed, the component will not render.
 *
 * @example
 * ```tsx
 * <ViewSelector
 *   tableId="projects"
 *   availableColumns={columns}
 *   onViewChange={(view) => applyFilters(view?.filters || [])}
 * />
 * ```
 */
export declare function ViewSelector({ tableId, onViewChange, availableColumns }: ViewSelectorProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ViewSelector.d.ts.map