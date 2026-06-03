import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import mapImg from "../assets/images/map_ss.png";
import mockup from "../assets/images/mockup_4.png";
import phoneMockup from "../assets/images/phone_mockup.png";

function ProcessSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1]);

  const steps = [
    {
      number: "01",
      title: "Set Your Destination",
      description: "Select where you're going and choose your preferred alarm distance. Save your frequent routes for quick access.",
      icon: "📍",
      color: "#84D716",
    },
    {
      number: "02",
      title: "Relax During Your Trip",
      description: "Sleep, read, watch videos, or simply enjoy the ride. WakePoint works silently in the background.",
      icon: "😌",
      color: "#ADCE7D",
    },
    {
      number: "03",
      title: "Get Alerted Automatically",
      description: "WakePoint alerts you before reaching your destination with customizable sounds and vibrations.",
      icon: "🔔",
      color: "#84D716",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 1.11, 0.34, 1] },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2, type: "spring", stiffness: 300 },
    },
  };

  const mockupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.2, type: "spring", stiffness: 200 },
    },
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-8 sm:py-12 lg:py-16 overflow-hidden rounded-3xl"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl" />
      
      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96  rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 lg:mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-[#84D716] mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-[#84D716]"></span>
            <span>How It Works</span>
            <span className="w-8 h-px bg-[#84D716]"></span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A3435] font-['Fredoka'] mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Wake up at your stop in <br />
            <span className="text-[#84D716]">three simple steps</span>
          </motion.h2>
          
          <motion.p 
            className="text-base text-[#2A3435]/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            WakePoint makes it easy to commute stress-free. Set it and forget it - we'll wake you when you arrive.
          </motion.p>
        </motion.div>

        {/* Main Content Container */}
        <div className="relative rounded-[2rem] overflow-visible">
          {/* Map Background with transparent to #145E4D at 20% opacity */}
          <motion.div
            className="absolute left-1/2 top-28 -translate-x-1/2 w-[92%] max-w-[1200px] h-[300px] sm:h-[420px] pointer-events-none rounded-[2rem] overflow-hidden z-0"
            style={{ scale: mapScale }}
          >
            <img
              src={mapImg}
              alt="Map background"
              className="h-full w-full object-cover opacity-50"
            />
            {/* Gradient overlay - transparent at top to #145E4D with 20% opacity at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#145E4D]/20" />
          </motion.div>

          {/* Phone Mockup - mockup_4.png inside phone_mockup.png */}
          <motion.div
            variants={mockupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ y: mockupY, rotate: mockupRotate }}
            className="relative z-20 flex justify-center -mt-4 mb-6 lg:-mt-6"
          >
            <div className="relative group" style={{ width: '98%', maxWidth: '280px' }}>
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-[#84D716]/30 to-[#ADCE7D]/30 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              
              {/* Container for layered images */}
              <div className="relative w-full">
                {/* Phone frame (top layer) */}
                <img 
                  src={phoneMockup} 
                  alt="Phone frame" 
                  className="relative w-full h-auto object-contain z-20"
                />
                
                {/* App screenshot (bottom layer) - positioned inside the phone screen */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[2rem] z-10">
                  <img 
                    src={mockup} 
                    alt="App interface" 
                    className="w-[98%] h-full object-cover"
                  />
                </div>
                
                {/* Screen reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[2rem] z-30" />
              </div>
            </div>
          </motion.div>

          {/* Feature Cards - With proper margins */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-20 grid gap-6 md:gap-8 lg:grid-cols-3 mt-12 lg:mt-16 px-0"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative w-full"
              >
                {/* Card glow */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-[#84D716] to-[#ADCE7D] rounded-2xl opacity-0"
                  animate={{ opacity: hoveredCard === index ? 0.3 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                
                <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E5E7EB] h-full">
                  {/* Step number */}
                  <motion.div
                    className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[#84D716] text-[#2A3435] flex items-center justify-center font-bold text-sm shadow-md"
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                      rotate: hoveredCard === index ? 360 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="text-4xl mb-4 mt-2"
                    animate={{
                      y: hoveredCard === index ? -5 : 0,
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#2A3435] font-['Fredoka'] mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#2A3435]/70 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Progress indicator for active card */}
                  {hoveredCard === index && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#84D716] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Connecting lines between cards (desktop only) */}
          <div className="hidden lg:block absolute top-[calc(50%+60px)] left-[15%] right-[15%] h-0.5 -z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#84D716]/0 via-[#84D716] to-[#84D716]/0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProcessSection;