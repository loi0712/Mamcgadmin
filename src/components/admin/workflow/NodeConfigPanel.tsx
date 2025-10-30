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
        <div className="text-center text-admin-muted">
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
              <Label className="text-admin-primary text-xs">Kiểu kích hoạt</Label>
              <Select defaultValue="manual">
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  <SelectItem value="manual" className="text-admin-primary">Thủ công</SelectItem>
                  <SelectItem value="auto" className="text-admin-primary">Tự động</SelectItem>
                  <SelectItem value="scheduled" className="text-admin-primary">Theo lịch</SelectItem>
                  <SelectItem value="webhook" className="text-admin-primary">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-admin-primary text-xs">Loại xử lý</Label>
              <Select defaultValue="transcode">
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  <SelectItem value="transcode" className="text-admin-primary">Transcode Video</SelectItem>
                  <SelectItem value="thumbnail" className="text-admin-primary">Tạo Thumbnail</SelectItem>
                  <SelectItem value="metadata" className="text-admin-primary">Trích xuất Metadata</SelectItem>
                  <SelectItem value="watermark" className="text-admin-primary">Thêm Watermark</SelectItem>
                  <SelectItem value="custom" className="text-admin-primary">Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Preset</Label>
              <Input 
                placeholder="Nhập preset..."
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-admin-input rounded">
              <div>
                <Label className="text-admin-primary text-xs">Xử lý song song</Label>
                <p className="text-[10px] text-admin-muted">Cho phép chạy đồng thời</p>
              </div>
              <Switch />
            </div>
          </div>
        );

      case 'decision':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-admin-primary text-xs">Điều kiện</Label>
              <Select defaultValue="filesize">
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  <SelectItem value="filesize" className="text-admin-primary">Kích thước file</SelectItem>
                  <SelectItem value="duration" className="text-admin-primary">Thời lượng</SelectItem>
                  <SelectItem value="resolution" className="text-admin-primary">Độ phân giải</SelectItem>
                  <SelectItem value="format" className="text-admin-primary">Định dạng</SelectItem>
                  <SelectItem value="metadata" className="text-admin-primary">Metadata</SelectItem>
                  <SelectItem value="custom" className="text-admin-primary">Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Toán tử</Label>
              <Select defaultValue="greater">
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  <SelectItem value="equal" className="text-admin-primary">Bằng (=)</SelectItem>
                  <SelectItem value="notequal" className="text-admin-primary">Khác (≠)</SelectItem>
                  <SelectItem value="greater" className="text-admin-primary">Lớn hơn {'(>)'}</SelectItem>
                  <SelectItem value="less" className="text-admin-primary">Nhỏ hơn {'(<)'}</SelectItem>
                  <SelectItem value="contains" className="text-admin-primary">Chứa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Giá trị</Label>
              <Input 
                placeholder="Nhập giá trị..."
                className="bg-admin-input border-admin text-admin-primary mt-1"
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
              <Label className="text-admin-primary text-xs">Nguồn dữ liệu</Label>
              <Select defaultValue="file">
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  <SelectItem value="file" className="text-admin-primary">File upload</SelectItem>
                  <SelectItem value="folder" className="text-admin-primary">Folder</SelectItem>
                  <SelectItem value="url" className="text-admin-primary">URL</SelectItem>
                  <SelectItem value="api" className="text-admin-primary">API</SelectItem>
                  <SelectItem value="database" className="text-admin-primary">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Đường dẫn</Label>
              <Input 
                placeholder="/path/to/files..."
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-admin-input rounded">
              <div>
                <Label className="text-admin-primary text-xs">Theo dõi thư mục</Label>
                <p className="text-[10px] text-admin-muted">Watch for changes</p>
              </div>
              <Switch />
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-admin-primary text-xs">Loại database</Label>
              <Select defaultValue="mysql">
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  <SelectItem value="mysql" className="text-admin-primary">MySQL</SelectItem>
                  <SelectItem value="postgresql" className="text-admin-primary">PostgreSQL</SelectItem>
                  <SelectItem value="mongodb" className="text-admin-primary">MongoDB</SelectItem>
                  <SelectItem value="oracle" className="text-admin-primary">Oracle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Connection string</Label>
              <Input 
                type="password"
                placeholder="mongodb://..."
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Query/Collection</Label>
              <Textarea 
                placeholder="SELECT * FROM..."
                className="bg-admin-input border-admin text-admin-primary mt-1 min-h-20"
              />
            </div>
          </div>
        );

      case 'notification':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-admin-primary text-xs">Kênh thông báo</Label>
              <Select defaultValue="email">
                <SelectTrigger className="bg-admin-input border-admin text-admin-primary mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-admin-secondary border-admin">
                  <SelectItem value="email" className="text-admin-primary">Email</SelectItem>
                  <SelectItem value="slack" className="text-admin-primary">Slack</SelectItem>
                  <SelectItem value="teams" className="text-admin-primary">MS Teams</SelectItem>
                  <SelectItem value="webhook" className="text-admin-primary">Webhook</SelectItem>
                  <SelectItem value="sms" className="text-admin-primary">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Người nhận</Label>
              <Input 
                placeholder="email@example.com"
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Tiêu đề</Label>
              <Input 
                placeholder="Workflow completed"
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Nội dung</Label>
              <Textarea 
                placeholder="Workflow đã hoàn thành..."
                className="bg-admin-input border-admin text-admin-primary mt-1 min-h-16"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-xs text-admin-muted p-3 bg-admin-input rounded">
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
            <h3 className="text-sm text-admin-accent">Thông tin Node</h3>
            <Badge variant="outline" className="border-gray-600 text-admin-secondary text-xs">
              {node.type}
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-admin-primary text-xs">ID</Label>
              <Input 
                value={node.id}
                disabled
                className="bg-admin-input border-admin text-admin-muted mt-1 text-xs font-mono"
              />
            </div>

            <div>
              <Label className="text-admin-primary text-xs">Tên hiển thị *</Label>
              <Input 
                value={node.label}
                onChange={(e) => onUpdate(node.id, { label: e.target.value })}
                placeholder="Nhập tên node..."
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>

            <div>
              <Label className="text-admin-primary text-xs">Mô tả</Label>
              <Textarea 
                value={node.description || ''}
                onChange={(e) => onUpdate(node.id, { description: e.target.value })}
                placeholder="Mô tả chức năng..."
                className="bg-admin-input border-admin text-admin-primary mt-1 min-h-16"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Position & Size */}
        <div>
          <h3 className="text-sm text-admin-accent mb-3">Vị trí & Kích thước</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-admin-primary text-xs">X</Label>
              <Input 
                type="number"
                value={Math.round(node.x)}
                onChange={(e) => onUpdate(node.id, { x: parseFloat(e.target.value) || 0 })}
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Y</Label>
              <Input 
                type="number"
                value={Math.round(node.y)}
                onChange={(e) => onUpdate(node.id, { y: parseFloat(e.target.value) || 0 })}
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Width</Label>
              <Input 
                type="number"
                value={node.width}
                onChange={(e) => onUpdate(node.id, { width: parseFloat(e.target.value) || 100 })}
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
            <div>
              <Label className="text-admin-primary text-xs">Height</Label>
              <Input 
                type="number"
                value={node.height}
                onChange={(e) => onUpdate(node.id, { height: parseFloat(e.target.value) || 60 })}
                className="bg-admin-input border-admin text-admin-primary mt-1"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Node Type Configuration */}
        <div>
          <h3 className="text-sm text-admin-accent mb-3">Cấu hình Node</h3>
          {renderNodeTypeConfig()}
        </div>

        <Separator className="bg-gray-800" />

        {/* Advanced Settings */}
        <div>
          <h3 className="text-sm text-admin-accent mb-3">Cài đặt nâng cao</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-admin-input rounded">
              <div>
                <Label className="text-admin-primary text-xs">Bật node</Label>
                <p className="text-[10px] text-admin-muted">Kích hoạt node này</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-2 bg-admin-input rounded">
              <div>
                <Label className="text-admin-primary text-xs">Retry on failure</Label>
                <p className="text-[10px] text-admin-muted">Thử lại khi lỗi</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-2 bg-admin-input rounded">
              <div>
                <Label className="text-admin-primary text-xs">Log output</Label>
                <p className="text-[10px] text-admin-muted">Ghi log kết quả</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="mt-3">
            <Label className="text-admin-primary text-xs">Timeout (giây)</Label>
            <Input 
              type="number"
              placeholder="300"
              defaultValue="300"
              className="bg-admin-input border-admin text-admin-primary mt-1"
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