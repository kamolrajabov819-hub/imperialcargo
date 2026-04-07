

# 2 Changes: Globe+Plane Logo Icon, Lead Confirmation in Admin

## 1. Replace logo icon with a custom Globe+Plane SVG

The uploaded image shows a globe with an airplane — no Lucide icon matches this. Create a reusable `LogoIcon` component (`src/components/LogoIcon.tsx`) rendering a custom SVG of a globe with a plane arc in the primary/gold color.

Replace all `Box` icon usages with `<LogoIcon />` in:
- `src/components/Header.tsx` (line 93)
- `src/pages/Admin.tsx` (lines 175, 211)
- `src/pages/Index.tsx` (lines 206, 213, 481)
- `src/pages/Dashboard.tsx` (line 68)

The component accepts `className` for sizing (defaults to `w-6 h-6`).

## 2. Add confirmation button to each lead in Admin

**Data model** — add `confirmed` boolean to `Client` interface in `src/lib/mockData.ts`.

**Admin UI** (`src/pages/Admin.tsx`):
- Add a `handleConfirm(id)` function that calls `updateClient(id, { confirmed: true })` and refreshes
- Add state `confirmedAnimId` for triggering a brief green checkmark animation
- **Mobile cards** (line 350): Add a confirm button (green `CheckCircle` icon) before edit/delete. When confirmed, show a green "Confirmed ✅" badge with a scale-in animation instead of the button
- **Desktop table** (line 378): Add a "Status" column. Show confirm button or animated "Confirmed" badge
- Use `framer-motion` `AnimatePresence` for the confirmation animation (scale + opacity transition)
- Already mobile responsive via existing card/table split

## Files Changed
| File | Changes |
|---|---|
| `src/components/LogoIcon.tsx` | New — custom globe+plane SVG component |
| `src/components/Header.tsx` | `Box` → `LogoIcon` |
| `src/pages/Admin.tsx` | `Box` → `LogoIcon`, confirm button + animation per lead |
| `src/pages/Index.tsx` | `Box` → `LogoIcon` |
| `src/pages/Dashboard.tsx` | `Box` → `LogoIcon` |
| `src/lib/mockData.ts` | Add `confirmed` to Client interface |

