

# 4 Changes: Why Choose Us Photos, Service Photo Fix, Mobile Responsive Services, Remove Marketplace Names

## 1. Update "Why Choose Us" section photos

Copy the 4 uploaded user images into `src/assets/`. Then update the image references on lines 373-376:

- **Expert Team** (currently `whyTeam`): change to uploaded photo 4 (`pexels-artempodrez-5025496.jpg`) — people loading boxes
- **Reliable Delivery** (currently `whyDelivery`): change to uploaded photo 3 (`pexels-billow926-2948812-4515030.jpg`) — airport cargo
- **Smart Tracking** (currently `whyTracking`): change to uploaded photo 1 (`close-up-man-holding-smartphone.jpg`) — man with phone

## 2. Fix services section 3rd part photo (duplicate of 4th)

Line 20: `serviceImages` currently uses `whyTracking` for both index 2 and 3. Replace index 2 (3rd service — "Purchase of goods without commission") with the uploaded photo 2 (`pexels-shuaizhi-tian-485596-20882742.jpg` — trucks). This gives each service a unique image.

Updated array:
```
const serviceImages = [whyDelivery, whyTeam, truckPhoto, whyTracking];
```

## 3. Make services section mobile responsive — show photos on mobile

Line 349: The service images have `hidden md:block` which hides them on mobile. Change to always visible with responsive sizing:
- Remove `hidden md:block`
- On mobile: show image below text (stack vertically with `flex-col` on small screens, `flex-row` on md+)
- Adjust image size for mobile: `w-full h-40 md:w-40 md:h-28`

## 4. Remove marketplace names from How It Works

Line 467: Delete the `<span>` element showing `platform.name` text below each logo. Keep the logo images intact.

## Files Changed
| File | Changes |
|---|---|
| `src/pages/Index.tsx` | Update why-choose-us images, fix service image array, make services mobile-responsive, remove marketplace name labels |
| `src/assets/` | Copy 4 uploaded photos into assets |

