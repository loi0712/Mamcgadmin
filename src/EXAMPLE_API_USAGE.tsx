/**
 * Example: How to Use API Integration in Components
 * This file demonstrates best practices for using the API
 */

import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useUsers } from './hooks/useUsers';
import { useWorkflows } from './hooks/useWorkflows';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { toast } from 'sonner';

// ============================================
// EXAMPLE 1: Login Component
// ============================================
export function LoginExample() {
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ username, password, rememberMe: true });
      // Automatically handles success toast and navigation
    } catch (error) {
      // Error already handled by hook with toast
      console.error('Login failed:', error);
    }
  };

  if (isAuthenticated) {
    return <div>Welcome, {user?.fullName}!</div>;
  }

  return (
    <form onSubmit={handleLogin}>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        disabled={isLoading}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>
    </form>
  );
}

// ============================================
// EXAMPLE 2: Users Management
// ============================================
export function UsersListExample() {
  const {
    users,
    isLoading,
    pagination,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
  } = useUsers({
    page: 1,
    limit: 10,
    sort: 'createdAt',
    order: 'desc',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle search with debounce (recommended)
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Debounce search
    const timer = setTimeout(() => {
      searchUsers(query);
    }, 500);
    
    return () => clearTimeout(timer);
  };

  // Handle create user
  const handleCreateUser = async () => {
    try {
      await createUser({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        roleId: 'role-id',
      });
      
      setIsDialogOpen(false);
      // Auto-refreshes users list
    } catch (error) {
      // Error handled by hook
    }
  };

  // Handle update user
  const handleUpdateUser = async (userId: string) => {
    try {
      await updateUser(userId, {
        firstName: 'Updated',
        isActive: true,
      });
    } catch (error) {
      // Error handled
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteUser(userId);
      } catch (error) {
        // Error handled
      }
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    fetchUsers({ page: pagination.page + 1 });
  };

  const handlePrevPage = () => {
    fetchUsers({ page: pagination.page - 1 });
  };

  return (
    <div>
      {/* Search */}
      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Loading State */}
      {isLoading && <div>Loading...</div>}

      {/* Users List */}
      {!isLoading && (
        <div>
          {users.map((user) => (
            <div key={user.id} className="border p-4">
              <h3>{user.fullName}</h3>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
              <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
              
              <Button onClick={() => handleUpdateUser(user.id)}>
                Edit
              </Button>
              <Button onClick={() => handleDeleteUser(user.id)} variant="destructive">
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        <Button
          onClick={handlePrevPage}
          disabled={pagination.page === 1 || isLoading}
        >
          Previous
        </Button>
        
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        
        <Button
          onClick={handleNextPage}
          disabled={pagination.page >= pagination.totalPages || isLoading}
        >
          Next
        </Button>
      </div>

      {/* Create User Dialog */}
      <Button onClick={() => setIsDialogOpen(true)}>
        Create New User
      </Button>
      
      {isDialogOpen && (
        <div>
          {/* Your dialog content */}
          <Button onClick={handleCreateUser}>Save</Button>
        </div>
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 3: Workflows Management
// ============================================
export function WorkflowsExample() {
  const {
    workflows,
    isLoading,
    createWorkflow,
    executeWorkflow,
    cloneWorkflow,
    deleteWorkflow,
  } = useWorkflows();

  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  // Create new workflow
  const handleCreateWorkflow = async () => {
    try {
      const newWorkflow = await createWorkflow({
        name: 'New Workflow',
        description: 'Process video files',
        trigger: 'manual',
        nodes: [
          {
            id: 'start-node',
            type: 'start',
            label: 'Start',
            x: 100,
            y: 100,
            width: 120,
            height: 60,
          },
        ],
        connections: [],
      });

      console.log('Created workflow:', newWorkflow.id);
    } catch (error) {
      // Error handled
    }
  };

  // Execute workflow
  const handleExecuteWorkflow = async (workflowId: string) => {
    try {
      const execution = await executeWorkflow(workflowId, {
        inputFile: 'video.mp4',
      });

      console.log('Execution started:', execution.id);
      console.log('Status:', execution.status);

      // Poll for status updates
      const pollInterval = setInterval(async () => {
        // Check execution status
        // If completed or failed, clear interval
      }, 2000);
    } catch (error) {
      // Error handled
    }
  };

  // Clone workflow
  const handleCloneWorkflow = async (workflowId: string) => {
    try {
      await cloneWorkflow(workflowId, 'Workflow (Copy)');
    } catch (error) {
      // Error handled
    }
  };

  // Delete workflow
  const handleDeleteWorkflow = async (workflowId: string) => {
    if (confirm('Delete this workflow?')) {
      try {
        await deleteWorkflow(workflowId);
      } catch (error) {
        // Error handled
      }
    }
  };

  return (
    <div>
      <h2>Workflows</h2>

      {/* Create Button */}
      <Button onClick={handleCreateWorkflow}>
        Create New Workflow
      </Button>

      {/* Loading */}
      {isLoading && <div>Loading workflows...</div>}

      {/* Workflows List */}
      {!isLoading && (
        <div className="grid gap-4">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="border p-4">
              <h3>{workflow.name}</h3>
              <p>{workflow.description}</p>
              <p>Status: {workflow.status}</p>
              <p>Trigger: {workflow.trigger}</p>
              <p>Executions: {workflow.executionCount}</p>

              <div className="flex gap-2 mt-2">
                <Button onClick={() => handleExecuteWorkflow(workflow.id)}>
                  Execute
                </Button>
                <Button onClick={() => handleCloneWorkflow(workflow.id)}>
                  Clone
                </Button>
                <Button onClick={() => setSelectedWorkflowId(workflow.id)}>
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 4: Direct Service Usage
// ============================================
import { userService } from './services/user.service';
import { workflowService } from './services/workflow.service';
import { authService } from './services/auth.service';

export function DirectServiceExample() {
  const [data, setData] = useState<any>(null);

  // Example: Get users directly
  const fetchUsersDirectly = async () => {
    try {
      const response = await userService.getUsers({
        page: 1,
        limit: 20,
        sort: 'username',
        order: 'asc',
      });

      setData(response.data);
      console.log('Users:', response.data);
      console.log('Pagination:', response.pagination);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Example: Get single workflow
  const fetchWorkflowDirectly = async (workflowId: string) => {
    try {
      const workflow = await workflowService.getWorkflowById(workflowId);
      console.log('Workflow:', workflow);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Example: Update user profile
  const updateProfileDirectly = async () => {
    try {
      const updatedUser = await userService.updateProfile({
        firstName: 'Updated',
        lastName: 'Name',
      });

      console.log('Profile updated:', updatedUser);
      toast.success('Profile updated!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update profile');
    }
  };

  // Example: Check authentication
  const checkAuth = () => {
    const isAuth = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();
    const token = authService.getToken();

    console.log('Is authenticated:', isAuth);
    console.log('Current user:', currentUser);
    console.log('Token:', token);
  };

  return (
    <div>
      <Button onClick={fetchUsersDirectly}>Fetch Users</Button>
      <Button onClick={() => fetchWorkflowDirectly('workflow-id')}>
        Fetch Workflow
      </Button>
      <Button onClick={updateProfileDirectly}>Update Profile</Button>
      <Button onClick={checkAuth}>Check Auth</Button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

// ============================================
// EXAMPLE 5: Advanced Usage - Polling
// ============================================
import { useEffect } from 'react';

export function WorkflowStatusPolling({ workflowId, executionId }: { 
  workflowId: string; 
  executionId: string 
}) {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    // Poll for status every 2 seconds
    const pollStatus = async () => {
      try {
        const executionStatus = await workflowService.getExecutionStatus(
          workflowId,
          executionId
        );

        setStatus(executionStatus);

        // Stop polling if completed or failed
        if (
          executionStatus.status === 'completed' ||
          executionStatus.status === 'failed'
        ) {
          clearInterval(interval);
          
          if (executionStatus.status === 'completed') {
            toast.success('Workflow completed!');
          } else {
            toast.error('Workflow failed!');
          }
        }
      } catch (error) {
        console.error('Status polling error:', error);
      }
    };

    const interval = setInterval(pollStatus, 2000);

    // Initial fetch
    pollStatus();

    // Cleanup
    return () => clearInterval(interval);
  }, [workflowId, executionId]);

  return (
    <div>
      <h3>Workflow Execution Status</h3>
      {status && (
        <>
          <p>Status: {status.status}</p>
          <p>Started: {new Date(status.startedAt).toLocaleString()}</p>
          {status.completedAt && (
            <p>Completed: {new Date(status.completedAt).toLocaleString()}</p>
          )}
          {status.duration && <p>Duration: {status.duration}s</p>}
          {status.error && <p className="text-red-500">Error: {status.error}</p>}
        </>
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 6: Error Handling
// ============================================
export function ErrorHandlingExample() {
  const { createUser } = useUsers();

  const handleCreateWithErrorHandling = async () => {
    try {
      await createUser({
        username: 'newuser',
        email: 'invalid-email', // This will cause validation error
        password: '123', // Weak password
        firstName: 'Test',
        lastName: 'User',
        roleId: 'role-id',
      });
    } catch (error: any) {
      // Specific error handling
      if (error.response?.status === 400) {
        const validationErrors = error.response.data.errors;
        console.error('Validation errors:', validationErrors);
        
        // Show specific field errors
        Object.entries(validationErrors).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`);
        });
      } else if (error.response?.status === 409) {
        toast.error('User already exists!');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <Button onClick={handleCreateWithErrorHandling}>
      Create User (with error handling)
    </Button>
  );
}

export default {
  LoginExample,
  UsersListExample,
  WorkflowsExample,
  DirectServiceExample,
  WorkflowStatusPolling,
  ErrorHandlingExample,
};
