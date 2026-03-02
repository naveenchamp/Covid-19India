# Covid-19 India Portal

This repo has:

- Backend API: `backend/Covid-19India`
- Frontend app: `frontend/frontend`

## Local Run

Backend:

```bash
cd backend/Covid-19India
npm install
npm start
```

Frontend:

```bash
cd frontend/frontend
npm install
npm run dev
```

## Render Deploy

This repo includes a Render Blueprint: `render.yaml`.

live link:https://covid-19india-7.onrender.com/

### Option 1 (recommended): Blueprint deploy

1. In Render, click **New +** -> **Blueprint**.
2. Connect this GitHub repo.
3. Render creates:
   - `covid19india-backend` (Node web service)
   - `covid19india-frontend` (Static site with SPA rewrite)
4. Set env vars in Render:
   - Backend: `CORS_ORIGINS=https://<your-frontend>.onrender.com,http://localhost:5173`
   - Frontend: `VITE_API_BASE_URL=https://<your-backend>.onrender.com`
5. Deploy both services.

### Option 2: Manual deploy

Backend service:

- Root Directory: `backend/Covid-19India`
- Build Command: `npm install`
- Start Command: `npm start`

Frontend static site:

- Root Directory: `frontend/frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Rewrite: `/* -> /index.html`
- Env: `VITE_API_BASE_URL=https://<your-backend>.onrender.com`
