import { motion } from "framer-motion";
import companyIcon from "../assets/images/company_icon.png";
import { useState, useEffect } from "react";

function FooterSection() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const footerLinks = {
    Company: [
      { name: "About Us", href: "/about", icon: "🏢" },
      { name: "Contact Us", href: "/contact", icon: "📧" },
      { name: "FAQs", href: "/faqs", icon: "❓" },
    ],
    Resources: [
      { name: "Privacy Policy", href: "/privacy", icon: "🔒" },
      { name: "Terms & Conditions", href: "/terms", icon: "📜" },
      { name: "Support Center", href: "/support", icon: "🎧" },
    ],
    Community: [
      { name: "GitHub", href: "https://github.com", icon: "🐙", external: true },
      { name: "Discord", href: "https://discord.com", icon: "💬", external: true },
    ],
  };

  const handleLinkClick = (linkName, href, external) => {
    console.log(`Analytics: Footer link clicked - ${linkName}`);
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click', {
        event_category: 'footer_navigation',
        event_label: linkName,
        value: 1
      });
    }
    
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal navigation
      // navigate(href);
      console.log(`Navigate to ${href}`);
    }
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-gradient-to-b from-transparent via-[#9cf543] to-[#B3EA63]"
    >
      
      
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#84D716]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#ADCE7D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16"
        >
          {/* Logo Section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center lg:items-start w-full lg:w-auto"
          >
            <motion.img
              src={companyIcon}
              alt="WakePoint company icon"
              className="w-48 h-auto sm:w-56 lg:w-68"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.p
              className="mt-4 text-sm text-[#2A3435]/60 text-center lg:text-left max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              WakePoint, your digital commuting co-pilot. Your Alarm for Every Trip. 
            </motion.p>
          </motion.div>

          {/* Links Grid */}
          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap gap-8 sm:gap-12 md:gap-16 lg:gap-20 w-full lg:w-auto"
          >
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} variants={itemVariants} className="min-w-[140px]">
                <motion.p
                  className="text-sm font-extrabold uppercase tracking-wider text-[#2A3435] mb-4 relative inline-block"
                  whileHover={{ x: 2 }}
                >
                  {category}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-[#84D716]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  />
                </motion.p>
                
                <ul className="space-y-3">
                  {links.map((link) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 4 }}
                      onHoverStart={() => setHoveredLink(link.name)}
                      onHoverEnd={() => setHoveredLink(null)}
                    >
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.name, link.href, link.external);
                        }}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-2 text-sm text-[#2A3435]/70 hover:text-[#84D716] transition-all duration-200 cursor-pointer"
                      >
                        <motion.span
                          className="text-base"
                          animate={{ 
                            rotate: hoveredLink === link.name ? [0, 10, -10, 0] : 0,
                            scale: hoveredLink === link.name ? 1.2 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {link.icon}
                        </motion.span>
                        <span className="group-hover:font-medium transition-all">
                          {link.name}
                        </span>
                        {link.external && (
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            ↗
                          </span>
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-[#2A3435]/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#2A3435]/50">
            <p>
              © {year} WakePoint. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("Cookie Preferences", "#", false);
                }}
                className="hover:text-[#84D716] transition-colors cursor-pointer"
              >
                Cookie Preferences
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#84D716] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Back to Top</span>
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ↑
                </motion.span>
              </a>
            </div>
          </div>
          
          {/* Made with love */}
          <motion.p
            className="text-center mt-4 text-xs text-[#2A3435]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Made with <span className="inline-block animate-pulse">❤️</span> for Filipino commuters
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}

export default FooterSection;