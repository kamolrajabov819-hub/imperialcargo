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

export const WAREHOUSE_ADDRESS = {
  name: "CargoLink Warehouse",
  line1: "Room 302, Building A, Yiwu International Trade City",
  line2: "District 3, Futian Street",
  city: "Yiwu, Zhejiang Province",
  country: "China",
  postal: "322000",
  phone: "+86 579 8523 4567",
};

export function getWarehouseString(): string {
  const a = WAREHOUSE_ADDRESS;
  return `${a.name}\n${a.line1}\n${a.line2}\n${a.city}, ${a.country} ${a.postal}\nTel: ${a.phone}`;
}
