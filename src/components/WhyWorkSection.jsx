import React from 'react';

const reasons = [
  'Reliable delivery with veteran-led discipline and calm project cadence.',
  'Clear communication—plain language updates without jargon or surprises.',
  'Rescue and stabilize messy AI-generated or rushed codebases.',
  'Security and reliability baked in from the start, not bolted on.',
  'Flexible engagement: projects, retainers, or rapid troubleshooting support.',
];

const taglineOptions = [
  'Fewer manual steps. Stronger systems.',
  'Stable releases, calmer teams.',
  'Automation that actually sticks.',
  'Dependable pipelines, no drama.',
  'Reliable software, less firefighting.',
];

const WhyWorkSection = () => (
  <section id="why-work" className="bg-raven-light py-16 px-6 lg:py-24">
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-raven-blue">Why work with me</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-raven-dark">Straightforward reasons clients choose Raven</h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-700">
          Built for teams that value reliability over buzzwords. You’ll always know what’s happening, what’s next, and how we’ll measure success.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-start">
        <ul className="space-y-3 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-start gap-3 text-gray-800">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-raven-blue" aria-hidden="true"></span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="text-lg font-semibold text-raven-dark">Placeholder testimonials</h3>
          <p className="text-gray-700">Client feedback will live here. For now, a sample:</p>
          <div className="rounded-lg bg-gray-50 p-4 text-gray-800">
            “Raven took our chaotic pipelines and made releases boring. We know what will happen every time.”
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-800">Tagline options (under 10 words):</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {taglineOptions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyWorkSection;
