# Adminds — Project Status & Roadmap

Last updated: 2026-03-09

---

## What's Built

### Frontend (Next.js 16)
- [x] **Auth** — Clerk sign-in/sign-up, redirect to `/dashboard`
- [x] **Dashboard shell** — White card on grey bg, Clerk UserButton top-right
- [x] **Settings** — Name + canton selector (Fribourg/Geneva), syncs to Clerk metadata
- [x] **Rapport Wizard** (`/dashboard/rapport`) — 4-step flow, the core feature:
  - Step 1: Document upload with drag-and-drop, simulated classification
  - Step 2: AI-extracted summary (7 sections, confidence badges) — mock data
  - Step 3: Supplementary notes (text + voice dictation via Web Speech API) + extra document upload
  - Step 4: Report generation progress animation + in-browser .docx preview (`docx-preview`) + PDF/DOCX download
- [x] **Editable report sections** — Slide-over panel in step 4 with canton-specific fields:
  - Fribourg: 5 sections, 32 fields matching `fribourg_field_map.py` (Informations générales, Situation médicale, Situation professionnelle, Potentiel de réadaptation, Divers)
  - Geneva: 9 sections, 14 fields matching `geneve_field_map.py` (14 numbered questions)
  - Auto-opens after generation, collapsible sections, per-field editing, "Mettre à jour" button (simulated re-render)
- [x] **Marketing site** — Landing page, team, pricing, privacy/terms

### Backend (FastAPI)
- [x] **DOCX filler services** — Template filling for Fribourg (55 form fields + table cells) and Geneva (4 header fields + 14 answer tables)
- [x] **Field maps** — Complete field definitions for both cantons (Fribourg: 767 lines, Geneva: 249 lines)
- [x] **Basic routes** — Health check, waitlist, Stripe checkout/webhooks
- [x] **Email** — Resend client for waitlist confirmations

### Infrastructure
- [x] **Clerk auth** — Configured for frontend
- [ ] **Azure PostgreSQL** — Not connected (old Supabase code still in `auth.py`/`database.py`)
- [ ] **Azure Blob Storage** — Not connected
- [ ] **Azure Document Intelligence** — Not connected
- [ ] **Azure OpenAI** — Not connected

---

## What's Mock / Not Connected

| Feature | Current State | What It Needs |
|---------|--------------|---------------|
| Document classification (step 1) | Random category assignment | Azure Doc Intelligence + AI classifier |
| AI extraction (step 2) | Static `MOCK_EXTRACTED_SECTIONS` | GPT-4o extracting from real documents |
| Report generation (step 4) | Timer animation, loads static filled `.docx` | Backend endpoint: takes field values → `docx_filler` → returns `.docx` |
| "Mettre à jour" button | 800ms loading flash | Backend call to re-fill `.docx` with edited values |
| Database | None | asyncpg + Alembic migrations |
| Auth (backend) | Old Supabase JWT code | Clerk JWT validation |

---

## Next Steps (Prioritized)

### Phase 1: Backend Foundation
> Goal: Make "Mettre à jour" actually regenerate the docx with edited field values.

1. **Rewrite `database.py`** → asyncpg connection pool for Azure PostgreSQL
2. **Rewrite `auth.py`** → Clerk JWT validation (`Depends(get_current_user)`)
3. **Add `POST /api/v1/reports/generate-docx`** endpoint:
   - Input: `{ canton: string, fields: Record<string, string> }`
   - Calls existing `docx_filler.fill_template()` / `docx_filler_geneve.fill_template()`
   - Returns filled `.docx` as binary response
4. **Frontend: wire "Mettre à jour"** to call this endpoint, replace docx preview with returned blob
5. **Frontend: wire "Générer"** to call same endpoint with initial mock field values

### Phase 2: Document Upload & Storage
> Goal: Real file upload with text extraction.

1. **Add `services/blob.py`** — Azure Blob Storage client (upload/download, scoped to cabinet)
2. **Alembic migrations** — `cabinets`, `users`, `patients`, `documents`, `reports` tables
3. **Add `POST /api/v1/documents/upload`** — Upload to Blob Storage, store metadata in DB
4. **Add `services/document_ai.py`** — Azure Document Intelligence (Layout mode) for OCR/text extraction
5. **Frontend: connect step 1** upload to real backend endpoint

### Phase 3: AI Extraction & Report Generation
> Goal: AI reads uploaded documents and pre-fills the report fields.

1. **Add `services/openai.py`** — Azure OpenAI GPT-4o client
2. **Add `POST /api/v1/reports/extract`** — Takes document IDs → extracts structured data matching field maps
3. **Use `get_ai_prompt_schema()`** from field maps to construct GPT-4o prompt
4. **Frontend: replace mock extraction data** (step 2) with real API response
5. **Wire step 4 generation** to use extracted data as initial field values

### Phase 4: Save & Resume
> Goal: Doctors can save drafts and come back later.

1. **`reports` table** — Store draft state (field values, canton, patient ref, status)
2. **Add `PATCH /api/v1/reports/:id`** — Save field edits
3. **Dashboard: report history** — List of in-progress and completed reports
4. **Auto-save** — Debounced save on field edit

### Phase 5: Document Ingestion Pipeline
> Goal: Async processing of uploaded documents.

1. **Add `services/queue.py`** — Azure Service Bus producer
2. **Add `services/ingestion.py`** — Pipeline orchestrator (upload → extract → classify → index)
3. **Add `services/classifier.py`** — AI document classification
4. **Background worker** — Consumes Service Bus messages, processes documents

---

## Key Files Reference

| Area | Files |
|------|-------|
| Wizard UI | `frontend/src/app/dashboard/rapport/page.tsx` |
| Mock data | `frontend/src/lib/mock-data.ts` |
| Docx templates | `frontend/public/templates/{canton}[-filled].docx` |
| Fribourg filler | `backend/app/services/docx_filler.py` + `fribourg_field_map.py` |
| Geneva filler | `backend/app/services/docx_filler_geneve.py` + `geneve_field_map.py` |
| Backend auth | `backend/app/auth.py` (needs Clerk rewrite) |
| Backend DB | `backend/app/database.py` (needs asyncpg rewrite) |
| Settings | `backend/app/config.py` |
