import React from 'react';
import { useLocation } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

export default function Contact() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const interest = searchParams.get('interest');

  const projectDefault = interest
    ? `I'm interested in the "${interest}" engagement and would like to discuss whether it fits my needs.`
    : '';

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 lg:px-6">
      <SeoHead
        title="Contact | Book a DevOps discovery call | Raven Development Operations"
        description="Tell me about your delivery goals—CI/CD, cloud, observability, or automation—and book time via Calendly."
        path="/contact"
      />
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Contact</p>
        <h1 className="text-4xl font-bold text-white">Let&apos;s plan your next DevOps win</h1>
        <p className="text-lg text-slate-300">CTOs, founders, and solo devs welcome. Typical projects range from CI/CD builds to fractional DevOps support.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="space-y-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Name
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Work email
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Company
                <input
                  name="company"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Role
                <input
                  name="role"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Phone number
                <input
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Preferred contact method
                <select
                  name="contact_method"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                  defaultValue="email"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="video-call">Video call</option>
                </select>
              </label>
            </div>
            <label className="text-sm text-slate-200">
              Project summary
              <textarea
                name="project"
                rows="4"
                defaultValue={projectDefault}
                className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Timeline
                <select
                  name="timeline"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                  defaultValue="1-2-weeks"
                >
                  <option value="1-2-weeks">1–2 weeks</option>
                  <option value="1-month">1 month</option>
                  <option value="3-months">3 months</option>
                  <option value="6-months">6 months</option>
                  <option value="1-year-plus">1 year+</option>
                </select>
              </label>
              <label className="text-sm text-slate-200">
                Budget range
                <select
                  name="budget"
                  className="mt-2 w-full rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-2 text-sm text-white focus:border-raven-accent focus:outline-none"
                  defaultValue="1k-25k"
                >
                  <option value="1k-25k">$1k–$25k+</option>
                  <option value="25k-50k">$25k–$50k+</option>
                  <option value="50k-100k">$50k–$100k</option>
                  <option value="250k-500k">$250k–$500k</option>
                  <option value="1m-25m">$1M–$25M+</option>
                </select>
              </label>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-raven-border/70 bg-raven-surface/70 px-3 py-3 text-xs text-slate-200">
              <input
                id="emergency"
                name="emergency_72hr"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-raven-border/70 bg-black text-raven-accent focus:ring-raven-accent"
              />
              <label htmlFor="emergency" className="cursor-pointer">
                This request is time-sensitive. I would like to explore an emergency engagement with a targeted 72-hour delivery window.
              </label>
            </div>
            <button type="submit" className="w-full rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-sm font-semibold text-black shadow-soft-glow">
              Send message
            </button>
          </form>
        </div>

        <div className="space-y-6 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6">
          <div className="space-y-4 rounded-xl border border-raven-border/60 bg-raven-surface/60 p-4">
            <iframe
              title="Calendly discovery video call"
              src="https://calendly.com/charityolivas/discovery-call"
              className="h-[520px] w-full rounded-lg border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
