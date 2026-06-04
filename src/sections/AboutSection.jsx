// sections/AboutSection.jsx
import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
// Import the favicon image
import favicon from "../assets/images/favicon.png"; // Adjust this path based on your actual file location

function AboutSection({ onBackHome }) {
  const [hoveredPartner, setHoveredPartner] = useState(null);
  
  // Updated stats with lower beta tester count
  const stats = [
    { value: "200+", label: "Beta Users", icon: "👥", delay: 0 },
    { value: "30+", label: "Daily Commuters", icon: "🚆", delay: 0.1 },
    { value: "500+", label: "Trips Tracked", icon: "📊", delay: 0.2 },
    { value: "95%", label: "Accuracy Rate", icon: "🎯", delay: 0.3 },
    { value: "24/7", label: "Development", icon: "💻", delay: 0.4 },
    { value: "PUP", label: "University", icon: "🎓", delay: 0.5 }
  ];

  // Updated milestones with actual project timeline
  const milestones = [
    { year: "Jan 2024", title: "Project Conception", description: "Team formed under PUP College of Computer and Information Sciences", icon: "💡" },
    { year: "Mar 2024", title: "Research & Planning", description: "Conducted commuter behavior studies in Metro Manila", icon: "📚" },
    { year: "Jun 2024", title: "Development Started", description: "Initial prototype development with GPS integration", icon: "⚡" },
    { year: "Oct 2024", title: "Beta Testing", description: "Released beta version to commuter testers", icon: "📱" },
    { year: "Feb 2025", title: "Route Optimization", description: "Implemented advanced geofencing algorithms", icon: "🎯" },
    { year: "2025", title: "Full Launch", description: "Official release for Android commuters", icon: "🚀" }
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const controls = {
    fadeInUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    },
    scaleOnHover: {
      whileHover: { scale: 1.05, transition: { duration: 0.2 } }
    }
  };

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#FAF9F7] via-white to-[#F6F4EE]" />
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#84D716]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-[#ADCE7D]/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#84D716]/5 blur-3xl" />

      {/* Main Container - Added padding-top to prevent navbar overlap */}
      <div className="relative mx-auto px-4 pt-28 pb-16 sm:px-6 lg:px-8 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-block rounded-full bg-[#84D716]/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.28em] text-[#84D716]"
            >
              PUP CCIS | BS Information Technology
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto max-w-4xl text-4xl font-bold tracking-[-0.04em] text-[#2A3435] sm:text-5xl lg:text-6xl"
            >
              Your Digital Commuting
              <span className="relative ml-3 inline-block">
                Co-Pilot
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 h-2 bg-[#84D716]/20 rounded-full"
                />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#2A3435]/70"
            >
              A GPS-Based Smart Alarm for Commuters solving the problem of missed stops in Metro Manila. 
              WakePoint uses real-time location tracking and geofencing to ensure you never miss your stop again.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={onBackHome}
                className="group relative overflow-hidden rounded-full bg-[#2A3435] px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
              >
                <span className="relative z-10">Back to Home</span>
                <motion.div 
                  className="absolute inset-0 bg-[#84D716]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={controls.staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={controls.fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-white/50 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/80 hover:shadow-lg"
              >
                <div className="mb-2 text-3xl">{stat.icon}</div>
                <div className="text-2xl font-bold text-[#84D716]">{stat.value}</div>
                <div className="mt-1 text-xs text-[#2A3435]/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission & Vision Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20 grid gap-6 md:grid-cols-2"
          >
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#FAF9F7] p-8 shadow-lg transition-all hover:shadow-2xl"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#84D716]/10 transition-all group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 inline-block rounded-2xl bg-[#84D716]/10 p-3">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#2A3435]">Our Mission</h3>
                <p className="text-[#2A3435]/70 leading-relaxed">
                  To create practical and user-centered digital solutions that address real-world transportation 
                  challenges in urban areas like Metro Manila, making commuting safer, more convenient, 
                  and efficient for everyone.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#FAF9F7] p-8 shadow-lg transition-all hover:shadow-2xl"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#84D716]/10 transition-all group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 inline-block rounded-2xl bg-[#84D716]/10 p-3">
                  <span className="text-3xl">👁️</span>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#2A3435]">Our Vision</h3>
                <p className="text-[#2A3435]/70 leading-relaxed">
                  A future where technology seamlessly integrates with daily commutes, transforming travel 
                  time into productive, stress-free experiences through intelligent, location-aware solutions.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Story Section with Favicon - Rating removed */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.4 }}
            className="relative mb-20 overflow-hidden rounded-3xl bg-linear-to-r from-[#84D716]/5 to-[#ADCE7D]/10 p-8 md:p-12"
          >
            <div className="relative z-10 md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:max-w-xl">
                <div className="mb-3 inline-block rounded-full bg-[#84D716]/20 px-3 py-1 text-xs font-semibold text-[#84D716]">
                  Student-Led Initiative
                </div>
                <h2 className="mb-4 text-3xl font-bold text-[#2A3435]">The WakePoint Story</h2>
                <p className="text-[#2A3435]/70 leading-relaxed">
                  WakePoint is a student-led technology initiative under the Bachelor of Science in Information 
                  Technology program at the Polytechnic University of the Philippines. Born from the daily 
                  struggles of commuting in Metro Manila, our team of four developers is committed to 
                  creating innovative solutions that address the common problem of commuters missing their 
                  stops due to fatigue, distractions, and unpredictable transit conditions.
                </p>
              </div>
              {/* Larger animated circular favicon - Perfect circle, no borders */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.08, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="hidden md:block"
              >
                <div className="rounded-full overflow-hidden shadow-xl">
                  <img 
                    src={favicon}
                    alt="WakePoint Logo" 
                    className="h-48 w-48 object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Timeline Milestones */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="mb-12 text-center text-3xl font-bold text-[#2A3435]">Project Timeline</h2>
            <div className="relative">
              <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-[#84D716]/20" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                  >
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="text-2xl">{milestone.icon}</div>
                          <div className="text-sm font-semibold text-[#84D716]">{milestone.year}</div>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-[#2A3435]">{milestone.title}</h3>
                        <p className="text-sm text-[#2A3435]/60">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-[#2A3435]">Meet the Team</h2>
              <p className="mx-auto max-w-2xl text-[#2A3435]/60">
                BS Information Technology students from the Polytechnic University of the Philippines
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 1.0 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="relative mx-auto mb-4 h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#84D716] to-[#ADCE7D] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#84D716]/10 text-4xl">
                    👨‍💻
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#2A3435]">James Esteban</h3>
                <p className="mb-2 text-sm font-semibold text-[#84D716]">Project Lead & Developer</p>
                <p className="text-xs text-[#2A3435]/50">BS Information Technology | System Architecture</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 1.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="relative mx-auto mb-4 h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#84D716] to-[#ADCE7D] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#84D716]/10 text-4xl">
                    🎨
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#2A3435]">Luigi Lagman</h3>
                <p className="mb-2 text-sm font-semibold text-[#84D716]">Frontend Developer</p>
                <p className="text-xs text-[#2A3435]/50">BS Information Technology | UI/UX Design</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 1.2 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="relative mx-auto mb-4 h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#84D716] to-[#ADCE7D] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#84D716]/10 text-4xl">
                    ⚙️
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#2A3435]">Marc Chester Perez</h3>
                <p className="mb-2 text-sm font-semibold text-[#84D716]">Backend Developer</p>
                <p className="text-xs text-[#2A3435]/50">BS Information Technology | Database Management</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 1.3 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="relative mx-auto mb-4 h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#84D716] to-[#ADCE7D] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#84D716]/10 text-4xl">
                    📝
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-bold text-[#2A3435]">Gabriel Santos</h3>
                <p className="mb-2 text-sm font-semibold text-[#84D716]">QA & Documentation</p>
                <p className="text-xs text-[#2A3435]/50">BS Information Technology | Testing & Research</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;