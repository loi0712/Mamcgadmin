/**
 * EXAMPLE: API Integration Usage
 * 
 * This file demonstrates how to integrate the API hooks and services
 * in your components.
 */

import { useEffect, useState } from 'react';
import { useDatabase } from '../../hooks/useDatabase';
import { useStorage } from '../../hooks/useStorage';
import { useUsers } from '../../hooks/useUsers';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from 'sonner';

// ============================================================================
// EXAMPLE 1: Database Integration
// ============================================================================

export function DatabaseExample() {
  const {
    connections,
    loading,
    error,
    fetchConnections,
    createConnection,
    updateConnection,
    deleteConnection,
    testConnection
  } = useDatabase();

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const handleCreateDatabase = async () => {
    const newConnection = {
      name: 'Production DB',
      type: 'postgresql' as const,
      host: 'localhost',
      port: 5432,
      database: 'mamcg_prod',
      username: 'admin',
      password: 'password'
    };

    const result = await createConnection(newConnection);
    
    if (result) {
      toast.success('Database connection created!');
    }
  };

  const handleTestConnection = async (id: string) => {
    const result = await testConnection(id);
    
    if (result) {
      toast.success('Connection successful!');
    } else {
      toast.error('Connection failed!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <Button onClick={handleCreateDatabase}>
        Create Database
      </Button>

      {connections.map(conn => (
        <Card key={conn.id} className="p-4">
          <h3>{conn.name}</h3>
          <p>Type: {conn.type}</p>
          <p>Host: {conn.host}</p>
          <Button onClick={() => handleTestConnection(conn.id)}>
            Test Connection
          </Button>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Storage Integration
// ============================================================================

export function StorageExample() {
  const {
    storageLocations,
    loading,
    fetchStorageLocations,
    createStorageLocation,
    deleteStorageLocation
  } = useStorage();

  useEffect(() => {
    fetchStorageLocations();
  }, [fetchStorageLocations]);

  const handleCreateStorage = async () => {
    const newStorage = {
      name: 'Archive Storage',
      type: 'network' as const,
      path: '/mnt/archive',
      capacity: 10000000000000, // 10TB
      description: 'Long-term archive storage'
    };

    const result = await createStorageLocation(newStorage);
    
    if (result) {
      toast.success('Storage location created!');
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleCreateStorage}>
        Add Storage Location
      </Button>

      {storageLocations.map(storage => (
        <Card key={storage.id} className="p-4">
          <h3>{storage.name}</h3>
          <p>Type: {storage.type}</p>
          <p>Path: {storage.path}</p>
          <p>Used: {((storage.used / storage.capacity) * 100).toFixed(1)}%</p>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: User Management Integration
// ============================================================================

export function UserManagementExample() {
  const {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    syncWithLDAP
  } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async () => {
    const newUser = {
      username: 'john.doe',
      email: 'john.doe@mamcg.vn',
      fullName: 'John Doe',
      role: 'editor' as const,
      isActive: true
    };

    const result = await createUser(newUser);
    
    if (result) {
      toast.success('User created successfully!');
    }
  };

  const handleSyncLDAP = async () => {
    const result = await syncWithLDAP();
    
    if (result) {
      toast.success(`Synced ${result.added} new users, updated ${result.updated} users`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={handleCreateUser}>
          Create User
        </Button>
        <Button onClick={handleSyncLDAP} variant="outline">
          Sync with LDAP
        </Button>
      </div>

      {users.map(user => (
        <Card key={user.id} className="p-4">
          <h3>{user.fullName}</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <span className={user.isActive ? 'text-green-500' : 'text-red-500'}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Error Handling
// ============================================================================

export function ErrorHandlingExample() {
  const { connections, loading, error, fetchConnections } = useDatabase();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    toast.info('Retrying...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-500">
        <h3 className="text-red-400 mb-2">Error Loading Data</h3>
        <p className="text-gray-400 mb-4">{error}</p>
        <Button onClick={handleRetry} variant="outline">
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {connections.map(conn => (
        <Card key={conn.id} className="p-4">
          <h3>{conn.name}</h3>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: Optimistic Updates
// ============================================================================

export function OptimisticUpdateExample() {
  const { users, updateUser } = useUsers();
  const [localUsers, setLocalUsers] = useState(users);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleToggleActive = async (userId: string) => {
    // Optimistic update - update UI immediately
    setLocalUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));

    // Update on server
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const result = await updateUser(userId, {
      ...user,
      isActive: !user.isActive
    });

    // Revert if failed
    if (!result) {
      setLocalUsers(users);
      toast.error('Failed to update user');
    } else {
      toast.success('User updated');
    }
  };

  return (
    <div className="space-y-4">
      {localUsers.map(user => (
        <Card key={user.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3>{user.fullName}</h3>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <Button 
              onClick={() => handleToggleActive(user.id)}
              variant={user.isActive ? 'default' : 'outline'}
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Pagination
// ============================================================================

export function PaginationExample() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { users, loading, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers({ page, limit });
  }, [fetchUsers, page, limit]);

  return (
    <div className="space-y-4">
      {users.map(user => (
        <Card key={user.id} className="p-4">
          <h3>{user.fullName}</h3>
        </Card>
      ))}

      <div className="flex gap-2 justify-center">
        <Button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </Button>
        <span className="px-4 py-2">Page {page}</span>
        <Button 
          onClick={() => setPage(p => p + 1)}
          disabled={loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Search/Filter
// ============================================================================

export function SearchFilterExample() {
  const { users, loading, fetchUsers } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers({ 
        search: searchTerm,
        role: roleFilter !== 'all' ? roleFilter : undefined
      });
    }, 500); // Debounce

    return () => clearTimeout(timer);
  }, [fetchUsers, searchTerm, roleFilter]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-admin-input border border-admin rounded px-4 py-2"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-admin-input border border-admin rounded px-4 py-2"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        filteredUsers.map(user => (
          <Card key={user.id} className="p-4">
            <h3>{user.fullName}</h3>
            <p>{user.email}</p>
            <span className="text-sm text-gray-400">{user.role}</span>
          </Card>
        ))
      )}
    </div>
  );
}
