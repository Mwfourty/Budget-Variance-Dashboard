import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ModeSwitch() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-[68px] items-center rounded-full bg-graphite-200 transition-colors duration-200 dark:bg-graphite-800"
    >
      <span className="sr-only">Toggle dark mode</span>
      <Sun className="absolute left-2 h-4 w-4 text-graphite-500" strokeWidth={1.75} />
      <Moon className="absolute right-2 h-4 w-4 text-graphite-400" strokeWidth={1.75} />
      <span
        className={`z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 dark:bg-black ${
          isDark ? 'translate-x-[34px]' : 'translate-x-1'
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-ember-500" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-ember-500" strokeWidth={2} />
        )}
      </span>
    </button>
  );
}
