# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dodo frontend — a creator platform (Linktree-like) built with Next.js 15, React 18, TypeScript, and Tailwind CSS. Package manager is **pnpm**.

The backend repo is at `../dodobe/`. Full cross-repo reference in `DODO-CODEBASE-REFERENCE.md`.

## Commands

```bash
pnpm install          # install dependencies
pnpm dev              # dev server on :3000
pnpm build            # production build (standalone output)
pnpm lint             # ESLint
```

## Architecture

### API Layer
- Axios instance with interceptors: `api/interceptor.ts`
- All API service functions: `api/services.ts`
- Endpoint URL constants: `api/constants.ts`
- Base URL: `https://api.dodoclub.in/api/v1/` (override via `NEXT_PUBLIC_BACKEND_API_URL`)
- JWT auto-attached: `Authorization: Bearer <token>` + `token: <token>`
- Response interceptor: 401 → auto-logout, 404 → error page, 413 → file too large
- Response shape from BE: `{ success, message, data }`

### Auth Flow
Firebase Phone OTP → POST /auth/register with firebaseUid → BE returns JWT (7-day) → stored in localStorage as `dodo_1.0.0_token` → interceptor attaches to all requests.

Key files: `app/login/LoginNumber/index.tsx`, `app/login/LoginOtp/index.tsx`, `config/firebase.ts`

### State Management
Redux Toolkit + Redux Persist (localStorage, key prefix `dodo_1.0.0_`).

Slices in `store/slice/`:
- `dodoPageSlice` — profile, bio, image, social links
- `blocksSlice` — content blocks for dodo page
- `invoiceSlice` / `editInvoiceSlice` — invoice creation/editing
- `loaderSlice` — global loader visibility
- `commonSlice` — shared state

Persisted: dodoPage, blocks, editInvoice. Non-persisted: invoice, loader, common.

Provider setup: `store/StoreProvider.tsx` wraps app with Redux Provider + PersistGate.

### Routing (Next.js App Router)
Core pages:
- `/login` — phone auth flow
- `/home` — dashboard (mobile)
- `/landing` — desktop landing
- `/dodo/[dodopageUrl]` — creator page editor (addBlock, editBlock, analytics, archives sub-routes)
- `/links` — social links management
- `/invoice` — invoice system (create, edit, review, history, download)
- `/media-kit` — creator portfolio
- `/coins` — rewards system
- `/script-generator` — AI content generation
- `/[url]` — public dodo page view

### Path Aliases (tsconfig)
- `@app/*` → `./app/*`
- `@components/*` → `./components/*`
- `@utils/*` → `./utils/*`
- `@assets/*` → `./assets/*`

### Component Structure
Atomic design: `components/atoms/` → `components/molecules/` → `components/templates/`

### Third-Party Services
- **Firebase**: phone auth + reCAPTCHA — `config/firebase.ts`
- **Mixpanel**: product analytics — initialized in `app/layout.tsx`
- **AWS S3**: image hosting (read-only, images served from `dodo-profile-audio.s3.ap-south-1.amazonaws.com`)

### Environment Variables
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_BACKEND_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_BASE_PATH` | Public site URL |
| `NEXT_PUBLIC_MIXPANEL_ID` | Mixpanel token |
| `NEXT_PUBLIC_AI_API_KEY` | Google AI key |
| `NEXT_PUBLIC_ENV` | Environment flag |

## Key Files

| Purpose | Path |
|---------|------|
| Axios setup + interceptors | `api/interceptor.ts` |
| All API functions | `api/services.ts` |
| Endpoint constants | `api/constants.ts` |
| Redux store config | `store/store.ts` |
| Redux provider | `store/StoreProvider.tsx` |
| TypeScript types | `types/index.ts` |
| Firebase config | `config/firebase.ts` |
| Route/UI constants | `utils/constants/index.tsx` |
| Root layout (providers) | `app/layout.tsx` |
| Next.js config | `next.config.js` |

## Build & Deploy
- `output: "standalone"` in next.config.js produces a self-contained Node server
- Dockerfile: multi-stage build (node:20-alpine), final image runs `node server.js`
- Image domains whitelisted: picsum.photos, placehold.co, S3 bucket
