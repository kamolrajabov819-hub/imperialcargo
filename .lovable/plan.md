

# Fix Navbar Interactions & Hero Avatar Circles

## Issues

1. **Mobile navbar buttons not working**: The mobile menu links for hash anchors (`#about`, `#services`, `#contact`) call `handleClick` which scrolls, but the mobile menu animation with `height: 0` on exit may interfere. Also, `Link` items in mobile don't call `handleClick` for hash links — need to verify click handlers are consistent.

2. **No active state on navbar buttons**: Hash-based nav buttons (`#about`, `#services`, `#contact`) have no "active" visual state. Need to track which section is currently active (via scroll spy or click tracking) and apply the active pill style (`bg-white shadow-sm font-medium`) to the clicked/active button — both desktop and mobile.

3. **A/B/C placeholder circles**: The hero stat chip shows plain gray circles with letters "A", "B", "C". Replace with small user avatar images (use colored gradient circles with user icons or import small avatar placeholder images) to look more professional, matching the uploaded reference.

## Plan

### 1. Fix Mobile Nav (`Header.tsx`)
- Ensure all mobile menu items (both hash anchors and route links) properly close the menu and navigate
- The `Link` components in mobile already have `onClick={() => setMobileOpen(false)}` but hash buttons use `handleClick` which also closes — verify no race condition with AnimatePresence exit animation blocking scroll

### 2. Add Active Section Tracking (`Header.tsx`)
- Add `activeSection` state tracking which hash section is active
- On click of a hash button, set `activeSection` to that hash value
- Add an `IntersectionObserver` scroll spy: observe `#about`, `#services`, `#contact` sections and update `activeSection` as user scrolls
- Apply active styles to the matching button: `bg-white text-foreground font-medium shadow-sm` (desktop) and `bg-primary/10 text-primary font-medium` (mobile)

### 3. Replace A/B/C with Avatar Icons (`Index.tsx`, lines 144-153)
- Replace the letter circles with small colored gradient avatars (e.g., different background colors with user silhouette icons from Lucide `User` icon), making them look like real user profile pictures
- Keep the "500+" count circle as-is

## Files Changed
| File | Changes |
|---|---|
| `src/components/Header.tsx` | Fix mobile nav clicks, add scroll spy for active section highlighting |
| `src/pages/Index.tsx` | Replace A/B/C circles with colored avatar circles using Lucide User icons |

