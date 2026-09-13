import { Ellipsis, Pencil, Plus, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';

function formatCurrency(value) {
  return `R${Math.abs(value).toLocaleString('en-ZA')}`;
}

export default function FinancialTable({ rows, onDelete, onEdit, onSubmit, onAdd }) {
  const [openActions, setOpenActions] = useState(null);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span
          className="inline-block rounded-full bg-ember-100 px-3 py-1 text-xs font-medium text-ember-700
                     dark:bg-ember-500/15 dark:text-ember-300"
        >
          Allocated / Actual
        </span>
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add budget entry"
          title="Add budget entry"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ember-500 text-white
                     shadow-md shadow-ember-500/25 transition-transform duration-150 hover:scale-105 hover:bg-ember-600 active:scale-95"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <div className={rows.length >= 5 ? 'md:max-h-[360px] md:overflow-auto' : ''}>
        <div className="flex flex-col gap-3 md:hidden">
          {rows.map((row) => {
            const isOverBudget = row.variance < 0;
            const isDraft = String(row.status || '').toLowerCase() === 'draft';
            const isActionsOpen = openActions === row.id;

            return (
              <article key={row.id} className="rounded-xl border border-graphite-200/80 bg-white/55 p-4 dark:border-graphite-600 dark:bg-oled-panel/90">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-graphite-800 dark:text-graphite-100">{row.department}</h3>
                    <p className="mt-1 text-xs text-graphite-500 dark:text-graphite-300">{row.status || 'Draft'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenActions(isActionsOpen ? null : row.id)}
                    aria-label={`Actions for ${row.department}`}
                    aria-expanded={isActionsOpen}
                    title="Entry actions"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-graphite-500 transition-colors hover:bg-graphite-200 hover:text-graphite-800 dark:hover:bg-graphite-700 dark:hover:text-white"
                  >
                    <Ellipsis className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-graphite-500 dark:text-graphite-300">Allocated</dt>
                    <dd className="tabular mt-1 text-graphite-700 dark:text-graphite-200">{formatCurrency(row.allocated)}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-graphite-500 dark:text-graphite-300">Actual</dt>
                    <dd className="tabular mt-1 text-graphite-700 dark:text-graphite-200">{formatCurrency(row.actual)}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-graphite-500 dark:text-graphite-300">Variance</dt>
                    <dd className={`tabular mt-1 font-medium ${isOverBudget ? 'text-negative' : 'text-positive'}`}>
                      {isOverBudget ? '−' : '+'}{formatCurrency(row.variance)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-graphite-500 dark:text-graphite-300">Utilization</dt>
                    <dd className="tabular mt-1 text-graphite-700 dark:text-graphite-200">{row.utilization.toFixed(1)}%</dd>
                  </div>
                </dl>
                {isActionsOpen && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-graphite-200/70 pt-3 dark:border-graphite-700">
                    {isDraft && (
                      <>
                        <button type="button" onClick={() => { setOpenActions(null); onEdit(row); }} className="inline-flex items-center gap-2 rounded-full bg-graphite-100 px-3 py-2 text-xs font-medium text-graphite-700 hover:bg-ember-100 hover:text-ember-700 dark:bg-graphite-800 dark:text-graphite-100 dark:hover:bg-ember-500/15 dark:hover:text-ember-300">
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} /> Edit
                        </button>
                        <button type="button" onClick={() => { setOpenActions(null); onSubmit(row.id); }} className="inline-flex items-center gap-2 rounded-full bg-graphite-100 px-3 py-2 text-xs font-medium text-graphite-700 hover:bg-positive/10 hover:text-positive dark:bg-graphite-800 dark:text-graphite-100">
                          <Send className="h-3.5 w-3.5" strokeWidth={1.75} /> Submit
                        </button>
                      </>
                    )}
                    <button type="button" onClick={() => { setOpenActions(null); onDelete(row.id); }} className="inline-flex items-center gap-2 rounded-full bg-graphite-100 px-3 py-2 text-xs font-medium text-graphite-700 hover:bg-negative/10 hover:text-negative dark:bg-graphite-800 dark:text-graphite-100">
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} /> Remove
                    </button>
                  </div>
                )}
              </article>
            );
          })}
          {rows.length === 0 && <p className="py-8 text-center text-sm text-graphite-400">No budget entries yet. Use the + button to add one.</p>}
        </div>

        <table className="hidden w-full border-collapse text-left md:table">
          <thead>
          <tr className="hairline sticky top-0 z-10 border-b text-xs uppercase tracking-wide text-graphite-500 dark:bg-oled-panel dark:text-graphite-400">
            <th className="pb-3 pr-4 font-medium">Department</th>
            <th className="pb-3 pr-4 font-medium">Allocated</th>
            <th className="pb-3 pr-4 font-medium">Actual</th>
            <th className="pb-3 pr-4 font-medium">Variance</th>
            <th className="pb-3 pr-4 font-medium">Utilization</th>
            <th className="pb-3 pl-4 font-medium" aria-hidden="true" />
          </tr>
          </thead>
          <tbody>
          {rows.map((row) => {
            const isOverBudget = row.variance < 0;
            return (
              <tr key={row.id} className="hairline border-b text-sm">
                <td className="py-4 pr-4 font-medium text-graphite-800 dark:text-graphite-100">
                  {row.department}
                </td>
                <td className="tabular py-4 pr-4 text-graphite-600 dark:text-graphite-300">
                  {formatCurrency(row.allocated)}
                </td>
                <td className="tabular py-4 pr-4 text-graphite-600 dark:text-graphite-300">
                  {formatCurrency(row.actual)}
                </td>
                <td
                  className={`tabular py-4 pr-4 font-medium ${
                    isOverBudget ? 'text-negative' : 'text-positive'
                  }`}
                >
                  {isOverBudget ? '−' : '+'}
                  {formatCurrency(row.variance)}
                </td>
                <td className="tabular py-4 pr-4 text-graphite-600 dark:text-graphite-300">
                  {row.utilization.toFixed(1)}%
                </td>
                <td className="py-4 pl-4 text-right">
                  {String(row.status || '').toLowerCase() === 'draft' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onEdit(row)}
                        aria-label={`Edit ${row.department}`}
                        title="Edit draft"
                        className="rounded-full p-2 text-graphite-400 transition-colors duration-150
                                   hover:bg-ember-100 hover:text-ember-600 dark:hover:bg-ember-500/15 dark:hover:text-ember-400"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onSubmit(row.id)}
                        aria-label={`Submit ${row.department}`}
                        title="Submit draft for approval"
                        className="rounded-full p-2 text-graphite-400 transition-colors duration-150
                                   hover:bg-positive/10 hover:text-positive"
                      >
                        <Send className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => onDelete(row.id)}
                    aria-label={`Remove ${row.department}`}
                    className="rounded-full p-2 text-graphite-400 transition-colors duration-150
                               hover:bg-negative/10 hover:text-negative"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-sm text-graphite-400">
                No budget entries yet. Use the + button to add one.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
