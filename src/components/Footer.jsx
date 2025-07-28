// components/Footer.jsx

import React from 'react';
// If using Heroicons or other SVGs for social, you can import here

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/raven-devops",
    icon: (
      <svg className="h-5 w-5 inline" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.998 3A2.003 2.003 0 0 1 22 5.006V19a2 2 0 0 1-2.002 2H4a2 2 0 0 1-2-2V5.006A2.002 2.002 0 0 1 4.002 3h15.996zm-11.11 16V9.529H5.085V19H8.89zm-1.903-11.032c-1.045 0-1.732-.694-1.732-1.56.001-.879.7-1.56 1.76-1.56s1.733.681 1.733 1.56c0 .866-.688 1.56-1.761 1.56zm12.014 11.032v-5.09c0-1.191-.427-2.004-1.493-2.004-.814 0-1.298.546-1.511 1.075-.078.191-.098.457-.098.725V19h-3.804s.049-8.864 0-9.471h3.804v1.343c.506-.782 1.41-1.899 3.428-1.899 2.504 0 4.384 1.638 4.384 5.154V19h-3.81z"/>
      </svg>
    ),
  },
  // Add more socials as needed
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-raven-dark text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        {/* Left */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg text-white">
            © {currentYear} Raven Development
          </p>
          <p>Kansas City, MO <span className="hidden sm:inline">·</span> <span className="block sm:inline">Serving clients nationwide</span></p>
        </div>

        {/* Center (optional tagline) */}
        <div className="text-center">
          <p className="text-sm text-raven-blue font-bold">
            🇺🇸 Proudly Veteran-Owned Small Business
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex justify-center md:justify-end space-x-4">
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
      {/* Divider */}
      <div className="mt-6 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
        <span>
          Veteran contracting and Apex Accelerator support available for local, state, and federal clients.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
