/**
 * Database Hook
 * React hook for database connection management
 */

import { useState, useCallback } from 'react';
import { databaseService } from '../services/database.service';
import type {
  DatabaseConnection,
  CreateDatabaseConnectionRequest,
  TestConnectionRequest,
  CreateBackupRequest,
  BackupConfig,
} from '../types/api';
import { toast } from 'sonner@2.0.3';

export function useDatabase() {
  const [connections, setConnections] = useState<DatabaseConnection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all connections
  const fetchConnections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await databaseService.listConnections();
      if (response.success) {
        setConnections(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch connections');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Lỗi khi tải danh sách kết nối', {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Create connection
  const createConnection = useCallback(async (data: CreateDatabaseConnectionRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await databaseService.createConnection(data);
      if (response.success) {
        toast.success('Thành công!', {
          description: 'Đã thêm kết nối database mới',
        });
        await fetchConnections();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create connection');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Lỗi khi tạo kết nối', {
        description: err.message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchConnections]);

  // Update connection
  const updateConnection = useCallback(
    async (id: string, data: Partial<CreateDatabaseConnectionRequest>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await databaseService.updateConnection(id, data);
        if (response.success) {
          toast.success('Thành công!', {
            description: 'Đã cập nhật cấu hình kết nối',
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
        const response = await databaseService.deleteConnection(id);
        if (response.success) {
          toast.success('Thành công!', {
            description: 'Đã xóa kết nối database',
          });
          await fetchConnections();
        } else {
          throw new Error(response.error || 'Failed to delete connection');
        }
      } catch (err: any) {
        setError(err.message);
        toast.error('Lỗi khi xóa kết nối', {
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
  const testConnection = useCallback(async (data: TestConnectionRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await databaseService.testConnection(data);
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
        const response = await databaseService.connect(id);
        if (response.success) {
          toast.success('Đã kết nối!', {
            description: 'Database đã được kết nối',
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
        const response = await databaseService.disconnect(id);
        if (response.success) {
          toast.success('Đã ngắt kết nối!', {
            description: 'Database đã được ngắt kết nối',
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

  // Refresh connection
  const refreshConnection = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await databaseService.refreshConnection(id);
        if (response.success) {
          toast.success('Đã làm mới!', {
            description: 'Kết nối đã được làm mới',
          });
          await fetchConnections();
          return response.data;
        } else {
          throw new Error(response.error || 'Failed to refresh connection');
        }
      } catch (err: any) {
        setError(err.message);
        toast.error('Lỗi khi làm mới', {
          description: err.message,
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchConnections]
  );

  // Backup now
  const backupNow = useCallback(async (id: string, type?: 'full' | 'incremental') => {
    setLoading(true);
    setError(null);
    try {
      const response = await databaseService.backupNow(id, type);
      if (response.success) {
        toast.success('Backup đang chạy!', {
          description: 'Quá trình backup database đã bắt đầu',
        });
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to start backup');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Lỗi khi backup', {
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
    refreshConnection,
    backupNow,
  };
}
