import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import icon1 from "../assets/images/icon_1.png";
import icon2 from "../assets/images/icon_2.png";
import icon3 from "../assets/images/icon_3.png";

// Animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 1.11, 0.34, 1],
    },
  },
};

const iconHover = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -8,
    scale: 1.05,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
};

function ProblemSection({ onTriggerFeatures }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleExploreClick = () => {
    console.log('Analytics: Explore button clicked in problem section');
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'explore_problems_cta',
        value: 1
      });
    }
    
    if (onTriggerFeatures) {
      onTriggerFeatures();
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cards = [
    {
      img: icon1,
      alt: "Alarm clock icon",
      text: "Fell asleep and missed your stop?",
      glowColor: "#A69DDA",
    },
    {
      img: icon2,
      alt: "Location pin icon",
      text: "Worried about getting off at the wrong station?",
      glowColor: "#8EC8D8",
    },
    {
      img: icon3,
      alt: "Compass icon",
      text: "Constantly checking your phone for directions?",
      glowColor: "#DAA69D",
    },
  ];

  return (
    <section
      id="problem"
      aria-label="Problem section"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-[#A69DDA] mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-[#A69DDA]"></span>
            <span>THE PROBLEM</span>
            <span className="w-8 h-px bg-[#A69DDA]"></span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A3435] font-['Fredoka']"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Waking up at the wrong stop <br />
            <span className="text-[#A69DDA]">isn't fun</span>
          </motion.h2>
        </motion.div>

        {/* CARDS - taller */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:gap-8 lg:grid-cols-3 items-stretch"
        >
          {cards.map((cardData, i) => (
            <motion.div
              key={i}
              variants={card}
              className="relative flex justify-center"
              onHoverStart={() => !isMobile && setHoveredCard(i)}
              onHoverEnd={() => !isMobile && setHoveredCard(null)}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-2 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: cardData.glowColor }}
                animate={{ 
                  opacity: hoveredCard === i ? 0.1 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Icon */}
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 z-10"
                variants={iconHover}
                initial="rest"
                animate={hoveredCard === i ? "hover" : "rest"}
              >
                <img
                  src={cardData.img}
                  alt={cardData.alt}
                  className="w-14 h-14 object-contain"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                className="relative w-full rounded-xl bg-[#FAF9F7] p-6 pt-12 shadow-sm cursor-pointer group hover:shadow-md transition-shadow duration-200 min-h-[160px] flex items-center"
                onClick={() => {
                  console.log(`Card ${i + 1} clicked: ${cardData.text}`);
                }}
                role="button"
                tabIndex={0}
              >
                <p className="text-center text-base font-semibold leading-relaxed text-[#2A3435] px-2 w-full">
                  {cardData.text}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="mt-10 lg:mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.button
            onClick={handleExploreClick}
            className="
              relative group cursor-pointer
              px-6 py-3 rounded-xl
              min-h-[44px]

              text-sm sm:text-base
              font-extrabold uppercase tracking-[0.08em]
              font-['Fredoka']
              text-[#2A3435]

              bg-gradient-to-b from-[#CFC8F3] to-[#A69DDA]

              shadow-[inset_0_1px_1px_rgba(255,255,255),0_6px_0_#827FCA]

              transition-all duration-150

              active:translate-y-[2px]
              active:shadow-[inset_0_1px_1px_rgba(255,255,255),0_3px_0_#827FCA]

              outline-none
              focus:outline-none
              ring-0
              focus:ring-0
            "
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="See how WakePoint works"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>SEE HOW IT WORKS</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  repeatDelay: 0.8
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Trust indicator */}
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="text-[#A69DDA]">✓</span>
              <span>GPS-precise</span>
            </span>
            <span className="hidden sm:inline w-0.5 h-0.5 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <span className="text-[#A69DDA]">✓</span>
              <span>Wake up on time</span>
            </span>
            <span className="hidden sm:inline w-0.5 h-0.5 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <span className="text-[#A69DDA]">✓</span>
              <span>Powered by Mapbox</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemSection;