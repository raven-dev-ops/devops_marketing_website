# Raven Development Operations – Security Policy

This repository contains the marketing site and optional assistant backend for Raven Development Operations. It is not a multi‑tenant SaaS product, but it may be deployed to public infrastructure (for example, Netlify + Functions and Heroku or a Node server).

## Supported Versions

Security updates are provided on a best‑effort basis for the most recent major versions of the frontend site and the optional assistant backend.

| Component              | Version range | Supported          |
| ---------------------- | ------------- | ------------------ |
| Website (`package.json`)     | 1.0.x       | :white_check_mark: |
| OpenAuxilium backend (`OpenAuxilium/package.json`) | 0.1.x       | :white_check_mark: |
| Earlier versions       | < listed     | :x:                |

When cutting a new release, update this table to reflect which ranges are still receiving security fixes.

## Reporting a Vulnerability

If you believe you have found a security issue in this project:

- Do **not** open a public GitHub issue with sensitive details.
- Instead, either:
  - Open a private *GitHub Security Advisory* for this repository, or
  - Email the maintainer using the contact details published on the Raven Development Operations website (for example the support or security contact address).

Please include:

- A description of the issue and potential impact.
- Exact steps or proof‑of‑concept to reproduce, when possible.
- Any logs, stack traces, or configuration details that help narrow down the problem.

You can generally expect:

- An initial acknowledgement within a reasonable timeframe (typically a few business days).
- Follow‑up questions as needed to reproduce and assess impact.
- Notification once a fix is prepared and released, along with any remediation steps (for example, updating to a patched version or rotating credentials).

## Operational Security Guidelines

Deployments of this project should follow these practices:

- Never commit real secrets (API keys, database URIs, SMTP credentials, Calendly tokens, model paths) to Git. Use environment variables or platform‑specific secret stores.
- Keep `.env` files, local model files, and `node_modules` out of version control (the root `.gitignore` already covers these).
- Restrict assistant backend access (for example `OpenAuxilium`) using CORS and network‑level controls so only the website origin can call it.
- Monitor third‑party dependencies for vulnerabilities using tools like GitHub Dependabot and CodeQL (this repo already includes a CodeQL workflow under `.github/workflows/codeql.yml`).
- Rotate credentials (API tokens, SMTP passwords, etc.) if you suspect they may have been exposed.

If you have questions about secure deployment or configuration for Raven Development Operations assets, reach out using the same channels as for vulnerability reports.
