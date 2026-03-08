# Architecture

## Overview
Multi-cabinet SaaS, 100% Swiss-hosted on Azure Switzerland North (failover to West). No patient data leaves Swiss territory.

## Azure Services

| Service | Usage |
|---------|-------|
| Azure Container Apps | Next.js frontend + FastAPI backend (autoscaling serverless) |
| Azure PostgreSQL Flexible | Main database — AES-256 encrypted at rest |
| Azure Blob Storage | Raw document storage — CMK encryption per cabinet |
| Azure Document Intelligence | OCR / text extraction (Layout mode) — PDF, DOCX, images/scans (region CH) |
| Azure OpenAI Service (CH North) | GPT-4o via Private Endpoint — zero data retention |
| Azure Key Vault | Encryption key management per tenant |
| Azure Service Bus | Async queue for document ingestion pipeline |

## Other Services
- **Auth**: Clerk (US-hosted, doctor email/name only — no patient data)
- **Payments**: Stripe Checkout + Webhooks (mock mode for local dev)
- **Email**: Resend for transactional notifications

## Database
- Azure PostgreSQL Flexible via **asyncpg** (no ORM)
- Raw SQL with parameterized queries (`$1`, `$2`, etc.)
- **Always filter by `cabinet_id`** for tenant isolation
- Migrations via **Alembic**

### Access Pattern
```python
from app.database import get_pool

async with get_pool().acquire() as conn:
    row = await conn.fetchrow("SELECT * FROM patients WHERE id = $1 AND cabinet_id = $2", patient_id, cabinet_id)
    rows = await conn.fetch("SELECT * FROM documents WHERE patient_id = $1 ORDER BY created_at DESC LIMIT $2", patient_id, 10)
    new_id = await conn.fetchval("INSERT INTO patients (name, cabinet_id) VALUES ($1, $2) RETURNING id", name, cabinet_id)
    await conn.execute("UPDATE patients SET status = $1 WHERE id = $2", "active", patient_id)
    await conn.execute("DELETE FROM documents WHERE id = $1 AND cabinet_id = $2", doc_id, cabinet_id)
```

## Environment Variables

### Backend (`backend/.env`)
- `DATABASE_URL` — Azure PostgreSQL connection string
- `AZURE_STORAGE_CONNECTION_STRING` — Blob Storage connection
- `AZURE_STORAGE_CONTAINER` — Blob container name
- `AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT` — Document Intelligence endpoint
- `AZURE_DOCUMENT_INTELLIGENCE_KEY` — Document Intelligence API key
- `AZURE_OPENAI_ENDPOINT` — Azure OpenAI endpoint (CH North)
- `AZURE_OPENAI_API_KEY` — Azure OpenAI API key
- `AZURE_OPENAI_DEPLOYMENT` — GPT-4o deployment name
- `AZURE_SERVICEBUS_CONNECTION_STRING` — Service Bus connection
- `AZURE_KEYVAULT_URL` — Key Vault URL
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`
- `ENCRYPTION_KEY` — Fernet key for app-level encryption
- `APP_URL` — Frontend URL (CORS + redirects)
- `MOCK_STRIPE` — `true` for local dev
- `RESEND_API_KEY`, `NOTIFICATION_EMAIL`
- `DEV_USER_ID` — UUID to bypass auth in dev
- `CLERK_SECRET_KEY` — Clerk backend JWT validation

### Frontend (`frontend/.env.local`)
- `NEXT_PUBLIC_API_URL` — Backend API URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk public key
- `CLERK_SECRET_KEY` — Clerk secret key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`

## File Structure
```
backend/
  app/
    main.py          — FastAPI app, CORS, health, router registration
    config.py        — All settings from env vars (Pydantic BaseSettings)
    auth.py          — Clerk JWT validation
    database.py      — asyncpg connection pool (singleton)
    schemas.py       — All Pydantic request/response models
    routers/         — One file per feature area
    services/        — Business logic and external service adapters
      blob.py        — Azure Blob Storage client
      document_ai.py — Azure Document Intelligence client
      openai.py      — Azure OpenAI client
      queue.py       — Azure Service Bus producer

frontend/
  src/
    app/             — Next.js 16 App Router pages
      (marketing)/   — Public pages (landing, pricing, privacy, terms)
      sign-in/       — Clerk sign-in (catch-all route)
      sign-up/       — Clerk sign-up (catch-all route)
      dashboard/     — Authenticated app (TODO)
    components/      — Catalyst UI components (reusable)
    lib/
      api.ts         — Typed API client with auth headers
    proxy.ts         — Clerk middleware (route protection)
```
