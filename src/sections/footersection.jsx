function FooterSection() {
  return (
    <footer
      id="footer"
      className="flex min-h-[12rem] flex-col items-start justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md lg:flex-row lg:items-center"
    >
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Footer
        </p>
        <h2 className="text-2xl font-semibold text-[#f4efe8] sm:text-3xl">
          Built as a modular React landing page.
        </h2>
      </div>

      <p className="max-w-xl text-sm leading-7 text-[#f4efe8]/72">
        Each section now lives in its own file, so the structure is easy to edit,
        replace, or expand later.
      </p>
    </footer>
  );
}

export default FooterSection;