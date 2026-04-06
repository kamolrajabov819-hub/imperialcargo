

# CargoLink — China↔Kyrgyzstan Logistics Platform

## Design System
- **Theme**: Dark mode — deep space black (#0A0A0F) backgrounds
- **Accent**: Electric Cyan (#00F0FF) for glows, borders, and interactive elements
- **Typography**: Bold, modern sans-serif (Inter). Large hero text with gradient cyan glow
- **Animations**: Framer Motion on every page transition, scroll reveal, button interaction, and form step
- **i18n**: All user-facing text in Kyrgyz, Russian, and English with a language switcher in the header

## 1. Landing Page / Hero
- Full-screen dark hero with three 3D elements using React Three Fiber:
  - A **rotating glowing cargo container** as the central piece, reacting to mouse movement
  - A **stylized globe** in the background showing the China→Kyrgyzstan route with a glowing animated path
  - **Floating geometric particles** with connecting lines for a techy atmosphere
- Bold headline: "Your Gateway Between China & Kyrgyzstan" with cyan glow text effect
- CTA button: "Get Your Personal Code" → scrolls/navigates to signup
- Floating WhatsApp button (green, branded) always visible

## 2. Multi-Step Signup Flow
- 3-step animated form with progress indicator:
  - **Step 1**: Full Name
  - **Step 2**: WhatsApp Number (with country code selector)
  - **Step 3**: City/Location (dropdown: Bishkek, Osh, Jalal-Abad, etc.)
- Each step slides in with Framer Motion transitions
- On submit → generates a **KGZ-XXXXXX** code (random 6 digits)
- Stores user in mock data (localStorage for now, Supabase-ready)

## 3. User Dashboard
- Premium card with glassmorphism effect displaying:
  - User's name and their **Identity Code (KGZ-XXXXXX)** in large, glowing cyan text
  - Copy-to-clipboard button for the code
- **Warehouse Address Card**: China warehouse address in a clean, readable format with a "Copy Full Address" button
- **Order tracking placeholder** section (for future use)
- Floating WhatsApp "Contact Manager" button linking to wa.me/

## 4. Admin CRM (Protected Route: `/admin`)
- **Mock Login Page**: Email + password form with animated transitions. Accepts mock credentials (admin@cargolink.com / admin123)
- **Sidebar Layout**: Collapsible sidebar with navigation (Clients, Settings)
- **Clients Data Table**:
  - Columns: Name, WhatsApp, Location, Identity Code, Registration Date
  - Instant search/filter bar (by code, name, or phone)
  - Edit and Delete action buttons per row
  - "Add New Client" button → opens modal with form to manually create a user with auto-generated KGZ code
- All data stored in mock state, structured for easy Supabase migration

## 5. Responsive & Mobile-First
- All layouts fully responsive — cards stack on mobile, sidebar becomes a drawer
- Touch-friendly buttons and form inputs
- 3D elements simplified/hidden on low-power mobile devices for performance

## 6. Language Switcher
- Header dropdown to switch between 🇰🇬 Kyrgyz, 🇷🇺 Russian, 🇬🇧 English
- All static text across landing, signup, dashboard, and CRM translated

