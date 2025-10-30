import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Download, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ScrollArea } from '../ui/scroll-area';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  category: string;
  message: string;
  user?: string;
  ip?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2025-10-29 14:32:15',
    level: 'success',
    category: 'Media',
    message: 'Tải lên thành công 5 video files',
    user: 'Nguyễn Văn An',
    ip: '192.168.1.105'
  },
  {
    id: '2',
    timestamp: '2025-10-29 13:45:22',
    level: 'info',
    category: 'User',
    message: 'Người dùng đăng nhập vào hệ thống',
    user: 'Trần Thị Bình',
    ip: '192.168.1.112'
  },
  {
    id: '3',
    timestamp: '2025-10-29 13:18:09',
    level: 'success',
    category: 'Metadata',
    message: 'Cập nhật metadata cho 12 clips',
    user: 'Trần Thị Bình',
    ip: '192.168.1.112'
  },
  {
    id: '4',
    timestamp: '2025-10-29 12:30:45',
    level: 'warning',
    category: 'Storage',
    message: 'Dung lượng lưu trữ primary đạt 75%',
    user: 'System'
  },
  {
    id: '5',
    timestamp: '2025-10-29 11:45:33',
    level: 'success',
    category: 'System',
    message: 'Backup database hoàn tất',
    user: 'System'
  },
  {
    id: '6',
    timestamp: '2025-10-29 11:20:18',
    level: 'error',
    category: 'Database',
    message: 'Kết nối database bị timeout, đã tự động kết nối lại',
    user: 'System'
  },
  {
    id: '7',
    timestamp: '2025-10-29 10:22:56',
    level: 'info',
    category: 'Permission',
    message: 'Tạo nhóm quyền mới: "Editor Team"',
    user: 'Lê Văn Cường',
    ip: '192.168.1.98'
  },
  {
    id: '8',
    timestamp: '2025-10-29 09:15:42',
    level: 'success',
    category: 'Storage',
    message: 'Kết nối storage archive thành công',
    user: 'System'
  },
  {
    id: '9',
    timestamp: '2025-10-29 08:30:11',
    level: 'info',
    category: 'User',
    message: 'Người dùng đăng xuất khỏi hệ thống',
    user: 'Phạm Thị Dung',
    ip: '192.168.1.87'
  },
  {
    id: '10',
    timestamp: '2025-10-29 07:45:29',
    level: 'warning',
    category: 'Security',
    message: 'Phát hiện 3 lần đăng nhập thất bại liên tiếp',
    ip: '192.168.1.200'
  },
];

export function LogsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelBadge = (level: LogEntry['level']) => {
    const config = {
      info: { label: 'Info', className: 'border-blue-500 text-blue-400' },
      success: { label: 'Success', className: 'border-green-500 text-green-400' },
      warning: { label: 'Warning', className: 'border-yellow-500 text-yellow-400' },
      error: { label: 'Error', className: 'border-red-500 text-red-400' },
    };
    const cfg = config[level];
    return <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-[#0f1419] border-gray-800 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input 
              placeholder="Tìm kiếm trong nhật ký..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0a0e1a] border-gray-700 text-gray-300"
            />
          </div>
          
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-40 bg-[#0a0e1a] border-gray-700 text-gray-300">
              <SelectValue placeholder="Mức độ" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1419] border-gray-700">
              <SelectItem value="all" className="text-gray-300">Tất cả</SelectItem>
              <SelectItem value="info" className="text-gray-300">Info</SelectItem>
              <SelectItem value="success" className="text-gray-300">Success</SelectItem>
              <SelectItem value="warning" className="text-gray-300">Warning</SelectItem>
              <SelectItem value="error" className="text-gray-300">Error</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-[#0a0e1a] border-gray-700 text-gray-300">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1419] border-gray-700">
              <SelectItem value="all" className="text-gray-300">Tất cả</SelectItem>
              <SelectItem value="System" className="text-gray-300">System</SelectItem>
              <SelectItem value="User" className="text-gray-300">User</SelectItem>
              <SelectItem value="Media" className="text-gray-300">Media</SelectItem>
              <SelectItem value="Database" className="text-gray-300">Database</SelectItem>
              <SelectItem value="Storage" className="text-gray-300">Storage</SelectItem>
              <SelectItem value="Security" className="text-gray-300">Security</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Logs Table */}
      <Card className="bg-[#0f1419] border-gray-800">
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 bg-[#0f1419] z-10">
              <TableRow className="border-gray-800 hover:bg-[#0f1419]">
                <TableHead className="text-gray-400 w-40">Thời gian</TableHead>
                <TableHead className="text-gray-400 w-24">Mức độ</TableHead>
                <TableHead className="text-gray-400 w-32">Danh mục</TableHead>
                <TableHead className="text-gray-400">Nội dung</TableHead>
                <TableHead className="text-gray-400 w-40">Người dùng</TableHead>
                <TableHead className="text-gray-400 w-32">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-gray-800 hover:bg-gray-900/50">
                  <TableCell className="text-gray-400 text-xs font-mono">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>{getLevelBadge(log.level)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {log.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{log.message}</TableCell>
                  <TableCell className="text-gray-400">{log.user || '-'}</TableCell>
                  <TableCell className="text-gray-400 text-xs font-mono">
                    {log.ip || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
}
