export default function SectionHead({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-12 max-w-xl text-center">
      <span
        className="mb-4 inline-flex items-center gap-2 rounded-full bg-ember-soft px-3.5 py-1.5 text-xs
                   font-semibold uppercase tracking-widest text-ember-600 dark:bg-ember-soft-dark dark:text-ember-300"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-semibold leading-tight text-graphite-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3.5 text-base leading-relaxed text-graphite-500 dark:text-graphite-400">{subtitle}</p>}
    </div>
  );
}
