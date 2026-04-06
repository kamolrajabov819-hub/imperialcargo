

# User Login & Phone Input Improvements

## Problem 1: No Login Flow
Currently users can only sign up. After logging out, there's no way to log back in — the app redirects to `/signup`. Need a login page where existing users can enter name + phone to find their account.

## Problem 2: Phone Input UX
The phone field is a plain text input initialized with `+996`. No visual country indicator, no auto-formatting — users don't know what format to use.

## Plan

### 1. Add Login Page (`src/pages/Login.tsx`)
- New page with name + phone inputs
- On submit, search `getClients()` for matching name & phone
- If found: call `setCurrentUser(client)` and navigate to `/dashboard`
- If not found: show error message
- Include link to `/signup` for new users
- Style matching the signup page (glass card, glow, animations)

### 2. Add Login Route (`src/App.tsx`)
- Add `/login` route pointing to new Login page

### 3. Update Navigation
- In `src/pages/Dashboard.tsx`: redirect logged-out users to `/login` instead of `/signup`
- In `src/pages/Index.tsx` and `src/components/Header.tsx`: add "Login" nav link alongside "Sign Up"

### 4. Add `findClient` helper (`src/lib/mockData.ts`)
- New function: `findClientByNameAndPhone(name: string, phone: string): Client | null`
- Searches clients array for matching name (case-insensitive trim) and phone

### 5. Phone Input with Country Selector (`src/pages/Signup.tsx`)
- Add a country selector dropdown before the phone input showing flag emoji + dial code
- Default countries: 🇰🇬 Kyrgyzstan (+996), 🇷🇺 Russia (+7), 🇨🇳 China (+86), 🇰🇿 Kazakhstan (+7), 🇺🇿 Uzbekistan (+998), 🇹🇯 Tajikistan (+992)
- Auto-prefix the selected country code
- Auto-format digits as user types (e.g., +996 555 123 456) with spaces for readability
- Phone input only accepts digits after the country code
- Same phone input component used in both Signup and Login pages

### 6. Add i18n translations (`src/lib/i18n.tsx`)
- Add login keys for all 3 languages: `login.title`, `login.nameLabel`, `login.phoneLabel`, `login.submit`, `login.error`, `login.noAccount`, `login.signupLink`

## Files Changed
| File | Changes |
|---|---|
| `src/pages/Login.tsx` | New login page with name + phone authentication |
| `src/App.tsx` | Add `/login` route |
| `src/lib/mockData.ts` | Add `findClientByNameAndPhone()` function |
| `src/lib/i18n.tsx` | Add login translation keys (en/ru/kg) |
| `src/pages/Signup.tsx` | Replace plain phone input with country selector + auto-formatting |
| `src/pages/Dashboard.tsx` | Redirect to `/login` instead of `/signup` |
| `src/components/Header.tsx` | Add Login nav link |

