# gourang® — Portfolio

Personal portfolio of Gourangkumar Monashara, AI Developer.

## Repo layout

```
frontend/     Vite + React + TypeScript + Tailwind app (the website)
backend/      Reserved for future API services
deployment/   Docker setup and deploy scripts
vercel.json   Vercel config (root-level by requirement; builds frontend/)
```

## Local development

```sh
cd frontend
npm install
npm run dev    # http://localhost:8080
```

## Production build

```sh
cd frontend
npm run build  # outputs frontend/dist
```

Deployed via Vercel; every push to `main` triggers a build.
