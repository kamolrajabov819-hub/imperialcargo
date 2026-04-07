

# 3 Changes: Logo Icon, Steps Content, Dashboard Warning

## 1. Change logo icon to a box/container style

The uploaded logo shows a cardboard box shape. Replace `Package` (which looks like a gift box) with `Box` from Lucide (open-top box icon, closer to the reference). Apply in all 6 locations:

**Files:**
- **`src/components/Header.tsx`** line 93: `Package` → `Box`
- **`src/pages/Admin.tsx`** lines 175, 211: same
- **`src/pages/Index.tsx`** line 481: same (footer)
- **`src/pages/Dashboard.tsx`** line 68: same
- Update imports in all 4 files

## 2. Update "3 Simple Steps" descriptions to emphasize KGZ code + warehouse address

The step descriptions already mention this but need to be more explicit. Update translations:

**File: `src/lib/i18n.tsx`**

**Step 2 descriptions** (all 3 languages) — make clearer that users must use their KGZ code AND the warehouse address as the delivery address:
- EN: "Copy our warehouse address and use your personal KGZ code as the recipient ID. Enter this as the delivery address when placing your order on any marketplace."
- RU: "Скопируйте адрес нашего склада и укажите ваш персональный KGZ код как ID получателя. Введите это как адрес доставки при оформлении заказа на любом маркетплейсе."
- KG: "Биздин кампанын дарегин көчүрүп, жеке KGZ кодуңузду алуучунун ID катары көрсөтүңүз. Буну маркетплейсте заказ берүүдө жеткирүү дареги катары киргизиңиз."

## 3. Add warning banner in Dashboard

Add a prominent warning card between the Identity Card and Warehouse Address sections.

**File: `src/pages/Dashboard.tsx`** (after line 85, before Warehouse Address):
- Import `AlertTriangle` from lucide-react and `Alert` from shadcn
- Add a warning card with amber/yellow styling containing the translated message
- Use `⚠️` icon + bold text

**File: `src/lib/i18n.tsx`** — add new keys:
- `dashboard.warning`: "To prevent your parcels from getting lost, be sure to send a screenshot of the completed address and receive confirmation from our manager."
- `dashboard.warningImportant`: "Only after address confirmation ✅ does the Cargo bear responsibility for your parcels 📦"
- RU: "Чтобы ваши посылки не потерялись, обязательно отправьте скрин заполненного адреса и получите подтверждение от нашего менеджера."
- RU important: "Только после подтверждения ✅ адреса Карго несет ответственность за ваши посылки 📦"
- KG equivalents

## Files Changed
| File | Changes |
|---|---|
| `src/components/Header.tsx` | `Package` → `Box` icon |
| `src/pages/Admin.tsx` | `Package` → `Box` icon |
| `src/pages/Index.tsx` | `Package` → `Box` icon in footer |
| `src/pages/Dashboard.tsx` | `Package` → `Box` icon, add warning banner |
| `src/lib/i18n.tsx` | Updated step 2 descriptions, added warning translations |

