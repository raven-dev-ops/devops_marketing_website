import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import tier1Image from '../assets/tier1.png';
import tier2Image from '../assets/tier2.png';
import tier3Image from '../assets/tier3.png';

const tiers = [
  {
    name: 'CI/CD Kickstart',
    price: 'Starts at $2,400',
    description: 'Fixed-scope pipeline setup for one service (Next.js site or Django API).',
    bullets: ['Automated tests + lint', 'Security checks and secrets management', 'Zero-downtime deploy flow'],
    image: tier1Image,
  },
  {
    name: 'DevOps Modernization Sprint',
    price: 'Starts at $7,600',
    description: 'Assessment plus a 2-3 week implementation across pipelines, infrastructure, and observability.',
    bullets: ['Roadmap + quick wins', 'IaC + cloud hardening', 'Dashboards + alert tuning'],
    image: tier2Image,
  },
  {
    name: 'Fractional DevOps Partner',
    price: 'Starts at $1,350 / month',
    description: 'Ongoing support, incident response, and roadmap execution for growing teams.',
    bullets: ['Weekly delivery cadence', 'Incident response coverage', 'Backlog of automation improvements'],
    image: tier3Image,
  },
];

const faqs = [
  {
    q: 'Which engagement is right for my team?',
    a: 'If you need to stand up or fix a single pipeline, the CI/CD Kickstart is usually the best fit. If you want a broader modernization across infra, observability, and delivery, the DevOps Modernization Sprint is better. For ongoing help, the Fractional DevOps Partner option keeps a veteran operator embedded with your team each month.',
  },
  {
    q: 'Can we start small before committing long term?',
    a: 'Yes. Many teams start with a focused assessment or CI/CD Kickstart, then decide whether to extend into a modernization sprint or fractional engagement once we have real results and trust in place.',
  },
  {
    q: 'Do you work with our existing tools and stack?',
    a: 'In most cases, yes. I regularly work with GitHub Actions, Docker, Kubernetes, Terraform, Heroku, Netlify, AWS, and Azure across TypeScript, JavaScript, Python, and Node.js services. During the discovery call, we will confirm fit with your stack and constraints.',
  },
  {
    q: 'What about contracts, invoicing, and payment terms?',
    a: 'Work is scoped with a short proposal or statement of work. Fixed-scope projects are typically billed 50% up front and 50% on delivery. Fractional DevOps partnerships are billed monthly with clear goals and an option to revisit scope each quarter.',
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 lg:px-6">
      <SeoHead
        title="Pricing | Transparent DevOps engagements | Raven Development Operations"
        description="CI/CD kickstarts, modernization sprints, and fractional DevOps partnerships with clear starting prices."
        path="/pricing"
      />
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Pricing</p>
        <h1 className="text-4xl font-bold text-white">Transparent DevOps engagements</h1>
        <p className="text-lg text-slate-300">Pick the format that matches your urgency and risk profile.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6"
          >
            {tier.image && (
              <div className="flex justify-center">
                <img
                  src={tier.image}
                  alt={tier.name}
                  className="mb-4 h-32 w-auto object-contain"
                />
              </div>
            )}
            <div className="flex h-full flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-raven-cyan">Engagement</p>
                <h2 className="text-2xl font-semibold text-white">{tier.name}</h2>
                <p className="text-sm text-slate-300">{tier.description}</p>
              </div>
              <p className="text-xl font-bold text-raven-accent">{tier.price}</p>
              <ul className="space-y-2 text-sm text-slate-200">
                {tier.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-raven-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="https://calendly.com/ravdevops/discovery-meeting"
          className="inline-flex justify-center rounded-full bg-gradient-to-r from-raven-accent to-raven-cyan px-6 py-3 text-base font-semibold text-black shadow-soft-glow"
        >
          Book a discovery call
        </a>
        <Link
          to="/portfolio"
          className="inline-flex justify-center rounded-full border border-raven-border/70 bg-raven-card px-6 py-3 text-base font-semibold text-slate-100 hover:border-raven-accent/70"
        >
          View portfolio
        </Link>
      </div>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6">
        <h2 className="text-2xl font-semibold text-white">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-raven-border/60 bg-raven-surface/50 p-4">
              <p className="text-sm font-semibold text-white">{faq.q}</p>
              <p className="mt-2 text-sm text-slate-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
