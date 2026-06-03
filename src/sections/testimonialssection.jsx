import { useEffect, useMemo, useState } from "react";
import qouteIcon from "../assets/images/qoutes.png";
import { motion } from "framer-motion";

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
  const [hoveredButton, setHoveredButton] = useState(false);
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

  const handleShareTestimonial = () => {
    console.log('Analytics: Share testimonial clicked');
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'share_testimonial',
        value: activeIndex + 1
      });
    }
    
    // Add your share logic here
    // navigator.share({ text: activeTestimonial.quote, title: 'WakePoint Testimonial' });
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
      <div className="relative mt-20 overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/10 to-transparent" />

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
          <div className="text-center">
            <motion.div 
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-[#ADCE7D] mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="w-8 h-px bg-[#ADCE7D]"></span>
              <span>Testimonials</span>
              <span className="w-8 h-px bg-[#ADCE7D]"></span>
            </motion.div>
            
            <motion.h2 
              className="mt-3 text-4xl font-bold text-[#2A3435] sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What users say about WakePoint
            </motion.h2>
            
            <motion.p 
              className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#2A3435] sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Real commuter stories from students who rely on WakePoint to stay oriented and relaxed on the road.
            </motion.p>
          </div>

          <div className="flex w-full items-center justify-between gap-3 sm:gap-5">
            <motion.button
              type="button"
              aria-label="Previous testimonial"
              onClick={goToPrevious}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#FAF9F7] text-[#2A3435] shadow-lg transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#ADCE7D]"
            >
              <span aria-hidden="true" className="text-2xl leading-none">‹</span>
            </motion.button>

            <motion.article 
              className="min-h-72 w-full max-w-3xl rounded-3xl bg-[#FAF9F7] px-6 py-8 text-[#2A3435] shadow-xl sm:px-10 sm:py-10"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              animate={{ 
                boxShadow: hoveredButton ? "0 25px 35px -12px rgba(0,0,0,0.15)" : "0 20px 25px -5px rgba(0,0,0,0.1)"
              }}
            >
              <motion.img 
                src={qouteIcon} 
                alt="" 
                className="w-8"
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.p 
                key={activeIndex}
                className="mt-8 text-2xl font-bold leading-8 sm:text-3xl sm:leading-9"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeTestimonial.quote}
              </motion.p>
              
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#2A3435]/10 pt-6">
                <div>
                  <motion.h3 
                    key={activeIndex + 'name'}
                    className="text-lg font-semibold sm:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {activeTestimonial.name}
                  </motion.h3>
                  <p className="text-base font-bold text-[#9CA1A0]/75 sm:text-lg">{activeTestimonial.role}</p>
                </div>

                <div className="hidden rounded-full bg-[#ADCE7D]/20 px-4 py-2 text-sm font-bold text-[#2A3435] sm:block">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(testimonialsCount).padStart(2, '0')}
                </div>
              </div>
            </motion.article>

            <motion.button
              type="button"
              aria-label="Next testimonial"
              onClick={goToNext}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#FAF9F7] text-[#2A3435] shadow-lg transition-colors duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#ADCE7D]"
            >
              <span aria-hidden="true" className="text-2xl leading-none">›</span>
            </motion.button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {testimonials.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.name}
                  type="button"
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ADCE7D] ${
                    isActive
                      ? 'h-14 w-14 border-[#ADCE7D] bg-[#ADCE7D] text-[#2A3435] shadow-lg scale-110'
                      : 'h-10 w-10 border-white/20 bg-[#FAF9F7] text-[#2A3435]/60 hover:border-[#ADCE7D]/50 hover:text-[#2A3435]'
                  }`}
                >
                  <span className="text-sm font-bold">
                    {String(index + 1).padStart(2, '00')}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;