import { supabase } from "@/integrations/supabase/client";

export type ClientStage = "new" | "consultation" | "awaiting_cargo" | "cargo_received" | "in_transit" | "arrived" | "completed" | "cancelled";

export interface Client {
  id: string;
  name: string;
  phone: string;
  city: string;
  code: string;
  createdAt: string;
  confirmed?: boolean;
  stage?: ClientStage;
}

export interface Comment {
  id: string;
  clientId: string;
  text: string;
  createdAt: string;
}

const USER_KEY = "cargolink-current-user";

export function generateCode(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `KGZ-${digits}`;
}

// Map DB row to Client interface
function mapClient(row: any): Client {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    city: row.city,
    code: row.code,
    createdAt: row.created_at ? row.created_at.split("T")[0] : "",
    confirmed: row.confirmed,
    stage: row.stage as ClientStage,
  };
}

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
  if (error) { console.error("getClients error:", error); return []; }
  return (data || []).map(mapClient);
}

export async function addClient(client: Omit<Client, "id" | "code" | "createdAt">): Promise<Client | null> {
  const code = generateCode();
  const { data, error } = await supabase.from("clients").insert({
    name: client.name,
    phone: client.phone,
    city: client.city || "",
    code,
    stage: "new" as any,
    confirmed: false,
  }).select().single();
  if (error) { console.error("addClient error:", error); return null; }
  return mapClient(data);
}

export async function updateClient(id: string, updates: Partial<Client>): Promise<void> {
  const dbUpdates: any = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.city !== undefined) dbUpdates.city = updates.city;
  if (updates.confirmed !== undefined) dbUpdates.confirmed = updates.confirmed;
  if (updates.stage !== undefined) dbUpdates.stage = updates.stage;
  const { error } = await supabase.from("clients").update(dbUpdates).eq("id", id);
  if (error) console.error("updateClient error:", error);
}

export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) console.error("deleteClient error:", error);
}

export function setCurrentUser(client: Client): void {
  localStorage.setItem(USER_KEY, JSON.stringify(client));
}

export function getCurrentUser(): Client | null {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function logoutUser(): void {
  localStorage.removeItem(USER_KEY);
}

export async function findClientByNameAndPhone(name: string, phone: string): Promise<Client | null> {
  const trimName = name.trim().toLowerCase();
  const trimPhone = phone.replace(/\s+/g, "");
  const { data, error } = await supabase.from("clients").select("*");
  if (error || !data) return null;
  const found = data.find(
    (c: any) => c.name.toLowerCase().trim() === trimName && c.phone.replace(/\s+/g, "") === trimPhone
  );
  return found ? mapClient(found) : null;
}

export const DEFAULT_WAREHOUSE = {
  name: "CargoLink Warehouse",
  line1: "Room 302, Building A, Yiwu International Trade City",
  line2: "District 3, Futian Street",
  city: "Yiwu, Zhejiang Province",
  country: "China",
  postal: "322000",
  phone: "+86 579 8523 4567",
};

export async function getWarehouseAddress() {
  const { data, error } = await supabase.from("warehouse_settings").select("*").limit(1).single();
  if (error || !data) return { ...DEFAULT_WAREHOUSE };
  return {
    name: data.name,
    line1: data.line1,
    line2: data.line2,
    city: data.city,
    country: data.country,
    postal: data.postal,
    phone: data.phone,
  };
}

export async function saveWarehouseAddress(address: typeof DEFAULT_WAREHOUSE): Promise<void> {
  // Get existing row id
  const { data } = await supabase.from("warehouse_settings").select("id").limit(1).single();
  if (data) {
    const { error } = await supabase.from("warehouse_settings").update({
      name: address.name,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      country: address.country,
      postal: address.postal,
      phone: address.phone,
    }).eq("id", data.id);
    if (error) console.error("saveWarehouseAddress error:", error);
  }
}

export async function getClientComments(clientId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("client_comments")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((c: any) => ({
    id: c.id,
    clientId: c.client_id,
    text: c.text,
    createdAt: c.created_at,
  }));
}

export async function addClientComment(clientId: string, text: string): Promise<Comment | null> {
  const { data, error } = await supabase.from("client_comments").insert({
    client_id: clientId,
    text,
  }).select().single();
  if (error || !data) { console.error("addClientComment error:", error); return null; }
  return { id: data.id, clientId: data.client_id, text: data.text, createdAt: data.created_at };
}

export async function deleteClientComment(id: string): Promise<void> {
  const { error } = await supabase.from("client_comments").delete().eq("id", id);
  if (error) console.error("deleteClientComment error:", error);
}

export function getWarehouseString(address: typeof DEFAULT_WAREHOUSE): string {
  return `${address.name}\n${address.line1}\n${address.line2}\n${address.city}, ${address.country} ${address.postal}\nTel: ${address.phone}`;
}

export const ALL_STAGES: ClientStage[] = ["new", "consultation", "awaiting_cargo", "cargo_received", "in_transit", "arrived", "completed", "cancelled"];

export function getClientStats(clients: Client[]) {
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const newThisMonth = clients.filter((c) => c.createdAt.startsWith(thisMonth)).length;

  const cityCount: Record<string, number> = {};
  clients.forEach((c) => { cityCount[c.city] = (cityCount[c.city] || 0) + 1; });
  const topCity = Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const monthlyData: Record<string, number> = {};
  clients.forEach((c) => { const m = c.createdAt.substring(0, 7); monthlyData[m] = (monthlyData[m] || 0) + 1; });

  const registrationsByMonth = Object.entries(monthlyData).sort(([a], [b]) => a.localeCompare(b)).map(([month, count]) => ({ month, count }));
  const clientsByCity = Object.entries(cityCount).map(([city, count]) => ({ city, count }));

  const stageCount: Record<string, number> = {};
  ALL_STAGES.forEach((s) => { stageCount[s] = 0; });
  clients.forEach((c) => { const stage = c.stage || "new"; stageCount[stage] = (stageCount[stage] || 0) + 1; });
  const stageDistribution = ALL_STAGES.map((stage) => ({ stage, count: stageCount[stage] || 0 }));

  const confirmedCount = clients.filter((c) => c.confirmed).length;
  const confirmedPercentage = clients.length > 0 ? Math.round((confirmedCount / clients.length) * 100) : 0;
  const completedCount = clients.filter((c) => c.stage === "completed").length;
  const cancelledCount = clients.filter((c) => c.stage === "cancelled").length;

  return {
    total: clients.length, newThisMonth, topCity, activeCodes: clients.length,
    registrationsByMonth, clientsByCity, stageDistribution,
    confirmedCount, confirmedPercentage, completedCount, cancelledCount,
  };
}

export function exportClientsCSV(clients: Client[]): string {
  const sep = ",";
  const header = ["Name", "Phone", "City", "Code", "Date", "Stage", "Confirmed"].join(sep);
  const rows = clients.map((c) =>
    [`"${c.name}"`, `"${c.phone}"`, `"${c.city}"`, `"${c.code}"`, `"${c.createdAt}"`, `"${c.stage || "new"}"`, `"${c.confirmed ? "Yes" : "No"}"`].join(sep)
  );
  return "\uFEFF" + [header, ...rows].join("\r\n");
}
