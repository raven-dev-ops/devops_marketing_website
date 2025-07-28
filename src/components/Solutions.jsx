// components/Solutions.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const solutionsList = [
  "Manual, repetitive tasks wasting time? We automate busywork with custom apps so your people can focus on what matters.",
  "Too many spreadsheets, not enough clarity? We connect and centralize your business data for instant, actionable insights.",
  "Onboarding new hires is slow or inconsistent? Our interactive training tools get employees productive from day one.",
  "Off-the-shelf software doesn't fit how you actually work? We build solutions tailored to your unique workflows—no more forcing your business into someone else's box.",
  "Unsure if your code is reliable, secure, or up to par? Our rigorous audits and testing catch bugs, boost quality, and ensure peace of mind.",
  "Inherited a messy codebase, or stuck with 'AI slop'? We specialize in code rescue, AI code cleanup, and helping teams recover projects that other firms—or AI tools—couldn’t finish.",
  "Need government-grade compliance or reporting? We deliver solutions for local, state, and federal agencies—with documentation and support for procurement, security, and Apex Accelerator partners.",
];

const Solutions = ({ id }) => {
  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-raven-light">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-4">
          Solutions for Your Real-World Challenges
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Our specialty is solving the everyday tech headaches that slow down small businesses, nonprofits, and government teams. We deliver practical results—quickly and transparently.
        </p>

        <div className="space-y-4">
          {solutionsList.map((solution, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700">{solution}</p>
            </motion.div>
          ))}
        </div>

        {/* Optional Testimonial */}
        <motion.div
          className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow text-center italic border-l-4 border-raven-blue"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-700 text-lg">
            “Raven Development cleaned up our AI-generated code and saved a six-figure project from failure. Their automation tools now save us hours every week. If you want it done right, call Raven first.”
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-600">
            — K. Montoya, CIO, Midwest Public Sector Partner
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
