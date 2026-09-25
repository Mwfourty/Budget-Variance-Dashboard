function formatSigned(value) {
  const sign = value >= 0 ? '+' : '−';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${sign}R${Math.round(abs / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${sign}R${Math.round(abs / 1_000_000)}M`;
  if (abs >= 1_000) return `${sign}R${Math.round(abs / 1_000)}K`;
  return `${sign}R${abs.toFixed(0)}`;
}

function formatPercentage(value) {
  return `${value >= 0 ? '+' : '−'}${Math.abs(value).toFixed(1)}%`;
}

export default function SummaryPanel({ totalVariance, budgetUtilization, totalDeviation }) {
  const isPositive = totalVariance >= 0;

  return (
    <section className="dark-surface rounded-2xl border border-transparent bg-graphite-100/80 p-5 dark:border-oled-border sm:p-6">
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-graphite-500 dark:text-graphite-400">
        Financial overview
      </p>
      <div className="grid grid-cols-1 divide-y divide-graphite-300/70 dark:divide-graphite-600/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="min-w-0 pb-4 sm:pb-0 sm:pr-4">
          <p className="text-xs font-medium text-graphite-500 dark:text-graphite-400">Total variance</p>
          <p
            className={`mt-2 whitespace-nowrap tabular font-display text-2xl font-semibold sm:text-2xl ${
              isPositive ? 'text-positive' : 'text-negative'
            }`}
          >
            {formatPercentage(totalVariance)}
          </p>
        </div>
        <div className="min-w-0 py-4 sm:px-3 sm:py-0">
          <p className="text-xs font-medium text-graphite-500 dark:text-graphite-400">Total deviation</p>
          <p className="mt-2 whitespace-nowrap tabular font-display text-2xl font-semibold text-graphite-900 sm:text-2xl dark:text-white">
            {formatSigned(totalDeviation)}
          </p>
        </div>
        <div className="min-w-0 pt-4 sm:pl-3 sm:pt-0">
          <p className="text-xs font-medium text-graphite-500 dark:text-graphite-400">Budget utilization</p>
          <p className="utilization-value mt-2 whitespace-nowrap tabular font-display text-2xl font-semibold text-graphite-900 sm:text-2xl dark:text-white">
            {budgetUtilization.toFixed(1)}%
          </p>
        </div>
      </div>
    </section>
  );
}
