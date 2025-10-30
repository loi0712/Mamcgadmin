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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-admin-accent">Danh sách CG Server</h2>
          <p className="text-sm text-admin-muted mt-1">
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
          <DialogContent className="bg-admin-secondary border-admin text-admin-primary">
            <DialogHeader>
              <DialogTitle className="text-admin-accent">Thêm CG Server mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-admin-primary">Tên Server *</Label>
                <Input 
                  placeholder="CG Server 1"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-admin-primary">Địa chỉ IP *</Label>
                <Input 
                  placeholder="192.168.1.100"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-admin-primary">Port *</Label>
                <Input 
                  placeholder="8080"
                  className="bg-admin-input border-admin text-admin-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-admin-primary">Mô tả</Label>
                <Input 
                  placeholder="Mô tả về server"
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
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Tổng số Server</div>
          <div className="text-2xl text-admin-primary mt-2">{servers.length}</div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Đang hoạt động</div>
          <div className="text-2xl text-green-400 mt-2">
            {servers.filter(s => s.status === 'connected').length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Ngắt kết nối</div>
          <div className="text-2xl text-admin-secondary mt-2">
            {servers.filter(s => s.status === 'disconnected').length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Lỗi</div>
          <div className="text-2xl text-red-400 mt-2">
            {servers.filter(s => s.status === 'error').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-admin rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-admin-secondary border-admin hover:bg-admin-secondary">
              <TableHead className="text-admin-secondary w-16">STT</TableHead>
              <TableHead className="text-admin-secondary">Tên Server</TableHead>
              <TableHead className="text-admin-secondary">Địa chỉ IP</TableHead>
              <TableHead className="text-admin-secondary">Port</TableHead>
              <TableHead className="text-admin-secondary">Trạng thái</TableHead>
              <TableHead className="text-admin-secondary">Kết nối gần nhất</TableHead>
              <TableHead className="text-admin-secondary text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servers.map((server, index) => (
              <TableRow key={server.id} className="border-admin hover:bg-admin-hover">
                <TableCell className="text-admin-secondary">{index + 1}</TableCell>
                <TableCell className="text-admin-primary">{server.name}</TableCell>
                <TableCell className="text-admin-primary font-mono">{server.ipAddress}</TableCell>
                <TableCell className="text-admin-primary font-mono">{server.port}</TableCell>
                <TableCell>{getStatusBadge(server.status)}</TableCell>
                <TableCell className="text-admin-secondary text-sm">{server.lastConnection}</TableCell>
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