import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import favicon from '../assets/images/favicon.png';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Why WakePoint', href: '#problem' },
  { label: 'How It Works', href: '#process' },
  { label: 'Features', href: '#pricing' },
  { label: 'Reviews', href: '#testimonials' },
];

function Navbar({ navigate, currentPath: propCurrentPath }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(propCurrentPath || window.location.pathname);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef(null);

  const navSectionIds = ['hero', 'problem', 'process', 'features', 'testimonials', 'download'];

  // Check if we're on a separate page
  const isSeparatePage = ['/contact', '/about', '/privacy', '/terms'].includes(currentPath);
  const isHomePage = currentPath === '/';

  // Update currentPath when prop changes
  useEffect(() => {
    setCurrentPath(propCurrentPath);
  }, [propCurrentPath]);

  const navigateToHome = () => {
    if (navigate) {
      navigate('/');
    } else {
      // Fallback if navigate prop not provided
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path) => {
    if (navigate) {
      navigate(path);
    } else {
      // Fallback if navigate prop not provided
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (event, hash) => {
    event.preventDefault();

    // If on a separate page, navigate home first then scroll
    if (isSeparatePage) {
      if (navigate) {
        navigate('/');
      } else {
        window.history.pushState({}, '', '/');
      }
      
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: hash === '#process' ? 'start' : 'center', 
            inline: 'nearest' 
          });
          setActiveSection(hash.slice(1));
        }
      }, 100);
      setIsMobileMenuOpen(false);
      return;
    }

    // On home page, handle normal scrolling
    const target = document.querySelector(hash);

    if (!target) {
      console.warn(`Element with selector "${hash}" not found`);
      return;
    }

    setActiveSection(hash.slice(1));
    isProgrammaticScrollRef.current = true;
    setIsMobileMenuOpen(false);

    if (programmaticScrollTimeoutRef.current) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
    }

    programmaticScrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 800);

    // Scroll to appropriate position
    target.scrollIntoView({ 
      behavior: 'smooth', 
      block: hash === '#process' ? 'start' : 'center', 
      inline: 'nearest' 
    });
    
    history.replaceState(null, '', hash);
  };

  useEffect(() => {
    const updateNavbarState = () => {
      setIsScrolled(window.scrollY > 8);
    };

    updateNavbarState();
    window.addEventListener('scroll', updateNavbarState, { passive: true });

    return () => window.removeEventListener('scroll', updateNavbarState);
  }, []);

  useEffect(() => {
    // Only track active section on home page
    if (!isHomePage) return;

    const updateActiveSection = () => {
      if (isProgrammaticScrollRef.current) {
        return;
      }

      const triggerLine = window.innerHeight * 0.35;
      let currentSectionId = navSectionIds[0];

      navSectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) {
          return;
        }

        const sectionRect = section.getBoundingClientRect();

        if (sectionRect.top <= triggerLine) {
          currentSectionId = sectionId;
        }
      });

      setActiveSection(currentSectionId);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);

      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, [isHomePage]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isLight = isScrolled || isHovered;

  // Get page title for separate pages
  const getPageTitle = () => {
    switch(currentPath) {
      case '/about': return 'About Us';
      case '/contact': return 'Contact Us';
      case '/privacy': return 'Privacy Policy';
      case '/terms': return 'Terms & Conditions';
      default: return '';
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full">
      <nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative isolate w-full overflow-hidden border-x-0 border-t-0 px-4 py-2.5 text-[#2f3134] transition-colors duration-300 sm:px-5 sm:py-3 lg:px-8"
        style={{ width: '100%' }}
      >
        {/* Default semi-radial gradient - always visible */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(255,255,255,1)_0%,rgba(255,255,255,0.85)_25%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0)_100%)]"
        />

        {/* Spreading gradient that expands from top center on hover/scroll */}
        <motion.div
          aria-hidden="true"
          animate={isLight ? 'active' : 'rest'}
          className="absolute inset-0 bg-[radial-gradient(circle_farthest-side_at_50%_0%,rgba(255,255,255,1)_0%,rgba(255,255,255,0.95)_30%,rgba(255,255,255,0.8)_60%,rgba(255,255,255,0.6)_100%)]"
          initial={false}
          variants={{
            rest: {
              clipPath: 'circle(0% at 50% 0%)',
            },
            active: {
              clipPath: 'circle(150% at 50% 0%)',
            },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* Logo - Navigates to home from any page */}
          <a
            onClick={(event) => {
              event.preventDefault();
              navigateToHome();
            }}
            className="flex cursor-pointer items-center gap-2.5 font-heading text-base font-semibold uppercase tracking-[0.12em] sm:text-lg lg:text-[1.2rem]"
            href="/"
          >
            <img
              alt="WakePoint logo"
              className="h-9 w-9 rounded-full object-contain shadow-[0_8px_20px_rgba(0,0,0,0.12)] sm:h-10 sm:w-10 md:h-11 md:w-11"
              src={favicon}
            />
            <span className="hidden text-[#2f3134] xs:inline-block">WakePoint</span>
            <span className="text-[#2f3134] xs:hidden">WakePoint</span>
          </a>

          {/* Desktop Navigation - Show different based on page */}
          <div className="hidden flex-wrap items-center justify-end gap-6 md:flex lg:gap-8">
            {isHomePage ? (
              // Home page - show section links
              navItems.map((item) => (
                <motion.div key={item.label} className="relative">
                  <motion.a
                    onClick={(event) => scrollToSection(event, item.href)}
                    aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                    className={
                      'group relative cursor-pointer font-heading text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-200 lg:text-[1.05rem] ' +
                      (activeSection === item.href.slice(1)
                        ? 'text-[#2f3134]'
                        : 'text-[#2f3134]/80')
                    }
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href={item.href}
                  >
                    {item.label}
                    <motion.span
                      animate={activeSection === item.href.slice(1) ? 'active' : 'rest'}
                      className="absolute inset-x-0 -bottom-1 h-px rounded-full bg-[#2f3134]"
                      variants={{
                        rest: {
                          opacity: 0,
                          scaleX: 0,
                        },
                        active: {
                          opacity: 0.75,
                          scaleX: 1,
                        },
                      }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0.5 }}
                    />
                    <span className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 rounded-full bg-[#2f3134] opacity-0 transition duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-60" />
                  </motion.a>
                </motion.div>
              ))
            ) : (
              // Separate pages - show page title and navigation buttons
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#2f3134]/50">You are here:</span>
                  <span className="font-medium text-[#84D716]">{getPageTitle()}</span>
                </div>
                <div className="h-6 w-px bg-[#2f3134]/20" />
                <button
                  onClick={navigateToHome}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-[#2f3134]/70 transition-all hover:bg-white/50 hover:text-[#84D716]"
                >
                  <span>←</span>
                  <span>Back to Home</span>
                </button>
              </>
            )}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Download Button - only show on home page */}
            {isHomePage && (
              <a
                onClick={(event) => scrollToSection(event, '#download')}
                className={
                  'inline-flex min-h-9 cursor-pointer items-center justify-center rounded-full px-4 font-heading text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(47,49,52,0.14)] sm:min-h-10 sm:px-5 sm:text-base md:min-h-11 md:px-6 md:text-[1.02rem] ' +
                  (isLight
                    ? 'bg-[#ffffff] text-[#2f3134] shadow-[0_10px_18px_rgba(47,49,52,0.12)]'
                    : 'border border-[#cfd1cb] bg-[#ffffff] text-[#2f3134] shadow-[0_10px_18px_rgba(0,0,0,0.08)]') +
                  (activeSection === 'download' ? ' ring-1 ring-[#2f3134]/10' : '')
                }
                href="#download"
              >
                Download
              </a>
            )}

            {/* Contact Button - show on all pages */}
            <button
              onClick={() => navigateToPage('/contact')}
              className="inline-flex min-h-9 cursor-pointer items-center justify-center rounded-full bg-[#84D716] px-4 font-heading text-sm font-semibold text-[#132010] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:min-h-10 sm:px-5 sm:text-base md:min-h-11 md:px-6 md:text-[1.02rem]"
            >
              Contact Us
            </button>

            {/* Hamburger Menu Button - Mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-20 flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg focus:outline-none md:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-5 rounded-full bg-[#2f3134]"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-5 rounded-full bg-[#2f3134]"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-5 rounded-full bg-[#2f3134]"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 z-40 h-full w-64 bg-white shadow-2xl md:hidden"
              >
                <div className="flex flex-col gap-2 px-6 pt-20">
                  {isHomePage ? (
                    // Home page - show all section links
                    <>
                      {navItems.map((item) => (
                        <motion.a
                          key={item.label}
                          onClick={(event) => {
                            scrollToSection(event, item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className={
                            'block cursor-pointer rounded-lg px-4 py-3 font-heading text-base font-medium transition-colors duration-200 ' +
                            (activeSection === item.href.slice(1)
                              ? 'bg-[#84D716]/10 text-[#2f3134]'
                              : 'text-[#2f3134]/70 hover:bg-[#FAF9F7]')
                          }
                          whileTap={{ scale: 0.98 }}
                          href={item.href}
                        >
                          {item.label}
                        </motion.a>
                      ))}
                      <div className="my-2 h-px bg-[#2f3134]/10" />
                      <motion.button
                        onClick={() => navigateToPage('/contact')}
                        className="block cursor-pointer rounded-lg px-4 py-3 text-left font-heading text-base font-medium text-[#2f3134]/70 transition-colors hover:bg-[#FAF9F7]"
                        whileTap={{ scale: 0.98 }}
                      >
                        Contact Us
                      </motion.button>
                      <motion.button
                        onClick={() => navigateToPage('/about')}
                        className="block cursor-pointer rounded-lg px-4 py-3 text-left font-heading text-base font-medium text-[#2f3134]/70 transition-colors hover:bg-[#FAF9F7]"
                        whileTap={{ scale: 0.98 }}
                      >
                        About Us
                      </motion.button>
                    </>
                  ) : (
                    // Separate pages - show navigation options
                    <>
                      <motion.div
                        className="rounded-lg bg-[#84D716]/5 px-4 py-3"
                      >
                        <p className="text-xs text-[#2f3134]/50">Current Page</p>
                        <p className="font-medium text-[#84D716]">{getPageTitle()}</p>
                      </motion.div>
                      <motion.button
                        onClick={navigateToHome}
                        className="mt-2 block cursor-pointer rounded-lg px-4 py-3 text-left font-heading text-base font-medium text-[#2f3134] transition-colors hover:bg-[#FAF9F7]"
                        whileTap={{ scale: 0.98 }}
                      >
                        ← Back to Home
                      </motion.button>
                      <div className="my-2 h-px bg-[#2f3134]/10" />
                      <motion.button
                        onClick={() => navigateToPage('/about')}
                        className="block cursor-pointer rounded-lg px-4 py-3 text-left font-heading text-base font-medium text-[#2f3134]/70 transition-colors hover:bg-[#FAF9F7]"
                        whileTap={{ scale: 0.98 }}
                      >
                        About Us
                      </motion.button>
                      <motion.button
                        onClick={() => navigateToPage('/contact')}
                        className="block cursor-pointer rounded-lg px-4 py-3 text-left font-heading text-base font-medium text-[#2f3134]/70 transition-colors hover:bg-[#FAF9F7]"
                        whileTap={{ scale: 0.98 }}
                      >
                        Contact Us
                      </motion.button>
                      <motion.button
                        onClick={() => navigateToPage('/privacy')}
                        className="block cursor-pointer rounded-lg px-4 py-3 text-left font-heading text-base font-medium text-[#2f3134]/70 transition-colors hover:bg-[#FAF9F7]"
                        whileTap={{ scale: 0.98 }}
                      >
                        Privacy Policy
                      </motion.button>
                      <motion.button
                        onClick={() => navigateToPage('/terms')}
                        className="block cursor-pointer rounded-lg px-4 py-3 text-left font-heading text-base font-medium text-[#2f3134]/70 transition-colors hover:bg-[#FAF9F7]"
                        whileTap={{ scale: 0.98 }}
                      >
                        Terms & Conditions
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;