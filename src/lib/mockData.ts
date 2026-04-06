export interface Client {
  id: string;
  name: string;
  phone: string;
  city: string;
  code: string;
  createdAt: string;
}

const STORAGE_KEY = "cargolink-clients";
const USER_KEY = "cargolink-current-user";
const WAREHOUSE_KEY = "cargolink-warehouse";

export function generateCode(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `KGZ-${digits}`;
}

export function getClients(): Client[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  const defaults: Client[] = [
    { id: "1", name: "Айбек Сулайманов", phone: "+996555123456", city: "Bishkek", code: "KGZ-889241", createdAt: "2025-01-15" },
    { id: "2", name: "Мария Петрова", phone: "+996700654321", city: "Osh", code: "KGZ-331072", createdAt: "2025-02-03" },
    { id: "3", name: "Нурлан Алиев", phone: "+996550987654", city: "Jalal-Abad", code: "KGZ-554198", createdAt: "2025-03-20" },
    { id: "4", name: "Гулназ Касымова", phone: "+996770112233", city: "Karakol", code: "KGZ-772610", createdAt: "2025-04-01" },
    { id: "5", name: "Дмитрий Ким", phone: "+996555998877", city: "Bishkek", code: "KGZ-110385", createdAt: "2025-04-05" },
    { id: "6", name: "Азамат Турдубаев", phone: "+996700111222", city: "Bishkek", code: "KGZ-445512", createdAt: "2025-01-28" },
    { id: "7", name: "Елена Сидорова", phone: "+996555333444", city: "Osh", code: "KGZ-667788", createdAt: "2025-02-14" },
    { id: "8", name: "Бакыт Жумабеков", phone: "+996770555666", city: "Naryn", code: "KGZ-991234", createdAt: "2025-03-05" },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
}

export function addClient(client: Omit<Client, "id" | "code" | "createdAt">): Client {
  const clients = getClients();
  const newClient: Client = {
    ...client,
    id: crypto.randomUUID(),
    code: generateCode(),
    createdAt: new Date().toISOString().split("T")[0],
  };
  clients.push(newClient);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  return newClient;
}

export function updateClient(id: string, updates: Partial<Client>): void {
  const clients = getClients().map((c) => (c.id === id ? { ...c, ...updates } : c));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export function deleteClient(id: string): void {
  const clients = getClients().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
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

export function findClientByNameAndPhone(name: string, phone: string): Client | null {
  const clients = getClients();
  const trimName = name.trim().toLowerCase();
  const trimPhone = phone.replace(/\s+/g, "");
  return clients.find((c) => c.name.toLowerCase().trim() === trimName && c.phone.replace(/\s+/g, "") === trimPhone) || null;
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

export function getWarehouseAddress() {
  const data = localStorage.getItem(WAREHOUSE_KEY);
  return data ? JSON.parse(data) : { ...DEFAULT_WAREHOUSE };
}

export function saveWarehouseAddress(address: typeof DEFAULT_WAREHOUSE): void {
  localStorage.setItem(WAREHOUSE_KEY, JSON.stringify(address));
}

// Comment types and storage
const COMMENTS_KEY = "cargolink-comments";

export interface Comment {
  id: string;
  clientId: string;
  text: string;
  createdAt: string;
}

export function getClientComments(clientId: string): Comment[] {
  const data = localStorage.getItem(COMMENTS_KEY);
  const all: Comment[] = data ? JSON.parse(data) : [];
  return all.filter((c) => c.clientId === clientId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addClientComment(clientId: string, text: string): Comment {
  const data = localStorage.getItem(COMMENTS_KEY);
  const all: Comment[] = data ? JSON.parse(data) : [];
  const comment: Comment = {
    id: crypto.randomUUID(),
    clientId,
    text,
    createdAt: new Date().toISOString(),
  };
  all.push(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  return comment;
}

export function deleteClientComment(id: string): void {
  const data = localStorage.getItem(COMMENTS_KEY);
  const all: Comment[] = data ? JSON.parse(data) : [];
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(all.filter((c) => c.id !== id)));
}

export function getWarehouseString(): string {
  const a = getWarehouseAddress();
  return `${a.name}\n${a.line1}\n${a.line2}\n${a.city}, ${a.country} ${a.postal}\nTel: ${a.phone}`;
}

// Statistics helpers
export function getClientStats() {
  const clients = getClients();
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const newThisMonth = clients.filter((c) => c.createdAt.startsWith(thisMonth)).length;

  const cityCount: Record<string, number> = {};
  clients.forEach((c) => {
    cityCount[c.city] = (cityCount[c.city] || 0) + 1;
  });

  const topCity = Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const monthlyData: Record<string, number> = {};
  clients.forEach((c) => {
    const m = c.createdAt.substring(0, 7);
    monthlyData[m] = (monthlyData[m] || 0) + 1;
  });

  const registrationsByMonth = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }));

  const clientsByCity = Object.entries(cityCount).map(([city, count]) => ({ city, count }));

  return {
    total: clients.length,
    newThisMonth,
    topCity,
    activeCodes: clients.length,
    registrationsByMonth,
    clientsByCity,
  };
}

export function exportClientsCSV(): string {
  const clients = getClients();
  const header = "Name,Phone,City,Code,Date";
  const rows = clients.map((c) => `"${c.name}","${c.phone}","${c.city}","${c.code}","${c.createdAt}"`);
  return [header, ...rows].join("\n");
}
