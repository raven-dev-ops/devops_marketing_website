// components/Contact.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useSound from '../hooks/useSound';

const Contact = ({ id }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const playRavenSound = useSound('/audio/raven-caw.mp3');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playRavenSound();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Placeholder logic, swap with actual submission!
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() > 0.18) { // simulate 82% success
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Simulated error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-gradient-to-r from-raven-blue to-blue-900 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to Eliminate Inefficiencies?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-blue-100 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Let's talk about how Raven Development can build the right solution for you. Start with a free, no-pressure consult.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-xl text-left max-w-lg mx-auto text-raven-dark"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
          aria-live="polite"
        >
          {/* Status */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded text-center" role="status">
              Thank you! We'll reach out within one business day.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded text-center" role="alert">
              Oops! Something went wrong. Please try again or email us at <a href="mailto:support@ravdevops.com" className="font-semibold underline">support@ravdevops.com</a>.
            </div>
          )}

          {/* Form */}
          {!submitStatus || submitStatus === 'error' ? (
            <div className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span aria-hidden="true" className="text-raven-red">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-raven-blue focus:border-raven-blue"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span aria-hidden="true" className="text-raven-red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-raven-blue focus:border-raven-blue"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message / What You Need Help With <span aria-hidden="true" className="text-raven-red">*</span>
                </label>
                <textarea
                  name="message"
                  id="contact-message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-raven-blue focus:border-raven-blue"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-raven-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Request Your Free Consultation'}
                </button>
              </div>
            </div>
          ) : null}
        </motion.form>

        <motion.div
          className="mt-8 text-blue-100 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            Or call us:{" "}
            <a href="tel:4029699711" className="font-semibold hover:underline">
              402-969-9711
            </a>
            {" "} | Email:{" "}
            <a href="mailto:support@ravdevops.com" className="font-semibold hover:underline">
              support@ravdevops.com
            </a>
          </p>
          <p className="mt-2">Thanks for reaching the bottom of our expo demo!</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
