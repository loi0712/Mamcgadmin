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
          <h2 className="text-white">Tất cả (7)</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Lọc
          </Button>
          <Button className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white flex items-center gap-2">
            <span className="text-gray-400">≡</span>
            Hiển thị
          </Button>
          <Button className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tạo thư mục
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0f1419] border-gray-800 hover:bg-[#0f1419]">
              <TableHead className="text-gray-400">ID</TableHead>
              <TableHead className="text-gray-400">Thumbnail</TableHead>
              <TableHead className="text-gray-400">Thiết kế</TableHead>
              <TableHead className="text-gray-400">Trạng thái</TableHead>
              <TableHead className="text-gray-400">Tên file</TableHead>
              <TableHead className="text-gray-400">Thời gian tạo</TableHead>
              <TableHead className="text-gray-400">Người tạo</TableHead>
              <TableHead className="text-gray-400">Thời gian bổi</TableHead>
              <TableHead className="text-gray-400">Tài liên bổi</TableHead>
              <TableHead className="text-gray-400">Nhóm chuyên mục</TableHead>
              <TableHead className="text-gray-400">Tiền chuyệt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFiles.map((file) => (
              <TableRow key={file.id} className="border-gray-800 hover:bg-gray-900/50">
                <TableCell className="text-gray-300">{file.id}</TableCell>
                <TableCell>
                  <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">{file.title}</TableCell>
                <TableCell>
                  <span className="text-cyan-400 text-sm">{file.type}</span>
                </TableCell>
                <TableCell className="text-gray-400">{file.fileName}</TableCell>
                <TableCell className="text-gray-400 text-sm">{file.createdDate}</TableCell>
                <TableCell className="text-gray-400">{file.createdBy}</TableCell>
                <TableCell className="text-gray-400">{file.modifiedDate}</TableCell>
                <TableCell className="text-gray-400">{file.modifiedBy}</TableCell>
                <TableCell className="text-gray-400">{file.status}</TableCell>
                <TableCell className="text-gray-400">{file.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">Trang 1 / 1</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">Số hàng trên trang</span>
          <select className="bg-[#0f1419] border border-gray-700 text-gray-300 px-3 py-1 rounded text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-gray-400">Trang 1 / 1</span>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-gray-700 text-white">
              1
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
