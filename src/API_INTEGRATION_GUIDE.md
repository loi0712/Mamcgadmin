# 📡 API Integration Guide

Complete guide for integrating the Swagger API into your MAMCG admin application.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install axios
# or
yarn add axios
```

### 2. API Configuration

The API client is configured in `/lib/api/client.ts`:

```typescript
import { api } from './lib/api/client';

// Base URL: http://194.163.40.189:5080
// All requests automatically include auth token from localStorage
```

### 3. Environment Variables (Optional)

Create `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://194.163.40.189:5080
NEXT_PUBLIC_API_VERSION=v1
```

---

## 📁 Project Structure

```
├── lib/
│   └── api/
│       ├── client.ts          # Axios client with interceptors
│       └── endpoints.ts       # All API endpoints
├── types/
│   └── api.ts                 # TypeScript interfaces
├── services/
│   ├── auth.service.ts        # Authentication service
│   ├── user.service.ts        # User management
│   └── workflow.service.ts    # Workflow operations
└── hooks/
    ├── useAuth.ts             # Auth hook
    ├── useUsers.ts            # Users management hook
    └── useWorkflows.ts        # Workflows hook
```

---

## 🔐 Authentication

### Login Example

```typescript
import { useAuth } from './hooks/useAuth';

function LoginForm() {
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    await login({
      username: 'admin',
      password: 'password123',
      rememberMe: true
    });
    // Automatically redirects on success
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
    </button>
  );
}
```

### Logout

```typescript
const { logout } = useAuth();

await logout(); // Clears tokens and user data
```

### Check Authentication

```typescript
const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  console.log('Current user:', user);
}
```

---

## 👥 User Management

### Fetch Users with Pagination

```typescript
import { useUsers } from './hooks/useUsers';

function UsersView() {
  const { users, isLoading, pagination, fetchUsers } = useUsers({
    page: 1,
    limit: 10,
    sort: 'createdAt',
    order: 'desc'
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.fullName}</li>
          ))}
        </ul>
      )}
      
      <p>Page {pagination.page} of {pagination.totalPages}</p>
      
      <button onClick={() => fetchUsers({ page: pagination.page + 1 })}>
        Next Page
      </button>
    </div>
  );
}
```

### Create User

```typescript
const { createUser } = useUsers();

const handleCreateUser = async () => {
  await createUser({
    username: 'newuser',
    email: 'newuser@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    roleId: 'role-id-here'
  });
  // Auto-refreshes users list
};
```

### Update User

```typescript
const { updateUser } = useUsers();

await updateUser('user-id', {
  firstName: 'Updated Name',
  isActive: true
});
```

### Delete User

```typescript
const { deleteUser } = useUsers();

await deleteUser('user-id');
```

### Search Users

```typescript
const { searchUsers } = useUsers();

await searchUsers('john'); // Search by name/email
```

---

## 🔄 Workflow Management

### Fetch Workflows

```typescript
import { useWorkflows } from './hooks/useWorkflows';

function WorkflowsView() {
  const { workflows, isLoading, fetchWorkflows } = useWorkflows();

  return (
    <div>
      {workflows.map(workflow => (
        <div key={workflow.id}>
          <h3>{workflow.name}</h3>
          <p>{workflow.description}</p>
          <span>Status: {workflow.status}</span>
        </div>
      ))}
    </div>
  );
}
```

### Create Workflow

```typescript
const { createWorkflow } = useWorkflows();

const handleCreateWorkflow = async () => {
  await createWorkflow({
    name: 'New Workflow',
    description: 'Process video files',
    trigger: 'manual',
    nodes: [
      {
        id: 'node-1',
        type: 'start',
        label: 'Start',
        x: 100,
        y: 100,
        width: 120,
        height: 60
      }
    ],
    connections: []
  });
};
```

### Execute Workflow

```typescript
const { executeWorkflow } = useWorkflows();

const handleExecute = async (workflowId: string) => {
  const execution = await executeWorkflow(workflowId, {
    inputFile: 'video.mp4'
  });
  
  console.log('Execution ID:', execution.id);
  console.log('Status:', execution.status);
};
```

### Clone Workflow

```typescript
const { cloneWorkflow } = useWorkflows();

await cloneWorkflow('workflow-id', 'New Workflow Name (Copy)');
```

---

## 🔧 Direct Service Usage

If you need more control, use services directly:

### User Service

```typescript
import { userService } from './services/user.service';

// Get users with custom params
const response = await userService.getUsers({
  page: 1,
  limit: 20,
  sort: 'username',
  order: 'asc',
  search: 'admin'
});

console.log(response.data); // User[]
console.log(response.pagination); // Pagination info

// Get single user
const user = await userService.getUserById('user-id');

// Update profile
const profile = await userService.updateProfile({
  firstName: 'Updated',
  lastName: 'Name'
});

// Search users
const searchResults = await userService.searchUsers('john', {
  limit: 5
});
```

### Workflow Service

```typescript
import { workflowService } from './services/workflow.service';

// Get workflow
const workflow = await workflowService.getWorkflowById('workflow-id');

// Update workflow
await workflowService.updateWorkflow('workflow-id', {
  name: 'Updated Name',
  status: 'active'
});

// Get execution history
const history = await workflowService.getExecutionHistory('workflow-id', {
  page: 1,
  limit: 10
});

// Export workflow
const blob = await workflowService.exportWorkflow('workflow-id');
// Download blob as JSON file
```

### Auth Service

```typescript
import { authService } from './services/auth.service';

// Login
const loginResponse = await authService.login({
  username: 'admin',
  password: 'password'
});

// Get current user
const currentUser = authService.getCurrentUser();

// Check if authenticated
const isAuth = authService.isAuthenticated();

// Change password
await authService.changePassword('oldPass', 'newPass');

// Forgot password
await authService.forgotPassword('user@example.com');
```

---

## 🎨 Update Components to Use Real API

### Example: Update UsersView.tsx

Replace mock data with real API:

```typescript
import { useUsers } from '../../hooks/useUsers';

export function UsersView() {
  const { 
    users, 
    isLoading, 
    pagination,
    createUser,
    updateUser,
    deleteUser,
    searchUsers 
  } = useUsers();

  // Remove mock data
  // const [users, setUsers] = useState(mockUsers); ❌

  // Use real data from hook ✅
  return (
    <div>
      {isLoading && <Spinner />}
      
      <Table>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
```

### Example: Update WorkflowView.tsx

```typescript
import { useWorkflows } from '../../hooks/useWorkflows';

export function WorkflowView() {
  const { 
    workflows, 
    isLoading,
    executeWorkflow,
    deleteWorkflow 
  } = useWorkflows();

  const handleExecute = async (id: string) => {
    await executeWorkflow(id);
  };

  return (
    <div>
      {workflows.map(workflow => (
        <Card key={workflow.id}>
          <h3>{workflow.name}</h3>
          <Button onClick={() => handleExecute(workflow.id)}>
            Chạy workflow
          </Button>
        </Card>
      ))}
    </div>
  );
}
```

---

## 🔄 Advanced Usage

### Custom Hook with Filters

```typescript
function useFilteredUsers(roleId?: string) {
  const { users, fetchUsers, ...rest } = useUsers();
  
  useEffect(() => {
    if (roleId) {
      fetchUsers({ roleId });
    }
  }, [roleId]);
  
  return { users, ...rest };
}
```

### Polling for Updates

```typescript
function useWorkflowStatus(workflowId: string) {
  const [status, setStatus] = useState<WorkflowExecutionStatus | null>(null);
  
  useEffect(() => {
    const interval = setInterval(async () => {
      const newStatus = await workflowService.getExecutionStatus(workflowId);
      setStatus(newStatus);
      
      if (newStatus.status === 'completed' || newStatus.status === 'failed') {
        clearInterval(interval);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [workflowId]);
  
  return status;
}
```

---

## 🛠️ Error Handling

All errors are automatically handled:

- **401 Unauthorized**: Auto-logout and redirect to login
- **403 Forbidden**: Permission error toast
- **404 Not Found**: Not found error
- **500 Server Error**: Server error toast

Custom error handling:

```typescript
try {
  await createUser(userData);
} catch (error: any) {
  if (error.response?.status === 400) {
    console.error('Validation error:', error.response.data);
  }
}
```

---

## 🎯 Best Practices

1. **Use Hooks**: Always prefer hooks over direct service calls in components
2. **Error Handling**: Let interceptors handle common errors, only catch specific cases
3. **Loading States**: Use `isLoading` from hooks for better UX
4. **Pagination**: Always implement pagination for large lists
5. **Search**: Debounce search inputs to reduce API calls
6. **Cache**: Consider using React Query or SWR for advanced caching

---

## 📝 Next Steps

1. Replace all mock data in components with real API calls
2. Add error boundaries for better error handling
3. Implement loading skeletons
4. Add optimistic updates for better UX
5. Setup React Query for advanced data fetching (optional)

---

## 🔗 API Documentation

Full API documentation available at:
**http://194.163.40.189:5080/swagger**

---

## ✅ Testing API Integration

Test the integration:

```typescript
// In browser console
import { authService } from './services/auth.service';

// Test login
authService.login({ username: 'admin', password: 'password' })
  .then(res => console.log('Login success:', res))
  .catch(err => console.error('Login failed:', err));
```

---

**API Integration Complete! 🎉**

You now have a complete, type-safe API integration ready to use throughout your application!
