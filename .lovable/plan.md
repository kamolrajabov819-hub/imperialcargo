

# Admin Page: Mobile Responsive, Warehouse Sync, Language Fix & Client Comments

## 1. Make Admin Page Mobile Responsive (`Admin.tsx`)

**Current problem**: Sidebar is a fixed 240px column with no mobile adaptation. On small screens it takes up most of the viewport.

**Fix**:
- On mobile (`md` breakpoint), sidebar becomes an overlay drawer (full-height, fixed position with backdrop) instead of a side-by-side column
- Default `sidebarOpen` to `false` on mobile
- Add a hamburger/menu button in the top header bar visible on mobile
- Stat cards: change `grid-cols-2` to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Charts grid: `grid-cols-1 lg:grid-cols-2`
- Reduce padding on mobile (`p-4` instead of `p-6`)

## 2. Warehouse Address Sync (`Dashboard.tsx`, `mockData.ts`)

**Current problem**: `WAREHOUSE_ADDRESS` is a module-level constant exported from `mockData.ts` — evaluated once at import time. When admin updates warehouse in settings, `Dashboard.tsx` still shows the stale value.

**Fix**:
- Remove the `WAREHOUSE_ADDRESS` constant export from `mockData.ts`
- In `Dashboard.tsx`, replace usage of `WAREHOUSE_ADDRESS` with a call to `getWarehouseAddress()` stored in component state (via `useState(getWarehouseAddress)`) so it reads fresh data from localStorage on each mount

## 3. Fix Language Switcher in Admin Sidebar (`Admin.tsx`, `LanguageSwitcher.tsx`)

**Current problem**: The sidebar clips the LanguageSwitcher dropdown. The `overflow-hidden` was removed previously but the dropdown still opens upward into clipped space at the bottom of the sidebar.

**Fix**:
- Change the LanguageSwitcher dropdown to open **upward** (`bottom-full mb-2` instead of `top-full mt-2`) when used inside the admin sidebar, since it sits at the bottom of the sidebar
- Alternatively, add a `dropUp` prop to `LanguageSwitcher` and pass it from Admin sidebar usage

## 4. Add Client Comments Feature (`mockData.ts`, `Admin.tsx`)

**Changes to `mockData.ts`**:
- Add a new `COMMENTS_KEY` storage key
- Add a `Comment` interface: `{ id, clientId, text, createdAt }`
- Add functions: `getClientComments(clientId)`, `addClientComment(clientId, text)`, `deleteClientComment(id)`

**Changes to `Admin.tsx`**:
- Add a "comment" icon button next to each client row's edit/delete buttons
- Clicking it opens a dialog/panel showing that client's comments with an input to add new ones
- Each comment shows text, date, and a delete button
- Use a `MessageSquare` icon from Lucide

## Files Changed
| File | Changes |
|---|---|
| `src/pages/Admin.tsx` | Mobile responsive layout, language switcher fix, comments dialog per client |
| `src/pages/Dashboard.tsx` | Use `getWarehouseAddress()` in state instead of stale `WAREHOUSE_ADDRESS` constant |
| `src/lib/mockData.ts` | Remove `WAREHOUSE_ADDRESS` constant, add Comment interface and CRUD functions |
| `src/components/LanguageSwitcher.tsx` | Add `dropUp` prop for upward dropdown positioning |

