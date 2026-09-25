import { Link } from 'react-router-dom';
import DashboardMock from './DashboardMock.jsx';

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-24">
      <span
        className="mb-5 inline-flex items-center gap-2 rounded-full bg-ember-soft px-3.5 py-1.5 text-xs
                   font-semibold uppercase tracking-widest text-ember-600 dark:bg-ember-soft-dark dark:text-ember-300"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
        Built for finance teams at tech companies
      </span>

      <h1 className="max-w-2xl font-display text-[42px] font-semibold leading-[1.05] text-graphite-900 dark:text-white sm:text-6xl">
        Budget variance,
        <br />
        <span className="text-ember-500">cleared up.</span>
      </h1>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-graphite-500 dark:text-graphite-400">
        Ledger brings allocated vs. actual spend, utilization, and department approvals
        into one floating, focus-first dashboard — so finance teams stop reconciling
        spreadsheets and start making calls.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link
          to="/register"
          className="rounded-full bg-ember-500 px-6 py-3 text-sm font-medium text-white shadow-ember hover:bg-ember-600"
        >
          Get started free
        </Link>
        <a
          href="#features"
          className="rounded-full border border-graphite-200 px-6 py-3 text-sm font-medium text-graphite-700
                     hover:bg-graphite-100 dark:border-graphite-700 dark:text-graphite-200 dark:hover:bg-graphite-800"
        >
          See how it works
        </a>
      </div>

      <div className="mt-7 flex items-center gap-3 text-sm text-graphite-400 dark:text-graphite-500">
        <span className="flex -space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-6 w-6 rounded-full border-2 border-white bg-graphite-200 dark:border-black dark:bg-graphite-700" />
          ))}
        </span>
        Trusted by finance and ops teams tracking budgets across every department
      </div>

      <DashboardMock />
    </section>
  );
}
