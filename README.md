# Red Earth Demo

React + Vite frontend demo.

## Local development

```bash
npm install
npm run dev
```

The dev server listens on http://localhost:3000

## Alloy sandbox

```bash
docker compose -f docker-compose.alloy.yaml up
```

Alloy proxies http://localhost:8080 to the dev server on port 3000
(configured in `.alloy/environment.json`).
