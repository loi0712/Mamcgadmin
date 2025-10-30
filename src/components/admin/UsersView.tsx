import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Search, RefreshCw, Pencil, Trash2, Eye, Key, UserCog, Power, Settings2, Download, Upload, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { useState } from 'react';
import { AlertCircle, Users } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdAt: string;
  source: 'local' | 'ldap';
}

interface LDAPUser {
  id: string;
  name: string;
  email: string;
  username: string;
  department: string;
  dn: string;
}

const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'Nguyễn Văn An', 
    email: 'an.nguyen@mamcg.com', 
    username: 'an.nguyen',
    role: 'Quản trị viên', 
    status: 'Active', 
    lastLogin: '29/10/2025 10:30',
    createdAt: '01/01/2025',
    source: 'local'
  },
  { 
    id: '2', 
    name: 'Trần Thị Bình', 
    email: 'binh.tran@mamcg.com',
    username: 'binh.tran', 
    role: 'Biên tập viên', 
    status: 'Active', 
    lastLogin: '29/10/2025 09:15',
    createdAt: '05/01/2025',
    source: 'ldap'
  },
  { 
    id: '3', 
    name: 'Lê Văn Cường', 
    email: 'cuong.le@mamcg.com',
    username: 'cuong.le', 
    role: 'Người xem', 
    status: 'Active', 
    lastLogin: '28/10/2025 16:45',
    createdAt: '10/01/2025',
    source: 'local'
  },
  { 
    id: '4', 
    name: 'Phạm Thị Dung', 
    email: 'dung.pham@mamcg.com',
    username: 'dung.pham', 
    role: 'Biên tập viên', 
    status: 'Inactive', 
    lastLogin: '25/10/2025 14:20',
    createdAt: '15/01/2025',
    source: 'local'
  },
  { 
    id: '5', 
    name: 'Hoàng Văn Em', 
    email: 'em.hoang@mamcg.com',
    username: 'em.hoang', 
    role: 'Người xem', 
    status: 'Active', 
    lastLogin: '29/10/2025 08:00',
    createdAt: '20/01/2025',
    source: 'ldap'
  },
];

const mockLDAPUsers: LDAPUser[] = [
  { id: 'ldap1', name: 'Vũ Thị Hoa', email: 'hoa.vu@mamcg.com', username: 'hoa.vu', department: 'IT', dn: 'CN=Vũ Thị Hoa,OU=Users,DC=mamcg,DC=com' },
  { id: 'ldap2', name: 'Đỗ Văn Khánh', email: 'khanh.do@mamcg.com', username: 'khanh.do', department: 'HR', dn: 'CN=Đỗ Văn Khánh,OU=Users,DC=mamcg,DC=com' },
  { id: 'ldap3', name: 'Ngô Thị Lan', email: 'lan.ngo@mamcg.com', username: 'lan.ngo', department: 'Production', dn: 'CN=Ngô Thị Lan,OU=Users,DC=mamcg,DC=com' },
  { id: 'ldap4', name: 'Bùi Văn Minh', email: 'minh.bui@mamcg.com', username: 'minh.bui', department: 'IT', dn: 'CN=Bùi Văn Minh,OU=Users,DC=mamcg,DC=com' },
  { id: 'ldap5', name: 'Đinh Thị Nga', email: 'nga.dinh@mamcg.com', username: 'nga.dinh', department: 'Production', dn: 'CN=Đinh Thị Nga,OU=Users,DC=mamcg,DC=com' },
];

const roles = ['Quản trị viên', 'Biên tập viên', 'Người xem', 'Khách'];

export function UsersView() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedLDAPUsers, setSelectedLDAPUsers] = useState<Set<string>>(new Set());
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [isChangeRoleDialogOpen, setIsChangeRoleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLDAPSyncDialogOpen, setIsLDAPSyncDialogOpen] = useState(false);
  const [isSyncingLDAP, setIsSyncingLDAP] = useState(false);
  
  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState(roles[0]);
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Actions
  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormUsername(user.username);
    setFormRole(user.role);
    setIsEditDialogOpen(true);
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setNewPassword('');
    setIsResetPasswordDialogOpen(true);
  };

  const handleChangeRole = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsChangeRoleDialogOpen(true);
  };

  const handleToggleStatus = (user: User) => {
    setUsers(prev => prev.map(u => 
      u.id === user.id 
        ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
        : u
    ));
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleAddUser = () => {
    // Add user logic
    console.log('Adding user:', { formName, formEmail, formUsername, formRole });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      setUsers(prev => prev.map(u => 
        u.id === selectedUser.id 
          ? { ...u, name: formName, email: formEmail, username: formUsername, role: formRole }
          : u
      ));
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      resetForm();
    }
  };

  const handleSaveResetPassword = () => {
    console.log('Reset password for user:', selectedUser?.id, newPassword);
    setIsResetPasswordDialogOpen(false);
    setSelectedUser(null);
    setNewPassword('');
  };

  const handleSaveChangeRole = () => {
    if (selectedUser) {
      setUsers(prev => prev.map(u => 
        u.id === selectedUser.id 
          ? { ...u, role: newRole }
          : u
      ));
      setIsChangeRoleDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormUsername('');
    setFormPassword('');
    setFormRole(roles[0]);
  };

  const toggleLDAPUser = (userId: string) => {
    setSelectedLDAPUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSyncLDAP = () => {
    setIsSyncingLDAP(true);
    
    // Simulate sync process
    setTimeout(() => {
      const usersToImport = mockLDAPUsers
        .filter(ldapUser => selectedLDAPUsers.has(ldapUser.id))
        .map(ldapUser => ({
          id: `user-${Date.now()}-${Math.random()}`,
          name: ldapUser.name,
          email: ldapUser.email,
          username: ldapUser.username,
          role: 'Người xem',
          status: 'Active' as const,
          lastLogin: '-',
          createdAt: new Date().toLocaleDateString('vi-VN'),
          source: 'ldap' as const,
        }));

      setUsers(prev => [...prev, ...usersToImport]);
      setIsSyncingLDAP(false);
      setIsLDAPSyncDialogOpen(false);
      setSelectedLDAPUsers(new Set());
    }, 2000);
  };

  const getStatusIcon = (status: User['status']) => {
    return status === 'Active' 
      ? <CheckCircle className="w-4 h-4 text-green-400" />
      : <XCircle className="w-4 h-4 text-gray-400" />;
  };

  const getSourceBadge = (source: User['source']) => {
    return source === 'ldap' 
      ? <Badge variant="outline" className="border-purple-500 text-purple-400 text-[10px]">LDAP</Badge>
      : <Badge variant="outline" className="border-blue-500 text-blue-400 text-[10px]">Local</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-admin-muted" />
          <Input 
            placeholder="Tìm kiếm người dùng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-admin-input border-admin text-admin-primary"
          />
        </div>
        <div className="flex gap-3">
          <Dialog open={isLDAPSyncDialogOpen} onOpenChange={setIsLDAPSyncDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Đồng bộ AD/LDAP
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-admin-accent flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Đồng bộ người dùng từ AD/LDAP
                </DialogTitle>
                <DialogDescription className="text-admin-muted">
                  Chọn người dùng từ Active Directory/LDAP để thêm vào hệ thống
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <Alert className="bg-blue-900/20 border-blue-500">
                  <AlertCircle className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-blue-400 text-sm ml-2">
                    Đã kết nối tới LDAP Server: ldap://192.168.1.100:389 (DC=mamcg,DC=com)
                  </AlertDescription>
                </Alert>

                <div className="border border-admin rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-admin-secondary z-10">
                      <TableRow className="border-admin hover:bg-admin-secondary">
                        <TableHead className="text-admin-secondary w-12">
                          <Checkbox 
                            checked={selectedLDAPUsers.size === mockLDAPUsers.length}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedLDAPUsers(new Set(mockLDAPUsers.map(u => u.id)));
                              } else {
                                setSelectedLDAPUsers(new Set());
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead className="text-admin-secondary">Tên</TableHead>
                        <TableHead className="text-admin-secondary">Email</TableHead>
                        <TableHead className="text-admin-secondary">Username</TableHead>
                        <TableHead className="text-admin-secondary">Phòng ban</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLDAPUsers.map((ldapUser) => (
                        <TableRow key={ldapUser.id} className="border-admin hover:bg-admin-hover">
                          <TableCell>
                            <Checkbox 
                              checked={selectedLDAPUsers.has(ldapUser.id)}
                              onCheckedChange={() => toggleLDAPUser(ldapUser.id)}
                            />
                          </TableCell>
                          <TableCell className="text-admin-primary">{ldapUser.name}</TableCell>
                          <TableCell className="text-admin-secondary">{ldapUser.email}</TableCell>
                          <TableCell className="text-admin-secondary text-sm">{ldapUser.username}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-purple-500 text-purple-400">
                              {ldapUser.department}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between text-sm text-admin-secondary bg-admin-input p-3 rounded border border-admin">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Đã chọn: <span className="text-admin-accent">{selectedLDAPUsers.size}</span> người dùng
                  </div>
                  <div className="text-admin-muted">
                    Vai trò mặc định: <span className="text-admin-primary">Người xem</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsLDAPSyncDialogOpen(false);
                    setSelectedLDAPUsers(new Set());
                  }}
                  className="border-admin text-admin-primary hover:bg-admin-hover"
                  disabled={isSyncingLDAP}
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleSyncLDAP}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  disabled={selectedLDAPUsers.size === 0 || isSyncingLDAP}
                >
                  {isSyncingLDAP ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Đang đồng bộ...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Đồng bộ {selectedLDAPUsers.size > 0 ? `(${selectedLDAPUsers.size})` : ''}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Thêm người dùng
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-md">
              <DialogHeader>
                <DialogTitle className="text-admin-accent">Thêm người dùng mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-admin-primary">Họ và tên *</Label>
                  <Input 
                    placeholder="Nhập họ và tên"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-admin-primary">Email *</Label>
                  <Input 
                    type="email"
                    placeholder="email@mamcg.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-admin-primary">Username *</Label>
                  <Input 
                    placeholder="username"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-admin-primary">Mật khẩu *</Label>
                  <Input 
                    type="password"
                    placeholder="********"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-admin-primary">Vai trò</Label>
                  <Select value={formRole} onValueChange={setFormRole}>
                    <SelectTrigger className="bg-admin-input border-admin text-admin-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-admin-secondary border-admin">
                      {roles.map(role => (
                        <SelectItem key={role} value={role} className="text-admin-primary">
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}
                  className="border-admin text-admin-primary hover:bg-admin-hover"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleAddUser}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Thêm người dùng
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Tổng số người dùng</div>
          <div className="text-2xl text-admin-primary mt-2">{users.length}</div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Đang hoạt động</div>
          <div className="text-2xl text-green-400 mt-2">
            {users.filter(u => u.status === 'Active').length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Không hoạt động</div>
          <div className="text-2xl text-admin-secondary mt-2">
            {users.filter(u => u.status === 'Inactive').length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">LDAP Users</div>
          <div className="text-2xl text-purple-400 mt-2">
            {users.filter(u => u.source === 'ldap').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-admin rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-admin-secondary border-admin hover:bg-admin-secondary">
              <TableHead className="text-admin-secondary w-16">STT</TableHead>
              <TableHead className="text-admin-secondary">Họ và tên</TableHead>
              <TableHead className="text-admin-secondary">Email</TableHead>
              <TableHead className="text-admin-secondary">Username</TableHead>
              <TableHead className="text-admin-secondary">Vai trò</TableHead>
              <TableHead className="text-admin-secondary w-32">Nguồn</TableHead>
              <TableHead className="text-admin-secondary w-36">Trạng thái</TableHead>
              <TableHead className="text-admin-secondary">Đăng nhập gần nhất</TableHead>
              <TableHead className="text-admin-secondary text-center w-32">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id} className="border-admin hover:bg-admin-hover">
                <TableCell className="text-admin-secondary">{index + 1}</TableCell>
                <TableCell className="text-admin-primary">{user.name}</TableCell>
                <TableCell className="text-admin-secondary">{user.email}</TableCell>
                <TableCell className="text-admin-secondary text-sm font-mono">{user.username}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{getSourceBadge(user.source)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(user.status)}
                    <Badge 
                      variant="outline" 
                      className={user.status === 'Active' ? 'border-green-500 text-green-400' : 'border-gray-500 text-gray-400'}
                    >
                      {user.status === 'Active' ? 'Hoạt động' : 'Không hoạt động'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-admin-secondary text-sm">{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-admin-accent hover:text-admin-primary hover:bg-admin-hover h-8 w-8 p-0"
                        >
                          <Settings2 className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-admin-secondary border-admin w-48">
                        <DropdownMenuItem 
                          onClick={() => handleView(user)}
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleEdit(user)}
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleResetPassword(user)}
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Đặt lại mật khẩu
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleChangeRole(user)}
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <UserCog className="w-4 h-4 mr-2" />
                          Thay đổi vai trò
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-admin-border" />
                        <DropdownMenuItem 
                          onClick={() => handleToggleStatus(user)}
                          className={`hover:bg-admin-hover cursor-pointer ${
                            user.status === 'Active' ? 'text-yellow-400' : 'text-green-400'
                          }`}
                        >
                          <Power className="w-4 h-4 mr-2" />
                          {user.status === 'Active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-admin-border" />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(user)}
                          className="text-red-400 hover:bg-red-900/20 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa người dùng
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-admin-accent">Thông tin người dùng</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-admin-secondary">Họ và tên</div>
                  <div className="text-admin-primary">{selectedUser.name}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-admin-secondary">Username</div>
                  <div className="text-admin-primary font-mono">{selectedUser.username}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-admin-secondary">Email</div>
                  <div className="text-admin-primary">{selectedUser.email}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-admin-secondary">Vai trò</div>
                  <Badge variant="outline" className="border-cyan-500 text-cyan-400 w-fit">
                    {selectedUser.role}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-admin-secondary">Trạng thái</div>
                  <Badge 
                    variant="outline" 
                    className={`w-fit ${selectedUser.status === 'Active' ? 'border-green-500 text-green-400' : 'border-gray-500 text-gray-400'}`}
                  >
                    {selectedUser.status === 'Active' ? 'Hoạt động' : 'Không hoạt động'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-admin-secondary">Nguồn</div>
                  {getSourceBadge(selectedUser.source)}
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-admin-secondary">Đăng nhập gần nhất</div>
                  <div className="text-admin-primary">{selectedUser.lastLogin}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-admin-secondary">Ngày tạo</div>
                  <div className="text-admin-primary">{selectedUser.createdAt}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              onClick={() => setIsViewDialogOpen(false)}
              className="bg-admin-input border-admin text-admin-primary hover:bg-admin-hover"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-md">
          <DialogHeader>
            <DialogTitle className="text-admin-accent">Chỉnh sửa người dùng</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-admin-primary">Họ và tên</Label>
              <Input 
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="bg-admin-input border-admin text-admin-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-admin-primary">Email</Label>
              <Input 
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="bg-admin-input border-admin text-admin-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-admin-primary">Username</Label>
              <Input 
                value={formUsername}
                onChange={(e) => setFormUsername(e.target.value)}
                className="bg-admin-input border-admin text-admin-primary"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label className="text-admin-primary">Vai trò</Label>
              <Select value={formRole} onValueChange={setFormRole}>
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  {roles.map(role => (
                    <SelectItem key={role} value={role} className="text-admin-primary">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-admin text-admin-primary hover:bg-admin-hover"
            >
              Hủy
            </Button>
            <Button 
              onClick={handleUpdateUser}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Cập nhật
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-md">
          <DialogHeader>
            <DialogTitle className="text-admin-accent">Đặt lại mật khẩu</DialogTitle>
            <DialogDescription className="text-admin-muted">
              Đặt lại mật khẩu cho: <span className="text-admin-primary">{selectedUser?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-admin-primary">Mật khẩu mới</Label>
              <Input 
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-admin-input border-admin text-admin-primary"
              />
            </div>
            <Alert className="bg-yellow-900/20 border-yellow-500">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-400 text-sm ml-2">
                Người dùng sẽ được yêu cầu đổi mật khẩu khi đăng nhập lần sau
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsResetPasswordDialogOpen(false)}
              className="border-admin text-admin-primary hover:bg-admin-hover"
            >
              Hủy
            </Button>
            <Button 
              onClick={handleSaveResetPassword}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Đặt lại mật khẩu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={isChangeRoleDialogOpen} onOpenChange={setIsChangeRoleDialogOpen}>
        <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-md">
          <DialogHeader>
            <DialogTitle className="text-admin-accent">Thay đổi vai trò</DialogTitle>
            <DialogDescription className="text-admin-muted">
              Thay đổi vai trò cho: <span className="text-admin-primary">{selectedUser?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-admin-primary">Vai trò hiện tại</Label>
              <div className="p-3 bg-admin-input border border-admin rounded text-admin-secondary">
                {selectedUser?.role}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-admin-primary">Vai trò mới</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  {roles.map(role => (
                    <SelectItem key={role} value={role} className="text-admin-primary">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsChangeRoleDialogOpen(false)}
              className="border-admin text-admin-primary hover:bg-admin-hover"
            >
              Hủy
            </Button>
            <Button 
              onClick={handleSaveChangeRole}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Thay đổi vai trò
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-400">Xác nhận xóa người dùng</DialogTitle>
            <DialogDescription className="text-admin-muted">
              Bạn có chắc chắn muốn xóa người dùng này?
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-2 mt-4 p-4 bg-admin-input border border-admin rounded">
              <div className="text-admin-primary">Tên: {selectedUser.name}</div>
              <div className="text-admin-secondary text-sm">Email: {selectedUser.email}</div>
              <div className="text-admin-secondary text-sm">Vai trò: {selectedUser.role}</div>
            </div>
          )}
          <Alert className="bg-red-900/20 border-red-500">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400 text-sm ml-2">
              Hành động này không thể hoàn tác!
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-admin text-admin-primary hover:bg-admin-hover"
            >
              Hủy
            </Button>
            <Button 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Xóa người dùng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}