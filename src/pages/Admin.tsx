import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
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
  BarChart3, Download, TrendingUp, MapPin, ShieldCheck, Menu, X, MessageSquare, Check,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CHART_COLORS = ["hsl(185,100%,50%)", "hsl(185,80%,40%)", "hsl(185,60%,30%)", "hsl(200,80%,50%)", "hsl(160,70%,45%)", "hsl(220,70%,50%)"];
const CLIENTS_PER_PAGE = 20;

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

export default function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [warehouse, setWarehouse] = useState(getWarehouseAddress);
  const [warehouseSaved, setWarehouseSaved] = useState(false);
  const [commentClient, setCommentClient] = useState<Client | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when search changes
  useEffect(() => { setCurrentPage(1); }, [search]);

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / CLIENTS_PER_PAGE));
  const paginatedClients = filtered.slice((currentPage - 1) * CLIENTS_PER_PAGE, currentPage * CLIENTS_PER_PAGE);
  const showingFrom = filtered.length === 0 ? 0 : (currentPage - 1) * CLIENTS_PER_PAGE + 1;
  const showingTo = Math.min(currentPage * CLIENTS_PER_PAGE, filtered.length);

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
    setWarehouseSaved(true);
    setTimeout(() => setWarehouseSaved(false), 2500);
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

  // Sidebar content (shared between desktop and mobile)
  const sidebarContent = (
    <>
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
            onClick={() => { setTab(item.key); if (isMobile) setSidebarOpen(false); }}
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
    </>
  );

  // CRM Dashboard
  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop sidebar - always visible */}
      <aside className="hidden md:flex sticky top-0 left-0 h-screen w-60 bg-card border-r border-border flex-col z-30 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar - overlay drawer */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.aside
            initial={{ x: -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -240, opacity: 0 }}
            className="fixed top-0 left-0 h-screen w-60 bg-card border-r border-border flex flex-col z-50"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 min-h-screen min-w-0">
        <header className="h-14 md:h-16 border-b border-border flex items-center justify-between px-3 md:px-6 bg-card/50 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-foreground p-2 hover:bg-muted rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {t("admin.totalClients")}: <span className="text-primary font-bold">{clients.length}</span>
            </div>
          </div>
        </header>

        <main className="p-3 md:p-6">
          {/* Clients Tab */}
          {tab === "clients" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col sm:flex-row gap-3 mb-4 md:mb-6">
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
                  className="px-4 md:px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 whitespace-nowrap text-sm"
                >
                  <Plus className="w-4 h-4" />
                  {t("admin.addClient")}
                </motion.button>
              </div>

              {/* Showing info */}
              {filtered.length > 0 && (
                <p className="text-sm text-muted-foreground mb-3">
                  Showing {showingFrom}–{showingTo} of {filtered.length} clients
                </p>
              )}

              {/* Mobile card view */}
              <div className="md:hidden space-y-3">
                {paginatedClients.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-foreground font-medium truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{c.createdAt}</p>
                      </div>
                      <span className="text-primary font-mono font-bold text-sm shrink-0">{c.code}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span>{c.phone}</span>
                      {c.city && <span>• {c.city}</span>}
                    </div>
                    <div className="flex items-center gap-1 justify-end">
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
                  </motion.div>
                ))}
                {filtered.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-8">No clients found</p>
                )}
              </div>

              {/* Desktop table view */}
              <div className="hidden md:block glass rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-muted-foreground">{t("admin.name")}</TableHead>
                        <TableHead className="text-muted-foreground">{t("admin.phone")}</TableHead>
                        <TableHead className="text-muted-foreground">{t("admin.location")}</TableHead>
                        <TableHead className="text-muted-foreground">{t("admin.identityCode")}</TableHead>
                        <TableHead className="text-muted-foreground">{t("admin.date")}</TableHead>
                        <TableHead className="text-muted-foreground text-right">{t("admin.actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedClients.map((c) => (
                        <TableRow key={c.id} className="border-border hover:bg-muted/30">
                          <TableCell className="text-foreground font-medium">{c.name}</TableCell>
                          <TableCell className="text-foreground">{c.phone}</TableCell>
                          <TableCell className="text-foreground">{c.city}</TableCell>
                          <TableCell className="text-primary font-mono font-bold">{c.code}</TableCell>
                          <TableCell className="text-muted-foreground">{c.createdAt}</TableCell>
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
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4 md:mt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                    .reduce<(number | "ellipsis")[]>((acc, p, idx, arr) => {
                      if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("ellipsis");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((item, idx) =>
                      item === "ellipsis" ? (
                        <span key={`e-${idx}`} className="px-1 text-muted-foreground">…</span>
                      ) : (
                        <button
                          key={item}
                          onClick={() => setCurrentPage(item as number)}
                          className={`min-w-[2rem] h-8 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === item
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Statistics Tab */}
          {tab === "statistics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 md:space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
                    className="glass rounded-xl p-3 md:p-5"
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <card.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-foreground">{card.value}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1 leading-tight">{card.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="glass rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">{t("admin.registrationsByMonth")}</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={stats.registrationsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,10%,18%)" />
                      <XAxis dataKey="month" stroke="hsl(220,10%,55%)" fontSize={11} />
                      <YAxis stroke="hsl(220,10%,55%)" fontSize={11} />
                      <Tooltip
                        contentStyle={{ background: "hsl(240,15%,8%)", border: "1px solid hsl(240,10%,18%)", borderRadius: "8px", color: "hsl(200,100%,95%)" }}
                      />
                      <Bar dataKey="count" fill="hsl(185,100%,50%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">{t("admin.clientsByCity")}</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={stats.clientsByCity}
                        dataKey="count"
                        nameKey="city"
                        cx="50%"
                        cy="50%"
                        outerRadius={isMobile ? 60 : 80}
                        label={isMobile ? false : ({ city, count, x, y }) => (
                          <text x={x} y={y} fill="#1a1a2e" fontSize={14} fontWeight={600} textAnchor="middle" dominantBaseline="central">
                            {`${city}: ${count}`}
                          </text>
                        )}
                        labelLine={isMobile ? false : { stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
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
                  {/* Legend for mobile */}
                  {isMobile && (
                    <div className="flex flex-wrap gap-2 mt-3 justify-center">
                      {stats.clientsByCity.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                          <span>{item.city}: {item.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {tab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 md:space-y-6 max-w-2xl mx-auto">
              {/* Warehouse Address Editor */}
              <div className="glass rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
                    className={`w-full py-3 rounded-xl font-semibold mt-2 flex items-center justify-center gap-2 transition-colors duration-300 ${
                      warehouseSaved
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-primary text-primary-foreground"
                    }`}
                    disabled={warehouseSaved}
                  >
                    <AnimatePresence mode="wait">
                      {warehouseSaved ? (
                        <motion.span
                          key="saved"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-5 h-5" />
                          {t("dashboard.copied") || "Saved ✓"}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="save"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          {t("admin.save")}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>

              {/* Admin Credentials */}
              <div className="glass rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
              <div className="glass rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
        <DialogContent className="bg-card border-border text-foreground max-w-md mx-auto">
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
        <DialogContent className="bg-card border-border text-foreground max-w-md mx-auto">
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

      {/* Comments Dialog */}
      <Dialog open={!!commentClient} onOpenChange={(open) => !open && setCommentClient(null)}>
        <DialogContent className="bg-card border-border text-foreground max-h-[80vh] flex flex-col max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              {commentClient?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
            {comments.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No comments yet</p>
            )}
            {comments.map((c) => (
              <div key={c.id} className="bg-secondary rounded-lg p-3 flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{c.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(c.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => handleDeleteComment(c.id)} className="p-1 text-destructive hover:bg-destructive/10 rounded shrink-0">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2 border-t border-border">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-secondary border-border text-foreground"
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddComment}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium shrink-0"
            >
              Add
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
