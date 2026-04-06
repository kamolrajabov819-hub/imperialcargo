

# Fix Admin Page: Chart Labels, Settings Layout, Language Switcher

## 1. Fix Pie Chart Label Readability (`Admin.tsx`)
The pie chart uses cyan-toned colors for slices, and the label text blends into them. Change label fill to a high-contrast dark color (e.g., `#1a1a2e` or `hsl(220,20%,10%)`) so text is always readable against the colored slices. Also increase font size slightly to 14px.

## 2. Center Settings Section (`Admin.tsx`)
The settings container has `max-w-2xl` but no horizontal centering. Add `mx-auto` to the settings wrapper div (line 358) so the form cards are centered in the main content area.

## 3. Fix Language Switcher in Admin Sidebar (`Admin.tsx`)
The sidebar has `overflow-hidden` which clips the LanguageSwitcher dropdown. Fix by either:
- Removing `overflow-hidden` from the sidebar
- Or changing the LanguageSwitcher dropdown to use a portal / absolute positioning that escapes the sidebar overflow

The simplest fix: remove `overflow-hidden` from the sidebar `aside` element (line 163).

## Files Changed
| File | Change |
|---|---|
| `src/pages/Admin.tsx` | Dark label color on pie chart, add `mx-auto` to settings, fix sidebar overflow |

