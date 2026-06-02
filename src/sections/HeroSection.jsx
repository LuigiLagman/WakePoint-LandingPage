import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import pattern2 from '../assets/images/pattern_2.png';
import titleTypography from '../assets/images/title_typography.png';
import mockup1 from '../assets/images/mockup_1.png';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const leftItem = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const buttonItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="
        relative isolate overflow-hidden
        min-h-screen
        flex items-center
        px-5 py-10
        sm:px-8 lg:px-12
      "
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-repeat will-change-transform"
        style={{
          backgroundImage: `url(${pattern2})`,
          transform: `translateY(${scrollY * 0.25}px)`,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-b
          from-transparent
          via-white/60
          to-[#FAF9F7]
        "
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="
          relative z-10 mx-auto flex w-full max-w-6xl
          flex-col items-center gap-12
          lg:flex-row lg:justify-between lg:gap-16
        "
      >
        {/* LEFT */}
        <div className="flex w-full max-w-3xl flex-col items-center lg:items-start">
          <motion.img
            variants={leftItem}
            src={titleTypography}
            alt="Sleep on your commute"
            className="w-full max-w-[620px] h-auto"
          />

          {/* BUTTON */}
          <motion.div className="relative mt-8 inline-flex">
            {/* Glow */}
            <motion.div
              className="
                absolute inset-0
                rounded-[1.1rem]
                bg-[#84D716]
                blur-2xl
                scale-110
              "
              animate={{ opacity: hovered ? 0.55 : 0 }}
              transition={{ duration: 0.35 }}
            />

            <motion.a
              variants={buttonItem}
              href="#"
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              className="
                relative z-10
                inline-flex min-h-14 items-center justify-center
                rounded-[1.1rem]
                px-10 sm:px-12

                text-[1.05rem] sm:text-[1.12rem]
                font-extrabold uppercase tracking-[0.06em]
                font-['Fredoka']
                text-[#2A3435]

                bg-gradient-to-b from-[#DAF3B6] to-[#84D716]

                shadow-[0_8px_0_#6CA126,0_18px_28px_rgba(91,126,8,0.18)]

                transition-all duration-150

                active:translate-y-[3px]
                active:shadow-[0_3px_0_#6CA126,0_10px_18px_rgba(91,126,8,0.15)]
              "
            >
              Download
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT MOCKUP */}
        <motion.div
          className="flex w-full justify-center lg:w-auto lg:justify-end"
          initial={{ opacity: 0, x: 40, rotate: -6, scale: 0.96 }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: 3,
            scale: 1,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          whileInView={{
            x: [0, -8, 8, -6, 6, -3, 3, 0],
            rotate: [3, 3.5, 2.5, 3.8, 2.8, 3.2, 3],
            transition: { delay: 0.95, duration: 0.55, ease: 'easeInOut' },
          }}
          viewport={{ once: true }}
        >
          <img
            src={mockup1}
            alt="app mockup"
            className="w-full max-w-[350px] lg:max-w-[280px] drop-shadow-[0_26px_40px_rgba(0,0,0,0.18)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;