/**
 * Database Service
 * Handles database connection management and backup operations
 */

import { apiClient } from '../lib/api/client';
import { API_ENDPOINTS } from '../lib/api/endpoints';
import type {
  ApiResponse,
  DatabaseConnection,
  CreateDatabaseConnectionRequest,
  TestConnectionRequest,
  TestConnectionResponse,
  DatabaseBackup,
  CreateBackupRequest,
  BackupConfig,
} from '../types/api';

export const databaseService = {
  // Database Connections
  async listConnections(): Promise<ApiResponse<DatabaseConnection[]>> {
    return apiClient.get(API_ENDPOINTS.DATABASE.LIST);
  },

  async getConnection(id: string): Promise<ApiResponse<DatabaseConnection>> {
    return apiClient.get(API_ENDPOINTS.DATABASE.GET(id));
  },

  async createConnection(
    data: CreateDatabaseConnectionRequest
  ): Promise<ApiResponse<DatabaseConnection>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.CREATE, data);
  },

  async updateConnection(
    id: string,
    data: Partial<CreateDatabaseConnectionRequest>
  ): Promise<ApiResponse<DatabaseConnection>> {
    return apiClient.put(API_ENDPOINTS.DATABASE.UPDATE(id), data);
  },

  async deleteConnection(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.DATABASE.DELETE(id));
  },

  // Connection Actions
  async testConnection(data: TestConnectionRequest): Promise<ApiResponse<TestConnectionResponse>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.TEST_CONNECTION, data);
  },

  async testExistingConnection(id: string): Promise<ApiResponse<TestConnectionResponse>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.TEST(id));
  },

  async connect(id: string): Promise<ApiResponse<DatabaseConnection>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.CONNECT(id));
  },

  async disconnect(id: string): Promise<ApiResponse<DatabaseConnection>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.DISCONNECT(id));
  },

  async refreshConnection(id: string): Promise<ApiResponse<DatabaseConnection>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.REFRESH(id));
  },

  // Backup Operations
  async listBackups(): Promise<ApiResponse<DatabaseBackup[]>> {
    return apiClient.get(API_ENDPOINTS.DATABASE.LIST_BACKUPS);
  },

  async getBackup(id: string): Promise<ApiResponse<DatabaseBackup>> {
    return apiClient.get(API_ENDPOINTS.DATABASE.GET_BACKUP(id));
  },

  async createBackup(data: CreateBackupRequest): Promise<ApiResponse<DatabaseBackup>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.BACKUP, data);
  },

  async backupNow(id: string, type?: 'full' | 'incremental'): Promise<ApiResponse<DatabaseBackup>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.BACKUP_NOW(id), { type: type || 'full' });
  },

  async deleteBackup(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.DATABASE.DELETE_BACKUP(id));
  },

  async downloadBackup(id: string): Promise<Blob> {
    const response = await fetch(API_ENDPOINTS.DATABASE.DOWNLOAD_BACKUP(id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download backup');
    }

    return response.blob();
  },

  async restoreBackup(backupId: string, targetDatabaseId?: string): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.RESTORE, {
      backupId,
      targetDatabaseId,
    });
  },

  // Backup Configuration
  async getBackupConfig(): Promise<ApiResponse<BackupConfig>> {
    return apiClient.get(API_ENDPOINTS.DATABASE.BACKUP_CONFIG);
  },

  async updateBackupConfig(config: BackupConfig): Promise<ApiResponse<BackupConfig>> {
    return apiClient.put(API_ENDPOINTS.DATABASE.UPDATE_BACKUP_CONFIG, config);
  },

  // Database Maintenance
  async optimizeDatabase(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.OPTIMIZE);
  },

  async repairDatabase(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post(API_ENDPOINTS.DATABASE.REPAIR);
  },

  async getDatabaseInfo(): Promise<ApiResponse<any>> {
    return apiClient.get(API_ENDPOINTS.DATABASE.INFO);
  },
};
