import AppBackdrop from '../background/AppBackdrop.jsx';

export default function AuthLayout({ eyebrow, logo, title, subtitle, children, footer }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-4 py-10">
      <AppBackdrop />
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          {logo ? (
            <img src={logo} alt="OneConnect" className="mx-auto mb-3 block h-9 w-auto object-contain" />
          ) : (
            <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-ember-500">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-2xl font-semibold text-graphite-900 dark:text-white">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-graphite-500 dark:text-graphite-400">{subtitle}</p>
          )}
        </div>

        <div className="rounded-2xl bg-white/80 p-8 shadow-sm shadow-graphite-900/5 backdrop-blur-sm dark:bg-oled-panel/80 dark:shadow-none">
          {children}
        </div>

        {footer && <div className="mt-6 text-center text-sm text-graphite-500 dark:text-graphite-400">{footer}</div>}
      </div>
    </div>
  );
}
