import qouteIcon from "../assets/images/qoutes.png";

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
  {
    name: 'Jules',
    role: 'Operations',
    quote:
      'The sideways carousel feels lighter and makes each testimonial easier to scan.',
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full" aria-label="Testimonials">
      <div className="flex gap-4 mt-30 overflow-x-auto pb-3 pr-4 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        {testimonials.map((item) => (
          <article
            className="min-w-[82%] snap-start rounded-[1.35rem] bg-[#FAF9F7] py-20 px-6 flex flex-col min-h-104"
            key={item.name}
          >
            <img
              src={qouteIcon}
              alt=""
              className="w-8"
            />
            <p className="mt-8 flex-1 text-2xl leading-7 font-bold text-[#2A3435]">
              {item.quote}
            </p>
            <div className="mt-8 pt-6">
              <h3 className="text-lg font-semibold text-[#2A3435]">{item.name}</h3>
              <p className="text-lg text-[#9CA1A0]/65">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;