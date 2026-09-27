import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[2rem] bg-[var(--color-primary-container)] p-8 text-center md:p-12">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full border-8 border-white" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full border-8 border-white" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold leading-tight text-[var(--color-on-primary-container)] md:text-4xl">
            Start Your First Report Today
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-[var(--color-on-primary-container)]/90">
            Be a part of the change. Your reports directly influence city
            maintenance priorities and help us build a smarter, safer Tshwane.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="rounded-xl bg-white px-10 py-4 font-semibold text-[var(--color-primary)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Register Your Account
            </Link>

            <button
              type="button"
              className="rounded-xl border-2 border-white/30 px-10 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Download Mobile App
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}