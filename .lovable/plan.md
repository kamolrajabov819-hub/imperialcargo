

# Fix Navbar, About Section Responsiveness & Match Reference Design

## Issues Identified

1. **Navbar**: Uses `bg-transparent` with white text — invisible on the light gray background. No scroll-based background change. Desktop has an unnecessary burger menu button. Mobile menu is plain and needs polish.
2. **About section Transfer Card**: Uses `hidden lg:block` — disappears on mobile and tablet.
3. **About section layout**: Needs to match the reference image more closely — two-column layout with Transfer Card on right + cargo truck image below it, and two feature cards (dark + light) at the bottom.

## Plan

### 1. Fix Header (`Header.tsx`)
- Remove `bg-transparent`, use a light glassmorphism style: `bg-white/60 backdrop-blur-md` with dark text (matching Photo 1's light navbar)
- Add scroll detection: after scrolling past hero, add subtle shadow
- Active nav link gets a filled pill background (white rounded-full with shadow), others are plain dark text
- **Remove** the desktop burger `<Menu>` button — only keep LanguageSwitcher on desktop right side
- **Mobile menu**: Style with white background, rounded cards, smooth slide-down animation instead of dark overlay
- Logo text: change from `text-white` to `text-foreground` so it's visible on light bg

### 2. Fix About Transfer Card (`Index.tsx`, lines 212-231)
- Change `hidden lg:block` → always visible
- On mobile/tablet: stack below the text content (full width)
- On desktop: keep it on the right column as-is

### 3. Match About Section to Reference (Photo 3)
The reference shows:
- Left side: "About Us" badge, large heading, description, then two feature cards side by side (one dark bg, one light bg)
- Right side: Orange gradient background area containing the Transfer Card on top, and a cargo truck photo below/beside it
- Update the right column to include both the transfer card AND a truck image in a rounded container with warm orange gradient background
- Make the layout work on all breakpoints

### Files Changed
| File | Changes |
|---|---|
| `src/components/Header.tsx` | Light theme navbar, remove desktop burger, scroll shadow, better mobile menu |
| `src/pages/Index.tsx` | Fix Transfer Card visibility on mobile/tablet, match about section layout to reference |

