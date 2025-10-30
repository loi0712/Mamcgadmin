import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Badge } from '../../ui/badge';
import { Trash2, AlertCircle } from 'lucide-react';
import { NodeData } from './FlowchartNode';

interface NodeConfigPanelProps {
  node: NodeData | null;
  onUpdate: (nodeId: string, updates: Partial<NodeData>) => void;
  onDelete: (nodeId: string) => void;
}

export function NodeConfigPanel({ node, onUpdate, onDelete }: NodeConfigPanelProps) {
  if (!node) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-3">⚙️</div>
          <div className="text-sm">Chọn một node để cấu hình</div>
          <div className="text-xs text-gray-600 mt-2">
            Click vào node trên canvas
          </div>
        </div>
      </div>
    );
  }

  const renderNodeTypeConfig = () => {
    switch (node.type) {
      case 'start':
      case 'end':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-gray-300 text-xs">Kiểu kích hoạt</Label>
              <Select defaultValue="manual">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-gray-700">
                  <SelectItem value="manual" className="text-gray-300">Thủ công</SelectItem>
                  <SelectItem value="auto" className="text-gray-300">Tự động</SelectItem>
                  <SelectItem value="scheduled" className="text-gray-300">Theo lịch</SelectItem>
                  <SelectItem value="webhook" className="text-gray-300">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-gray-300 text-xs">Loại xử lý</Label>
              <Select defaultValue="transcode">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-gray-700">
                  <SelectItem value="transcode" className="text-gray-300">Transcode Video</SelectItem>
                  <SelectItem value="thumbnail" className="text-gray-300">Tạo Thumbnail</SelectItem>
                  <SelectItem value="metadata" className="text-gray-300">Trích xuất Metadata</SelectItem>
                  <SelectItem value="watermark" className="text-gray-300">Thêm Watermark</SelectItem>
                  <SelectItem value="custom" className="text-gray-300">Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Preset</Label>
              <Input 
                placeholder="Nhập preset..."
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0a0e1a] rounded">
              <div>
                <Label className="text-gray-300 text-xs">Xử lý song song</Label>
                <p className="text-[10px] text-gray-500">Cho phép chạy đồng thời</p>
              </div>
              <Switch />
            </div>
          </div>
        );

      case 'decision':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-gray-300 text-xs">Điều kiện</Label>
              <Select defaultValue="filesize">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-gray-700">
                  <SelectItem value="filesize" className="text-gray-300">Kích thước file</SelectItem>
                  <SelectItem value="duration" className="text-gray-300">Thời lượng</SelectItem>
                  <SelectItem value="resolution" className="text-gray-300">Độ phân giải</SelectItem>
                  <SelectItem value="format" className="text-gray-300">Định dạng</SelectItem>
                  <SelectItem value="metadata" className="text-gray-300">Metadata</SelectItem>
                  <SelectItem value="custom" className="text-gray-300">Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Toán tử</Label>
              <Select defaultValue="greater">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-gray-700">
                  <SelectItem value="equal" className="text-gray-300">Bằng (=)</SelectItem>
                  <SelectItem value="notequal" className="text-gray-300">Khác (≠)</SelectItem>
                  <SelectItem value="greater" className="text-gray-300">Lớn hơn {'(>)'}</SelectItem>
                  <SelectItem value="less" className="text-gray-300">Nhỏ hơn {'(<)'}</SelectItem>
                  <SelectItem value="contains" className="text-gray-300">Chứa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Giá trị</Label>
              <Input 
                placeholder="Nhập giá trị..."
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded p-2 flex gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-300">
                Decision node cần ít nhất 2 đường kết nối đầu ra (True/False)
              </div>
            </div>
          </div>
        );

      case 'input':
      case 'output':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-gray-300 text-xs">Nguồn dữ liệu</Label>
              <Select defaultValue="file">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-gray-700">
                  <SelectItem value="file" className="text-gray-300">File upload</SelectItem>
                  <SelectItem value="folder" className="text-gray-300">Folder</SelectItem>
                  <SelectItem value="url" className="text-gray-300">URL</SelectItem>
                  <SelectItem value="api" className="text-gray-300">API</SelectItem>
                  <SelectItem value="database" className="text-gray-300">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Đường dẫn</Label>
              <Input 
                placeholder="/path/to/files..."
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0a0e1a] rounded">
              <div>
                <Label className="text-gray-300 text-xs">Theo dõi thư mục</Label>
                <p className="text-[10px] text-gray-500">Watch for changes</p>
              </div>
              <Switch />
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-gray-300 text-xs">Loại database</Label>
              <Select defaultValue="mysql">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-gray-700">
                  <SelectItem value="mysql" className="text-gray-300">MySQL</SelectItem>
                  <SelectItem value="postgresql" className="text-gray-300">PostgreSQL</SelectItem>
                  <SelectItem value="mongodb" className="text-gray-300">MongoDB</SelectItem>
                  <SelectItem value="oracle" className="text-gray-300">Oracle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Connection string</Label>
              <Input 
                type="password"
                placeholder="mongodb://..."
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Query/Collection</Label>
              <Textarea 
                placeholder="SELECT * FROM..."
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1 min-h-20"
              />
            </div>
          </div>
        );

      case 'notification':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-gray-300 text-xs">Kênh thông báo</Label>
              <Select defaultValue="email">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1419] border-gray-700">
                  <SelectItem value="email" className="text-gray-300">Email</SelectItem>
                  <SelectItem value="slack" className="text-gray-300">Slack</SelectItem>
                  <SelectItem value="teams" className="text-gray-300">MS Teams</SelectItem>
                  <SelectItem value="webhook" className="text-gray-300">Webhook</SelectItem>
                  <SelectItem value="sms" className="text-gray-300">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Người nhận</Label>
              <Input 
                placeholder="email@example.com"
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Tiêu đề</Label>
              <Input 
                placeholder="Workflow completed"
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Nội dung</Label>
              <Textarea 
                placeholder="Workflow đã hoàn thành..."
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1 min-h-16"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-xs text-gray-500 p-3 bg-[#0a0e1a] rounded">
            Không có cấu hình đặc biệt cho node này
          </div>
        );
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4 pb-6">
        {/* Node Info */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-cyan-400">Thông tin Node</h3>
            <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
              {node.type}
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-gray-300 text-xs">ID</Label>
              <Input 
                value={node.id}
                disabled
                className="bg-[#0a0e1a] border-gray-700 text-gray-500 mt-1 text-xs font-mono"
              />
            </div>

            <div>
              <Label className="text-gray-300 text-xs">Tên hiển thị *</Label>
              <Input 
                value={node.label}
                onChange={(e) => onUpdate(node.id, { label: e.target.value })}
                placeholder="Nhập tên node..."
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>

            <div>
              <Label className="text-gray-300 text-xs">Mô tả</Label>
              <Textarea 
                value={node.description || ''}
                onChange={(e) => onUpdate(node.id, { description: e.target.value })}
                placeholder="Mô tả chức năng..."
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1 min-h-16"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Position & Size */}
        <div>
          <h3 className="text-sm text-cyan-400 mb-3">Vị trí & Kích thước</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-gray-300 text-xs">X</Label>
              <Input 
                type="number"
                value={Math.round(node.x)}
                onChange={(e) => onUpdate(node.id, { x: parseFloat(e.target.value) || 0 })}
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Y</Label>
              <Input 
                type="number"
                value={Math.round(node.y)}
                onChange={(e) => onUpdate(node.id, { y: parseFloat(e.target.value) || 0 })}
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Width</Label>
              <Input 
                type="number"
                value={node.width}
                onChange={(e) => onUpdate(node.id, { width: parseFloat(e.target.value) || 100 })}
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-300 text-xs">Height</Label>
              <Input 
                type="number"
                value={node.height}
                onChange={(e) => onUpdate(node.id, { height: parseFloat(e.target.value) || 60 })}
                className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Node Type Configuration */}
        <div>
          <h3 className="text-sm text-cyan-400 mb-3">Cấu hình Node</h3>
          {renderNodeTypeConfig()}
        </div>

        <Separator className="bg-gray-800" />

        {/* Advanced Settings */}
        <div>
          <h3 className="text-sm text-cyan-400 mb-3">Cài đặt nâng cao</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-[#0a0e1a] rounded">
              <div>
                <Label className="text-gray-300 text-xs">Bật node</Label>
                <p className="text-[10px] text-gray-500">Kích hoạt node này</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0a0e1a] rounded">
              <div>
                <Label className="text-gray-300 text-xs">Retry on failure</Label>
                <p className="text-[10px] text-gray-500">Thử lại khi lỗi</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0a0e1a] rounded">
              <div>
                <Label className="text-gray-300 text-xs">Log output</Label>
                <p className="text-[10px] text-gray-500">Ghi log kết quả</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="mt-3">
            <Label className="text-gray-300 text-xs">Timeout (giây)</Label>
            <Input 
              type="number"
              placeholder="300"
              defaultValue="300"
              className="bg-[#0a0e1a] border-gray-700 text-gray-300 mt-1"
            />
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Actions */}
        <div>
          <Button
            variant="destructive"
            onClick={() => onDelete(node.id)}
            className="w-full bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-500/50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa Node
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
