

# Redesign CargoLink — Full Website + Admin Enhancements

## Overview
Major overhaul: remove 3D scene, redesign hero inspired by the SwiftMove reference (professional logistics look), add full informational sections, and enhance admin with statistics and settings.

## 1. Remove 3D Scene & Redesign Hero
- **Delete** `Scene3D.tsx` and all React Three Fiber imports
- **New Hero**: Dark gradient background with subtle animated particles (CSS/Framer Motion only, no Three.js). Large headline, subtitle, two CTA buttons ("Get Your Code" + "Learn More"), and stats counters (e.g., "10,000+ Shipments", "500+ Clients", "2 Countries")
- Add a partner/trust logos strip below hero (placeholder logos)

## 2. Full Landing Page Sections (inspired by reference)
Add scrollable sections below the hero, all with Framer Motion scroll-reveal animations:

- **About Section**: "Your Trusted Partner in Global Logistics" — description text + two feature cards ("Delivering Excellence Every Mile", "Shaping the Future of Logistics")
- **Services Section**: Accordion or card grid — Cargo Delivery, Warehouse Storage, Freight Forwarding, Supply Chain Management
- **Why Choose Us**: 3-column grid — "Expert Team", "Reliable Delivery", "Smart Tracking" with icons
- **How It Works**: 3-step visual — Register → Get Code → Ship
- **Testimonials**: Client quotes carousel/cards
- **Footer**: Newsletter email input, navigation links, contact info, copyright

All text translated in EN/RU/KG (extend i18n translations).

## 3. Admin Statistics Dashboard
Add a new "Statistics" tab (or enhance the main view) in Admin:
- **Stat Cards**: Total Clients, New This Month, Clients by City (top 3), Active codes count
- **Charts**: Simple bar chart of registrations by month (using recharts or a lightweight chart), pie chart of clients by city
- All computed from mock data

## 4. Admin Settings Page
Replace the placeholder settings with functional options:
- **Warehouse Address Editor**: Edit the China warehouse address fields
- **Admin Credentials Display**: Show current login info (read-only)
- **Export Clients**: Button to download client list as CSV
- **App Preferences**: Language default, notification settings placeholder

## 5. Polish & Completeness
- Remove `@react-three/fiber`, `@react-three/drei`, `three` from dependencies
- Update Header nav to include anchor links for landing sections (About, Services, Contact)
- Ensure full mobile responsiveness
- Add smooth scroll behavior for anchor navigation

## Files Changed
| File | Action |
|---|---|
| `src/components/Scene3D.tsx` | **Delete** |
| `src/pages/Index.tsx` | **Rewrite** — full landing page with all sections |
| `src/pages/Admin.tsx` | **Rewrite** — add Statistics tab, functional Settings |
| `src/lib/i18n.tsx` | **Extend** — add ~60 new translation keys for all sections |
| `src/lib/mockData.ts` | **Extend** — add stats helper functions, CSV export |
| `src/components/Header.tsx` | **Update** — add section nav links |
| `src/index.css` | **Update** — add new utility classes |
| `package.json` | **Update** — remove three.js deps, add recharts |

