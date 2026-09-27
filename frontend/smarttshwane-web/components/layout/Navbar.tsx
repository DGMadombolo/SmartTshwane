"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("smarttshwane_token") ||
      sessionStorage.getItem("smarttshwane_token");

    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/smarttshwane.png"
            alt="SmartTshwane Logo"
            width={48}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />

          <span className="text-xl font-bold text-[var(--color-primary)]">
            SmartTshwane
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/report"
            className="border-b-2 border-[var(--color-primary)] py-1 text-sm font-semibold text-[var(--color-primary)]"
          >
            Report an Issue
          </Link>

          <Link
            href="/track-status"
            className="py-1 text-sm font-semibold text-[var(--color-on-surface-variant)] transition-colors hover:text-[var(--color-primary)]"
          >
            Track Status
          </Link>

          <Link
            href="/news"
            className="py-1 text-sm font-semibold text-[var(--color-on-surface-variant)] transition-colors hover:text-[var(--color-primary)]"
          >
            News & Updates
          </Link>
        </div>

        {/* Authentication Button */}
        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="rounded-lg bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-container)] active:scale-95"
          >
            Citizen Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-container)] active:scale-95"
          >
            Citizen Login
          </Link>
        )}
      </div>
    </nav>
  );
}