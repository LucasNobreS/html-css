import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Calendar, Users, DollarSign,
  MessageSquare, Bot, LogOut, ChevronRight, ChevronLeft,
  Plus, Search, Bell, Clock, Phone, Mail,
  Send, Sparkles, X, Check, FileText, Settings
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid
} from "recharts";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,300;9..144,600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body, #root { min-height: 100vh; }
    * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    .font-display { font-family: 'Fraunces', Georgia, serif; }

    :root {
      --sidebar: #0B1F3A;
      --sidebar-hover: rgba(255,255,255,0.07);
      --accent: #00C2B2;
      --accent-dark: #009E90;
      --accent-light: #E6FAF8;
      --bg: #F2F4F7;
      --card: #FFFFFF;
      --text: #111827;
      --muted: #6B7280;
      --border: #E5E7EB;
      --success: #10B981;
      --warning: #F59E0B;
      --danger: #EF4444;
      --purple: #8B5CF6;
    }

    .card {
      background: var(--card);
      border-radius: 18px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04);
    }

    .nav-item {
      display: flex; align-items: center; gap: 12px;
      width: 100%; padding: 10px 14px; border-radius: 10px;
      border: none; cursor: pointer; transition: all 0.18s ease;
      color: rgba(255,255,255,0.5); font-size: 14px; font-weight: 500;
      background: transparent; text-align: left;
    }
    .nav-item:hover { background: var(--sidebar-hover); color: rgba(255,255,255,0.85); }
    .nav-item.active { background: var(--accent); color: #fff; font-weight: 700; box-shadow: 0 4px 12px rgba(0,194,178,0.35); }

    .btn-primary {
      background: var(--accent); color: white; border-radius: 10px;
      padding: 10px 20px; font-weight: 700; font-size: 14px;
      cursor: pointer; border: none; transition: all 0.2s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-primary:hover:not(:disabled) { background: var(--accent-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,194,178,0.35); }
    .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

    .input {
      border: 1.5px solid var(--border); border-radius: 10px;
      padding: 10px 14px; font-size: 14px; width: 100%; outline: none;
      transition: border-color 0.2s; color: var(--text); background: white;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .input:focus { border-color: var(--accent); }

    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      border-radius: 6px; padding: 2px 9px; font-size: 12px; font-weight: 700;
    }
    .badge-confirmed { background: #D1FAE5; color: #059669; }
    .badge-pending   { background: #FEF3C7; color: #B45309; }
    .badge-cancelled { background: #FEE2E2; color: #DC2626; }

    .modal-overlay {
      position: fixed; inset: 0; background: rgba(11,31,58,0.55);
      backdrop-filter: blur(6px); z-index: 200;
      display: flex; align-items: center; justify-content: center; padding: 20px;
    }
    .modal {
      background: white; border-radius: 22px; padding: 36px;
      max-width: 500px; width: 100%;
      box-shadow: 0 24px 64px rgba(0,0,0,0.2);
      animation: modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes modalIn { from { opacity:0; transform:scale(0.92) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }

    .animate-in { animation: fadeUp 0.3s ease forwards; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

    .shimmer {
      background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
      background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 8px;
    }
    @keyframes shimmer { to { background-position: -200% 0; } }

    /* WhatsApp */
    .wa-out { background: #DCF8C6; border-radius: 14px 14px 2px 14px; padding: 9px 13px; margin-left: auto; max-width: 78%; }
    .wa-in  { background: white;    border-radius: 14px 14px 14px 2px; padding: 9px 13px; max-width: 78%; box-shadow: 0 1px 2px rgba(0,0,0,0.08); }

    /* Login bg dots */
    .login-dots {
      background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
      background-size: 28px 28px;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
  `}</style>
);

/* ─────────────────────────────────────────────
   CONSTANTS / MOCK DATA
───────────────────────────────────────────── */
const USERS = [
  { id: 1, name: "Dr. Carlos Silva",    email: "admin@clinica.com", password: "123456", role: "admin",        avatar: "CS" },
  { id: 2, name: "Ana Paula Ribeiro",   email: "sec@clinica.com",   password: "123456", role: "secretary",    avatar: "AP" },
  { id: 3, name: "Dra. Fernanda Costa", email: "pro@clinica.com",   password: "123456", role: "professional", avatar: "FC" },
];

const ROLE_LABEL = { admin: "Administrador", secretary: "Secretária", professional: "Profissional" };
const ROLE_COLOR = { admin: "#F59E0B", secretary: "#00C2B2", professional: "#8B5CF6" };

const fmtDate = (d) => d.toISOString().split("T")[0];
const todayStr = fmtDate(new Date());
const tomorrowStr = fmtDate(new Date(Date.now() + 86400000));
const yesterday  = fmtDate(new Date(Date.now() - 86400000));

const INIT_APPOINTMENTS = [
  { id: 1, patientId: 1, patientName: "Maria Santos",    date: todayStr,    time: "09:00", type: "Consulta",    status: "confirmed", professional: "Dra. Fernanda Costa", value: 250, notes: "" },
  { id: 2, patientId: 2, patientName: "João Oliveira",   date: todayStr,    time: "10:30", type: "Retorno",     status: "confirmed", professional: "Dra. Fernanda Costa", value: 150, notes: "" },
  { id: 3, patientId: 3, patientName: "Carla Mendes",    date: todayStr,    time: "14:00", type: "Avaliação",   status: "pending",   professional: "Dra. Fernanda Costa", value: 200, notes: "" },
  { id: 4, patientId: 4, patientName: "Roberto Lima",    date: todayStr,    time: "15:30", type: "Consulta",    status: "confirmed", professional: "Dra. Fernanda Costa", value: 250, notes: "" },
  { id: 5, patientId: 5, patientName: "Luciana Torres",  date: tomorrowStr, time: "09:00", type: "Consulta",    status: "pending",   professional: "Dra. Fernanda Costa", value: 250, notes: "" },
  { id: 6, patientId: 1, patientName: "Maria Santos",    date: tomorrowStr, time: "11:00", type: "Retorno",     status: "pending",   professional: "Dra. Fernanda Costa", value: 150, notes: "" },
];

const INIT_PATIENTS = [
  { id: 1, name: "Maria Santos",   phone: "(11) 99999-0001", email: "maria@email.com",   birthdate: "1985-03-15", notes: "Alergia à penicilina. Pressão alta controlada.", history: [
    { date: "2026-04-10", type: "Consulta", notes: "Paciente relatou dores de cabeça frequentes. Exames solicitados.", professional: "Dra. Fernanda Costa", value: 250 },
    { date: "2026-03-05", type: "Retorno",  notes: "Resultados normais. Paciente estável. Manter acompanhamento.",    professional: "Dra. Fernanda Costa", value: 150 },
  ]},
  { id: 2, name: "João Oliveira",  phone: "(11) 98888-0002", email: "joao@email.com",    birthdate: "1978-07-22", notes: "Diabético tipo 2. Uso de metformina 850mg.", history: [
    { date: "2026-05-01", type: "Consulta", notes: "Controle glicêmico adequado. Manter medicação atual.", professional: "Dra. Fernanda Costa", value: 250 },
  ]},
  { id: 3, name: "Carla Mendes",   phone: "(11) 97777-0003", email: "carla@email.com",   birthdate: "1992-11-30", notes: "", history: [] },
  { id: 4, name: "Roberto Lima",   phone: "(11) 96666-0004", email: "roberto@email.com", birthdate: "1965-01-08", notes: "Hipertensão. Uso de losartana 50mg.", history: [
    { date: "2026-04-20", type: "Avaliação", notes: "PA: 140/90. Ajuste de medicação necessário.", professional: "Dra. Fernanda Costa", value: 200 },
  ]},
  { id: 5, name: "Luciana Torres", phone: "(11) 95555-0005", email: "luciana@email.com", birthdate: "1990-06-14", notes: "", history: [] },
];

const INIT_FINANCIAL = [
  { id: 1, date: todayStr,  patient: "Maria Santos",  type: "Consulta",     value: 250, paid: true  },
  { id: 2, date: todayStr,  patient: "João Oliveira", type: "Retorno",      value: 150, paid: true  },
  { id: 3, date: todayStr,  patient: "Carla Mendes",  type: "Avaliação",    value: 200, paid: false },
  { id: 4, date: todayStr,  patient: "Roberto Lima",  type: "Consulta",     value: 250, paid: false },
  { id: 5, date: yesterday, patient: "Pedro Alves",   type: "Consulta",     value: 250, paid: true  },
  { id: 6, date: yesterday, patient: "Ana Beatriz",   type: "Retorno",      value: 150, paid: true  },
  { id: 7, date: fmtDate(new Date(Date.now() - 86400000*2)), patient: "Carlos Souza", type: "Procedimento", value: 400, paid: true },
];

const REVENUE_DATA = [
  { month: "Jan", valor: 4200 }, { month: "Fev", valor: 5100 },
  { month: "Mar", valor: 4800 }, { month: "Abr", valor: 6200 },
  { month: "Mai", valor: 5800 }, { month: "Jun", valor: 7100 },
];

const MONTH_NAMES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const INIT_CHATS = [
  { id: 1, patient: "Maria Santos",   phone: "(11) 99999-0001", lastMsg: "Confirmado ✓✓", time: "09:15", unread: 0, messages: [
    { from: "bot", text: "Olá Maria! 👋 Lembramos que sua consulta é amanhã às 09:00 com Dra. Fernanda Costa. Confirmar presença?", time: "08:00" },
    { from: "patient", text: "Sim, estarei lá! Obrigada 😊", time: "09:14" },
    { from: "bot", text: "Perfeito! Confirmado ✓ Até amanhã!", time: "09:15" },
  ]},
  { id: 2, patient: "João Oliveira",  phone: "(11) 98888-0002", lastMsg: "Ok, confirmado!", time: "08:45", unread: 0, messages: [
    { from: "bot", text: "Olá João! 👋 Sua consulta é hoje às 10:30. Confirmar?", time: "07:30" },
    { from: "patient", text: "Ok, confirmado!", time: "08:45" },
  ]},
  { id: 3, patient: "Carla Mendes",   phone: "(11) 97777-0003", lastMsg: "Poderia remarcar?", time: "10:52", unread: 2, messages: [
    { from: "bot", text: "Olá Carla! 👋 Sua avaliação é hoje às 14:00. Até logo!", time: "07:00" },
    { from: "patient", text: "Oi! Tive um imprevisto, poderia remarcar?", time: "10:52" },
  ]},
];

/* ─────────────────────────────────────────────
   CLAUDE API
───────────────────────────────────────────── */
async function callClaude(userPrompt, systemPrompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt || "Você é um assistente médico. Responda sempre em português brasileiro, de forma profissional e concisa.",
      messages: [{ role: "user", content: userPrompt }]
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content?.[0]?.text || "";
}

/* ─────────────────────────────────────────────
   LOGIN
───────────────────────────────────────────── */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 700));
    const u = USERS.find(u => u.email === email && u.password === password);
    if (u) onLogin(u); else setError("E-mail ou senha inválidos.");
    setLoading(false);
  };

  const quickLogin = (role) => {
    const u = USERS.find(u => u.role === role);
    setEmail(u.email); setPassword(u.password);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #060F1E 0%, #0B1F3A 60%, #0D2B4A 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="login-dots" style={{ position: "fixed", inset: 0 }} />
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 300, height: 300, background: "radial-gradient(circle, rgba(0,194,178,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 250, height: 250, background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", width: 68, height: 68, background: "linear-gradient(135deg, var(--accent), #00A090)", borderRadius: 22, alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: "0 8px 32px rgba(0,194,178,0.4)" }}>
            <span style={{ fontSize: 32 }}>🏥</span>
          </div>
          <h1 className="font-display" style={{ color: "white", fontSize: 34, fontWeight: 600, letterSpacing: "-0.5px" }}>ClinicFlow</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: 6, fontSize: 15 }}>Gestão clínica com inteligência</p>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 26, padding: 40 }}>
          <h2 style={{ color: "white", fontSize: 21, fontWeight: 800, marginBottom: 28 }}>Entrar na conta</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", marginBottom: 8 }}>E-MAIL</label>
            <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" onKeyDown={e => e.key === "Enter" && submit()} style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)", color: "white" }} />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", marginBottom: 8 }}>SENHA</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && submit()} style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)", color: "white" }} />
          </div>

          {error && <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 14px", color: "#FCA5A5", fontSize: 13, marginBottom: 20, fontWeight: 500 }}>⚠️ {error}</div>}

          <button className="btn-primary" onClick={submit} disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 15 }}>
            {loading ? "Entrando..." : "Entrar →"}
          </button>

          {/* Quick access */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textAlign: "center", marginBottom: 12 }}>ACESSO RÁPIDO — DEMO</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { role: "admin",        label: "👑 Admin",    color: "#F59E0B" },
                { role: "secretary",    label: "📋 Secretária", color: "#00C2B2" },
                { role: "professional", label: "👩‍⚕️ Profissional", color: "#8B5CF6" },
              ].map(({ role, label, color }) => (
                <button key={role} onClick={() => quickLogin(role)} style={{ flex: 1, padding: "9px 4px", background: "rgba(255,255,255,0.06)", border: `1px solid ${color}44`, borderRadius: 10, color: color, fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────── */
function Sidebar({ user, activePage, setActivePage, onLogout, collapsed, setCollapsed }) {
  const NAV = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard",     roles: ["admin","secretary","professional"] },
    { id: "agenda",    icon: Calendar,         label: "Agenda",        roles: ["admin","secretary","professional"] },
    { id: "patients",  icon: Users,            label: "Pacientes",     roles: ["admin","secretary","professional"] },
    { id: "whatsapp",  icon: MessageSquare,    label: "WhatsApp",      roles: ["admin","secretary"] },
    { id: "financial", icon: DollarSign,       label: "Financeiro",    roles: ["admin"] },
    { id: "ai",        icon: Bot,              label: "IA Assistente", roles: ["admin","secretary","professional"] },
  ].filter(n => n.roles.includes(user.role));

  const W = collapsed ? 72 : 248;

  return (
    <div style={{ width: W, minHeight: "100vh", background: "var(--sidebar)", display: "flex", flexDirection: "column", flexShrink: 0, position: "relative", transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)", zIndex: 20 }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "22px 0" : "22px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)", justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ width: 36, height: 36, background: "var(--accent)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 18 }}>🏥</span>
        </div>
        {!collapsed && <span className="font-display" style={{ color: "white", fontSize: 20, fontWeight: 600, whiteSpace: "nowrap" }}>ClinicFlow</span>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 10px" }}>
        {NAV.map(({ id, icon: Icon, label }) => (
          <button key={id} className={`nav-item${activePage === id ? " active" : ""}`} onClick={() => setActivePage(id)} style={{ justifyContent: collapsed ? "center" : "flex-start", marginBottom: 3 }}>
            <Icon size={19} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* User card */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {collapsed ? (
          <button onClick={onLogout} style={{ width: "100%", display: "flex", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: "10px 0" }} title="Sair"><LogOut size={19} /></button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.05)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: ROLE_COLOR[user.role], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 800, color: "white" }}>{user.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "white", fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: ROLE_COLOR[user.role] }}>{ROLE_LABEL[user.role]}</div>
            </div>
            <button onClick={onLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4, transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}><LogOut size={16} /></button>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button onClick={() => setCollapsed(c => !c)} style={{ position: "absolute", top: 26, right: -12, width: 24, height: 24, background: "var(--accent)", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.25)", transition: "background 0.2s" }}>
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */
function DashboardPage({ user, appointments, patients, financial }) {
  const todayAppts = appointments.filter(a => a.date === todayStr);
  const confirmed  = todayAppts.filter(a => a.status === "confirmed").length;
  const totalPaid  = financial.filter(f => f.paid).reduce((s, f) => s + f.value, 0);
  const pending    = financial.filter(f => !f.paid).reduce((s, f) => s + f.value, 0);
  const nextAppt   = todayAppts.filter(a => a.status !== "cancelled").sort((a, b) => a.time.localeCompare(b.time))[0];

  const stats = [
    { label: "Consultas Hoje", val: todayAppts.length, sub: `${confirmed} confirmadas`, color: "var(--accent)", icon: "📅" },
    { label: "Total Pacientes", val: patients.length, sub: "+2 este mês", color: "var(--purple)", icon: "👥" },
    ...(user.role === "admin" ? [
      { label: "Faturamento", val: `R$ ${totalPaid.toLocaleString("pt-BR")}`, sub: `R$ ${pending.toLocaleString("pt-BR")} pendente`, color: "var(--success)", icon: "💰" },
    ] : []),
    { label: "Próximo Horário", val: nextAppt?.time || "—", sub: nextAppt?.patientName || "Sem consultas", color: "var(--warning)", icon: "⏰" },
  ];

  return (
    <div className="animate-in">
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 27, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
          Bom dia, {user.name.split(" ")[0]}! 👋
        </h1>
        <p style={{ color: "var(--muted)", marginTop: 5, fontSize: 15 }}>
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <span style={{ fontSize: 26 }}>{s.icon}</span>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: s.color, marginTop: 4 }} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: "-0.5px" }}>{s.val}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginTop: 3 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: user.role === "admin" ? "1fr 1fr" : "1fr", gap: 20 }}>
        {/* Today's list */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 18, color: "var(--text)" }}>Agenda de Hoje</h2>
          {todayAppts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--muted)" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
              <p style={{ fontSize: 14 }}>Nenhuma consulta agendada.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {todayAppts.map(a => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 14px", background: "#F9FAFB", borderRadius: 12, border: "1.5px solid var(--border)" }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "var(--accent)", minWidth: 50 }}>{a.time}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{a.patientName}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.type}</div>
                  </div>
                  <span className={`badge badge-${a.status === "confirmed" ? "confirmed" : a.status === "cancelled" ? "cancelled" : "pending"}`}>
                    {a.status === "confirmed" ? "✓ Confirmado" : a.status === "cancelled" ? "✗ Cancelado" : "● Pendente"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revenue chart — admin only */}
        {user.role === "admin" && (
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4, color: "var(--text)" }}>Faturamento 2026</h2>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Janeiro – Junho</p>
            <ResponsiveContainer width="100%" height={170}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00C2B2" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00C2B2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={v => [`R$ ${v.toLocaleString("pt-BR")}`, "Faturamento"]} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", fontSize: 13 }} />
                <Area type="monotone" dataKey="valor" stroke="#00C2B2" strokeWidth={2.5} fill="url(#grad1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AGENDA
───────────────────────────────────────────── */
function AgendaPage({ user, appointments, setAppointments, patients }) {
  const [selDate, setSelDate]   = useState(todayStr);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ patientId: "", time: "", type: "Consulta", value: 250, notes: "" });

  const cur = new Date(selDate + "T12:00:00");
  const year = cur.getFullYear(), month = cur.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay    = new Date(year, month, 1).getDay();

  const dayAppts = appointments.filter(a => a.date === selDate).sort((a, b) => a.time.localeCompare(b.time));

  const getAppts = (d) => {
    const s = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    return appointments.filter(a => a.date === s);
  };

  const save = () => {
    const pat = patients.find(p => p.id === parseInt(form.patientId));
    if (!pat || !form.time) return;
    setAppointments(prev => [...prev, { id: Date.now(), patientId: pat.id, patientName: pat.name, date: selDate, ...form, status: "pending", professional: "Dra. Fernanda Costa" }]);
    setShowModal(false);
    setForm({ patientId: "", time: "", type: "Consulta", value: 250, notes: "" });
  };

  const cancel  = (id) => setAppointments(p => p.map(a => a.id === id ? { ...a, status: "cancelled" } : a));
  const confirm = (id) => setAppointments(p => p.map(a => a.id === id ? { ...a, status: "confirmed" } : a));
  const prevM = () => setSelDate(fmtDate(new Date(year, month - 1, 1)));
  const nextM = () => setSelDate(fmtDate(new Date(year, month + 1, 1)));

  const canEdit = user.role === "admin" || user.role === "secretary";

  return (
    <div className="animate-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
        <h1 style={{ fontSize: 27, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>Agenda</h1>
        {canEdit && <button className="btn-primary" onClick={() => setShowModal(true)}><Plus size={16} />Nova Consulta</button>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
        {/* Mini calendar */}
        <div className="card" style={{ padding: 22, alignSelf: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <button onClick={prevM} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 6, borderRadius: 8 }}><ChevronLeft size={18} /></button>
            <span style={{ fontWeight: 800, fontSize: 14 }}>{MONTH_NAMES[month]} {year}</span>
            <button onClick={nextM} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 6, borderRadius: 8 }}><ChevronRight size={18} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 6 }}>
            {["D","S","T","Q","Q","S","S"].map((d,i) => <div key={i} style={{ textAlign: "center", fontSize: 10, fontWeight: 800, color: "var(--muted)", padding: "4px 0", letterSpacing: "0.5px" }}>{d}</div>)}
            {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
              const isSel   = ds === selDate;
              const isToday = ds === todayStr;
              const has = getAppts(day).filter(a => a.status !== "cancelled").length > 0;
              return (
                <div key={day} onClick={() => setSelDate(ds)} style={{ textAlign: "center", padding: "7px 2px", borderRadius: 9, cursor: "pointer", background: isSel ? "var(--accent)" : isToday ? "var(--accent-light)" : "transparent", color: isSel ? "white" : isToday ? "var(--accent)" : "var(--text)", fontWeight: isSel || isToday ? 800 : 400, fontSize: 13, transition: "all 0.15s", position: "relative" }}>
                  {day}
                  {has && !isSel && <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} />}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
            {[["confirmed","Confirmado","var(--success)"],["pending","Pendente","var(--warning)"],["cancelled","Cancelado","var(--danger)"]].map(([s, l, c]) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--muted)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />{l}
              </div>
            ))}
          </div>
        </div>

        {/* Day view */}
        <div className="card" style={{ padding: 26 }}>
          <h2 style={{ fontWeight: 800, fontSize: 17, marginBottom: 22, color: "var(--text)" }}>
            {new Date(selDate + "T12:00").toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
            <span style={{ marginLeft: 10, fontSize: 13, fontWeight: 500, color: "var(--muted)" }}>
              {dayAppts.filter(a => a.status !== "cancelled").length} consulta(s) ativa(s)
            </span>
          </h2>

          {dayAppts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>📅</div>
              <p style={{ fontSize: 15, fontWeight: 500 }}>Nenhuma consulta neste dia.</p>
              {canEdit && <button className="btn-primary" style={{ marginTop: 18 }} onClick={() => setShowModal(true)}><Plus size={15} />Agendar</button>}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {dayAppts.map(a => (
                <div key={a.id} style={{ display: "flex", gap: 18, padding: "16px 18px", borderRadius: 14, background: a.status === "cancelled" ? "#FEF2F2" : "#F9FAFB", border: `1.5px solid ${a.status === "cancelled" ? "#FEE2E2" : "var(--border)"}`, opacity: a.status === "cancelled" ? 0.75 : 1, transition: "all 0.15s" }}>
                  <div style={{ textAlign: "center", minWidth: 58 }}>
                    <div style={{ fontWeight: 900, fontSize: 20, color: "var(--accent)", lineHeight: 1 }}>{a.time}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{a.type}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{a.patientName}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{a.professional}</div>
                    {a.notes && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5, fontStyle: "italic", padding: "4px 10px", background: "rgba(0,0,0,0.04)", borderRadius: 6, display: "inline-block" }}>"{a.notes}"</div>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span className={`badge badge-${a.status === "confirmed" ? "confirmed" : a.status === "cancelled" ? "cancelled" : "pending"}`}>
                      {a.status === "confirmed" ? "✓ Confirmado" : a.status === "cancelled" ? "✗ Cancelado" : "● Pendente"}
                    </span>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--success)" }}>R$ {a.value}</div>
                    {a.status !== "cancelled" && canEdit && (
                      <div style={{ display: "flex", gap: 6 }}>
                        {a.status === "pending" && <button onClick={() => confirm(a.id)} style={{ fontSize: 11, padding: "4px 10px", background: "#D1FAE5", color: "#059669", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>Confirmar</button>}
                        <button onClick={() => cancel(a.id)} style={{ fontSize: 11, padding: "4px 10px", background: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}>Cancelar</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontWeight: 900, fontSize: 21, marginBottom: 26, color: "var(--text)" }}>Nova Consulta</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>PACIENTE *</label>
                <select className="input" value={form.patientId} onChange={e => setForm(f => ({ ...f, patientId: e.target.value }))}>
                  <option value="">Selecione...</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>HORÁRIO *</label>
                  <input className="input" type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>TIPO</label>
                  <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option>Consulta</option><option>Retorno</option><option>Avaliação</option><option>Procedimento</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>VALOR (R$)</label>
                <input className="input" type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: parseInt(e.target.value) || 0 }))} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>OBSERVAÇÕES</label>
                <input className="input" placeholder="Opcional..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "12px", background: "#F3F4F6", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14, color: "var(--text)" }}>Cancelar</button>
              <button className="btn-primary" onClick={save} style={{ flex: 2, justifyContent: "center", fontSize: 14 }} disabled={!form.patientId || !form.time}>Agendar Consulta</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PATIENTS
───────────────────────────────────────────── */
function PatientsPage({ user, patients, setPatients, appointments }) {
  const [search,     setSearch]     = useState("");
  const [selected,   setSelected]   = useState(null);
  const [showModal,  setShowModal]  = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", birthdate: "", notes: "" });

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  const save = () => {
    if (!form.name.trim()) return;
    setPatients(prev => [...prev, { id: Date.now(), ...form, history: [] }]);
    setShowModal(false);
    setForm({ name: "", phone: "", email: "", birthdate: "", notes: "" });
  };

  const patAppts = selected ? appointments.filter(a => a.patientId === selected.id) : [];
  const canEdit  = user.role === "admin" || user.role === "secretary";

  return (
    <div className="animate-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
        <h1 style={{ fontSize: 27, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>Pacientes</h1>
        {canEdit && <button className="btn-primary" onClick={() => setShowModal(true)}><Plus size={16} />Novo Paciente</button>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "320px 1fr" : "1fr", gap: 20 }}>
        {/* List */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <Search size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
            <input className="input" placeholder="Buscar por nome ou telefone..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(p => (
              <div key={p.id} onClick={() => setSelected(p === selected ? null : p)} style={{ padding: "12px 14px", borderRadius: 12, cursor: "pointer", background: selected?.id === p.id ? "var(--accent-light)" : "#F9FAFB", border: `1.5px solid ${selected?.id === p.id ? "var(--accent)" : "var(--border)"}`, transition: "all 0.15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "white", flexShrink: 0 }}>
                      {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.phone}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)", background: "#F3F4F6", padding: "2px 7px", borderRadius: 5, fontWeight: 600 }}>{p.history.length + appointments.filter(a => a.patientId === p.id).length} reg.</span>
                    <ChevronRight size={14} color="var(--muted)" />
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p style={{ textAlign: "center", color: "var(--muted)", padding: "24px 0", fontSize: 14 }}>Nenhum paciente encontrado.</p>}
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div className="card animate-in" style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 26 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "white" }}>
                  {selected.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h2 style={{ fontSize: 21, fontWeight: 900, letterSpacing: "-0.3px" }}>{selected.name}</h2>
                  {selected.birthdate && <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>Nascido(a) em {new Date(selected.birthdate + "T12:00").toLocaleDateString("pt-BR")}</p>}
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 6, borderRadius: 8, display: "flex" }}><X size={18} /></button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: 6 }}>TELEFONE</div>
                <div style={{ fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 7 }}><Phone size={13} color="var(--accent)" />{selected.phone || "—"}</div>
              </div>
              <div style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: 6 }}>E-MAIL</div>
                <div style={{ fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}><Mail size={13} color="var(--accent)" />{selected.email || "—"}</div>
              </div>
            </div>

            {selected.notes && (
              <div style={{ padding: "14px 16px", background: "#FFFBEB", border: "1.5px solid #FDE68A", borderRadius: 12, marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 5, letterSpacing: "0.3px" }}>⚠️ ALERTAS / OBSERVAÇÕES</div>
                <div style={{ color: "#78350F", fontSize: 13, lineHeight: 1.6 }}>{selected.notes}</div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontWeight: 800, fontSize: 16 }}>Histórico Clínico</h3>
              <span style={{ fontSize: 12, color: "var(--muted)", background: "#F3F4F6", padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{selected.history.length + patAppts.length} registros</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {selected.history.map((h, i) => (
                <div key={i} style={{ padding: "14px 16px", borderRadius: 12, borderLeft: "3px solid var(--accent)", background: "#F9FAFB" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{h.type}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{new Date(h.date + "T12:00").toLocaleDateString("pt-BR")}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{h.notes}</p>
                  <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 7, fontWeight: 700 }}>{h.professional} · R$ {h.value}</div>
                </div>
              ))}
              {patAppts.map(a => (
                <div key={a.id} style={{ padding: "14px 16px", borderRadius: 12, borderLeft: "3px solid var(--purple)", background: "#F9FAFB" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{a.type} — {a.time}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{new Date(a.date + "T12:00").toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#374151" }}>{a.notes || "Sem observações adicionais."}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                    <span className={`badge badge-${a.status === "confirmed" ? "confirmed" : a.status === "cancelled" ? "cancelled" : "pending"}`}>
                      {a.status === "confirmed" ? "✓ Confirmado" : a.status === "cancelled" ? "✗ Cancelado" : "● Pendente"}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--success)", fontWeight: 700 }}>R$ {a.value}</span>
                  </div>
                </div>
              ))}
              {selected.history.length === 0 && patAppts.length === 0 && (
                <p style={{ color: "var(--muted)", fontSize: 14, padding: "12px 0" }}>Nenhum histórico registrado ainda.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontWeight: 900, fontSize: 21, marginBottom: 26 }}>Novo Paciente</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div><label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>NOME COMPLETO *</label><input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome do paciente" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>TELEFONE</label><input className="input" placeholder="(11) 99999-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                <div><label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>NASCIMENTO</label><input className="input" type="date" value={form.birthdate} onChange={e => setForm(f => ({ ...f, birthdate: e.target.value }))} /></div>
              </div>
              <div><label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>E-MAIL</label><input className="input" placeholder="email@exemplo.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>OBSERVAÇÕES / ALERGIAS</label><textarea className="input" rows={3} placeholder="Alergias, condições especiais..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: "none" }} /></div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "12px", background: "#F3F4F6", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              <button className="btn-primary" onClick={save} style={{ flex: 2, justifyContent: "center", fontSize: 14 }} disabled={!form.name.trim()}>Cadastrar Paciente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   WHATSAPP
───────────────────────────────────────────── */
function WhatsAppPage() {
  const [chats,      setChats]      = useState(INIT_CHATS);
  const [activeChat, setActiveChat] = useState(null);
  const [input,      setInput]      = useState("");
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [activeChat?.messages?.length]);

  const time = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const send = (text) => {
    if ((!text && !input.trim()) || !activeChat) return;
    const msg = { from: "bot", text: text || input.trim(), time: time() };
    const updated = chats.map(c => c.id === activeChat.id ? { ...c, messages: [...c.messages, msg], lastMsg: msg.text, unread: 0 } : c);
    setChats(updated);
    setActiveChat(updated.find(c => c.id === activeChat.id));
    setInput("");
  };

  const broadcastReminders = () => {
    chats.forEach((c, i) => {
      setTimeout(() => {
        const msg = { from: "bot", text: `📅 Olá ${c.patient.split(" ")[0]}! Lembramos da sua consulta. Qualquer dúvida, estamos à disposição. 😊`, time: time() };
        setChats(prev => prev.map(ch => ch.id === c.id ? { ...ch, messages: [...ch.messages, msg], lastMsg: msg.text } : ch));
      }, i * 600);
    });
  };

  const TEMPLATES = [
    "✅ Consulta confirmada! Até lá.",
    "⏰ Lembrete: sua consulta é em 1 hora.",
    "📋 Por favor, traga seus exames anteriores.",
    "💊 Não esqueça de tomar sua medicação hoje.",
    "📍 Clínica: Rua Exemplo, 123 — Sala 12.",
  ];

  return (
    <div className="animate-in">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 27, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>WhatsApp</h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 5 }}>Comunicação direta com pacientes</p>
      </div>

      <div className="card" style={{ height: 580, display: "flex", overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 290, borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", background: "#FAFAFA" }}>
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: "var(--text)" }}>Conversas</div>
            <button onClick={broadcastReminders} style={{ width: "100%", padding: "9px 14px", background: "#DCF8C6", border: "1px solid #A7F3D0", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 12, color: "#065F46", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
              📤 Enviar lembrete para todos
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {chats.map(c => (
              <div key={c.id} onClick={() => setActiveChat({ ...c })} style={{ padding: "14px 16px", cursor: "pointer", background: activeChat?.id === c.id ? "#E6FAF8" : "transparent", borderBottom: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center", transition: "background 0.15s" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 800, color: "white" }}>
                  {c.patient.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontWeight: 800, fontSize: 13 }}>{c.patient}</span>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.lastMsg}</div>
                </div>
                {c.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontSize: 10, fontWeight: 800 }}>{c.unread}</span></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        {activeChat ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ padding: "14px 20px", background: "#075E54", display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white" }}>
                {activeChat.patient.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>{activeChat.patient}</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>{activeChat.phone}</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={messagesRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8, background: "#E5DDD5", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5bdb5' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
              {activeChat.messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "bot" ? "flex-end" : "flex-start" }}>
                  <div className={m.from === "bot" ? "wa-out" : "wa-in"}>
                    <div style={{ fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
                    <div style={{ fontSize: 11, color: "#999", textAlign: "right", marginTop: 4 }}>{m.time} {m.from === "bot" && "✓✓"}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Templates */}
            <div style={{ padding: "8px 16px", background: "#F7F7F7", borderTop: "1px solid var(--border)", display: "flex", gap: 6, overflowX: "auto" }}>
              {TEMPLATES.map((t, i) => <button key={i} onClick={() => send(t)} style={{ fontSize: 11, padding: "5px 11px", background: "#E8F5E9", border: "1px solid #A5D6A7", borderRadius: 20, cursor: "pointer", whiteSpace: "nowrap", color: "#1B5E20", fontWeight: 600 }}>{t}</button>)}
            </div>

            {/* Input */}
            <div style={{ padding: "12px 16px", background: "white", display: "flex", gap: 10, alignItems: "center" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Mensagem..." style={{ flex: 1, padding: "10px 16px", border: "1.5px solid var(--border)", borderRadius: 24, outline: "none", fontSize: 14, fontFamily: "inherit" }} />
              <button onClick={() => send()} style={{ width: 46, height: 46, background: "#25D366", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Send size={18} color="white" />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, background: "#F0F0F0", color: "var(--muted)" }}>
            <MessageSquare size={52} color="#ccc" />
            <p style={{ fontWeight: 700, fontSize: 16 }}>Selecione uma conversa</p>
            <p style={{ fontSize: 13 }}>Envie mensagens e lembretes aos pacientes</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FINANCIAL (admin only)
───────────────────────────────────────────── */
function FinancialPage({ financial, setFinancial }) {
  const paid    = financial.filter(f => f.paid);
  const pending = financial.filter(f => !f.paid);
  const totalPaid    = paid.reduce((s, f) => s + f.value, 0);
  const totalPending = pending.reduce((s, f) => s + f.value, 0);

  return (
    <div className="animate-in">
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 27, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>Financeiro</h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 5 }}>Controle de pagamentos e faturamento</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Recebido",    val: totalPaid,                icon: "✅", color: "var(--success)" },
          { label: "Pendente",    val: totalPending,             icon: "⏳", color: "var(--warning)" },
          { label: "Total Geral", val: totalPaid + totalPending, icon: "💰", color: "var(--purple)"  },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: 26 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: s.color, letterSpacing: "-1px" }}>R$ {s.val.toLocaleString("pt-BR")}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
        {/* Chart */}
        <div className="card" style={{ padding: 26 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Faturamento Mensal</h2>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 22 }}>Jan – Jun 2026</p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={REVENUE_DATA} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={v => [`R$ ${v.toLocaleString("pt-BR")}`, "Faturamento"]} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", fontSize: 13 }} />
              <Bar dataKey="valor" fill="#00C2B2" radius={[7,7,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions */}
        <div className="card" style={{ padding: 26 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 18 }}>Lançamentos</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {financial.map(f => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: f.paid ? "var(--success)" : "var(--warning)", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.patient}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{f.type} · {new Date(f.date + "T12:00").toLocaleDateString("pt-BR")}</div>
                </div>
                <span style={{ fontWeight: 800, fontSize: 14, color: f.paid ? "var(--success)" : "var(--warning)", flexShrink: 0 }}>R$ {f.value}</span>
                {!f.paid && (
                  <button onClick={() => setFinancial(prev => prev.map(fi => fi.id === f.id ? { ...fi, paid: true } : fi))} style={{ fontSize: 11, padding: "4px 10px", background: "#D1FAE5", color: "#059669", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700, flexShrink: 0 }}>Receber</button>
                )}
                {f.paid && <span style={{ fontSize: 11, padding: "4px 10px", background: "#D1FAE5", color: "#059669", borderRadius: 6, fontWeight: 700, flexShrink: 0 }}>✓ Pago</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AI ASSISTANT
───────────────────────────────────────────── */
function AIPage({ patients }) {
  const [mode,    setMode]    = useState("summary");
  const [patId,   setPatId]   = useState("");
  const [textIn,  setTextIn]  = useState("");
  const [result,  setResult]  = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const MODES = [
    { id: "summary",  label: "📋 Resumo do Paciente",    desc: "Resumo inteligente do histórico clínico" },
    { id: "response", label: "💬 Sugestão de Resposta",  desc: "Resposta empática para mensagem recebida" },
    { id: "message",  label: "📱 Mensagem WhatsApp",     desc: "Texto de confirmação ou lembrete" },
    { id: "report",   label: "📝 Relatório de Consulta", desc: "Rascunho de resumo pós-atendimento" },
  ];

  const run = async () => {
    setLoading(true); setResult(""); setError("");
    const pat = patients.find(p => p.id === parseInt(patId));
    try {
      let prompt = "";
      const sys = "Você é um assistente médico-clínico especializado. Responda em português brasileiro. Seja profissional, empático e conciso. Formate bem o texto quando necessário.";

      if (mode === "summary" && pat) {
        const hist = pat.history.map(h => `- ${h.date}: ${h.type} — ${h.notes} (Prof: ${h.professional})`).join("\n");
        prompt = `Crie um resumo clínico conciso e estruturado do paciente:\n\nNome: ${pat.name}\nNascimento: ${pat.birthdate || "não informado"}\nObservações: ${pat.notes || "nenhuma"}\n\nHistórico:\n${hist || "Sem histórico registrado."}\n\nFormate em seções claras: Perfil, Histórico, Alertas e Próximos Passos.`;
      } else if (mode === "response") {
        prompt = `Sugira uma resposta profissional e empática para esta mensagem de paciente:\n\n"${textIn}"\n\nA resposta deve ser da clínica, em tom cordial, resolutivo e humanizado.`;
      } else if (mode === "message" && pat) {
        prompt = `Crie uma mensagem de WhatsApp de confirmação de consulta para ${pat.name}. Tom: amigável e profissional. Use emojis com moderação. Máximo 4 linhas.`;
      } else if (mode === "report" && pat) {
        prompt = `Crie um rascunho de relatório de consulta para o paciente ${pat.name} (histórico: ${pat.notes || "sem observações relevantes"}). Inclua campos: Queixa Principal, Exame Clínico, Diagnóstico Provável e Conduta. Formato profissional.`;
      }

      const res = await callClaude(prompt, sys);
      setResult(res);
    } catch (e) {
      setError("Erro ao conectar com a IA. Tente novamente.");
    }
    setLoading(false);
  };

  const needsPat   = ["summary", "message", "report"].includes(mode);
  const needsText  = mode === "response";
  const canRun     = loading ? false : needsPat ? !!patId : needsText ? !!textIn.trim() : true;

  return (
    <div className="animate-in">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 27, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>IA Assistente</h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 5 }}>Powered by Claude · Análise e geração de conteúdo clínico</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
        {/* Mode selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MODES.map(m => (
            <div key={m.id} onClick={() => { setMode(m.id); setResult(""); setError(""); }} style={{ padding: "15px 16px", borderRadius: 14, cursor: "pointer", background: mode === m.id ? "var(--accent-light)" : "white", border: `1.5px solid ${mode === m.id ? "var(--accent)" : "var(--border)"}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "all 0.18s" }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: mode === m.id ? "var(--accent-dark)" : "var(--text)" }}>{m.label}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3, lineHeight: 1.4 }}>{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Panel */}
        <div className="card" style={{ padding: 30 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26, paddingBottom: 22, borderBottom: "1px solid var(--border)" }}>
            <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #7C3AED, #4F46E5)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={22} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-0.3px" }}>Claude AI</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Assistente clínico inteligente — claude-sonnet-4</div>
            </div>
          </div>

          {/* Inputs */}
          {needsPat && (
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>PACIENTE</label>
              <select className="input" value={patId} onChange={e => setPatId(e.target.value)}>
                <option value="">Selecione o paciente...</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          )}
          {needsText && (
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--muted)", letterSpacing: "0.4px" }}>MENSAGEM DO PACIENTE</label>
              <textarea className="input" rows={4} placeholder="Cole aqui a mensagem recebida..." value={textIn} onChange={e => setTextIn(e.target.value)} style={{ resize: "none" }} />
            </div>
          )}

          <button className="btn-primary" onClick={run} disabled={!canRun} style={{ marginBottom: 22 }}>
            <Sparkles size={15} />
            {loading ? "Gerando com IA..." : "Gerar com IA"}
          </button>

          {/* Loading skeleton */}
          {loading && (
            <div style={{ padding: 20, background: "#F9FAFB", borderRadius: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {[80, 60, 90, 50, 75].map((w, i) => <div key={i} className="shimmer" style={{ height: 13, width: `${w}%` }} />)}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ padding: 16, background: "#FEF2F2", border: "1.5px solid #FEE2E2", borderRadius: 12, color: "#991B1B", fontSize: 14 }}>⚠️ {error}</div>
          )}

          {/* Result */}
          {result && !loading && (
            <div style={{ padding: 22, background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)", border: "1.5px solid #DDD6FE", borderRadius: 14 }} className="animate-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontWeight: 800, fontSize: 13, color: "#5B21B6", display: "flex", alignItems: "center", gap: 6 }}><Sparkles size={14} /> Gerado pela IA</span>
                <button onClick={() => navigator.clipboard?.writeText(result)} style={{ fontSize: 11, padding: "5px 12px", background: "white", border: "1px solid #DDD6FE", borderRadius: 8, cursor: "pointer", color: "#5B21B6", fontWeight: 700 }}>Copiar</button>
              </div>
              <p style={{ fontSize: 14, color: "#3B0764", lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0 }}>{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const [user,         setUser]         = useState(null);
  const [activePage,   setActivePage]   = useState("dashboard");
  const [collapsed,    setCollapsed]    = useState(false);
  const [appointments, setAppointments] = useState(INIT_APPOINTMENTS);
  const [patients,     setPatients]     = useState(INIT_PATIENTS);
  const [financial,    setFinancial]    = useState(INIT_FINANCIAL);

  const PAGES = {
    dashboard: <DashboardPage user={user}    appointments={appointments} patients={patients} financial={financial} />,
    agenda:    <AgendaPage    user={user}    appointments={appointments} setAppointments={setAppointments} patients={patients} />,
    patients:  <PatientsPage  user={user}    patients={patients} setPatients={setPatients} appointments={appointments} />,
    whatsapp:  <WhatsAppPage />,
    financial: <FinancialPage financial={financial} setFinancial={setFinancial} />,
    ai:        <AIPage        patients={patients} appointments={appointments} />,
  };

  return (
    <>
      <GlobalStyles />
      {!user ? (
        <LoginPage onLogin={u => { setUser(u); setActivePage("dashboard"); }} />
      ) : (
        <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
          <Sidebar user={user} activePage={activePage} setActivePage={setActivePage} onLogout={() => { setUser(null); setActivePage("dashboard"); }} collapsed={collapsed} setCollapsed={setCollapsed} />
          <main style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
            {PAGES[activePage] ?? PAGES.dashboard}
          </main>
        </div>
      )}
    </>
  );
}