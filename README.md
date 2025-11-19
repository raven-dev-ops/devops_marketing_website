# Raven Development Operations – Demo Website

This repository contains the Raven Development Operations marketing / demo website plus an optional assistant backend used to power the on‑site chatbot and contact enrichment. It is built with React, React Router, Tailwind CSS, Framer Motion, and Netlify serverless functions.

## Features

- Multi‑page marketing site (Home, Services, Portfolio, Blog, Pricing, About, Contact, Legal, 404).
- Animated hero, “trusted by” sections, and testimonials.
- Interactive demo quizzes for different engagement types.
- On‑site chatbot that can call either a Python or Node‑based assistant backend.
- Contact form integrated with Netlify Forms and Calendly scheduling.
- Netlify Function to generate Calendly scheduling URLs based on meeting type.

## Tech Stack

- **Frontend:** React 18, React Router, `react-scripts` (Create React App), Tailwind CSS.
- **UI / UX:** Framer Motion animations, Heroicons, custom layout and theming.
- **Assistant backends (optional):**
  - Python FastAPI (`chat-assistant-backend` repo).
  - Node.js + Express (`OpenAuxilium` subproject) with optional `node-llama-cpp`.
- **Scheduling:** Calendly API via a Netlify Function (`netlify/functions/create-calendly-link.js`).
- **Deployment:** Netlify static hosting + Functions, SPA routing via `netlify.toml`.

## Project Structure

- `src/`
  - `pages/` – Route components such as `Home.jsx`, `Services.jsx`, `Portfolio.jsx`, `Blog.jsx`, `Contact.jsx`, `Pricing.jsx`, `Legal.jsx`, `NotFound.jsx`, etc.
  - `components/` – Reusable UI components (hero sections, pricing tables, layout, chatbot, quizzes, etc.).
  - `quiz/` – Demo quiz flows for different engagement types.
  - `hooks/` – Shared React context/state (e.g., search, theming).
  - `assets/` – Images and brand assets.
- `public/` – Static assets (`index.html`, `manifest.json`, `robots.txt`, `sitemap.xml`, etc.).
- `netlify/` – Netlify Functions (currently `create-calendly-link.js` for Calendly integration).
- `OpenAuxilium/` – Optional Node‑based assistant backend (local model and richer flows).
- `wiki.md` – Internal wiki hub for structure, routing, versioning, and operations notes.
- `roadmap.md`, `timeline.md` – High‑level planning docs.

## Getting Started (Frontend)

### Prerequisites

- Node.js 18+
- npm (bundled with most Node.js installs)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm start
```

This starts the React app at `http://localhost:3000`.
The chatbot and contact enrichment will call the assistant backend configured via environment variables (see below).

### Build for production

```bash
npm run build
```

The production build is emitted to the `build/` directory (what Netlify serves in production).

## Assistant Backends

This frontend can talk to one of two assistant backends.

### Python `chat-assistant-backend` (recommended)

- Repo: `https://github.com/raven-dev-ops/chat-assistant-backend`
- Default local URL: `http://localhost:4000`
- Key endpoints:
  - `POST /api/chat` – primary chat endpoint (body: `{ "message": "...", "context": { ... } }`).
  - `GET /health` – health and DB status.
- Environment: configured via the backend repo’s `.env` and `backend/.env` (MongoDB, OpenAI API key, etc.).

### Node `OpenAuxilium` backend (optional, local model)

- Lives in the `OpenAuxilium/` subdirectory of this repo.
- Provides:
  - Chat API, session management, and optional local LLaMA model via `node-llama-cpp`.
  - Contact enrichment endpoint (`POST /contact-link`) used by the contact form.
- Default local URL: `http://localhost:5050`
- To run:

```bash
cd OpenAuxilium
npm install
npm run dev
```

## Frontend assistant configuration

The chatbot (`src/components/ChatBot.jsx`) and contact page (`src/pages/Contact.jsx`) both use the same base URL for the assistant API:

- `REACT_APP_ASSISTANT_API_URL` – preferred variable.
- `REACT_APP_OPENAUXILIUM_URL` – legacy name, still honored as a fallback.

Resolution order in the code:

```text
REACT_APP_ASSISTANT_API_URL
  → REACT_APP_OPENAUXILIUM_URL
  → http://localhost:4000 (fallback)
```

Example `.env.local` values for this repo:

- Use the Python backend locally:

  ```bash
  REACT_APP_ASSISTANT_API_URL=http://localhost:4000
  ```

- Use the Node `OpenAuxilium` backend locally:

  ```bash
  REACT_APP_ASSISTANT_API_URL=http://localhost:5050
  ```

For hosted deployments (for example Netlify), set `REACT_APP_ASSISTANT_API_URL` to the public URL of your assistant backend (for example, the Heroku URL for `chat-assistant-backend`). Ensure that backend’s CORS configuration allows your site’s origin.

## Calendly / Netlify Function

Scheduling links are generated via the Netlify Function `netlify/functions/create-calendly-link.js`. It can either:

- Use explicitly configured URLs per meeting type (Zoom, Teams, Google, phone), or
- Call the Calendly API to discover event types and mint ephemeral scheduling links.

Configure these in your Netlify site (or local Netlify dev environment):

- `CALENDY_TOKEN` or `CALENDLY_TOKEN` – Calendly PAT used for API calls.
- Optional mapping overrides:
  - `CALENDY_URL_ZOOM` / `CALENDLY_URL_ZOOM`
  - `CALENDY_URL_TEAMS` / `CALENDLY_URL_TEAMS`
  - `CALENDY_URL_GOOGLE` / `CALENDLY_URL_GOOGLE`
  - `CALENDY_URL_PHONE` / `CALENDLY_URL_PHONE`
  - `CALENDY_URL_DEFAULT` / `CALENDLY_URL_DEFAULT`

If no token is configured, the function returns the configured default URL.

## Netlify Deployment

Netlify is configured via `netlify.toml`:

- `publish = "build"` – serves the React production build.
- `functions = "netlify/functions"` – directory for Netlify Functions.
- SPA routing is enabled by redirecting all non‑function paths to `/index.html`.

Typical deployment steps:

1. Push this repo to GitHub (or another supported provider).
2. Connect the repo in Netlify.
3. Use `npm run build` as the build command.
4. Set environment variables for Calendly and `REACT_APP_ASSISTANT_API_URL`.

## Testing

This project uses the default Create React App testing setup (`@testing-library/react`, `@testing-library/jest-dom`).

To run tests:

```bash
npm test
```

You can add component tests under `src/__tests__/` following the existing patterns.

## Versioning, Tags, and Wiki

- **Frontend website version:** defined in `package.json` (currently `1.0.0`).
- **OpenAuxilium backend version:** defined in `OpenAuxilium/package.json` (currently `0.1.0`).
- **Python `chat-assistant-backend` version:** defined and tagged in its own repo.
- **Recommended tags for this repo:**
  - Frontend releases: `website-vX.Y.Z`.
  - OpenAuxilium releases: `openauxilium-vX.Y.Z`.
- **Wiki:** use `wiki.md` as the internal hub for architecture notes, routes/pages, operational guidance, and links to `roadmap.md` and `timeline.md`.

When cutting a new release of this repo, bump the appropriate version field(s), create a Git tag using the conventions above, and update `SECURITY.md` if support ranges change. The Python backend follows its own versioning and tagging in its repository.

## License

This project is provided under a **NO LICENSE** / all‑rights‑reserved model for the original Raven Development Operations code and content in this repository. See `LICENSE` for details. Third‑party dependencies remain under their own respective licenses.

## Notes

- Secrets (Calendly tokens, model paths, MongoDB URIs, API keys, etc.) should be stored in environment variables and never committed.
- The site content and copy are tailored to Raven Development Operations and may assume context about DevOps, CI/CD, observability, and fractional DevOps engagements.

