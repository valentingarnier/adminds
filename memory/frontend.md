# Frontend

## Stack
- Next.js 16 App Router + React 19
- Tailwind 4 (utility classes only, no CSS modules)
- Headless UI + Heroicons
- Motion (Framer Motion) for animations
- clsx + tailwind-merge (`cn` utility in `src/lib/utils.ts`)
- lucide-react for additional icons
- Clerk for auth (`@clerk/nextjs`, `@clerk/localizations`)

## Styling
- **Brand color**: Purple `#7C5CBA` (full indigo scale in globals.css)
- **Fonts**: Inter (sans), DM Serif Display (serif), Instrument Serif (logo)
- **Selection color**: `rgba(124, 92, 186, 0.2)`
- **Gradient text**: `.gradient-text` class (purple gradient)
- **Card hover**: `.card-hover` class (lift + shadow on hover)

## Catalyst UI Components

All in `frontend/src/components/`:

| Component | File | Usage |
|-----------|------|-------|
| Button | `button.tsx` | Primary actions, links, color variants (`color="indigo"`, `outline`, `plain`) |
| Badge | `badge.tsx` | Status labels (green, red, amber, zinc, etc.) |
| Input | `input.tsx` | Form text inputs |
| Heading | `heading.tsx` | `<Heading>` and `<Subheading>` |
| Text | `text.tsx` | `<Text>`, `<Strong>`, `<Code>`, `<TextLink>` |
| Avatar | `avatar.tsx` | User avatars with initials or image |
| Divider | `divider.tsx` | Horizontal separator |
| Dialog | `dialog.tsx` | Modal dialogs with title/body/actions |
| Dropdown | `dropdown.tsx` | Dropdown menus |
| Sidebar | `sidebar.tsx` | Navigation sidebar with sections |
| SidebarLayout | `sidebar-layout.tsx` | Responsive sidebar + content layout |
| Navbar | `navbar.tsx` | Top navigation bar |
| Logo | `logo.tsx` | LogoFavicon (square icon) + Logo (wordmark) |
| Link | `link.tsx` | Next.js Link wrapper for Headless UI |

**Rule**: Use these components — don't reinvent. Don't pull in external component libraries unless explicitly asked.

## Code Conventions
- camelCase for variables/functions
- PascalCase for components
- kebab-case for file names
- Tailwind utility classes only
- App Router conventions: route groups `(marketing)` for layout separation
- Private folders `_components/` for page-specific components

## App Structure & Routes
```
(marketing)/       — Landing page, privacy, terms (public)
sign-in/           — Clerk sign-in
sign-up/           — Clerk sign-up
dashboard/         — Authenticated app (white card on grey bg, Clerk UserButton)
  page.tsx         — Redirects to /dashboard/rapport
  rapport/
    page.tsx       — 4-step report generation wizard (main feature)
  settings/
    page.tsx       — User profile: first/last name + canton selector (syncs to Clerk metadata)
api/waitlist/      — Waitlist API route
```

### Deleted Pages
- `patients/page.tsx`, `patients/[id]/page.tsx`, `modeles/page.tsx` — removed in favor of wizard flow

## Report Wizard (`/dashboard/rapport`)
4-step wizard — modularized into page + components + hooks:

### File structure
```
rapport/
  page.tsx                              — Thin orchestrator (~90 lines): step/canton/docs state, navigation
  _components/
    wizard-stepper.tsx                  — Top bar: logo + canton selector + step pills
    step-documents.tsx                  — Step 1: drag-and-drop upload + file list
    step-summary.tsx                    — Step 2: editable extracted fields with confidence badges
    step-supplements.tsx                — Step 3: notes (primary) + extra doc upload (secondary)
    step-report.tsx                     — Step 4: generation progress, docx preview, slide-over editor
    document-list-item.tsx              — Shared doc row component (used in steps 1 & 3)
  _hooks/
    use-file-upload.ts                  — classify, addFiles, onDrop, dragging (shared by steps 1 & 3)
    use-voice-dictation.ts              — Web Speech API (fr-CH), toggle listening
```

### Steps
1. **Documents** — Drag-and-drop upload, simulated classification (random category), status dots (classifying → extracting → done)
2. **Summary** — Editable inline fields (input for short, textarea for long), "modifié" indicator, confidence badges (Fiable/Moyen/Faible), source attribution
3. **Supplements** — Notes textarea with voice dictation (first), extra document upload (second)
4. **Report** — 5-step simulated generation progress, in-browser .docx preview via `docx-preview`, slide-over editor with collapsible sections, download as PDF or DOCX

### Key design decisions
- Canton selector lives in top bar (always visible, changeable from any step)
- `docs` state lifted to page.tsx for `canNext` logic; all other step state is component-local
- `useFileUpload` hook takes a `setDocs` setter — reused by steps 1 and 3 with separate state
- `DocumentListItem` shared component with `showDetails` prop (step 1 shows size+status, step 3 shows filename only)
- Shared input class constants (`INPUT_CLASS`) avoid duplicated Tailwind strings
- Currently uses **mock data** — no backend integration yet
- Templates stored in `public/templates/` (fribourg.docx, geneve.docx + filled versions)
- `docx-preview` npm package renders .docx in-browser
- Filenames: `Rapport AI - {patient} - {stade} - {date}.{ext}` (date in fr-CH format)

## Mock Data (`src/lib/mock-data.ts`)
- `Canton` type: `"geneve" | "fribourg"`
- `WizardDocument`: document lifecycle states (classifying → extracting → done/error)
- `DocCategory`: 5 types (dpi-smeex, antecedents, rapports-medicaux, imagerie, autre)
- `ExtractedSection` / `ExtractedField`: structured data with confidence levels
- `MOCK_EXTRACTED_SECTIONS`: 7 sections, 30+ fields simulating AI extraction output

## New Dependencies
- `docx-preview@0.3.7` — in-browser .docx rendering

## Adding a New Feature (Frontend)
1. Add TypeScript types and API function in `src/lib/api.ts`
2. Build UI in `src/app/` using Catalyst components
3. Verify build passes: `npx next build`
