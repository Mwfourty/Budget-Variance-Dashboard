import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import axiosClient from '../api/axiosClient.js';
import AdminUserPanel from '../components/dashboard/AdminUserPanel.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [userError, setUserError] = useState('');

  useEffect(() => {
    if (!isAdmin || !user?.email) return undefined;
    let cancelled = false;

    async function loadUsers() {
      try {
        const { data } = await axiosClient.get('/admin/users', {
          params: { requesterUsername: user.email }
        });
        if (!cancelled) setUsers(data);
      } catch (error) {
        if (!cancelled) setUserError(error.response?.data?.message || 'Could not load users.');
      }
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, user?.email]);

  const handleUserStatusChange = async (selectedUser) => {
    const nextActive = !selectedUser.active;
    const action = nextActive ? 'reactivate' : 'deactivate';
    if (!window.confirm(`Are you sure you want to ${action} ${selectedUser.name}?`)) return;
    setUserError('');
    try {
      const { data } = await axiosClient.patch(`/admin/users/${selectedUser.id}/status`, {
        requesterUsername: user.email,
        active: nextActive
      });
      setUsers((prev) => prev.map((item) => (item.id === data.id ? data : item)));
    } catch (error) {
      setUserError(error.response?.data?.message || 'Could not update user access.');
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8 font-display text-2xl font-semibold text-graphite-900 dark:text-white">Profile</h1>
      <div className="flex items-center gap-5 rounded-2xl bg-graphite-100/70 px-6 py-6 dark:bg-graphite-800/30">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ember-500/15 text-ember-500">
          <User className="h-7 w-7" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-graphite-900 dark:text-white">
            {user?.name || 'Finance user'}
          </p>
          <p className="text-sm text-graphite-500 dark:text-graphite-400">
            {user?.department || 'Finance department'} · {user?.role || 'USER'}
          </p>
        </div>
      </div>
      {isAdmin && (
        <div className="mt-8">
          <AdminUserPanel users={users} error={userError} onStatusChange={handleUserStatusChange} />
        </div>
      )}
    </div>
  );
}
