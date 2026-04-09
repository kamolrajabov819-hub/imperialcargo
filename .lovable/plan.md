

# 3 Fixes: Service Images, Phone Input Borders, Darker Cream Background

## 1. Fix service section images not loading

The Unsplash URLs are likely blocked or slow. The `alt` text is showing instead of images (screenshot shows broken image icon + alt text). Replace external Unsplash URLs with inline placeholder gradients or use local asset imports. Since no local photos exist, use colored gradient placeholders with relevant icons instead — they'll always render.

**`src/pages/Index.tsx`** (lines 20-25): Replace `serviceImages` array with gradient backgrounds using div+icon instead of `<img>` tags. In the accordion content (line 338-340), replace `<img>` with a styled div containing a relevant Lucide icon (Ship, Warehouse, Truck, Package) on a gradient background.

## 2. Fix phone input — add full visible border

Photo shows the input field has a red top border but no visible full border. The input inside the container lacks its own visible border styling since the container handles it. The issue is the `focus-visible:ring` on the input creates a partial red outline that looks like only a top border.

**`src/components/PhoneInput.tsx`** (line 72): Remove `ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` from the input. Instead, add focus styling to the parent container div using a focus-within approach: `focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2` on line 57's container div.

## 3. Make background darker/creamier

Current `--background: 30 100% 97%` is still too light. Darken slightly to `30 60% 93%` (a richer, warmer cream — less washed out).

**`src/index.css`**:
- `--background`: `30 60% 93%` (darker warm cream)
- `--card`: `30 40% 97%` (slightly lighter than bg for contrast)
- `--secondary`: `30 30% 89%` (darker warm gray)
- `--muted`: `30 20% 86%`

## Files Changed
| File | Changes |
|---|---|
| `src/pages/Index.tsx` | Replace broken Unsplash images with icon+gradient placeholders |
| `src/components/PhoneInput.tsx` | Move focus ring to container, clean input borders |
| `src/index.css` | Darken cream background values |

