const featureCards = [
  {
    title: 'Intentional design',
    text: 'Use large visual blocks and smaller supporting sections for contrast.',
  },
  {
    title: 'Simple structure',
    text: 'Keep the page easy to scan while still feeling layered and complete.',
  },
  {
    title: 'Flexible content',
    text: 'The section layout is easy to swap out once your real copy is ready.',
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      className="grid gap-4 lg:grid-cols-3"
      aria-label="Feature cards"
    >
      {featureCards.map((item) => (
        <article
          className="min-h-[16rem] rounded-[1.5rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md"
          key={item.title}
        >
          <h2 className="mb-2 text-xl font-semibold text-[#f4efe8]">
            {item.title}
          </h2>
          <p className="leading-7 text-[#f4efe8]/76">{item.text}</p>
        </article>
      ))}
    </section>
  );
}

export default FeaturesSection;