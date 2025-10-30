import { Button } from '../ui/button';
import { Plus, Pencil, Trash2, Search, Save } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '../ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface FunctionPermission {
  id: string;
  name: string;
  category: string;
  permissions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    display: boolean;
    config: boolean;
  };
}

interface RoleGroup {
  id: string;
  name: string;
  description: string;
  userCount: number;
}

const mockRoleGroups: RoleGroup[] = [
  {
    id: '1',
    name: 'Quản trị viên',
    description: 'Toàn quyền truy cập hệ thống',
    userCount: 3
  },
  {
    id: '2',
    name: 'Biên tập viên',
    description: 'Quyền chỉnh sửa nội dung',
    userCount: 12
  },
  {
    id: '3',
    name: 'Người xem',
    description: 'Chỉ có quyền xem',
    userCount: 45
  },
  {
    id: '4',
    name: 'Quản lý Media',
    description: 'Quản lý toàn bộ media',
    userCount: 8
  },
  {
    id: '5',
    name: 'Moderator',
    description: 'Kiểm duyệt nội dung',
    userCount: 5
  },
];

const initialFunctionPermissions: FunctionPermission[] = [
  {
    id: 'media',
    name: 'Quản lý Media',
    category: 'Media',
    permissions: { view: true, edit: true, delete: false, display: true, config: false }
  },
  {
    id: 'upload',
    name: 'Tải lên Media',
    category: 'Media',
    permissions: { view: true, edit: true, delete: false, display: false, config: false }
  },
  {
    id: 'metadata',
    name: 'Quản lý Metadata',
    category: 'Media',
    permissions: { view: true, edit: false, delete: false, display: true, config: false }
  },
  {
    id: 'users',
    name: 'Quản lý người dùng',
    category: 'Hệ thống',
    permissions: { view: false, edit: false, delete: false, display: false, config: false }
  },
  {
    id: 'roles',
    name: 'Quản lý nhóm quyền',
    category: 'Hệ thống',
    permissions: { view: false, edit: false, delete: false, display: false, config: false }
  },
  {
    id: 'settings',
    name: 'Cài đặt hệ thống',
    category: 'Hệ thống',
    permissions: { view: false, edit: false, delete: false, display: false, config: false }
  },
  {
    id: 'database',
    name: 'Quản lý Database',
    category: 'Hệ thống',
    permissions: { view: false, edit: false, delete: false, display: false, config: false }
  },
  {
    id: 'storage',
    name: 'Quản lý lưu trữ',
    category: 'Hệ thống',
    permissions: { view: false, edit: false, delete: false, display: false, config: false }
  },
];

export function RoleGroupsView() {
  const [roleGroups, setRoleGroups] = useState<RoleGroup[]>(mockRoleGroups);
  const [selectedRole, setSelectedRole] = useState<RoleGroup | null>(roleGroups[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [functionPermissions, setFunctionPermissions] = useState<FunctionPermission[]>(initialFunctionPermissions);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<RoleGroup | null>(null);

  const filteredRoleGroups = roleGroups.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleSelect = (role: RoleGroup) => {
    setSelectedRole(role);
  };

  const handleDeleteClick = (role: RoleGroup, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row selection
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (roleToDelete) {
      setRoleGroups(prev => prev.filter(role => role.id !== roleToDelete.id));
      
      // If deleted role was selected, clear selection
      if (selectedRole?.id === roleToDelete.id) {
        setSelectedRole(roleGroups[0] || null);
      }
      
      toast.success('Đã xóa nhóm quyền', {
        description: `Nhóm quyền "${roleToDelete.name}" đã được xóa thành công`
      });
      
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const handlePermissionToggle = (functionId: string, permissionType: keyof FunctionPermission['permissions']) => {
    setFunctionPermissions(prev => 
      prev.map(func => 
        func.id === functionId
          ? {
              ...func,
              permissions: {
                ...func.permissions,
                [permissionType]: !func.permissions[permissionType]
              }
            }
          : func
      )
    );
  };

  const groupedFunctions = functionPermissions.reduce((acc, func) => {
    if (!acc[func.category]) {
      acc[func.category] = [];
    }
    acc[func.category].push(func);
    return acc;
  }, {} as Record<string, FunctionPermission[]>);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Thêm nhóm quyền
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-md">
            <DialogHeader>
              <DialogTitle className="text-admin-accent">Thêm nhóm quyền mới</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-admin-primary">Tên nhóm quyền *</Label>
                <Input 
                  placeholder="Nhập tên nhóm quyền"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-admin-primary">Mô tả</Label>
                <Input 
                  placeholder="Mô tả về nhóm quyền"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>

              <div className="flex gap-3 justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="border-admin text-admin-primary hover:bg-admin-hover"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={() => {
                    setIsDialogOpen(false);
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Tạo nhóm
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Role Groups Table */}
        <div className="col-span-5">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-admin-muted" />
              <Input 
                placeholder="Tìm kiếm nhóm quyền..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-admin-input border-admin text-admin-primary"
              />
            </div>
          </div>
          
          <div className="border border-admin rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-admin-secondary border-admin hover:bg-admin-secondary">
                  <TableHead className="text-admin-secondary w-16">STT</TableHead>
                  <TableHead className="text-admin-secondary">Tên nhóm</TableHead>
                  <TableHead className="text-admin-secondary w-24">Người dùng</TableHead>
                  <TableHead className="text-admin-secondary w-16 text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoleGroups.map((role, index) => (
                  <TableRow 
                    key={role.id} 
                    className={`border-admin cursor-pointer transition-colors ${
                      selectedRole?.id === role.id 
                        ? 'bg-cyan-900/20 hover:bg-cyan-900/30' 
                        : 'hover:bg-admin-hover'
                    }`}
                  >
                    <TableCell 
                      className="text-admin-secondary"
                      onClick={() => handleRoleSelect(role)}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell onClick={() => handleRoleSelect(role)}>
                      <div className="text-admin-primary">{role.name}</div>
                      <div className="text-xs text-admin-muted mt-1">{role.description}</div>
                    </TableCell>
                    <TableCell onClick={() => handleRoleSelect(role)}>
                      <Badge variant="outline" className="border-gray-600 text-gray-400">
                        {role.userCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDeleteClick(role, e)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Column - Function Permissions */}
        <div className="col-span-7">
          {selectedRole ? (
            <div className="border border-admin rounded-lg bg-admin-secondary p-6">
              <div className="mb-4">
                <div className="text-admin-accent mb-1">Cấu hình quyền cho: {selectedRole.name}</div>
                <div className="text-sm text-admin-muted">{selectedRole.description}</div>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-4 pr-4">
                  {Object.entries(groupedFunctions).map(([category, functions]) => (
                    <div key={category} className="space-y-2">
                      <div className="text-sm text-admin-secondary border-b border-admin pb-2">
                        {category}
                      </div>
                      {functions.map((func) => (
                        <div
                          key={func.id}
                          className="p-4 rounded-lg bg-admin-input border border-admin"
                        >
                          <div className="text-admin-primary mb-3">{func.name}</div>
                          <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <Checkbox
                                checked={func.permissions.view}
                                onCheckedChange={() => handlePermissionToggle(func.id, 'view')}
                                className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                              />
                              <span className="text-sm text-admin-secondary">Xem</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <Checkbox
                                checked={func.permissions.edit}
                                onCheckedChange={() => handlePermissionToggle(func.id, 'edit')}
                                className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                              />
                              <span className="text-sm text-admin-secondary">Sửa</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <Checkbox
                                checked={func.permissions.delete}
                                onCheckedChange={() => handlePermissionToggle(func.id, 'delete')}
                                className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                              />
                              <span className="text-sm text-admin-secondary">Xóa</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <Checkbox
                                checked={func.permissions.display}
                                onCheckedChange={() => handlePermissionToggle(func.id, 'display')}
                                className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                              />
                              <span className="text-sm text-admin-secondary">Hiển thị</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <Checkbox
                                checked={func.permissions.config}
                                onCheckedChange={() => handlePermissionToggle(func.id, 'config')}
                                className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                              />
                              <span className="text-sm text-admin-secondary">Cấu hình</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="border border-admin rounded-lg bg-admin-secondary p-6">
              <div className="flex items-center justify-center h-[400px] text-admin-muted">
                Chọn một nhóm quyền để cấu hình
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-admin-accent">Xác nhận xóa nhóm quyền</AlertDialogTitle>
          </AlertDialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-admin-primary">Bạn có chắc chắn muốn xóa nhóm quyền này?</Label>
              <div className="text-sm text-admin-muted">
                Nhóm quyền "{roleToDelete?.name}" sẽ bị xóa và không thể khôi phục.
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-4">
              <Button 
                variant="outline" 
                onClick={() => setDeleteDialogOpen(false)}
                className="border-admin text-admin-primary hover:bg-admin-hover"
              >
                Hủy
              </Button>
              <Button 
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Xóa
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}