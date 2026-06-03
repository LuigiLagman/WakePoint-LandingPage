// sections/AboutSection.jsx
import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

function AboutSection({ onBackHome }) {
  const [hoveredPartner, setHoveredPartner] = useState(null);
  
  const partners = [
    {
      id: 1,
      name: "TechFlow Solutions",
      role: "Technology Partner",
      description: "Leading innovation in cloud infrastructure and real-time data processing.",
      website: "https://techflow.example.com",
      avatar: "🚀",
      expertise: "Cloud Computing • AI/ML • Data Analytics",
      founded: "2019",
      location: "San Francisco, CA",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "DesignLabs",
      role: "Design Partner",
      description: "Award-winning design agency specializing in user-centered digital experiences.",
      website: "https://designlabs.example.com",
      avatar: "🎨",
      expertise: "UI/UX • Product Design • Brand Strategy",
      founded: "2020",
      location: "London, UK",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "SecureNet",
      role: "Security Partner",
      description: "Enterprise-grade security solutions protecting millions of users worldwide.",
      website: "https://securenet.example.com",
      avatar: "🔒",
      expertise: "Cybersecurity • Encryption • Compliance",
      founded: "2018",
      location: "Berlin, Germany",
      gradient: "from-red-500 to-orange-500"
    },
    {
      id: 4,
      name: "GlobalScale",
      role: "Infrastructure Partner",
      description: "Global server infrastructure ensuring 99.99% uptime across all regions.",
      website: "https://globalscale.example.com",
      avatar: "🌍",
      expertise: "Edge Computing • CDN • DevOps",
      founded: "2017",
      location: "Singapore",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const teamMembers = [
    { name: "Sarah Chen", role: "CEO & Co-founder", avatar: "👩‍💼", bio: "10+ years in tech innovation" },
    { name: "Marcus Rodriguez", role: "CTO & Co-founder", avatar: "👨‍💻", bio: "Ex-Google, AI specialist" },
    { name: "Emma Watson", role: "Head of Design", avatar: "🎯", bio: "Award-winning UX designer" },
    { name: "David Kim", role: "Lead Engineer", avatar: "⚡", bio: "Full-stack architect" }
  ];

  const stats = [
    { value: "5000+", label: "Active Users", icon: "👥", delay: 0 },
    { value: "50+", label: "Countries", icon: "🌍", delay: 0.1 },
    { value: "100k+", label: "Downloads", icon: "📱", delay: 0.2 },
    { value: "99.9%", label: "Uptime", icon: "⚡", delay: 0.3 },
    { value: "24/7", label: "Support", icon: "🎧", delay: 0.4 },
    { value: "4.9⭐", label: "Rating", icon: "⭐", delay: 0.5 }
  ];

  const milestones = [
    { year: "2024", title: "Company Founded", description: "Started with a vision to transform commuting", icon: "🎯" },
    { year: "2024", title: "Beta Launch", description: "First 1000 users joined our platform", icon: "🚀" },
    { year: "2025", title: "Global Expansion", description: "Launched in 50+ countries worldwide", icon: "🌍" },
    { year: "2025", title: "Award Winner", description: "Best Productivity App of the Year", icon: "🏆" }
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

      {/* Main Container */}
      <div className="relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
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
              About WakePoint
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
              We're on a mission to transform every journey into a productive, enjoyable experience. 
              WakePoint combines smart technology with intuitive design to make commuting better for everyone.
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
              <button
                onClick={() => {
                  const contactLink = document.querySelector('a[href="/contact"]');
                  if (contactLink) contactLink.click();
                }}
                className="rounded-full border-2 border-[#84D716] bg-transparent px-8 py-3 text-sm font-semibold text-[#2A3435] transition-all hover:bg-[#84D716] hover:text-white"
              >
                Get in Touch
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
                  To revolutionize commuting by creating intelligent, user-centric solutions that 
                  transform travel time into productive, enjoyable moments. We believe every journey 
                  should be an opportunity, not an obstacle.
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
                  A world where technology seamlessly integrates with daily routines, making every 
                  commute a seamless, personalized experience. We envision connected journeys that 
                  adapt to you, not the other way around.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.4 }}
            className="relative mb-20 overflow-hidden rounded-3xl bg-linear-to-r from-[#84D716]/5 to-[#ADCE7D]/10 p-8 md:p-12"
          >
            <div className="relative z-10 md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:max-w-xl">
                <div className="mb-3 inline-block rounded-full bg-[#84D716]/20 px-3 py-1 text-xs font-semibold text-[#84D716]">
                  Our Journey
                </div>
                <h2 className="mb-4 text-3xl font-bold text-[#2A3435]">The WakePoint Story</h2>
                <p className="text-[#2A3435]/70 leading-relaxed">
                  Founded in 2024 by a team of passionate commuters and tech innovators, WakePoint 
                  started with a simple observation: millions of hours are wasted during daily commutes. 
                  We asked ourselves, "What if we could make every minute count?" Today, we're proud 
                  to serve thousands of users across the globe, continuously innovating to make 
                  commuting smarter, safer, and more enjoyable.
                </p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="hidden md:block"
              >
                <div className="text-9xl">🚀</div>
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
            <h2 className="mb-12 text-center text-3xl font-bold text-[#2A3435]">Our Milestones</h2>
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

          {/* Partners Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-[#2A3435]">Our Strategic Partners</h2>
              <p className="mx-auto max-w-2xl text-[#2A3435]/60">
                We collaborate with industry leaders to deliver the best possible experience
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <motion.a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onHoverStart={() => setHoveredPartner(partner.id)}
                  onHoverEnd={() => setHoveredPartner(null)}
                  variants={controls.scaleOnHover}
                  whileHover="whileHover"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.8 + partner.id * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-2xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 transition-opacity group-hover:opacity-5`} />
                  
                  <div className="relative">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-5xl transition-transform group-hover:scale-110">
                        {partner.avatar}
                      </div>
                      <motion.div
                        animate={{ x: hoveredPartner === partner.id ? 5 : 0 }}
                        className="text-[#84D716] opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        ↗
                      </motion.div>
                    </div>
                    
                    <h3 className="mb-1 text-xl font-bold text-[#2A3435] group-hover:text-[#84D716] transition-colors">
                      {partner.name}
                    </h3>
                    <p className="mb-2 text-sm font-semibold text-[#84D716]">{partner.role}</p>
                    <p className="mb-3 text-sm text-[#2A3435]/60">{partner.description}</p>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-[#2A3435]/50">{partner.expertise}</p>
                      <div className="flex items-center justify-between text-xs text-[#2A3435]/40">
                        <span>Founded {partner.founded}</span>
                        <span>{partner.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
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
                Passionate individuals dedicated to making commuting better for everyone
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:shadow-2xl"
                >
                  <div className="relative mx-auto mb-4 h-24 w-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#84D716] to-[#ADCE7D] opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#84D716]/10 text-4xl">
                      {member.avatar}
                    </div>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-[#2A3435]">{member.name}</h3>
                  <p className="mb-2 text-sm font-semibold text-[#84D716]">{member.role}</p>
                  <p className="text-xs text-[#2A3435]/50">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ delay: 1.1 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#84D716] to-[#ADCE7D] p-8 text-center md:p-12"
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="mb-3 text-3xl font-bold text-[#132010]">Ready to Transform Your Commute?</h2>
              <p className="mx-auto mb-6 max-w-md text-[#132010]/80">
                Join thousands of users who've already made their journeys more productive
              </p>
              <button
                onClick={() => {
                  const contactLink = document.querySelector('a[href="/contact"]');
                  if (contactLink) contactLink.click();
                }}
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#2A3435] transition-all hover:scale-105 hover:shadow-lg"
              >
                Get Started Today
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;