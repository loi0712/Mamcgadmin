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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input 
            placeholder="Tìm kiếm người dùng..." 
            className="pl-10 bg-[#0f1419] border-gray-700 text-gray-300"
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
        <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">Tổng số người dùng</div>
          <div className="text-2xl text-white mt-2">{mockUsers.length}</div>
        </div>
        <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">Đang hoạt động</div>
          <div className="text-2xl text-green-400 mt-2">
            {mockUsers.filter(u => u.status === 'Active').length}
          </div>
        </div>
        <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">Không hoạt động</div>
          <div className="text-2xl text-gray-400 mt-2">
            {mockUsers.filter(u => u.status === 'Inactive').length}
          </div>
        </div>
        <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">Đăng nhập hôm nay</div>
          <div className="text-2xl text-cyan-400 mt-2">3</div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0f1419] border-gray-800 hover:bg-[#0f1419]">
              <TableHead className="text-gray-400 w-16">STT</TableHead>
              <TableHead className="text-gray-400">Họ và tên</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Vai trò</TableHead>
              <TableHead className="text-gray-400">Trạng thái</TableHead>
              <TableHead className="text-gray-400">Đăng nhập gần nhất</TableHead>
              <TableHead className="text-gray-400 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user, index) => (
              <TableRow key={user.id} className="border-gray-800 hover:bg-gray-900/50">
                <TableCell className="text-gray-400">{index + 1}</TableCell>
                <TableCell className="text-gray-300">{user.name}</TableCell>
                <TableCell className="text-gray-400">{user.email}</TableCell>
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
                <TableCell className="text-gray-400 text-sm">{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-400 hover:text-red-300 hover:bg-gray-800"
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
