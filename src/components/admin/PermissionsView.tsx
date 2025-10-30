import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleGroups: string[];
}

interface RoleGroup {
  id: string;
  name: string;
  description: string;
}

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

const mockUsers: User[] = [
  { id: '1', name: 'Nguyễn Văn An', email: 'an.nguyen@mamcg.com', role: 'Quản trị viên', roleGroups: ['1'] },
  { id: '2', name: 'Trần Thị Bình', email: 'binh.tran@mamcg.com', role: 'Biên tập viên', roleGroups: ['2'] },
  { id: '3', name: 'Lê Văn Cường', email: 'cuong.le@mamcg.com', role: 'Người xem', roleGroups: ['3'] },
  { id: '4', name: 'Phạm Thị Dung', email: 'dung.pham@mamcg.com', role: 'Biên tập viên', roleGroups: ['2'] },
  { id: '5', name: 'Hoàng Văn Em', email: 'em.hoang@mamcg.com', role: 'Người xem', roleGroups: ['3'] },
];

const roleGroups: RoleGroup[] = [
  { id: '1', name: 'Quản trị viên', description: 'Toàn quyền truy cập hệ thống' },
  { id: '2', name: 'Biên tập viên', description: 'Quyền chỉnh sửa nội dung' },
  { id: '3', name: 'Người xem', description: 'Chỉ có quyền xem' },
  { id: '4', name: 'Quản lý Media', description: 'Quản lý toàn bộ media' },
  { id: '5', name: 'Moderator', description: 'Kiểm duyệt nội dung' },
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

export function PermissionsView() {
  const [selectedUser, setSelectedUser] = useState<User | null>(mockUsers[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRoleGroups, setUserRoleGroups] = useState<string[]>(mockUsers[0].roleGroups);
  const [functionPermissions, setFunctionPermissions] = useState<FunctionPermission[]>(initialFunctionPermissions);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setUserRoleGroups(user.roleGroups);
  };

  const handleRoleGroupToggle = (roleId: string) => {
    setUserRoleGroups(prev => 
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
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
    <div className="grid grid-cols-12 gap-4">
      {/* Left Column - Users Table */}
      <div className="col-span-5">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-admin-muted" />
            <Input 
              placeholder="Tìm kiếm tài khoản..." 
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
                <TableHead className="text-admin-secondary">Tên</TableHead>
                <TableHead className="text-admin-secondary">Nhóm quyền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow 
                  key={user.id} 
                  onClick={() => handleUserSelect(user)}
                  className={`border-admin cursor-pointer transition-colors ${
                    selectedUser?.id === user.id 
                      ? 'bg-cyan-900/20 hover:bg-cyan-900/30' 
                      : 'hover:bg-admin-hover'
                  }`}
                >
                  <TableCell className="text-admin-secondary">{index + 1}</TableCell>
                  <TableCell>
                    <div className="text-admin-primary">{user.name}</div>
                    <div className="text-xs text-admin-muted mt-1">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                      {user.role}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Right Column - Permissions Tabs */}
      <div className="col-span-7">
        {selectedUser ? (
          <div className="border border-admin rounded-lg bg-admin-secondary p-6">
            <div className="mb-4">
              <div className="text-admin-accent mb-1">Phân quyền cho: {selectedUser.name}</div>
              <div className="text-sm text-admin-muted">{selectedUser.email}</div>
            </div>

            <Tabs defaultValue="functions" className="w-full">
              <TabsList className="bg-admin-input border border-admin w-full">
                <TabsTrigger 
                  value="functions" 
                  className="flex-1 data-[state=active]:bg-admin-hover data-[state=active]:text-admin-accent text-admin-primary"
                >
                  Chức năng
                </TabsTrigger>
                <TabsTrigger 
                  value="role-groups" 
                  className="flex-1 data-[state=active]:bg-admin-hover data-[state=active]:text-admin-accent text-admin-primary"
                >
                  Nhóm quyền
                </TabsTrigger>
              </TabsList>

              {/* Functions Tab */}
              <TabsContent value="functions" className="mt-4">
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
                                <span className="text-admin-secondary">Hiển thị</span>
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
              </TabsContent>

              {/* Role Groups Tab */}
              <TabsContent value="role-groups" className="mt-4">
                <div className="text-sm text-admin-secondary mb-4">
                  Chọn các nhóm quyền để gán cho người dùng này
                </div>
                
                <ScrollArea className="h-[500px]">
                  <div className="grid grid-cols-2 gap-3 pr-4">
                    {roleGroups.map((roleGroup) => (
                      <div
                        key={roleGroup.id}
                        onClick={() => handleRoleGroupToggle(roleGroup.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          userRoleGroups.includes(roleGroup.id)
                            ? 'bg-cyan-900/20 border-cyan-500'
                            : 'bg-admin-input border-admin hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={`role-${roleGroup.id}`}
                            checked={userRoleGroups.includes(roleGroup.id)}
                            onCheckedChange={() => handleRoleGroupToggle(roleGroup.id)}
                            className="mt-1 border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1">
                            <div className="text-admin-primary">{roleGroup.name}</div>
                            <p className="text-xs text-admin-muted mt-1">
                              {roleGroup.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="border border-admin rounded-lg bg-admin-secondary p-6">
            <div className="flex items-center justify-center h-[400px] text-admin-muted">
              Chọn một tài khoản để phân quyền
            </div>
          </div>
        )}
      </div>
    </div>
  );
}