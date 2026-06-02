function ProblemSection() {
  return (
    <section
      id="problem"
      className="grid gap-4 lg:grid-cols-3 lg:items-stretch"
      aria-label="Problem section"
    >
      <article className="min-h-[18rem] rounded-[1.5rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md lg:col-span-2 lg:min-h-[24rem]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Problem
        </p>
        <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          A focused landing page needs a strong message before anything else.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#f4efe8]/76">
          This section explains the challenge or need behind the page, so the
          rest of the content has a clear reason to exist.
        </p>
      </article>

      <article className="min-h-[18rem] rounded-[1.5rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md lg:min-h-[24rem]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Why it matters
        </p>
        <div className="flex h-full flex-col justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Clear
            </h2>
            <p className="mt-2 leading-7 text-[#f4efe8]/76">
              Users should understand the value of the page within a few seconds.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-[#f4efe8]/82">
            <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
              Simple
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
              Direct
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ProblemSection;