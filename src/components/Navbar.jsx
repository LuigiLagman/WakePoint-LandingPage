import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import favicon from '../assets/images/favicon.png';

const navItems = [
  { label: 'Why WakePoint', href: '#problem' },
  { label: 'How It Works', href: '#process' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#testimonials' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef(null);

  const navSectionIds = ['hero', 'problem', 'process', 'features', 'testimonials', 'download'];

  const scrollToSection = (event, hash) => {
    event.preventDefault();

    const target = document.querySelector(hash);

    if (!target) {
      return;
    }

    setActiveSection(hash.slice(1));
    isProgrammaticScrollRef.current = true;

    if (programmaticScrollTimeoutRef.current) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
    }

    programmaticScrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 800);

    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
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
  }, []);

  const isLight = isScrolled || isHovered;

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative isolate w-full overflow-hidden border-x-0 border-t-0 px-4 py-2.5 text-[#2f3134] transition-colors duration-300 sm:px-5 sm:py-3 lg:px-8"
      >
        <motion.div
          aria-hidden="true"
          animate={isLight ? 'active' : 'rest'}
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_130%_at_50%_0%,rgba(255,255,255,1)_0%,rgba(255,255,255,0.88)_16%,rgba(255,255,255,0.58)_32%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.04)_66%,rgba(255,255,255,0)_74%)]"
          initial={false}
          variants={{
            rest: {
              opacity: 1,
              clipPath: 'inset(0 0 0 0)',
            },
            active: {
              opacity: 0,
              clipPath: 'inset(0 0 0 0)',
            },
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          aria-hidden="true"
          animate={isLight ? 'active' : 'rest'}
          className="absolute inset-0 border border-[#d7d8d4] bg-[radial-gradient(ellipse_farthest-corner_at_top_center,rgba(255,255,255,0.99)_0%,rgba(250,249,245,0.99)_45%,rgba(241,239,233,0.98)_100%)]"
          initial={false}
          variants={{
            rest: {
              opacity: 0,
              clipPath: 'circle(0% at 50% 0%)',
            },
            active: {
              opacity: 1,
              clipPath: 'circle(160% at 50% 0%)',
            },
          }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <a
            onClick={(event) => scrollToSection(event, '#hero')}
            className="flex items-center gap-2.5 font-heading text-base font-semibold uppercase tracking-[0.12em] sm:text-lg lg:text-[1.2rem]"
            href="#hero"
          >
            <img
              alt="WakePoint logo"
              className="h-10 w-10 rounded-full object-contain shadow-[0_8px_20px_rgba(0,0,0,0.12)] sm:h-11 sm:w-11"
              src={favicon}
            />
            <span className="text-[#2f3134]">Wake Point</span>
          </a>

          <div className="hidden flex-wrap items-center justify-end gap-6 md:flex lg:gap-8">
            {navItems.map((item) => (
              <motion.div key={item.label} className="relative">
              <motion.a
                onClick={(event) => scrollToSection(event, item.href)}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                className={
                  'group relative font-heading text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-200 lg:text-[1.05rem] ' +
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
            ))}
          </div>

          <a
            onClick={(event) => scrollToSection(event, '#download')}
            className={
              'inline-flex min-h-10 items-center justify-center rounded-full px-5 font-heading text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(47,49,52,0.14)] sm:min-h-11 sm:px-6 sm:text-[1.02rem] ' +
              (isLight
                ? 'bg-[#ffffff] text-[#2f3134] shadow-[0_10px_18px_rgba(47,49,52,0.12)]'
                : 'border border-[#cfd1cb] bg-[#ffffff] text-[#2f3134] shadow-[0_10px_18px_rgba(0,0,0,0.08)]') +
              (activeSection === 'download' ? ' ring-1 ring-[#2f3134]/10' : '')
            }
            href="#download"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;