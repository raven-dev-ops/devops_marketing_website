# Raven Development Operations – Internal Wiki (Hub)

This file acts as a lightweight wiki hub for the demo website and assistant backends. It is intended for maintainers and collaborators working on the Raven Development Operations assets.

## Overview

- **Repository:** Marketing / demo site plus optional assistant backends.
- **Frontend:** React 18 + React Router + Tailwind + Netlify Functions.
- **Assistant backends:**
  - Python FastAPI (`chat-assistant-backend` repo) for production-oriented chat and operations.
  - Node + Express (`OpenAuxilium/`) with optional local LLaMA model via `node-llama-cpp`.

For a high-level project description, start with `README.md`.

## Key Areas

- **Architecture**
  - `README.md` – tech stack, deployment model, assistant backend overview.
  - `OpenAuxilium/` – chat API (`/chat`, `/sessions`, `/contact-link`), Calendly integration, local model runner.
  - `netlify/functions/create-calendly-link.js` – serverless function for Calendly links.
  - `RELEASES.md` – release notes and tagging guidance for this repo.

- **Roadmap & Timeline**
  - `roadmap.md` – near-term, medium-term, and long-term work.
  - `timeline.md` – phased delivery plan for the website and backends.

- **Security**
  - `SECURITY.md` – supported versions, reporting process, and operational guidance.
  - `.github/workflows/codeql.yml` – CodeQL configuration for automated code scanning.

## Pages & Routes

Frontend routes live under `src/pages/` and are wired via React Router:

- `Home.jsx` – primary landing page and hero content.
- `Services.jsx` – core services and engagement types.
- `Portfolio.jsx` – example engagements / prior work.
- `Blog.jsx`, `BlogPost.jsx` – blog listing and individual posts.
- `Pricing.jsx` – pricing tiers and FAQs.
- `About.jsx` – background on Raven Development Operations.
- `Contact.jsx` – Calendly embed, contact form, and chat enrichment.
- `Legal.jsx` – legal / policy content.
- `NotFound.jsx` – 404 page.

The on-site chatbot component is defined in `src/components/ChatBot.jsx` and is used on the main pages (for example `Home.jsx`).

## Chatbot & Backend Wiring

- **Frontend:**
  - `src/components/ChatBot.jsx` calls the assistant API at:
    - `process.env.REACT_APP_ASSISTANT_API_URL` if defined, otherwise
    - `process.env.REACT_APP_OPENAUXILIUM_URL`, otherwise
    - `http://localhost:4000`.
  - `src/pages/Contact.jsx` uses the same base URL for the optional `/contact-link` enrichment endpoint.

- **Backend (Python `chat-assistant-backend`):**
  - Exposes:
    - `GET /health` – basic health + DB status.
    - `POST /api/chat` – main chat endpoint used by the chatbot.
  - Configured and deployed per its own repo (see `chat-assistant-backend` docs).

- **Backend (Node `OpenAuxilium/`, optional):**
  - `src/index.js` exposes:
    - `GET /health` – basic health check.
    - `POST /chat` – alternative chat endpoint.
    - `POST /sessions` and `POST /sessions/:id/end` – session lifecycle.
    - `POST /contact-link` – links contact form data to `chat_user_id`.
  - `src/modelRunner.js` – local LLaMA model integration (optional).
  - `src/integrations/emailClient.js` – appointment email via SMTP.
  - `src/integrations/calendlyClient.js` – Calendly API helper.

To run everything locally with OpenAuxilium:

1. **Assistant backend (OpenAuxilium)**
   - Copy `OpenAuxilium/.env.example` to `OpenAuxilium/.env` and adjust values (port, `CORS_ORIGIN`, optional model and Calendly settings).
   - From `OpenAuxilium/`:
     - `npm install`
     - `npm run dev`
   - Backend listens on `http://localhost:5050` by default.

2. **Frontend**
   - From repo root:
     - `npm install`
     - Optionally create `.env.local` with:
       - `REACT_APP_ASSISTANT_API_URL=http://localhost:5050`
     - `npm start`
   - Visit `http://localhost:3000` and open the chatbot bubble to exercise `/chat`.

## Versioning & Tags

- Frontend site version is defined in `package.json` (currently `1.0.0`).
- OpenAuxilium backend version is defined in `OpenAuxilium/package.json` (currently `0.1.0`).
- The Python `chat-assistant-backend` version is tracked in its own repository.
- Recommended lightweight practice for this repo:
  - Tag frontend releases as `website-vX.Y.Z`.
  - Tag OpenAuxilium releases as `openauxilium-vX.Y.Z`.
  - Keep `SECURITY.md` and any future `CHANGELOG.md` entries aligned with these tags.

Release automation is not yet wired up; tags are created manually using Git and pushed to the remote.

## Operations Notes

- **Secrets:** keep `.env` files, Calendly tokens, SMTP credentials, model paths, Mongo URIs, API keys, and any other secrets out of Git. Use platform secrets (Netlify, Heroku, etc.).
- **Monitoring:** rely on hosting platform logs for the assistant backend and Netlify Functions. Add external monitoring as needed.
- **Future documentation:** as the project evolves, link more detailed docs (for example onboarding guides, runbooks, and CI/CD notes) from this `wiki.md` file.

