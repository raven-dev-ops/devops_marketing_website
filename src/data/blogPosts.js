import blogCiShipping from '../assets/blog_ci_shipping.png';
import blogHd2Website from '../assets/blog_hd2_website.png';
import blogCommerceFrontend from '../assets/blog_commerce_frontend.png';
import blogCommerceBackend from '../assets/blog_commerce_backend.png';
import blogDiscordBot from '../assets/blog_discord_bot.png';

export const blogPosts = [
  {
    title: 'Shipping the Raven DevOps demo website with CI/CD',
    slug: 'ravdevops-demo-website-ci-cd',
    date: '2025-04-10',
    image: blogCiShipping,
    tags: ['CI/CD', 'Tooling', 'Frontend'],
    readMinutes: 4,
    excerpt:
      'How I built the ravdevops_demo_website repo as a React/Tailwind marketing site with a simple CI/CD pipeline and deploy previews.',
    bullets: [
      'React + Tailwind marketing site wired to GitHub.',
      'CI/CD pipeline that builds and tests on every push.',
      'Structure aimed at boring, low-friction future changes.',
    ],
    content:
      'The ravdevops_demo_website repo is the home for this marketing site. It runs on React and Tailwind with Vite, and the goal was to keep things boring: a single main branch, automated builds, and deploy previews without bespoke infra. Everything lives in GitHub so history and reviews stay easy to audit.\n\nCI/CD runs Jest, builds the bundle, and posts deploy previews to Netlify. A small health check plus Open Graph metadata keeps the site reliable and shareable, while the chatbot points at the production assistant backend via a single environment variable. The structure shows how I group config, keep secrets out of Git, and ship changes quickly without surprises.\n\nOperationally, the site favors repeatability: minimal dependencies, a fast dev server, and one source of truth for environment values. When a deploy fails, logs are centralized in Netlify and GitHub Actions so rollback is obvious.\n\nThe last mile is content governance: SEO fields are codified, assets are optimized, and release notes track what changed per deploy. That makes handoffs easier when multiple people touch copy, design, and chatbot prompts at the same time.',
    lessons: [
      'Keep a single env map for frontend URLs and wire it through both Vite and Netlify so previews stay consistent.',
      'Default to boring pipelines: install, test, build; add linting and type checks only when they earn their keep.',
      'Treat metadata (SEO, OG tags) as code to avoid regressions every time content changes.',
    ],
    challenges: [
      'Netlify cache busting on large image assets; resolved by leaning on hashed filenames and CDN headers.',
      'SPA routing on Netlify needed an explicit redirect rule to avoid 404s on deep links.',
      'Framer Motion effects originally inflated the bundle; trimmed motion to keep the LCP predictable.',
    ],
    sources: [
      { title: 'Vite deployment guide', url: 'https://vitejs.dev/guide/static-deploy.html' },
      { title: 'Netlify build configuration', url: 'https://docs.netlify.com/configure-builds/common-configurations/' },
      { title: 'GitHub Actions caching', url: 'https://docs.github.com/actions/using-workflows/caching-dependencies-to-speed-up-workflows' },
    ],
  },
  {
    title: 'Launching the Helldivers 2 gaming website for a live community',
    slug: 'helldivers2-gaming-website',
    date: '2025-04-20',
    image: blogHd2Website,
    tags: ['Cloud', 'Tooling', 'Auth'],
    readMinutes: 4,
    excerpt:
      'A look at the helldivers2_gaming_website repo and how I ship a lightweight, maintainable site for an active game community.',
    bullets: [
      'Lightweight clan site focused on clarity and maintainability.',
      'Simple hosting and deployment so updates stay easy.',
      'Layouts designed for an active Helldivers 2 community.',
    ],
    content:
      'The helldivers2_gaming_website repo gives a Helldivers clan a home without over-engineering. Next.js with TypeScript, NextAuth, and MongoDB keeps auth and profiles tidy, while the UI leans on styled-components for quick theme changes. Hosting sits on Vercel, so preview branches spin up automatically for content and layout tweaks.\n\nI kept the design opinionated but restrained: hero, roster, and announcements with obvious CTAs to Discord. The deployment flow is intentionally minimal—build, lint, and ship—with environment variables for Discord hooks and Mongo URIs stored outside of Git. Structured metadata and image optimization protect performance even when the art assets get busy.\n\nThis project shows how to build a community site that can be updated by non-engineers: clear slots for copy, images, and links, plus a pipeline that makes rollbacks easy.\n\nThe real win is maintainability under change: content updates land through PRs with preview links, and auth/session handling is scoped per environment to avoid accidental cross-tenant sessions when guilds expand.',
    lessons: [
      'Use environment-scoped NextAuth configs so staging and production auth sessions do not collide.',
      'Image optimization defaults in Next.js go a long way; keep aspect ratios consistent to avoid layout shift.',
      'Treat Discord webhooks as infrastructure—wrap them with retries and clear environment keys per stage.',
    ],
    challenges: [
      'Session cookies conflicting across preview and production; solved with distinct domain configs per env.',
      'Keeping Mongo indexes aligned with profile queries after schema tweaks.',
      'Balancing animated hero effects with fast LCP on mid-range mobile devices.',
    ],
    sources: [
      { title: 'Next.js deployment', url: 'https://nextjs.org/docs/app/building-your-application/deploying' },
      { title: 'NextAuth configuration', url: 'https://authjs.dev/reference/nextjs' },
      { title: 'Vercel Environment Variables', url: 'https://vercel.com/docs/projects/environment-variables' },
    ],
  },
  {
    title: 'Designing an e-commerce frontend for DX and performance',
    slug: 'ecommerce-frontend-architecture',
    date: '2025-05-02',
    image: blogCommerceFrontend,
    tags: ['CI/CD', 'Tooling', 'Frontend', 'DX'],
    readMinutes: 4,
    excerpt:
      'What I focused on in the e-commerce-frontend repo: component structure, API integration, and a CI pipeline that keeps UX fast.',
    bullets: [
      'Component hierarchy designed for easy feature growth.',
      'Clear API contracts back to the e-commerce backend.',
      'CI checks aimed at keeping UX fast and predictable.',
    ],
    content:
      'In the e-commerce-frontend repo, the UI is treated as a product. The component hierarchy mirrors user flows: catalog, PDP, cart, checkout. Each API call has typed contracts back to the backend, and loading states are built in so the shopper never stares at a blank screen.\n\nPerformance stays central: code splitting for heavy routes, image placeholders for product art, and prefetching for cart actions. CI runs lint, unit tests, and a light Lighthouse check to catch regressions before they hit staging. Stripe and JWT integrations are wrapped in utilities so tokens and keys stay isolated from the DOM.\n\nThe result is a storefront that is easy to extend—new categories or promo banners can ship without rewriting the cart—and safe to deploy because the pipeline enforces the basics every time.\n\nI also codified UI patterns for forms, toasts, and validation so the shopping flow feels consistent. That keeps the dev experience predictable when adding variants or upsells without sacrificing page speed.',
    lessons: [
      'Design UI state machines for cart/checkout to avoid edge cases from chained API calls.',
      'Use typed API clients so contract changes surface at build time instead of runtime.',
      'Keep bundle budgets in CI; small nudges prevent gradual performance drift.',
    ],
    challenges: [
      'Coordinating auth token refresh with Stripe flows without double-submitting orders.',
      'Avoiding layout shift from product images by enforcing consistent aspect ratios.',
      'Keeping Lighthouse budgets green when adding marketing scripts.',
    ],
    sources: [
      { title: 'Next.js performance tuning', url: 'https://nextjs.org/docs/app/building-your-application/optimizing' },
      { title: 'Stripe checkout best practices', url: 'https://stripe.com/docs/payments/checkout/client' },
      { title: 'Web Vitals guidance', url: 'https://web.dev/vitals/' },
    ],
  },
  {
    title: 'Running the e-commerce backend with containers and CI',
    slug: 'ecommerce-backend-containers-ci',
    date: '2025-05-25',
    image: blogCommerceBackend,
    tags: ['Cloud', 'CI/CD', 'Backend', 'Reliability'],
    readMinutes: 5,
    excerpt:
      'How the e-commerce-backend repo uses containers, health checks, and CI jobs to stay boring and reliable.',
    bullets: [
      'Containerized backend built for boring, repeatable ops.',
      'Health checks and env vars tuned for simple deploys.',
      'CI jobs that run tests and keep changes safe to ship.',
    ],
    content:
      'The e-commerce-backend repo keeps the API boring and reliable. Django with DRF provides products, carts, orders, and auth; Stripe handles payments; Celery and Redis cover async tasks like receipts and inventory updates. Everything is containerized with health checks so the service can be rolled out with confidence.\n\nCI runs tests, migrations, and linters on every push. Environment templates document required secrets, and Docker images carry sane defaults for gunicorn and static collection. Health endpoints and database pings are built in, making it easy for orchestrators to restart unhealthy pods.\n\nThis backend is designed to scale gradually: add workers for more Celery throughput, hang Redis off to the side, and keep Postgres tuned with straightforward indexes. The point is to avoid surprises—each deploy is repeatable and observable.\n\nFor day-two ops, I keep admin scripts and smoke tests checked in so on-call engineers can quickly validate payments, inventory, and webhook processing after deploys.',
    lessons: [
      'Bake health checks and DB pings into the service so orchestration can auto-heal without custom logic.',
      'Keep migrations in CI to catch schema drift before it hits production.',
      'Separate sync API responses from async side effects; receipts and notifications belong in workers.',
    ],
    challenges: [
      'Coordinating payment webhooks with order state to avoid double-charging or orphan orders.',
      'Balancing Celery retry policies with idempotent tasks for receipts and inventory.',
      'Tuning gunicorn workers to fit memory limits without starving concurrent requests.',
    ],
    sources: [
      { title: 'Django deployment checklist', url: 'https://docs.djangoproject.com/en/stable/howto/deployment/checklist/' },
      { title: 'Stripe webhook idempotency', url: 'https://stripe.com/docs/webhooks/best-practices' },
      { title: 'Celery reliability guide', url: 'https://docs.celeryq.dev/en/stable/userguide/tasks.html#task-retry' },
    ],
  },
  {
    title: 'Helldivers 2 Discord OCR LFG bot: operations notes',
    slug: 'helldivers2-discord-bot',
    date: '2025-11-16',
    image: blogDiscordBot,
    tags: ['SRE', 'Tooling', 'Bots', 'OCR'],
    readMinutes: 4,
    excerpt:
      'Lessons from the helldivers2_discord_bot repo on keeping OCR, queues, and game-night automation stable.',
    bullets: [
      'Discord bot that combines OCR with clan LFG flows.',
      'Queue discipline and rate limits to keep nights stable.',
      'Logs and metrics so drifts and failures are visible early.',
    ],
    content:
      'The helldivers2_discord_bot repo combines Discord automation with OCR so players can post mission screenshots, extract stats, and see leaderboards update automatically. Reliability matters during game nights, so the bot uses queues with backpressure, rate limits for Discord, and OCR workers that can be scaled separately.\n\nMetrics and logs are the safety net: OCR successes/failures, Discord API responses, and queue depth get reported so drifts show up early. Commands are modular, keeping guild-specific settings isolated. Deploys are containerized with health checks for both the bot and the worker.\n\nThis project shows how to keep a “fun” bot production-grade: retries wrapped around Discord calls, capped concurrency for OCR, and clear operational playbooks for restarts.\n\nIn practice, this means predictable alerting too—when OCR accuracy dips or Discord rate limits spike, operators get actionable signals instead of noisy spam, which keeps community nights smooth.',
    lessons: [
      'Treat Discord API limits as a first-class constraint; add jitter and retries with clear caps.',
      'Separate OCR work from the main event loop to avoid blocking chat responsiveness.',
      'Log per-guild performance to spot hotspots and tune limits without impacting all users.',
    ],
    challenges: [
      'OCR accuracy varied by screenshot quality; solved with pre-processing and a small retry budget.',
      'Discord rate limits during peak events required priority queues for critical commands.',
      'Keeping multi-guild config safe from cross-contamination during rapid feature changes.',
    ],
    sources: [
      { title: 'Discord rate limits', url: 'https://discord.com/developers/docs/topics/rate-limits' },
      { title: 'Tesseract OCR tips', url: 'https://tesseract-ocr.github.io/tessdoc/ImproveQuality' },
      { title: 'Twelve-Factor App', url: 'https://12factor.net/' },
    ],
  },
  {
    title: 'Building the Raven DevOps company site for conversions',
    slug: 'devops-company-website',
    date: '2025-03-01',
    image: null,
    tags: ['Tooling', 'UI', 'Marketing'],
    readMinutes: 3,
    excerpt:
      'How the devops_company_website repo uses React, Tailwind, and motion to keep the marketing story clear and fast.',
    bullets: [
      'Route-aware SEO components for every page.',
      'Modular hero, services, and CTA blocks for rapid tweaks.',
      'Motion tuned for polish without slowing first paint.',
    ],
    content:
      'In the devops_company_website repo, clarity and conversions lead. Every section—hero, services, pricing, proof—lives in its own component, so new offers can be swapped in without layout rewrites. Tailwind keeps styling consistent, while Framer Motion adds small, performant transitions that do not block first paint.\n\nSEO is coded per route with canonical tags and social previews, making it safer to share and advertise. The build remains lean: tree-shaken assets, measured motion, and disciplined third-party scripts.\n\nThe result is a marketing site that is easy to iterate: copy changes roll out fast, and every CTA leads to a clear next step without clutter.\n\nI also track content ownership per section, so marketing, sales, and engineering each know where to edit. This prevents regressions when multiple teams touch the same page during launches.',
    lessons: [
      'Componentize CTAs so variants can be A/B tested without layout surgery.',
      'Keep motion subtle; reserve heavier animations for intentional storytelling moments.',
      'Codify meta tags per route to avoid regressions when navigation changes.',
    ],
    challenges: [
      'Balancing animation with LCP targets on mid-range phones.',
      'Keeping typography consistent across rapidly iterated sections.',
      'Avoiding script bloat from analytics and embeds; enforced a strict allowlist.',
    ],
    sources: [
      { title: 'Framer Motion performance', url: 'https://www.framer.com/motion/animation/#performance' },
      { title: 'Tailwind best practices', url: 'https://tailwindcss.com/docs/optimizing-for-production' },
      { title: 'Open Graph protocol', url: 'https://ogp.me/' },
    ],
  },
  {
    title: 'Scaling the chat assistant backend telemetry',
    slug: 'chat-assistant-backend-telemetry',
    date: '2025-11-21',
    image: null,
    tags: ['SRE', 'Tooling', 'APIs', 'Telemetry'],
    readMinutes: 4,
    excerpt:
      'Notes from the chat-assistant-backend repo on streaming responses, telemetry toggles, and safe fallbacks.',
    bullets: [
      'Trimmed streaming payloads to keep the UI snappy.',
      'Feature-flagged telemetry with anonymized intent logging.',
      'Health-checked containers and background workers for stability.',
    ],
    content:
      'The chat-assistant-backend repo powers the Raven AI assistant. The service streams replies, trims payloads, and falls back gracefully when upstream calls slow down. Telemetry is feature-flagged and anonymized to respect privacy while still surfacing intent quality and completion times.\n\nContainers wrap the API and worker processes with health checks. Observability covers traces for request lifecycles and counters for intent hits, errors, and token usage. CI runs tests and static checks on every push, while release toggles let us ship new intent maps without redeploying the whole stack.\n\nThe emphasis is on resilience: predictable failure modes, small timeouts, and circuit breakers that prevent cascading issues to the frontend.\n\nI also keep operational runbooks beside the code so responders know how to rotate keys, drain queues, and flip telemetry toggles without guesswork.',
    lessons: [
      'Trim streaming tokens aggressively; the UI feels faster and mobile clients consume less data.',
      'Feature-flag telemetry so data handling can adapt to privacy requirements without blocking releases.',
      'Add health checks for both API and worker queues to avoid silent failures.',
    ],
    challenges: [
      'Balancing timeout budgets between upstream LLM calls and frontend patience.',
      'Keeping telemetry useful while removing identifiers to stay privacy-friendly.',
      'Managing intent-map updates without full redeploys; solved with hot-reloadable config.',
    ],
    sources: [
      { title: 'OpenAI streaming guide', url: 'https://platform.openai.com/docs/guides/text-generation/streaming' },
      { title: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/' },
      { title: 'FastAPI deployment considerations', url: 'https://fastapi.tiangolo.com/deployment/' },
    ],
  },
  {
    title: 'Automating CSV workflows with a tiny toolkit',
    slug: 'csv-automation-toolkit',
    date: '2025-02-10',
    image: null,
    tags: ['Tooling', 'Data'],
    readMinutes: 3,
    excerpt:
      'The tool_csv_data repo is a small Python kit for cleaning, transforming, and scheduling CSV jobs.',
    bullets: [
      'Config-driven transforms for repeatable runs.',
      'CLI commands for normalize, dedupe, and export tasks.',
      'Logging hooks that flag schema drift early.',
    ],
    content:
      'The tool_csv_data repo is a Python kit for cleaning and transforming CSVs without rewriting scripts every time. Transforms are config-driven and versioned, so you can rerun them confidently across environments. The CLI ships with normalize, dedupe, validate, and export commands, plus logging that surfaces failed rows and schema drift.\n\nJobs can be scheduled via cron or GitHub Actions, and the toolkit emits structured logs so failures are easy to triage. It is a pragmatic middle ground between ad-hoc Excel fixes and full ETL pipelines.\n\nBy keeping the surface area small, teams can automate repetitive CSV chores without adopting heavyweight data tooling.\n\nIt is also audit-friendly: configs document assumptions, logs capture anomalies, and exports can be wired into downstream validation before landing in a warehouse.',
    lessons: [
      'Treat CSV transformations as code with configs checked into version control.',
      'Always emit failed rows separately so humans can fix and rerun quickly.',
      'Build small, composable commands rather than monolithic scripts to keep maintenance low.',
    ],
    challenges: [
      'Handling mixed encodings in inbound files; added explicit UTF-8 validation and fallback.',
      'Schema drift between monthly drops; solved with schema checks and warnings.',
      'Keeping memory usage low on large files; stream processing avoids full in-memory loads.',
    ],
    sources: [
      { title: 'Pandas IO docs', url: 'https://pandas.pydata.org/docs/reference/io.html' },
      { title: 'Cron best practices', url: 'https://crontab.guru/' },
      { title: 'GitHub Actions cron', url: 'https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#schedule' },
    ],
  },
  {
    title: 'Designing the animated assessment webapp',
    slug: 'assessment-webapp-motion',
    date: '2025-02-18',
    image: null,
    tags: ['Tooling', 'UI'],
    readMinutes: 4,
    excerpt:
      'Inside the tool_exam_webapp repo: animated question reveals, Mongo-backed scoring, and server-rendered summaries.',
    bullets: [
      'Route handlers serve assessments from Mongo with validation.',
      'Animated steppers keep users oriented through the flow.',
      'Results are rendered server-side for easy export.',
    ],
    content:
      'The tool_exam_webapp repo delivers a multi-step assessment with animated question reveals. Questions load from Mongo via typed route handlers, and scoring runs server-side so results stay consistent and exportable. The UI uses Framer Motion to keep users oriented as they progress through the steps.\n\nServer-rendered summaries can be downloaded or piped to webhooks for onboarding flows. Validation guards both client and server to stop malformed submissions. The project is structured for easy embedding: brand colors, logos, and copy can be swapped without touching core logic.\n\nThis keeps the experience polished while staying maintainable and auditable.\n\nWe also log anonymized completion funnels, so drop-off points are visible and can be improved without guessing where users stall.',
    lessons: [
      'Validate assessments on both client and server to prevent malformed submissions.',
      'Use motion to guide attention, not to distract—short, consistent animations work best.',
      'Render results server-side so exports and audits share one source of truth.',
    ],
    challenges: [
      'Handling partial submissions on flaky networks; added resumable state and retries.',
      'Keeping animation smooth on low-power devices; simplified transitions to reduce jank.',
      'Ensuring question banks stay versioned so historical results can be reproduced.',
    ],
    sources: [
      { title: 'Next.js route handlers', url: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers' },
      { title: 'Framer Motion accessibility', url: 'https://www.framer.com/motion/accessibility/' },
      { title: 'MongoDB schema validation', url: 'https://www.mongodb.com/docs/manual/core/schema-validation/' },
    ],
  },
  {
    title: 'Standing up the welding institute site fast',
    slug: 'welding-institute-site',
    date: '2025-01-12',
    image: null,
    tags: ['Tooling', 'Frontend'],
    readMinutes: 3,
    excerpt:
      'The welding_institute_website repo shows a Next.js scaffold tuned for training programs with quick deploys.',
    bullets: [
      'App Router baseline with typed metadata.',
      'Responsive sections ready for courses and CTAs.',
      'Netlify-friendly configs for preview deploys.',
    ],
    content:
      'In the welding_institute_website repo, the goal was a fast scaffold for a training institute. Next.js App Router supplies typed metadata, and the layout includes course highlights, instructor slots, and CTAs that can be swapped without code changes. Styling stays minimal to keep load times low.\n\nNetlify-friendly configs and environment templates make preview deploys trivial. Responsive sections are pre-sized to avoid layout shift, keeping the experience clean on mobile.\n\nThis setup favors speed: content editors can update copy and links, while developers keep the build lean and observable.\n\nCourse owners can iterate on curricula quickly because the information architecture is fixed: hero, course grid, instructor spotlights, and CTA blocks that map to enrollment forms.',
    lessons: [
      'Start with predictable sections (hero, course grid, testimonials) to accelerate copy swaps.',
      'Use typed metadata so social previews stay correct as pages evolve.',
      'Keep images constrained to consistent ratios to avoid CLS on mobile.',
    ],
    challenges: [
      'Ensuring responsive typography without bloating CSS; resolved with utility classes and clamp().',
      'Avoiding Netlify 404s on nested routes; added fallback rewrites early.',
      'Coordinating content edits without overwriting metadata—documented slots help.',
    ],
    sources: [
      { title: 'Next.js metadata', url: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata' },
      { title: 'Netlify SPA redirects', url: 'https://docs.netlify.com/routing/redirects/rewrites-proxies/' },
      { title: 'Responsive typography with clamp', url: 'https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/' },
    ],
  },
  {
    title: 'Launching the welding services marketing site',
    slug: 'welding-service-site',
    date: '2025-01-20',
    image: null,
    tags: ['Tooling', 'Frontend', 'Local SEO'],
    readMinutes: 3,
    excerpt:
      'A lightweight Next.js build in the welding_service_website repo aimed at clear service listings and fast contact.',
    bullets: [
      'Hero and services grids that are easy to edit.',
      'Contact CTAs ready for mailto or form integrations.',
      'Mobile-first layout that keeps images in check.',
    ],
    content:
      'The welding_service_website repo focuses on speed and clarity for a trades business. It ships with a simple hero, services grid, and CTA blocks that can be wired to mailto links or forms. The layout is mobile-first with safe aspect ratios to avoid layout shift, and copy blocks are easy to swap.\n\nHosting remains simple, with environment variables for contact endpoints and analytics kept outside of Git. The goal is to publish fast, rank locally, and make it effortless for visitors to reach out.\n\nThis project favors maintainability: small CSS footprint, predictable sections, and a deploy flow that is hard to break.\n\nLocal SEO cues—structured data, fast pages, and clear contact info—are baked in so the site shows up cleanly on mobile when customers search nearby.',
    lessons: [
      'Keep service summaries short and scannable; layer detail behind CTAs.',
      'Use consistent CTAs across the site to reduce decision fatigue for visitors.',
      'Prioritize local SEO basics (metadata, fast loads) before fancy visuals.',
    ],
    challenges: [
      'Preventing layout shift with varied service images; solved with consistent wrappers.',
      'Keeping contact links flexible for different mail/CRM setups.',
      'Avoiding unused CSS as sections changed; purged and audited styles regularly.',
    ],
    sources: [
      { title: 'Next.js image optimization', url: 'https://nextjs.org/docs/app/api-reference/components/image' },
      { title: 'Local SEO starter', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
      { title: 'Accessible CTAs', url: 'https://www.w3.org/WAI/tips/writing/' },
    ],
  },
];
