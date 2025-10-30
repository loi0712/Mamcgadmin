/**
 * API Types & Interfaces
 * Based on Swagger API responses
 */

// Generic API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Paginated Response
export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

// Error Response
export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  details?: any;
}

// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresIn: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  avatar?: string;
  role: string;
  roleId: string;
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: string;
  isActive?: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  roleId?: string;
  isActive?: boolean;
}

// Role Types
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  userCount?: number;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  createdAt: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissionIds: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissionIds?: string[];
}

// Workflow Types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  trigger: 'manual' | 'auto' | 'scheduled' | 'webhook';
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastExecuted?: string;
  executionCount: number;
}

export interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  description?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  config?: Record<string, any>;
}

export interface WorkflowConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface CreateWorkflowRequest {
  name: string;
  description?: string;
  trigger?: string;
  nodes?: WorkflowNode[];
  connections?: WorkflowConnection[];
}

export interface WorkflowExecutionStatus {
  id: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt: string;
  completedAt?: string;
  duration?: number;
  error?: string;
  logs: WorkflowLog[];
}

export interface WorkflowLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  nodeId?: string;
}

// Media/File Types
export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  duration?: number;
  width?: number;
  height?: number;
  thumbnail?: string;
  path: string;
  metadata?: Record<string, any>;
  status: 'uploading' | 'processing' | 'ready' | 'failed';
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadMediaRequest {
  file: File;
  metadata?: Record<string, any>;
}

// Storage Types
export interface Storage {
  id: string;
  name: string;
  type: 'local' | 'nfs' | 's3' | 'azure' | 'gcs';
  config: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error';
  totalSpace?: number;
  usedSpace?: number;
  availableSpace?: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStorageRequest {
  name: string;
  type: string;
  config: Record<string, any>;
  isDefault?: boolean;
}

// Database Types
export interface DatabaseInfo {
  name: string;
  type: string;
  version: string;
  size: number;
  tables: number;
  status: 'healthy' | 'warning' | 'error';
  lastBackup?: string;
}

export interface DatabaseBackup {
  id: string;
  filename: string;
  size: number;
  type: 'full' | 'incremental';
  status: 'running' | 'completed' | 'failed';
  createdAt: string;
  duration?: number;
}

export interface CreateBackupRequest {
  type?: 'full' | 'incremental';
  description?: string;
}

// Log Types
export interface Log {
  id: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  category: string;
  message: string;
  userId?: string;
  username?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface LogStats {
  total: number;
  byLevel: Record<string, number>;
  byCategory: Record<string, number>;
  byDate: Array<{ date: string; count: number }>;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  isRead: boolean;
  userId: string;
  data?: Record<string, any>;
  createdAt: string;
}

// Field Group Types
export interface FieldGroup {
  id: string;
  name: string;
  description: string;
  order: number;
  isActive: boolean;
  fieldCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Data Field Types
export interface DataField {
  id: string;
  name: string;
  fieldGroupId: string;
  fieldGroup?: string;
  dataType: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'multiselect' | 'tags';
  isRequired: boolean;
  isSearchable: boolean;
  isEditable: boolean;
  order: number;
  config?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Display Panel Types
export interface DisplayPanel {
  id: string;
  name: string;
  description: string;
  fieldGroups: string[];
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Settings Types
export interface Settings {
  ldap?: LDAPSettings;
  email?: EmailSettings;
  general?: GeneralSettings;
}

export interface LDAPSettings {
  enabled: boolean;
  host: string;
  port: number;
  baseDN: string;
  bindDN: string;
  bindPassword?: string;
  userSearchFilter: string;
  groupSearchFilter: string;
  ssl: boolean;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  encryption: 'none' | 'ssl' | 'tls';
  username: string;
  password?: string;
  fromName: string;
  fromEmail: string;
  replyTo?: string;
}

export interface GeneralSettings {
  siteName: string;
  siteUrl: string;
  timezone: string;
  dateFormat: string;
  language: string;
}

// Server Status Types
export interface ServerStatus {
  status: 'healthy' | 'warning' | 'error';
  uptime: number;
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  services: ServiceStatus[];
  timestamp: string;
}

export interface ServiceStatus {
  name: string;
  status: 'running' | 'stopped' | 'error';
  uptime?: number;
  cpu?: number;
  memory?: number;
}

// Dashboard Types
export interface DashboardStats {
  users: {
    total: number;
    active: number;
    new: number;
  };
  workflows: {
    total: number;
    running: number;
    completed: number;
    failed: number;
  };
  media: {
    total: number;
    size: number;
    uploads: number;
  };
  storage: {
    total: number;
    used: number;
    available: number;
    usage: number;
  };
}

export interface RecentActivity {
  id: string;
  type: string;
  action: string;
  description: string;
  userId: string;
  username: string;
  timestamp: string;
}
