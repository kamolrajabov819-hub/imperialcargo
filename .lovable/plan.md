

# 5 Changes: Contact Numbers, Confirm Dialog, CRM Stages, New Statistics, Translations

## 1. Update contact numbers and WhatsApp links

**`src/pages/Index.tsx`** (footer, lines 498-499): Replace `+996 555 123 456` and `info@cargolink.kg` with `+996 705 102 772` and `+996 773 339 966`.

**`src/components/ContactButtons.tsx`** (line 27): Change WhatsApp link from `https://wa.me/77718191119` to `https://wa.me/996705102772`.

## 2. Add confirmation dialog for confirming leads

Same pattern as the delete dialog. When admin clicks "Confirm" on a lead, show an AlertDialog asking "Are you sure you want to confirm this lead?" with Cancel/Confirm buttons.

**`src/pages/Admin.tsx`**:
- Add `confirmDialogId` state (similar to `deleteConfirmId`)
- Replace direct `handleConfirm(c.id)` calls (mobile line 375, desktop line 440) with `setConfirmDialogId(c.id)`
- Add a new AlertDialog at the bottom (after delete dialog) with green Confirm button that calls `handleConfirm(confirmDialogId)`

## 3. Add CRM stages to client data model

**`src/lib/mockData.ts`**:
- Add `stage` field to `Client` interface with type union: `"new" | "consultation" | "awaiting_cargo" | "cargo_received" | "in_transit" | "arrived" | "completed" | "cancelled"`
- Default to `"new"` in `addClient()`

**`src/pages/Admin.tsx`**:
- Add a stage dropdown (Select component) in both mobile cards and desktop table
- Admin can change stage per client via `updateClient(id, { stage: newStage })`
- Show colored badge for each stage
- Add a stage filter dropdown at the top (next to search)

## 4. Add new statistics based on stages

**`src/lib/mockData.ts`** — extend `getClientStats()` to return:
- `stageDistribution`: count per stage
- `confirmedCount` / `confirmedPercentage`: qualified leads %
- `completedCount` / `cancelledCount`: success vs lost

**`src/pages/Admin.tsx`** (statistics tab):
- Add new stat cards: "Qualified Leads %", "Completed", "Cancelled"
- Add a stage distribution chart (horizontal bar or pie)

## 5. Translations and mobile responsiveness

**`src/lib/i18n.tsx`** — add keys for all 3 languages:
- Stage names: `admin.stage.new`, `admin.stage.consultation`, `admin.stage.awaiting_cargo`, `admin.stage.cargo_received`, `admin.stage.in_transit`, `admin.stage.arrived`, `admin.stage.completed`, `admin.stage.cancelled`
- `admin.confirmLead` / `admin.confirmLeadDesc`: "Are you sure you want to confirm this lead?"
- `admin.confirmed` / `admin.confirm`: "Confirmed" / "Confirm"
- `admin.stage`: "Stage"
- `admin.qualifiedLeads`: "Qualified Leads"
- `admin.completedDeals`: "Completed"
- `admin.cancelledDeals`: "Cancelled"
- `admin.stageDistribution`: "Stage Distribution"
- Translate existing untranslated strings: "Showing X–Y of Z clients", "No clients found", "No comments yet", "Add a comment...", "Add", delete/confirm dialog texts

**Mobile responsiveness**:
- Stage select in mobile cards: full-width below the status badge
- Stage filter dropdown: stacks below search on mobile
- New stat cards: 2-column grid on mobile (already pattern)
- Stage distribution chart: single column on mobile

## Files Changed
| File | Changes |
|---|---|
| `src/pages/Index.tsx` | Update footer contact numbers |
| `src/components/ContactButtons.tsx` | WhatsApp number update |
| `src/lib/mockData.ts` | Add `stage` to Client, extend stats |
| `src/pages/Admin.tsx` | Confirm dialog, stage dropdown, stage filter, new stats, translations |
| `src/lib/i18n.tsx` | All new translation keys in EN/RU/KG |

