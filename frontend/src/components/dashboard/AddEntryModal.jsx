import { useState } from 'react';
import { X } from 'lucide-react';

const initialForm = { department: '', allocated: '', actual: '' };
const DEPARTMENTS = [
  'IT',
  'HR',
  'Finance',
  'Marketing',
  'Operations',
  'Sales',
  'Customer Support',
  'Security'
];

export default function AddEntryModal({ open, entry, error, onClose, onSubmit }) {
  const [form, setForm] = useState(() => (
    entry
      ? { department: entry.department, allocated: entry.allocated, actual: entry.actual }
      : initialForm
  ));

  if (!open) return null;

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const allocated = Number(form.allocated) || 0;
    const actual = Number(form.actual) || 0;
    onSubmit({
      id: entry?.id,
      department: form.department || 'Untitled Budget',
      allocated,
      actual,
      variance: allocated ? Number((((allocated - actual) / allocated) * 100).toFixed(1)) : 0,
      deviation: allocated - actual,
      utilization: allocated ? Number(((actual / allocated) * 100).toFixed(1)) : 0
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-oled-panel dark:border dark:border-oled-border">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-graphite-900 dark:text-white">
            {entry ? 'Edit budget entry' : 'New budget entry'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-graphite-400 hover:bg-graphite-100 hover:text-graphite-700 dark:hover:bg-graphite-800"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-graphite-600 dark:text-graphite-300">Department</span>
            <input
              required
              list="department-options"
              value={form.department}
              onChange={handleChange('department')}
              placeholder="Type or select a department"
              className="rounded-xl border-0 bg-graphite-50 px-4 py-2.5 text-graphite-800 outline-none
                         ring-1 ring-graphite-200 focus:ring-2 focus:ring-ember-400
                         dark:bg-graphite-900 dark:text-white dark:ring-graphite-700"
            />
            <datalist id="department-options">
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department} />
              ))}
            </datalist>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-600 dark:text-graphite-300">Allocated (R)</span>
              <input
                required
                type="number"
                min="0"
                step="1000"
                value={form.allocated}
                onChange={handleChange('allocated')}
                className="rounded-xl border-0 bg-graphite-50 px-4 py-2.5 text-graphite-800 outline-none
                           ring-1 ring-graphite-200 focus:ring-2 focus:ring-ember-400
                           dark:bg-graphite-900 dark:text-white dark:ring-graphite-700"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-graphite-600 dark:text-graphite-300">Actual (R)</span>
              <input
                required
                type="number"
                min="0"
                step="1000"
                value={form.actual}
                onChange={handleChange('actual')}
                className="rounded-xl border-0 bg-graphite-50 px-4 py-2.5 text-graphite-800 outline-none
                           ring-1 ring-graphite-200 focus:ring-2 focus:ring-ember-400
                           dark:bg-graphite-900 dark:text-white dark:ring-graphite-700"
              />
            </label>
          </div>

          {error && (
            <p role="alert" className="text-sm text-negative">
              {error}
            </p>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm font-medium text-graphite-500 hover:bg-graphite-100 dark:hover:bg-graphite-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-ember-500 px-5 py-2 text-sm font-medium text-white hover:bg-ember-600"
            >
              {entry ? 'Save changes' : 'Add entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
