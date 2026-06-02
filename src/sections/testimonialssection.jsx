const testimonials = [
  {
    name: 'Ariana',
    role: 'Product lead',
    quote:
      'The structure makes the page feel polished without getting too busy.',
  },
  {
    name: 'Marco',
    role: 'Designer',
    quote:
      'The uneven section sizes give the layout more rhythm and movement.',
  },
  {
    name: 'Nina',
    role: 'Developer',
    quote:
      'Splitting each section into its own file keeps updates straightforward.',
  },
];

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md lg:grid-cols-3 lg:p-8"
      aria-label="Testimonials"
    >
      {testimonials.map((item) => (
        <article
          className="rounded-[1.35rem] border border-white/10 bg-black/15 p-6"
          key={item.name}
        >
          <p className="text-sm leading-7 text-[#f4efe8]/82">{item.quote}</p>
          <div className="mt-5">
            <h2 className="text-lg font-semibold text-[#f4efe8]">{item.name}</h2>
            <p className="text-sm text-[#f4efe8]/65">{item.role}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default TestimonialsSection;