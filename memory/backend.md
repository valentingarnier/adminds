# Backend

## Stack
- FastAPI with Pydantic models, async handlers
- asyncpg for PostgreSQL (connection pool, raw SQL)
- Alembic for database migrations
- uv for Python package management

## Code Conventions
- snake_case for everything
- Type hints on all function signatures
- Pydantic BaseModel for all request/response schemas
- All route handlers and DB calls must be async
- `Depends(get_current_user)` on every authenticated endpoint
- Return `{"detail": "Human-readable message"}` with HTTP status codes
- `logging.getLogger("app")` — never log secrets
- All settings via `app/config.py` (Pydantic BaseSettings from env vars)
- Database: asyncpg pool from `app/database.py` — never create new connections outside pool
- New routers in `app/routers/`, register in `app/main.py`
- New schemas in `app/schemas.py`

## Current Files
```
app/
  main.py          — FastAPI app, CORS, health, router registration
  config.py        — Settings from env vars
  auth.py          — JWT validation (needs rewrite for Clerk)
  database.py      — Database client (needs rewrite for asyncpg)
  schemas.py       — Pydantic models
  routers/
    hello.py       — Health/test endpoint
    users.py       — User profile endpoints
    checkout.py    — Stripe checkout
    waitlist.py    — Waitlist signup
    webhooks.py    — Stripe webhooks
  services/
    email.py       — Resend email client
    encryption.py  — Fernet encryption helper
```

## Target Architecture (services to build)
```
services/
  blob.py          — Azure Blob Storage client (upload/download documents)
  document_ai.py   — Azure Document Intelligence client (OCR/text extraction)
  openai.py        — Azure OpenAI client (GPT-4o report generation)
  queue.py         — Azure Service Bus producer (async ingestion jobs)
  ingestion.py     — Document ingestion pipeline orchestrator
  classifier.py    — Document classification logic
```

---

## Document Ingestion Pipeline

### Flow
```
Upload → Blob Storage → Service Bus queue → Worker picks up job
  → Document Intelligence (OCR/extract text)
  → Classify document type (consultation, bilan, previous report, lab results, etc.)
  → Store extracted text + metadata in PostgreSQL
  → Link to patient dossier
```

### Steps
1. **Upload**: User uploads PDF/DOCX/image via frontend
2. **Store raw**: File saved to Azure Blob Storage (CMK encrypted, scoped to cabinet)
3. **Queue**: Ingestion job published to Azure Service Bus
4. **Extract**: Worker calls Azure Document Intelligence (Layout mode) → structured text
5. **Classify**: AI classifies document type (consultation note, lab result, previous AI report, etc.)
6. **Index**: Extracted text + classification stored in PostgreSQL, linked to patient

### Key Tables (planned)
- `cabinets` — tenant (one per psychiatric practice)
- `users` — doctors, linked to cabinet
- `patients` — patient dossiers, scoped to cabinet
- `documents` — uploaded files metadata (blob path, type, classification, extracted text)
- `reports` — generated AI reports (rapport AI), linked to patient + source documents

---

## Patient Dossier Model

Each patient dossier contains:
- **Patient info**: name, date of birth, AI case number
- **Documents**: all uploaded files, classified and organized by type
- **Timeline**: chronological view of consultations, assessments, reports
- **Generated reports**: AI-produced rapport AI documents

### Document Classification Categories
- Consultation notes / anamnesis
- Psychiatric assessments (bilans)
- Previous AI reports (from other doctors or older versions)
- Lab results / somatic findings
- Correspondence (letters from AI office, other doctors)
- Prescriptions / medication lists
- Legal documents (mandates, court orders)

### Document Reorganization
Documents are automatically:
1. Classified by type (via AI after OCR)
2. Sorted chronologically
3. Grouped by category in the dossier view
4. Made searchable via extracted text

---

## Report Generation (Rapport AI)

### Flow
```
Select patient → Choose report template → AI generates draft
  → Doctor reviews/edits → Export DOCX (optional PDF)
```

### Inputs to AI
- All classified documents from the patient dossier
- Extracted text from each document
- Report template (standardized cantonal form structure)
- Swiss case law requirements (Foerster criteria, structured assessment indicators)

### Output
- DOCX document following cantonal AI office format
- Structured sections: anamnesis, findings, diagnosis (ICD-10/11), functional capacity assessment, prognosis
- Optional PDF export

---

## TODO (Backend)
- [ ] Rewrite `database.py` → asyncpg connection pool
- [ ] Rewrite `auth.py` → Clerk JWT validation
- [ ] Set up Alembic + initial migration (cabinets, users, patients, documents, reports)
- [ ] Add `services/blob.py` — Azure Blob Storage upload/download
- [ ] Add `services/document_ai.py` — Azure Document Intelligence OCR
- [ ] Add `services/openai.py` — Azure OpenAI GPT-4o client
- [ ] Add `services/queue.py` — Azure Service Bus producer
- [ ] Add `services/ingestion.py` — Ingestion pipeline orchestrator
- [ ] Add `routers/patients.py` — Patient CRUD
- [ ] Add `routers/documents.py` — Document upload + listing
- [ ] Add `routers/reports.py` — Report generation + export
- [ ] Update `config.py` with Azure env vars

## Adding a New Feature (Backend)
1. Add Pydantic schema(s) to `app/schemas.py`
2. Create router in `app/routers/my_feature.py`
3. Register router in `app/main.py`
4. Add Alembic migration if needed: `alembic revision --autogenerate -m "description"`
