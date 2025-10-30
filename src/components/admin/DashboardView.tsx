import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Activity, Database, HardDrive, Cpu, Users, Clock, Server } from 'lucide-react';
import { Progress } from '../ui/progress';

export function DashboardView() {
  return (
    <div className="space-y-4">
      {/* System Status Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-admin-secondary border-admin p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-admin-secondary">Trạng thái hệ thống</div>
            <Activity className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl text-green-400">Hoạt động</div>
          <div className="text-xs text-admin-muted mt-1">Uptime: 15d 7h 23m</div>
        </Card>

        <Card className="bg-admin-secondary border-admin p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-admin-secondary">Người dùng online</div>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl text-admin-primary">24<span className="text-sm text-admin-muted">/100</span></div>
          <div className="text-xs text-admin-muted mt-1">Sessions hoạt động</div>
        </Card>

        <Card className="bg-admin-secondary border-admin p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-admin-secondary">CPU Usage</div>
            <Cpu className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl text-admin-primary">42%</div>
          <Progress value={42} className="mt-2 h-1" />
        </Card>

        <Card className="bg-admin-secondary border-admin p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-admin-secondary">RAM Memory</div>
            <HardDrive className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl text-admin-primary">3.2GB<span className="text-sm text-admin-muted">/8GB</span></div>
          <Progress value={40} className="mt-2 h-1" />
        </Card>
      </div>

      {/* Server & Database Info */}
      <div className="grid grid-cols-2 gap-4">
        {/* Server Information */}
        <Card className="bg-admin-secondary border-admin p-6">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-admin-accent" />
            <h3 className="text-admin-accent">Thông tin Server</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Phiên bản</span>
              <span className="text-admin-primary">MAMCG Media Server v2.5.8</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Nền tảng</span>
              <span className="text-admin-primary">Ubuntu 22.04 LTS</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Web Server</span>
              <span className="text-admin-primary">Nginx 1.24.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Runtime</span>
              <span className="text-admin-primary">Node.js 20.11.1</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">License</span>
              <span className="text-admin-primary">Enterprise (100 users)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-admin-secondary">Auth Method</span>
              <Badge variant="outline" className="border-green-500 text-green-400">
                LDAP + Local
              </Badge>
            </div>
          </div>
        </Card>

        {/* Database Information */}
        <Card className="bg-admin-secondary border-admin p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-admin-accent" />
            <h3 className="text-admin-accent">Cơ sở dữ liệu</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Database Type</span>
              <span className="text-admin-primary">PostgreSQL 15.4</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Host</span>
              <span className="text-admin-primary">192.168.1.50:5432</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Kích thước DB</span>
              <span className="text-admin-primary">2.4 GB</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Tổng số Media</span>
              <span className="text-admin-primary">15,842 clips</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Metadata Records</span>
              <span className="text-admin-primary">47,526 fields</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-admin-secondary">Kết nối hiện tại</span>
              <span className="text-admin-primary">12/50</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Storage & Media Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-admin-secondary border-admin p-6">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-5 h-5 text-admin-accent" />
            <h3 className="text-admin-accent">Lưu trữ Primary</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-admin-secondary">Đã sử dụng</span>
              <span className="text-admin-primary">4.8 TB / 10 TB</span>
            </div>
            <Progress value={48} className="h-2" />
            <div className="text-xs text-admin-muted">Còn trống: 5.2 TB (52%)</div>
          </div>
          <div className="mt-4 pt-4 border-t border-admin">
            <div className="text-xs text-admin-secondary">Loại: NAS - Synology DS920+</div>
            <div className="text-xs text-admin-secondary mt-1">Mount: /mnt/media-storage</div>
          </div>
        </Card>

        <Card className="bg-admin-secondary border-admin p-6">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-5 h-5 text-admin-accent" />
            <h3 className="text-admin-accent">Archive Storage</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-admin-secondary">Đã sử dụng</span>
              <span className="text-admin-primary">18.5 TB / 50 TB</span>
            </div>
            <Progress value={37} className="h-2" />
            <div className="text-xs text-admin-muted">Còn trống: 31.5 TB (63%)</div>
          </div>
          <div className="mt-4 pt-4 border-t border-admin">
            <div className="text-xs text-admin-secondary">Loại: SAN Storage</div>
            <div className="text-xs text-admin-secondary mt-1">Location: Data Center 1</div>
          </div>
        </Card>

        <Card className="bg-admin-secondary border-admin p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-admin-accent" />
            <h3 className="text-admin-accent">Media Statistics</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Video Files</span>
              <span className="text-admin-primary">12,450</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Audio Files</span>
              <span className="text-admin-primary">2,892</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Images</span>
              <span className="text-admin-primary">500</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-admin-secondary">Tổng dung lượng</span>
              <span className="text-admin-primary">23.3 TB</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-admin-secondary border-admin p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-admin-accent" />
          <h3 className="text-admin-accent">Hoạt động gần đây</h3>
        </div>
        <div className="space-y-3">
          {[
            { time: '14:32', user: 'Nguyễn Văn An', action: 'Tải lên 5 video files mới', status: 'success' },
            { time: '13:18', user: 'Trần Thị Bình', action: 'Chỉnh sửa metadata cho 12 clips', status: 'success' },
            { time: '11:45', user: 'System', action: 'Backup database hoàn tất', status: 'success' },
            { time: '10:22', user: 'Lê Văn Cường', action: 'Tạo nhóm quyền mới: "Editor Team"', status: 'success' },
            { time: '09:15', user: 'System', action: 'Kết nối storage archive thành công', status: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-admin-input rounded border border-admin">
              <div className="text-xs text-admin-muted w-12">{activity.time}</div>
              <div className="flex-1">
                <div className="text-sm text-admin-primary">{activity.action}</div>
                <div className="text-xs text-admin-muted mt-1">bởi {activity.user}</div>
              </div>
              <Badge variant="outline" className="border-green-500 text-green-400">
                Thành công
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}