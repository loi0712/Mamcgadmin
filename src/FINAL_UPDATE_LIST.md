# Final Update List - Remaining 12 Files

## ✅ Completed (8/20)
1. DashboardView.tsx ✅
2. UsersView.tsx ✅
3. ServerStatusView.tsx ✅
4. DatabaseView.tsx ✅
5. LogsView.tsx ✅
6. NotificationsView.tsx ✅
7. WorkflowView.tsx ✅
8. FilesView.tsx ✅

## ⏳ Remaining (12/20) - TO BE UPDATED NOW

### High Priority - Administration
9. RoleGroupsView.tsx - Dialog with permission checkboxes
10. PermissionsView.tsx - Permission matrix table
11. StorageView.tsx - Storage connections + dialog
12. SettingsView.tsx - General settings (if exists)

### Medium Priority - Customisation
13. FieldGroupsView.tsx - Field groups CRUD
14. DataFieldsView.tsx - Data fields configuration
15. DisplayPanelsView.tsx - Display panels setup

### Medium Priority - Settings
16. ADLDAPSettings.tsx - Large file with tabs, many inputs
17. CGServerSettings.tsx - CatDV Gateway settings with tabs
18. EmailSettings.tsx - Email/SMTP configuration

### Low Priority - Workflow Editor
19. WorkflowEditorView.tsx - Visual workflow editor
20. workflow/NodeConfigPanel.tsx - Node configuration panel

## Standard Pattern (Same for all files)

```tsx
// Background
bg-[#0f1419] → bg-admin-secondary
bg-[#0a0e1a] → bg-admin-input

// Border
border-gray-800 → border-admin
border-gray-700 → border-admin

// Text
text-gray-300 → text-admin-primary
text-gray-400 → text-admin-secondary
text-gray-500 → text-admin-muted
text-cyan-400 → text-admin-accent

// Hover
hover:bg-gray-800 → hover:bg-admin-hover
hover:bg-gray-900/50 → hover:bg-admin-hover

// Tab States
data-[state=active]:bg-gray-800 → data-[state=active]:bg-admin-hover
data-[state=active]:text-cyan-400 → data-[state=active]:text-admin-accent

// Spacing
space-y-6 → space-y-4
gap-6 → gap-4
```

All files will be updated with same pattern to ensure consistency.
