import { ChevronLeft, Save } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showSaveButton?: boolean;
  onSave?: () => void;
}

export function Header({ title, subtitle, showBackButton, showSaveButton, onSave }: HeaderProps) {
  return (
    <div className="bg-admin-secondary border-b border-admin px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button className="p-2 hover:bg-gray-800 rounded transition-colors">
              <ChevronLeft className="w-5 h-5 text-admin-secondary" />
            </button>
          )}
          <div>
            <h1 className="text-cyan-400 flex items-center gap-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-admin-secondary mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showSaveButton && (
            <Button 
              onClick={onSave}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}