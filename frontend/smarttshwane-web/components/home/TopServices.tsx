export default function TopServices() {
  return (
    <section className="bg-white px-4 py-16 md:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-on-surface)]">
              Top Services
            </h2>

            <p className="mt-2 text-base text-[var(--color-on-surface-variant)]">
              Access the most requested municipal utilities and reports.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start font-semibold text-[var(--color-primary)] transition-all hover:gap-3 md:self-auto">
            View All Services
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Water & Sanitation */}
          <div className="service-card-hover group rounded-2xl border border-[var(--color-outline-variant)]/50 bg-[var(--color-surface-container-low)] p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-[32px]">
                water_drop
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-[var(--color-on-surface)]">
              Water &amp; Sanitation
            </h3>

            <p className="mt-3 text-sm leading-5 text-[var(--color-on-surface-variant)]">
              Report leaks, view water restrictions, and pay your utility bill
              online with instant confirmation.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-medium text-[var(--color-on-surface-variant)]">
                Meter Readings
              </span>

              <span className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-medium text-[var(--color-on-surface-variant)]">
                Leak Report
              </span>
            </div>
          </div>

          {/* Energy & Electricity */}
          <div className="service-card-hover group rounded-2xl border border-[var(--color-outline-variant)]/50 bg-[var(--color-surface-container-low)] p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-tertiary-container)] text-[var(--color-on-tertiary-container)] transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-[32px]">
                bolt
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-[var(--color-on-surface)]">
              Energy &amp; Electricity
            </h3>

            <p className="mt-3 text-sm leading-5 text-[var(--color-on-surface-variant)]">
              Check load shedding schedules, report outages, and manage
              prepaid tokens for your household.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-medium text-[var(--color-on-surface-variant)]">
                Schedules
              </span>

              <span className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-medium text-[var(--color-on-surface-variant)]">
                Buy Power
              </span>
            </div>
          </div>

          {/* Roads & Transport */}
          <div className="service-card-hover group rounded-2xl border border-[var(--color-outline-variant)]/50 bg-[var(--color-surface-container-low)] p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-[32px]">
                traffic
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-[var(--color-on-surface)]">
              Roads &amp; Transport
            </h3>

            <p className="mt-3 text-sm leading-5 text-[var(--color-on-surface-variant)]">
              Log pothole locations, report non-functional traffic lights, and
              view public transport schedules.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-medium text-[var(--color-on-surface-variant)]">
                Potholes
              </span>

              <span className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-medium text-[var(--color-on-surface-variant)]">
                Bus Routes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}