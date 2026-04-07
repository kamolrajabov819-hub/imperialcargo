

# 4 Changes: Font, Steps Photos, Logo Image, Delete Confirmation

## 1. Change font to Inter everywhere
- **`tailwind.config.ts`**: Change `heading` font from `Playfair Display` to `Inter`
- **`index.html`**: Remove Playfair Display from Google Fonts import (keep only Inter)
- Result: entire site uses Inter consistently

## 2. Add real marketplace logos to "3 Simple Steps" section
The user uploaded actual logo images for Taobao, Dewu/Poizon, Pinduoduo, and 1688. Currently the steps section uses colored text badges.

- Copy uploaded images to `src/assets/`: `taobao.webp`, `dewu.jpg`, `pinduoduo.jfif`, `1688.jfif`
- **`src/pages/Index.tsx`** (lines 386-404): Replace the text badges with actual logo images (~40px rounded) with labels beneath each
- Make the overall cards more visually appealing with slightly larger card padding and better spacing

## 3. Replace text logo with ISU Cargo logo image
The user uploaded the ISU Cargo logo (photo 5 = `image_2026-04-07_10-35-21-3.png`).

- Copy logo to `src/assets/isu-cargo-logo.png`
- **`src/components/Header.tsx`** (line 92-96): Replace the text `ISU Cargo` with an `<img>` tag importing the logo (~40px height)
- **`src/pages/Admin.tsx`**: Same replacement in admin sidebar/login logo areas

## 4. Add delete confirmation dialog in Admin
- **`src/pages/Admin.tsx`**: 
  - Import `AlertDialog` components from shadcn
  - Add state for `deleteConfirmId` (string | null)
  - When trash icon is clicked, set `deleteConfirmId` instead of calling `handleDelete` directly
  - Show AlertDialog: "Are you sure you want to delete this lead?" with Cancel/Delete buttons
  - On confirm, call `handleDelete(deleteConfirmId)` and reset state

## Files Changed
| File | Changes |
|---|---|
| `index.html` | Remove Playfair Display font |
| `tailwind.config.ts` | Heading font → Inter |
| `src/assets/` | Add logo + 4 marketplace images |
| `src/pages/Index.tsx` | Real marketplace logo images in steps section |
| `src/components/Header.tsx` | Logo image instead of text |
| `src/pages/Admin.tsx` | Logo image, delete confirmation AlertDialog |

