export default function FormField({ label, ...inputProps }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-graphite-600 dark:text-graphite-300">{label}</span>
      <input
        {...inputProps}
        className="rounded-xl border-0 bg-graphite-50 px-4 py-2.5 text-graphite-800 outline-none
                   ring-1 ring-graphite-200 transition-shadow focus:ring-2 focus:ring-ember-400
                   dark:bg-graphite-900 dark:text-white dark:ring-graphite-700"
      />
    </label>
  );
}
