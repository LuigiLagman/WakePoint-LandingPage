import { useEffect, useMemo, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsCount = testimonials.length;

  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex]
  );

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + testimonialsCount) % testimonialsCount);
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % testimonialsCount);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      }

      if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="testimonials" className="w-full" aria-label="Testimonials">
      <div className="relative mt-30 overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/10 to-transparent" />

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#ADCE7D]">
              Testimonials
            </p>
            <h2 className="mt-3 text-4xl font-bold text-[#ADCE7D] sm:text-5xl">
              What users say about WakePoint
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#ADCE7D] sm:text-lg">
              Real commuter stories from students who rely on WakePoint to stay oriented and relaxed on the road.
            </p>
          </div>

          <div className="flex w-full items-center justify-between gap-3 sm:gap-5">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={goToPrevious}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#FAF9F7] text-[#2A3435] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#ADCE7D]"
            >
              <span aria-hidden="true" className="text-2xl leading-none">‹</span>
            </button>

            <article className="min-h-72 w-full max-w-3xl rounded-3xl bg-[#FAF9F7] px-6 py-8 text-[#2A3435] shadow-xl sm:px-10 sm:py-10">
              <img src={qouteIcon} alt="" className="w-8" />
              <p className="mt-8 text-2xl font-bold leading-8 sm:text-3xl sm:leading-9">
                {activeTestimonial.quote}
              </p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#2A3435]/10 pt-6">
                <div>
                  <h3 className="text-lg font-semibold sm:text-xl">{activeTestimonial.name}</h3>
                  <p className="text-base font-bold text-[#9CA1A0]/75 sm:text-lg">{activeTestimonial.role}</p>
                </div>

                <div className="hidden rounded-full bg-[#ADCE7D]/20 px-4 py-2 text-sm font-bold text-[#2A3435] sm:block">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(testimonialsCount).padStart(2, '0')}
                </div>
              </div>
            </article>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={goToNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#FAF9F7] text-[#2A3435] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#ADCE7D]"
            >
              <span aria-hidden="true" className="text-2xl leading-none">›</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center justify-center rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ADCE7D] ${
                    isActive
                      ? 'h-14 w-14 border-[#ADCE7D] bg-[#ADCE7D] text-[#2A3435] shadow-lg scale-110'
                      : 'h-10 w-10 border-white/20 bg-[#FAF9F7] text-[#2A3435]/60 hover:border-[#ADCE7D]/50 hover:text-[#2A3435]'
                  }`}
                >
                  <span className="text-sm font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
