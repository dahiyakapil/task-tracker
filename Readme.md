# Task Tracker

A simple full-stack Task Tracker application for creating, updating, filtering, and deleting tasks. This repository contains a Node/Express backend and a Vite + React frontend.

**Contents**
- Backend: server code and API (folder: `backend`)
- Frontend: React UI built with Vite (folder: `frontend`)

**Tech stack**
- Backend: Node.js, Express, (MongoDB expected via `connectDB`)
- Frontend: React + Vite

Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- MongoDB (local or cloud) if you intend to run the backend with persistence

Environment variables
- Backend: create `backend/.env` with at least:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
```

- Frontend (Vite): create `frontend/.env` (optional) with:

```
VITE_API_URL=http://localhost:5000/api
```

Running the project
-------------------

Backend (development)

Open a terminal and run:

```bash
cd backend
npm install
# Development (if project uses nodemon or a dev script)
npm run dev
# Or start the production server
npm start
```

Notes:
- If `npm run dev` is not present, `npm start` will usually start the server. Check `backend/package.json` for exact scripts.
- Default backend port used by this README: `5000` (adjust according to your code or `.env`).

Frontend (development)

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Notes:
- Vite's dev server default port is `5173` (the terminal will show the actual URL).
- The frontend expects the backend API to be reachable at the URL configured in `VITE_API_URL` (see env example above).

Build and preview frontend (production)

```bash
cd frontend
npm run build
npm run preview
```

Running both at once
---------------------
- Open two terminals and run backend and frontend separately (recommended).

```bash
npm install -g concurrently
cd backend && npm install
cd ../frontend && npm install
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

Project structure (high level)
- `backend/` — Express server, routes, controllers, models
- `frontend/` — React app (Vite), components, services

Troubleshooting
- If the frontend can’t reach the API, confirm `VITE_API_URL` matches the backend URL and port.
- Check `backend` logs for database connection errors (verify `MONGO_URI`).


