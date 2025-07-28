// components/Pricing.jsx

import React from 'react';
import { motion } from 'framer-motion';

const deliverables = [
  { name: 'Free Consultation', price: '$0', desc: '1-hour strategy session to assess your needs, challenges, and fit.' },
  { name: 'Custom Logo Design', price: '$375', desc: 'Unique logo, 3 concepts, 2 rounds of revisions, all formats delivered.' },
  { name: 'Website Design & Development', price: '$1,750', desc: 'Multi-page custom site, fully responsive and SEO optimized.' },
  { name: 'E-Commerce Development', price: '$3,750', desc: 'End-to-end online store: product setup, checkout, secure deployment.' },
  { name: 'API Development', price: '$68/hr', desc: 'REST or GraphQL APIs for integration and automation.' },
  { name: 'Brand Consultation & Discovery', price: '$50', desc: '1-hour kickoff session, brand notes and strategy summary.' },
  { name: 'DevOps & Maintenance', price: '$32/hr', desc: 'On-demand support, monthly retainer available.' },
  { name: 'QA Support & Documentation', price: '$150', desc: 'Rigorous manual & automated testing plus user docs.' },
  { name: 'Custom Graphs & Data Viz', price: '$408', desc: 'Interactive dashboards, tailored reports, analytics.' },
  { name: 'Training & Onboarding Tools', price: 'From $375', desc: 'Checklists, videos, self-serve portals for staff or clients.' },
  { name: '90-Day Post-Launch Support', price: '$375', desc: 'Covers unlimited minor tweaks, content updates, bug fixes.' },
];

const govSupport = [
  "Registered as a veteran-owned business. Eligible for federal, state, and local contracting.",
  "Teaming partner for RFPs & government modernization projects.",
  "Apex Accelerator support available for streamlined procurement.",
];

const Pricing = ({ id }) => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id={id} className="py-16 px-4 sm:px-6 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-4">
          How We Price & What You Get
        </h2>
        <p className="text-center text-gray-600 mb-10">
          We believe in clear, transparent pricing. Every project is custom—here’s what you can expect:
        </p>

        {/* Process block */}
        <motion.div
          className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm space-y-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="text-lg font-semibold text-raven-dark mb-1">Simple, Honest, Tailored</h3>
            <p className="text-gray-600">
              Every engagement begins with a free consult. You get a detailed scope, a timeline, and a transparent quote—no hidden fees, ever.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-raven-dark mb-1">Typical Investment</h3>
            <p className="text-gray-600">
              Most small business projects range from <span className="font-semibold">$5,000 - $50,000+</span> and take 6-16 weeks. Small integrations or tool-building start lower; enterprise and government contracts are welcomed.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-raven-dark mb-1">Deliverables</h3>
            <p className="text-gray-600">
              Full source code, tested deployment, user documentation, and 90 days of included support are standard. Need something special? Just ask.
            </p>
          </div>
        </motion.div>

        {/* MOBILE: Stack of cards */}
        <div className="space-y-6 md:hidden">
          {deliverables.map((item, i) => (
            <dl
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <dt className="text-base font-bold text-raven-dark">{item.name}</dt>
                <dd className="text-green-700 font-bold text-base ml-2 flex-shrink-0">{item.price}</dd>
              </div>
              <dd className="text-gray-600 text-sm">{item.desc}</dd>
            </dl>
          ))}
        </div>

        {/* DESKTOP: Table */}
        <div className="hidden md:block overflow-x-auto mt-4 mb-8">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Service</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Price</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Includes</th>
              </tr>
            </thead>
            <tbody>
              {deliverables.map((item, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-green-700 font-bold whitespace-nowrap">{item.price}</td>
                  <td className="px-4 py-3 text-gray-600">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Government support block */}
        <motion.div
          className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow mb-10 mt-12"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="font-bold text-blue-700 mb-2">Government Contracting & Apex Support</h4>
          <ul className="text-gray-700 list-disc list-inside space-y-1 mb-2">
            {govSupport.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <span className="block text-sm text-blue-800 mt-1">
            Looking to support veteran-owned businesses? We make government procurement simple and effective.
          </span>
        </motion.div>

        {/* Call to action */}
        <p className="text-center text-gray-700 mt-10 text-lg">
          Have questions or want a custom quote?
          <button
            onClick={scrollToContact}
            className="ml-1 text-raven-blue hover:text-raven-red font-semibold underline"
          >
            Let’s talk about your project.
          </button>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
