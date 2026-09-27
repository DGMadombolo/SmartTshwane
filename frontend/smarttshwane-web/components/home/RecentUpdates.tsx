export default function RecentUpdates() {
  return (
    <section className="bg-[var(--color-surface-container-lowest)] px-4 py-16 md:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="mb-8 text-3xl font-bold text-[var(--color-on-surface)]">
          Recent Updates
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Featured Update */}
          <article className="group relative min-h-[400px] overflow-hidden rounded-3xl bg-[var(--color-primary)] md:col-span-2 md:row-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b4778] via-[#1565c0] to-[#002f5f]" />

            {/* Decorative city pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[30px] border-white/30" />
              <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full border-[24px] border-white/20" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8">
              <span className="mb-4 inline-block rounded-lg bg-[var(--color-secondary)] px-3 py-1 text-xs font-semibold text-white">
                Service Success
              </span>

              <h3 className="mb-2 text-2xl font-semibold leading-tight text-white">
                95% Outage Resolve Rate Reached
              </h3>

              <p className="text-sm leading-5 text-white/80">
                The Department of Energy has achieved a historic milestone in
                resolution speed for residential outages this quarter.
              </p>
            </div>
          </article>

          {/* Infrastructure Update */}
          <article className="flex flex-col gap-6 rounded-3xl bg-[var(--color-surface-container)] p-6 md:col-span-2 md:flex-row md:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-primary)] shadow-sm">
              <span className="material-symbols-outlined text-[40px]">
                construction
              </span>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                Infrastructure
              </p>

              <h3 className="mb-2 text-xl font-semibold leading-snug text-[var(--color-on-surface)]">
                New Bypass Construction Phase 2
              </h3>

              <p className="text-sm leading-5 text-[var(--color-on-surface-variant)]">
                Major work beginning on the East Ring road to reduce morning
                congestion.
              </p>
            </div>
          </article>

          {/* Town Hall */}
          <article className="flex min-h-[220px] flex-col justify-between rounded-3xl bg-[var(--color-primary)] p-6 text-white">
            <span className="material-symbols-outlined text-[32px]">
              event_available
            </span>

            <div>
              <h3 className="mb-2 text-xl font-semibold leading-tight">
                Town Hall: Friday 6PM
              </h3>

              <p className="text-sm leading-5 text-[var(--color-on-primary-container)] opacity-90">
                Join us for a digital session regarding the 2024 budget.
              </p>
            </div>
          </article>

          {/* All News */}
          <article className="group flex min-h-[220px] cursor-pointer flex-col justify-between rounded-3xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-high)] p-6 transition-colors hover:border-[var(--color-primary)]">
            <div className="flex items-start justify-between">
              <span className="material-symbols-outlined text-[var(--color-on-surface-variant)] transition-colors group-hover:text-[var(--color-primary)]">
                newspaper
              </span>

              <span className="material-symbols-outlined text-[var(--color-outline)]">
                north_east
              </span>
            </div>

            <h3 className="text-sm font-semibold leading-tight text-[var(--color-on-surface)]">
              All news articles
            </h3>
          </article>
        </div>
      </div>
    </section>
  );
}