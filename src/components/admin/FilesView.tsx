import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FileData {
  id: string;
  thumbnail: string;
  title: string;
  type: string;
  fileName: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  status: string;
  owner: string;
}

const mockFiles: FileData[] = [
  {
    id: 'BN02509',
    thumbnail: '',
    title: 'Chử chảy chân',
    type: 'Văn Cảo Mới',
    fileName: '-',
    createdDate: '22/10/2025 14:48:51',
    createdBy: 'MAMCG Admin',
    modifiedDate: '-',
    modifiedBy: '-',
    status: 'Khởi chuyển mục',
    owner: 'BT Nhanh'
  },
  {
    id: 'BN02508',
    thumbnail: '',
    title: 'Bar 2 dòng',
    type: 'Văn Cảo Mới',
    fileName: '-',
    createdDate: '22/10/2025 14:48:20',
    createdBy: 'MAMCG Admin',
    modifiedDate: '-',
    modifiedBy: '-',
    status: 'Khởi tắn bác',
    owner: 'BT Nhanh'
  },
  {
    id: 'BN02507',
    thumbnail: '',
    title: 'Bar 2 dòng',
    type: 'Văn Cảo Mới',
    fileName: '-',
    createdDate: '22/10/2025 14:47:28',
    createdBy: 'MAMCG Admin',
    modifiedDate: '-',
    modifiedBy: '-',
    status: 'Khởi tắn bác',
    owner: 'BT Nhanh'
  },
  {
    id: 'BN02506',
    thumbnail: '',
    title: 'Bar 2 dòng',
    type: 'Văn Cảo Mới',
    fileName: '-',
    createdDate: '22/10/2025 08:37:42',
    createdBy: 'MAMCG Admin',
    modifiedDate: '-',
    modifiedBy: '-',
    status: 'Khởi tắn bác',
    owner: 'BT Nhanh'
  },
];

export function FilesView() {
  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-admin-primary">Tất cả (7)</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-transparent border border-admin hover:bg-admin-hover text-admin-primary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Lọc
          </Button>
          <Button className="bg-transparent border border-admin hover:bg-admin-hover text-admin-primary flex items-center gap-2">
            <span className="text-admin-secondary">≡</span>
            Hiển thị
          </Button>
          <Button className="bg-transparent border border-admin hover:bg-admin-hover text-admin-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tạo thư mục
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-admin rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-admin-secondary border-admin hover:bg-admin-secondary">
              <TableHead className="text-admin-secondary">ID</TableHead>
              <TableHead className="text-admin-secondary">Thumbnail</TableHead>
              <TableHead className="text-admin-secondary">Thiết kế</TableHead>
              <TableHead className="text-admin-secondary">Trạng thái</TableHead>
              <TableHead className="text-admin-secondary">Tên file</TableHead>
              <TableHead className="text-admin-secondary">Thời gian tạo</TableHead>
              <TableHead className="text-admin-secondary">Người tạo</TableHead>
              <TableHead className="text-admin-secondary">Thời gian bổi</TableHead>
              <TableHead className="text-admin-secondary">Tài liên bổi</TableHead>
              <TableHead className="text-admin-secondary">Nhóm chuyên mục</TableHead>
              <TableHead className="text-admin-secondary">Tiền chuyệt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFiles.map((file) => (
              <TableRow key={file.id} className="border-admin hover:bg-admin-hover">
                <TableCell className="text-admin-primary">{file.id}</TableCell>
                <TableCell>
                  <div className="w-12 h-12 bg-admin-input rounded flex items-center justify-center text-xs text-admin-muted">
                    No Image
                  </div>
                </TableCell>
                <TableCell className="text-admin-primary">{file.title}</TableCell>
                <TableCell>
                  <span className="text-admin-accent text-sm">{file.type}</span>
                </TableCell>
                <TableCell className="text-admin-secondary">{file.fileName}</TableCell>
                <TableCell className="text-admin-secondary text-sm">{file.createdDate}</TableCell>
                <TableCell className="text-admin-secondary">{file.createdBy}</TableCell>
                <TableCell className="text-admin-secondary">{file.modifiedDate}</TableCell>
                <TableCell className="text-admin-secondary">{file.modifiedBy}</TableCell>
                <TableCell className="text-admin-secondary">{file.status}</TableCell>
                <TableCell className="text-admin-secondary">{file.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-admin-secondary">Trang 1 / 1</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-admin-secondary mr-2">Số hàng trên trang</span>
          <select className="bg-admin-secondary border border-admin text-admin-primary px-3 py-1 rounded text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-admin-secondary">Trang 1 / 1</span>
            <Button variant="ghost" size="sm" className="text-admin-secondary hover:text-admin-primary">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-gray-700 text-white">
              1
            </Button>
            <Button variant="ghost" size="sm" className="text-admin-secondary hover:text-admin-primary">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}