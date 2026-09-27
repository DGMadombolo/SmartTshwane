"use client";

import { FormEvent, useState } from "react";
import {
  Badge,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  LockKeyhole,
  Mail,
  Phone,
  User,
  UserRound,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const API_BASE_URL = "http://localhost:5284";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<"Citizen" | "Admin">(
    "Citizen",
  );

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAccountTypeChange = (type: "Citizen" | "Admin") => {
    setAccountType(type);
    setErrorMessage("");

    setIdNumber("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // Admin accounts should not be publicly created.
    if (accountType === "Admin") {
      setErrorMessage(
        "Municipal Admin accounts are provisioned separately. Please register as a Citizen.",
      );
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage(
        "Please agree to the Terms and Conditions and Privacy Policy.",
      );
      return;
    }

    // Split the full name into first name and surname.
    const nameParts = fullName.trim().split(/\s+/);

    if (nameParts.length < 2) {
      setErrorMessage("Please enter both your first name and surname.");
      return;
    }

    const firstname = nameParts[0];
    const lastname = nameParts.slice(1).join(" ");

    const registrationData = {
      firstname,
      lastname,
      email: email.trim(),
      phonenumber: phone.trim(),
      password,
      role: "Citizen",
    };

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 400) {
          setErrorMessage(
            typeof data === "string"
              ? data
              : "Registration failed. The email address may already be registered.",
          );
        } else {
          setErrorMessage(
            "Registration failed. Please check that the SmartTshwane API is running.",
          );
        }

        return;
      }

      setSuccessMessage(
        "Your SmartTshwane account has been created successfully.",
      );

      // Clear the form after successful registration.
      setFullName("");
      setIdNumber("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);

      /*
       * We will connect this to the Login page once
       * the Login page has been created.
       */
    } catch (error) {
      console.error("Registration error:", error);

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
                Empowering Every Citizen
              </h1>

              <p className="mt-4 max-w-sm text-base leading-7 text-[#a9c7ff] lg:text-lg">
                Join the SmartTshwane ecosystem. Access municipal services,
                track issues, and stay informed with a single secure account.
              </p>
            </div>

            <div className="relative z-10 mt-10">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-semibold text-white">
                    100%
                  </span>
                  <span className="mt-1 text-xs font-medium text-white/70">
                    Secure
                  </span>
                </div>

                <div className="h-12 w-px bg-white/20" />

                <div className="flex flex-col items-center">
                  <span className="text-2xl font-semibold text-white">
                    24/7
                  </span>
                  <span className="mt-1 text-xs font-medium text-white/70">
                    Access
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative circle */}
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#1565c0] opacity-50 blur-3xl" />
          </div>

          {/* =========================================================
              FORM SIDE
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
                Create Your Account
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#424752]">
                Provide your details to register as a SmartTshwane citizen.
              </p>

              {/* Account type */}
              <div className="mt-4 flex w-full max-w-sm rounded-lg bg-[#e7e8e9] p-1">
                <button
                  type="button"
                  onClick={() => handleAccountTypeChange("Citizen")}
                  className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition ${
                    accountType === "Citizen"
                      ? "bg-white text-[#004d99] shadow-sm"
                      : "text-[#424752] hover:text-[#191c1d]"
                  }`}
                >
                  Citizen
                </button>

                <button
                  type="button"
                  onClick={() => handleAccountTypeChange("Admin")}
                  className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition ${
                    accountType === "Admin"
                      ? "bg-white text-[#004d99] shadow-sm"
                      : "text-[#424752] hover:text-[#191c1d]"
                  }`}
                >
                  Municipal Admin
                </button>
              </div>
            </div>

            {/* Admin notice */}
            {accountType === "Admin" && (
              <div className="mb-6 flex gap-3 rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] p-4">
                <AlertCircle
                  className="mt-0.5 shrink-0 text-[#644a00]"
                  size={20}
                />

                <p className="text-sm leading-5 text-[#424752]">
                  Municipal Admin accounts are provisioned separately and
                  cannot be created through public registration.
                </p>
              </div>
            )}

            {/* Error */}
            {errorMessage && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#ffdad6] bg-[#fff1f0] p-4">
                <AlertCircle
                  className="mt-0.5 shrink-0 text-[#ba1a1a]"
                  size={20}
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
                  className="mt-0.5 shrink-0 text-[#1b6d24]"
                  size={20}
                />

                <div>
                  <p className="text-sm font-semibold text-[#1b6d24]">
                    Registration successful
                  </p>

                  <p className="mt-1 text-sm leading-5 text-[#424752]">
                    {successMessage}
                  </p>

                  <Link
                    href="/login"
                    className="mt-3 inline-block text-sm font-bold text-[#004d99] hover:underline"
                  >
                    Continue to Login →
                  </Link>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* =====================================================
                  FULL NAME
              ===================================================== */}
              <div className="space-y-1.5">
                <label
                  htmlFor="full_name"
                  className="text-sm font-semibold text-[#191c1d]"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />

                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-4 text-base outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                  />
                </div>
              </div>

              {/* =====================================================
                  ID / STAFF NUMBER
              ===================================================== */}
              <div className="space-y-1.5">
                <label
                  htmlFor="id_number"
                  className="text-sm font-semibold text-[#191c1d]"
                >
                  {accountType === "Admin"
                    ? "Staff Employee ID"
                    : "South African ID Number"}
                </label>

                <div className="relative">
                  <Badge
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />

                  <input
                    id="id_number"
                    name="id_number"
                    type="text"
                    value={idNumber}
                    onChange={(event) => setIdNumber(event.target.value)}
                    maxLength={accountType === "Citizen" ? 13 : undefined}
                    placeholder={
                      accountType === "Admin"
                        ? "EMP-XXXX-XXXX"
                        : "YYMMDDSSSSCAZ"
                    }
                    className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-4 text-base outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                  />
                </div>

                <p className="text-[10px] leading-4 text-[#424752]">
                  This information will be integrated into the citizen/admin
                  verification system at a later stage.
                </p>
              </div>

              {/* =====================================================
                  EMAIL + PHONE
              ===================================================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Email */}
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

                {/* Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-[#191c1d]"
                  >
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={19}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="012 345 6789"
                      autoComplete="tel"
                      required
                      className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-4 text-base outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                    />
                  </div>
                </div>
              </div>

              {/* =====================================================
                  PASSWORD + CONFIRM PASSWORD
              ===================================================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#191c1d]"
                  >
                    Password
                  </label>

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
                      autoComplete="new-password"
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

                  <p className="text-[10px] text-[#424752]">
                    Minimum 6 characters.
                  </p>
                </div>

                {/* Confirm password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="confirm_password"
                    className="text-sm font-semibold text-[#191c1d]"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                    />

                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required
                      className="w-full rounded-lg border border-[#c2c6d4] bg-[#f3f4f5] py-3 pl-10 pr-11 text-base outline-none transition focus:border-[#1565c0] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727783] transition hover:text-[#004d99]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* =====================================================
                  TERMS
              ===================================================== */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) =>
                    setTermsAccepted(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-[#c2c6d4] text-[#004d99] focus:ring-[#004d99]"
                />

                <label
                  htmlFor="terms"
                  className="text-sm leading-5 text-[#424752]"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="font-semibold text-[#004d99] hover:underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="font-semibold text-[#004d99] hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  of the City of Tshwane.
                </label>
              </div>

              {/* =====================================================
                  SUBMIT
              ===================================================== */}
              <button
                type="submit"
                disabled={loading || accountType === "Admin"}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#004d99] py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1565c0] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserRound size={19} />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#424752]">
                Already have an account?
                <Link
                  href="/login"
                  className="ml-1 font-bold text-[#004d99] hover:underline"
                >
                  Citizen Login
                </Link>
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
            © 2024 City of Tshwane. All rights reserved.
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
              Water & Sanitation
            </span>

            <span className="text-xs text-[#727783]">
              Energy & Electricity
            </span>

            <span className="text-xs text-[#727783]">
              Roads & Transport
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