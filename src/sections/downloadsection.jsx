function DownloadSection() {
  return (
    <section
      id="download"
      className="grid min-h-[18rem] gap-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-8"
    >
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Download
        </p>
        <h2 className="text-2xl font-semibold text-[#f4efe8] sm:text-3xl">
          Add your app file or asset link here when the final version is ready.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#f4efe8]/76">
          This section can point users to a PDF, a launch page, or any other
          resource your team wants to highlight.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-300 px-5 font-semibold text-[#17181f] transition-transform duration-150 hover:-translate-y-0.5"
          href="#footer"
        >
          Go to footer
        </a>
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 font-semibold text-[#f4efe8] transition-transform duration-150 hover:-translate-y-0.5"
          href="/"
        >
          Placeholder link
        </a>
      </div>
    </section>
  );
}

export default DownloadSection;