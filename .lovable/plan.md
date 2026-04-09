

# 4 Changes: Lighter Color Palette, New Dragon SVG Logo, Add Photos/Life, Fix Yellow Hovers

## 1. Lighten the color palette — white + red harmony

The current palette is very dark (background 6% lightness, cards 10%). Shift to a **light theme** with white/off-white backgrounds and red accents:

**`src/index.css`**:
- `--background`: `0 0% 98%` (near white)
- `--foreground`: `240 10% 10%` (dark text)
- `--card`: `0 0% 100%` (white cards)
- `--card-foreground`: `240 10% 10%`
- `--popover`: `0 0% 100%`
- `--secondary`: `0 0% 95%` (light gray)
- `--secondary-foreground`: `240 10% 10%`
- `--muted`: `0 0% 93%` (soft gray)
- `--muted-foreground`: `240 5% 45%`
- `--border`: `0 0% 90%`
- `--input`: `0 0% 90%`
- `--primary`: keep `0 75% 45%` (deep red)
- `--accent`: `0 75% 45%` (change from gold to red — fixes yellow hover issue)
- `--accent-foreground`: `0 0% 100%`
- `--ring`: `0 75% 45%` (red instead of gold)
- Sidebar colors: similar light shift
- Update glass utilities for light backgrounds (white/90% alpha instead of dark)
- `glass-dark` → dark overlay style for cards on images (keep dark)
- `glow-box-cyan` → red glow
- `pulse-gold` → `pulse-red` with red glow

## 2. Replace logo SVG with uploaded dragon

The uploaded SVG is 2894 lines — too complex to inline as a React component. Copy it to `src/assets/imperial-logo.svg` and use it as an `<img>` tag.

**Files**:
- Copy `user-uploads://photo_2026-04-09_18-25-12.svg` → `src/assets/imperial-logo.svg`
- **`src/components/LogoIcon.tsx`**: Replace SVG paths with `<img src={logoSvg} />` imported from assets
- All existing `<LogoIcon className="w-6 h-6" />` usages continue working (Header, Admin, Dashboard, Index footer)

## 3. Add liveliness — photos & visual energy

**`src/pages/Index.tsx`**:
- **Partner logos section**: Add subtle background gradient and slight animation (fade-in slide)
- **About section**: Add a parallax-like effect on the truck image card
- **Services accordion**: Add icons with colored backgrounds per service, subtle gradient overlays
- **Testimonials**: Add auto-rotation (every 5s) with pause on hover
- **Footer**: Add a subtle gradient top border instead of plain border
- **Overall**: Add more varied section backgrounds — alternate between white and very light gray (`bg-secondary/50`) for visual rhythm

## 4. Fix yellow/gold hover states → use red

The gold accent (`43 80% 55%`) is used for hovers throughout. Change to red-based hovers:

**`src/index.css`**: `--accent` and `--ring` → red (see step 1)

**`src/pages/Index.tsx`**:
- Line 379: Step card `whileHover` borderColor from `hsl(43, 50%, 54%)` → `hsl(0, 75%, 45%)`
- Line 67-68: `pulse-gold` animation on step circles → change to `pulse-red` or just use `shadow-primary/30`
- Footer hover links: already `hover:text-primary` (red) — good

**`src/components/Header.tsx`**: Nav hover states already use `hover:bg-secondary` — these will naturally adapt with the lighter palette

**`tailwind.config.ts`**: No changes needed (colors reference CSS vars)

## Files Changed
| File | Changes |
|---|---|
| `src/index.css` | Light white+red palette, updated glass utilities, pulse-red animation |
| `src/assets/imperial-logo.svg` | New — copied from uploaded SVG |
| `src/components/LogoIcon.tsx` | Use imported SVG image instead of inline paths |
| `src/pages/Index.tsx` | Fix gold hover → red, add testimonial auto-rotation, visual enhancements |

