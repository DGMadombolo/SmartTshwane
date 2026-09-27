export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Identify & Log",
      description:
        "Pinpoint the issue location on our map and upload a photo for clarity.",
    },
    {
      number: "2",
      title: "Track in Real-time",
      description:
        "Receive SMS/Email updates as your ticket moves from 'Logged' to 'In-Progress'.",
    },
    {
      number: "3",
      title: "Issue Resolved",
      description:
        "Confirm resolution and rate the service quality to help us improve.",
    },
  ];

  return (
    <section className="overflow-hidden bg-white px-4 py-16 md:px-8">
      <div className="mx-auto mb-12 w-full max-w-[1280px] text-center">
        <h2 className="text-3xl font-bold text-[var(--color-on-surface)]">
          How it Works
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-[var(--color-on-surface-variant)]">
          Getting your voice heard and issues resolved has never been simpler.
        </p>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
        {/* Desktop connector */}
        <div className="absolute left-1/4 right-1/4 top-10 hidden h-0.5 bg-[var(--color-outline-variant)] md:block" />

        {steps.map((step) => (
          <div
            key={step.number}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[var(--color-primary)] bg-white text-2xl font-semibold text-[var(--color-primary)] shadow-md transition-transform duration-300 hover:scale-110">
              {step.number}
            </div>

            <h3 className="text-xl font-semibold text-[var(--color-on-surface)]">
              {step.title}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-5 text-[var(--color-on-surface-variant)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}