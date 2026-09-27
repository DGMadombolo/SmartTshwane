"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Droplets,
  ExternalLink,
  FileText,
  Lightbulb,
  MapPin,
  Menu,
  Search,
  Trash2,
  X,
  Zap,
} from "lucide-react";

type Status = "Resolved" | "In Progress" | "Pending";

interface ServiceRequest {
  id: string;
  title: string;
  category: string;
  location: string;
  reported: string;
  status: Status;
  description: string;
  icon: "water" | "electricity" | "road" | "waste";
  timeline: {
    date: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
}

const API_BASE_URL = "http://localhost:5284";

const REQUESTS: ServiceRequest[] = [
  {
    id: "SR-2024-8891",
    title: "Burst Water Pipe - Hatfield",
    category: "Water & Sanitation",
    location: "Hatfield, Pretoria",
    reported: "Reported on Oct 12, 2024",
    status: "Resolved",
    description:
      "Burst water pipe reported in the Hatfield area requiring municipal repair.",
    icon: "water",
    timeline: [
      {
        date: "Oct 13, 2024 • 10:15 AM",
        title: "Request Resolved",
        description:
          "The reported water pipe was repaired and the service request was closed.",
        completed: true,
      },
      {
        date: "Oct 12, 2024 • 02:30 PM",
        title: "Technician Dispatched",
        description:
          "A municipal water services team was assigned to investigate the issue.",
        completed: true,
      },
      {
        date: "Oct 12, 2024 • 09:10 AM",
        title: "Report Received",
        description:
          "Your service request was successfully received by the City of Tshwane.",
        completed: true,
      },
    ],
  },
  {
    id: "SR-2024-9102",
    title: "Streetlight Outage - Brooklyn",
    category: "Electricity",
    location: "Cnr Atterbury & Justice Mahomed, Brooklyn",
    reported: "Reported on Oct 24, 2024",
    status: "In Progress",
    description:
      "Faulty streetlights along Atterbury Road causing safety concerns for night commuters.",
    icon: "electricity",
    timeline: [
      {
        date: "Nov 03, 2024 • 09:15 AM",
        title: "Technician Dispatched",
        description:
          "A specialized electrical team has been assigned to the location for inspection and bulb replacement.",
        completed: true,
      },
      {
        date: "Oct 26, 2024 • 02:30 PM",
        title: "Assessment Complete",
        description:
          "The issue was identified as a faulty transformer circuit affecting multiple light poles.",
        completed: true,
      },
      {
        date: "Oct 24, 2024 • 11:20 AM",
        title: "Report Received",
        description:
          "Your service request was successfully received by the City of Tshwane.",
        completed: true,
      },
    ],
  },
  {
    id: "SR-2024-9556",
    title: "Pothole Repair - Silver Lakes",
    category: "Roads & Transport",
    location: "Silver Lakes, Pretoria",
    reported: "Reported on Nov 01, 2024",
    status: "Pending",
    description:
      "Large pothole reported on a residential road requiring municipal road maintenance.",
    icon: "road",
    timeline: [
      {
        date: "Nov 01, 2024 • 03:45 PM",
        title: "Report Received",
        description:
          "Your service request has been received and is waiting for assessment.",
        completed: true,
      },
    ],
  },
  {
    id: "SR-2024-8210",
    title: "Illegal Dumping - Menlyn",
    category: "Waste & Refuse",
    location: "Menlyn, Pretoria",
    reported: "Reported on Sept 28, 2024",
    status: "Resolved",
    description:
      "Illegal dumping site reported for municipal waste removal and cleanup.",
    icon: "waste",
    timeline: [
      {
        date: "Sept 30, 2024 • 01:00 PM",
        title: "Request Resolved",
        description:
          "The reported dumping site was cleared by the municipal waste management team.",
        completed: true,
      },
      {
        date: "Sept 28, 2024 • 10:30 AM",
        title: "Report Received",
        description:
          "Your report was received by the City of Tshwane.",
        completed: true,
      },
    ],
  },
];

function getStatusClasses(status: Status) {
  switch (status) {
    case "Resolved":
      return "bg-[#a0f399] text-[#217128]";

    case "In Progress":
      return "bg-[#ffdf9e] text-[#644a00]";

    case "Pending":
      return "bg-[#ffdad6] text-[#93000a]";
  }
}

function getIcon(request: ServiceRequest) {
  switch (request.icon) {
    case "water":
      return <Droplets size={20} />;

    case "electricity":
      return <Zap size={20} />;

    case "road":
      return <AlertCircle size={20} />;

    case "waste":
      return <Trash2 size={20} />;
  }
}

function getIconClasses(request: ServiceRequest) {
  switch (request.icon) {
    case "water":
      return "bg-[#a0f399] text-[#217128]";

    case "electricity":
      return "bg-[#ffdf9e] text-[#644a00]";

    case "road":
      return "bg-[#ffdad6] text-[#ba1a1a]";

    case "waste":
      return "bg-[#a0f399] text-[#217128]";
  }
}

export default function TrackStatusPage() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("requestId");

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadRequests = async () => {
      setIsLoading(true);
      setLoadError("");

      const token =
        localStorage.getItem("smarttshwane_token") ??
        sessionStorage.getItem("smarttshwane_token");

      if (!token) {
        setLoadError("Your session has expired. Please log in again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/ServiceRequests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (response.status === 401 || response.status === 403) {
          throw new Error("Your session is no longer authorised. Please log in again.");
        }

        if (!response.ok) {
          throw new Error("Could not load your service requests.");
        }

        const data = await response.json();

        const mappedRequests: ServiceRequest[] = (Array.isArray(data) ? data : [])
          .map((request: any) => {
            const rawStatus = String(
              request.status?.statusname ??
                request.statusname ??
                request.status ??
                "Pending",
            ).toLowerCase();

            const status: Status = rawStatus.includes("progress")
              ? "In Progress"
              : rawStatus.includes("resolved") || rawStatus.includes("complete")
                ? "Resolved"
                : "Pending";

            const categoryName = String(
              request.category?.categoryname ??
                request.categoryname ??
                "Municipal Service",
            );

            const categoryLower = categoryName.toLowerCase();

            const icon: ServiceRequest["icon"] = categoryLower.includes("water")
              ? "water"
              : categoryLower.includes("electric")
                ? "electricity"
                : categoryLower.includes("waste") || categoryLower.includes("refuse")
                  ? "waste"
                  : "road";

            const requestId = request.requestid ?? request.requestId ?? request.id;
            const createdAt = request.createdat ?? request.createdAt;

            const reportedDate = createdAt
              ? new Date(createdAt).toLocaleString("en-ZA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "Date not available";

            return {
              id: `#TSH-${requestId}`,
              title: request.title ?? "Municipal Service Request",
              category: categoryName,
              location: request.address ?? "Location not provided",
              reported: `Reported on ${reportedDate}`,
              status,
              description:
                request.description ?? "No description was provided for this service request.",
              icon,
              timeline: [
                {
                  date: reportedDate,
                  title: "Report Received",
                  description:
                    "Your service request was successfully received by the City of Tshwane.",
                  completed: true,
                },
              ],
            };
          })
          .sort((a, b) => {
            const aNumber = Number(a.id.replace(/\D/g, ""));
            const bNumber = Number(b.id.replace(/\D/g, ""));
            return bNumber - aNumber;
          });

        if (cancelled) return;

        setRequests(mappedRequests);

        if (requestedId) {
          const requestedReference = `#TSH-${requestedId}`.toLowerCase();
          const matchingRequest = mappedRequests.find(
            (request) => request.id.toLowerCase() === requestedReference,
          );

          if (matchingRequest) {
            setSelectedRequest(matchingRequest);
            setSearch(matchingRequest.id);
            return;
          }
        }

        setSelectedRequest(mappedRequests[0] ?? null);
      } catch (error) {
        if (cancelled) return;

        setLoadError(
          error instanceof Error
            ? error.message
            : "Could not load your service requests.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadRequests();

    return () => {
      cancelled = true;
    };
  }, [requestedId]);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        searchValue.length === 0 ||
        request.id.toLowerCase().includes(searchValue) ||
        request.title.toLowerCase().includes(searchValue) ||
        request.category.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  useEffect(() => {
    if (!selectedRequest && filteredRequests.length > 0) {
      setSelectedRequest(filteredRequests[0]);
      return;
    }

    if (
      selectedRequest &&
      !filteredRequests.some((request) => request.id === selectedRequest.id)
    ) {
      setSelectedRequest(filteredRequests[0] ?? null);
    }
  }, [filteredRequests, selectedRequest]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d]">
      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[#e1e3e4] bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-8">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-[#004d99]"
          >
            SmartTshwane
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
              className="text-sm font-semibold text-[#004d99]"
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
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-[#004d99] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Citizen Dashboard
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#004d99] hover:bg-[#f3f4f5] md:hidden"
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
                className="rounded-lg bg-[#f3f4f5] px-4 py-3 text-sm font-semibold text-[#004d99]"
              >
                Track Status
              </Link>

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#424752] hover:bg-[#f3f4f5]"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <main className="mx-auto max-w-[1280px] px-4 pb-12 pt-28 md:px-8">
        {/* Header */}
        <section className="mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#004d99] hover:bg-[#e7e8e9]"
              title="Back to dashboard"
            >
              <ArrowLeft size={19} />
            </Link>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#004d99] md:text-4xl">
                Status Tracking Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#424752] md:text-base">
                Monitor your reported service requests in real-time. We are
                committed to transparency and efficient service delivery for
                all Tshwane citizens.
              </p>
            </div>
          </div>
        </section>

        {/* =======================================================
            TWO COLUMN LAYOUT
        ======================================================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* =====================================================
              LEFT
          ===================================================== */}
          <section className="lg:col-span-7">
            {/* Search */}
            <div className="rounded-xl border border-[#c2c6d4] bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727783]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by Reference ID or Category"
                    className="w-full rounded-lg border-0 bg-[#f3f4f5] py-3 pl-10 pr-4 text-sm outline-none ring-0 placeholder:text-[#727783] focus:bg-white focus:ring-2 focus:ring-[#1565c0]/20"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as "All" | Status)
                  }
                  className="rounded-lg border-0 bg-[#f3f4f5] px-4 py-3 text-sm text-[#191c1d] outline-none focus:ring-2 focus:ring-[#1565c0]/20"
                >
                  <option value="All">All Statuses</option>
                  <option value="Resolved">Resolved</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>

                <select className="rounded-lg border-0 bg-[#f3f4f5] px-4 py-3 text-sm text-[#191c1d] outline-none focus:ring-2 focus:ring-[#1565c0]/20">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last 6 Months</option>
                  <option>All Time</option>
                </select>
              </div>
            </div>

            {/* Request list */}
            <div className="mt-4 space-y-3">
              {isLoading ? (
                <div className="rounded-xl border border-[#c2c6d4] bg-white p-8 text-center">
                  <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#004d99] border-t-transparent" />
                  <h2 className="font-semibold text-[#191c1d]">
                    Loading your service requests...
                  </h2>
                </div>
              ) : loadError ? (
                <div className="rounded-xl border border-[#ffdad6] bg-white p-8 text-center">
                  <FileText
                    size={36}
                    className="mx-auto mb-3 text-[#ba1a1a]"
                  />
                  <h2 className="font-semibold text-[#191c1d]">
                    Unable to load service requests
                  </h2>
                  <p className="mt-1 text-sm text-[#424752]">{loadError}</p>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="rounded-xl border border-[#c2c6d4] bg-white p-8 text-center">
                  <FileText
                    size={36}
                    className="mx-auto mb-3 text-[#727783]"
                  />

                  <h2 className="font-semibold text-[#191c1d]">
                    No service requests found
                  </h2>

                  <p className="mt-1 text-sm text-[#424752]">
                    Try changing your search or status filter.
                  </p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <button
                    key={request.id}
                    type="button"
                    onClick={() => setSelectedRequest(request)}
                    className={`group flex w-full items-center justify-between rounded-xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      selectedRequest.id === request.id
                        ? "border-[#004d99] ring-1 ring-[#004d99]/20"
                        : "border-[#c2c6d4]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${getIconClasses(
                          request,
                        )}`}
                      >
                        {getIcon(request)}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#004d99]">
                            {request.id}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                              request.status,
                            )}`}
                          >
                            {request.status}
                          </span>
                        </div>

                        <h2 className="mt-1 text-sm font-semibold text-[#191c1d]">
                          {request.title}
                        </h2>

                        <p className="mt-1 text-xs text-[#424752]">
                          {request.reported}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={19}
                      className="shrink-0 text-[#727783] transition group-hover:translate-x-1 group-hover:text-[#004d99]"
                    />
                  </button>
                ))
              )}
            </div>
          </section>

          {/* =====================================================
              RIGHT - DETAIL
          ===================================================== */}
          <aside className="lg:col-span-5">
            {!selectedRequest ? (
              <section className="rounded-xl border border-[#c2c6d4] bg-white p-8 text-center shadow-md">
                <FileText
                  size={40}
                  className="mx-auto mb-3 text-[#727783]"
                />
                <h2 className="font-semibold text-[#191c1d]">
                  Select a service request
                </h2>
                <p className="mt-1 text-sm text-[#424752]">
                  Your request details will appear here.
                </p>
              </section>
            ) : (
            <section className="overflow-hidden rounded-xl border border-[#c2c6d4] bg-white shadow-md">
              {/* Detail header */}
              <div className="border-b border-[#e1e3e4] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#004d99]">
                      Service Request Detail
                    </p>

                    <h2 className="mt-1 font-mono text-xl font-semibold text-[#191c1d]">
                      {selectedRequest.id}
                    </h2>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                      selectedRequest.status,
                    )}`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#191c1d]">
                  {selectedRequest.description}
                </p>

                <div className="mt-4 flex items-start gap-2 text-xs text-[#424752]">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#727783]"
                  />

                  <span>{selectedRequest.location}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-5">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute bottom-4 left-[6px] top-4 w-px bg-[#c2c6d4]" />

                  <div className="space-y-6">
                    {selectedRequest.timeline.map((item, index) => (
                      <div
                        key={`${selectedRequest.id}-${index}`}
                        className="relative flex gap-4"
                      >
                        <div className="relative z-10 mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#004d99] shadow-sm" />

                        <div className="min-w-0">
                          <p className="text-[10px] font-medium text-[#727783]">
                            {item.date}
                          </p>

                          <h3 className="mt-1 text-sm font-semibold text-[#191c1d]">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-[#424752]">
                            {item.description}
                          </p>

                          {index === 0 &&
                            selectedRequest.status === "In Progress" && (
                              <div className="mt-3 rounded-lg bg-[#e7e8e9] p-3">
                                <p className="text-xs italic leading-5 text-[#424752]">
                                  &quot;Team Alpha is currently en route.
                                  Expected arrival at site within 45 minutes
                                  pending access.&quot;
                                </p>

                                <p className="mt-2 text-xs font-semibold text-[#004d99]">
                                  — Tshwane Operations
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="border-t border-[#e1e3e4] p-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#004d99] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1565c0]"
                >
                  <CircleHelp size={18} />
                  Request Assistance / Follow Up
                </button>
              </div>
            </section>
            )}
          </aside>
        </div>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-[#c2c6d4] bg-[#e1e3e4] px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <span className="text-sm font-bold text-[#191c1d]">
            SmartTshwane
          </span>

          <div className="hidden items-center gap-10 text-xs font-semibold text-[#004d99] sm:flex">
            <span>Services</span>
            <span>Support</span>
            <span>Contact</span>
          </div>

          <div className="flex items-center gap-3 text-[#004d99]">
            <span className="text-xs">© 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
}