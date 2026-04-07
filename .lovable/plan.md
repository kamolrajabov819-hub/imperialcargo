

# Fix 5 Issues + Enhance Steps Section

## 1. Hero text visibility
**`src/pages/Index.tsx` line 105** — Add text-shadow to the gold highlighted text so it stands out against the background image.
```tsx
<span className="text-primary" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.3)' }}>
```
Also add text-shadow to the parent h1 (line 102).

## 2. Change font to serious typography
- **`index.html`** — Replace Rubik Google Font link with **Inter** (body) + **Playfair Display** (headings)
- **`src/index.css`** — Update body `font-family` to `'Inter', system-ui, sans-serif`
- **`tailwind.config.ts`** — Add `fontFamily: { heading: ['Playfair Display', 'serif'], body: ['Inter', 'sans-serif'] }`
- Apply `font-heading` class to major headings in `Index.tsx` (hero h1, section titles)

## 3. Rebrand "CargoLink" → "ISU Cargo"
- **`src/components/Header.tsx`** line 94 — `ISU <span className="text-primary">Cargo</span>`
- **`src/pages/Admin.tsx`** lines 170, 206 — Same change
- **`index.html`** — Update `<title>` and OG tags

## 4. Enhance "3 Simple Steps" with marketplace logos & animations
**`src/pages/Index.tsx`** lines 339-380:
- Add Lucide icons: `ShoppingCart` (step 1), `ClipboardCopy` (step 2), `Truck` (step 3)
- In step 1 card, add a row of marketplace logo badges (Pinduoduo, Taobao, Dewu, 1688) as styled text/color badges with known brand colors (~40px rounded badges)
- Add `whileHover={{ scale: 1.02, borderColor: 'hsl(43, 50%, 54%)' }}` on cards
- Add `animate-pulse-gold` class on numbered circles
- Staggered entrance with slight spring bounce

**`src/index.css`** — Add keyframes:
```css
@keyframes pulse-gold {
  0%, 100% { box-shadow: 0 0 0 0 hsl(43 50% 54% / 0.4); }
  50% { box-shadow: 0 0 20px 4px hsl(43 50% 54% / 0.2); }
}
.animate-pulse-gold { animation: pulse-gold 3s ease-in-out infinite; }
```

Marketplace logos will be rendered as small colored badges with the platform name (brand-colored backgrounds): Taobao (orange #FF6A00), 1688 (orange #FF6600), Pinduoduo (red #E02E24), Dewu (black #000).

## 5. Fix pie chart labels on desktop
**`src/pages/Admin.tsx`** lines 505-533:
- Set `label={false}` always (remove the `isMobile` conditional)
- Set `labelLine={false}` always
- Remove the `isMobile &&` condition on the legend div so it always shows below

## Files Changed
| File | Changes |
|---|---|
| `index.html` | Swap fonts to Inter + Playfair Display, title → ISU Cargo |
| `src/index.css` | Font-family update, pulse-gold keyframe, heading font utility |
| `tailwind.config.ts` | Add fontFamily config |
| `src/pages/Index.tsx` | Hero text-shadow, steps section icons + marketplace badges + hover/glow animations, heading fonts |
| `src/components/Header.tsx` | Logo → "ISU Cargo" |
| `src/pages/Admin.tsx` | Logo → "ISU Cargo", pie chart always legend-below |

