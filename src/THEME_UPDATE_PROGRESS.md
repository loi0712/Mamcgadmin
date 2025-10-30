# Theme Update Progress

## ✅ Completed Files (5/20)

1. ✅ **DashboardView.tsx** - All cards, stats, activity list themed
2. ✅ **UsersView.tsx** - Stats cards, table, inputs themed  
3. ✅ **ServerStatusView.tsx** - System cards, services, disk info themed
4. ✅ **DatabaseView.tsx** - Connections, backup, dialog, tables themed
5. ✅ **LogsView.tsx** - Filters, log table themed

## 🔄 In Progress / Remaining Files (15/20)

### Administration Views (High Priority)
6. ⏳ **StorageView.tsx** - Storage connections table and stats
7. ⏳ **RoleGroupsView.tsx** - Role groups management
8. ⏳ **PermissionsView.tsx** - Permissions matrix
9. ⏳ **NotificationsView.tsx** - Notification center

### Customisation Views (Medium Priority)
10. ⏳ **FieldGroupsView.tsx** - Field groups management
11. ⏳ **DataFieldsView.tsx** - Data fields configuration
12. ⏳ **DisplayPanelsView.tsx** - Display panels setup
13. ⏳ **WorkflowView.tsx** - Workflow list
14. ⏳ **WorkflowEditorView.tsx** - Workflow visual editor

### Settings Views (Medium Priority)
15. ⏳ **ADLDAPSettings.tsx** - AD/LDAP configuration
16. ⏳ **CGServerSettings.tsx** - CatDV Gateway settings
17. ⏳ **EmailSettings.tsx** - Email/SMTP settings

### Other Views
18. ⏳ **FilesView.tsx** - File browser

### Workflow Components
19. ⏳ **workflow/NodeConfigPanel.tsx** - Node configuration panel

## Theme Class Mapping Pattern

All files use consistent replacements:
- `bg-[#0f1419]` → `bg-admin-secondary`
- `bg-[#0a0e1a]` → `bg-admin-input`
- `border-gray-800` → `border-admin`
- `border-gray-700` → `border-admin`
- `text-gray-300` → `text-admin-primary`
- `text-gray-400` → `text-admin-secondary`
- `text-gray-500` → `text-admin-muted`
- `text-cyan-400` → `text-admin-accent`
- `hover:bg-gray-800` → `hover:bg-admin-hover`
- `hover:bg-gray-900/50` → `hover:bg-admin-hover`
- `space-y-6` → `space-y-4`
- `gap-6` → `gap-4`

## Benefits Achieved

✨ **Dynamic theming**: Cards now adapt to light/dark themes
✨ **Consistent hierarchy**: Clear visual layers (main → secondary → input)
✨ **Better contrast**: Text properly stands out against backgrounds
✨ **Maintainability**: Centralized theme management in globals.css
