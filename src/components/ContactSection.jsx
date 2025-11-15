import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact submission', formData); // TODO: wire to email service or backend endpoint
    setStatus('Thanks for reaching out. I’ll reply within one business day.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className="bg-gradient-to-r from-raven-blue to-blue-900 py-16 px-6 lg:py-24 text-white">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to eliminate the inefficiency?</h2>
          <p className="text-lg text-blue-100">
            Schedule a consultation or tell me what’s slowing your team down. I’ll respond quickly with next steps.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-2xl gap-4 rounded-2xl bg-white p-6 text-left shadow-xl ring-1 ring-blue-100"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-raven-blue focus:outline-none focus:ring-1 focus:ring-raven-blue"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-raven-blue focus:outline-none focus:ring-1 focus:ring-raven-blue"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-company" className="block text-sm font-semibold text-gray-800">
              Company
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-raven-blue focus:outline-none focus:ring-1 focus:ring-raven-blue"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-800">
              How can I help?
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-raven-blue focus:outline-none focus:ring-1 focus:ring-raven-blue"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-gray-700">Primary CTA: Book a consultation</p>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-raven-blue px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Send message
            </button>
          </div>
          {status && <div className="rounded-md bg-green-50 p-3 text-sm font-semibold text-green-800">{status}</div>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
