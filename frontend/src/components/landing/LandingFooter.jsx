import { LineChart } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="border-t border-graphite-200 py-10 dark:border-oled-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-2 font-display text-base font-semibold text-graphite-900 dark:text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ember-500 text-white">
            <LineChart className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          Ledger
        </div>
        <div className="flex gap-6 text-sm text-graphite-400 dark:text-graphite-500">
          <a href="#features" className="hover:text-graphite-700 dark:hover:text-graphite-200">Features</a>
          <a href="#how-it-works" className="hover:text-graphite-700 dark:hover:text-graphite-200">How it works</a>
        </div>
        <span className="text-xs text-graphite-400 dark:text-graphite-500">© 2026 Ledger. Built for finance teams.</span>
      </div>
    </footer>
  );
}
