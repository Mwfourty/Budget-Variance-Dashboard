import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User, MessageSquare, LayoutGrid, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import axiosClient from '../../api/axiosClient.js';

const NAV_ITEMS = [
  { to: '/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { to: '/settings', icon: Settings, label: 'Settings' }
];

export default function Sidebar() {
  const { user, isAdmin, logout } = useAuth();
  const [hasMessageNotification, setHasMessageNotification] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchMessageNotification() {
      if (!user?.email) return;

      try {
        const { data } = await axiosClient.get('/messages', {
          params: { username: user.email, admin: isAdmin }
        });
        const hasNotification = isAdmin
          ? data.some((message) => message.status === 'open')
          : data.some((message) => message.status !== 'open');
        if (!cancelled) setHasMessageNotification(hasNotification);
      } catch {
        if (!cancelled) setHasMessageNotification(false);
      }
    }

    fetchMessageNotification();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, user?.email]);

  return (
    <aside
        className="fixed bottom-4 left-1/2 z-30 flex h-14 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2
             translate-y-0 flex-row items-center justify-between rounded-2xl bg-graphite-800/95 px-3 py-2
             shadow-lg shadow-graphite-900/10 backdrop-blur-sm dark-surface
             md:bottom-auto md:left-6 md:top-1/2 md:h-[520px] md:w-12 md:-translate-x-0 md:-translate-y-1/2
             md:flex-col md:px-0 md:py-5 lg:left-14 lg:h-[800px] lg:w-16"
    >
      <NavLink
        to="/profile"
        aria-label="Profile"
        className={({ isActive }) =>
          `group relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-150 ${
            isActive ? 'bg-ember-500 text-white' : 'text-graphite-300 hover:bg-white/10 hover:text-white'
          }`
        }
      >
        <User className="h-5 w-5" strokeWidth={1.75} />
      </NavLink>

      <nav className="flex flex-row items-center gap-2 md:flex-col md:gap-5">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            className={({ isActive }) =>
              `group relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-150 ${
                isActive
                  ? 'bg-ember-500 text-white'
                  : 'text-graphite-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
            {to === '/messages' && hasMessageNotification && (
              <span
                aria-label="Unread messages"
                className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-negative ring-2 ring-graphite-800"
              />
            )}
            <span
              className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-graphite-900
                         px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150
                         group-hover:opacity-100 dark:bg-graphite-800"
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={logout}
        aria-label="Log out"
        className="group relative flex h-9 w-9 items-center justify-center rounded-full
                   text-graphite-300 transition-colors duration-150 hover:bg-negative/20 hover:text-negative"
      >
        <LogOut className="h-5 w-5" strokeWidth={1.75} />
        <span
          className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-graphite-900
                     px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150
                     group-hover:opacity-100 dark:bg-graphite-800"
        >
          Log out
        </span>
      </button>
    </aside>
  );
}
