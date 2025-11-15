import React, { useState } from 'react';

const navLinks = [
  { label: 'Home', target: 'hero' },
  { label: 'Services', target: 'services' },
  { label: 'About', target: 'about' },
  { label: 'Case Studies', target: 'case-studies' },
  { label: 'Contact', target: 'contact' },
];

const Navbar = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    onNavigate && onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          onClick={() => go('hero')}
          className="text-xl font-extrabold tracking-tight text-raven-dark sm:text-2xl"
          aria-label="Go to home"
        >
          Raven Development Operations
        </button>
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.target}
              className="text-base font-semibold text-gray-700 transition hover:text-raven-blue lg:text-lg"
              onClick={() => go(link.target)}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => go('contact')}
            className="rounded-md bg-raven-blue px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-800"
          >
            Book a consultation
          </button>
        </div>
        <button
          className="p-2 text-gray-700 hover:text-raven-blue md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="mb-1 block h-0.5 w-6 bg-current"></span>
          <span className="mb-1 block h-0.5 w-6 bg-current"></span>
          <span className="block h-0.5 w-6 bg-current"></span>
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="flex flex-col gap-2 px-4 py-3">
            {navLinks.map((link) => (
              <button
                key={link.target}
                className="py-2 text-left text-base font-semibold text-gray-800"
                onClick={() => go(link.target)}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="w-full rounded-md bg-raven-blue px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
            >
              Book a consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

