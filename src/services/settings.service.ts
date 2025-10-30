import { api } from '../lib/api/client';
import { API_ENDPOINTS } from '../lib/api/endpoints';
import { 
  ApiResponse, 
  Settings, 
  LDAPSettings, 
  EmailSettings,
  Storage 
} from '../types/api';

class SettingsService {
  /**
   * Get all settings
   */
  async getSettings(): Promise<Settings> {
    const response = await api.get<ApiResponse<Settings>>(
      API_ENDPOINTS.SETTINGS.GET
    );
    return response.data.data;
  }

  /**
   * Update settings
   */
  async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    const response = await api.put<ApiResponse<Settings>>(
      API_ENDPOINTS.SETTINGS.UPDATE,
      settings
    );
    return response.data.data;
  }

  /**
   * Get LDAP settings
   */
  async getLDAPSettings(): Promise<LDAPSettings> {
    const response = await api.get<ApiResponse<LDAPSettings>>(
      API_ENDPOINTS.SETTINGS.LDAP
    );
    return response.data.data;
  }

  /**
   * Update LDAP settings
   */
  async updateLDAPSettings(settings: LDAPSettings): Promise<LDAPSettings> {
    const response = await api.put<ApiResponse<LDAPSettings>>(
      API_ENDPOINTS.SETTINGS.LDAP,
      settings
    );
    return response.data.data;
  }

  /**
   * Test LDAP connection
   */
  async testLDAPConnection(settings?: LDAPSettings): Promise<{ success: boolean; message: string }> {
    const response = await api.post<ApiResponse<{ success: boolean; message: string }>>(
      API_ENDPOINTS.SETTINGS.TEST_LDAP,
      settings
    );
    return response.data.data;
  }

  /**
   * Get email settings
   */
  async getEmailSettings(): Promise<EmailSettings> {
    const response = await api.get<ApiResponse<EmailSettings>>(
      API_ENDPOINTS.SETTINGS.EMAIL
    );
    return response.data.data;
  }

  /**
   * Update email settings
   */
  async updateEmailSettings(settings: EmailSettings): Promise<EmailSettings> {
    const response = await api.put<ApiResponse<EmailSettings>>(
      API_ENDPOINTS.SETTINGS.EMAIL,
      settings
    );
    return response.data.data;
  }

  /**
   * Send test email
   */
  async sendTestEmail(to: string, settings?: EmailSettings): Promise<{ success: boolean; message: string }> {
    const response = await api.post<ApiResponse<{ success: boolean; message: string }>>(
      API_ENDPOINTS.SETTINGS.TEST_EMAIL,
      { to, settings }
    );
    return response.data.data;
  }

  /**
   * Get CG servers
   */
  async getCGServers(): Promise<Storage[]> {
    const response = await api.get<ApiResponse<Storage[]>>(
      API_ENDPOINTS.SETTINGS.CG_SERVERS
    );
    return response.data.data;
  }

  /**
   * Add CG server
   */
  async addCGServer(server: Partial<Storage>): Promise<Storage> {
    const response = await api.post<ApiResponse<Storage>>(
      API_ENDPOINTS.SETTINGS.CG_SERVERS,
      server
    );
    return response.data.data;
  }

  /**
   * Update CG server
   */
  async updateCGServer(id: string, server: Partial<Storage>): Promise<Storage> {
    const response = await api.put<ApiResponse<Storage>>(
      `${API_ENDPOINTS.SETTINGS.CG_SERVERS}/${id}`,
      server
    );
    return response.data.data;
  }

  /**
   * Delete CG server
   */
  async deleteCGServer(id: string): Promise<void> {
    await api.delete(`${API_ENDPOINTS.SETTINGS.CG_SERVERS}/${id}`);
  }

  /**
   * Test CG server connection
   */
  async testCGServerConnection(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post<ApiResponse<{ success: boolean; message: string }>>(
      `${API_ENDPOINTS.SETTINGS.CG_SERVERS}/${id}/test`
    );
    return response.data.data;
  }
}

export const settingsService = new SettingsService();
export default settingsService;
