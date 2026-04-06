import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  getClients, addClient, updateClient, deleteClient, type Client,
} from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Search, Plus, Pencil, Trash2, Users, Settings, LogOut, Package, X, Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"clients" | "settings">("clients");
  const [addOpen, setAddOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("+996");
  const [newCity, setNewCity] = useState("");
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = () => {
    if (email === "admin@cargolink.com" && password === "admin123") {
      setAuthed(true);
      setClients(getClients());
      setError("");
    } else {
      setError(t("admin.invalidCreds"));
    }
  };

  const refresh = () => setClients(getClients());

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }, [clients, search]);

  const handleAdd = () => {
    if (!newName || !newPhone) return;
    addClient({ name: newName, phone: newPhone, city: newCity });
    setNewName(""); setNewPhone("+996"); setNewCity("");
    setAddOpen(false);
    refresh();
  };

  const handleEdit = () => {
    if (!editClient) return;
    updateClient(editClient.id, { name: editName, phone: editPhone, city: editCity });
    setEditClient(null);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteClient(id);
    refresh();
  };

  const openEdit = (c: Client) => {
    setEditClient(c);
    setEditName(c.name);
    setEditPhone(c.phone);
    setEditCity(c.city);
  };

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm glass rounded-2xl p-8 glow-box-cyan"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Package className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-foreground">Cargo<span className="text-primary">Link</span></span>
          </div>
          <h2 className="text-xl font-bold text-foreground text-center mb-6">{t("admin.login")}</h2>
          {error && <p className="text-destructive text-sm text-center mb-4">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">{t("admin.email")}</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-secondary border-border text-foreground mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t("admin.password")}</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-secondary border-border text-foreground mt-1" onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
            >
              {t("admin.signIn")}
            </motion.button>
          </div>
          <div className="mt-6 flex justify-center">
            <LanguageSwitcher />
          </div>
        </motion.div>
      </div>
    );
  }

  // CRM Dashboard
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-screen bg-card border-r border-border flex flex-col overflow-hidden sticky top-0"
          >
            <div className="p-4 flex items-center gap-2 border-b border-border">
              <Package className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Cargo<span className="text-primary">Link</span></span>
            </div>
            <nav className="flex-1 p-2 space-y-1">
              {[
                { key: "clients" as const, icon: Users, label: t("admin.clients") },
                { key: "settings" as const, icon: Settings, label: t("admin.settings") },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    tab === item.key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="p-2 border-t border-border space-y-1">
              <LanguageSwitcher />
              <button
                onClick={() => { setAuthed(false); navigate("/admin"); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("admin.logout")}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 min-h-screen">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground p-2 hover:bg-muted rounded-lg">
            <Users className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {t("admin.totalClients")}: <span className="text-primary font-bold">{clients.length}</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {tab === "clients" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("admin.search")}
                    className="pl-10 bg-secondary border-border text-foreground"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAddOpen(true)}
                  className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  {t("admin.addClient")}
                </motion.button>
              </div>

              {/* Table */}
              <div className="glass rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-muted-foreground">{t("admin.name")}</TableHead>
                        <TableHead className="text-muted-foreground">{t("admin.phone")}</TableHead>
                        <TableHead className="text-muted-foreground hidden sm:table-cell">{t("admin.location")}</TableHead>
                        <TableHead className="text-muted-foreground">{t("admin.identityCode")}</TableHead>
                        <TableHead className="text-muted-foreground hidden md:table-cell">{t("admin.date")}</TableHead>
                        <TableHead className="text-muted-foreground text-right">{t("admin.actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((c) => (
                        <TableRow key={c.id} className="border-border hover:bg-muted/30">
                          <TableCell className="text-foreground font-medium">{c.name}</TableCell>
                          <TableCell className="text-foreground">{c.phone}</TableCell>
                          <TableCell className="text-foreground hidden sm:table-cell">{c.city}</TableCell>
                          <TableCell className="text-primary font-mono font-bold">{c.code}</TableCell>
                          <TableCell className="text-muted-foreground hidden md:table-cell">{c.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          )}

          {tab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8 max-w-lg">
              <h2 className="text-xl font-bold text-foreground mb-4">{t("admin.settings")}</h2>
              <p className="text-muted-foreground text-sm">Settings coming soon — Supabase integration, n8n workflows, and more.</p>
            </motion.div>
          )}
        </main>
      </div>

      {/* Add Client Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle>{t("admin.addClient")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">{t("admin.name")}</label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="bg-secondary border-border text-foreground mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t("admin.phone")}</label>
              <Input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="bg-secondary border-border text-foreground mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t("admin.location")}</label>
              <Input value={newCity} onChange={(e) => setNewCity(e.target.value)} className="bg-secondary border-border text-foreground mt-1" />
            </div>
            <div className="flex gap-3">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setAddOpen(false)} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-medium">{t("admin.cancel")}</motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleAdd} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">{t("admin.save")}</motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Client Modal */}
      <Dialog open={!!editClient} onOpenChange={(open) => !open && setEditClient(null)}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle>{t("admin.edit")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">{t("admin.name")}</label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-secondary border-border text-foreground mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t("admin.phone")}</label>
              <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="bg-secondary border-border text-foreground mt-1" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t("admin.location")}</label>
              <Input value={editCity} onChange={(e) => setEditCity(e.target.value)} className="bg-secondary border-border text-foreground mt-1" />
            </div>
            <div className="flex gap-3">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setEditClient(null)} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-medium">{t("admin.cancel")}</motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleEdit} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">{t("admin.save")}</motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
