import React from 'react';
import { motion } from 'framer-motion';

const studies = [
  {
    title: 'Regional data firm',
    challenge: 'Messy CSV imports and duplicate contacts slowed reporting and sales follow-up.',
    solution: 'Built a cleanup automation that normalizes, deduplicates, and flags issues before data hits the CRM.',
    outcome: 'Hours of manual cleanup cut to minutes with cleaner outreach lists every morning.',
  },
  {
    title: 'Gaming community automation',
    challenge: 'Moderators spent nights triaging member questions and handling role updates.',
    solution: 'Delivered a Discord bot that routes FAQs, tracks incidents, and automates role assignments.',
    outcome: 'Volunteer hours reclaimed and a calmer, more responsive community experience.',
  },
  {
    title: 'Local service business',
    challenge: 'Inbound calls and scheduling were bottlenecked by voicemail and manual callbacks.',
    solution: 'Launched an AI voice and scheduling assistant with clear escalation to humans.',
    outcome: 'More booked appointments, faster responses, and no dropped weekend leads.',
  },
];

const CaseStudiesSection = () => (
  <section id="case-studies" className="bg-white py-16 px-6 lg:py-24">
    <div className="mx-auto max-w-6xl space-y-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-raven-blue">Results</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-raven-dark">Recent examples</h2>
      <p className="mx-auto max-w-3xl text-lg text-gray-700">
        Straightforward, documented wins you can relate to—even without the client names on display.
      </p>
    </div>
    <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {studies.map((study) => (
        <motion.div
          key={study.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="flex h-full flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-6 text-left shadow-sm"
        >
          <h3 className="text-xl font-semibold text-raven-dark">{study.title}</h3>
          <p className="text-sm font-semibold text-gray-800">Client need</p>
          <p className="text-gray-700">{study.challenge}</p>
          <p className="text-sm font-semibold text-gray-800">What we built</p>
          <p className="text-gray-700">{study.solution}</p>
          <p className="text-sm font-semibold text-gray-800">Result</p>
          <p className="text-gray-700">{study.outcome}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CaseStudiesSection;
