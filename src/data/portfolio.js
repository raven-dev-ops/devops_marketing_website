import discordBotSs1 from '../assets/discord_bot_ss_1.png';
import discordBotSs2 from '../assets/discord_bot_ss_2.png';
import discordBotSs3 from '../assets/discord_bot_ss_3.png';
import discordBotSs4 from '../assets/discord_bot_ss_4.png';

export const portfolioItems = [
  {
    title: 'Galactic Phantom Division Website',
    slug: 'galactic-phantom-division',
    description:
      'Helldivers clan platform with authentication, Discord automation, and cloud deployment built for resilience.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth', 'Docker', 'Heroku'],
    outcomes: [
      'Containerized build and deploy pipeline with CI-ready Dockerfiles for consistent releases.',
      'Secrets management and environment configuration kept in sync across preview and production deployments.',
      'Discord webhook automation implemented with rate-aware queues to stay within API limits while remaining responsive.',
    ],
    github: 'https://github.com/ravdevops/helldivers2_clan_website',
    screenshots: [
      '/portfolio/galactic-phantom-1.png',
      '/portfolio/galactic-phantom-2.png',
      '/portfolio/galactic-phantom-3.png',
      '/portfolio/galactic-phantom-4.png',
    ],
  },
  {
    title: 'Art Bay Backend (Django)',
    slug: 'ecommerce-backend',
    description:
      'Modular Django backbone for storefronts with payments, orders, and CI-ready Docker images.',
    tech: ['Django', 'Docker', 'PostgreSQL', 'GitHub Actions'],
    outcomes: [
      'Production-grade container images with health checks and an automated static asset pipeline.',
      'Environment templates and .env.example files that make onboarding new developers straightforward.',
      'Pre-commit hooks and CI workflows that keep migrations, tests, and linting consistently green.',
    ],
    github: 'https://github.com/ravdevops/e-commerce-backend',
    screenshots: [
      '/portfolio/art-bay-backend-1.png',
      '/portfolio/art-bay-backend-2.png',
      '/portfolio/art-bay-backend-3.png',
      '/portfolio/art-bay-backend-4.png',
    ],
  },
  {
    title: 'Art Bay Frontend (Next.js Storefront)',
    slug: 'art-bay-frontend',
    description:
      'Headless storefront with Stripe, JWT auth, and DRF integration shipped to Netlify.',
    tech: ['Next.js', 'Stripe', 'Netlify', 'JWT', 'DRF'],
    outcomes: [
      'Clear separation of public versus secret environment variables for safe, reproducible builds.',
      'Optimized static asset pipeline and CDN-friendly deployment tuned for fast page loads.',
      'Secure payment flow with retries and safeguards around Stripe API and webhook failures.',
    ],
    github: 'https://github.com/ravdevops/e-commerce-frontend',
    screenshots: [
      '/portfolio/art-bay-frontend-1.png',
      '/portfolio/art-bay-frontend-2.png',
      '/portfolio/art-bay-frontend-3.png',
      '/portfolio/art-bay-frontend-4.png',
    ],
  },
  {
    title: 'Helldivers 2 Discord Bot',
    slug: 'helldivers-bot',
    description:
      'Python bot with OCR pipelines, scheduled leaderboards, and multi-guild configuration.',
    tech: ['Python', 'Docker', 'MongoDB', 'OCR', 'Heroku'],
    outcomes: [
      'Scheduled jobs for leaderboard generation and health checks so the bot remains reliable during peak usage.',
      'Background OCR processing with controlled concurrency to keep image queues flowing without overloading services.',
      'Per-guild configuration and secrets isolation so each community stays logically separated and secure.',
    ],
    github: 'https://github.com/ravdevops/helldivers2_discord_ocr_lfg_clan_bot',
    screenshots: [
      discordBotSs1,
      discordBotSs2,
      discordBotSs3,
      discordBotSs4,
    ],
  },
];
