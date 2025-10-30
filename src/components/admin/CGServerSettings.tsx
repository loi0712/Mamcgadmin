import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';

interface CGServer {
  id: string;
  name: string;
  ipAddress: string;
  port: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnection: string;
}

const mockServers: CGServer[] = [
  {
    id: '1',
    name: 'CG Server 1',
    ipAddress: '192.168.1.100',
    port: '8080',
    status: 'connected',
    lastConnection: '29/10/2025 10:30:45'
  },
  {
    id: '2',
    name: 'CG Server 2',
    ipAddress: '192.168.1.101',
    port: '8080',
    status: 'connected',
    lastConnection: '29/10/2025 09:15:22'
  },
  {
    id: '3',
    name: 'CG Backup Server',
    ipAddress: '192.168.1.102',
    port: '8080',
    status: 'disconnected',
    lastConnection: '28/10/2025 23:45:10'
  },
];

export function CGServerSettings() {
  const [servers, setServers] = useState<CGServer[]>(mockServers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: CGServer['status']) => {
    const statusConfig = {
      connected: { label: 'Đã kết nối', className: 'border-green-500 text-green-400' },
      disconnected: { label: 'Ngắt kết nối', className: 'border-gray-500 text-gray-400' },
      error: { label: 'Lỗi', className: 'border-red-500 text-red-400' },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-cyan-400">Danh sách CG Server</h2>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý kết nối với các CG Server
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Thêm Server
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f1419] border-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle className="text-cyan-400">Thêm CG Server mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Tên Server *</Label>
                <Input 
                  placeholder="CG Server 1"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Địa chỉ IP *</Label>
                <Input 
                  placeholder="192.168.1.100"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Port *</Label>
                <Input 
                  placeholder="8080"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Mô tả</Label>
                <Input 
                  placeholder="Mô tả về server"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={() => {
                    // Logic thêm server
                    setIsDialogOpen(false);
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Thêm Server
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">Tổng số Server</div>
          <div className="text-2xl text-white mt-2">{servers.length}</div>
        </div>
        <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">Đang hoạt động</div>
          <div className="text-2xl text-green-400 mt-2">
            {servers.filter(s => s.status === 'connected').length}
          </div>
        </div>
        <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">Ngắt kết nối</div>
          <div className="text-2xl text-gray-400 mt-2">
            {servers.filter(s => s.status === 'disconnected').length}
          </div>
        </div>
        <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400">Lỗi</div>
          <div className="text-2xl text-red-400 mt-2">
            {servers.filter(s => s.status === 'error').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0f1419] border-gray-800 hover:bg-[#0f1419]">
              <TableHead className="text-gray-400 w-16">STT</TableHead>
              <TableHead className="text-gray-400">Tên Server</TableHead>
              <TableHead className="text-gray-400">Địa chỉ IP</TableHead>
              <TableHead className="text-gray-400">Port</TableHead>
              <TableHead className="text-gray-400">Trạng thái</TableHead>
              <TableHead className="text-gray-400">Kết nối gần nhất</TableHead>
              <TableHead className="text-gray-400 text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servers.map((server, index) => (
              <TableRow key={server.id} className="border-gray-800 hover:bg-gray-900/50">
                <TableCell className="text-gray-400">{index + 1}</TableCell>
                <TableCell className="text-gray-300">{server.name}</TableCell>
                <TableCell className="text-gray-300 font-mono">{server.ipAddress}</TableCell>
                <TableCell className="text-gray-300 font-mono">{server.port}</TableCell>
                <TableCell>{getStatusBadge(server.status)}</TableCell>
                <TableCell className="text-gray-400 text-sm">{server.lastConnection}</TableCell>
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
