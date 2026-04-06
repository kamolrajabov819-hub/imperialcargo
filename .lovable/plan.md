

# Add Telegram Button + Fix WhatsApp Number

## What
1. Update WhatsApp number to +77718191119 everywhere
2. Add Telegram button (linking to https://t.me/sultanb19) alongside WhatsApp on both homepage and dashboard

## Changes

### `src/components/WhatsAppButton.tsx` → Rename to `ContactButtons.tsx`
- Rename component to `ContactButtons`
- Change WhatsApp href to `https://wa.me/77718191119`
- Add a second floating button for Telegram (`https://t.me/sultanb19`) with Telegram-blue styling
- Stack both buttons vertically (bottom-right corner): Telegram above WhatsApp
- Use `Send` icon from Lucide for Telegram (paper plane style)

### `src/pages/Dashboard.tsx`
- Update WhatsApp URL from `wa.me/996555000000` to `wa.me/77718191119`
- Add a Telegram button below the WhatsApp button, styled in Telegram blue (#229ED9), linking to `https://t.me/sultanb19`
- Add new i18n key `dashboard.contactTelegram` for the button label

### `src/pages/Index.tsx`
- Update import from `WhatsAppButton` to `ContactButtons`

### `src/lib/i18n.tsx`
- Add `dashboard.contactTelegram` translations:
  - EN: "Contact via Telegram"
  - RU: "Связаться в Telegram"
  - KG: "Telegram аркылуу байланыш"

## Files Changed
| File | Changes |
|---|---|
| `src/components/WhatsAppButton.tsx` | Rename to ContactButtons, add Telegram floating button, fix WhatsApp number |
| `src/pages/Dashboard.tsx` | Fix WhatsApp number, add Telegram button |
| `src/pages/Index.tsx` | Update import |
| `src/lib/i18n.tsx` | Add Telegram translation keys |

