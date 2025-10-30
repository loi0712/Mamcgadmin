import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Plus, Pencil, Trash2, Search, Save, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';

interface DataField {
  id: string;
  name: string;
  fieldGroup: string;
  dataType: string;
  isRequired: boolean;
  isSearchable: boolean;
  isEditable: boolean;
  order: number;
}

const mockDataFields: DataField[] = [
  {
    id: 'title',
    name: 'Tiêu đề',
    fieldGroup: 'Thông tin cơ bản',
    dataType: 'Text',
    isRequired: true,
    isSearchable: true,
    isEditable: true,
    order: 1
  },
  {
    id: 'description',
    name: 'Mô tả',
    fieldGroup: 'Thông tin cơ bản',
    dataType: 'Text Area',
    isRequired: false,
    isSearchable: true,
    isEditable: true,
    order: 2
  },
  {
    id: 'created_date',
    name: 'Ngày tạo',
    fieldGroup: 'Thông tin cơ bản',
    dataType: 'Date',
    isRequired: true,
    isSearchable: false,
    isEditable: false,
    order: 3
  },
  {
    id: 'duration',
    name: 'Thời lượng',
    fieldGroup: 'Metadata kỹ thuật',
    dataType: 'Time',
    isRequired: false,
    isSearchable: false,
    isEditable: true,
    order: 4
  },
  {
    id: 'resolution',
    name: 'Độ phân giải',
    fieldGroup: 'Metadata kỹ thuật',
    dataType: 'Select',
    isRequired: false,
    isSearchable: true,
    isEditable: true,
    order: 5
  },
  {
    id: 'video_codec',
    name: 'Codec Video',
    fieldGroup: 'Metadata kỹ thuật',
    dataType: 'Text',
    isRequired: false,
    isSearchable: false,
    isEditable: false,
    order: 6
  },
  {
    id: 'frame_rate',
    name: 'Frame Rate',
    fieldGroup: 'Metadata kỹ thuật',
    dataType: 'Number',
    isRequired: false,
    isSearchable: false,
    isEditable: false,
    order: 7
  },
  {
    id: 'author',
    name: 'Tác giả',
    fieldGroup: 'Thông tin bản quyền',
    dataType: 'Text',
    isRequired: false,
    isSearchable: true,
    isEditable: true,
    order: 8
  },
  {
    id: 'copyright',
    name: 'Bản quyền',
    fieldGroup: 'Thông tin bản quyền',
    dataType: 'Text',
    isRequired: false,
    isSearchable: true,
    isEditable: true,
    order: 9
  },
  {
    id: 'category',
    name: 'Danh mục',
    fieldGroup: 'Phân loại nội dung',
    dataType: 'Multi Select',
    isRequired: false,
    isSearchable: true,
    isEditable: true,
    order: 10
  },
  {
    id: 'tags',
    name: 'Tags',
    fieldGroup: 'Phân loại nội dung',
    dataType: 'Tags',
    isRequired: false,
    isSearchable: true,
    isEditable: true,
    order: 11
  },
  {
    id: 'director',
    name: 'Đạo diễn',
    fieldGroup: 'Thông tin sản xuất',
    dataType: 'Text',
    isRequired: false,
    isSearchable: true,
    isEditable: true,
    order: 12
  },
];

export function DataFieldsView() {
  const [dataFields, setDataFields] = useState<DataField[]>(mockDataFields);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [editingField, setEditingField] = useState<DataField | null>(null);

  // Form state
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [idError, setIdError] = useState('');
  const [nameError, setNameError] = useState('');

  const filteredFields = dataFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         field.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = groupFilter === 'all' || field.fieldGroup === groupFilter;
    return matchesSearch && matchesGroup;
  });

  const fieldGroups = Array.from(new Set(dataFields.map(f => f.fieldGroup)));

  const validateId = (value: string) => {
    if (!value) {
      setIdError('ID không được để trống');
      return false;
    }
    
    const exists = dataFields.some(f => 
      f.id === value && f.id !== editingField?.id
    );
    
    if (exists) {
      setIdError('ID này đã tồn tại. Vui lòng chọn ID khác.');
      return false;
    }
    
    if (!/^[a-z0-9_]+$/.test(value)) {
      setIdError('ID chỉ được chứa chữ thường, số và dấu gạch dưới');
      return false;
    }
    
    setIdError('');
    return true;
  };

  const validateName = (value: string) => {
    if (!value) {
      setNameError('Tên trường không được để trống');
      return false;
    }
    
    const exists = dataFields.some(f => 
      f.name === value && f.id !== editingField?.id
    );
    
    if (exists) {
      setNameError('Tên này đã tồn tại. Vui lòng chọn tên khác.');
      return false;
    }
    
    setNameError('');
    return true;
  };

  const handleEdit = (field: DataField) => {
    setEditingField(field);
    setFormId(field.id);
    setFormName(field.name);
    setIdError('');
    setNameError('');
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const isIdValid = validateId(formId);
    const isNameValid = validateName(formName);
    
    if (!isIdValid || !isNameValid) {
      return;
    }
    
    setIsDialogOpen(false);
    setEditingField(null);
    resetForm();
  };

  const resetForm = () => {
    setFormId('');
    setFormName('');
    setIdError('');
    setNameError('');
  };

  const getDataTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Text': 'border-blue-500 text-blue-400',
      'Text Area': 'border-blue-500 text-blue-400',
      'Number': 'border-green-500 text-green-400',
      'Date': 'border-purple-500 text-purple-400',
      'Time': 'border-purple-500 text-purple-400',
      'Select': 'border-yellow-500 text-yellow-400',
      'Multi Select': 'border-yellow-500 text-yellow-400',
      'Tags': 'border-cyan-500 text-cyan-400',
    };
    return <Badge variant="outline" className={colors[type] || 'border-gray-500 text-gray-400'}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input 
            placeholder="Tìm kiếm trường dữ liệu..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#0f1419] border-gray-700 text-gray-300"
          />
        </div>

        <Select value={groupFilter} onValueChange={setGroupFilter}>
          <SelectTrigger className="w-64 bg-[#0f1419] border-gray-700 text-gray-300">
            <SelectValue placeholder="Lọc theo nhóm" />
          </SelectTrigger>
          <SelectContent className="bg-[#0f1419] border-gray-700">
            <SelectItem value="all" className="text-gray-300">Tất cả nhóm</SelectItem>
            {fieldGroups.map(group => (
              <SelectItem key={group} value={group} className="text-gray-300">{group}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingField(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Thêm trường
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f1419] border-gray-800 text-gray-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-cyan-400">
                {editingField ? 'Chỉnh sửa trường dữ liệu' : 'Thêm trường dữ liệu mới'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">ID *</Label>
                  <Input 
                    placeholder="vd: title"
                    value={formId}
                    onChange={(e) => {
                      setFormId(e.target.value);
                      validateId(e.target.value);
                    }}
                    onBlur={(e) => validateId(e.target.value)}
                    className={`bg-[#0a0e1a] border-gray-700 text-gray-300 ${idError ? 'border-red-500' : ''}`}
                    disabled={!!editingField}
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
                  <Label className="text-gray-300">Tên trường *</Label>
                  <Input 
                    placeholder="Nhập tên trường"
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Nhóm trường *</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300">
                      <SelectValue placeholder="Chọn nhóm" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f1419] border-gray-700">
                      {fieldGroups.map(group => (
                        <SelectItem key={group} value={group} className="text-gray-300">{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Kiểu dữ liệu *</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300">
                      <SelectValue placeholder="Chọn kiểu" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f1419] border-gray-700">
                      <SelectItem value="text" className="text-gray-300">Text</SelectItem>
                      <SelectItem value="textarea" className="text-gray-300">Text Area</SelectItem>
                      <SelectItem value="number" className="text-gray-300">Number</SelectItem>
                      <SelectItem value="date" className="text-gray-300">Date</SelectItem>
                      <SelectItem value="time" className="text-gray-300">Time</SelectItem>
                      <SelectItem value="select" className="text-gray-300">Select</SelectItem>
                      <SelectItem value="multiselect" className="text-gray-300">Multi Select</SelectItem>
                      <SelectItem value="tags" className="text-gray-300">Tags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Thứ tự hiển thị</Label>
                <Input 
                  type="number"
                  placeholder="1"
                  className="bg-[#0a0e1a] border-gray-700 text-gray-300"
                />
              </div>

              <div className="space-y-3 p-4 bg-[#0a0e1a] rounded border border-gray-800">
                <Label className="text-gray-300">Tùy chọn</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox className="border-gray-600 data-[state=checked]:bg-cyan-500" />
                    <span className="text-sm text-gray-400">Bắt buộc</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox className="border-gray-600 data-[state=checked]:bg-cyan-500" />
                    <span className="text-sm text-gray-400">Có thể tìm kiếm</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox className="border-gray-600 data-[state=checked]:bg-cyan-500" />
                    <span className="text-sm text-gray-400">Có thể chỉnh sửa</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingField(null);
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
                  {editingField ? 'Cập nhật' : 'Tạo trường'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Fields Table */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0f1419] border-gray-800 hover:bg-[#0f1419]">
              <TableHead className="text-gray-400 w-12">STT</TableHead>
              <TableHead className="text-gray-400 w-40">ID</TableHead>
              <TableHead className="text-gray-400">Tên trường</TableHead>
              <TableHead className="text-gray-400">Nhóm trường</TableHead>
              <TableHead className="text-gray-400 w-32">Kiểu dữ liệu</TableHead>
              <TableHead className="text-gray-400 w-24 text-center">Bắt buộc</TableHead>
              <TableHead className="text-gray-400 w-24 text-center">Tìm kiếm</TableHead>
              <TableHead className="text-gray-400 w-24 text-center">Sửa được</TableHead>
              <TableHead className="text-gray-400 w-32 text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFields.map((field, index) => (
              <TableRow key={field.id} className="border-gray-800 hover:bg-gray-900/50">
                <TableCell className="text-gray-400">{index + 1}</TableCell>
                <TableCell className="text-cyan-400 text-xs font-mono">{field.id}</TableCell>
                <TableCell className="text-gray-300">{field.name}</TableCell>
                <TableCell className="text-gray-400 text-sm">{field.fieldGroup}</TableCell>
                <TableCell>{getDataTypeBadge(field.dataType)}</TableCell>
                <TableCell className="text-center">
                  {field.isRequired ? (
                    <Badge variant="outline" className="border-red-500 text-red-400">✓</Badge>
                  ) : (
                    <span className="text-gray-600">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {field.isSearchable ? (
                    <Badge variant="outline" className="border-green-500 text-green-400">✓</Badge>
                  ) : (
                    <span className="text-gray-600">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {field.isEditable ? (
                    <Badge variant="outline" className="border-blue-500 text-blue-400">✓</Badge>
                  ) : (
                    <span className="text-gray-600">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(field)}
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
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
    </div>
  );
}
