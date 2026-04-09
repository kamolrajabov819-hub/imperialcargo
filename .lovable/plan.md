

# 2 Changes: Warm Background Color Palette + More Animation & Photos

## 1. Warm cream background color palette

The current `#fafafa` (0 0% 98%) is too stark white. Switch to a warm cream inspired by the Motta Weddings reference (`#fff5e8` = warm peach-cream).

**`src/index.css`** — update CSS variables:
- `--background`: `30 100% 97%` (≈ `#fff5e8`, warm cream)
- `--card`: `30 50% 99%` (slightly warmer white for cards)
- `--secondary`: `30 30% 94%` (warm light gray)
- `--muted`: `30 20% 91%` (warm muted)
- `--border`: `30 20% 88%` (warm border)
- `--input`: `30 20% 88%`
- `--sidebar-background`: `30 40% 96%`
- `--sidebar-accent`: `30 30% 94%`
- `--sidebar-border`: `30 20% 88%`
- Keep `--primary` deep red, `--accent` red, `--foreground` dark
- Update `glass` and `glass-strong` utilities to use warm tones (`hsl(30 50% 99% / 0.8)`)

## 2. More animations and photos

**`src/pages/Index.tsx`**:

### 2a. Partner logos — add horizontal scroll animation
Replace static flex with a marquee-style infinite scroll using CSS animation. Duplicate the logo list and animate with `translateX`.

### 2b. About section — staggered card entrance
Add `whileInView` with stagger delay to the two info cards (glass-dark and bg-card).

### 2c. Services — add Unsplash cargo/logistics images
When a service accordion opens, show a relevant image alongside the description. Use free Unsplash URLs:
- Cargo: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400` (shipping containers)
- Warehouse: `https://images.unsplash.com/photo-1553413077-190dd305871c?w=400` (warehouse)
- Freight: `https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400` (freight truck)
- Supply chain: `https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=400` (logistics)

### 2d. Why Choose Us — add floating animation
Add `animate={{ y: [0, -8, 0] }}` with different durations per card for a subtle float effect.

### 2e. Steps section — add connecting line animation
Animate the vertical connector line with a gradient that pulses downward using CSS.

### 2f. Testimonials — add parallax dots/shapes
Add decorative floating shapes (circles, dots) around the testimonial card with `animate-float`.

### 2g. Footer — add hover animations on links
Add underline-on-hover effect to footer links using the `.story-link` pattern.

## Files Changed
| File | Changes |
|---|---|
| `src/index.css` | Warm cream palette, marquee animation keyframe |
| `src/pages/Index.tsx` | Service images, floating cards, marquee logos, decorative elements |

