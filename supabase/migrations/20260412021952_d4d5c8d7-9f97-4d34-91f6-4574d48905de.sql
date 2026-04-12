
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create client_stage enum
CREATE TYPE public.client_stage AS ENUM (
  'new', 'consultation', 'awaiting_cargo', 'cargo_received',
  'in_transit', 'arrived', 'completed', 'cancelled'
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '',
  code TEXT NOT NULL UNIQUE,
  stage client_stage NOT NULL DEFAULT 'new',
  confirmed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Clients RLS: anyone can read (login lookup), anyone can insert (signup), admin can update/delete
CREATE POLICY "Anyone can read clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Anyone can insert clients" ON public.clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update clients" ON public.clients FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete clients" ON public.clients FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create client_comments table
CREATE TABLE public.client_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.client_comments ENABLE ROW LEVEL SECURITY;

-- Comments RLS: admin only
CREATE POLICY "Admins can read comments" ON public.client_comments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert comments" ON public.client_comments FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete comments" ON public.client_comments FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create warehouse_settings table
CREATE TABLE public.warehouse_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'CargoLink Warehouse',
  line1 TEXT NOT NULL DEFAULT '',
  line2 TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  postal TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT ''
);
ALTER TABLE public.warehouse_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read warehouse" ON public.warehouse_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update warehouse" ON public.warehouse_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed default warehouse
INSERT INTO public.warehouse_settings (name, line1, line2, city, country, postal, phone)
VALUES (
  'CargoLink Warehouse',
  'Room 302, Building A, Yiwu International Trade City',
  'District 3, Futian Street',
  'Yiwu, Zhejiang Province',
  'China',
  '322000',
  '+86 579 8523 4567'
);

-- Seed demo clients
INSERT INTO public.clients (name, phone, city, code, stage, confirmed, created_at) VALUES
  ('Айбек Сулайманов', '+996555123456', 'Bishkek', 'KGZ-889241', 'completed', false, '2025-01-15'),
  ('Мария Петрова', '+996700654321', 'Osh', 'KGZ-331072', 'in_transit', false, '2025-02-03'),
  ('Нурлан Алиев', '+996550987654', 'Jalal-Abad', 'KGZ-554198', 'consultation', false, '2025-03-20'),
  ('Гулназ Касымова', '+996770112233', 'Karakol', 'KGZ-772610', 'new', false, '2025-04-01'),
  ('Дмитрий Ким', '+996555998877', 'Bishkek', 'KGZ-110385', 'awaiting_cargo', true, '2025-04-05'),
  ('Азамат Турдубаев', '+996700111222', 'Bishkek', 'KGZ-445512', 'cargo_received', false, '2025-01-28'),
  ('Елена Сидорова', '+996555333444', 'Osh', 'KGZ-667788', 'arrived', true, '2025-02-14'),
  ('Бакыт Жумабеков', '+996770555666', 'Naryn', 'KGZ-991234', 'cancelled', false, '2025-03-05');
