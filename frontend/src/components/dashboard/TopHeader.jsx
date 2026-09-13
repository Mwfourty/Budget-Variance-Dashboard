import logo from '../../assets/OC logo.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PERIOD_OPTIONS = [
  { value: 'month', label: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date()) },
  { value: 'year', label: String(new Date().getFullYear()) }
];
const QUARTER_OPTIONS = ['Q1', 'Q2', 'Q3', 'Q4'];

function PillToggle({ options, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
            value === opt.value
              ? 'bg-ember-500 text-white'
              : 'bg-graphite-100 text-graphite-600 hover:bg-graphite-200 dark:bg-graphite-800 dark:text-graphite-300 dark:hover:bg-graphite-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function MobileQuarterSelector({ quarter, onQuarterChange }) {
  const quarterIndex = QUARTER_OPTIONS.indexOf(quarter);
  const previousQuarter = QUARTER_OPTIONS[(quarterIndex - 1 + QUARTER_OPTIONS.length) % QUARTER_OPTIONS.length];
  const nextQuarter = QUARTER_OPTIONS[(quarterIndex + 1) % QUARTER_OPTIONS.length];

  return (
    <div className="flex h-14 w-full overflow-hidden rounded-full bg-graphite-100 dark:bg-graphite-800 md:hidden">
      <button
        type="button"
        onClick={() => onQuarterChange(previousQuarter)}
        aria-label={`Go to ${previousQuarter}`}
        className="flex w-20 shrink-0 items-center justify-center text-graphite-700 transition-colors hover:bg-graphite-200 dark:text-graphite-200 dark:hover:bg-graphite-700"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>
      <span className="flex min-w-0 flex-1 items-center justify-center border-x border-white/70 bg-white/80 text-sm font-semibold text-graphite-900 dark:border-black/20 dark:bg-oled-panel/80 dark:text-white">
        {quarter}
      </span>
      <button
        type="button"
        onClick={() => onQuarterChange(nextQuarter)}
        aria-label={`Go to ${nextQuarter}`}
        className="flex w-20 shrink-0 items-center justify-center text-graphite-700 transition-colors hover:bg-graphite-200 dark:text-graphite-200 dark:hover:bg-graphite-700"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>
    </div>
  );
}

export default function TopHeader({ period, onPeriodChange, quarter, onQuarterChange }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-6">
      <div>
        <img src={logo} alt="OneConnect" className="mb-3 block h-8 w-auto object-contain" />
        <PillToggle value={period} onChange={onPeriodChange} options={PERIOD_OPTIONS} />
      </div>

      <div className="hidden md:block">
        <PillToggle
          value={quarter}
          onChange={onQuarterChange}
          options={QUARTER_OPTIONS.map((value) => ({ value, label: value }))}
        />
      </div>
      <MobileQuarterSelector quarter={quarter} onQuarterChange={onQuarterChange} />
    </header>
  );
}
