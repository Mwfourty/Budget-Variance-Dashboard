import { Check } from 'lucide-react';
import StatusPill from '../ui/StatusPill.jsx';

const POINTS = [
  'Four clear states: Draft, Pending, Approved, Rejected',
  'Isolated admin sign-in for approval-level access',
  "One place to see every department's budget, together"
];

const DEMO_DEPARTMENTS = [
  { name: 'IT Budget', status: 'approved' },
  { name: 'HR Budget', status: 'pending' },
  { name: 'Marketing Budget', status: 'draft' },
  { name: 'Operations Budget', status: 'rejected' }
];

export default function ApprovalsShowcase() {
  return (
    <section id="departments" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-ember-soft px-3.5 py-1.5 text-xs
                       font-semibold uppercase tracking-widest text-ember-600 dark:bg-ember-soft-dark dark:text-ember-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            Approvals, made visible
          </span>
          <h2 className="mb-4 font-display text-3xl font-semibold leading-tight text-graphite-900 dark:text-white sm:text-4xl">
            Every department&rsquo;s status, at a glance
          </h2>
          <p className="mb-6 text-base leading-relaxed text-graphite-500 dark:text-graphite-400">
            Stop asking &ldquo;did IT&rsquo;s budget get approved yet?&rdquo; in three different channels.
            Status pills make it obvious the moment you open the dashboard.
          </p>
          <ul className="flex flex-col gap-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-graphite-700 dark:text-graphite-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" strokeWidth={2} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1 rounded-2xl border border-graphite-200 bg-white p-6 dark:border-oled-border dark:bg-oled-raised">
          {DEMO_DEPARTMENTS.map((dept, i) => (
            <div
              key={dept.name}
              className={`flex items-center justify-between py-3.5 ${
                i > 0 ? 'border-t border-graphite-200 dark:border-oled-border' : ''
              }`}
            >
              <span className="text-sm font-medium text-graphite-700 dark:text-graphite-200">{dept.name}</span>
              <StatusPill status={dept.status} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
