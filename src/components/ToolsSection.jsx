import React from 'react';

const tools = ['Python', 'FastAPI', 'React', 'Next.js', 'Node.js', 'Docker', 'GitHub Actions', 'Terraform', 'AWS', 'Azure'];

const ToolsSection = () => (
  <section id="tools" className="bg-white py-12 px-6 lg:py-16">
    <div className="mx-auto max-w-6xl rounded-xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-200">
      <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-raven-blue">Tools and technologies</p>
          <h3 className="text-2xl font-bold text-raven-dark">Platforms I work with</h3>
          <p className="text-gray-700">Modern stacks chosen for reliability, speed, and maintainability.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:justify-end" aria-label="Primary tools">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ToolsSection;
