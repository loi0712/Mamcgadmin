import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Activity,
  Database,
  Shield,
  Server,
  HardDrive,
  Grid3x3,
  PanelLeft,
  GitBranch
} from 'lucide-react';
import { cn } from '../ui/utils';

interface SidebarProps {
  activeItem: string;
  onItemChange: (item: string) => void;
  activeTopNav: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Menu items theo từng tab
const menuItemsByTab: Record<string, MenuItem[]> = {
  'MONITORING': [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'logs', label: 'Nhật ký', icon: FileText },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'server-status', label: 'Trạng thái Server', icon: Server },
  ],
  'ADMINISTRATION': [
    { id: 'settings', label: 'Cài đặt', icon: Settings },
    { id: 'users', label: 'Tài khoản', icon: Users },
    { id: 'roles', label: 'Nhóm quyền', icon: Shield },
    { id: 'permissions', label: 'Phân quyền', icon: Activity },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'storage', label: 'Lưu trữ', icon: HardDrive },
  ],
  'CUSTOMISATION': [
    { id: 'field-groups', label: 'Nhóm trường DL', icon: Grid3x3 },
    { id: 'data-fields', label: 'Trường dữ liệu', icon: FileText },
    { id: 'display-panels', label: 'Panel hiển thị', icon: PanelLeft },
    { id: 'workflow', label: 'Workflow', icon: GitBranch },
  ],
};

export function Sidebar({ activeItem, onItemChange, activeTopNav }: SidebarProps) {
  const menuItems = menuItemsByTab[activeTopNav] || menuItemsByTab['MONITORING'];

  return (
    <div className="w-[200px] h-screen bg-[#0a0e1a] border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-red-500">M</span>
          <span className="text-green-500">A</span>
          <span className="text-blue-500">M</span>
          <span className="text-yellow-500">C</span>
          <span className="text-yellow-600">G</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Admin Panel</div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onItemChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors",
                activeItem === item.id
                  ? "bg-gray-800/50 text-cyan-400 border-r-2 border-cyan-400"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
