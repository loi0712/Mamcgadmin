/**
 * Storage Hook
 * React hook for storage connection management
 */

import { useState, useCallback } from 'react';
import { storageService } from '../services/storage.service';
import type {
  StorageConnection,
  CreateStorageConnectionRequest,
  TestStorageConnectionRequest,
  StorageSyncRequest,
  StorageCleanupRequest,
} from '../types/api';
import { toast } from 'sonner@2.0.3';

export function useStorage() {
  const [connections, setConnections] = useState<StorageConnection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all connections
  const fetchConnections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await storageService.listConnections();
      if (response.success) {
        setConnections(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch connections');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Lỗi khi tải danh sách lưu trữ', {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Create connection
  const createConnection = useCallback(async (data: CreateStorageConnectionRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await storageService.createConnection(data);
      if (response.success) {
        toast.success('Thành công!', {
          description: 'Đã thêm hệ thống lưu trữ mới',
        });
        await fetchConnections();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create connection');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Lỗi khi tạo lưu trữ', {
        description: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchConnections]);

  // Update connection
  const updateConnection = useCallback(
    async (id: string, data: Partial<CreateStorageConnectionRequest>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await storageService.updateConnection(id, data);
        if (response.success) {
          toast.success('Thành công!', {
            description: 'Đã cập nhật cấu hình lưu trữ',
          });
          await fetchConnections();
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to update connection');
        }
      } catch (err: any) {
        setError(err.message);
        toast.error('Lỗi khi cập nhật', {
          description: err.message,
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchConnections]
  );

  // Delete connection
  const deleteConnection = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await storageService.deleteConnection(id);
        if (response.success) {
          toast.success('Thành công!', {
            description: 'Đã xóa hệ thống lưu trữ',
          });
          await fetchConnections();
        } else {
          throw new Error(response.error || 'Failed to delete connection');
        }
      } catch (err: any) {
        setError(err.message);
        toast.error('Lỗi khi xóa', {
          description: err.message,
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchConnections]
  );

  // Test connection
  const testConnection = useCallback(async (data: TestStorageConnectionRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await storageService.testConnection(data);
      if (response.success && response.data.success) {
        toast.success('Kết nối thành công!', {
          description: response.data.message,
        });
        return response.data;
      } else {
        throw new Error(response.data.message || 'Connection test failed');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Kết nối thất bại', {
        description: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Connect
  const connect = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await storageService.connect(id);
        if (response.success) {
          toast.success('Đã kết nối!', {
            description: 'Storage đã được kết nối',
          });
          await fetchConnections();
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to connect');
        }
      } catch (err: any) {
        setError(err.message);
        toast.error('Lỗi khi kết nối', {
          description: err.message,
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchConnections]
  );

  // Disconnect
  const disconnect = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await storageService.disconnect(id);
        if (response.success) {
          toast.success('Đã ngắt kết nối!', {
            description: 'Storage đã được ngắt kết nối',
          });
          await fetchConnections();
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to disconnect');
        }
      } catch (err: any) {
        setError(err.message);
        toast.error('Lỗi khi ngắt kết nối', {
          description: err.message,
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchConnections]
  );

  // Get stats
  const getStats = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await storageService.getStats(id);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to get stats');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Lỗi khi lấy thống kê', {
        description: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync storage
  const syncStorage = useCallback(async (data: StorageSyncRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await storageService.syncStorage(data);
      if (response.success) {
        toast.success('Đồng bộ thành công!', {
          description: `Đã xử lý ${response.data.filesAdded + response.data.filesUpdated} files`,
        });
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to sync storage');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Lỗi khi đồng bộ', {
        description: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cleanup storage
  const cleanupStorage = useCallback(async (data: StorageCleanupRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await storageService.cleanupStorage(data);
      if (response.success) {
        toast.success('Dọn dẹp thành công!', {
          description: `Đã xóa ${response.data.filesDeleted} files`,
        });
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to cleanup storage');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Lỗi khi dọn dẹp', {
        description: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    connections,
    loading,
    error,
    fetchConnections,
    createConnection,
    updateConnection,
    deleteConnection,
    testConnection,
    connect,
    disconnect,
    getStats,
    syncStorage,
    cleanupStorage,
  };
}
