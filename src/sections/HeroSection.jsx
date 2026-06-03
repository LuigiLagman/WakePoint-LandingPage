import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import pattern2 from '../assets/images/pattern_2.png';
import titleTypography from '../assets/images/title_typography.png';
// Import all mockup images
import mockup1 from '../assets/images/mockup_1.png';
import mockup2 from '../assets/images/mockup_2.png';
import mockup3 from '../assets/images/mockup_3.png';
import mockup4 from '../assets/images/mockup_4.png';
import mockup5 from '../assets/images/mockup_5.png';
import mockup6 from '../assets/images/mockup_6.png';
import phoneMockup from '../assets/images/phone_mockup.png';

// Array of mockup images to cycle through
const mockupImages = [mockup1, mockup2, mockup3, mockup4, mockup5, mockup6];

// Extracted animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const leftItem = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 1.11, 0.34, 1],
    },
  },
};

const buttonItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.21, 1.11, 0.34, 1],
    },
  },
};

// Custom hook for parallax
function useParallax(speed = 0.25) {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY * speed;
}

function HeroSection() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const parallaxY = useParallax(0.25);
  const { scrollYProgress } = useScroll();
  
  // Progressive opacity based on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cycle through images with proper crossfade (no empty gap)
  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Cycle: 0,1,2,3,4,5, then back to 0
        return (prevIndex + 1) % mockupImages.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  // Track button click for analytics
  const handleDownloadClick = () => {
    console.log('Analytics: CTA clicked in hero section');
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'download_cta_hero',
        value: 1
      });
    }
  };

  // Preload images
  useEffect(() => {
    const allImages = [...mockupImages, phoneMockup, titleTypography, pattern2];
    let loadedCount = 0;
    
    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === allImages.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === allImages.length) {
          setImagesLoaded(true);
        }
      };
    });
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
      {/* Background with parallax and subtle rotation */}
      <div
        className="absolute inset-0 bg-repeat will-change-transform"
        style={{
          backgroundImage: `url(${pattern2})`,
          transform: `translateZ(0) translateY(${parallaxY}px) rotate(${parallaxY * 0.02}deg)`,
        }}
      />

      {/* Gradient overlay - ANIMATION REMOVED (no more fade-in) */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-b
          from-transparent
          via-white/60
          to-[#FAF9F7]
        "
      />

      {/* Loading skeleton */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-12 h-12 border-4 border-[#84D716] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Main Content with scroll-based opacity */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={imagesLoaded ? "show" : "hidden"}
          className="flex w-full max-w-3xl flex-col items-center lg:items-start"
        >
          {/* LEFT - Title Typography */}
          <motion.img
            variants={leftItem}
            src={titleTypography}
            alt="Sleep on your commute - app title"
            className="w-full max-w-[620px] h-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            loading="eager"
          />

          {/* BUTTON with enhanced interactions */}
          <motion.div 
            className="relative mt-8 inline-flex"
            variants={buttonItem}
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

            <motion.a
              href="#download"
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
                rounded-xl
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
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT MOCKUP - Phone frame with seamless crossfade */}
        <motion.div
          className="relative flex w-full justify-center lg:w-auto lg:justify-end"
          initial={{ opacity: 0, x: 60, rotate: -8, scale: 0.92 }}
          animate={{
            opacity: imagesLoaded ? 1 : 0,
            x: 0,
            rotate: 3,
            scale: 1,
            transition: { 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.21, 1.11, 0.34, 1] 
            },
          }}
          whileHover={{
            scale: 1.02,
            rotate: 2,
            transition: { duration: 0.3 },
          }}
        >
          <div className="relative w-full max-w-[320px] lg:max-w-[260px]">
            {/* Screen content container with background to prevent transparency */}
            <div className="absolute inset-0 z-0 rounded-[2rem] overflow-hidden bg-[#1a1a2e]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={mockupImages[currentImageIndex]}
                  alt={`App mockup screen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: 'center',
                  }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 0.98 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeInOut"
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Phone frame image - on top of the screen content */}
            <motion.img
              src={phoneMockup}
              alt="Phone frame"
              className="relative w-full h-auto z-10 pointer-events-none"
              style={{
                filter: `drop-shadow(0 26px 40px rgba(0,0,0,0.18))`,
              }}
              animate={{
                filter: [
                  "drop-shadow(0 26px 40px rgba(0,0,0,0.18))",
                  "drop-shadow(0 32px 48px rgba(0,0,0,0.22))",
                  "drop-shadow(0 26px 40px rgba(0,0,0,0.18))",
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        onClick={() => {
          const nextSection = document.getElementById('features') || document.querySelector('section:nth-of-type(2)');
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }}
        role="button"
        aria-label="Scroll down"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && document.querySelector('section:nth-of-type(2)')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Subtle floating particles - hidden on mobile for performance */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#84D716] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, (Math.random() * 20) - 10, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default HeroSection;