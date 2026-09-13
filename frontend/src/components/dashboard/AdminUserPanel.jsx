import { UserCheck, UserX } from 'lucide-react';

export default function AdminUserPanel({ users, error, onStatusChange }) {
  return (
    <section className="rounded-2xl border border-graphite-200 bg-white/70 p-5 dark:border-graphite-700 dark:bg-oled-panel/70">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-ember-600 dark:text-ember-400">Access control</p>
        <h2 className="mt-1 font-display text-lg font-semibold text-graphite-900 dark:text-white">Department users</h2>
      </div>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-graphite-700 dark:text-graphite-200">{user.name}</p>
              <p className="truncate text-xs text-graphite-400">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={() => onStatusChange(user)}
              aria-label={`${user.active ? 'Deactivate' : 'Reactivate'} ${user.name}`}
              title={user.active ? 'Deactivate user' : 'Reactivate user'}
              className={`shrink-0 rounded-full p-1.5 transition-colors ${
                user.active
                  ? 'text-graphite-400 hover:bg-negative/10 hover:text-negative'
                  : 'text-positive hover:bg-positive/10'
              }`}
            >
              {user.active ? <UserX className="h-4 w-4" strokeWidth={1.75} /> : <UserCheck className="h-4 w-4" strokeWidth={1.75} />}
            </button>
          </div>
        ))}
        {users.length === 0 && <p className="text-sm text-graphite-400">No users found.</p>}
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-negative">{error}</p>}
    </section>
  );
}