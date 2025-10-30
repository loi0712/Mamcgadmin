import { api } from '../lib/api/client';
import { API_ENDPOINTS } from '../lib/api/endpoints';
import { ApiResponse, DashboardStats, RecentActivity } from '../types/api';

class DashboardService {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<ApiResponse<DashboardStats>>(
      API_ENDPOINTS.DASHBOARD.STATS
    );
    return response.data.data;
  }

  /**
   * Get recent activities
   */
  async getRecentActivities(limit: number = 10): Promise<RecentActivity[]> {
    const response = await api.get<ApiResponse<RecentActivity[]>>(
      `${API_ENDPOINTS.DASHBOARD.RECENT_ACTIVITIES}?limit=${limit}`
    );
    return response.data.data;
  }

  /**
   * Get charts data
   */
  async getChartsData(period: 'day' | 'week' | 'month' | 'year' = 'week'): Promise<any> {
    const response = await api.get<ApiResponse<any>>(
      `${API_ENDPOINTS.DASHBOARD.CHARTS}?period=${period}`
    );
    return response.data.data;
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;
