import React from 'react';
import { motion } from 'framer-motion';

const skills = ['Python', 'FastAPI', 'React & Next.js', 'Node.js', 'Docker', 'AWS & Azure', 'GitHub Actions', 'Terraform', 'CI/CD & observability'];

const AboutSection = () => (
  <section id="about" className="bg-raven-light py-16 px-6 lg:py-24">
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-raven-blue">About Raven Development Operations</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-raven-dark">Veteran-built, reliability-first engineering</h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-700">
          I’m a U.S. Army veteran and technical founder who treats every system like a mission-critical asset. The goal is simple: keep your tools dependable, your releases routine, and your people free from unnecessary busywork.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
        >
          <h3 className="text-xl font-semibold text-raven-dark">My approach</h3>
          <p className="text-gray-700">
            Practical builds, disciplined project management, and clear communication. I design for long-term maintainability and handoff, not hype or throwaway prototypes.
          </p>
          <p className="text-gray-700">
            Whether we’re stabilizing CI/CD, automating workflows, or standing up cloud foundations, you’ll get transparent status updates and systems you can trust.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
        >
          <h3 className="text-xl font-semibold text-raven-dark">Tools I use</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-raven-blue ring-1 ring-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-gray-700 font-semibold">Mission: Eliminate inefficiency and build solid systems that stay reliable.</p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
