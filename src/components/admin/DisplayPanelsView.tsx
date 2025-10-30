import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Plus, Pencil, Trash2, Search, Save, Eye, Grid3x3, List } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface DisplayPanel {
  id: string;
  name: string;
  description: string;
  fieldGroups: string[];
  isDefault: boolean;
  isActive: boolean;
}

const mockDisplayPanels: DisplayPanel[] = [
  {
    id: '1',
    name: 'Panel xem nhanh',
    description: 'Hiển thị các thông tin cơ bản và preview media',
    fieldGroups: ['Thông tin cơ bản', 'Metadata kỹ thuật'],
    isDefault: true,
    isActive: true
  },
  {
    id: '2',
    name: 'Panel biên tập',
    description: 'Dành cho biên tập viên chỉnh sửa metadata đầy đủ',
    fieldGroups: ['Thông tin cơ bản', 'Metadata kỹ thuật', 'Phân loại nội dung', 'Thông tin sản xuất'],
    isDefault: false,
    isActive: true
  },
  {
    id: '3',
    name: 'Panel bản quyền',
    description: 'Quản lý thông tin bản quyền và licensing',
    fieldGroups: ['Thông tin cơ bản', 'Thông tin bản quyền'],
    isDefault: false,
    isActive: true
  },
  {
    id: '4',
    name: 'Panel kỹ thuật',
    description: 'Xem chi tiết thông tin kỹ thuật của media',
    fieldGroups: ['Metadata kỹ thuật'],
    isDefault: false,
    isActive: true
  },
  {
    id: '5',
    name: 'Panel archive',
    description: 'Thông tin lưu trữ và archiving',
    fieldGroups: ['Thông tin cơ bản', 'Lưu trữ & Archiving'],
    isDefault: false,
    isActive: false
  },
];

const availableFieldGroups = [
  'Thông tin cơ bản',
  'Metadata kỹ thuật',
  'Thông tin bản quyền',
  'Phân loại nội dung',
  'Thông tin sản xuất',
  'Lưu trữ & Archiving',
];

export function DisplayPanelsView() {
  const [displayPanels, setDisplayPanels] = useState<DisplayPanel[]>(mockDisplayPanels);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPanel, setEditingPanel] = useState<DisplayPanel | null>(null);
  const [selectedFieldGroups, setSelectedFieldGroups] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPanels = displayPanels.filter(panel =>
    panel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    panel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (panel: DisplayPanel) => {
    setEditingPanel(panel);
    setSelectedFieldGroups(panel.fieldGroups);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa panel hiển thị này?')) {
      setDisplayPanels(prev => prev.filter(p => p.id !== id));
    }
  };

  const toggleFieldGroup = (group: string) => {
    setSelectedFieldGroups(prev =>
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input 
              placeholder="Tìm kiếm panel hiển thị..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0f1419] border-gray-700 text-gray-300"
            />
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#0f1419] border border-gray-800 rounded p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gray-800 text-cyan-400' : 'text-gray-400'}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-gray-800 text-cyan-400' : 'text-gray-400'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingPanel(null);
            setSelectedFieldGroups([]);
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Thêm panel
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f1419] border-gray-800 text-gray-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-cyan-400">
                {editingPanel ? 'Chỉnh sửa panel hiển thị' : 'Thêm panel hiển thị mới'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Tên panel *</Label>
                <Input 
                  placeholder="Nhập tên panel"
                  defaultValue={editingPanel?.name}
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Mô tả</Label>
                <Input 
                  placeholder="Mô tả về panel này"
                  defaultValue={editingPanel?.description}
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Chọn nhóm trường hiển thị *</Label>
                <ScrollArea className="h-48 border border-gray-800 rounded p-3 bg-[#0a0e1a]">
                  <div className="space-y-2">
                    {availableFieldGroups.map((group) => (
                      <label
                        key={group}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-800/50 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedFieldGroups.includes(group)}
                          onCheckedChange={() => toggleFieldGroup(group)}
                          className="border-gray-600 data-[state=checked]:bg-cyan-500"
                        />
                        <span className="text-sm text-gray-300">{group}</span>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
                <div className="text-xs text-gray-500">
                  Đã chọn: {selectedFieldGroups.length} nhóm trường
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-[#0a0e1a] rounded border border-gray-800">
                  <Checkbox
                    defaultChecked={editingPanel?.isDefault}
                    className="border-gray-600 data-[state=checked]:bg-cyan-500"
                  />
                  <div>
                    <span className="text-sm text-gray-300">Đặt làm panel mặc định</span>
                    <p className="text-xs text-gray-500 mt-1">Panel này sẽ được hiển thị khi mở media lần đầu</p>
                  </div>
                </label>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingPanel(null);
                    setSelectedFieldGroups([]);
                  }}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingPanel(null);
                    setSelectedFieldGroups([]);
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingPanel ? 'Cập nhật' : 'Tạo panel'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Display Panels - Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 gap-4">
          {filteredPanels.map((panel) => (
            <Card key={panel.id} className="bg-[#0f1419] border-gray-800 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-300">{panel.name}</h3>
                    {panel.isDefault && (
                      <Badge variant="outline" className="border-cyan-500 text-cyan-400 text-xs">
                        Mặc định
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{panel.description}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={panel.isActive 
                    ? 'border-green-500 text-green-400' 
                    : 'border-gray-500 text-gray-400'
                  }
                >
                  {panel.isActive ? 'Hoạt động' : 'Tạm dừng'}
                </Badge>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">Nhóm trường hiển thị:</div>
                <div className="flex flex-wrap gap-2">
                  {panel.fieldGroups.map((group, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="border-gray-600 text-gray-400 text-xs"
                    >
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Xem trước
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(panel)}
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(panel.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Display Panels - List View */}
      {viewMode === 'list' && (
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#0f1419] border-gray-800 hover:bg-[#0f1419]">
                <TableHead className="text-gray-400 w-12">STT</TableHead>
                <TableHead className="text-gray-400">Tên panel</TableHead>
                <TableHead className="text-gray-400">Mô tả</TableHead>
                <TableHead className="text-gray-400 w-48">Nhóm trường</TableHead>
                <TableHead className="text-gray-400 w-32 text-center">Trạng thái</TableHead>
                <TableHead className="text-gray-400 w-32 text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPanels.map((panel, index) => (
                <TableRow key={panel.id} className="border-gray-800 hover:bg-gray-900/50">
                  <TableCell className="text-gray-400">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">{panel.name}</span>
                      {panel.isDefault && (
                        <Badge variant="outline" className="border-cyan-500 text-cyan-400 text-xs">
                          Mặc định
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400 text-sm">{panel.description}</TableCell>
                  <TableCell>
                    <div className="text-xs text-gray-400">
                      {panel.fieldGroups.length} nhóm
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={panel.isActive 
                        ? 'border-green-500 text-green-400' 
                        : 'border-gray-500 text-gray-400'
                      }
                    >
                      {panel.isActive ? 'Hoạt động' : 'Tạm dừng'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(panel)}
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(panel.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
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
      )}

      {/* Info Card */}
      <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
        <div className="text-sm text-gray-400">
          <strong className="text-cyan-400">Lưu ý:</strong> Panel hiển thị xác định những nhóm trường nào sẽ được hiển thị 
          khi người dùng xem chi tiết media. Bạn có thể tạo nhiều panel khác nhau cho từng vai trò hoặc mục đích sử dụng.
        </div>
      </div>
    </div>
  );
}
