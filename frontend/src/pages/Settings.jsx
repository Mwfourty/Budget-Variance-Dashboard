import { useAuth } from '../context/AuthContext.jsx';
import ModeSwitch from '../components/ui/ModeSwitch.jsx';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8 font-display text-2xl font-semibold text-graphite-900 dark:text-white">Settings</h1>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-graphite-500 dark:text-graphite-400">
          Appearance
        </h2>
        <div className="flex items-center justify-between gap-5 rounded-2xl border border-graphite-200/70 bg-graphite-100/70 px-5 py-5 dark:border-graphite-700 dark:bg-oled-panel/90 sm:px-6">
          <div className="min-w-0">
            <p className="font-medium text-graphite-800 dark:text-white">Dark mode</p>
            <p className="mt-1 text-sm text-graphite-600 dark:text-graphite-300">
              Switch between light mode and a deep OLED-black dark theme.
            </p>
          </div>
          <ModeSwitch />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-graphite-500 dark:text-graphite-400">
          Account
        </h2>
        <div className="flex flex-col gap-4 rounded-2xl border border-graphite-200/70 bg-graphite-100/70 px-5 py-5 dark:border-graphite-700 dark:bg-oled-panel/90 sm:px-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-graphite-600 dark:text-graphite-300">Name</span>
            <span className="max-w-[60%] truncate text-right font-medium text-graphite-800 dark:text-white">{user?.name || '—'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-graphite-600 dark:text-graphite-300">Email</span>
            <span className="max-w-[60%] truncate text-right font-medium text-graphite-800 dark:text-white">{user?.email || '—'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-graphite-600 dark:text-graphite-300">Role</span>
            <span className="font-medium text-graphite-800 dark:text-white">{user?.role || 'USER'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
