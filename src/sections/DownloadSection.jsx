import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import container from "../assets/images/rocket_as_one.png";
import underlineImage from "../assets/images/underline_2.svg";
import { useState, useEffect } from "react";

export default function CommuteBanner() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleDownloadClick = () => {
    console.log('Analytics: CTA clicked in commute banner');
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'download_cta_commute_banner',
        value: 1
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 1.11, 0.34, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: [0.21, 1.11, 0.34, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const rocketVariants = {
    hidden: { scale: 0.8, rotate: -10, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
        ease: [0.21, 1.11, 0.34, 1],
      },
    },
    float: {
      y: [0, -10, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const underlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: [0.21, 1.11, 0.34, 1],
      },
    },
  };

  return (
    <section 
      id="download"
      className="relative w-full scroll-mt-20"
    >
      <motion.div 
        ref={sectionRef}
        className="relative w-full my-36 overflow-visible"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={containerVariants}
          className="relative w-full overflow-visible rounded-3xl p-16 text-center"
        >
          {/* Rocket Image with floating animation */}
          <motion.img 
            src={container}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[100%] max-w-none -translate-x-1/2 -translate-y-1/2"
            variants={rocketVariants}
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02, rotate: 2 }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating particles around rocket */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#84D716] rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -60 - Math.random() * 40, 0],
                  x: [0, (Math.random() - 0.5) * 30, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-6">
            <motion.h2 
              variants={titleVariants}
              className="text-2xl md:text-4xl font-semibold text-white tracking-wide drop-shadow-sm"
            >
              Ready for{' '}
              <span className="relative inline-block">
                stress-free commuting?
                <motion.img
                  src={underlineImage}
                  alt=""
                  className="absolute left-0 -bottom-1 w-full h-1 object-cover overflow-visible"
                  variants={underlineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
              </span>
            </motion.h2>

            {/* Imitated Button from HeroSection */}
            <motion.div 
              className="relative inline-flex"
              variants={buttonVariants}
            >
              {/* Animated glow */}
              <motion.div
                className="
                  absolute inset-0
                  rounded-[1.1rem]
                  bg-[#84D716]
                  blur-2xl
                "
                animate={{ 
                  opacity: hovered ? 0.7 : 0,
                  scale: hovered ? 1.2 : 0.8,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              <motion.button
                onClick={handleDownloadClick}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onTapStart={() => setPressed(true)}
                onTap={() => setPressed(false)}
                aria-label="Download the app"
                role="button"
                className="
                  relative z-10
                  inline-flex min-h-[48px] items-center justify-center
                  rounded-[1.1rem]
                  px-10 sm:px-12

                  text-[1.05rem] sm:text-[1.12rem]
                  font-extrabold uppercase tracking-[0.06em]
                  font-['Fredoka']
                  text-[#2A3435]

                  bg-gradient-to-b from-[#DAF3B6] to-[#84D716]

                  shadow-[inset_0_2px_2px_rgba(255,255,255),0_8px_0_#6CA126,0_18px_28px_rgba(91,126,8,0.18)]

                  transition-all duration-150

                  active:translate-y-[3px]
                  active:shadow-[inset_0_2px_2px_rgba(255,255,255),0_3px_0_#6CA126,0_10px_18px_rgba(91,126,8,0.15)]

                  outline-none
                  focus:outline-none
                  focus-visible:outline-none
                  ring-0
                  focus:ring-0
                  focus-visible:ring-0

                  cursor-pointer
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.span
                  animate={{ y: hovered ? -2 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Download
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Subtle scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/40 text-xs flex items-center gap-1"
              >
                <span>↓</span>
                <span>Be A User Today!</span>
                <span>↓</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
