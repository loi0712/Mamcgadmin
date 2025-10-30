/**
 * Storage Service
 * Handles storage connection management and operations
 */

import { apiClient } from '../lib/api/client';
import { API_ENDPOINTS } from '../lib/api/endpoints';
import type {
  ApiResponse,
  StorageConnection,
  CreateStorageConnectionRequest,
  StorageStats,
  StorageSyncRequest,
  StorageCleanupRequest,
  TestStorageConnectionRequest,
} from '../types/api';

export const storageService = {
  // Storage Connections
  async listConnections(): Promise<ApiResponse<StorageConnection[]>> {
    return apiClient.get(API_ENDPOINTS.STORAGE.LIST);
  },

  async getConnection(id: string): Promise<ApiResponse<StorageConnection>> {
    return apiClient.get(API_ENDPOINTS.STORAGE.GET(id));
  },

  async createConnection(
    data: CreateStorageConnectionRequest
  ): Promise<ApiResponse<StorageConnection>> {
    return apiClient.post(API_ENDPOINTS.STORAGE.CREATE, data);
  },

  async updateConnection(
    id: string,
    data: Partial<CreateStorageConnectionRequest>
  ): Promise<ApiResponse<StorageConnection>> {
    return apiClient.put(API_ENDPOINTS.STORAGE.UPDATE(id), data);
  },

  async deleteConnection(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.STORAGE.DELETE(id));
  },

  // Connection Actions
  async testConnection(
    data: TestStorageConnectionRequest
  ): Promise<ApiResponse<{ success: boolean; message: string; latency?: number }>> {
    return apiClient.post(API_ENDPOINTS.STORAGE.TEST_CONNECTION, data);
  },

  async testExistingConnection(
    id: string
  ): Promise<ApiResponse<{ success: boolean; message: string; latency?: number }>> {
    return apiClient.post(API_ENDPOINTS.STORAGE.TEST(id));
  },

  async connect(id: string): Promise<ApiResponse<StorageConnection>> {
    return apiClient.post(API_ENDPOINTS.STORAGE.CONNECT(id));
  },

  async disconnect(id: string): Promise<ApiResponse<StorageConnection>> {
    return apiClient.post(API_ENDPOINTS.STORAGE.DISCONNECT(id));
  },

  // Storage Stats
  async getStats(id: string): Promise<ApiResponse<StorageStats>> {
    return apiClient.get(API_ENDPOINTS.STORAGE.STATS(id));
  },

  async getAllStats(): Promise<ApiResponse<{
    total: number;
    connected: number;
    totalCapacity: string;
    usedCapacity: string;
  }>> {
    return apiClient.get(API_ENDPOINTS.STORAGE.ALL_STATS);
  },

  // Storage Operations
  async syncStorage(data: StorageSyncRequest): Promise<ApiResponse<{
    filesAdded: number;
    filesUpdated: number;
    filesDeleted: number;
    duration: number;
  }>> {
    return apiClient.post(API_ENDPOINTS.STORAGE.SYNC(data.storageId), data);
  },

  async cleanupStorage(data: StorageCleanupRequest): Promise<ApiResponse<{
    filesDeleted: number;
    spaceFreed: number;
    duration: number;
  }>> {
    return apiClient.post(API_ENDPOINTS.STORAGE.CLEANUP(data.storageId), data);
  },
};
