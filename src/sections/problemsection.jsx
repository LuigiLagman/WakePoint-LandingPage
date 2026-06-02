import { motion } from "framer-motion";

import icon1 from "../assets/images/icon_1.png";
import icon2 from "../assets/images/icon_2.png";
import icon3 from "../assets/images/icon_3.png";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ProblemSection() {
  const cards = [
    {
      img: icon1,
      alt: "alarm icon",
      text: "Fell asleep and missed your stop?",
    },
    {
      img: icon2,
      alt: "location icon",
      text: "Unsure if you're on the right route?",
    },
    {
      img: icon3,
      alt: "compass icon",
      text: "Public transport routes can be unpredictable.",
    },
  ];

  return (
    <section id="problem" aria-label="Problem section" className="py-28 min-h-[80vh] flex flex-col justify-center bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto px-6">

        {/* CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8 lg:grid-cols-3 items-start"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={card}
              className="relative flex justify-center"
            >
              <img
                src={c.img}
                alt={c.alt}
                className="pointer-events-none absolute -top-10 left-1/2 w-24 -translate-x-1/2"
              />

              <div className="w-full min-h-[14rem] rounded-[1.25rem] bg-[#FAF9F7] p-8 pt-14 shadow-[0_-6px_12px_rgba(0,0,0,0.03),0_18px_40px_rgba(0,0,0,0.08)] border border-white/10 flex items-center justify-center text-center">
                <p className="max-w-xs text-lg font-medium leading-relaxed text-gray-800">
                  {c.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BUTTON (unchanged behavior) */}
        <div className="mt-12 flex justify-center">
          <button
            className="
              relative group cursor-pointer
              px-8 py-4 rounded-[1.1rem]

              text-[1.05rem] sm:text-[1.12rem]
              font-extrabold uppercase tracking-[0.06em]
              font-['Fredoka']
              text-[#2A3435]

              bg-gradient-to-b from-[#CFC8F3] to-[#A69DDA]

              shadow-[0_8px_0_#827FCA]

              transition-all duration-150

              active:translate-y-[3px]
              active:shadow-[0_3px_0_#827FCA]
            "
          >
            {/* glow */}
            <span
              className="
                absolute inset-0
                rounded-[1.1rem]
                bg-[#A69DDA]
                blur-xl
                opacity-0
                group-hover:opacity-60
                transition-opacity duration-300
              "
            />

            <span className="relative z-10">
              EXPLORE HOW WAKEPOINT HELPS
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProblemSection;