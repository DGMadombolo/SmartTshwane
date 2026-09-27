import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-pattern relative overflow-hidden px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-36">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-12">
        {/* Left side */}
        <div className="z-10 lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-fixed)] px-4 py-2 text-sm font-semibold text-[var(--color-on-primary-fixed)]">
            <span className="material-symbols-outlined text-[18px]">
              verified
            </span>

            Official City Service Platform
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight text-[var(--color-on-surface)] md:text-[40px] md:leading-[48px]">
            Empowering Our Community through{" "}
            <span className="text-[var(--color-primary)]">
              Better Services
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-7 text-[var(--color-on-surface-variant)]">
            Seamlessly report issues, track resolutions, and stay informed
            about your neighborhood&apos;s development with SmartTshwane&apos;s
            digital service portal.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/report"
              className="flex items-center justify-center gap-3 rounded-xl bg-[var(--color-primary)] px-8 py-4 font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-container)] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">
                report
              </span>

              Report a Service Issue
            </Link>

            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-outline)]">
                search
              </span>

              <input
                type="text"
                placeholder="Search for existing issues or services..."
                className="w-full rounded-xl border border-[var(--color-outline-variant)] bg-white py-4 pl-12 pr-4 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-[var(--color-primary-container)]" />
              <div className="h-10 w-10 rounded-full border-2 border-white bg-[var(--color-secondary)]" />
              <div className="h-10 w-10 rounded-full border-2 border-white bg-[var(--color-tertiary-fixed-dim)]" />
            </div>

            <p className="text-sm text-[var(--color-on-surface-variant)]">
              Joined by{" "}
              <span className="font-bold text-[var(--color-primary)]">
                50,000+
              </span>{" "}
              active citizens this month
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--color-primary)]/5 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl">
            <div className="aspect-[4/5] bg-gradient-to-br from-[#003b70] via-[#0066ad] to-[#0b243b] p-6">
              <div className="flex h-full flex-col">
                {/* Mock dashboard header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-100">
                      SMARTTSHWANE
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      City Operations
                    </p>
                  </div>

                  <span className="material-symbols-outlined text-white">
                    dashboard
                  </span>
                </div>

                {/* Mock dashboard */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                    <span className="material-symbols-outlined text-blue-200">
                      water_drop
                    </span>

                    <p className="mt-3 text-xs text-blue-100">
                      Water Services
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      98%
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                    <span className="material-symbols-outlined text-green-300">
                      bolt
                    </span>

                    <p className="mt-3 text-xs text-blue-100">
                      Electricity
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      94%
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex-1 rounded-xl bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-blue-100">
                      Service Requests
                    </p>

                    <span className="material-symbols-outlined text-sm text-white">
                      trending_up
                    </span>
                  </div>

                  <div className="mt-6 flex h-32 items-end gap-2">
                    <div className="h-[45%] flex-1 rounded-t bg-blue-300/70" />
                    <div className="h-[62%] flex-1 rounded-t bg-blue-300/70" />
                    <div className="h-[52%] flex-1 rounded-t bg-blue-300/70" />
                    <div className="h-[78%] flex-1 rounded-t bg-blue-200/80" />
                    <div className="h-[68%] flex-1 rounded-t bg-blue-200/80" />
                    <div className="h-[90%] flex-1 rounded-t bg-white/90" />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-2 rounded-full bg-green-400" />
                  <div className="h-2 rounded-full bg-blue-300" />
                  <div className="h-2 rounded-full bg-yellow-400" />
                </div>
              </div>
            </div>

            {/* Live Network Status */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/90 p-5 shadow-lg backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  Live Network Status
                </span>

                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-secondary)]" />
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[var(--color-outline-variant)]">
                <div className="h-full w-[94%] rounded-full bg-[var(--color-secondary)]" />
              </div>

              <div className="mt-2 flex justify-between text-xs text-[var(--color-on-surface-variant)]">
                <span>Service Uptime</span>
                <span>94.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}