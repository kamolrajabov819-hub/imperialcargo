
-- user_roles: no direct access, only via has_role() security definer
CREATE POLICY "No direct access to user_roles" ON public.user_roles FOR SELECT USING (false);
CREATE POLICY "No direct insert to user_roles" ON public.user_roles FOR INSERT WITH CHECK (false);
CREATE POLICY "No direct update to user_roles" ON public.user_roles FOR UPDATE USING (false);
CREATE POLICY "No direct delete to user_roles" ON public.user_roles FOR DELETE USING (false);
