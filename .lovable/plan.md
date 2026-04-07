

# Rebrand to ISU Cargo Color Palette + Redesign "How It Works" Section

## 1. Color Palette Update (based on logo)

The logo uses a **dark navy background** (#1A1A2E / ~222 30% 14%) with **gold/champagne accents** (#C9A84C / ~43 50% 54%). Current orange primary (#F97316) will shift to gold, and background will go dark navy.

**Changes in `src/index.css`**:
- `--background`: Dark navy → `222 30% 14%`
- `--foreground`: Light cream → `40 20% 90%`
- `--card`: Darker navy → `222 25% 18%`
- `--card-foreground`: Light cream → `40 20% 90%`
- `--primary`: Gold → `43 50% 54%`
- `--primary-foreground`: Dark navy → `222 30% 10%`
- `--secondary`: Muted navy → `222 20% 22%`
- `--muted`: Muted navy → `222 20% 25%`
- `--muted-foreground`: Faded cream → `40 10% 55%`
- `--accent`: Gold (same as primary)
- `--border`: Subtle navy border → `222 15% 25%`
- `--input`: Same as border
- `--ring`: Gold
- `--popover`: Same as card
- Update glass utilities for dark theme (glass-strong, glass backgrounds)

**Other files affected by palette**:
- `src/components/ContactButtons.tsx` — Telegram button color stays #229ED9
- `src/components/Header.tsx` — Glass header needs dark glass treatment
- `src/pages/Login.tsx`, `src/pages/Signup.tsx` — Background gradients shift to navy/gold
- `src/pages/Dashboard.tsx` — Status colors and cards adapt
- `src/pages/Admin.tsx` — Dark theme cards
- Footer in `Index.tsx` — Already dark-on-light, may need inversion

## 2. "How It Works" Section Redesign

Inspired by the reference image (numbered vertical steps with cards), redesign the 3-step section:

**New layout**:
- Vertical step layout (not horizontal grid on mobile)
- Each step has a large numbered circle (gold on dark) on the left
- Step content card on the right with title + description
- A connecting vertical line between steps
- On mobile: stacked vertically with number circles on left margin
- Rounded cards with subtle gold border glow

**Changes in `src/pages/Index.tsx`** (lines 339-368):
- Replace the 3-column grid with a vertical timeline layout
- Each step: left side has gold numbered circle with connecting line, right side has a card
- Cards have dark glass styling with gold accents
- Add copy-address style card for step 2 (showing the warehouse address with copy button, similar to the reference)

**Changes in `src/lib/i18n.tsx`**:
- Update step descriptions to be more action-oriented:
  - Step 1: "Make your order" — order from marketplace
  - Step 2: "Copy warehouse address" — use your ID code at the warehouse
  - Step 3: "Track & receive" — track your cargo to Bishkek

## Files Changed
| File | Changes |
|---|---|
| `src/index.css` | Full color palette swap to dark navy + gold |
| `src/pages/Index.tsx` | Redesign "How It Works" to vertical timeline with cards; adjust hero/footer for new palette |
| `src/lib/i18n.tsx` | Update step descriptions (en/ru/kg) |
| `src/pages/Login.tsx` | Adjust gradient backgrounds for dark navy theme |
| `src/pages/Signup.tsx` | Adjust gradient backgrounds for dark navy theme |
| `src/components/Header.tsx` | Dark glass header styling |
| `tailwind.config.ts` | No changes needed — uses CSS vars |

