# Volt Agency — TODO

## Manual / One-Time Setup

- [ ] Run `docs/agency-schema.sql` in Supabase SQL editor (creates `agency_clients`, `approval_batches`, `client_content` tables + RLS policies)
- [ ] Add `N8N_WEBHOOK_SECRET` to `.env.local` and Vercel env vars
- [ ] Set up Resend production domain (currently sends from `onboarding@resend.dev`)
- [ ] Enable Supabase Auth rate limits in dashboard (Auth > Settings > Rate Limits)

## Code — Next Steps

- [ ] Wire `/api/n8n/generate` to actual AI generation with client context (currently returns placeholder)
- [ ] Build n8n workflows:
  - [ ] Weekly Content (Mon 8:00): generate for each active client, create batch, send WhatsApp
  - [ ] Approval Reminder (Wed 10:00): check pending batches, send reminder
  - [ ] Auto-Publish (on approval webhook): publish approved posts via Meta API
  - [ ] Weekly Report (Fri 16:00): aggregate stats, send WhatsApp summary
- [ ] Add first real agency client to `agency_clients` table and test full flow end-to-end
- [ ] Connect Meta/Instagram API for auto-publishing approved content

## Polish / Nice-to-Have

- [ ] Admin panel: add client create/edit form (currently read-only from DB)
- [ ] Admin panel: content calendar drag-and-drop scheduling
- [ ] Approval page: add image preview (currently shows image_prompt text only)
- [ ] CSP nonce-based scripts (replace `script-src 'unsafe-inline'`)
- [ ] Contact form: migrate rate limiter from in-memory Map to Upstash Redis
- [ ] Sanity typegen (`sanity typegen generate`)
- [ ] Add real client logos to homepage ClientLogos section

## Done (Agency Pivot)

- [x] Rewrite `lib/content.ts` — all agency messaging
- [x] Remove Stripe (package + routes + components)
- [x] Remove `/registracija` — no public signup
- [x] Update login page — "Interni alati za Volt tim"
- [x] Build admin panel routes (`/admin`, `/admin/klijenti`, etc.)
- [x] Build client approval flow (`/odobri/[token]`)
- [x] Build n8n API endpoints (`/api/n8n/*`)
- [x] Build approval API (`/api/approval/*`)
- [x] Create `types/agency.ts`
- [x] Create `docs/agency-schema.sql`
- [x] Update middleware — protect `/admin`, redirect to `/admin`
- [x] Update CLAUDE.md
- [x] Playwright tests — 12 passing, zero SaaS remnants
