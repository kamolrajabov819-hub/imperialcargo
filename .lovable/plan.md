

# 3 Changes: Reset Logo to SVG, Hidden Admin Link, Mobile Steps Fix

## 1. Reset logo to SVG-style text logo everywhere

The logo was changed to an image (`isu-cargo-logo.png`). Revert to a styled text/icon SVG logo similar to the original CargoLink style but branded as **ISU Cargo**. Use a `Package` Lucide icon + styled text.

**Files:**
- **`src/components/Header.tsx`** (line 8, 93-95): Remove `isuCargoLogo` import. Replace `<img>` with: `<Package className="w-6 h-6 text-primary" />` + `<span className="text-lg font-bold">ISU <span className="text-primary">Cargo</span></span>`
- **`src/pages/Admin.tsx`** (line 21, and logo usages ~lines 175, 211): Same — replace `<img>` with Package icon + "ISU Cargo" text
- **`src/pages/Index.tsx`** (lines 480-483): Already says "CargoLink" in footer — change to "ISU Cargo"
- **`src/pages/Index.tsx`** (line 518): Footer copyright "CargoLink" → "ISU Cargo"

## 2. Add hidden dot linking to admin page

At the very bottom of the Index page (after footer copyright), add a tiny, nearly invisible dot that links to `/admin`.

**File: `src/pages/Index.tsx`** (after line 519):
- Add: `<Link to="/admin" className="inline-block w-2 h-2 rounded-full bg-border/20 hover:bg-primary/30 transition-colors mt-2" />`
- Nearly invisible but clickable; subtle hover effect reveals it

## 3. Mobile-responsive "3 Simple Steps" section

Currently the steps use `flex gap-6` with a left number column + right card, which can be cramped on small screens.

**File: `src/pages/Index.tsx`** (lines 353-414):
- Reduce gap on mobile: `gap-4 md:gap-6 lg:gap-10`
- Number circle: `w-10 h-10 md:w-14 md:h-14 text-sm md:text-lg`
- Card padding: `p-4 md:p-6 lg:p-8`
- Marketplace logos: `gap-3` on mobile, smaller images `w-9 h-9 md:w-11 md:h-11`
- Reduce card margin: `mb-4 md:mb-6`
- Section heading: already responsive (`text-3xl md:text-5xl`) — good

## Files Changed
| File | Changes |
|---|---|
| `src/components/Header.tsx` | Revert to Package icon + "ISU Cargo" text logo |
| `src/pages/Admin.tsx` | Same logo revert |
| `src/pages/Index.tsx` | Footer logo → "ISU Cargo" text, hidden admin dot, mobile-responsive steps |

