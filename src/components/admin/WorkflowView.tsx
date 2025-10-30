import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Pencil, Trash2, Search, Play, Copy } from 'lucide-react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface Workflow {
  id: string;
  name: string;
  description: string;
  assignedUsers: string[];
  totalSteps: number;
  isActive: boolean;
  createdDate: string;
  lastModified: string;
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Quy trình xử lý video tin tức',
    description: 'Quy trình từ nhận tin, biên tập đến xuất bản video tin tức',
    assignedUsers: ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường'],
    totalSteps: 8,
    isActive: true,
    createdDate: '15/09/2025',
    lastModified: '25/10/2025'
  },
  {
    id: '2',
    name: 'Quy trình phê duyệt nội dung',
    description: 'Workflow phê duyệt nội dung trước khi xuất bản',
    assignedUsers: ['Phạm Thị Dung', 'Hoàng Văn Em'],
    totalSteps: 5,
    isActive: true,
    createdDate: '20/09/2025',
    lastModified: '28/10/2025'
  },
  {
    id: '3',
    name: 'Quy trình archive media',
    description: 'Quy trình lưu trữ và archive media lâu dài',
    assignedUsers: ['Nguyễn Văn An'],
    totalSteps: 6,
    isActive: true,
    createdDate: '01/10/2025',
    lastModified: '20/10/2025'
  },
  {
    id: '4',
    name: 'Quy trình xử lý livestream',
    description: 'Workflow cho sự kiện livestream từ chuẩn bị đến phát sóng',
    assignedUsers: ['Trần Thị Bình', 'Lê Văn Cường', 'Phạm Thị Dung'],
    totalSteps: 10,
    isActive: false,
    createdDate: '10/10/2025',
    lastModified: '15/10/2025'
  },
  {
    id: '5',
    name: 'Quy trình metadata enhancement',
    description: 'Tự động bổ sung và cải thiện metadata cho media',
    assignedUsers: ['Hoàng Văn Em'],
    totalSteps: 4,
    isActive: true,
    createdDate: '25/10/2025',
    lastModified: '29/10/2025'
  },
];

interface WorkflowViewProps {
  onEditWorkflow?: (workflowId: string) => void;
}

export function WorkflowView({ onEditWorkflow }: WorkflowViewProps) {
  const [workflows] = useState<Workflow[]>(mockWorkflows);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkflows = workflows.filter(wf =>
    wf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wf.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa workflow này?')) {
      console.log('Delete workflow:', id);
    }
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate workflow:', id);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-admin-muted" />
          <Input 
            placeholder="Tìm kiếm workflow..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-admin-input border-admin text-admin-primary"
          />
        </div>
        
        <Button 
          onClick={() => onEditWorkflow?.('new')}
          className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tạo workflow mới
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Tổng workflow</div>
          <div className="text-2xl text-admin-primary mt-2">{workflows.length}</div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Đang hoạt động</div>
          <div className="text-2xl text-green-400 mt-2">
            {workflows.filter(w => w.isActive).length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Tạm dừng</div>
          <div className="text-2xl text-admin-secondary mt-2">
            {workflows.filter(w => !w.isActive).length}
          </div>
        </div>
        <div className="bg-admin-secondary border border-admin rounded-lg p-4">
          <div className="text-sm text-admin-secondary">Tổng người dùng</div>
          <div className="text-2xl text-admin-accent mt-2">
            {new Set(workflows.flatMap(w => w.assignedUsers)).size}
          </div>
        </div>
      </div>

      {/* Workflows Table */}
      <div className="border border-admin rounded-lg overflow-hidden bg-admin-secondary">
        <ScrollArea className="w-full h-[600px]">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-admin-secondary border-admin hover:bg-admin-secondary">
                  <TableHead className="text-admin-secondary w-12">STT</TableHead>
                  <TableHead className="text-admin-secondary min-w-[200px]">Tên workflow</TableHead>
                  <TableHead className="text-admin-secondary min-w-[300px]">Mô tả</TableHead>
                  <TableHead className="text-admin-secondary min-w-[160px]">Người dùng áp dụng</TableHead>
                  <TableHead className="text-admin-secondary w-24 text-center">Số bước</TableHead>
                  <TableHead className="text-admin-secondary w-32 text-center">Trạng thái</TableHead>
                  <TableHead className="text-admin-secondary w-32">Cập nhật</TableHead>
                  <TableHead className="text-admin-secondary w-40 text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkflows.map((workflow, index) => (
                  <TableRow key={workflow.id} className="border-admin hover:bg-admin-hover">
                    <TableCell className="text-admin-secondary">{index + 1}</TableCell>
                    <TableCell>
                      <div className="text-admin-primary">{workflow.name}</div>
                      <div className="text-xs text-admin-muted mt-1">Tạo: {workflow.createdDate}</div>
                    </TableCell>
                    <TableCell className="text-admin-secondary text-sm">{workflow.description}</TableCell>
                    <TableCell>
                      <div className="text-xs text-admin-secondary">
                        {workflow.assignedUsers.length} người
                      </div>
                      <div className="text-xs text-admin-muted mt-1">
                        {workflow.assignedUsers.slice(0, 2).join(', ')}
                        {workflow.assignedUsers.length > 2 && '...'}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                        {workflow.totalSteps}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={workflow.isActive 
                          ? 'border-green-500 text-green-400' 
                          : 'border-gray-500 text-gray-400'
                        }
                      >
                        {workflow.isActive ? 'Hoạt động' : 'Tạm dừng'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-admin-secondary text-xs">
                      {workflow.lastModified}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Chạy thử"
                          className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditWorkflow?.(workflow.id)}
                          title="Chỉnh sửa"
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDuplicate(workflow.id)}
                          title="Nhân bản"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(workflow.id)}
                          title="Xóa"
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
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      {/* Info Card */}
      <div className="bg-admin-secondary border border-admin rounded-lg p-4">
        <div className="text-sm text-admin-secondary">
          <strong className="text-admin-accent">Lưu ý:</strong> Workflow giúp tự động hóa các quy trình xử lý media. 
          Bạn có thể thiết kế các bước xử lý, điều kiện và hành động tùy chỉnh cho từng workflow.
        </div>
      </div>
    </div>
  );
}