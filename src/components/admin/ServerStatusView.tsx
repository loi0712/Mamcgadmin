import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Server, Activity, HardDrive, Cpu, Database, Network, Clock, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ServiceStatus {
  name: string;
  status: 'running' | 'stopped' | 'error';
  uptime: string;
  cpu: number;
  memory: number;
}

const services: ServiceStatus[] = [
  { name: 'Web Server (Nginx)', status: 'running', uptime: '15d 7h 23m', cpu: 12, memory: 256 },
  { name: 'Application Server', status: 'running', uptime: '15d 7h 23m', cpu: 35, memory: 1024 },
  { name: 'Database Service', status: 'running', uptime: '15d 7h 23m', cpu: 18, memory: 512 },
  { name: 'Media Processing', status: 'running', uptime: '15d 7h 23m', cpu: 45, memory: 2048 },
  { name: 'Storage Manager', status: 'running', uptime: '15d 7h 23m', cpu: 8, memory: 128 },
  { name: 'Cache Service (Redis)', status: 'running', uptime: '15d 7h 23m', cpu: 5, memory: 256 },
];

export function ServerStatusView() {
  const getStatusBadge = (status: ServiceStatus['status']) => {
    const config = {
      running: { label: 'Đang chạy', className: 'border-green-500 text-green-400' },
      stopped: { label: 'Dừng', className: 'border-gray-500 text-gray-400' },
      error: { label: 'Lỗi', className: 'border-red-500 text-red-400' },
    };
    const cfg = config[status];
    return <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* System Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-admin-secondary border-admin p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-admin-secondary">Tổng CPU</div>
            <Cpu className="w-4 h-4 text-admin-accent" />
          </div>
          <div className="text-2xl text-admin-primary mb-2">42%</div>
          <Progress value={42} className="h-2" />
          <div className="text-xs text-admin-muted mt-2">8 cores @ 3.2GHz</div>
        </Card>

        <Card className="bg-admin-secondary border-admin p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-admin-secondary">RAM</div>
            <HardDrive className="w-4 h-4 text-admin-accent" />
          </div>
          <div className="text-2xl text-admin-primary mb-2">3.2GB</div>
          <Progress value={40} className="h-2" />
          <div className="text-xs text-admin-muted mt-2">40% of 8GB used</div>
        </Card>

        <Card className="bg-admin-secondary border-admin p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-admin-secondary">Network In</div>
            <Network className="w-4 h-4 text-admin-accent" />
          </div>
          <div className="text-2xl text-admin-primary mb-2">125 Mbps</div>
          <div className="text-xs text-admin-muted mt-2">Avg: 98 Mbps</div>
        </Card>

        <Card className="bg-admin-secondary border-admin p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-admin-secondary">Network Out</div>
            <Network className="w-4 h-4 text-admin-accent" />
          </div>
          <div className="text-2xl text-admin-primary mb-2">85 Mbps</div>
          <div className="text-xs text-admin-muted mt-2">Avg: 72 Mbps</div>
        </Card>
      </div>

      {/* Services Status */}
      <Card className="bg-admin-secondary border-admin p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-admin-accent" />
            <h3 className="text-admin-accent">Trạng thái dịch vụ</h3>
          </div>
          <Button variant="outline" className="border-admin text-admin-primary hover:bg-admin-hover">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-4 bg-admin-input rounded-lg border border-admin"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-admin-primary">{service.name}</div>
                    <div className="text-xs text-admin-muted mt-1 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Uptime: {service.uptime}
                    </div>
                  </div>
                </div>
                {getStatusBadge(service.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-admin-secondary">CPU Usage</span>
                    <span className="text-admin-primary">{service.cpu}%</span>
                  </div>
                  <Progress value={service.cpu} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-admin-secondary">Memory</span>
                    <span className="text-admin-primary">{service.memory} MB</span>
                  </div>
                  <Progress value={(service.memory / 2048) * 100} className="h-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Information */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-admin-secondary border-admin p-6">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-admin-accent" />
            <h3 className="text-admin-accent">Thông tin hệ thống</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Hostname</span>
              <span className="text-admin-primary">mamcg-media-server-01</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">OS</span>
              <span className="text-admin-primary">Ubuntu 22.04.3 LTS</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Kernel</span>
              <span className="text-admin-primary">5.15.0-89-generic</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Architecture</span>
              <span className="text-admin-primary">x86_64</span>
            </div>
            <div className="flex justify-between py-2 border-b border-admin">
              <span className="text-admin-secondary">Uptime</span>
              <span className="text-admin-primary">15 days, 7:23:45</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-admin-secondary">Last Boot</span>
              <span className="text-admin-primary">2025-10-14 07:10:15</span>
            </div>
          </div>
        </Card>

        <Card className="bg-admin-secondary border-admin p-6">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-5 h-5 text-admin-accent" />
            <h3 className="text-admin-accent">Disk Usage</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-admin-secondary">/ (Root)</span>
                <span className="text-admin-primary">45GB / 100GB</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-admin-secondary">/var (Logs & Cache)</span>
                <span className="text-admin-primary">12GB / 50GB</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-admin-secondary">/mnt/media-storage</span>
                <span className="text-admin-primary">4.8TB / 10TB</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-admin-secondary">/mnt/archive</span>
                <span className="text-admin-primary">18.5TB / 50TB</span>
              </div>
              <Progress value={37} className="h-2" />
            </div>
          </div>
        </Card>
      </div>

      {/* Database Connections */}
      <Card className="bg-admin-secondary border-admin p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-admin-accent" />
          <h3 className="text-admin-accent">Kết nối Database</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-admin-input rounded border border-admin">
            <div className="text-3xl text-green-400 mb-2">12</div>
            <div className="text-sm text-admin-secondary">Active Connections</div>
          </div>
          <div className="text-center p-4 bg-admin-input rounded border border-admin">
            <div className="text-3xl text-admin-primary mb-2">50</div>
            <div className="text-sm text-admin-secondary">Max Connections</div>
          </div>
          <div className="text-center p-4 bg-admin-input rounded border border-admin">
            <div className="text-3xl text-admin-accent mb-2">24%</div>
            <div className="text-sm text-admin-secondary">Usage</div>
          </div>
        </div>
      </Card>
    </div>
  );
}