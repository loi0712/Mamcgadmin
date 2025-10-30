import { Activity, Settings as SettingsIcon, Wrench, Moon, User, LayoutGrid, Sun, Palette } from 'lucide-react';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useTheme, Theme } from './ThemeContext';

interface TopNavProps {
  items: string[];
  activeItem: string;
  onItemChange: (item: string) => void;
  isAdminMode: boolean;
  onModeChange: (isAdmin: boolean) => void;
}

const navIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'MONITORING': Activity,
  'ADMINISTRATION': SettingsIcon,
  'CUSTOMISATION': Wrench,
};

export function TopNav({ items, activeItem, onItemChange, isAdminMode, onModeChange }: TopNavProps) {
  const { theme, setTheme } = useTheme();

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'dark', label: 'Tối', icon: <Moon className="w-4 h-4" /> },
    { value: 'light', label: 'Sáng', icon: <Sun className="w-4 h-4" /> },
    { value: 'blue', label: 'Xanh dương', icon: <Palette className="w-4 h-4 text-blue-400" /> },
    { value: 'purple', label: 'Tím', icon: <Palette className="w-4 h-4 text-purple-400" /> },
    { value: 'green', label: 'Xanh lá', icon: <Palette className="w-4 h-4 text-green-400" /> },
  ];

  const currentTheme = themeOptions.find(t => t.value === theme) || themeOptions[0];

  return (
    <div className="bg-admin-topnav border-b border-admin px-6">
      <div className="flex items-center justify-between">
        {/* Left: Navigation Tabs */}
        <div className="flex gap-6">
          {items.map((item) => {
            const Icon = navIcons[item];
            return (
              <button
                key={item}
                onClick={() => onItemChange(item)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm transition-colors border-b-2",
                  activeItem === item
                    ? "border-admin-accent text-admin-primary"
                    : "border-transparent text-admin-secondary hover:text-admin-primary"
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item}
              </button>
            );
          })}
        </div>

        {/* Right: User Controls */}
        <div className="flex items-center gap-4 py-2">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-admin-tertiary rounded">
            <LayoutGrid className="w-4 h-4 text-admin-secondary" />
            <span className="text-sm text-admin-secondary">
              {isAdminMode ? 'Quản trị' : 'Người dùng'}
            </span>
            <Switch 
              checked={isAdminMode}
              onCheckedChange={onModeChange}
              className="data-[state=checked]:bg-admin-accent"
            />
          </div>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-admin-hover rounded transition-colors flex items-center gap-2">
                {currentTheme.icon}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-admin-secondary border-admin" align="end">
              {themeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "text-admin-primary cursor-pointer flex items-center gap-2 hover:bg-admin-hover",
                    theme === option.value && "bg-admin-tertiary text-admin-accent"
                  )}
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Info */}
          <div className="flex items-center gap-2 pl-3 border-l border-admin">
            <button className="p-2 hover:bg-admin-hover rounded transition-colors">
              <User className="w-5 h-5 text-admin-secondary" />
            </button>
            <div className="text-sm text-admin-primary">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}