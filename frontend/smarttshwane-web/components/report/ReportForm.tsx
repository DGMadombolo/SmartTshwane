"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle,
  Droplet,
  Info,
  Lightbulb,
  LocateFixed,
  MapPin,
  Minus,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Trash2,
  User,
  Wrench,
  Zap,
  AlertTriangle,
  Gauge,
  Waves,
  Edit3,
  ShieldAlert,
  Save,
  X,
} from "lucide-react";

const STEPS = [
  { step: 1, title: "Category" },
  { step: 2, title: "Details" },
  { step: 3, title: "Location" },
  { step: 4, title: "Contact" },
];

const CATEGORIES = [
  { id: "potholes", label: "Potholes", icon: Wrench },
  { id: "water_leaks", label: "Water Leaks", icon: Droplet },
  { id: "street_lights", label: "Street Lights", icon: Lightbulb },
  { id: "waste_refuse", label: "Waste & Refuse", icon: Trash2 },
  { id: "electricity_outage", label: "Electricity Outage", icon: Zap },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const WATER_ISSUES = [
  {
    id: "burst_main",
    title: "Burst Main Pipe",
    description: "Roadway / sidewalk flood",
    icon: Waves,
  },
  {
    id: "leaking_meter",
    title: "Leaking Water Meter",
    description: "Boundary box leak",
    icon: Gauge,
  },
  {
    id: "low_pressure",
    title: "Low Pressure / Outage",
    description: "Entire neighborhood tap trickle",
    icon: ArrowDownIcon,
  },
  {
    id: "sewage_overflow",
    title: "Sewage Overflow",
    description: "Manhole effluent discharge",
    icon: AlertTriangle,
  },
];

const SEVERITIES = [
  {
    id: "low",
    label: "Low",
    title: "Trickle / Minor Seepage",
    description:
      "Continuous slow drip or localized damp spot without ponding water or erosion.",
  },
  {
    id: "medium",
    label: "Medium",
    title: "Steady Flow / Disruption",
    description:
      "Visible stream along curb, reduced household pressure, water puddling.",
  },
  {
    id: "high",
    label: "High / Emergency",
    title: "Gushing / Structural Threat",
    description:
      "Flooding homes, eroding roadway tarmac, sinkhole risk, or electrical hazard nearby.",
  },
];

function ArrowDownIcon({ className }: { className?: string }) {
  return <ArrowRight className={`${className ?? ""} rotate-90`} />;
}

export default function ReportForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("water_leaks");

  const [selectedIssue, setSelectedIssue] = useState("burst_main");
  const [severity, setSeverity] = useState("high");
  const [issueTitle, setIssueTitle] = useState(
    "High-pressure pipe burst flooding driveway and tarmac on Francis Baard St",
  );
  const [description, setDescription] = useState(
    "Water has been spewing forcefully since approx 06:15 AM from under the sidewalk paving. Soil is actively eroding, and water is beginning to pool against the perimeter brick wall.",
  );

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [location, setLocation] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  const selectedCategoryDetails = useMemo(
    () => CATEGORIES.find((category) => category.id === selectedCategory),
    [selectedCategory],
  );

  const selectedIssueDetails = useMemo(
    () => WATER_ISSUES.find((issue) => issue.id === selectedIssue),
    [selectedIssue],
  );

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const nextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleContinue = () => {
    setFormError("");

    if (currentStep === 1) {
      nextStep();
      return;
    }

    if (currentStep === 2) {
      if (!selectedIssue) {
        setFormError("Please select an issue classification.");
        return;
      }

      if (!severity) {
        setFormError("Please select an urgency and severity level.");
        return;
      }

      if (!issueTitle.trim()) {
        setFormError("Please enter a short issue summary.");
        return;
      }

      if (description.trim().length < 10) {
        setFormError("Please provide at least 10 characters in the detailed description.");
        return;
      }

      nextStep();
      return;
    }

    if (currentStep === 3) {
      if (!location.trim()) {
        setFormError("Please enter the issue location before continuing.");
        return;
      }

      nextStep();
    }
  };

  const handleImageSelection = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    setSelectedImages((current) => [...current, ...files].slice(0, 4));
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setSelectedImages((current) =>
      current.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setFormError("Please enter your phone number.");
      return;
    }

    if (!email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }

    if (!consent) {
      setFormError("Please agree to receive status updates before submitting.");
      return;
    }

    setShowSuccess(true);
  };

  const saveDraft = () => {
    const draft = {
      currentStep,
      selectedCategory,
      selectedIssue,
      severity,
      issueTitle,
      description,
      location,
      fullName,
      phone,
      email,
      consent,
    };

    localStorage.setItem("smarttshwane-report-draft", JSON.stringify(draft));
    setDraftSaved(true);
    window.setTimeout(() => setDraftSaved(false), 2500);
  };

  const useCurrentLocation = () => {
    setFormError("");

    if (!navigator.geolocation) {
      setFormError("Your browser does not support location services.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation(
          `Current location (${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)})`,
        );
      },
      () => {
        setFormError(
          "We could not access your current location. Please enter the address manually.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const changeCategory = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="mx-auto w-full max-w-4xl">
        {/* Stepper */}
        <div className="mb-8 w-full">
          <div className="mx-auto mb-4 flex max-w-3xl items-center justify-between px-2">
            {STEPS.map((item, index) => {
              const completed = item.step < currentStep;
              const active = item.step === currentStep;

              return (
                <div key={item.step} className="flex flex-1 items-center">
                  <div
                    className={`flex items-center gap-3 ${
                      item.step === STEPS.length ? "" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (item.step < currentStep) {
                          setCurrentStep(item.step);
                        }
                      }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm transition ${
                        completed
                          ? "bg-[var(--color-secondary)] text-white"
                          : active
                            ? "bg-[var(--color-primary)] text-white ring-4 ring-[var(--color-primary-fixed)]"
                            : "bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface-variant)]"
                      }`}
                    >
                      {completed ? <Check className="h-4 w-4" /> : item.step}
                    </button>

                    <div className="hidden sm:flex flex-col">
                      <span
                        className={`text-xs font-semibold ${
                          completed
                            ? "text-[var(--color-secondary)]"
                            : active
                              ? "text-[var(--color-primary)]"
                              : "text-[var(--color-on-surface-variant)]"
                        }`}
                      >
                        Step {item.step}
                      </span>
                      <span
                        className={`text-sm ${
                          active
                            ? "font-bold text-[var(--color-primary)]"
                            : completed
                              ? "text-[var(--color-secondary)]"
                              : "text-[var(--color-on-surface-variant)]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </div>

                  {index < STEPS.length - 1 && (
                    <div
                      className={`mx-3 h-1 flex-1 rounded-full sm:mx-6 ${
                        item.step < currentStep
                          ? "bg-[var(--color-secondary)]"
                          : "bg-[var(--color-surface-container-highest)]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-[var(--color-surface-container-highest)]">
            <div
              className="h-full bg-[var(--color-primary)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Selected category context */}
        {currentStep > 1 && (
          <div className="mx-auto mb-6 flex w-full flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--color-surface-container-low)] px-5 py-3.5 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-fixed)] text-[var(--color-primary)]">
                {selectedCategoryDetails &&
                  (() => {
                    const Icon = selectedCategoryDetails.icon;
                    return <Icon className="h-4 w-4" />;
                  })()}
              </div>

              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--color-on-surface-variant)]">
                  Selected Category:
                </span>

                <span className="truncate text-sm font-semibold text-[var(--color-on-surface)]">
                  {selectedCategoryDetails?.label}
                </span>

                {selectedIssueDetails && currentStep > 1 && (
                  <span className="rounded-full bg-[var(--color-primary-fixed)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-primary)]">
                    {selectedIssueDetails.title}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={changeCategory}
              className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              Change Category
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
        )}

        {formError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error-container)] px-4 py-3 text-sm text-[var(--color-on-error-container)]"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Step 1 */}
        {currentStep === 1 && (
          <section className="rounded-xl bg-white p-6 shadow-md sm:p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Service Category
              </span>
              <h2 className="mt-1 text-3xl font-bold text-[var(--color-on-surface)]">
                What would you like to report?
              </h2>
              <p className="mt-2 text-base leading-6 text-[var(--color-on-surface-variant)]">
                Select the municipal service category that best matches the
                issue you are experiencing.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const selected = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative flex min-h-[150px] flex-col items-center justify-center rounded-xl border p-6 text-center transition-all ${
                      selected
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-fixed)]/50 ring-2 ring-[var(--color-primary)]/20 shadow-md"
                        : "border-[var(--color-outline-variant)] bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-container-low)]"
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    )}

                    <Icon
                      className={`mb-4 h-9 w-9 ${
                        selected
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-primary)]/80"
                      }`}
                    />

                    <span className="text-sm font-semibold text-[var(--color-on-surface)] md:text-base">
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex justify-end border-t border-[var(--color-outline-variant)] pt-6">
              <button
                type="button"
                onClick={handleContinue}
                className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[var(--color-primary-container)] hover:shadow-lg active:scale-95"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <section className="mb-8 rounded-xl bg-white p-6 shadow-md sm:p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Incident Specification
              </span>

              <h1 className="mt-1 text-3xl font-bold text-[var(--color-on-surface)]">
                Describe the {selectedCategoryDetails?.label ?? "Municipal"} Issue
              </h1>

              <p className="mt-2 text-base leading-6 text-[var(--color-on-surface-variant)]">
                Provide exact specifics and visible characteristics so the
                relevant Tshwane team can understand and respond to the issue.
              </p>
            </div>

            <form
              id="details-form"
              className="space-y-8"
              onSubmit={(event) => {
                event.preventDefault();
                handleContinue();
              }}
            >
              {/* Issue classification */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-[var(--color-on-surface)]">
                  Specific Issue Classification{" "}
                  <span className="text-[var(--color-error)]">*</span>
                </label>

                {selectedCategory === "water_leaks" ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {WATER_ISSUES.map((issue) => {
                      const Icon = issue.icon;
                      const selected = selectedIssue === issue.id;

                      return (
                        <button
                          key={issue.id}
                          type="button"
                          onClick={() => setSelectedIssue(issue.id)}
                          className={`flex items-start gap-3 rounded-lg p-3.5 text-left transition-all ${
                            selected
                              ? "bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] ring-2 ring-[var(--color-primary)]"
                              : "bg-[var(--color-surface-container)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-high)]"
                          }`}
                        >
                          <Icon
                            className={`mt-0.5 h-5 w-5 shrink-0 ${
                              selected
                                ? "text-[var(--color-primary)]"
                                : "text-[var(--color-on-surface-variant)]"
                            }`}
                          />

                          <div className="min-w-0">
                            <span className="block truncate text-sm font-semibold">
                              {issue.title}
                            </span>
                            <span className="block truncate text-sm text-[var(--color-on-surface-variant)]">
                              {issue.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl bg-[var(--color-surface-container-low)] p-4 text-sm text-[var(--color-on-surface-variant)]">
                    Select the issue classification that best describes the
                    reported {selectedCategoryDetails?.label.toLowerCase()}.
                  </div>
                )}
              </div>

              {/* Severity */}
              <div>
                <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <label className="text-sm font-semibold text-[var(--color-on-surface)]">
                    Urgency &amp; Severity Level{" "}
                    <span className="text-[var(--color-error)]">*</span>
                  </label>
                  <span className="text-sm text-[var(--color-on-surface-variant)]">
                    Select realistic severity for dispatch prioritization
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {SEVERITIES.map((item) => {
                    const selected = severity === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSeverity(item.id)}
                        className={`flex cursor-pointer flex-col justify-between rounded-xl p-4 text-left transition-all ${
                          selected && item.id === "high"
                            ? "bg-[var(--color-error-container)] text-[var(--color-on-error-container)] ring-2 ring-[var(--color-error)] shadow-md"
                            : selected
                              ? "bg-[var(--color-primary-fixed)] ring-2 ring-[var(--color-primary)] shadow-sm"
                              : "bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)]"
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                              item.id === "low"
                                ? "bg-[var(--color-secondary-container)] text-[var(--color-secondary)]"
                                : item.id === "medium"
                                  ? "bg-[var(--color-tertiary-fixed)] text-[var(--color-tertiary)]"
                                  : "bg-[var(--color-error)] text-white"
                            }`}
                          >
                            {item.label}
                          </span>

                          {selected ? (
                            <CheckCircle
                              className={`h-5 w-5 ${
                                item.id === "high"
                                  ? "text-[var(--color-error)]"
                                  : "text-[var(--color-primary)]"
                              }`}
                            />
                          ) : (
                            <ShieldAlert className="h-5 w-5 text-[var(--color-outline)]" />
                          )}
                        </div>

                        <h4 className="mb-1 text-sm font-bold">
                          {item.title}
                        </h4>

                        <p
                          className={`text-sm leading-5 ${
                            selected && item.id === "high"
                              ? "text-[var(--color-on-error-container)]"
                              : "text-[var(--color-on-surface-variant)]"
                          }`}
                        >
                          {item.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Issue title */}
              <div>
                <label
                  htmlFor="issue-title"
                  className="mb-2 block text-sm font-semibold text-[var(--color-on-surface)]"
                >
                  Issue Summary{" "}
                  <span className="text-[var(--color-error)]">*</span>
                </label>

                <input
                  id="issue-title"
                  value={issueTitle}
                  onChange={(event) => setIssueTitle(event.target.value)}
                  placeholder="Briefly summarize the issue"
                  type="text"
                  className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-white px-4 py-3 text-base outline-none shadow-sm transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

                <p className="mt-1.5 text-sm text-[var(--color-on-surface-variant)]">
                  A succinct one-line summary displayed on municipal work
                  orders.
                </p>
              </div>

              {/* Description */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="issue-description"
                    className="text-sm font-semibold text-[var(--color-on-surface)]"
                  >
                    Detailed Description{" "}
                    <span className="text-[var(--color-error)]">*</span>
                  </label>

                  <span className="text-xs font-medium text-[var(--color-on-surface-variant)]">
                    {description.length} / 500
                  </span>
                </div>

                <textarea
                  id="issue-description"
                  value={description}
                  maxLength={500}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the severity, duration, and any property danger..."
                  rows={5}
                  className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-white p-4 text-base leading-relaxed outline-none shadow-sm transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

                <div className="mt-2 flex items-center gap-2 text-[var(--color-on-surface-variant)]">
                  <Info className="h-4 w-4 text-[var(--color-primary)]" />
                  <span className="text-sm">
                    Include useful details such as duration, visible damage,
                    flooding, or safety risks.
                  </span>
                </div>
              </div>

              {/* Photos */}
              <div>
                <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <label className="text-sm font-semibold text-[var(--color-on-surface)]">
                    Visual Evidence &amp; Photos
                  </label>

                  <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-secondary)]">
                    <LocateFixed className="h-4 w-4" />
                    Geotagged photos can help pinpoint location
                  </span>
                </div>

                <label className="block cursor-pointer">
                  <input
                    accept="image/*,video/*"
                    className="hidden"
                    multiple
                    type="file"
                    onChange={handleImageSelection}
                  />

                  <div className="group rounded-xl bg-[var(--color-surface-container-low)] p-6 text-center transition-colors hover:bg-[var(--color-surface-container)]">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-fixed)] text-[var(--color-primary)] transition-transform group-hover:scale-105">
                      <Camera className="h-7 w-7" />
                    </div>

                    <p className="mb-1 text-sm font-semibold text-[var(--color-on-surface)]">
                      <span className="font-bold text-[var(--color-primary)] underline">
                        Click to upload photos
                      </span>{" "}
                      or drag &amp; drop files here
                    </p>

                    <p className="text-sm text-[var(--color-on-surface-variant)]">
                      Supports images and video up to 15MB each (Max 4 files).
                    </p>
                  </div>
                </label>

                {selectedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {selectedImages.map((file, index) => (
                      <div
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-[var(--color-surface-container)] shadow-sm"
                      >
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center p-4 text-center text-sm font-semibold text-[var(--color-on-surface-variant)]">
                            {file.name}
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1.5 text-xs text-white">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate">{file.name}</span>
                            <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[var(--color-secondary-fixed)]" />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          aria-label={`Remove ${file.name}`}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--color-error)] shadow-sm transition hover:bg-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    {selectedImages.length < 4 && (
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl bg-[var(--color-surface-container-low)] p-4 text-center transition hover:bg-[var(--color-surface-container)]">
                        <input
                          accept="image/*,video/*"
                          className="hidden"
                          multiple
                          type="file"
                          onChange={handleImageSelection}
                        />
                        <Plus className="mb-1 h-6 w-6 text-[var(--color-on-surface-variant)]" />
                        <span className="text-xs text-[var(--color-on-surface-variant)]">
                          Add Angle
                        </span>
                      </label>
                    )}

                    <div className="rounded-xl bg-[var(--color-surface-container-high)] p-3.5">
                      <div className="flex items-center gap-1.5 text-[var(--color-primary)]">
                        <Lightbulb className="h-4 w-4" />
                        <span className="text-xs font-bold">Pro Tip</span>
                      </div>
                      <p className="mt-3 text-sm leading-5 text-[var(--color-on-surface-variant)]">
                        Take one close photo of the issue and one wide photo
                        showing surrounding landmarks.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-[var(--color-outline-variant)] pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={previousStep}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-surface-container)] px-6 py-3 text-sm font-semibold text-[var(--color-on-surface-variant)] transition hover:bg-[var(--color-surface-container-high)] sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Category
                </button>

                <div className="flex w-full items-center gap-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="hidden rounded-lg px-4 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-surface-container-low)] sm:inline-flex"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {draftSaved ? "Draft Saved" : "Save Draft"}
                  </button>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[var(--color-primary-container)] hover:shadow-lg active:scale-95 sm:w-auto"
                  >
                    Continue to Location
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <section className="mb-8 rounded-xl bg-white p-6 shadow-md sm:p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Location
              </span>
              <h2 className="mt-1 text-3xl font-bold text-[var(--color-on-surface)]">
                Where is the issue?
              </h2>
              <p className="mt-2 text-base leading-6 text-[var(--color-on-surface-variant)]">
                Search for the address or landmark where the municipal issue
                is located.
              </p>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-outline)]" />
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  type="text"
                  placeholder="Enter street address or landmark"
                  className="w-full rounded-xl border border-[var(--color-outline-variant)] bg-white py-3 pl-12 pr-4 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
              </div>

              <div className="relative h-80 overflow-hidden rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-high)]">
                <div
                  className="absolute inset-0 opacity-40 transition-transform duration-200"
                  style={{
                    transform: `scale(${mapZoom})`,
                    backgroundImage: `
                      linear-gradient(
                        to right,
                        rgba(66,71,82,0.15) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        to bottom,
                        rgba(66,71,82,0.15) 1px,
                        transparent 1px
                      )
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                <div className="absolute left-0 top-1/2 h-8 w-full -rotate-6 bg-white/80" />
                <div className="absolute left-1/4 top-0 h-full w-7 rotate-12 bg-white/80" />
                <div className="absolute right-1/4 top-0 h-full w-5 -rotate-6 bg-white/80" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-14 w-14 fill-[var(--color-primary)] text-[var(--color-primary)] drop-shadow-lg" />
                </div>

                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[var(--color-primary)] shadow-md transition hover:bg-[var(--color-primary-fixed)]"
                    aria-label="Use current location"
                  >
                    <LocateFixed className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setMapZoom((zoom) => Math.min(1.5, zoom + 0.1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[var(--color-primary)] shadow-md transition hover:bg-[var(--color-primary-fixed)]"
                    aria-label="Zoom in"
                  >
                    <Plus className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setMapZoom((zoom) => Math.max(0.8, zoom - 0.1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[var(--color-primary)] shadow-md transition hover:bg-[var(--color-primary-fixed)]"
                    aria-label="Zoom out"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="flex items-center gap-2 text-sm text-[var(--color-on-surface-variant)]">
                <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                Enter an address above to identify the exact location of the
                issue.
              </p>
            </div>

            <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-[var(--color-outline-variant)] pt-6 sm:flex-row">
              <button
                type="button"
                onClick={previousStep}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-surface-container)] px-6 py-3 text-sm font-semibold text-[var(--color-on-surface-variant)] transition hover:bg-[var(--color-surface-container-high)] sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--color-primary-container)] hover:shadow-lg active:scale-95 sm:w-auto"
              >
                Continue to Contact
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <section className="mb-8 rounded-xl bg-white p-6 shadow-md sm:p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Contact Details
              </span>
              <h2 className="mt-1 text-3xl font-bold text-[var(--color-on-surface)]">
                How can we reach you?
              </h2>
              <p className="mt-2 text-base leading-6 text-[var(--color-on-surface-variant)]">
                We will use these details to provide updates about your
                municipal report.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-[var(--color-on-surface)]"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-outline)]" />
                    <input
                      id="fullName"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-[var(--color-outline-variant)] py-3 pl-11 pr-4 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[var(--color-on-surface)]"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    type="tel"
                    placeholder="+27 00 000 0000"
                    className="w-full rounded-xl border border-[var(--color-outline-variant)] p-3 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[var(--color-on-surface)]"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-[var(--color-outline-variant)] p-3 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-xl bg-[var(--color-surface-container)] p-4">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
                />

                <span className="text-sm leading-5 text-[var(--color-on-surface-variant)]">
                  I agree to receive automated status updates regarding this
                  report via email and SMS. I understand that my data will be
                  handled in accordance with the City&apos;s Privacy Policy.
                </span>
              </label>

              <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-[var(--color-outline-variant)] pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={previousStep}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-surface-container)] px-6 py-3 text-sm font-semibold text-[var(--color-on-surface-variant)] transition hover:bg-[var(--color-surface-container-high)] sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Location
                </button>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-secondary)] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-95 hover:shadow-lg active:scale-95 sm:w-auto"
                >
                  Submit Report
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Operational advisory */}
        {currentStep > 1 && selectedCategory === "water_leaks" && (
          <div className="mb-4 flex items-start gap-4 rounded-xl bg-[var(--color-surface-container-high)] p-5 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-container-highest)] text-[var(--color-primary)]">
              <ShieldAlert className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-[var(--color-on-surface)]">
                Tshwane Water Operations Desk
              </h3>
              <p className="mt-0.5 text-sm leading-5 text-[var(--color-on-surface-variant)]">
                Major water issues can be prioritised according to their
                severity, location, and potential impact on property or public
                infrastructure.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close success dialog"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          />

          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-secondary-container)] text-[var(--color-secondary)]">
              <CheckCircle className="h-12 w-12" />
            </div>

            <h3 className="mb-2 text-2xl font-semibold text-[var(--color-on-surface)]">
              Report Submitted!
            </h3>

            <p className="mb-8 text-base leading-6 text-[var(--color-on-surface-variant)]">
              Thank you for reporting this issue. Your reference number is{" "}
              <span className="font-bold text-[var(--color-primary)]">
                #TSH-49201
              </span>
              . We will notify you once a technician has been dispatched.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="w-full rounded-lg bg-[var(--color-primary)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-container)]"
            >
              Track This Issue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
