# Deployment Guide: Job Application Tracker

This guide walks you through deploying the **Backend to Render** and the **Frontend to Netlify**.

---

## Part 1: Backend Deployment (Render)

1.  **Push your code to GitHub** (if you haven't already).
2.  Go to [Render Dashboard](https://dashboard.render.com).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Configure the service**:
    *   **Name**: `job-tracker-backend` (or similar)
    *   **Root Directory**: `backend` (Important!)
    *   **Environment**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
6.  **Environment Variables** (Advanced / Environment Section):
    *   Add `MONGO_URI`: (Copy from your local .env or MongoDB Atlas)
    *   Add `JWT_SECRET`: (Create a strong secret or copy local)
    *   Add `CLIENT_URL`: `https://YOUR-NETLIFY-SITE-NAME.netlify.app` (You will update this *after* deploying frontend, or set a temporary one).
7.  Click **Create Web Service**.
8.  **Wait for deployment**. Once live, copy the **onrender.com URL** (e.g., `https://job-tracker-backend.onrender.com`).

---

## Part 2: Frontend Deployment (Netlify)

1.  Go to [Netlify](https://app.netlify.com).
2.  Click **Add new site** -> **Import an existing project**.
3.  Connect to GitHub and select your repo.
4.  **Configure the site**:
    *   **Base directory**: `frontend`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `frontend/build`
5.  **Environment Variables** (Click "Show advanced" or go to Site Settings > env after):
    *   Key: `REACT_APP_API_URL`
    *   Value: `https://<YOUR-RENDER-URL>.onrender.com/api` (Paste the URL from Part 1. **Don't forget the `/api` at the end!**)
6.  Click **Deploy site**.

---

## Part 3: Final Wiring

1.  Once Netlify deploys, copy your new **Netlify URL** (e.g., `https://my-job-tracker.netlify.app`).
2.  Go back to **Render Dashboard** -> Environment Variables.
3.  Update/Add `CLIENT_URL` to match your *actual* Netlify URL.
4.  **Redeploy** the Render service (Manual Deploy -> Clear cache and deploy, to be safe).

## Verification

1.  Open your Netlify URL.
2.  Try to **Register** a new account.
3.  If it works, your Database connection and API routing are perfect! 🚀
