import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Search, RefreshCw, Pencil, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Nguyễn Văn An', email: 'an.nguyen@mamcg.com', role: 'Quản trị viên', status: 'Active', lastLogin: '29/10/2025 10:30' },
  { id: '2', name: 'Trần Thị Bình', email: 'binh.tran@mamcg.com', role: 'Biên tập viên', status: 'Active', lastLogin: '29/10/2025 09:15' },
  { id: '3', name: 'Lê Văn Cường', email: 'cuong.le@mamcg.com', role: 'Người xem', status: 'Active', lastLogin: '28/10/2025 16:45' },
  { id: '4', name: 'Phạm Thị Dung', email: 'dung.pham@mamcg.com', role: 'Biên tập viên', status: 'Inactive', lastLogin: '25/10/2025 14:20' },
  { id: '5', name: 'Hoàng Văn Em', email: 'em.hoang@mamcg.com', role: 'Người xem', status: 'Active', lastLogin: '29/10/2025 08:00' },
];

export function UsersView() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-admin-muted" />
          <Input 
            placeholder="Tìm kiếm người dùng..." 
            className="pl-10 bg-admin-input border-admin text-admin-primary"
          />
        </div>
        <div className="flex gap-3">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Đồng bộ AD/LDAP
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Tổng số người dùng</div>
          <div className="text-2xl text-admin-primary mt-2">{mockUsers.length}</div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Đang hoạt động</div>
          <div className="text-2xl text-green-400 mt-2">
            {mockUsers.filter(u => u.status === 'Active').length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Không hoạt động</div>
          <div className="text-2xl text-admin-secondary mt-2">
            {mockUsers.filter(u => u.status === 'Inactive').length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Đăng nhập hôm nay</div>
          <div className="text-2xl text-admin-accent mt-2">3</div>
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
              <TableHead className="text-admin-secondary">Vai trò</TableHead>
              <TableHead className="text-admin-secondary">Trạng thái</TableHead>
              <TableHead className="text-admin-secondary">Đăng nhập gần nhất</TableHead>
              <TableHead className="text-admin-secondary text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user, index) => (
              <TableRow key={user.id} className="border-admin hover:bg-admin-hover">
                <TableCell className="text-admin-secondary">{index + 1}</TableCell>
                <TableCell className="text-admin-primary">{user.name}</TableCell>
                <TableCell className="text-admin-secondary">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={user.status === 'Active' ? 'border-green-500 text-green-400' : 'border-gray-500 text-gray-400'}
                  >
                    {user.status === 'Active' ? 'Hoạt động' : 'Không hoạt động'}
                  </Badge>
                </TableCell>
                <TableCell className="text-admin-secondary text-sm">{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-admin-hover"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-400 hover:text-red-300 hover:bg-admin-hover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}