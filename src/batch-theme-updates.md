# Batch Theme Updates - Remaining Files

## Pattern Replacements (Apply to all remaining files)

### Background Colors
- `bg-[#0f1419]` → `bg-admin-secondary`
- `bg-[#0a0e1a]` → `bg-admin-input`
- `bg-[#1a1f2e]` → `bg-admin-topnav`

### Border Colors
- `border-gray-800` → `border-admin`
- `border-gray-700` → `border-admin`

### Text Colors
- `text-gray-300` → `text-admin-primary`
- `text-gray-400` → `text-admin-secondary`
- `text-gray-500` → `text-admin-muted`
- `text-white` → `text-admin-primary` (when used for content, not buttons)
- `text-cyan-400` → `text-admin-accent`

### Hover States
- `hover:bg-[#0f1419]` → `hover:bg-admin-secondary`
- `hover:bg-gray-800` → `hover:bg-admin-hover`
- `hover:bg-gray-900/50` → `hover:bg-admin-hover`

### Spacing Adjustments
- `space-y-6` → `space-y-4`
- `gap-6` → `gap-4`
- `mt-6` → `mt-4`
- `mb-6` → `mb-4`

### Tab States (Tabs component)
- `data-[state=active]:bg-gray-800` → `data-[state=active]:bg-admin-hover`
- `data-[state=active]:text-cyan-400` → `data-[state=active]:text-admin-accent`

## Files Remaining (13 files)

1. RoleGroupsView.tsx - Role group management with permissions table
2. PermissionsView.tsx - Permissions matrix
3. StorageView.tsx - Storage connections management  
4. FieldGroupsView.tsx - Field groups CRUD
5. DataFieldsView.tsx - Data fields configuration
6. DisplayPanelsView.tsx - Display panels setup
7. WorkflowView.tsx - Workflow list
8. WorkflowEditorView.tsx - Visual workflow editor
9. FilesView.tsx - File browser
10. ADLDAPSettings.tsx - AD/LDAP configuration with tabs
11. CGServerSettings.tsx - CatDV Gateway settings
12. EmailSettings.tsx - Email/SMTP settings
13. workflow/NodeConfigPanel.tsx - Workflow node config panel

## Priority Order
1. HIGH: RoleGroupsView, PermissionsView, StorageView (core admin)
2. MEDIUM: Field/Display/Workflow views (customization)
3. MEDIUM: Settings files (configuration)
4. LOW: Workflow components (specialized)
