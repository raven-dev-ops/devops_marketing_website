import React from 'react';
import { NavLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchContext } from '../../hooks/SearchContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
  { label: 'Partners', comingSoon: true },
];

const alertMessages = [
  'RavDevOps: Fractional DevOps and custom tooling for small teams.',
  'Tip: You can chat with Raven any time using the assistant in the bottom-right.',
  'Booking hours: 1–4pm Mon, Tue, Thu, Fri, and most federal holidays.',
  'Reminder: This site uses a local AI assistant – no external AI API keys.',
  'Fun fact: The team behind RavDevOps builds Discord bots and gaming tools too.',
];

export default function Header({ theme, toggleTheme }) {
  const { query, setQuery } = React.useContext(SearchContext);
  const [alertIndex, setAlertIndex] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    if (alertMessages.length === 0) return undefined;
    let timeoutId;
    const visibleDuration = 24000; // ~2s fade-in + 20s scroll + 2s fade-out
    const hiddenDuration = 60000; // delay between alerts

    const schedule = (visible) => {
      timeoutId = setTimeout(() => {
        if (visible) {
          setShowAlert(false);
          schedule(false);
        } else {
          setAlertIndex((prev) => (prev + 1) % alertMessages.length);
          setShowAlert(true);
          schedule(true);
        }
      }, visible ? visibleDuration : hiddenDuration);
    };

    setShowAlert(false);
    schedule(false);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-raven-border/70 bg-raven-navy/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-200">
          {navItems.map((item) => (
            item.comingSoon ? (
              <div
                key={item.label}
                className="relative group cursor-default border-b-2 border-transparent pb-1 text-slate-300 transition-colors hover:text-white"
              >
                <span>{item.label}</span>
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-slate-900 opacity-0 shadow-soft-glow transition-opacity group-hover:opacity-100 dark:bg-raven-card/90 dark:text-slate-100">
                  Coming soon!
                </span>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b-2 border-transparent pb-1 transition-colors hover:text-white ${
                    isActive ? 'border-raven-accent text-white' : 'text-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts & case studies..."
            className="hidden w-40 rounded-full border border-raven-border/70 bg-raven-card/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-400 shadow-inner shadow-black/20 transition-colors hover:border-raven-accent/80 hover:bg-raven-card hover:outline hover:outline-1 hover:outline-raven-accent/60 focus:border-raven-accent focus:outline-none sm:block sm:w-56"
          />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-raven-border/70 bg-raven-card p-2 text-slate-200 hover:border-raven-accent/80 hover:text-white"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showAlert && (
          <motion.div
            key="header-alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 2 }}
            className="relative border-t border-raven-border/70 bg-black/70 py-2 text-sm text-slate-100 dark:bg-black/80"
            aria-live="polite"
          >
            <div className="flex w-full items-center px-4 lg:px-6 overflow-hidden">
              <div className="relative flex-1 overflow-hidden">
                <div
                  className="inline-flex whitespace-nowrap rounded-md bg-emerald-500/25 px-4 py-1.5 text-sm text-emerald-50"
                  style={{ animation: 'header-marquee 20s linear 1' }}
                >
                  {alertMessages[alertIndex]}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
