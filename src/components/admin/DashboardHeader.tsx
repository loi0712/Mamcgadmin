import { CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const dayName = days[date.getDay()];
    const dateStr = date.toLocaleDateString('vi-VN');
    const timeStr = date.toLocaleTimeString('vi-VN');
    return { dayName, dateStr, timeStr };
  };

  const { dayName, dateStr, timeStr } = formatDateTime(currentTime);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0a0e1a]">
      <div>
        <h1 className="text-2xl text-cyan-400 mb-1">MAMCG Dashboard</h1>
        <p className="text-sm text-gray-500">Tổng quan hệ thống quản lý media</p>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-gray-400">{dayName}, {dateStr}</div>
            <div className="text-xl text-gray-300 font-mono">{timeStr}</div>
          </div>
          <div className="h-12 w-px bg-gray-700" />
          <div className="flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-500/50 rounded">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-sm text-green-400">Hệ thống</div>
              <div className="text-xs text-green-300">Hoạt động bình thường</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
