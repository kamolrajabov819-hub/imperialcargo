

# Migrate from localStorage to Lovable Cloud Database

Currently all data (clients, comments, warehouse settings, admin auth, user sessions) lives in localStorage and is lost when clearing browser data. This plan migrates everything to a persistent database with proper authentication.

## Database Tables

### 1. `clients` table
Stores all client/parcel records (name, phone, city, code, stage, confirmed status, timestamps).

### 2. `client_comments` table
Stores admin comments per client, linked via `client_id` foreign key.

### 3. `warehouse_settings` table
Single-row table for the warehouse address configuration.

### 4. `user_roles` table
Stores admin role assignments (follows security best practices — roles in separate table).

## Authentication

- **Admin**: Real email/password auth via Lovable Cloud auth system (replaces hardcoded `admin@cargolink.com / admin123`). Admin role stored in `user_roles` table.
- **Client login**: Clients log in with name + phone (looked up in `clients` table). No Supabase auth account needed — they're lightweight users identified by their record.
- **Client signup**: Creates a record in `clients` table (same as now, but persisted to DB).

## RLS Policies

- `clients`: Public read for login lookup (by name+phone). Insert allowed for signup. Admin (via `has_role`) can do everything.
- `client_comments`: Admin-only CRUD.
- `warehouse_settings`: Public read (dashboard needs it). Admin-only update.
- `user_roles`: No public access, used only via `has_role()` security definer function.

## Code Changes

### `src/lib/mockData.ts` → `src/lib/dataService.ts`
Rewrite all functions to use Supabase client instead of localStorage. Keep the same function signatures so Admin/Dashboard/Signup/Login pages need minimal changes. Make functions async.

### `src/pages/Admin.tsx`
- Replace hardcoded login with `supabase.auth.signInWithPassword()`
- Replace `getClients()` etc. with async versions
- Add `useEffect` hooks for data fetching
- Wrap mutations in async calls

### `src/pages/Dashboard.tsx`
- Fetch client data from DB instead of localStorage
- Store current user session in localStorage (just the client ID) + fetch fresh data from DB

### `src/pages/Login.tsx`
- Use async `findClientByNameAndPhone()` that queries DB

### `src/pages/Signup.tsx`
- Use async `addClient()` that inserts into DB

### Initial Admin Setup
- Seed the admin user via a migration: create the auth user and assign admin role
- Seed default warehouse settings
- Seed the 8 default demo clients

## Files Changed
| File | Change |
|---|---|
| Migration SQL | Create tables, RLS, functions, seed data |
| `src/lib/mockData.ts` | Rewrite to async Supabase queries |
| `src/pages/Admin.tsx` | Async data + Supabase auth login |
| `src/pages/Dashboard.tsx` | Async data fetching |
| `src/pages/Login.tsx` | Async client lookup |
| `src/pages/Signup.tsx` | Async client creation |
| `src/components/Header.tsx` | Check session from localStorage client ID |

