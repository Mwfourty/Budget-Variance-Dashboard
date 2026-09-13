const STATUS_STYLES = {
  draft: 'bg-graphite-100 text-graphite-600 dark:bg-graphite-700 dark:text-graphite-100',
  pending: 'bg-pending/15 text-pending dark:bg-pending/20',
  approved: 'bg-positive/15 text-positive dark:bg-positive/20',
  rejected: 'bg-negative/15 text-negative dark:bg-negative/20'
};

const LABELS = {
  draft: 'Draft',
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected'
};

export default function StatusPill({ status }) {
  const key = String(status || '').toLowerCase();
  const style = STATUS_STYLES[key] || STATUS_STYLES.draft;
  const label = LABELS[key] || status;

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}
