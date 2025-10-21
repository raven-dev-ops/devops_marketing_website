// components/Contact.jsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSound from '../hooks/useSound';

const Contact = ({ id, initialInterest = 'Consultation', initialName = '', initialEmail = '', initialMessage = '' }) => {
  const [formData, setFormData] = useState({ name: initialName, email: initialEmail, interest: initialInterest, message: initialMessage });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const playRavenSound = useSound('/audio/raven-caw.mp3');

  // Keep interest in sync with incoming prop
  useEffect(() => {
    setFormData((prev) => ({ ...prev, interest: initialInterest }));
  }, [initialInterest]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, name: initialName }));
  }, [initialName]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, email: initialEmail }));
  }, [initialEmail]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, message: initialMessage }));
  }, [initialMessage]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const encode = (data) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key] ?? ''))
      .join('&');

const handleSubmit = async (e) => {
    e.preventDefault();
    playRavenSound();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        'form-name': 'contact',
        'bot-field': '',
        name: formData.name,
        email: formData.email,
        interest: formData.interest,
        message: formData.message,
      };
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', interest: initialInterest, message: '' });
      } else {
        throw new Error('Network response was not ok');
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
          Contact & Next Steps
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-blue-100 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Book a free 30-minute discovery call, request a live demo, or ask about our CI/CD retainers. We’ll respond within one business day.
        </motion.p>

        <motion.form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-xl text-left max-w-lg mx-auto text-raven-dark"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
          aria-live="polite"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
          </p>
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
                <label htmlFor="contact-interest" className="block text-sm font-medium text-gray-700 mb-1">
                  I’m interested in <span aria-hidden="true" className="text-raven-red">*</span>
                </label>
                <select
                  name="interest"
                  id="contact-interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-1 focus:ring-raven-blue focus:border-raven-blue"
                >
                  <option>Consultation</option>
                  <option>Demo Request</option>
                  <option>CI Retainer Program</option>
                  <option>General Inquiry</option>
                </select>
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
                  {isSubmitting ? 'Sending...' : 'Submit'}
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
          <p className="mt-2">We’re also available via your preferred scheduling tool upon request.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;


