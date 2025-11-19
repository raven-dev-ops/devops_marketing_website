# Raven Development Operations – Website Releases

This file summarizes notable releases for the Raven Development Operations demo website repository. It is intended to complement GitHub Releases and the separate backend changelog in `chat-assistant-backend`.

## website-v1.0.0 (current)

- Initial tagged release of the marketing / demo site.
- Chatbot wired to the Python FastAPI `chat-assistant-backend` via `REACT_APP_ASSISTANT_API_URL` and the `POST /api/chat` endpoint.
- Optional Node.js `OpenAuxilium` backend supported for local experimentation and local LLaMA models.
- Internal docs refreshed:
  - `README.md` documents both assistant backends and environment variable wiring.
  - `wiki.md` acts as an internal hub for routes, assistant wiring, and operations notes.
  - `roadmap.md` and `timeline.md` describe planned enhancements and project phases.
  - `SECURITY.md` clarifies supported versions and vulnerability reporting.

### Tagging instructions (run after committing changes)

After you commit a release state on the `main` branch, create an annotated tag:

```bash
git tag -a website-v1.0.0 -m "Website 1.0.0 – initial integrated release"
git push origin website-v1.0.0
```

## openauxilium-v0.1.0 (current)

The `OpenAuxilium/` subproject provides an optional Node-based assistant backend.

- Express server exposing:
  - `POST /chat` – chat endpoint with knowledge base, scheduling, and local model fallback.
  - `POST /sessions` / `POST /sessions/:id/end` – simple in-memory session lifecycle.
  - `POST /contact-link` – links contact form data to a `chat_user_id`.
  - `GET /health` – basic health endpoint.
- Optional local LLaMA model support via `node-llama-cpp`.

Version `0.1.0` is the current baseline in `OpenAuxilium/package.json`.

### Tagging instructions (run after committing changes)

```bash
git tag -a openauxilium-v0.1.0 -m "OpenAuxilium 0.1.0 – initial baseline"
git push origin openauxilium-v0.1.0
```

## Python `chat-assistant-backend`

The Python backend lives in a separate repository:

- Repo: `https://github.com/raven-dev-ops/chat-assistant-backend`
- Current documented version: `0.2.0` (see `backend/__init__.py` and that repo’s `CHANGELOG.md`).

Use that repository’s own tags and releases for backend-specific changes.

