/**
 * API Endpoints
 * Based on Swagger API: http://194.163.40.189:5080/swagger/v1/swagger.json
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    REGISTER: '/api/auth/register',
    VERIFY: '/api/auth/verify',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },

  // Users
  USERS: {
    LIST: '/api/users',
    GET: (id: string) => `/api/users/${id}`,
    CREATE: '/api/users',
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    CHANGE_PASSWORD: '/api/users/change-password',
  },

  // Roles & Permissions
  ROLES: {
    LIST: '/api/roles',
    GET: (id: string) => `/api/roles/${id}`,
    CREATE: '/api/roles',
    UPDATE: (id: string) => `/api/roles/${id}`,
    DELETE: (id: string) => `/api/roles/${id}`,
    PERMISSIONS: (id: string) => `/api/roles/${id}/permissions`,
  },

  PERMISSIONS: {
    LIST: '/api/permissions',
    GET: (id: string) => `/api/permissions/${id}`,
    CREATE: '/api/permissions',
    UPDATE: (id: string) => `/api/permissions/${id}`,
    DELETE: (id: string) => `/api/permissions/${id}`,
  },

  // Workflows
  WORKFLOWS: {
    LIST: '/api/workflows',
    GET: (id: string) => `/api/workflows/${id}`,
    CREATE: '/api/workflows',
    UPDATE: (id: string) => `/api/workflows/${id}`,
    DELETE: (id: string) => `/api/workflows/${id}`,
    EXECUTE: (id: string) => `/api/workflows/${id}/execute`,
    STATUS: (id: string) => `/api/workflows/${id}/status`,
    HISTORY: (id: string) => `/api/workflows/${id}/history`,
  },

  // Media/Files
  MEDIA: {
    LIST: '/api/media',
    GET: (id: string) => `/api/media/${id}`,
    UPLOAD: '/api/media/upload',
    UPDATE: (id: string) => `/api/media/${id}`,
    DELETE: (id: string) => `/api/media/${id}`,
    METADATA: (id: string) => `/api/media/${id}/metadata`,
    THUMBNAIL: (id: string) => `/api/media/${id}/thumbnail`,
    DOWNLOAD: (id: string) => `/api/media/${id}/download`,
  },

  // Storage
  STORAGE: {
    LIST: '/api/storage',
    GET: (id: string) => `/api/storage/${id}`,
    CREATE: '/api/storage',
    UPDATE: (id: string) => `/api/storage/${id}`,
    DELETE: (id: string) => `/api/storage/${id}`,
    TEST_CONNECTION: '/api/storage/test-connection',
    TEST: (id: string) => `/api/storage/${id}/test`,
    CONNECT: (id: string) => `/api/storage/${id}/connect`,
    DISCONNECT: (id: string) => `/api/storage/${id}/disconnect`,
    STATS: (id: string) => `/api/storage/${id}/stats`,
    SYNC: (id: string) => `/api/storage/${id}/sync`,
    CLEANUP: (id: string) => `/api/storage/${id}/cleanup`,
    ALL_STATS: '/api/storage/stats',
  },

  // Database
  DATABASE: {
    INFO: '/api/database/info',
    LIST: '/api/database/connections',
    GET: (id: string) => `/api/database/connections/${id}`,
    CREATE: '/api/database/connections',
    UPDATE: (id: string) => `/api/database/connections/${id}`,
    DELETE: (id: string) => `/api/database/connections/${id}`,
    TEST_CONNECTION: '/api/database/test-connection',
    TEST: (id: string) => `/api/database/connections/${id}/test`,
    CONNECT: (id: string) => `/api/database/connections/${id}/connect`,
    DISCONNECT: (id: string) => `/api/database/connections/${id}/disconnect`,
    REFRESH: (id: string) => `/api/database/connections/${id}/refresh`,
    BACKUP: '/api/database/backup',
    BACKUP_NOW: (id: string) => `/api/database/connections/${id}/backup`,
    RESTORE: '/api/database/restore',
    LIST_BACKUPS: '/api/database/backups',
    GET_BACKUP: (id: string) => `/api/database/backups/${id}`,
    DELETE_BACKUP: (id: string) => `/api/database/backups/${id}`,
    DOWNLOAD_BACKUP: (id: string) => `/api/database/backups/${id}/download`,
    BACKUP_CONFIG: '/api/database/backup-config',
    UPDATE_BACKUP_CONFIG: '/api/database/backup-config',
    OPTIMIZE: '/api/database/optimize',
    REPAIR: '/api/database/repair',
  },

  // Logs
  LOGS: {
    LIST: '/api/logs',
    GET: (id: string) => `/api/logs/${id}`,
    CLEAR: '/api/logs/clear',
    EXPORT: '/api/logs/export',
    STATS: '/api/logs/stats',
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    GET: (id: string) => `/api/notifications/${id}`,
    MARK_READ: (id: string) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/read-all',
    DELETE: (id: string) => `/api/notifications/${id}`,
    CLEAR_ALL: '/api/notifications/clear',
    UNREAD_COUNT: '/api/notifications/unread-count',
  },

  // Field Groups
  FIELD_GROUPS: {
    LIST: '/api/field-groups',
    GET: (id: string) => `/api/field-groups/${id}`,
    CREATE: '/api/field-groups',
    UPDATE: (id: string) => `/api/field-groups/${id}`,
    DELETE: (id: string) => `/api/field-groups/${id}`,
  },

  // Data Fields
  DATA_FIELDS: {
    LIST: '/api/data-fields',
    GET: (id: string) => `/api/data-fields/${id}`,
    CREATE: '/api/data-fields',
    UPDATE: (id: string) => `/api/data-fields/${id}`,
    DELETE: (id: string) => `/api/data-fields/${id}`,
  },

  // Display Panels
  DISPLAY_PANELS: {
    LIST: '/api/display-panels',
    GET: (id: string) => `/api/display-panels/${id}`,
    CREATE: '/api/display-panels',
    UPDATE: (id: string) => `/api/display-panels/${id}`,
    DELETE: (id: string) => `/api/display-panels/${id}`,
  },

  // Settings
  SETTINGS: {
    GET: '/api/settings',
    UPDATE: '/api/settings',
    LDAP: '/api/settings/ldap',
    EMAIL: '/api/settings/email',
    CG_SERVERS: '/api/settings/cg-servers',
    TEST_EMAIL: '/api/settings/test-email',
    TEST_LDAP: '/api/settings/test-ldap',
  },

  // Server Status
  SERVER: {
    STATUS: '/api/server/status',
    HEALTH: '/api/server/health',
    METRICS: '/api/server/metrics',
    SERVICES: '/api/server/services',
    RESTART: (service: string) => `/api/server/services/${service}/restart`,
  },

  // Dashboard
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    RECENT_ACTIVITIES: '/api/dashboard/activities',
    CHARTS: '/api/dashboard/charts',
  },
};

// Helper function to build query string
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Helper function for pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export const buildPaginationQuery = (params: PaginationParams): string => {
  return buildQueryString(params);
};