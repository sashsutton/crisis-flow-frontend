# 🚨 CrisisFlow Frontend (React)

## 🌍 Overview

The CrisisFlow Frontend is a real-time **Command Center Dashboard** built with React. It visualizes AI-processed disaster reports through interactive maps, charts, and a continuously updating live feed.

🔗 **Backend API:** *https://github.com/sashsutton/crisis-flow-backend*
🔗 **Live Website:** *https://crisis-flow-frontend-mhy4qore7-sashasuttons-projects.vercel.app/*

---

## ✨ Features

* **Live Incident Feed** – Displays categorized disaster messages in real time.
* **Geospatial Map** – Uses **react-leaflet** to map incidents over a simulated Los Angeles region.
* **Neural Cluster Map** – Visualizes semantic similarity clusters via PCA-reduced coordinates.
* **Auto-Polling** – Fetches updated backend data every 10 seconds.

---

## 🚀 Quick Start (Local)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

```
http://localhost:5173
```

---

## 🛠 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=https://your-backend-url.com/data
```

Default (if none provided):

```
http://127.0.0.1:8000/data
```

---

## 📦 Deployment (Vercel)

1. Push project to GitHub.
2. Import repository into **Vercel**.
3. Add environment variable:

   * **Key:** `VITE_API_URL`
   * **Value:** Your backend endpoint.
4. Deploy!

---

## 🧩 Tech Stack

* **React 19.2**
* **Vite**
* **Leaflet / React-Leaflet**
* **Recharts**
* **Lucide React**

---

## 🧾 Summary

The CrisisFlow Frontend provides real-time visualization for disaster intelligence, offering an interactive dashboard optimized for clarity, performance, and professional-grade deployment.
