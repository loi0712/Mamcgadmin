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
    <div className="bg-[#1a1f2e] border-b border-gray-800 px-6">
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
                    ? "border-cyan-400 text-white"
                    : "border-transparent text-gray-400 hover:text-gray-200"
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
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded">
            <LayoutGrid className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">
              {isAdminMode ? 'Quản trị' : 'Người dùng'}
            </span>
            <Switch 
              checked={isAdminMode}
              onCheckedChange={onModeChange}
              className="data-[state=checked]:bg-cyan-500"
            />
          </div>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-800 rounded transition-colors flex items-center gap-2">
                {currentTheme.icon}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0f1419] border-gray-700" align="end">
              {themeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "text-gray-300 cursor-pointer flex items-center gap-2",
                    theme === option.value && "bg-gray-800 text-cyan-400"
                  )}
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Info */}
          <div className="flex items-center gap-2 pl-3 border-l border-gray-700">
            <button className="p-2 hover:bg-gray-800 rounded transition-colors">
              <User className="w-5 h-5 text-gray-400" />
            </button>
            <div className="text-sm text-gray-300">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}