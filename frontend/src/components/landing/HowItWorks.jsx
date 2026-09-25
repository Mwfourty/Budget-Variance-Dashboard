import SectionHead from './SectionHead.jsx';

const STEPS = [
  {
    number: '01',
    title: 'Set up your departments',
    description: 'Add IT, HR, Marketing, or whatever structure your company uses — each gets its own allocated budget and owner.'
  },
  {
    number: '02',
    title: 'Log actuals as they land',
    description: 'Enter actual spend against each line as invoices clear. Variance and utilization update immediately.'
  },
  {
    number: '03',
    title: 'Review, approve, move on',
    description: 'Admins review the quarter at a glance and move entries from Draft to Approved — no separate spreadsheet needed.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-graphite-50 py-24 dark:bg-graphite-900/40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="Up and running fast"
          title="From spreadsheet to single dashboard"
          subtitle="Three steps, and your department's numbers stop living in five different files."
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number}>
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-ember-soft font-display text-sm font-semibold text-ember-600 dark:bg-ember-soft-dark dark:text-ember-300">
                {step.number}
              </span>
              <h3 className="mb-2 font-display text-base font-semibold text-graphite-900 dark:text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-graphite-500 dark:text-graphite-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
