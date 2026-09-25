import { Link } from 'react-router-dom';
import { LineChart } from 'lucide-react';
import ModeSwitch from '../ui/ModeSwitch.jsx';

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-graphite-200/70 bg-graphite-25/80 backdrop-blur-md dark:border-oled-border dark:bg-oled/80">

      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-graphite-900 dark:text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500 text-white">
            <LineChart className="h-4 w-4" strokeWidth={2} />
          </span>
          Ledger
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-graphite-500 dark:text-graphite-400 md:flex">
          <a href="#features" className="hover:text-graphite-900 dark:hover:text-white">Features</a>
          <a href="#how-it-works" className="hover:text-graphite-900 dark:hover:text-white">How it works</a>
          <a href="#departments" className="hover:text-graphite-900 dark:hover:text-white">For finance teams</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ModeSwitch />
          </div>
          <Link
            to="/login"
            className="rounded-full border border-graphite-200 px-4 py-2 text-sm font-medium text-graphite-700
                       hover:bg-graphite-100 dark:border-graphite-700 dark:text-graphite-200 dark:hover:bg-graphite-800"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-ember-500 px-4 py-2 text-sm font-medium text-white hover:bg-ember-600"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
