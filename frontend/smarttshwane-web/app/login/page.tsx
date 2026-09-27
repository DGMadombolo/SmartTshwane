"use client";

import { FormEvent, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://localhost:5284";

interface LoginResponse {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  token: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage(
            "Login failed. Please check that the SmartTshwane API is running.",
          );
        }

        return;
      }

      const loginData = data as LoginResponse;

      /*
       * Temporary frontend session storage.
       *
       * We'll improve the authentication/session architecture
       * when we finish the backend integration.
       */
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("smarttshwane_token", loginData.token);
      storage.setItem(
        "smarttshwane_user",
        JSON.stringify({
          userId: loginData.userId,
          firstname: loginData.firstname,
          lastname: loginData.lastname,
          email: loginData.email,
          role: loginData.role,
        }),
      );

      setSuccessMessage(
        `Welcome back, ${loginData.firstname}. You have been successfully signed in.`,
      );

      // Redirect to the citizen dashboard after successful login.
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        "Unable to connect to SmartTshwane. Make sure the backend API is running on port 5284.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] px-4 py-8 text-[#191c1d] md:px-8 md:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(21,101,192,0.08)] md:flex-row">
          {/* =========================================================
              BRANDING SIDE
          ========================================================= */}
          <div className="relative hidden overflow-hidden bg-[#004d99] p-8 md:flex md:w-1/2 md:flex-col md:justify-between lg:p-10">
            {/* Background pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10">
              <Image
                src="/images/smarttshwane.png"
                alt="SmartTshwane"
                width={96}
                height={96}
                className="mb-6 rounded-lg object-contain"
              />

              <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
                Welcome Back
              </h1>

              <p className="mt-4 max-w-sm text-base leading-7 text-[#a9c7ff] lg:text-lg">
                Sign in to access municipal services, track your reported
                issues, and stay connected with the City of Tshwane.
              </p>
            </div>

            {/* Security information */}
            <div className="relative z-10 mt-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <ShieldCheck size={22} className="text-white" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Secure Citizen Access
                  </p>

                  <p className="mt-0.5 text-xs text-white/70">
                    Your account is protected.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative circle */}
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#1565c0] opacity-50 blur-3xl" />
          </div>

          {/* =========================================================
              LOGIN FORM
          ========================================================= */}
          <div className="w-full p-6 sm:p-8 md:w-1/2 lg:p-10">
            {/* Mobile logo */}
            <div className="mb-6 flex justify-center md:hidden">
              <Image
                src="/images/smarttshwane.png"
                alt="SmartTshwane"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#191c1d]">
                Citizen Login
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#424752]">
                Sign in to your SmartTshwane account to continue.
              </p>
            </div>

            {/* Error */}
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

            {/* Success */}
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* =====================================================
                  EMAIL
              ===================================================== */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#191c1d]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="citizen@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-4 text-base outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                  />
                </div>
              </div>

              {/* =====================================================
                  PASSWORD
              ===================================================== */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#191c1d]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      alert("Password recovery will be implemented later.");
                    }}
                    className="text-xs font-semibold text-[#004d99] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-11 text-base outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727783] transition hover:text-[#004d99]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* =====================================================
                  REMEMBER ME
              ===================================================== */}
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    className="h-4 w-4 rounded border-[#c2c6d4] text-[#004d99] focus:ring-[#004d99]"
                  />

                  <span className="text-sm text-[#424752]">
                    Remember me
                  </span>
                </label>
              </div>

              {/* =====================================================
                  LOGIN BUTTON
              ===================================================== */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#004d99] py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1565c0] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <UserRound size={19} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e1e3e4]" />

              <span className="text-xs text-[#727783]">OR</span>

              <div className="h-px flex-1 bg-[#e1e3e4]" />
            </div>

            {/* Register */}
            <div className="text-center">
              <p className="text-sm text-[#424752]">
                Don't have a SmartTshwane account?
              </p>

              <Link
                href="/register"
                className="mt-2 inline-block font-bold text-[#004d99] hover:underline"
              >
                Create a Citizen Account →
              </Link>
            </div>

            {/* Security note */}
            <div className="mt-8 flex items-start gap-3 rounded-lg bg-[#f3f4f5] p-4">
              <Lock
                size={18}
                className="mt-0.5 shrink-0 text-[#004d99]"
              />

              <p className="text-xs leading-5 text-[#424752]">
                Never share your SmartTshwane password with anyone. Your
                account credentials are securely processed by SmartTshwane.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-6 border-t border-[#c2c6d4] pt-6 md:flex-row md:justify-between">
        <div>
          <span className="font-bold text-[#191c1d]">SmartTshwane</span>

          <p className="mt-2 max-w-xs text-xs leading-5 text-[#424752]">
            The official digital gateway for the City of Tshwane. Providing
            efficient municipal services for all citizens.
          </p>

          <p className="mt-2 text-xs text-[#424752]">
            © 2026 City of Tshwane. All rights reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#004d99]">
              Emergency
            </span>

            <a
              href="tel:107"
              className="text-xs text-[#424752] hover:text-[#004d99] hover:underline"
            >
              Emergency: 107
            </a>

            <span className="text-xs text-[#727783]">Contact Us</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#004d99]">
              Services
            </span>

            <span className="text-xs text-[#727783]">
              Water &amp; Sanitation
            </span>

            <span className="text-xs text-[#727783]">
              Energy &amp; Electricity
            </span>

            <span className="text-xs text-[#727783]">
              Roads &amp; Transport
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#004d99]">
              Legal
            </span>

            <span className="text-xs text-[#727783]">
              Privacy Policy
            </span>

            <span className="text-xs text-[#727783]">
              Citizen Charter
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}