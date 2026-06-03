function PrivacyPolicySection({ onBackHome }) {
  const sections = [
    {
      title: "Information we collect",
      text:
        "We collect information you choose to share with us, such as your name, email address, and any message you send through our contact form. We may also collect basic usage data to understand how visitors interact with the site.",
    },
    {
      title: "How we use it",
      text:
        "We use this information to respond to inquiries, improve the landing page experience, and maintain the performance and security of our services. We do not sell personal information.",
    },
    {
      title: "Sharing and disclosure",
      text:
        "We only share information with trusted service providers when necessary to operate the site, comply with legal obligations, or protect our rights. Any third parties are expected to handle data responsibly.",
    },
    {
      title: "Cookies and analytics",
      text:
        "We may use cookies or similar technologies to remember preferences and measure traffic. If analytics are enabled, they are used only to help us understand high-level site performance.",
    },
    {
      title: "Data retention",
      text:
        "We keep personal information only for as long as needed to provide support, meet legal requirements, or resolve disputes. When it is no longer needed, we delete or anonymize it.",
    },
    {
      title: "Your choices",
      text:
        "You may request access, correction, or deletion of your personal information by contacting us. If you do not want us to retain a message, let us know and we will review the request promptly.",
    },
  ];

  return (
    <section id="privacy" className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#FAF9F7] via-white to-[#F4F7EF]" />
      <div className="pointer-events-none absolute -top-20 left-8 h-64 w-64 rounded-full bg-[#84D716]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[#ADCE7D]/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#84D716]">
              Privacy Policy
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-[#2A3435] sm:text-5xl lg:text-6xl">
              Clear, simple, and built to respect your data.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#2A3435]/70">
              This page explains what information WakePoint collects, how we use it,
              and the choices you have. If anything is unclear, reach out and we will
              walk through it with you.
            </p>

            <div className="mt-8 rounded-3xl border border-[#2A3435]/10 bg-white/75 p-5 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2A3435]/50">
                Effective date
              </p>
              <p className="mt-2 text-lg font-medium text-[#2A3435]">June 3, 2026</p>
              <p className="mt-3 text-sm leading-6 text-[#2A3435]/65">
                We may update this policy as the product evolves. Significant changes
                will be reflected here so visitors can review the current terms.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:support@wakepoint.app?subject=Privacy%20Policy%20Question"
                className="rounded-full bg-[#84D716] px-6 py-3 text-sm font-semibold text-[#132010] transition-transform hover:-translate-y-0.5"
              >
                Contact Support
              </a>
              <button
                type="button"
                onClick={onBackHome}
                className="rounded-full border border-[#2A3435]/15 bg-white px-6 py-3 text-sm font-semibold text-[#2A3435] transition-transform hover:-translate-y-0.5"
              >
                Back to Home
              </button>
            </div>
          </div>

          <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.10)] backdrop-blur-md sm:p-8">
            <div className="grid gap-5">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-3xl border border-[#2A3435]/8 bg-[#FAF9F7]/75 p-5"
                >
                  <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#2A3435]">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#2A3435]/70">
                    {section.text}
                  </p>
                </article>
              ))}

              <article className="rounded-3xl border border-[#84D716]/20 bg-[#84D716]/8 p-5">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#2A3435]">
                  Contact us about privacy
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#2A3435]/70">
                  If you have a privacy question, want a copy of your data, or would
                  like us to remove information we hold, email support@wakepoint.app.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicySection;