const navItems = [
  { label: 'Problem', href: '#problem' },
  { label: 'Process', href: '#process' },
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Download', href: '#download' },
];

function Navbar() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-5 lg:px-6">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/35 px-5 py-3 text-sm text-[#f4efe8] shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-md">
        <a className="text-base font-semibold tracking-[0.2em] uppercase" href="#hero">
          WakePoint
        </a>

        <div className="hidden flex-wrap items-center justify-end gap-5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              className="text-sm text-[#f4efe8]/78 transition-colors duration-150 hover:text-[#f4efe8]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;