# ⚡ API Integration - Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (30 seconds)

```bash
npm install axios
```

### Step 2: Test API Connection (1 minute)

Open browser console and test:

```javascript
// Import in your component
import { authService } from './services/auth.service';

// Test login
authService.login({ 
  username: 'admin', 
  password: 'your-password' 
}).then(res => {
  console.log('✅ Login successful!', res);
}).catch(err => {
  console.error('❌ Login failed:', err);
});
```

### Step 3: Use in Component (3 minutes)

Replace this:
```typescript
// ❌ Old way with mock data
const [users, setUsers] = useState(mockUsers);
```

With this:
```typescript
// ✅ New way with real API
import { useUsers } from '../../hooks/useUsers';

const { users, isLoading } = useUsers();
```

Done! 🎉

---

## 📝 Common Usage Patterns

### Pattern 1: Fetch & Display Data

```typescript
import { useUsers } from './hooks/useUsers';

function UsersPage() {
  const { users, isLoading } = useUsers();
  
  if (isLoading) return <Spinner />;
  
  return users.map(user => <UserCard user={user} />);
}
```

### Pattern 2: Create Data

```typescript
const { createUser } = useUsers();

const handleCreate = async () => {
  await createUser({
    username: 'newuser',
    email: 'user@example.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    roleId: 'role-id'
  });
  // Auto-refreshes list ✅
  // Shows success toast ✅
};
```

### Pattern 3: Update Data

```typescript
const { updateUser } = useUsers();

await updateUser(userId, {
  firstName: 'Updated Name',
  isActive: true
});
```

### Pattern 4: Delete Data

```typescript
const { deleteUser } = useUsers();

await deleteUser(userId);
// Auto-removes from list ✅
// Shows success toast ✅
```

### Pattern 5: Search

```typescript
const { searchUsers } = useUsers();

await searchUsers('john');
```

### Pattern 6: Pagination

```typescript
const { users, pagination, fetchUsers } = useUsers();

// Next page
fetchUsers({ page: pagination.page + 1 });

// Previous page  
fetchUsers({ page: pagination.page - 1 });
```

---

## 🎯 Component Migration Checklist

For each component:

- [ ] Import hook instead of mock data
- [ ] Remove `useState` for data
- [ ] Use hook's `isLoading` state
- [ ] Replace create/update/delete functions
- [ ] Test CRUD operations
- [ ] Verify pagination works
- [ ] Test error scenarios

---

## 📚 Quick Reference

### Available Hooks

| Hook | Purpose | Import |
|------|---------|--------|
| `useAuth()` | Login/Logout/Profile | `./hooks/useAuth` |
| `useUsers()` | User management | `./hooks/useUsers` |
| `useWorkflows()` | Workflow operations | `./hooks/useWorkflows` |

### Available Services

| Service | Purpose | Import |
|---------|---------|--------|
| `authService` | Auth operations | `./services/auth.service` |
| `userService` | User CRUD | `./services/user.service` |
| `workflowService` | Workflow CRUD | `./services/workflow.service` |
| `dashboardService` | Dashboard stats | `./services/dashboard.service` |
| `settingsService` | Settings management | `./services/settings.service` |

---

## 🔧 Configuration

### Change API URL

Edit `/lib/api/client.ts`:

```typescript
export const API_BASE_URL = 'http://your-api-url.com';
```

### Change Timeout

```typescript
const apiClient = axios.create({
  timeout: 30000, // 30 seconds
});
```

---

## ⚠️ Common Issues

### Issue: 401 Unauthorized
**Solution**: Token expired. User will auto-logout and redirect to login.

### Issue: Network Error
**Solution**: Check API URL and ensure server is running.

### Issue: CORS Error
**Solution**: Configure CORS on backend server.

### Issue: Request Timeout
**Solution**: Increase timeout in client.ts or optimize backend.

---

## 💡 Pro Tips

1. **Always use hooks** in components for better state management
2. **Use services directly** only for one-off operations
3. **Implement loading states** for better UX
4. **Add error boundaries** for better error handling
5. **Debounce search inputs** to reduce API calls

---

## 📖 Full Documentation

- **Complete Guide**: `/API_INTEGRATION_GUIDE.md`
- **Summary**: `/API_INTEGRATION_SUMMARY.md`
- **Examples**: `/EXAMPLE_API_USAGE.tsx`
- **Swagger Docs**: http://194.163.40.189:5080/swagger

---

## ✅ Next Steps

1. Update `UsersView.tsx` first (easiest)
2. Then `WorkflowView.tsx`
3. Then `DashboardView.tsx`
4. Test each component thoroughly
5. Deploy! 🚀

---

**You're ready to go! Happy coding! 🎉**
