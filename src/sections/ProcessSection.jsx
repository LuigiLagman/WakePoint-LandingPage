const processSteps = [
  'Define the hero message.',
  'Show the product value.',
  'Explain how it works.',
  'End with a direct action.',
];

function ProcessSection() {
  return (
    <section
      id="process"
      className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md lg:grid-cols-[1.35fr_0.85fr] lg:p-8"
    >
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Process
        </p>
        <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          A medium-sized section keeps the middle of the page from feeling empty.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#f4efe8]/76">
          This section is taller than the cards above, so the composition has
          more movement as you scroll.
        </p>
      </div>

      <ol className="grid gap-3">
        {processSteps.map((step, index) => (
          <li
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-4 text-[#f4efe8]/86"
            key={step}
          >
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-300 font-semibold text-[#17181f]">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ProcessSection;