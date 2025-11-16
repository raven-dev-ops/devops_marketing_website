import service1Banner from '../assets/service1_banner.png';
import service2Banner from '../assets/service2_banner.png';
import service3Banner from '../assets/service3_banner.png';
import service4Banner from '../assets/service4_banner.png';
import service5Banner from '../assets/service5_banner.png';

export const serviceAreas = [
  {
    title: 'DevOps Assessment & Roadmap',
    blurb: 'Audit CI/CD, infra, observability, and delivery practices to build a pragmatic plan.',
    outcomes: [
      'Clear, honest view of your delivery and operations maturity',
      'Prioritized, low-risk improvements you can start on immediately',
      'Executive-ready roadmap that ties technical work to business outcomes',
    ],
    format: 'Assessment + roadmap workshop',
    image: service1Banner,
  },
  {
    title: 'CI/CD Pipelines & Automation',
    blurb: 'GitHub Actions pipelines for testing, container builds, and zero-downtime deploys.',
    outcomes: [
      'CI/CD pipelines that keep every change testable and traceable',
      'Deployment patterns with safe rollback paths when something misbehaves',
      'Automated quality gates for tests, security scans, and policy checks',
    ],
    format: 'Implementation sprint or retainer',
    image: service2Banner,
  },
  {
    title: 'Infrastructure as Code & Cloud',
    blurb: 'Terraform, container orchestration, and secrets management for resilient cloud stacks.',
    outcomes: [
      'Repeatable environments defined in code from dev to production',
      'Cloud configurations aligned with security and compliance policies',
      'Hardened secrets management and least-privilege access patterns',
    ],
    format: 'Fixed-scope deployment or ongoing support',
    image: service3Banner,
  },
  {
    title: 'Observability & Reliability',
    blurb: 'Logging, metrics, dashboards, and alerting tuned to your SLOs and on-call reality.',
    outcomes: [
      'Dashboards and alerts tuned to service-level objectives instead of noise',
      'Faster incident detection and response supported by clear telemetry',
      'Runbooks and reliability practices that reduce weekend fire drills',
    ],
    format: 'Reliability sprint + training',
    image: service4Banner,
  },
  {
    title: 'Dev Environment & Tooling',
    blurb: 'Developer experience upgrades: local envs, pre-commit hooks, linting, and testing.',
    outcomes: [
      'Fast, consistent local environments that mirror production where it matters',
      'Pre-commit checks and CI linting to keep the main branch healthy',
      'Developer workflows that reduce context switching and review friction',
    ],
    format: 'Pairing sessions or enablement workshop',
    image: service5Banner,
  },
  {
    title: 'Custom Software Development',
    blurb: 'Tailored web apps, APIs, and internal tools that replace spreadsheets and brittle scripts.',
    outcomes: [
      'Modern web applications and APIs designed around your real-world processes',
      'Automation and integrations that remove manual handoffs and repetitive tasks',
      'Quality-focused delivery with tests, monitoring, and clear deployment paths',
    ],
    format: 'Fixed-scope build or ongoing product support',
    image: service1Banner,
    flipImage: true,
  },
];
