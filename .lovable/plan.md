

# Fix Dialog Sizing on Desktop

## Problem
The "Add Client", "Edit Client", and "Comments" dialogs all use `max-w-[calc(100vw-2rem)]` which makes them stretch nearly full-width on desktop. They need to be smaller and centered.

## Fix in `src/pages/Admin.tsx`

Change the `max-w` class on all three dialogs:

1. **Add Client dialog** (line 638): Change `max-w-[calc(100vw-2rem)]` to `max-w-md mx-auto`
2. **Edit Client dialog** (line 665): Same change — `max-w-md mx-auto`
3. **Comments dialog** (line 692): Change to `max-w-lg mx-auto` (slightly wider for comment list)

This keeps them mobile-friendly (md = 28rem, lg = 32rem both fit small screens) while looking compact and centered on desktop.

## Files Changed
| File | Changes |
|---|---|
| `src/pages/Admin.tsx` | Update max-width classes on 3 DialogContent elements |

