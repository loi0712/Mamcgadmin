# Theme Color Mapping Guide

## Quick Reference - Color Replacements

### Background Colors
```
bg-[#0f1419]  →  bg-admin-secondary
bg-[#0a0e1a]  →  bg-admin-input (or bg-admin-tertiary)
bg-[#1a1f2e]  →  bg-admin-topnav
bg-[#050810]  →  bg-admin-main
```

### Border Colors
```
border-gray-800  →  border-admin
border-gray-700  →  border-admin
```

### Text Colors
```
text-gray-300  →  text-admin-primary
text-gray-400  →  text-admin-secondary
text-gray-500  →  text-admin-muted
text-white     →  text-admin-primary (in most cases)
text-cyan-400  →  text-admin-accent
```

### Hover States
```
hover:bg-gray-800  →  hover:bg-admin-hover
hover:text-gray-100  →  hover:text-admin-primary
```

## Completed Files ✅
- [x] globals.css
- [x] ThemeContext.tsx  
- [x] App.tsx
- [x] Sidebar.tsx
- [x] TopNav.tsx
- [x] Header.tsx
- [x] DashboardHeader.tsx
- [x] EmailSettings.tsx
- [x] SettingsView.tsx

## Files Needing Update 🔄
- [ ] DashboardView.tsx
- [ ] UsersView.tsx
- [ ] FilesView.tsx
- [ ] ADLDAPSettings.tsx
- [ ] CGServerSettings.tsx
- [ ] DatabaseView.tsx
- [ ] StorageView.tsx
- [ ] RoleGroupsView.tsx
- [ ] PermissionsView.tsx
- [ ] LogsView.tsx
- [ ] NotificationsView.tsx
- [ ] ServerStatusView.tsx
- [ ] FieldGroupsView.tsx
- [ ] DataFieldsView.tsx
- [ ] DisplayPanelsView.tsx
- [ ] WorkflowView.tsx
- [ ] WorkflowEditorView.tsx

## Example Transformation

### Before:
```tsx
<Card className="bg-[#0f1419] border-gray-800 p-6">
  <Label className="text-gray-300">Server Host</Label>
  <Input className="bg-[#0a0e1a] border-gray-700 text-gray-300" />
  <p className="text-xs text-gray-500">Enter hostname</p>
</Card>
```

### After:
```tsx
<Card className="bg-admin-secondary border-admin p-6">
  <Label className="text-admin-primary">Server Host</Label>
  <Input className="bg-admin-input border-admin text-admin-primary" />
  <p className="text-xs text-admin-muted">Enter hostname</p>
</Card>
```

## Padding/Margin Adjustments

### Main Content Container
- Changed from `p-6` to `p-4`

### Tab Content  
- Changed from `mt-6` to `mt-4`

### Card Padding
- Keep as is (p-4 or p-6 depending on context)
