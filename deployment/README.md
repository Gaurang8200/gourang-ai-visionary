# Deployment

- `Dockerfile`, `compose.yaml`, `compose.debug.yaml`, `.dockerignore` — container setup for self-hosting the frontend.
- `DEPLOY_RUN_ME.py` — legacy one-shot deploy helper script.
- Vercel config lives at the repo root (`vercel.json`) because Vercel reads it from there. It installs and builds from `frontend/` and serves `frontend/dist` with an SPA rewrite.

Local dev:

```sh
cd frontend
npm install
npm run dev   # port 8080
```
