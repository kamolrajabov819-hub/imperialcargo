

# 6 Changes: Phone Input Fix, Statistics Mobile, Tooltip Fix, CSV Export, Marketplace Names, Imperial Cargo Rebrand

## 1. Fix PhoneInput border overflow

The phone input country selector button and text input don't align properly. The button has `border border-r-0` and the input has its own border, but they lack a shared container constraint.

**`src/components/PhoneInput.tsx`**: Wrap the button+input in a container with `overflow-hidden rounded-md border border-input` and remove individual borders from button and input. Set button to `border-0 border-r border-input` and input to `border-0 rounded-none`.

## 2. Fix statistics mobile responsiveness

The second row of stat cards uses `grid-cols-2 sm:grid-cols-3` leaving the 3rd card (Cancelled) alone on mobile looking odd.

**`src/pages/Admin.tsx`** (lines 609): Change row 2 grid to `grid-cols-3` always (3 cards fit at smaller sizes with reduced padding). Reduce text sizes for mobile. Make chart containers scroll horizontally on very small screens if needed.

## 3. Fix chart tooltip text visibility

Tooltip `contentStyle` has white-ish text but the stage distribution bar chart tooltip uses default label/item colors that blend into dark background.

**`src/pages/Admin.tsx`** (lines 714-716): Add `itemStyle` and `labelStyle` with white text color to the stage distribution tooltip (same pattern as pie chart tooltip at line 690). Also apply to registrations chart tooltip.

## 4. Improve CSV export with proper encoding and Stage/Confirmed columns

Current `exportClientsCSV()` produces garbled Cyrillic in Excel because it lacks BOM. Also missing Stage and Confirmed columns.

**`src/lib/mockData.ts`**: Add UTF-8 BOM (`\uFEFF`) prefix to CSV output. Header: `Name,Phone,City,Code,Date,Stage,Confirmed`. Already has Stage/Confirmed but verify format.

**`src/pages/Admin.tsx`**: When creating the download blob, use `text/csv;charset=utf-8` and ensure the BOM is included.

## 5. Fix marketplace platform names to match logos

Current order after last edit: Taobao, Pinduoduo, Dewu, 1688. But the actual logo files are mapped wrong. Correct mapping per user's photo:
- `taobaoLogo` → "Taobao"
- `dewuLogo` → "Dewu" (was showing as Pinduoduo)
- `logo1688` → "1688" (was showing as Dewu)  
- `pinduoduoLogo` → "Pinduoduo" (was showing as 1688)

**`src/pages/Index.tsx`** (lines 394-397): Fix to:
```
{ name: "Taobao", src: taobaoLogo },
{ name: "Dewu", src: dewuLogo },
{ name: "1688", src: logo1688 },
{ name: "Pinduoduo", src: pinduoduoLogo },
```

## 6. Rebrand to "Imperial Cargo" with dragon logo and red/gold color scheme

The uploaded logo shows "Imperial Cargo" with a red/gold Chinese dragon on dark background.

### 6a. New color scheme (`src/index.css`)
- **Primary**: Deep red `0 75% 45%` (dragon red)
- **Accent**: Gold `43 80% 55%`
- **Background**: Very dark `240 15% 6%` (near black like the logo)
- **Card**: Dark `240 12% 10%`
- **Foreground**: Warm gold-white `40 20% 90%`
- **Ring/focus**: Gold
- Update glass utilities to match darker tones

### 6b. Dragon SVG logo (`src/components/LogoIcon.tsx`)
Replace globe+plane SVG with a stylized dragon silhouette in red/gold. Simplified Chinese dragon coil shape that works at small sizes (w-6 h-6).

### 6c. Update brand name everywhere
- **`src/components/Header.tsx`**: "ISU Cargo" → "Imperial" + "Cargo" (with primary color on "Cargo" or use gold)
- **`src/pages/Admin.tsx`**: Same name change (lines 175, 211)
- **`src/pages/Index.tsx`**: Footer (line 483), copyright (line 519)
- **`src/pages/Dashboard.tsx`**: Identity card area
- **`index.html`**: `<title>` tag

### 6d. Update chart colors (`src/pages/Admin.tsx`)
Change `CHART_COLORS` from cyan-based to red/gold palette matching new brand.

### 6e. Update CSS animations
- `pulse-gold` keyframe: keep gold or shift to red glow
- `glow-box-cyan` references → update to gold/red glow

## Files Changed
| File | Changes |
|---|---|
| `src/components/PhoneInput.tsx` | Fix border alignment |
| `src/pages/Admin.tsx` | Statistics mobile grid, tooltip fix, chart colors, brand name |
| `src/lib/mockData.ts` | CSV BOM fix |
| `src/pages/Index.tsx` | Fix marketplace names, brand name |
| `src/components/LogoIcon.tsx` | Dragon SVG |
| `src/components/Header.tsx` | "Imperial Cargo" name |
| `src/pages/Dashboard.tsx` | Brand name |
| `src/index.css` | Red/gold/dark color scheme |
| `index.html` | Title update |

