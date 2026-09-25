import { useState } from 'react';

export default function CtaSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired up yet — swap this for a real request to your
    // Spring Boot API (or a mailing-list provider) once one exists.
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-[28px] bg-graphite-900 px-8 py-16 text-center text-white dark:bg-graphite-900/70 sm:px-16">
        <h2 className="mx-auto max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
          See where your budget actually stands.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-graphite-300">
          Get notified when Ledger opens up for new finance teams — no spam, just an invite.
        </p>

        {submitted ? (
          <p className="mt-8 text-sm font-medium text-positive">You&rsquo;re on the list — we&rsquo;ll be in touch.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="min-w-[240px] rounded-full border border-graphite-700 bg-graphite-800 px-5 py-3 text-sm
                         text-white outline-none placeholder:text-graphite-500 focus:border-ember-500"
            />
            <button
              type="submit"
              className="rounded-full bg-ember-500 px-6 py-3 text-sm font-medium text-white hover:bg-ember-600"
            >
              Request access
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-graphite-500">No credit card. No spreadsheets missed ever again.</p>
      </div>
    </section>
  );
}
