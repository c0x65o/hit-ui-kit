# DataTable Setup Instructions

## Installation Required

The DataTable component requires `@tanstack/react-table` to be installed in the **consuming application** (not in hit-ui-kit itself, as it's a peer dependency).

### In your application (e.g., hit-app-shell-next-ts):

```bash
npm install @tanstack/react-table
```

## Build Required

After making changes to hit-ui-kit, you need to rebuild it:

```bash
cd hit-feature-packs/hit-ui-kit
npm run build
```

## Verification

1. Make sure `@tanstack/react-table` is installed in your app
2. Make sure hit-ui-kit has been built (`npm run build` in hit-ui-kit)
3. Make sure DataTable is exported from hit-ui-kit (it is - see `src/index.tsx`)
4. Make sure dashboard-shell kit imports and includes DataTable (it does - see `src/kit.ts`)

## Troubleshooting

If you get "Element type is invalid: expected a string... but got: undefined":

1. **Check if @tanstack/react-table is installed:**
   ```bash
   npm list @tanstack/react-table
   ```

2. **Rebuild hit-ui-kit:**
   ```bash
   cd hit-feature-packs/hit-ui-kit
   npm install  # Install dev dependencies including @tanstack/react-table
   npm run build
   ```

3. **Check if DataTable is exported:**
   ```bash
   grep -r "export.*DataTable" hit-feature-packs/hit-ui-kit/src
   ```

4. **Verify dashboard-shell imports it:**
   ```bash
   grep -r "DataTable" hit-feature-packs/hit-feature-pack-dashboard-shell/src/kit.ts
   ```

## Current Status

✅ DataTable component created  
✅ Added to hit-ui-kit exports  
✅ Added to dashboard-shell kit  
✅ TypeScript types fixed  
✅ Theme tokens fixed  
⚠️ **Requires @tanstack/react-table in consuming app**  
⚠️ **Requires hit-ui-kit to be rebuilt**
