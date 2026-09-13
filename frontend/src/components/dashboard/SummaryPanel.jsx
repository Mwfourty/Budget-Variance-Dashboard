function formatSigned(value) {
  const sign = value >= 0 ? '+' : '−';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${sign}R${Math.round(abs / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${sign}R${Math.round(abs / 1_000_000)}M`;
  if (abs >= 1_000) return `${sign}R${Math.round(abs / 1_000)}K`;
  return `${sign}R${abs.toFixed(0)}`;
}

export default function SummaryPanel({ totalVariance, budgetUtilization }) {
  const isPositive = totalVariance >= 0;

  return (
    <section className="dark-surface rounded-2xl border border-transparent bg-graphite-100/80 p-5 dark:border-oled-border sm:p-6">
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-graphite-500 dark:text-graphite-400">
        Financial overview
      </p>
      <div className="grid grid-cols-2 divide-x divide-graphite-300/70 dark:divide-graphite-600/70">
        <div className="min-w-0 pr-4 sm:pr-8">
          <p className="text-xs font-medium text-graphite-500 dark:text-graphite-400">Total variance</p>
          <p
            className={`mt-2 truncate tabular font-display text-2xl font-semibold sm:text-3xl ${
              isPositive ? 'text-positive' : 'text-negative'
            }`}
          >
            {formatSigned(totalVariance)}
          </p>
        </div>
        <div className="min-w-0 pl-4 sm:pl-8">
          <p className="text-xs font-medium text-graphite-500 dark:text-graphite-400">Budget utilization</p>
          <p className="utilization-value mt-2 truncate tabular font-display text-2xl font-semibold text-graphite-900 sm:text-3xl dark:text-white">
            {budgetUtilization.toFixed(1)}%
          </p>
        </div>
      </div>
    </section>
  );
}
