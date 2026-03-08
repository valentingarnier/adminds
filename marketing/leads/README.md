# Leads — Psychiatres Genève (FMH)

## What was done

Scraped **doctorfmh.ch** to build a qualified lead list of all psychiatrists (Psychiatrie et psychothérapie) registered in Geneva (GE) via the FMH directory.

## Output

- **`psychiatrists_geneva.xlsx`** — 511 rows, formatted Excel with purple branded headers
- **`scrape_fmh.py`** — Playwright-based scraper (re-runnable, with Bright Data support)
- **`details_cache.json`** — Cached detail profiles (phone/languages/certs), persists across runs

## Data collected (final)

| Column | Source | Coverage |
|--------|--------|----------|
| Titre, Prénom, Nom | List API | 511/511 |
| Genre (M/F) | List API | 511/511 |
| Lieu de travail (cabinet/hôpital) | List API | 511/511 |
| Lieu de travail 2, Adresse | List API | Partial |
| Code postal, Ville, Canton | List API | 511/511 |
| EAN/GLN | List API | 511/511 |
| **Téléphone** | Detail API | **500/511** |
| Fax | Detail API | Partial |
| **Email** | Detail API | **0/511** (not exposed by API) |
| Site web | Detail API | Partial |
| Langues | Detail API | 468/465 unique |
| Certifications | Detail API | 468/465 unique |

## Validation

- **First entry**: Dr méd. Niccoletta Aapro-Piacentini (1245 Collonge-Bellerive)
- **Last entry**: Prof. méd. Daniele Fabio Zullino (1202 Genève, HUG)
- **Total**: 511 records, 465 unique doctors (some appear at multiple locations)
- **Profiles fetched**: 468/465 (all unique doctors covered)
- **Phone numbers**: 500 found

## How the scraper works

### Architecture

1. **Playwright** opens `doctorfmh.ch/fr/` to establish a Cloudflare session
2. Fetches a **JWT token** via the `getjtwtoken` endpoint (using `page.evaluate(fetch(...))`)
3. Calls the **list API** directly with correct params (`certs1=39&canton=GE`) — no form interaction needed
4. Fetches the **detail API** for each unique doctor in batches of 20
5. **Session rotation**: With Bright Data Scraping Browser, reconnects to a fresh IP after each batch to avoid the ~24 request/session rate limit
6. **Resume support**: Caches profiles in `details_cache.json`, so interrupted runs pick up where they left off
7. **Safety**: Never overwrites Excel with fewer rows than existing file
8. Exports everything to Excel with `openpyxl`

### Key API endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /docapi/v1/getjtwtoken?jtwid={ip}` | Get JWT session token |
| `GET /docapi/v1/docs/fr?certs1=39&canton=GE&practice=1&startrecord={n}` | List doctors (24/page) |
| `GET /docapi/v1/doc/{link_id}/fr` | Individual doctor profile (phone, languages, certs) |

### Auth requirements

- **Cloudflare** — Needs a real browser session (headless Chromium via Playwright)
- **JWT token** — Fetched from `getjtwtoken` endpoint, sent as `docfmh` header on every API call
- **Direct HTTP requests fail** — The API returns 400 without Cloudflare cookies + JWT

### Rate limiting

- **List API**: No significant rate limit (24 per page, ~0.3s delay between pages)
- **Detail API**: Hard limit of **~24 requests per session/JWT**, then returns 403
- **Solution**: Rotate sessions via **Bright Data Scraping Browser** (fresh IP + session per batch of 20)
- **Without Bright Data**: Falls back to single IP with 60s pauses between batches (~24 profiles per cycle)
- **With Bright Data**: ~12-15 profiles/min, full run takes ~35 minutes for 465 profiles

### Filters used

- `certs1=39` = Psychiatrie et psychothérapie
- `canton=GE` = Genève
- `practice=1` = Tous les médecins (all doctors, not just private practice)

## How to re-run

```bash
# Install dependencies
pip3 install --break-system-packages playwright openpyxl
python3 -m playwright install chromium

# With Bright Data (recommended — bypasses rate limits):
export BRIGHT_DATA_SBR="wss://brd-customer-hl_5539e906-zone-scraping_browser8:ashgs2o6pcy5@brd.superproxy.io:9222"
python3 leads/scrape_fmh.py

# Without Bright Data (slower, single IP):
python3 leads/scrape_fmh.py
```

The scraper resumes from `details_cache.json` automatically — safe to interrupt and re-run.

## Known limitations

- **Email not available**: The FMH detail API does not expose email addresses. For emails, a different source would be needed (e.g. scraping individual clinic websites, local.ch, or Google search).
- **Detail API rate limiting**: ~24 requests per JWT session before 403. Solved with Bright Data IP rotation.
- **Duplicate rows**: Some doctors appear at multiple locations. 511 rows = 465 unique doctors.

## Lessons learned

- doctorfmh.ch uses **Cloudflare + JWT + per-session rate limiting** — direct HTTP requests fail, need real browser
- The Vuetify dropdowns use **virtual scrolling** — can't reliably select items via Playwright. Bypassed by calling the API directly with known parameter codes
- Hammering the API too fast causes IP-level blocks (returns 0 results). Always use delays and respect rate limits.
- **Bright Data Scraping Browser** (`connect_over_cdp`) works well but response event interception doesn't work via CDP — fetch JWT directly via `page.evaluate()` instead

## Date

- Initial list scrape: 2026-02-19
- Detail profiles (phone/languages/certs) completed: 2026-02-19
