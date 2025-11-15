import React from 'react';

const SiteFooter = ({ scrollToSection }) => {
  const goToContact = (e) => {
    e.preventDefault();
    scrollToSection && scrollToSection('contact');
  };

  return (
    <footer className="bg-raven-dark py-10 px-6 text-gray-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-raven-blue">Veteran-Owned Small Business</p>
          <h3 className="text-2xl font-bold text-white">Start a project conversation</h3>
          <p className="text-gray-400">Let’s make your systems reliable, efficient, and easier to run.</p>
          <div className="flex justify-center">
            <a
              href="#contact"
              onClick={goToContact}
              className="inline-flex justify-center rounded-md bg-raven-blue px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Start a project conversation
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          {['Home', 'Services', 'About', 'Case Studies', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(' ', '-')}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection && scrollToSection(label.toLowerCase().replace(' ', '-'));
              }}
              className="hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Raven Development Operations. Reliability first.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
