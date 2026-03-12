# Project Setup

## Prerequisites

- Docker Compose
- Node.js 20+ (only if running without Docker)

---

## Environment Configuration

### Backend

Create a `.env` file inside the `backend/` folder:

```env
PORT=8000
CACHE_TTL=150000
# Add your other backend environment variables here
```

### Frontend

Create a `.env` file inside the `frontend/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
# Add your other frontend environment variables here
```

## Running with Docker Compose

### Start

```bash
docker compose up
```

### Start and rebuild images

```bash
docker compose up --build
```

### Stop

```bash
docker compose down
```

---

## Running without Docker

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> Make sure the backend is running before starting the frontend.

> The API could take upto 2min if it is not cached as it has to scrape the website.

> Currently it launches single browser instance to scrape due to memory constraints.

> A cron job and redis could be used to scrape the data which makes the api call faster.
