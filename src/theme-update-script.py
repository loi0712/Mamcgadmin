#!/usr/bin/env python3
"""
Script to batch update theme colors in all View components
Usage: Run this as reference - actual updates done via file tools
"""

REPLACEMENTS = [
    # Background colors
    ('bg-[#0f1419]', 'bg-admin-secondary'),
    ('bg-[#0a0e1a]', 'bg-admin-input'),
    ('bg-[#1a1f2e]', 'bg-admin-topnav'),
    
    # Border colors
    ('border-gray-800', 'border-admin'),
    ('border-gray-700', 'border-admin'),
    
    # Text colors
    ('text-gray-300', 'text-admin-primary'),
    ('text-gray-400', 'text-admin-secondary'),
    ('text-gray-500', 'text-admin-muted'),
    ('text-white', 'text-admin-primary'),
    ('text-cyan-400', 'text-admin-accent'),
    
    # Hover states
    ('hover:bg-[#0f1419]', 'hover:bg-admin-secondary'),
    ('hover:bg-gray-800', 'hover:bg-admin-hover'),
    ('hover:bg-gray-900/50', 'hover:bg-admin-hover'),
    
    # Spacing
    ('space-y-6', 'space-y-4'),
    ('gap-6', 'gap-4'),
    ('mt-6', 'mt-4'),
]

FILES_TO_UPDATE = [
    '/components/admin/ADLDAPSettings.tsx',
    '/components/admin/CGServerSettings.tsx',
    '/components/admin/DatabaseView.tsx',
    '/components/admin/StorageView.tsx',
    '/components/admin/RoleGroupsView.tsx',
    '/components/admin/PermissionsView.tsx',
    '/components/admin/LogsView.tsx',
    '/components/admin/NotificationsView.tsx',
    '/components/admin/ServerStatusView.tsx',
    '/components/admin/FieldGroupsView.tsx',
    '/components/admin/DataFieldsView.tsx',
    '/components/admin/DisplayPanelsView.tsx',
    '/components/admin/WorkflowView.tsx',
    '/components/admin/WorkflowEditorView.tsx',
    '/components/admin/FilesView.tsx',
]

print("Files to update:", len(FILES_TO_UPDATE))
print("Pattern replacements:", len(REPLACEMENTS))
