import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/user.service';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  PaginationParams,
} from '../types/api';
import { toast } from 'sonner';

interface UseUsersReturn {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchUsers: (params?: PaginationParams) => Promise<void>;
  createUser: (userData: CreateUserRequest) => Promise<User>;
  updateUser: (id: string, userData: UpdateUserRequest) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  refreshUsers: () => Promise<void>;
}

export function useUsers(initialParams?: PaginationParams): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [params, setParams] = useState<PaginationParams>(
    initialParams || { page: 1, limit: 10 }
  );

  // Fetch users
  const fetchUsers = useCallback(async (newParams?: PaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const queryParams = newParams || params;
      const response = await userService.getUsers(queryParams);
      
      setUsers(response.data);
      setPagination(response.pagination);
      setParams(queryParams);
    } catch (err: any) {
      console.error('Fetch users error:', err);
      setError(err);
      toast.error('Không thể tải danh sách người dùng');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  // Create user
  const createUser = useCallback(async (userData: CreateUserRequest): Promise<User> => {
    try {
      setIsLoading(true);
      const newUser = await userService.createUser(userData);
      
      // Refresh users list
      await fetchUsers();
      
      toast.success('Tạo người dùng thành công!');
      return newUser;
    } catch (err: any) {
      console.error('Create user error:', err);
      toast.error(err.response?.data?.message || 'Tạo người dùng thất bại');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  // Update user
  const updateUser = useCallback(async (id: string, userData: UpdateUserRequest): Promise<User> => {
    try {
      setIsLoading(true);
      const updatedUser = await userService.updateUser(id, userData);
      
      // Update local state
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === id ? updatedUser : user))
      );
      
      toast.success('Cập nhật người dùng thành công!');
      return updatedUser;
    } catch (err: any) {
      console.error('Update user error:', err);
      toast.error(err.response?.data?.message || 'Cập nhật người dùng thất bại');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete user
  const deleteUser = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      await userService.deleteUser(id);
      
      // Remove from local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      
      toast.success('Xóa người dùng thành công!');
    } catch (err: any) {
      console.error('Delete user error:', err);
      toast.error(err.response?.data?.message || 'Xóa người dùng thất bại');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search users
  const searchUsers = useCallback(async (query: string) => {
    await fetchUsers({ ...params, search: query, page: 1 });
  }, [params, fetchUsers]);

  // Refresh users
  const refreshUsers = useCallback(async () => {
    await fetchUsers(params);
  }, [params, fetchUsers]);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, []); // Empty deps - only fetch once on mount

  return {
    users,
    isLoading,
    error,
    pagination,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    refreshUsers,
  };
}
