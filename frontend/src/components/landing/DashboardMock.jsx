import { useRef } from 'react';
import { User, MessageSquare, LayoutGrid, Settings } from 'lucide-react';
import StatusPill from '../ui/StatusPill.jsx';

const CHART_BARS = [
  { allocated: 38, actual: 52 },
  { allocated: 64, actual: 46 },
  { allocated: 78, actual: 88 },
  { allocated: 58, actual: 70 }
];

const TABLE_ROWS = [
  { dept: 'IT', allocated: 'R1 500 000', actual: 'R1 200 000', variance: '+R300 000', positive: true },
  { dept: 'HR', allocated: 'R500 000', actual: 'R550 000', variance: '−R50 000', positive: false },
  { dept: 'Marketing', allocated: 'R800 000', actual: 'R100 000', variance: '+R700 000', positive: true }
];

export default function DashboardMock() {
  const stageRef = useRef(null);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!stageRef.current || !cardRef.current || window.matchMedia('(hover: none)').matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `rotateX(${4 - y * 6}deg) rotateY(${x * 8}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mt-16"
      style={{ perspective: '1600px' }}
    >
      <div
        ref={cardRef}
        className="animate-floaty overflow-hidden rounded-[20px] border border-graphite-200 bg-white
                   shadow-[0_40px_80px_-30px_rgba(31,31,30,0.25)] transition-transform duration-200 ease-out
                   dark:border-oled-border dark:bg-oled-raised dark:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
        style={{ transform: 'rotateX(4deg)' }}
      >
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-graphite-200 px-5 py-3.5 dark:border-oled-border">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-200 dark:bg-graphite-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-200 dark:bg-graphite-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-200 dark:bg-graphite-700" />
          </div>
          <span className="font-display text-xs text-graphite-400 dark:text-graphite-500">Ledger · Dashboard</span>
          <span className="w-16" />
        </div>

        <div className="flex">
          {/* mini sidebar */}
          <div className="flex w-14 shrink-0 flex-col items-center gap-3.5 bg-graphite-800 py-4.5 dark:bg-oled">
            <IconDot icon={User} />
            <IconDot icon={MessageSquare} />
            <IconDot icon={LayoutGrid} active />
            <IconDot icon={Settings} />
          </div>

          <div className="min-w-0 flex-1 px-6 py-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-1.5">
                <Pill active>Month</Pill>
                <Pill>Year</Pill>
              </div>
              <div className="flex gap-1.5">
                <Pill>Q1</Pill>
                <Pill>Q2</Pill>
                <Pill active>Q3</Pill>
                <Pill>Q4</Pill>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.3fr_1fr]">
              <div className="flex h-[168px] items-end gap-2.5 rounded-2xl bg-graphite-100 p-4 dark:bg-graphite-800/40">
                {CHART_BARS.map((bar, i) => (
                  <div key={i} className="flex flex-1 items-end gap-1">
                    <span
                      className="flex-1 rounded-t bg-graphite-300 dark:bg-graphite-600"
                      style={{ height: `${bar.allocated}%` }}
                    />
                    <span className="flex-1 rounded-t bg-ember-500" style={{ height: `${bar.actual}%` }} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="rounded-2xl bg-graphite-100 px-4 py-3 dark:bg-graphite-800/40">
                  <p className="text-[10px] uppercase tracking-wide text-graphite-400">Total variance</p>
                  <p className="tabular font-display text-xl font-semibold text-positive">+R0.9M</p>
                </div>
                <div className="flex flex-col gap-2 rounded-2xl bg-graphite-100 px-4 py-3 dark:bg-graphite-800/40">
                  <StatusRow name="IT" status="approved" />
                  <StatusRow name="HR" status="approved" />
                  <StatusRow name="Marketing" status="draft" />
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-graphite-200 pt-3 dark:border-oled-border">
              <div className="grid grid-cols-4 gap-2 pb-1.5 text-[10px] uppercase tracking-wide text-graphite-400">
                <span>Department</span>
                <span>Allocated</span>
                <span>Actual</span>
                <span>Variance</span>
              </div>
              {TABLE_ROWS.map((row) => (
                <div key={row.dept} className="tabular grid grid-cols-4 gap-2 py-1.5 text-xs text-graphite-600 dark:text-graphite-300">
                  <span className="text-graphite-800 dark:text-graphite-100">{row.dept}</span>
                  <span>{row.allocated}</span>
                  <span>{row.actual}</span>
                  <span className={row.positive ? 'font-medium text-positive' : 'font-medium text-negative'}>
                    {row.variance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconDot({ icon: Icon, active }) {
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full ${
        active ? 'bg-ember-500' : ''
      }`}
    >
      <Icon className={`h-3.5 w-3.5 ${active ? 'text-white' : 'text-graphite-400'}`} strokeWidth={1.75} />
    </span>
  );
}

function Pill({ active, children }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
        active ? 'bg-ember-500 text-white' : 'bg-graphite-100 text-graphite-500 dark:bg-graphite-800 dark:text-graphite-400'
      }`}
    >
      {children}
    </span>
  );
}

function StatusRow({ name, status }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-graphite-600 dark:text-graphite-300">{name}</span>
      <StatusPill status={status} />
    </div>
  );
}
