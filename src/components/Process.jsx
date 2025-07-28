// components/Process.jsx

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: "Discovery & Roadmap",
    description:
      "Start with a friendly, obligation-free consult. We listen, ask smart questions, and identify the real issues behind your pain points—whether you’re a small business, a government agency, or an enterprise. You’ll get a written action plan and transparent estimate tailored to your timeline and budget.",
    icon: "🔍",
  },
  {
    number: 2,
    title: "Agile Build & Review",
    description:
      "Our US-based team (including veterans, engineers, and designers) turns your roadmap into working software in fast, visible sprints. You’ll see real progress every week and can give feedback as we go. Got legacy code, half-finished AI projects, or compliance concerns? We specialize in project rescue and refactoring.",
    icon: "💻",
  },
  {
    number: 3,
    title: "Launch & Lifetime Support",
    description:
      "We handle rigorous QA, security checks, and documentation—then deliver your project ready to use. Our team trains your users, stands by for tweaks, and offers ongoing support, upgrades, and government-level compliance as needed. We’re your long-term partner, not just a vendor.",
    icon: "🚀",
  },
];

const Process = ({ id }) => {
  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-12">
          Our 3-Step Partnership Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.13 }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-raven-blue text-white text-2xl font-bold shadow-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-raven-dark mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-12 italic">
          Transparent, collaborative, and accountable—every step of the way. If you’re stuck, need AI code rescued, or want a trustworthy tech ally for your next contract or project, Raven is here for you.
        </p>
      </div>
    </section>
  );
};

export default Process;
