// components/Footer.jsx

import React from 'react';
import { LinkedinIcon } from '@heroicons/react/24/solid'; // If you have Heroicons package installed
import veteranBadge from '../assets/american_veteran_badge.png'; // Update path as needed

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ravdevops",
    icon: (
      // Heroicons LinkedIn SVG (for better consistency and accessibility)
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.3c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.7 1.7-1.7 1.7zm13.5 10.3h-3v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v4.6h-3v-9h2.8v1.2h.1c.4-.8 1.3-1.7 2.7-1.7 2.9 0 3.5 1.9 3.5 4.3v5.2z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-raven-dark text-gray-300 py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Veteran Badge */}
        <img
          src={veteranBadge}
          alt="Proudly American Veteran-Owned Business"
          className="h-12 md:h-16 mb-2 drop-shadow"
          style={{ maxWidth: 88 }}
        />

        {/* Info */}
        <div>
          <p className="font-semibold text-lg text-white">
            © {currentYear} Raven Development
          </p>
          <p>Kansas City, MO <span className="hidden sm:inline">·</span> <span className="block sm:inline">Serving clients nationwide</span></p>
        </div>

        {/* Tagline */}
        <div>
          <p className="text-sm text-raven-blue font-bold mb-2">
            🇺🇸 Proudly Veteran-Owned Small Business
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          {socials.map((social, idx) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label={social.name}
            >
              {social.icon}
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
      {/* Divider and extra info */}
      <div className="mt-6 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
        Available for local, state, and federal clients.
      </div>
    </footer>
  );
};

export default Footer;
