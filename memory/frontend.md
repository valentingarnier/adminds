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
dashboard/         — Authenticated app shell (SidebarLayout)
  page.tsx         — Home: stat cards (Patients, Rapports) + empty state
  patients/
    page.tsx       — Patient list (empty state for now)
    [id]/page.tsx  — Patient detail: drag-and-drop document upload + reports
  modeles/
    page.tsx       — Report templates (canton-based AI, per-insurer private, perte de gain)
  settings/
    page.tsx       — User profile (name, canton) + subscription info
api/waitlist/      — Waitlist API route
```

## Information Architecture
- **Patient** → has **Documents** (uploaded via drag-and-drop) → generates **Report**
- Documents are NOT a top-level nav item — they live inside patient dossiers
- Nav: Patients, Modèles, Paramètres
- **Modèles**: Report templates. Rapport AI uses canton-specific template (from settings). Rapport assurance privée has per-insurer templates (Sanitas, Groupe Mutuel, AXA, CSS, Swica, Helsana). Rapport perte de gain is a single template.

## Adding a New Feature (Frontend)
1. Add TypeScript types and API function in `src/lib/api.ts`
2. Build UI in `src/app/` using Catalyst components
3. Verify build passes: `npx next build`
