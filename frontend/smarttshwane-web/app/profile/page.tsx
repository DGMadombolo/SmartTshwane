 "use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  CheckCircle2,
  CircleUserRound,
  LogOut,
  Mail,
  Menu,
  Phone,
  Save,
  UserRound,
  X,
} from "lucide-react";

interface StoredUser {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUser =
      localStorage.getItem("smarttshwane_user") ||
      sessionStorage.getItem("smarttshwane_user");

    if (!storedUser) {
      window.location.href = "/login";
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as StoredUser;

      setUser(parsedUser);
      setFirstname(parsedUser.firstname || "");
      setLastname(parsedUser.lastname || "");
      setEmail(parsedUser.email || "");
    } catch (error) {
      console.error("Unable to read stored user:", error);
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("smarttshwane_token");
    localStorage.removeItem("smarttshwane_user");
    sessionStorage.removeItem("smarttshwane_token");
    sessionStorage.removeItem("smarttshwane_user");

    window.location.href = "/login";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!firstname.trim() || !lastname.trim()) {
      setErrorMessage("Please enter your first name and surname.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!user) {
      setErrorMessage("Your session could not be found. Please sign in again.");
      return;
    }

    const updatedUser: StoredUser = {
      ...user,
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
    };

    const userJson = JSON.stringify(updatedUser);

    if (localStorage.getItem("smarttshwane_user")) {
      localStorage.setItem("smarttshwane_user", userJson);
    }

    if (sessionStorage.getItem("smarttshwane_user")) {
      sessionStorage.setItem("smarttshwane_user", userJson);
    }

    setUser(updatedUser);
    setSuccessMessage(
      "Your profile has been updated for this session. Backend profile persistence will be connected next.",
    );
  };

  const firstnameDisplay = user?.firstname || firstname || "Citizen";

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[#e1e3e4] bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-8">
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

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/report"
              className="text-sm font-semibold text-[#424752] transition hover:text-[#004d99]"
            >
              Report an Issue
            </Link>

            <Link
              href="/track-status"
              className="text-sm font-semibold text-[#424752] transition hover:text-[#004d99]"
            >
              Track Status
            </Link>

            <Link
              href="/dashboard#alerts"
              className="text-sm font-semibold text-[#424752] transition hover:text-[#004d99]"
            >
              News & Updates
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-full bg-[#004d99] px-5 py-2.5 text-white"
            >
              <CircleUserRound size={19} />
              <span className="text-sm font-semibold">{firstnameDisplay}</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#424752] transition hover:bg-[#f3f4f5] hover:text-[#ba1a1a]"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#004d99] hover:bg-[#f3f4f5] md:hidden"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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

              <Link
                href="/dashboard#alerts"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#424752] hover:bg-[#f3f4f5]"
              >
                News & Updates
              </Link>

              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg bg-[#004d99] px-4 py-3 text-sm font-semibold text-white"
              >
                My Profile
              </Link>

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

      <main className="mx-auto max-w-[1280px] px-4 pb-16 pt-28 md:px-8">
        <section className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-[#004d99] hover:underline"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#191c1d] md:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-base leading-7 text-[#424752]">
              Manage the personal information associated with your SmartTshwane
              account.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#ffdad6] bg-[#fff1f0] p-4">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-[#ba1a1a]"
              />
              <p className="text-sm leading-5 text-[#93000a]">
                {errorMessage}
              </p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#a3f69c] bg-[#f0fff0] p-4">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-[#1b6d24]"
              />
              <p className="text-sm leading-5 text-[#1b6d24]">
                {successMessage}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-[#c2c6d4] bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-8 flex items-center gap-4 border-b border-[#e1e3e4] pb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f0ff] text-[#004d99]">
                <UserRound size={28} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#191c1d]">
                  Account Information
                </h2>
                <p className="mt-1 text-sm text-[#727783]">
                  Citizen ID: {user?.userId ?? "—"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstname"
                  className="mb-1.5 block text-sm font-semibold text-[#191c1d]"
                >
                  First Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />
                  <input
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                    className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-4 outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="mb-1.5 block text-sm font-semibold text-[#191c1d]"
                >
                  Surname
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />
                  <input
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                    className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-4 outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-[#191c1d]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-4 outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-semibold text-[#191c1d]"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Phone number"
                    className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-4 outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="mb-1.5 block text-sm font-semibold text-[#191c1d]"
                >
                  Account Type
                </label>

                <input
                  id="role"
                  type="text"
                  value={user?.role || "Citizen"}
                  readOnly
                  className="w-full rounded-lg border border-[#c2c6d4] bg-[#e7e8e9] px-4 py-3 text-[#727783]"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#e1e3e4] pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard"
                className="rounded-lg px-6 py-3 text-center text-sm font-semibold text-[#424752] transition hover:bg-[#f3f4f5]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#004d99] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1565c0] active:scale-[0.98]"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>

          <div className="mt-6 rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] p-4">
            <p className="text-sm leading-6 text-[#424752]">
              <strong>Note:</strong> Your profile is currently updated in the
              active browser session. We will connect the Save Changes action
              to the ASP.NET Core API next so the changes are persisted in
              PostgreSQL.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
