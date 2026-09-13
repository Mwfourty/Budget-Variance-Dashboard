import { Check, X } from 'lucide-react';
import StatusPill from '../ui/StatusPill.jsx';

export default function AdminSummaryPanel({ departments, isAdmin, onStatusChange, className = '' }) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {departments.map((dept) => (
        <div key={dept.id} className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-graphite-700 dark:text-graphite-200">{dept.name}</span>
          <div className="flex items-center gap-2">
            <StatusPill status={dept.status} />
            {isAdmin && String(dept.status).toLowerCase() === 'pending' && (
              <>
                <button
                  type="button"
                  onClick={() => onStatusChange(dept.id, 'approved')}
                  aria-label={`Approve ${dept.name}`}
                  title="Approve log"
                  className="rounded-full p-1.5 text-graphite-400 hover:bg-positive/10 hover:text-positive"
                >
                  <Check className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange(dept.id, 'rejected')}
                  aria-label={`Reject ${dept.name}`}
                  title="Reject log"
                  className="rounded-full p-1.5 text-graphite-400 hover:bg-negative/10 hover:text-negative"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
