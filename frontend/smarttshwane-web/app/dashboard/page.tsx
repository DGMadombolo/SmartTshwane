"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  Bolt,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  FilePlus2,
  Info,
  Lightbulb,
  LogOut,
  Map,
  Menu,
  MessageCircle,
  Newspaper,
  ShieldCheck,
  UserRound,
  Wrench,
  X,
  Zap,
} from "lucide-react";

interface StoredUser {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

interface Report {
  id: string;
  icon: "water" | "light";
  title: string;
  location: string;
  reported: string;
  status: "In Progress" | "Pending";
  statusType: "green" | "yellow";
  expectedCompletion?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("smarttshwane_user") ||
      sessionStorage.getItem("smarttshwane_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Unable to read stored user:", error);
      }
    }
  }, []);

  const firstname = user?.firstname || "Citizen";

  const reports: Report[] = [
    {
      id: "#TSH-98231",
      icon: "water",
      title: "Water Pipe Burst",
      location: "Hatfield",
      reported: "Reported 2 days ago",
      status: "In Progress",
      statusType: "green",
      expectedCompletion: "Expected completion: Tomorrow",
    },
    {
      id: "#TSH-99102",
      icon: "light",
      title: "Street Light Outage",
      location: "Jan Shoba St",
      reported: "Reported 4 hours ago",
      status: "Pending",
      statusType: "yellow",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("smarttshwane_token");
    localStorage.removeItem("smarttshwane_user");

    sessionStorage.removeItem("smarttshwane_token");
    sessionStorage.removeItem("smarttshwane_user");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[#e1e3e4] bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/images/smarttshwane.png"
              alt="SmartTshwane"
              width={42}
              height={42}
              className="rounded-md object-contain"
            />

            <span className="text-xl font-bold text-[#004d99]">
              SmartTshwane
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/report"
              className="text-sm font-semibold text-[#424752] transition hover:text-[#004d99]"
            >
              Report an Issue
            </Link>

            <Link
              href="/track"
              className="text-sm font-semibold text-[#004d99]"
            >
              Track Status
            </Link>

            <Link
              href="#alerts"
              className="text-sm font-semibold text-[#424752] transition hover:text-[#004d99]"
            >
              News & Updates
            </Link>
          </nav>

          {/* User menu */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full bg-[#004d99] px-5 py-2.5 text-white">
              <CircleUserRound size={19} />

              <span className="text-sm font-semibold">
                {firstname}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#424752] transition hover:bg-[#f3f4f5] hover:text-[#ba1a1a]"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#004d99] hover:bg-[#f3f4f5] md:hidden"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-[#e1e3e4] bg-white px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              <Link
                href="/report"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#424752] hover:bg-[#f3f4f5]"
              >
                Report an Issue
              </Link>

              <Link
                href="/track-status"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#424752] hover:bg-[#f3f4f5]"
              >
                Track Status
              </Link>

              <a
                href="#alerts"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#424752] hover:bg-[#f3f4f5]"
              >
                News & Updates
              </a>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#ba1a1a] hover:bg-[#fff1f0]"
              >
                <LogOut size={17} />
                Logout
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <main className="mx-auto max-w-[1280px] px-4 pb-16 pt-28 md:px-8">
        {/* =======================================================
            WELCOME HEADER
        ======================================================= */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#191c1d] md:text-4xl">
                Welcome back, {firstname}
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#424752] md:text-lg">
                Managing your city services from Tshwane. Your contributions
                help keep the city moving forward.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-lg bg-[#a0f399] px-4 py-2.5 text-sm font-semibold text-[#217128]">
              <CheckCircle2 size={18} />
              Verified Resident
            </div>
          </div>
        </section>

        {/* =======================================================
            BENTO GRID
        ======================================================= */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* =====================================================
              MY REPORTED ISSUES
          ===================================================== */}
          <section className="rounded-xl border border-[#c2c6d4] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:col-span-8 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-[#191c1d] md:text-2xl">
                <Activity size={23} className="text-[#004d99]" />
                My Reported Issues
              </h2>

              <Link
                href="/track-status"
                className="text-sm font-semibold text-[#004d99] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className={`flex flex-col gap-4 rounded-lg border-l-4 bg-[#edeeef] p-4 sm:flex-row sm:items-center sm:justify-between ${
                    report.statusType === "green"
                      ? "border-[#1b6d24]"
                      : "border-[#644a00]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Issue icon */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        report.statusType === "green"
                          ? "bg-[#a0f399] text-[#217128]"
                          : "bg-[#ffdf9e] text-[#644a00]"
                      }`}
                    >
                      {report.icon === "water" ? (
                        <Activity size={20} />
                      ) : (
                        <Lightbulb size={20} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#191c1d]">
                        {report.title} - {report.location}
                      </p>

                      <p className="mt-1 text-xs text-[#424752]">
                        Reference: {report.id} • {report.reported}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        report.statusType === "green"
                          ? "bg-[#a0f399] text-[#217128]"
                          : "bg-[#ffdf9e] text-[#644a00]"
                      }`}
                    >
                      {report.status}
                    </span>

                    {report.expectedCompletion && (
                      <p className="mt-1 text-xs text-[#424752]">
                        {report.expectedCompletion}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* New report */}
              <Link
                href="/report"
                className="group flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#c2c6d4] p-8 text-center transition hover:border-[#004d99] hover:bg-[#f8f9fa]"
              >
                <FilePlus2
                  size={34}
                  className="mb-2 text-[#727783] transition group-hover:text-[#004d99]"
                />

                <p className="text-sm text-[#424752]">
                  Spot something else? Your reports help the city repair
                  infrastructure faster.
                </p>

                <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#004d99]">
                  File a new report
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </section>

          {/* =====================================================
              QUICK ACTIONS
          ===================================================== */}
          <aside className="md:col-span-4">
            <section className="flex h-full min-h-[300px] flex-col justify-between rounded-xl bg-[#1565c0] p-6 text-white shadow-sm md:p-8">
              <div>
                <h2 className="text-xl font-semibold md:text-2xl">
                  Quick Actions
                </h2>

                <p className="mb-6 mt-2 text-sm leading-6 text-white/90">
                  Handle your municipal tasks in seconds.
                </p>
              </div>

              <div className="grid gap-3">
                <Link
                  href="/report"
                  className="flex items-center justify-between rounded-lg bg-white p-4 text-[#004d99] shadow-sm transition hover:bg-[#f8f9fa]"
                >
                  <div className="flex items-center gap-3">
                    <Bell size={20} />
                    <span className="text-sm font-semibold">
                      Report New Issue
                    </span>
                  </div>

                  <ChevronRight size={19} />
                </Link>

                <Link
                  href="/track-status"
                  className="flex items-center justify-between rounded-lg bg-white p-4 text-[#004d99] shadow-sm transition hover:bg-[#f8f9fa]"
                >
                  <div className="flex items-center gap-3">
                    <Activity size={20} />
                    <span className="text-sm font-semibold">
                      Track Service Requests
                    </span>
                  </div>

                  <ChevronRight size={19} />
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center justify-between rounded-lg bg-white p-4 text-[#004d99] shadow-sm transition hover:bg-[#f8f9fa]"
                >
                  <div className="flex items-center gap-3">
                    <UserRound size={20} />
                    <span className="text-sm font-semibold">
                      Update Profile
                    </span>
                  </div>

                  <ChevronRight size={19} />
                </Link>

                <button
                  type="button"
                  className="flex items-center justify-between rounded-lg bg-white p-4 text-[#004d99] shadow-sm transition hover:bg-[#f8f9fa]"
                >
                  <div className="flex items-center gap-3">
                    <Zap size={20} />
                    <span className="text-sm font-semibold">
                      Pay Account
                    </span>
                  </div>

                  <ChevronRight size={19} />
                </button>
              </div>
            </section>
          </aside>

          {/* =====================================================
              LOCAL ALERTS
          ===================================================== */}
          <section
            id="alerts"
            className="rounded-xl border border-[#c2c6d4] bg-[#f3f4f5] p-6 shadow-sm md:col-span-12 md:p-8"
          >
            <div className="mb-6 flex items-center gap-2">
              <AlertCircle size={23} className="text-[#ba1a1a]" />

              <h2 className="text-xl font-semibold text-[#191c1d] md:text-2xl">
                Local Alerts: Tshwane Area
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Alert 1 */}
              <div className="rounded-lg border border-[#c2c6d4] bg-white p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#ba1a1a]">
                  <Wrench size={17} />
                  PLANNED MAINTENANCE
                </div>

                <h3 className="text-sm font-semibold text-[#191c1d]">
                  Water Shutdown
                </h3>

                <p className="mt-1 text-sm leading-5 text-[#424752]">
                  Scheduled municipal maintenance. Check affected streets and
                  service notices before travelling.
                </p>

                <p className="mt-3 text-xs font-medium text-[#727783]">
                  08:00 AM - 04:00 PM
                </p>
              </div>

              {/* Alert 2 */}
              <div className="rounded-lg border border-[#c2c6d4] bg-white p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#1b6d24]">
                  <Bolt size={17} />
                  GRID UPDATE
                </div>

                <h3 className="text-sm font-semibold text-[#191c1d]">
                  Electricity Service Update
                </h3>

                <p className="mt-1 text-sm leading-5 text-[#424752]">
                  Municipal electricity service information and operational
                  updates will appear here.
                </p>

                <p className="mt-3 text-xs font-medium text-[#727783]">
                  Updated recently
                </p>
              </div>

              {/* Alert 3 */}
              <div className="rounded-lg border border-[#c2c6d4] bg-white p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#004d99]">
                  <Info size={17} />
                  COMMUNITY NOTICE
                </div>

                <h3 className="text-sm font-semibold text-[#191c1d]">
                  Community Information
                </h3>

                <p className="mt-1 text-sm leading-5 text-[#424752]">
                  Important municipal announcements and community notices will
                  appear here.
                </p>

                <p className="mt-3 text-xs font-medium text-[#727783]">
                  Published recently
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              INFRASTRUCTURE MAP
          ===================================================== */}
          <section className="relative min-h-[280px] overflow-hidden rounded-xl bg-[#004d99] md:col-span-12">
            {/* Decorative map-like background */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px),
                    linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "42px 42px",
                }}
              />

              <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full border-2 border-white/40" />
              <div className="absolute right-1/4 top-1/3 h-56 w-56 rounded-full border border-white/30" />
            </div>

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#004d99] via-[#004d99]/90 to-transparent" />

            <div className="relative z-10 flex min-h-[280px] flex-col justify-center p-6 text-white md:p-8">
              <h2 className="text-2xl font-bold md:text-3xl">
                Infrastructure Map
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/90 md:text-base">
                View service information across the metropolitan area.
                Interactive data will be provided by City Operations.
              </p>

              <button
                type="button"
                className="mt-5 flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#004d99] transition hover:bg-[#f3f4f5]"
              >
                <Map size={19} />
                Open Live Map
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-[#c2c6d4] bg-[#e1e3e4] px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-8 md:flex-row">
          <div>
            <h2 className="font-bold text-[#191c1d]">SmartTshwane</h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#424752]">
              Leading the way in digital transformation for the City of
              Tshwane. Empowering citizens through technology.
            </p>

            <p className="mt-3 text-sm text-[#424752]">
              © 2026 City of Tshwane. All rights reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#004d99]">
                Emergency
              </p>

              <a
                href="tel:107"
                className="text-sm text-[#424752] hover:text-[#004d99]"
              >
                Emergency: 107
              </a>

              <span className="text-sm text-[#727783]">
                Contact Us
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#004d99]">
                Services
              </p>

              <span className="text-sm text-[#727783]">
                Water & Sanitation
              </span>

              <span className="text-sm text-[#727783]">
                Energy & Electricity
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#004d99]">
                Legal
              </p>

              <span className="text-sm text-[#727783]">
                Roads & Transport
              </span>

              <span className="text-sm text-[#727783]">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================
          CHAT SUPPORT
      ========================================================= */}
      <button
        type="button"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#004d99] text-white shadow-xl transition hover:scale-105 hover:bg-[#1565c0] active:scale-95"
        aria-label="Chat support"
        title="Chat Support"
      >
        <MessageCircle size={23} />
      </button>
    </div>
  );
}