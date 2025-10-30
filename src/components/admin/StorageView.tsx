import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus, Pencil, Trash2, TestTube, Save, HardDrive, Cloud, FolderOpen, Settings2, Eye, Play, Square, RefreshCw, BarChart3, Eraser } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';

interface StorageConnection {
  id: string;
  name: string;
  type: 'NAS' | 'SAN' | 'FTP' | 'Amazon S3' | 'Wasabi' | 'Azure Blob' | 'Google Cloud';
  host: string;
  path: string;
  capacity: string;
  used: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnection: string;
}

const mockStorage: StorageConnection[] = [
  {
    id: '1',
    name: 'Main NAS Storage',
    type: 'NAS',
    host: '192.168.1.100',
    path: '/volume1/media',
    capacity: '10 TB',
    used: '6.5 TB',
    status: 'connected',
    lastConnection: '29/10/2025 10:30:45'
  },
  {
    id: '2',
    name: 'Amazon S3 Backup',
    type: 'Amazon S3',
    host: 's3.amazonaws.com',
    path: 'mamcg-backup',
    capacity: 'Unlimited',
    used: '2.3 TB',
    status: 'connected',
    lastConnection: '29/10/2025 09:15:22'
  },
  {
    id: '3',
    name: 'Legacy FTP Server',
    type: 'FTP',
    host: '192.168.1.150',
    path: '/archive',
    capacity: '5 TB',
    used: '4.8 TB',
    status: 'disconnected',
    lastConnection: '28/10/2025 23:45:10'
  },
  {
    id: '4',
    name: 'Wasabi Cold Storage',
    type: 'Wasabi',
    host: 's3.wasabisys.com',
    path: 'mamcg-archive',
    capacity: 'Unlimited',
    used: '8.2 TB',
    status: 'connected',
    lastConnection: '29/10/2025 08:00:00'
  },
];

const storageTypes = [
  { value: 'nas', label: 'NAS (Network Attached Storage)', icon: HardDrive },
  { value: 'san', label: 'SAN (Storage Area Network)', icon: HardDrive },
  { value: 'ftp', label: 'FTP/SFTP Server', icon: FolderOpen },
  { value: 's3', label: 'Amazon S3', icon: Cloud },
  { value: 'wasabi', label: 'Wasabi Cloud Storage', icon: Cloud },
  { value: 'azure', label: 'Azure Blob Storage', icon: Cloud },
  { value: 'gcs', label: 'Google Cloud Storage', icon: Cloud },
];

export function StorageView() {
  const [storages, setStorages] = useState<StorageConnection[]>(mockStorage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('nas');
  const [useSSL, setUseSSL] = useState(false);

  const getStatusBadge = (status: StorageConnection['status']) => {
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

  const getTypeIcon = (type: string) => {
    const isCloud = ['Amazon S3', 'Wasabi', 'Azure Blob', 'Google Cloud'].includes(type);
    return isCloud ? (
      <Cloud className="w-4 h-4 text-blue-400" />
    ) : (
      <HardDrive className="w-4 h-4 text-cyan-400" />
    );
  };

  const renderConnectionFields = () => {
    const isCloud = ['s3', 'wasabi', 'azure', 'gcs'].includes(selectedType);
    const isFTP = selectedType === 'ftp';

    if (isCloud) {
      return (
        <>
          <div className="space-y-2">
            <Label className="text-admin-primary">Bucket/Container Name *</Label>
            <Input 
              placeholder="my-bucket-name"
              className="bg-admin-input border-admin text-admin-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-admin-primary">Access Key ID *</Label>
            <Input 
              placeholder="AKIAIOSFODNN7EXAMPLE"
              className="bg-admin-input border-admin text-admin-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-admin-primary">Secret Access Key *</Label>
            <Input 
              type="password"
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
              className="bg-admin-input border-admin text-admin-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-admin-primary">Region</Label>
            <Input 
              placeholder="us-east-1"
              className="bg-admin-input border-admin text-admin-primary"
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-admin-primary">Host/IP *</Label>
            <Input 
              placeholder="192.168.1.100"
              className="bg-admin-input border-admin text-admin-primary"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-admin-primary">Cổng (Port)</Label>
            <Input 
              placeholder={isFTP ? "21" : "445"}
              className="bg-admin-input border-admin text-admin-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-admin-primary">Đường dẫn *</Label>
          <Input 
            placeholder="/volume1/media"
            className="bg-admin-input border-admin text-admin-primary"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-admin-primary">Username</Label>
          <Input 
            placeholder="username"
            className="bg-admin-input border-admin text-admin-primary"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-admin-primary">Password</Label>
          <Input 
            type="password"
            placeholder="••••••••"
            className="bg-admin-input border-admin text-admin-primary"
          />
        </div>

        {isFTP && (
          <div className="flex items-center justify-between p-4 bg-admin-input rounded border border-admin">
            <div>
              <Label className="text-admin-primary">Sử dụng SFTP (SSH)</Label>
              <p className="text-xs text-admin-muted mt-1">Kết nối bảo mật qua SSH</p>
            </div>
            <Switch 
              checked={useSSL}
              onCheckedChange={setUseSSL}
              className="data-[state=checked]:bg-cyan-500"
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Thêm hệ thống lưu trữ
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-admin-secondary border-admin text-admin-primary max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-admin-accent">Thêm hệ thống lưu trữ mới</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="bg-admin-input border border-admin">
                <TabsTrigger value="basic" className="data-[state=active]:bg-admin-hover data-[state=active]:text-admin-accent text-admin-primary">
                  Thông tin kết nối
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-admin-hover data-[state=active]:text-admin-accent text-admin-primary">
                  Cấu hình nâng cao
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-admin-primary">Tên hệ thống lưu trữ *</Label>
                  <Input 
                    placeholder="Main Storage"
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-admin-primary">Loại lưu trữ *</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-admin-input border-admin text-admin-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-admin-secondary border-admin">
                      {storageTypes.map(type => (
                        <SelectItem key={type.value} value={type.value} className="text-admin-primary">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {renderConnectionFields()}
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-admin-primary">Dung lượng tối đa (GB)</Label>
                    <Input 
                      placeholder="10000"
                      type="number"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-admin-primary">Timeout (giây)</Label>
                    <Input 
                      placeholder="30"
                      type="number"
                      className="bg-admin-input border-admin text-admin-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-admin-primary">Mount Point (Local)</Label>
                  <Input 
                    placeholder="/mnt/storage"
                    className="bg-admin-input border-admin text-admin-primary"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-admin-input rounded border border-admin">
                  <div>
                    <Label className="text-admin-primary">Tự động kết nối khi khởi động</Label>
                    <p className="text-xs text-admin-muted mt-1">Tự động mount khi hệ thống khởi động</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-cyan-500" />
                </div>

                <div className="flex items-center justify-between p-4 bg-admin-input rounded border border-admin">
                  <div>
                    <Label className="text-admin-primary">Sử dụng làm lưu trữ mặc định</Label>
                    <p className="text-xs text-admin-muted mt-1">Lưu trữ chính cho file mới</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-cyan-500" />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 justify-end mt-4">
              <Button 
                variant="outline" 
                className="border-admin text-admin-primary hover:bg-admin-hover flex items-center gap-2"
              >
                <TestTube className="w-4 h-4" />
                Kiểm tra kết nối
              </Button>
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
                Lưu cấu hình
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Tổng số lưu trữ</div>
          <div className="text-2xl text-admin-primary mt-2">{storages.length}</div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Đang hoạt động</div>
          <div className="text-2xl text-green-400 mt-2">
            {storages.filter(s => s.status === 'connected').length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Tổng dung lượng</div>
          <div className="text-2xl text-admin-accent mt-2">35 TB</div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Đã sử dụng</div>
          <div className="text-2xl text-yellow-400 mt-2">21.8 TB</div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-admin rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-admin-secondary border-admin hover:bg-admin-secondary">
              <TableHead className="text-admin-secondary w-16">STT</TableHead>
              <TableHead className="text-admin-secondary">Tên hệ thống</TableHead>
              <TableHead className="text-admin-secondary">Loại</TableHead>
              <TableHead className="text-admin-secondary">Host/Endpoint</TableHead>
              <TableHead className="text-admin-secondary">Đường dẫn</TableHead>
              <TableHead className="text-admin-secondary">Dung lượng</TableHead>
              <TableHead className="text-admin-secondary">Đã dùng</TableHead>
              <TableHead className="text-admin-secondary">Trạng thái</TableHead>
              <TableHead className="text-admin-secondary text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storages.map((storage, index) => (
              <TableRow key={storage.id} className="border-admin hover:bg-admin-hover">
                <TableCell className="text-admin-secondary">{index + 1}</TableCell>
                <TableCell className="text-admin-primary flex items-center gap-2">
                  {getTypeIcon(storage.type)}
                  {storage.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {storage.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-admin-primary font-mono text-sm">{storage.host}</TableCell>
                <TableCell className="text-admin-secondary text-sm">{storage.path}</TableCell>
                <TableCell className="text-admin-primary">{storage.capacity}</TableCell>
                <TableCell className="text-yellow-400">{storage.used}</TableCell>
                <TableCell>{getStatusBadge(storage.status)}</TableCell>
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
                      <DropdownMenuContent align="end" className="bg-admin-secondary border-admin w-56">
                        <DropdownMenuItem 
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Chỉnh sửa cấu hình
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <TestTube className="w-4 h-4 mr-2" />
                          Kiểm tra kết nối
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Xem thống kê usage
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-admin-border" />
                        {storage.status === 'disconnected' ? (
                          <DropdownMenuItem 
                            className="text-green-400 hover:bg-green-900/20 cursor-pointer"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Kết nối
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            className="text-yellow-400 hover:bg-yellow-900/20 cursor-pointer"
                          >
                            <Square className="w-4 h-4 mr-2" />
                            Ngắt kết nối
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-admin-primary hover:bg-admin-hover cursor-pointer"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Đồng bộ storage
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-admin-border" />
                        <DropdownMenuItem 
                          className="text-orange-400 hover:bg-orange-900/20 cursor-pointer"
                        >
                          <Eraser className="w-4 h-4 mr-2" />
                          Dọn dẹp storage
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-admin-border" />
                        <DropdownMenuItem 
                          className="text-red-400 hover:bg-red-900/20 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa storage
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
    </div>
  );
}