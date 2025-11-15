import React from 'react';
import { motion } from 'framer-motion';
import flagOverlayImage from '../assets/american_flag_background.png';

const HeroSection = ({ scrollToSection }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-24 px-6 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${flagOverlayImage})` }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-raven-blue shadow-sm"
          >
            Veteran-led. Practical. Reliable.
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-raven-dark leading-tight"
          >
            Custom software and automation for small businesses and operations teams
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0"
          >
            We build dependable systems, remove manual busywork, and keep your stack running smoothly so your team can stop firefighting and focus on delivering.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollToSection && scrollToSection('contact')}
              className="rounded-md bg-raven-blue px-6 py-3 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Book a consultation
            </button>
            <button
              onClick={() => scrollToSection && scrollToSection('services')}
              className="rounded-md border border-raven-blue px-6 py-3 text-base font-semibold text-raven-blue transition hover:bg-blue-50"
            >
              View services
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Outcome-focused tagline</p>
              <p className="text-xl font-bold text-raven-dark">Fewer manual processes. More reliable systems. Less firefighting.</p>
            </div>
            <span className="rounded-full bg-raven-blue/10 px-3 py-1 text-xs font-semibold text-raven-blue">No fluff</span>
          </div>
          <div className="grid gap-3 text-sm text-gray-700">
            <div className="rounded-lg bg-gray-50 p-3">
              "They streamlined our releases and stopped the midnight deploys." — Placeholder testimonial
            </div>
            <div className="rounded-lg bg-gray-50 p-3">Trusted for disciplined delivery, veteran-owned, Kansas City based.</div>
            <div className="rounded-lg bg-gray-50 p-3">Ready for government teams, agencies, and small businesses.</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
