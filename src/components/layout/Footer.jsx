import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-raven-border/70 bg-raven-card/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-slate-300 lg:px-6">
        <div className="space-y-1">
          <p className="text-base font-semibold text-white">Raven Development Operations</p>
          <p className="text-sm text-slate-400">
            Based in Kansas City, MO · Working remotely with clients in US/EU time zones.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <span className="text-slate-500">/</span>
          <Link to="/terms" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
