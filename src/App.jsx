const highlights = [
  {
    title: 'Fast setup',
    text: 'A small, modern React starter that is easy to build on.',
  },
  {
    title: 'Simple layout',
    text: 'A clean hero, value points, and one clear call to action.',
  },
  {
    title: 'Responsive by default',
    text: 'Readable on mobile and desktop without extra work.',
  },
];

function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
      <section className="grid min-h-[72vh] place-content-center rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-10 lg:p-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          WakePoint
        </p>
        <h1 className="max-w-[11ch] text-5xl font-semibold tracking-[-0.06em] text-[#f4efe8] sm:text-6xl lg:text-8xl lg:leading-[0.92]">
          Build a landing page that feels focused from the first screen.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#f4efe8]/80 sm:text-lg lg:text-xl">
          This React starter gives your group a clean base for a simple landing
          page, with room to add features later.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-300 px-5 font-semibold text-[#17181f] transition-transform duration-150 hover:-translate-y-0.5"
            href="#details"
          >
            Get started
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 font-semibold text-[#f4efe8] transition-transform duration-150 hover:-translate-y-0.5"
            href="#contact"
          >
            View contact
          </a>
        </div>
      </section>

      <section
        className="grid gap-4 lg:grid-cols-3"
        id="details"
        aria-label="Highlights"
      >
        {highlights.map((item) => (
          <article
            className="rounded-[1.5rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md"
            key={item.title}
          >
            <h2 className="mb-2 text-xl font-semibold text-[#f4efe8]">
              {item.title}
            </h2>
            <p className="leading-7 text-[#f4efe8]/76">{item.text}</p>
          </article>
        ))}
      </section>

      <section
        className="flex flex-col items-start justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md lg:flex-row lg:items-center"
        id="contact"
      >
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
            Ready to continue
          </p>
          <h2 className="text-2xl font-semibold text-[#f4efe8] sm:text-3xl">
            Now the project has a real React starting point.
          </h2>
        </div>
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f4efe8] px-5 font-semibold text-[#17181f] transition-transform duration-150 hover:-translate-y-0.5"
          href="mailto:hello@wakepoint.dev"
        >
          hello@wakepoint.dev
        </a>
      </section>
    </main>
  );
}

export default App;