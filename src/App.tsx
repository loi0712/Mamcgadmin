import { useState, useEffect } from 'react';
import { Sidebar } from './components/admin/Sidebar';
import { Header } from './components/admin/Header';
import { DashboardHeader } from './components/admin/DashboardHeader';
import { TopNav } from './components/admin/TopNav';
import { ThemeProvider } from './components/admin/ThemeContext';
import { DashboardView } from './components/admin/DashboardView';
import { SettingsView } from './components/admin/SettingsView';
import { FilesView } from './components/admin/FilesView';
import { UsersView } from './components/admin/UsersView';
import { DatabaseView } from './components/admin/DatabaseView';
import { StorageView } from './components/admin/StorageView';
import { RoleGroupsView } from './components/admin/RoleGroupsView';
import { PermissionsView } from './components/admin/PermissionsView';
import { LogsView } from './components/admin/LogsView';
import { NotificationsView } from './components/admin/NotificationsView';
import { ServerStatusView } from './components/admin/ServerStatusView';
import { FieldGroupsView } from './components/admin/FieldGroupsView';
import { DataFieldsView } from './components/admin/DataFieldsView';
import { DisplayPanelsView } from './components/admin/DisplayPanelsView';
import { WorkflowView } from './components/admin/WorkflowView';
import { WorkflowEditorView } from './components/admin/WorkflowEditorView';

export default function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [activeTopNav, setActiveTopNav] = useState('MONITORING');
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [editingWorkflowId, setEditingWorkflowId] = useState<string | null>(null);

  // Reset menu item khi chuyển tab
  useEffect(() => {
    const defaultMenuItems: Record<string, string> = {
      'MONITORING': 'dashboard',
      'ADMINISTRATION': 'settings',
      'CUSTOMISATION': 'field-groups',
    };
    setActiveMenuItem(defaultMenuItems[activeTopNav] || 'dashboard');
  }, [activeTopNav]);

  const renderContent = () => {
    switch (activeMenuItem) {
      // MONITORING
      case 'dashboard':
        return <DashboardView />;
      case 'logs':
        return <LogsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'server-status':
        return <ServerStatusView />;
      
      // ADMINISTRATION
      case 'settings':
        return <SettingsView />;
      case 'users':
        return <UsersView />;
      case 'roles':
        return <RoleGroupsView />;
      case 'permissions':
        return <PermissionsView />;
      case 'database':
        return <DatabaseView />;
      case 'storage':
        return <StorageView />;

      // CUSTOMISATION
      case 'field-groups':
        return <FieldGroupsView />;
      case 'data-fields':
        return <DataFieldsView />;
      case 'display-panels':
        return <DisplayPanelsView />;
      case 'workflow':
        return <WorkflowView onEditWorkflow={(id) => setEditingWorkflowId(id)} />;
      
      default:
        return <DashboardView />;
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, { title: string; subtitle?: string }> = {
      // MONITORING
      dashboard: { title: 'CatDV Server Dashboard', subtitle: 'System version 10.7.4.27580 (Web Client and Web Services running)' },
      logs: { title: 'Nhật ký hệ thống', subtitle: 'Xem nhật ký hoạt động của hệ thống' },
      notifications: { title: 'Thông báo', subtitle: 'Quản lý thông báo hệ thống' },
      'server-status': { title: 'Trạng thái Server', subtitle: 'Giám sát trạng thái và hiệu suất server' },
      
      // ADMINISTRATION
      settings: { title: 'Cấu hình các thiết lập hệ thống' },
      users: { title: 'Quản lý người dùng và quyền truy cập' },
      roles: { title: 'Cấu hình nhóm quyền và phân quyền' },
      permissions: { title: 'Phân quyền chi tiết cho người dùng' },
      database: { title: 'Quản lý kết nối cơ sở dữ liệu' },
      storage: { title: 'Quản lý hệ thống lưu trữ' },
      
      // CUSTOMISATION
      'field-groups': { title: 'Quản lý các nhóm trường dữ liệu' },
      'data-fields': { title: 'Cấu hình các trường dữ liệu tùy chỉnh' },
      'display-panels': { title: 'Tùy chỉnh giao diện hiển thị' },
      'workflow': { title: 'Quản lý quy trình xử lý tự động' },
    };
    return titles[activeMenuItem] || titles.dashboard;
  };

  const handleModeChange = (isAdmin: boolean) => {
    setIsAdminMode(isAdmin);
    // Có thể thêm logic chuyển đổi sang giao diện người dùng ở đây
    if (!isAdmin) {
      console.log('Chuyển sang giao diện người dùng');
    }
  };

  // If editing workflow, show full-screen editor
  if (editingWorkflowId) {
    return (
      <WorkflowEditorView 
        workflowId={editingWorkflowId}
        onBack={() => setEditingWorkflowId(null)}
      />
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#050810] text-gray-100 flex overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar 
            activeItem={activeMenuItem} 
            onItemChange={setActiveMenuItem}
            activeTopNav={activeTopNav}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation */}
          <TopNav 
            items={['MONITORING', 'ADMINISTRATION', 'CUSTOMISATION']}
            activeItem={activeTopNav}
            onItemChange={setActiveTopNav}
            isAdminMode={isAdminMode}
            onModeChange={handleModeChange}
          />

          {/* Header - Show DashboardHeader for dashboard, regular Header for others */}
          {activeMenuItem === 'dashboard' ? (
            <DashboardHeader />
          ) : (
            <Header 
              title={getPageTitle().title}
              subtitle={getPageTitle().subtitle}
              showBackButton={false}
              showSaveButton={activeMenuItem === 'settings'}
              onSave={() => console.log('Save clicked')}
            />
          )}

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}