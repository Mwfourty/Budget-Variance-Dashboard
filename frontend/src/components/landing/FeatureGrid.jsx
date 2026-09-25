import { BarChart3, TrendingUp, CheckSquare, ShieldCheck, Moon, Plus } from 'lucide-react';
import SectionHead from './SectionHead.jsx';

const FEATURES = [
  {
    icon: BarChart3,
    title: 'One toggle, three chart types',
    description: 'Switch between bar, line, and pie views of the same period without leaving the page — pick whatever tells the story fastest.'
  },
  {
    icon: TrendingUp,
    title: 'Variance & utilization, always visible',
    description: 'A live read on total variance and budget utilization sits beside every chart — no separate report to pull.'
  },
  {
    icon: CheckSquare,
    title: 'Draft, Pending, Approved, Rejected',
    description: 'Every department budget carries a clear status, so approvals stop happening over email threads and Slack DMs.'
  },
  {
    icon: ShieldCheck,
    title: 'Role-based access',
    description: 'Standard department logins and an isolated administrator sign-in keep approval-level access separate from day-to-day entry.'
  },
  {
    icon: Moon,
    title: 'A dark mode built for late closes',
    description: 'A true OLED-black theme for the nights before quarter-end, or a clean light mode for everyday review.'
  },
  {
    icon: Plus,
    title: 'Log entries in seconds',
    description: 'One floating "+" adds a new department budget line — allocated, actual, and variance calculated as you type.'
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHead
        eyebrow="Everything on one screen"
        title="Built for how finance actually works"
        subtitle="No tabs to hunt through. Allocated vs. actual, variance, utilization, and approvals sit together — the way you'd want to see them before a budget review."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-graphite-200 bg-white p-6 transition-transform duration-150
                       hover:-translate-y-1 hover:border-ember-300 dark:border-oled-border dark:bg-oled-raised dark:hover:border-ember-700"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-ember-soft dark:bg-ember-soft-dark">
              <Icon className="h-5 w-5 text-ember-500" strokeWidth={1.75} />
            </div>
            <h3 className="mb-2 font-display text-base font-semibold text-graphite-900 dark:text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-graphite-500 dark:text-graphite-400">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

