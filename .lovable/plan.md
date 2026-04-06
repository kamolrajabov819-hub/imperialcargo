

# Admin Mobile Polish, Save Animation & Dashboard WhatsApp Button

## 1. Full Mobile Responsiveness for Admin (`Admin.tsx`)

**Problems at 390px viewport**:
- Sidebar uses `AnimatePresence` but only shows when `sidebarOpen` is true — on desktop (`md+`) the sidebar should always be visible via `md:sticky md:translate-x-0` instead of requiring a toggle
- Client table: date column (`hidden md:table-cell`) hides the creation time on mobile — show it inline below the name or as a smaller sub-row
- Action buttons in table rows are cramped on mobile
- Pie chart labels overflow on small screens
- Dialog modals need `max-w-[calc(100vw-2rem)]` to avoid edge clipping

**Changes**:
- Make sidebar always visible on `md+` screens (add `md:flex` with sticky positioning) and overlay-only on mobile
- In client table, show `createdAt` as a small text line under the client name on mobile (visible always), remove the separate hidden column approach
- Reduce chart `outerRadius` on mobile or use a legend instead of inline labels for pie chart
- Add responsive padding throughout (`p-3 md:p-6`)
- Ensure all dialogs are properly sized on mobile

## 2. Save Button Animation for Warehouse Settings (`Admin.tsx`)

**Current**: `handleSaveWarehouse` calls `saveWarehouseAddress(warehouse)` with no feedback.

**Fix**:
- Add a `saved` state variable (boolean)
- On save: set `saved = true`, trigger a timeout to reset after 2 seconds
- Button shows animated transition: text changes from "Save" to "Saved ✓" with a green background using `AnimatePresence` or Framer Motion `layout` animation
- Use `Check` icon from Lucide when saved

## 3. WhatsApp Button with Pre-filled Message on Dashboard (`Dashboard.tsx`)

**Current**: There's a generic `WhatsAppButton` component linking to `wa.me/996555000000` with no pre-filled text.

**Fix**:
- Add a dedicated WhatsApp button in the Dashboard (below the warehouse address card) that constructs a `wa.me` URL with a `text` query parameter
- Pre-filled message includes: user's unique code, warehouse address details
- Format: `Hello! My CargoLink code is {code}. Warehouse: {address}`
- URL encode the text properly with `encodeURIComponent`
- Style as a green WhatsApp-branded button with the `MessageCircle` icon

## Files Changed

| File | Changes |
|---|---|
| `src/pages/Admin.tsx` | Sidebar always visible on desktop, client date shown on mobile, save button animation with "Saved ✓" feedback, responsive chart/table fixes |
| `src/pages/Dashboard.tsx` | Add WhatsApp button with pre-filled text containing user code + warehouse address |

