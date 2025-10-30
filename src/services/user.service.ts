import { api } from '../lib/api/client';
import { API_ENDPOINTS, buildPaginationQuery, PaginationParams } from '../lib/api/endpoints';
import {
  ApiResponse,
  PaginatedResponse,
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../types/api';

class UserService {
  /**
   * Get list of users with pagination
   */
  async getUsers(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    const queryString = params ? buildPaginationQuery(params) : '';
    const response = await api.get<PaginatedResponse<User>>(
      `${API_ENDPOINTS.USERS.LIST}${queryString}`
    );
    return response.data;
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.GET(id)
    );
    return response.data.data;
  }

  /**
   * Create new user
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await api.post<ApiResponse<User>>(
      API_ENDPOINTS.USERS.CREATE,
      userData
    );
    return response.data.data;
  }

  /**
   * Update user
   */
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await api.put<ApiResponse<User>>(
      API_ENDPOINTS.USERS.UPDATE(id),
      userData
    );
    return response.data.data;
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    await api.delete<ApiResponse>(API_ENDPOINTS.USERS.DELETE(id));
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.PROFILE
    );
    return response.data.data;
  }

  /**
   * Update current user profile
   */
  async updateProfile(userData: UpdateUserRequest): Promise<User> {
    const response = await api.put<ApiResponse<User>>(
      API_ENDPOINTS.USERS.UPDATE_PROFILE,
      userData
    );
    
    // Update local storage
    localStorage.setItem('user', JSON.stringify(response.data.data));
    
    return response.data.data;
  }

  /**
   * Search users
   */
  async searchUsers(query: string, params?: PaginationParams): Promise<PaginatedResponse<User>> {
    const searchParams = { ...params, search: query };
    return this.getUsers(searchParams);
  }

  /**
   * Get users by role
   */
  async getUsersByRole(roleId: string, params?: PaginationParams): Promise<PaginatedResponse<User>> {
    const queryString = params ? buildPaginationQuery(params) : '';
    const response = await api.get<PaginatedResponse<User>>(
      `${API_ENDPOINTS.USERS.LIST}?roleId=${roleId}${queryString}`
    );
    return response.data;
  }

  /**
   * Activate/Deactivate user
   */
  async toggleUserStatus(id: string, isActive: boolean): Promise<User> {
    return this.updateUser(id, { isActive });
  }

  /**
   * Bulk delete users
   */
  async bulkDeleteUsers(ids: string[]): Promise<void> {
    await Promise.all(ids.map(id => this.deleteUser(id)));
  }
}

export const userService = new UserService();
export default userService;
