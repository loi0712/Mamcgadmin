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
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#0f1419] border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-400">Tổng CPU</div>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl text-gray-300 mb-2">42%</div>
          <Progress value={42} className="h-2" />
          <div className="text-xs text-gray-500 mt-2">8 cores @ 3.2GHz</div>
        </Card>

        <Card className="bg-[#0f1419] border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-400">RAM</div>
            <HardDrive className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl text-gray-300 mb-2">3.2GB</div>
          <Progress value={40} className="h-2" />
          <div className="text-xs text-gray-500 mt-2">40% of 8GB used</div>
        </Card>

        <Card className="bg-[#0f1419] border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-400">Network In</div>
            <Network className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl text-gray-300 mb-2">125 Mbps</div>
          <div className="text-xs text-gray-500 mt-2">Avg: 98 Mbps</div>
        </Card>

        <Card className="bg-[#0f1419] border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-400">Network Out</div>
            <Network className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl text-gray-300 mb-2">85 Mbps</div>
          <div className="text-xs text-gray-500 mt-2">Avg: 72 Mbps</div>
        </Card>
      </div>

      {/* Services Status */}
      <Card className="bg-[#0f1419] border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-400">Trạng thái dịch vụ</h3>
          </div>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-4 bg-[#0a0e1a] rounded-lg border border-gray-800"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-gray-300">{service.name}</div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
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
                    <span className="text-gray-400">CPU Usage</span>
                    <span className="text-gray-300">{service.cpu}%</span>
                  </div>
                  <Progress value={service.cpu} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-gray-300">{service.memory} MB</span>
                  </div>
                  <Progress value={(service.memory / 2048) * 100} className="h-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Information */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#0f1419] border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-400">Thông tin hệ thống</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Hostname</span>
              <span className="text-gray-300">mamcg-media-server-01</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">OS</span>
              <span className="text-gray-300">Ubuntu 22.04.3 LTS</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Kernel</span>
              <span className="text-gray-300">5.15.0-89-generic</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Architecture</span>
              <span className="text-gray-300">x86_64</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Uptime</span>
              <span className="text-gray-300">15 days, 7:23:45</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Last Boot</span>
              <span className="text-gray-300">2025-10-14 07:10:15</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#0f1419] border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            <h3 className="text-cyan-400">Disk Usage</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">/ (Root)</span>
                <span className="text-gray-300">45GB / 100GB</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">/var (Logs & Cache)</span>
                <span className="text-gray-300">12GB / 50GB</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">/mnt/media-storage</span>
                <span className="text-gray-300">4.8TB / 10TB</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">/mnt/archive</span>
                <span className="text-gray-300">18.5TB / 50TB</span>
              </div>
              <Progress value={37} className="h-2" />
            </div>
          </div>
        </Card>
      </div>

      {/* Database Connections */}
      <Card className="bg-[#0f1419] border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-cyan-400" />
          <h3 className="text-cyan-400">Kết nối Database</h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-4 bg-[#0a0e1a] rounded border border-gray-800">
            <div className="text-3xl text-green-400 mb-2">12</div>
            <div className="text-sm text-gray-400">Active Connections</div>
          </div>
          <div className="text-center p-4 bg-[#0a0e1a] rounded border border-gray-800">
            <div className="text-3xl text-gray-300 mb-2">50</div>
            <div className="text-sm text-gray-400">Max Connections</div>
          </div>
          <div className="text-center p-4 bg-[#0a0e1a] rounded border border-gray-800">
            <div className="text-3xl text-cyan-400 mb-2">24%</div>
            <div className="text-sm text-gray-400">Usage</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
