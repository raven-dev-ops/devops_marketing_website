import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    name: 'Custom software builds',
    description: 'Web apps, APIs, and internal tools that replace spreadsheets and brittle scripts.',
    benefit: 'Keeps teams aligned with reliable tools built for your workflow.',
  },
  {
    name: 'Workflow automation',
    description: 'Automate data entry, reporting, and follow-ups so humans focus on decisions.',
    benefit: 'Fewer manual steps and faster handoffs across teams.',
  },
  {
    name: 'DevOps and CI/CD',
    description: 'Pipelines, testing, and observability that make releases boring and predictable.',
    benefit: 'Less firefighting on deploy day and happier developers.',
  },
  {
    name: 'Cloud foundations',
    description: 'Secure AWS or Azure environments built with infrastructure-as-code.',
    benefit: 'Confident scaling with cost awareness and clear ownership.',
  },
  {
    name: 'AI voice and chat agents',
    description: 'Practical AI assistants for scheduling, intake, and customer questions.',
    benefit: 'Faster response times without losing the personal touch.',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ServicesSection = () => (
  <section id="services" className="bg-white py-16 px-6 lg:py-24">
    <div className="mx-auto max-w-6xl space-y-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-raven-blue">What we deliver</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-raven-dark">Services built for operators</h2>
      <p className="mx-auto max-w-3xl text-lg text-gray-700">
        Clear, actionable services explained without buzzwords. Pick the outcome you need and we’ll design the simplest path to get there.
      </p>
    </div>
    <motion.div
      className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {services.map((service) => (
        <motion.div
          key={service.name}
          variants={item}
          className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-gray-50 p-6 text-left shadow-sm"
        >
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-raven-dark">{service.name}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm font-semibold text-gray-800">
            <li>{service.benefit}</li>
          </ul>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default ServicesSection;
