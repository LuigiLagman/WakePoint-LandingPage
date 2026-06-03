import qouteIcon from "../assets/images/qoutes.png";

const testimonials = [
  {
    name: 'Chloe Bersales',
    role: 'Student',
    quote:
      'I no longer worry about missing my stop after class, even if I fall asleep during my commute.',
  },
  {
    name: 'Marc Chester Perez',
    role: 'Student',
    quote:
      'I can finally nap during my commute without constantly checking my phone.',
  },
  {
    name: 'Gabriel Ian Santos',
    role: 'Student',
    quote:
      'The route deviation alert helped me notice I boarded the wrong jeep.',
  },
  {
    name: 'Luigi Lagman',
    role: 'Student',
    quote:
      'As someone unfamiliar with Manila routes, WakePoint gave me peace of mind during my trip.',
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full" aria-label="Testimonials">
      <div className="flex gap-4 mt-30 overflow-x-auto pb-3 pr-4 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        {testimonials.map((item) => (
          <article
            className="min-w-[30%] snap-start rounded-[1.35rem] bg-[#FAF9F7] py-8 px-6 flex flex-col"
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
            <div className="mt-4 pt-6">
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