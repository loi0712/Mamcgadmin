import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus, Pencil, Trash2, TestTube, Save, Database, HardDrive, Calendar, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll-area';

interface DatabaseConnection {
  id: string;
  name: string;
  type: string;
  host: string;
  port: string;
  database: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnection: string;
}

const mockDatabases: DatabaseConnection[] = [
  {
    id: '1',
    name: 'Main Database',
    type: 'PostgreSQL',
    host: '192.168.1.50',
    port: '5432',
    database: 'mamcg_main',
    status: 'connected',
    lastConnection: '29/10/2025 10:30:45'
  },
  {
    id: '2',
    name: 'Archive Database',
    type: 'MySQL',
    host: '192.168.1.51',
    port: '3306',
    database: 'archive_db',
    status: 'connected',
    lastConnection: '29/10/2025 09:15:22'
  },
  {
    id: '3',
    name: 'Legacy System',
    type: 'MS SQL Server',
    host: '192.168.1.52',
    port: '1433',
    database: 'legacy_db',
    status: 'disconnected',
    lastConnection: '28/10/2025 23:45:10'
  },
];

const databaseTypes = [
  { value: 'postgresql', label: 'PostgreSQL', defaultPort: '5432' },
  { value: 'mysql', label: 'MySQL', defaultPort: '3306' },
  { value: 'mssql', label: 'MS SQL Server', defaultPort: '1433' },
  { value: 'oracle', label: 'Oracle', defaultPort: '1521' },
  { value: 'mongodb', label: 'MongoDB', defaultPort: '27017' },
  { value: 'mariadb', label: 'MariaDB', defaultPort: '3306' },
];

export function DatabaseView() {
  const [databases, setDatabases] = useState<DatabaseConnection[]>(mockDatabases);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('postgresql');
  const [activeTab, setActiveTab] = useState('connections');

  const getStatusBadge = (status: DatabaseConnection['status']) => {
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

  const getDefaultPort = (type: string) => {
    return databaseTypes.find(db => db.value === type)?.defaultPort || '';
  };

  return (
    <div className="space-y-6">
      {/* Main Tabs for Connections and Backup */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#0f1419] border border-gray-800">
          <TabsTrigger 
            value="connections" 
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 text-gray-300"
          >
            <Database className="w-4 h-4 mr-2" />
            Kết nối Database
          </TabsTrigger>
          <TabsTrigger 
            value="backup" 
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 text-gray-300"
          >
            <HardDrive className="w-4 h-4 mr-2" />
            Cấu hình Backup
          </TabsTrigger>
        </TabsList>

        {/* Connections Tab */}
        <TabsContent value="connections" className="space-y-6 mt-4">
          {/* Header */}
          <div className="flex items-center justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Thêm kết nối
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0f1419] border-gray-800 text-gray-100 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-cyan-400">Thêm kết nối cơ sở dữ liệu mới</DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="bg-[#0a0e1a] border border-gray-800">
                    <TabsTrigger value="basic" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 text-gray-300">
                      Thông tin cơ bản
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 text-gray-300">
                      Nâng cao
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Tên kết nối *</Label>
                      <Input 
                        placeholder="Main Database"
                        className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Loại cơ sở dữ liệu *</Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f1419] border-gray-700">
                          {databaseTypes.map(type => (
                            <SelectItem key={type.value} value={type.value} className="text-gray-300">
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Host/IP *</Label>
                        <Input 
                          placeholder="192.168.1.50"
                          className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Cổng (Port) *</Label>
                        <Input 
                          placeholder={getDefaultPort(selectedType)}
                          className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Tên Database *</Label>
                      <Input 
                        placeholder="database_name"
                        className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Username *</Label>
                      <Input 
                        placeholder="username"
                        className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Password *</Label>
                      <Input 
                        type="password"
                        placeholder="••••••••"
                        className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Connection String</Label>
                      <Input 
                        placeholder="Tùy chỉnh connection string"
                        className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Max Pool Size</Label>
                        <Input 
                          placeholder="100"
                          type="number"
                          className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Timeout (giây)</Label>
                        <Input 
                          placeholder="30"
                          type="number"
                          className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Schema mặc định</Label>
                      <Input 
                        placeholder="public"
                        className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-3 justify-end mt-6">
                  <Button 
                    variant="outline" 
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                  >
                    <TestTube className="w-4 h-4" />
                    Kiểm tra kết nối
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
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
            <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400">Tổng số kết nối</div>
              <div className="text-2xl text-white mt-2">{databases.length}</div>
            </div>
            <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400">Đang hoạt động</div>
              <div className="text-2xl text-green-400 mt-2">
                {databases.filter(d => d.status === 'connected').length}
              </div>
            </div>
            <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400">Ngắt kết nối</div>
              <div className="text-2xl text-gray-400 mt-2">
                {databases.filter(d => d.status === 'disconnected').length}
              </div>
            </div>
            <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400">Lỗi</div>
              <div className="text-2xl text-red-400 mt-2">
                {databases.filter(d => d.status === 'error').length}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#0f1419] border-gray-800 hover:bg-[#0f1419]">
                  <TableHead className="text-gray-400 w-16">STT</TableHead>
                  <TableHead className="text-gray-400">Tên kết nối</TableHead>
                  <TableHead className="text-gray-400">Loại DB</TableHead>
                  <TableHead className="text-gray-400">Host</TableHead>
                  <TableHead className="text-gray-400">Port</TableHead>
                  <TableHead className="text-gray-400">Database</TableHead>
                  <TableHead className="text-gray-400">Trạng thái</TableHead>
                  <TableHead className="text-gray-400">Kết nối gần nhất</TableHead>
                  <TableHead className="text-gray-400 text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {databases.map((db, index) => (
                  <TableRow key={db.id} className="border-gray-800 hover:bg-gray-900/50">
                    <TableCell className="text-gray-400">{index + 1}</TableCell>
                    <TableCell className="text-gray-300 flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyan-400" />
                      {db.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-blue-500 text-blue-400">
                        {db.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">{db.host}</TableCell>
                    <TableCell className="text-gray-300 font-mono">{db.port}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">{db.database}</TableCell>
                    <TableCell>{getStatusBadge(db.status)}</TableCell>
                    <TableCell className="text-gray-400 text-sm">{db.lastConnection}</TableCell>
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
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Left: Backup Configuration */}
            <div className="space-y-4">
              <Card className="bg-[#0f1419] border-gray-800 p-6">
                <h3 className="text-cyan-400 mb-4 flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Cấu hình Backup tự động
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Kích hoạt backup tự động</Label>
                    <Switch className="data-[state=checked]:bg-cyan-500" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Database cần backup *</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f1419] border-gray-700">
                        <SelectItem value="all" className="text-gray-300">Tất cả databases</SelectItem>
                        <SelectItem value="1" className="text-gray-300">Main Database</SelectItem>
                        <SelectItem value="2" className="text-gray-300">Archive Database</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Tần suất backup *</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f1419] border-gray-700">
                        <SelectItem value="hourly" className="text-gray-300">Hàng giờ</SelectItem>
                        <SelectItem value="daily" className="text-gray-300">Hàng ngày</SelectItem>
                        <SelectItem value="weekly" className="text-gray-300">Hàng tuần</SelectItem>
                        <SelectItem value="monthly" className="text-gray-300">Hàng tháng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Thời gian backup</Label>
                      <Input 
                        type="time"
                        defaultValue="02:00"
                        className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Giữ lại bản backup</Label>
                      <Select defaultValue="30">
                        <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f1419] border-gray-700">
                          <SelectItem value="7" className="text-gray-300">7 ngày</SelectItem>
                          <SelectItem value="30" className="text-gray-300">30 ngày</SelectItem>
                          <SelectItem value="90" className="text-gray-300">90 ngày</SelectItem>
                          <SelectItem value="365" className="text-gray-300">1 năm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Đường dẫn lưu backup *</Label>
                    <Input 
                      placeholder="/var/backups/database"
                      defaultValue="/var/backups/database"
                      className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Loại nén</Label>
                    <Select defaultValue="gzip">
                      <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f1419] border-gray-700">
                        <SelectItem value="none" className="text-gray-300">Không nén</SelectItem>
                        <SelectItem value="gzip" className="text-gray-300">GZIP</SelectItem>
                        <SelectItem value="zip" className="text-gray-300">ZIP</SelectItem>
                        <SelectItem value="tar" className="text-gray-300">TAR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Label className="text-gray-300">Gửi email thông báo</Label>
                    <Switch className="data-[state=checked]:bg-cyan-500" />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Lưu cấu hình
                    </Button>
                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      <HardDrive className="w-4 h-4 mr-2" />
                      Backup ngay
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Backup History */}
            <div className="space-y-4">
              <Card className="bg-[#0f1419] border-gray-800 p-6">
                <h3 className="text-cyan-400 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Lịch sử Backup
                </h3>

                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {[
                      { date: '30/10/2025', time: '02:00:15', db: 'Main Database', size: '2.4 GB', status: 'success' },
                      { date: '29/10/2025', time: '02:00:12', db: 'Main Database', size: '2.3 GB', status: 'success' },
                      { date: '28/10/2025', time: '02:00:18', db: 'Main Database', size: '2.3 GB', status: 'success' },
                      { date: '27/10/2025', time: '02:00:10', db: 'Archive Database', size: '1.8 GB', status: 'success' },
                      { date: '26/10/2025', time: '02:00:45', db: 'Main Database', size: '2.2 GB', status: 'failed' },
                      { date: '25/10/2025', time: '02:00:08', db: 'Main Database', size: '2.2 GB', status: 'success' },
                      { date: '24/10/2025', time: '02:00:22', db: 'Archive Database', size: '1.7 GB', status: 'success' },
                      { date: '23/10/2025', time: '02:00:14', db: 'Main Database', size: '2.1 GB', status: 'success' },
                      { date: '22/10/2025', time: '02:00:19', db: 'Main Database', size: '2.1 GB', status: 'success' },
                      { date: '21/10/2025', time: '02:00:11', db: 'Archive Database', size: '1.6 GB', status: 'success' },
                    ].map((backup, index) => (
                      <div 
                        key={index}
                        className="bg-[#0a0e1a] border border-gray-800 rounded p-3 hover:bg-gray-900/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-gray-300 text-sm">{backup.db}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                              <Calendar className="w-3 h-3" />
                              {backup.date}
                              <Clock className="w-3 h-3 ml-2" />
                              {backup.time}
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={backup.status === 'success' 
                              ? 'border-green-500 text-green-400' 
                              : 'border-red-500 text-red-400'
                            }
                          >
                            {backup.status === 'success' ? 'Thành công' : 'Thất bại'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Kích thước: {backup.size}</span>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-cyan-400 hover:text-cyan-300 h-7 px-2"
                            >
                              <HardDrive className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-400 hover:text-red-300 h-7 px-2"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}