import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* Main Footer */}
      <div className="border-t border-[var(--color-outline-variant)] bg-[var(--color-surface-container-highest)] px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
            
            {/* Brand */}
            <div className="lg:pr-8">
              <Link href="/" className="mb-6 flex items-center gap-3">
                <Image
                  src="/images/smarttshwane.png"
                  alt="SmartTshwane Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain"
                />

                <span className="text-2xl font-bold text-[var(--color-on-surface)]">
                  SmartTshwane
                </span>
              </Link>

              <p className="max-w-md text-base leading-6 text-[var(--color-on-surface-variant)]">
                Official smart city service portal for the City of Tshwane.
                Making urban governance transparent and efficient.
              </p>

              <div className="mt-8 flex gap-4">
                <button
                  type="button"
                  aria-label="SmartTshwane public website"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-surface-container-high)] text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)] hover:text-white"
                >
                  <span className="material-symbols-outlined">
                    public
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="Share SmartTshwane"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-surface-container-high)] text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)] hover:text-white"
                >
                  <span className="material-symbols-outlined">
                    share
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-5 text-base font-bold text-[var(--color-on-surface)]">
                Quick Links
              </h4>

              <ul className="space-y-4 text-base text-[var(--color-on-surface-variant)]">
                <li>
                  <Link
                    href="/services/water"
                    className="transition-colors hover:text-[var(--color-primary)] hover:underline"
                  >
                    Water &amp; Sanitation
                  </Link>
                </li>

                <li>
                  <Link
                    href="/services/electricity"
                    className="transition-colors hover:text-[var(--color-primary)] hover:underline"
                  >
                    Energy &amp; Electricity
                  </Link>
                </li>

                <li>
                  <Link
                    href="/services/roads"
                    className="transition-colors hover:text-[var(--color-primary)] hover:underline"
                  >
                    Roads &amp; Transport
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="mb-5 text-base font-bold text-[var(--color-on-surface)]">
                Support
              </h4>

              <ul className="space-y-4 text-base text-[var(--color-on-surface-variant)]">
                <li>
                  <a
                    href="tel:107"
                    className="transition-colors hover:text-[var(--color-primary)] hover:underline"
                  >
                    Emergency: 107
                  </a>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-[var(--color-primary)] hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-[var(--color-primary)] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="mb-5 text-base font-bold text-[var(--color-on-surface)]">
                Newsletter
              </h4>

              <p className="mb-5 text-sm leading-5 text-[var(--color-on-surface-variant)]">
                Stay informed about municipal updates and community news.
              </p>

              <div className="flex w-full max-w-sm gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email address"
                  className="min-w-0 flex-1 rounded-xl border border-[var(--color-outline-variant)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
                />

                <button
                  type="button"
                  aria-label="Subscribe to newsletter"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white transition-colors hover:bg-[var(--color-primary-container)]"
                >
                  <span className="material-symbols-outlined">
                    send
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[var(--color-outline-variant)] bg-[var(--color-surface-container-highest)] px-6 py-5 md:px-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1440px] justify-center">
          <p className="text-sm text-[var(--color-on-surface-variant)]/70">
            © 2026 City of Tshwane. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}