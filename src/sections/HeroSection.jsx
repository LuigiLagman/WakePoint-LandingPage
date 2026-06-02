function HeroSection() {
  return (
    <section
      id="hero"
      className="grid min-h-[78vh] place-content-center rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-10 lg:p-16"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
        WakePoint
      </p>
      <h1 className="max-w-[11ch] text-5xl font-semibold tracking-[-0.06em] text-[#f4efe8] sm:text-6xl lg:text-8xl lg:leading-[0.92]">
        A landing page with seven sections and a sticky top navigation.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#f4efe8]/80 sm:text-lg lg:text-xl">
        The page uses uneven section sizes so the layout feels more dynamic,
        while the navbar stays visible as you scroll.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-300 px-5 font-semibold text-[#17181f] transition-transform duration-150 hover:-translate-y-0.5"
          href="#problem"
        >
          Explore layout
        </a>
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 font-semibold text-[#f4efe8] transition-transform duration-150 hover:-translate-y-0.5"
          href="#footer"
        >
          Jump to footer
        </a>
      </div>
    </section>
  );
}

export default HeroSection;