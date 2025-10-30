import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Plus, Pencil, Trash2, Search, Save, GripVertical, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';

interface FieldGroup {
  id: string;
  name: string;
  description: string;
  fieldCount: number;
  order: number;
  isActive: boolean;
}

const mockFieldGroups: FieldGroup[] = [
  {
    id: 'basic_info',
    name: 'Thông tin cơ bản',
    description: 'Các trường thông tin cơ bản của media',
    fieldCount: 8,
    order: 1,
    isActive: true
  },
  {
    id: 'technical_metadata',
    name: 'Metadata kỹ thuật',
    description: 'Thông tin kỹ thuật về video, audio, codec',
    fieldCount: 12,
    order: 2,
    isActive: true
  },
  {
    id: 'copyright_info',
    name: 'Thông tin bản quyền',
    description: 'Thông tin về bản quyền, tác giả, license',
    fieldCount: 6,
    order: 3,
    isActive: true
  },
  {
    id: 'content_classification',
    name: 'Phân loại nội dung',
    description: 'Danh mục, thể loại, tags, keywords',
    fieldCount: 10,
    order: 4,
    isActive: true
  },
  {
    id: 'production_info',
    name: 'Thông tin sản xuất',
    description: 'Đơn vị sản xuất, đạo diễn, biên tập viên',
    fieldCount: 7,
    order: 5,
    isActive: true
  },
  {
    id: 'storage_archiving',
    name: 'Lưu trữ & Archiving',
    description: 'Thông tin lưu trữ, vị trí, backup',
    fieldCount: 5,
    order: 6,
    isActive: false
  },
];

export function FieldGroupsView() {
  const [fieldGroups, setFieldGroups] = useState<FieldGroup[]>(mockFieldGroups);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGroup, setEditingGroup] = useState<FieldGroup | null>(null);
  
  // Form state
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formOrder, setFormOrder] = useState('');
  
  // Validation errors
  const [idError, setIdError] = useState('');
  const [nameError, setNameError] = useState('');

  const filteredGroups = fieldGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (group: FieldGroup) => {
    setEditingGroup(group);
    setFormId(group.id);
    setFormName(group.name);
    setFormDescription(group.description);
    setFormOrder(group.order.toString());
    setIdError('');
    setNameError('');
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa nhóm trường này?')) {
      setFieldGroups(prev => prev.filter(g => g.id !== id));
    }
  };

  const validateId = (value: string) => {
    if (!value) {
      setIdError('ID không được để trống');
      return false;
    }
    
    // Check if ID already exists (excluding current editing item)
    const exists = fieldGroups.some(g => 
      g.id === value && g.id !== editingGroup?.id
    );
    
    if (exists) {
      setIdError('ID này đã tồn tại. Vui lòng chọn ID khác.');
      return false;
    }
    
    // Check ID format (only lowercase, numbers, underscore)
    if (!/^[a-z0-9_]+$/.test(value)) {
      setIdError('ID chỉ được chứa chữ thường, số và dấu gạch dưới');
      return false;
    }
    
    setIdError('');
    return true;
  };

  const validateName = (value: string) => {
    if (!value) {
      setNameError('Tên nhóm không được để trống');
      return false;
    }
    
    // Check if name already exists (excluding current editing item)
    const exists = fieldGroups.some(g => 
      g.name === value && g.id !== editingGroup?.id
    );
    
    if (exists) {
      setNameError('Tên này đã tồn tại. Vui lòng chọn tên khác.');
      return false;
    }
    
    setNameError('');
    return true;
  };

  const handleSave = () => {
    const isIdValid = validateId(formId);
    const isNameValid = validateName(formName);
    
    if (!isIdValid || !isNameValid) {
      return;
    }
    
    // Save logic here
    console.log('Saving:', { id: formId, name: formName, description: formDescription, order: formOrder });
    
    // Reset and close
    setIsDialogOpen(false);
    setEditingGroup(null);
    resetForm();
  };

  const resetForm = () => {
    setFormId('');
    setFormName('');
    setFormDescription('');
    setFormOrder('');
    setIdError('');
    setNameError('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input 
            placeholder="Tìm kiếm nhóm trường..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#0f1419] border-gray-700 text-gray-300"
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingGroup(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Thêm nhóm trường
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f1419] border-gray-800 text-gray-100 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-cyan-400">
                {editingGroup ? 'Chỉnh sửa nhóm trường' : 'Thêm nhóm trường mới'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-gray-300">ID *</Label>
                <Input 
                  placeholder="vd: basic_info"
                  value={formId}
                  onChange={(e) => {
                    setFormId(e.target.value);
                    validateId(e.target.value);
                  }}
                  onBlur={(e) => validateId(e.target.value)}
                  className={`bg-[#0a0e1a] border-gray-700 text-gray-300 ${idError ? 'border-red-500' : ''}`}
                  disabled={!!editingGroup}
                />
                {idError && (
                  <Alert className="bg-red-900/20 border-red-500 py-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-400 text-xs ml-2">
                      {idError}
                    </AlertDescription>
                  </Alert>
                )}
                <p className="text-xs text-gray-500">ID duy nhất, chỉ dùng chữ thường, số và gạch dưới</p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Tên nhóm trường *</Label>
                <Input 
                  placeholder="Nhập tên nhóm trường"
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                    validateName(e.target.value);
                  }}
                  onBlur={(e) => validateName(e.target.value)}
                  className={`bg-[#0a0e1a] border-gray-700 text-gray-300 ${nameError ? 'border-red-500' : ''}`}
                />
                {nameError && (
                  <Alert className="bg-red-900/20 border-red-500 py-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-400 text-xs ml-2">
                      {nameError}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Mô tả</Label>
                <Textarea 
                  placeholder="Mô tả về nhóm trường này"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300 min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Thứ tự hiển thị</Label>
                <Input 
                  type="number"
                  placeholder="1"
                  value={formOrder}
                  onChange={(e) => setFormOrder(e.target.value)}
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingGroup(null);
                    resetForm();
                  }}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingGroup ? 'Cập nhật' : 'Tạo nhóm'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Field Groups Table */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0f1419] border-gray-800 hover:bg-[#0f1419]">
              <TableHead className="text-gray-400 w-12"></TableHead>
              <TableHead className="text-gray-400 w-12">STT</TableHead>
              <TableHead className="text-gray-400 w-40">ID</TableHead>
              <TableHead className="text-gray-400">Tên nhóm</TableHead>
              <TableHead className="text-gray-400">Mô tả</TableHead>
              <TableHead className="text-gray-400 w-32 text-center">Số trường</TableHead>
              <TableHead className="text-gray-400 w-32 text-center">Trạng thái</TableHead>
              <TableHead className="text-gray-400 w-32 text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id} className="border-gray-800 hover:bg-gray-900/50">
                <TableCell>
                  <GripVertical className="w-4 h-4 text-gray-600 cursor-move" />
                </TableCell>
                <TableCell className="text-gray-400">{group.order}</TableCell>
                <TableCell className="text-cyan-400 text-xs font-mono">{group.id}</TableCell>
                <TableCell className="text-gray-300">{group.name}</TableCell>
                <TableCell className="text-gray-400 text-sm">{group.description}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                    {group.fieldCount}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="outline" 
                    className={group.isActive 
                      ? 'border-green-500 text-green-400' 
                      : 'border-gray-500 text-gray-400'
                    }
                  >
                    {group.isActive ? 'Hoạt động' : 'Tạm dừng'}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(group)}
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(group.id)}
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

      {/* Info Card */}
      <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
        <div className="text-sm text-gray-400">
          <strong className="text-cyan-400">Lưu ý:</strong> Nhóm trường được sử dụng để tổ chức các trường dữ liệu thành các nhóm logic. 
          Thứ tự hiển thị có thể điều chỉnh bằng cách kéo thả các hàng trong bảng.
        </div>
      </div>
    </div>
  );
}
