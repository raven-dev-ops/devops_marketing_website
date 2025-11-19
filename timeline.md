# Raven Development Operations – Project Timeline (Draft)

This is a working draft of the delivery timeline for the Raven Development Operations demo website and supporting assets.

## Phase 1 – Initial Marketing Site

- Standalone marketing site with core pages (Home, Services, Portfolio, Blog, Pricing, About, Contact, Legal, 404).
- Animated hero, “trusted by” carousel, and testimonial sections.
- Netlify deployment (static hosting + Functions) with SPA routing.
- Basic contact flow and Calendly integration.

## Phase 2 – Assistant Backends

- Bootstrap Node-based assistant backend (`OpenAuxilium`) with Express and `node-llama-cpp`.
- Wire the on-site chatbot and contact form enrichment to `OpenAuxilium` for local development.
- Introduce the Python FastAPI `chat-assistant-backend` as the production-oriented assistant service.
- Align frontend wiring so the chatbot can talk to either backend via `REACT_APP_ASSISTANT_API_URL`.

## Phase 3 – Documentation & Owner Experience

- Establish NO LICENSE / all-rights-reserved model for the repo.
- Create internal wiki entry (`wiki.md`) summarizing structure, routing, and assistant wiring.
- Expand this `timeline.md` with more granular milestones (e.g., individual sprints).
- Maintain a curated `roadmap.md` for “what’s next” across the site and backends.
- Add clear versioning/tagging guidance in `README.md` and `SECURITY.md` for this repo and the Python backend.

## Phase 4 – Future Enhancements (Ideas)

- More robust test coverage for key pages and flows.
- Additional demo scenarios for the chatbot and quizzes.
- Deeper integrations (monitoring, error tracking, or additional scheduling providers).
- Optional release notes / changelog surfaced on the public site once GitHub Releases are in regular use.

