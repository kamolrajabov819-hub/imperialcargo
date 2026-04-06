import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  getClients, addClient, updateClient, deleteClient, type Client,
  getClientStats, exportClientsCSV, getWarehouseAddress, saveWarehouseAddress, DEFAULT_WAREHOUSE,
  getClientComments, addClientComment, deleteClientComment, type Comment,
} from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Search, Plus, Pencil, Trash2, Users, Settings, LogOut, Package,
  BarChart3, Download, TrendingUp, MapPin, ShieldCheck, Menu, X, MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CHART_COLORS = ["hsl(185,100%,50%)", "hsl(185,80%,40%)", "hsl(185,60%,30%)", "hsl(200,80%,50%)", "hsl(160,70%,45%)", "hsl(220,70%,50%)"];

export default function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"clients" | "statistics" | "settings">("clients");
  const [addOpen, setAddOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("+996");
  const [newCity, setNewCity] = useState("");
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [warehouse, setWarehouse] = useState(getWarehouseAddress);
  const [commentClient, setCommentClient] = useState<Client | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

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

  const stats = useMemo(() => getClientStats(), [clients]);

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

  const handleExportCSV = () => {
    const csv = exportClientsCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cargolink-clients.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveWarehouse = () => {
    saveWarehouseAddress(warehouse);
  };

  const openComments = (c: Client) => {
    setCommentClient(c);
    setComments(getClientComments(c.id));
    setNewComment("");
  };

  const handleAddComment = () => {
    if (!commentClient || !newComment.trim()) return;
    addClientComment(commentClient.id, newComment.trim());
    setComments(getClientComments(commentClient.id));
    setNewComment("");
  };

  const handleDeleteComment = (id: string) => {
    deleteClientComment(id);
    if (commentClient) setComments(getClientComments(commentClient.id));
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
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -240, opacity: 0 }}
            className="fixed md:sticky top-0 left-0 h-screen w-60 bg-card border-r border-border flex flex-col z-50"
          >
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground">Cargo<span className="text-primary">Link</span></span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-2 space-y-1">
              {[
                { key: "clients" as const, icon: Users, label: t("admin.clients") },
                { key: "statistics" as const, icon: BarChart3, label: t("admin.statistics") },
                { key: "settings" as const, icon: Settings, label: t("admin.settings") },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => { setTab(item.key); setSidebarOpen(false); }}
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
              <LanguageSwitcher dropUp />
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
        <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 bg-card/50">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground p-2 hover:bg-muted rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {t("admin.totalClients")}: <span className="text-primary font-bold">{clients.length}</span>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {/* Clients Tab */}
          {tab === "clients" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => openComments(c)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                <MessageSquare className="w-4 h-4" />
                              </button>
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

          {/* Statistics Tab */}
          {tab === "statistics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: t("admin.totalClients"), value: stats.total, icon: Users },
                  { label: t("admin.newThisMonth"), value: stats.newThisMonth, icon: TrendingUp },
                  { label: t("admin.topCity"), value: stats.topCity, icon: MapPin },
                  { label: t("admin.activeCodes"), value: stats.activeCodes, icon: ShieldCheck },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <card.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{t("admin.registrationsByMonth")}</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={stats.registrationsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,18%)" />
                      <XAxis dataKey="month" stroke="hsl(220,10%,55%)" fontSize={12} />
                      <YAxis stroke="hsl(220,10%,55%)" fontSize={12} />
                      <Tooltip
                        contentStyle={{ background: "hsl(240,15%,8%)", border: "1px solid hsl(240,10%,18%)", borderRadius: "8px", color: "hsl(200,100%,95%)" }}
                      />
                      <Bar dataKey="count" fill="hsl(185,100%,50%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{t("admin.clientsByCity")}</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={stats.clientsByCity}
                        dataKey="count"
                        nameKey="city"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ city, count, x, y }) => (
                          <text x={x} y={y} fill="#1a1a2e" fontSize={14} fontWeight={600} textAnchor="middle" dominantBaseline="central">
                            {`${city}: ${count}`}
                          </text>
                        )}
                        labelLine={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                      >
                        {stats.clientsByCity.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: "hsl(240,15%,8%)", border: "1px solid hsl(240,10%,18%)", borderRadius: "8px", color: "hsl(200,100%,95%)" }}
                        itemStyle={{ color: "hsl(200,100%,95%)" }}
                        labelStyle={{ color: "hsl(200,100%,95%)" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {tab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl mx-auto">
              {/* Warehouse Address Editor */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t("admin.warehouseAddress")}
                </h3>
                <div className="space-y-3">
                  {(Object.keys(DEFAULT_WAREHOUSE) as (keyof typeof DEFAULT_WAREHOUSE)[]).map((key) => (
                    <div key={key}>
                      <label className="text-xs text-muted-foreground capitalize">{key}</label>
                      <Input
                        value={warehouse[key]}
                        onChange={(e) => setWarehouse({ ...warehouse, [key]: e.target.value })}
                        className="bg-secondary border-border text-foreground mt-1"
                      />
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveWarehouse}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold mt-2"
                  >
                    {t("admin.save")}
                  </motion.button>
                </div>
              </div>

              {/* Admin Credentials */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  {t("admin.adminCredentials")}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">{t("admin.currentEmail")}</label>
                    <Input value="admin@cargolink.com" readOnly className="bg-secondary border-border text-muted-foreground mt-1" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">{t("admin.currentPassword")}</label>
                    <Input value="••••••••" readOnly className="bg-secondary border-border text-muted-foreground mt-1" />
                  </div>
                </div>
              </div>

              {/* Export CSV */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  {t("admin.exportCSV")}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExportCSV}
                  className="w-full py-3 rounded-xl bg-primary/10 text-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t("admin.exportCSV")}
                </motion.button>
              </div>
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
