import { useState, useRef, useEffect } from "react";

// ── Google Fonts ──────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy: #0f2044;
      --navy-mid: #1a3260;
      --blue: #1e56c8;
      --blue-light: #3b73e8;
      --blue-pale: #e8effe;
      --blue-pale2: #f0f4ff;
      --slate: #4a5568;
      --slate-light: #718096;
      --border: #dde3f0;
      --bg: #f5f7fc;
      --white: #ffffff;
      --green: #0fa76f;
      --green-pale: #e6f7f2;
      --amber: #f59e0b;
      --amber-pale: #fef3c7;
      --red: #ef4444;
      --red-pale: #fee2e2;
      --font-head: 'Sora', sans-serif;
      --font-body: 'IBM Plex Sans', sans-serif;
    }

    body { font-family: var(--font-body); background: var(--bg); color: var(--navy); }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: .5; }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .fade-up { animation: fadeUp .45s ease both; }
    .fade-up-d1 { animation: fadeUp .45s .1s ease both; }
    .fade-up-d2 { animation: fadeUp .45s .2s ease both; }
    .fade-up-d3 { animation: fadeUp .45s .3s ease both; }
    .slide-in { animation: slideIn .3s ease both; }
  `}</style>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const US_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

const NET_NEW_DATA = [
  { id: 1, company: "Meridian Health Systems", industry: "Hospitals & Physician Clinics", location: "Texas", installedProducts: "Microsoft Office", intentScore: 94, fitScore: 91, intentTopic: "Privileged Access Management (PAM)", recommendedProduct: "Watson", whyThis: "High PAM research activity detected across 3 decision-makers. No current IBM relationship — strong entry opportunity." },
  { id: 2, company: "Vertex Capital Group", industry: "Finance", location: "New York", installedProducts: "Jira Software", intentScore: 88, fitScore: 85, intentTopic: "Multifactor Authentication", recommendedProduct: "API Connect", whyThis: "Actively evaluating MFA solutions post-breach incident. Competitor contract expires Q2." },
  { id: 3, company: "Cascade Manufacturing Co.", industry: "Manufacturing", location: "Ohio", installedProducts: "Oracle Java, Microsoft Office", intentScore: 82, fitScore: 79, intentTopic: "Automated Workflow", recommendedProduct: "Apptio", whyThis: "Undergoing digital transformation initiative. Budget confirmed for automation spend in H1." },
  { id: 4, company: "BlueSky Media Networks", industry: "Media & Internet", location: "California", installedProducts: "JavaScript", intentScore: 78, fitScore: 80, intentTopic: "Open Source", recommendedProduct: "Watson", whyThis: "Exploring AI-powered content workflows. Engineering team researching open-source LLMs heavily." },
  { id: 5, company: "GreatPlains Agriculture", industry: "Agriculture", location: "Iowa", installedProducts: "Microsoft Office", intentScore: 75, fitScore: 72, intentTopic: "Advanced Analytics", recommendedProduct: "Apptio", whyThis: "Federal ag-tech grant recipient. Looking to modernize cost management and analytics stack." },
  { id: 6, company: "Torchlight Financial", industry: "Finance", location: "Illinois", installedProducts: "Microsoft Power BI", intentScore: 72, fitScore: 76, intentTopic: "Incident Response", recommendedProduct: "API Connect", whyThis: "Recent regulatory pressure driving IR investment. CTO attended IBM security webinar last month." },
  { id: 7, company: "Summit Health Partners", industry: "Hospitals & Physician Clinics", location: "Florida", installedProducts: "Oracle Java", intentScore: 69, fitScore: 74, intentTopic: "Multifactor Authentication", recommendedProduct: "Watson", whyThis: "HIPAA compliance gap identified. Board approved security budget increase for FY25." },
  { id: 8, company: "NovaTech Solutions", industry: "Manufacturing", location: "Michigan", installedProducts: "Jira Software, Oracle Java", intentScore: 65, fitScore: 68, intentTopic: "Automated Workflow", recommendedProduct: "Apptio", whyThis: "Legacy ERP replacement project underway. Strong fit for Apptio integration layer." },
  { id: 9, company: "Pacific Rim Media", industry: "Media & Internet", location: "California", installedProducts: "JavaScript, Jira Software", intentScore: 61, fitScore: 63, intentTopic: "Open Source", recommendedProduct: "API Connect", whyThis: "API-first architecture transition in progress. Engineering headcount growing 40% YoY." },
  { id: 10, company: "Heartland Grain Corp", industry: "Agriculture", location: "Kansas", installedProducts: "Microsoft Office", intentScore: 58, fitScore: 60, intentTopic: "Advanced Analytics", recommendedProduct: "Watson", whyThis: "Precision farming pilot underway. Evaluating analytics vendors for crop yield optimization." },
];

const EXPAND_DATA = [
  { id: 1, company: "Axiom Financial Services", industry: "Finance", location: "New York", installedProducts: "Microsoft Office, Jira Software", intentScore: 91, fitScore: 88, renewalDate: "Mar 15, 2025", lastActivity: "2 days ago", recommendedUpsell: "Watson", whyThis: "Heavy Jira usage signals DevOps maturity. Watson AIOps would reduce MTTR by est. 40%. Renewal approaching." },
  { id: 2, company: "TechBridge Manufacturing", industry: "Manufacturing", location: "Texas", installedProducts: "Oracle Java, Microsoft Power BI", intentScore: 85, fitScore: 82, renewalDate: "Apr 30, 2025", lastActivity: "1 week ago", recommendedUpsell: "API Connect", whyThis: "Power BI footprint indicates analytics investment. API Connect enables real-time data mesh they're evaluating." },
  { id: 3, company: "Northgate Hospital System", industry: "Hospitals & Physician Clinics", location: "Illinois", installedProducts: "Microsoft Office", intentScore: 79, fitScore: 77, renewalDate: "Jun 1, 2025", lastActivity: "3 days ago", recommendedUpsell: "Apptio", whyThis: "Single-product customer with high expansion potential. Apptio cost optimization aligns with budget pressure they've expressed." },
  { id: 4, company: "Crestwood Media Group", industry: "Media & Internet", location: "California", installedProducts: "JavaScript, Jira Software", intentScore: 74, fitScore: 71, renewalDate: "May 20, 2025", lastActivity: "5 days ago", recommendedUpsell: "Watson", whyThis: "Engineering-led account. Watson code assistant would accelerate their streaming platform dev roadmap." },
  { id: 5, company: "Prairie Harvest Farms", industry: "Agriculture", location: "Iowa", installedProducts: "Microsoft Office, Oracle Java", intentScore: 68, fitScore: 65, renewalDate: "Jul 15, 2025", lastActivity: "2 weeks ago", recommendedUpsell: "Apptio", whyThis: "Java infrastructure signals legacy modernization journey. Apptio IT financial management closes visibility gap." },
  { id: 6, company: "Emerald City Finance", industry: "Finance", location: "Washington", installedProducts: "Microsoft Power BI, Jira Software", intentScore: 65, fitScore: 70, renewalDate: "Aug 1, 2025", lastActivity: "1 week ago", recommendedUpsell: "API Connect", whyThis: "BI + DevOps combo suggests they're building internal data products. API Connect is natural next step." },
  { id: 7, company: "Ironworks Industrial", industry: "Manufacturing", location: "Pennsylvania", installedProducts: "Oracle Java, Microsoft Office", intentScore: 61, fitScore: 63, renewalDate: "Sep 10, 2025", lastActivity: "10 days ago", recommendedUpsell: "Watson", whyThis: "Manufacturing ops team evaluating AI for predictive maintenance. Watson ML fits stated use case." },
  { id: 8, company: "Coastal Health Network", industry: "Hospitals & Physician Clinics", location: "Florida", installedProducts: "JavaScript, Microsoft Power BI", intentScore: 57, fitScore: 60, renewalDate: "Oct 5, 2025", lastActivity: "3 weeks ago", recommendedUpsell: "Apptio", whyThis: "Power BI usage at dept level — Apptio enables enterprise-wide cost transparency for CFO initiatives." },
];

const NET_NEW_INSIGHTS = [
  { icon: "🎯", value: "142", label: "High-intent prospects identified", color: "var(--blue)", bg: "var(--blue-pale2)" },
  { icon: "🏦", value: "Finance 38%", label: "Top industry by intent", color: "var(--green)", bg: "var(--green-pale)" },
  { icon: "📍", value: "Texas", label: "Fastest growing region", color: "var(--amber)", bg: "var(--amber-pale)" },
  { icon: "🔐", value: "PAM +62%", label: "Fastest rising intent topic", color: "#7c3aed", bg: "#f3e8ff" },
];

const EXPAND_INSIGHTS = [
  { icon: "⏰", value: "23", label: "Accounts renewing in 60 days", color: "var(--red)", bg: "var(--red-pale)" },
  { icon: "📦", value: "42", label: "Office users without Power BI", color: "var(--blue)", bg: "var(--blue-pale2)" },
  { icon: "📈", value: "3.2x", label: "Higher Watson adoption for Jira users", color: "var(--green)", bg: "var(--green-pale)" },
  { icon: "💡", value: "API Connect", label: "Top expansion play this quarter", color: "var(--amber)", bg: "var(--amber-pale)" },
];

const NET_NEW_BOT = [
  { from: "bot", text: "👋 Hi Sarah! I've analyzed the current market and found 142 high-intent prospects matching your criteria. Finance and Manufacturing sectors are showing the strongest buying signals this week." },
  { from: "user", text: "Which ones should I prioritize first?" },
  { from: "bot", text: "Based on intent score and fit score combined, I recommend starting with Meridian Health Systems (score 94) and Vertex Capital Group (88). Both have decision-makers actively researching your top products." },
  { from: "user", text: "Any insight on Meridian Health?" },
  { from: "bot", text: "Meridian has 3 senior stakeholders researching PAM solutions in the last 14 days. They have no current IBM relationship — this is a clean entry. I'd suggest leading with a security-focused Watson pitch. Want me to draft talking points?" },
];

const EXPAND_BOT = [
  { from: "bot", text: "👋 Hi Sarah! 23 of your accounts are up for renewal within 60 days. Axiom Financial is the highest priority — renewal is March 15 and they're showing strong Watson upsell signals." },
  { from: "user", text: "Tell me more about the Axiom opportunity." },
  { from: "bot", text: "Axiom has heavy Jira usage (340+ seats) which signals DevOps maturity. Watson AIOps would reduce their MTTR by an estimated 40%. Their IT Director attended our AI webinar last week — strong timing." },
  { from: "user", text: "What's the best play for TechBridge?" },
  { from: "bot", text: "TechBridge is running Power BI across 5 departments, which tells us they're investing in data products. API Connect enables the real-time data mesh their CTO mentioned in a recent LinkedIn post. Contract renewal April 30 — ideal upsell window." },
];

// ── Reusable Components ───────────────────────────────────────────────────────
const TDLogo = ({ size = "md" }) => {
  const s = size === "sm" ? { wrap: "gap-1.5", box: "w-7 h-7 text-xs", text: "text-base" }
    : { wrap: "gap-2", box: "w-9 h-9 text-sm", text: "text-xl" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size === "sm" ? 6 : 8 }}>
      <div style={{ width: size === "sm" ? 28 : 36, height: size === "sm" ? 28 : 36, background: "var(--navy)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 800, color: "white", fontSize: size === "sm" ? 11 : 14, letterSpacing: "-0.5px" }}>TD</div>
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: size === "sm" ? 15 : 20, color: "var(--navy)", letterSpacing: "-0.5px" }}>
        Synnex <span style={{ fontWeight: 400, color: "var(--blue)", fontSize: size === "sm" ? 12 : 15 }}>Intelligence</span>
      </div>
    </div>
  );
};

const BackButton = ({ onClick }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: "1.5px solid var(--border)", borderRadius: 8, background: "white", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--slate)", fontWeight: 500, transition: "all .15s" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--slate)"; }}>
    ← Back
  </button>
);

const CheckItem = ({ label, checked, onChange }) => (
  <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer", fontSize: 13, color: "var(--slate)", fontFamily: "var(--font-body)" }}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{ accentColor: "var(--blue)", width: 14, height: 14 }} />
    {label}
  </label>
);

const CollapseSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12, marginBottom: 12 }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "4px 0 8px", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 12, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {title}
        <span style={{ fontSize: 16, color: "var(--slate-light)", transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
};

// ── Screen 1: Sign In ─────────────────────────────────────────────────────────
const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    if (!email || !pass) { setErr("Please enter your email and password."); return; }
    onLogin(email.split("@")[0] || "Sarah");
  };

  return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", flexDirection: "column" }}>
      <style>{`
        .signin-input { width:100%; padding:11px 14px; border:1.5px solid var(--border); borderRadius:9px; fontFamily:var(--font-body); fontSize:14; color:var(--navy); outline:none; transition:border-color .2s; background:white; }
        .signin-input:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(30,86,200,.1); }
        .signin-btn { width:100%; padding:12px; background:var(--navy); color:white; border:none; borderRadius:9px; fontFamily:var(--font-head); fontWeight:600; fontSize:15; cursor:pointer; transition:background .2s; }
        .signin-btn:hover { background:var(--navy-mid); }
      `}</style>

      {/* Top nav */}
      <div style={{ padding: "20px 40px", borderBottom: "1px solid var(--border)" }}>
        <TDLogo />
      </div>

      {/* Background pattern */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: 300 + i * 80, height: 300 + i * 80, border: "1px solid rgba(30,86,200,0.06)", borderRadius: "50%", top: "50%", left: "50%", transform: `translate(-50%, -50%)` }} />
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <div className="fade-up" style={{ width: "100%", maxWidth: 420, background: "white", borderRadius: 20, border: "1.5px solid var(--border)", padding: "44px 40px", boxShadow: "0 20px 60px rgba(15,32,68,0.1)" }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 26, color: "var(--navy)", marginBottom: 6 }}>Welcome back</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--slate-light)" }}>Sign in to your TD Synnex account</div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "var(--slate)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email ID</label>
            <input className="signin-input" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "var(--slate)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>
            <input className="signin-input" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
          </div>

          <div style={{ textAlign: "right", marginBottom: 24 }}>
            <a href="#" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--blue)", textDecoration: "none" }}>Forgot password?</a>
          </div>

          {err && <div style={{ marginBottom: 16, padding: "10px 14px", background: "var(--red-pale)", borderRadius: 8, fontSize: 13, color: "var(--red)", fontFamily: "var(--font-body)" }}>{err}</div>}

          <button className="signin-btn" onClick={handle}>Sign In →</button>

          <div style={{ marginTop: 28, padding: "16px", background: "var(--blue-pale2)", borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "var(--slate-light)", fontFamily: "var(--font-body)" }}>Enterprise SSO available</div>
            <a href="#" style={{ fontSize: 13, color: "var(--blue)", fontFamily: "var(--font-body)", fontWeight: 500 }}>Sign in with your organization →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Screen 2: Get Started ─────────────────────────────────────────────────────
const GetStarted = ({ user, onSelect, onBack }) => {
  const [hovered, setHovered] = useState(null);

  const cards = [
    {
      key: "netnew",
      icon: "🔭",
      title: "Find Net New Accounts",
      subtitle: "Prospect Discovery",
      desc: "Check intent insights to prioritize buyers ready to engage.",
      color: "var(--blue)",
      bg: "var(--blue-pale2)",
      stats: ["142 high-intent prospects today", "Finance & Manufacturing trending", "PAM intent up 62% this week"],
    },
    {
      key: "expand",
      icon: "📈",
      title: "Expand Existing Customers",
      subtitle: "Account Expansion",
      desc: "Reveal untapped potential across your installed base and act on the strongest growth signals.",
      color: "var(--green)",
      bg: "var(--green-pale)",
      stats: ["23 accounts renewing in 60 days", "42 upsell opportunities identified", "API Connect top play this quarter"],
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ padding: "16px 40px", background: "white", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <TDLogo />
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--slate)" }}>Welcome, <strong>{user}</strong></div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ marginBottom: 8 }}><BackButton onClick={onBack} /></div>

        <div className="fade-up" style={{ textAlign: "center", marginBottom: 48, marginTop: 24 }}>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 32, color: "var(--navy)", marginBottom: 10 }}>What would you like to do today?</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--slate-light)", maxWidth: 480 }}>Select your objective. We will bring the right insights to help you move faster.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, maxWidth: 820, width: "100%" }}>
          {cards.map((c, i) => (
            <div key={c.key} className={i === 0 ? "fade-up-d1" : "fade-up-d2"}
              onClick={() => onSelect(c.key)}
              onMouseEnter={() => setHovered(c.key)}
              onMouseLeave={() => setHovered(null)}
              style={{ background: "white", borderRadius: 18, border: `2px solid ${hovered === c.key ? c.color : "var(--border)"}`, padding: "36px 32px", cursor: "pointer", transition: "all .25s", transform: hovered === c.key ? "translateY(-4px)" : "none", boxShadow: hovered === c.key ? `0 20px 50px rgba(0,0,0,0.1)` : "0 2px 12px rgba(0,0,0,0.04)" }}>

              <div style={{ width: 56, height: 56, background: c.bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>{c.icon}</div>

              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: c.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{c.subtitle}</div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 20, color: "var(--navy)", marginBottom: 12 }}>{c.title}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--slate)", lineHeight: 1.6, marginBottom: 24 }}>{c.desc}</div>

              <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 600, color: c.color }}>Get Started</span>
                <span style={{ fontSize: 18, color: c.color }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Screen 3: Main Dashboard ──────────────────────────────────────────────────
const Dashboard = ({ mode, user, onBack }) => {
  const isNetNew = mode === "netnew";
  const rawData = isNetNew ? NET_NEW_DATA : EXPAND_DATA;
  const insights = isNetNew ? NET_NEW_INSIGHTS : EXPAND_INSIGHTS;
  const botMsgs = isNetNew ? NET_NEW_BOT : EXPAND_BOT;

  // Filters state
  const [filters, setFilters] = useState({ products: [], states: [], industries: [], clientType: [], installedProducts: [], intentTopics: [], reportType: "" });
  const [sortCol, setSortCol] = useState("intentScore");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs] = useState(botMsgs);
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs, botTyping]);

  const toggleFilter = (key, val) => {
    setFilters(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
    setPage(1);
  };

  const clearAll = () => setFilters({ products: [], states: [], industries: [], clientType: [], installedProducts: [], intentTopics: [], reportType: "" });

  // Apply basic filter + sort
  const filtered = rawData.filter(r => {
    if (filters.industries.length && !filters.industries.includes(r.industry)) return false;
    if (filters.intentTopics.length && !filters.intentTopics.some(t => r.intentTopic?.includes(t))) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!r.company.toLowerCase().includes(q) && !r.industry.toLowerCase().includes(q) && !r.location.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    let av = a[sortCol];
    let bv = b[sortCol];

    if (typeof av === "string") {
      av = av.toLowerCase();
      bv = bv.toLowerCase();
    }
    return sortDir === "asc"
      ? av > bv ? 1 : -1
      : av < bv ? 1 : -1;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  const SortIcon = ({ col }) => (
    <span style={{ marginLeft: 4, fontSize: 10, color: sortCol === col ? "var(--blue)" : "var(--border)" }}>
      {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMsgs(m => [...m, { from: "user", text: userMsg }]);
    setChatInput("");
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setChatMsgs(m => [...m, { from: "bot", text: `Based on your question about "${userMsg}", I've analyzed the current account data. The top opportunity aligns with your ${isNetNew ? "prospecting" : "expansion"} goal. Would you like me to generate a detailed sales play for this?` }]);
    }, 1800);
  };

  const thStyle = (col) => ({
    padding: "10px 14px", textAlign: "left", fontFamily: "var(--font-head)", fontSize: 11, fontWeight: 600, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none", background: "var(--bg)", borderBottom: "1.5px solid var(--border)"
  });

  const tdStyle = { padding: "11px 14px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", borderBottom: "1px solid var(--border)", verticalAlign: "top" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <style>{`
        .filter-btn { width:100%; padding:10px; background:var(--blue); color:white; border:none; borderRadius:8px; fontFamily:var(--font-head); fontWeight:600; fontSize:13; cursor:pointer; transition:background .2s; }
        .filter-btn:hover { background:var(--blue-light); }
        .tbl-row:hover td { background:var(--blue-pale2); }
        .page-btn { padding:6px 10px; border:1.5px solid var(--border); borderRadius:6px; background:white; fontFamily:var(--font-body); fontSize:12; cursor:pointer; color:var(--slate); transition:all .15s; min-width:32px; text-align:center; }
        .page-btn:hover { border-color:var(--blue); color:var(--blue); }
        .page-btn.active { background:var(--blue); color:white; border-color:var(--blue); }
        .action-btn-primary { padding:9px 20px; background:var(--navy); color:white; border:none; borderRadius:8px; fontFamily:var(--font-head); fontWeight:600; fontSize:13; cursor:pointer; transition:background .2s; }
        .action-btn-primary:hover { background:var(--navy-mid); }
        .action-btn-secondary { padding:9px 20px; background:white; color:var(--navy); border:1.5px solid var(--border); borderRadius:8px; fontFamily:var(--font-head); fontWeight:600; fontSize:13; cursor:pointer; transition:all .2s; }
        .action-btn-secondary:hover { border-color:var(--blue); color:var(--blue); }
        .chat-input { flex:1; padding:9px 12px; border:1.5px solid var(--border); borderRadius:8px; fontFamily:var(--font-body); fontSize:13; outline:none; }
        .chat-input:focus { border-color:var(--blue); }
        .chat-send { padding:9px 14px; background:var(--blue); color:white; border:none; borderRadius:8px; cursor:pointer; fontFamily:var(--font-head); fontWeight:600; fontSize:13; }
        .chat-send:hover { background:var(--blue-light); }
        .date-input { padding:7px 10px; border:1.5px solid var(--border); borderRadius:7px; fontFamily:var(--font-body); fontSize:12; color:var(--navy); outline:none; }
        .date-input:focus { border-color:var(--blue); }
      `}</style>

      {/* Top nav */}
      <div style={{ padding: "12px 24px", background: "white", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <TDLogo size="sm" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--slate)" }}>
            Signed in as <strong>{user}</strong>
          </div>
        </div>
      </div>

      {/* Main 3-col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 300px", flex: 1, overflow: "hidden", height: "calc(100vh - 57px)" }}>

        {/* ── LEFT: Filters ── */}
        <div style={{ background: "white", borderRight: "1px solid var(--border)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "white", zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <BackButton onClick={onBack} />
            </div>
          </div>

          <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--navy)" }}>Filters</div>
            <button onClick={clearAll} style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--blue)", background: "none", border: "none", cursor: "pointer" }}>Clear all</button>
          </div>

          <div style={{ padding: "16px 18px", flex: 1 }}>
            <CollapseSection title="Products">
              {["Watson", "API Connect", "Apptio"].map(p => (
                <CheckItem key={p} label={p} checked={filters.products.includes(p)} onChange={() => toggleFilter("products", p)} />
              ))}
            </CollapseSection>

            <CollapseSection title="Geographic Location">
              <select multiple style={{ width: "100%", height: 90, fontSize: 12, fontFamily: "var(--font-body)", border: "1.5px solid var(--border)", borderRadius: 7, padding: 4 }}
                value={filters.states} onChange={e => { const vals = [...e.target.selectedOptions].map(o => o.value); setFilters(f => ({ ...f, states: vals })); }}>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div style={{ fontSize: 11, color: "var(--slate-light)", marginTop: 4, fontFamily: "var(--font-body)" }}>Hold Ctrl/Cmd to multi-select</div>
            </CollapseSection>

            <CollapseSection title="Industries">
              {["Manufacturing", "Finance", "Media & Internet", "Hospitals & Physician Clinics", "Agriculture"].map(i => (
                <CheckItem key={i} label={i} checked={filters.industries.includes(i)} onChange={() => toggleFilter("industries", i)} />
              ))}
            </CollapseSection>

            <CollapseSection title="Client Type">
              {["Select T Activate", "Horizon", "Select T Growth"].map(c => (
                <CheckItem key={c} label={c} checked={filters.clientType.includes(c)} onChange={() => toggleFilter("clientType", c)} />
              ))}
            </CollapseSection>

            <CollapseSection title="Installed Products">
              {["Maximo", "Instana", "WatsonX", "Apptio", "API Connect"].map(p => (
                <CheckItem key={p} label={p} checked={filters.installedProducts.includes(p)} onChange={() => toggleFilter("installedProducts", p)} />
              ))}
            </CollapseSection>

            <CollapseSection title="Intent Topics">
              {["Open Source", "Automated Workflow", "Advanced Analytics", "Multifactor Authentication", "Privileged Access Management (PAM)", "Incident Response"].map(t => (
                <CheckItem key={t} label={t} checked={filters.intentTopics.includes(t)} onChange={() => toggleFilter("intentTopics", t)} />
              ))}
            </CollapseSection>

            <CollapseSection title="Report Type">
              {["CRM Ready CSV", "Sales Play Research Summary", "Summary PDF"].map(r => (
                <label key={r} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer", fontSize: 13, color: "var(--slate)", fontFamily: "var(--font-body)" }}>
                  <input type="radio" name="reportType" value={r} checked={filters.reportType === r} onChange={() => setFilters(f => ({ ...f, reportType: r }))} style={{ accentColor: "var(--blue)" }} />
                  {r}
                </label>
              ))}
            </CollapseSection>
          </div>

          <div style={{ padding: "16px 18px", borderTop: "1px solid var(--border)", position: "sticky", bottom: 0, background: "white" }}>
            <button className="filter-btn">Apply Filters</button>
          </div>
        </div>

        {/* ── CENTER ── */}
        <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: 0 }}>

          {/* TD Insights */}
          <div style={{ padding: "20px 24px 16px", background: "white", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15, color: "var(--navy)" }}>
                ⚡ TD Insights
              </div>
              <div style={{ position: "relative", width: 300 }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "var(--slate-light)", pointerEvents: "none" }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search company, industry, location..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  style={{ width: "100%", padding: "8px 12px 8px 32px", border: "1.5px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--navy)", outline: "none", background: "var(--bg)" }}
                  onFocus={e => e.target.style.borderColor = "var(--blue)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {insights.map((ins, i) => (
                <div key={i} style={{ padding: "14px 16px", background: ins.bg, borderRadius: 12, border: `1px solid ${ins.color}22` }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{ins.icon}</div>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 20, color: ins.color, marginBottom: 2 }}>{ins.value}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--slate)", lineHeight: 1.4 }}>{ins.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Table area */}
          <div style={{ padding: "20px 24px", flex: 1 }}>
            <div style={{ background: "white", borderRadius: 14, border: "1.5px solid var(--border)", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {isNetNew ? (
                        <>
                          <th style={thStyle("company")} onClick={() => handleSort("company")}>Company Name <SortIcon col="company" /></th>
                          <th style={thStyle("industry")} onClick={() => handleSort("industry")}>Industry <SortIcon col="industry" /></th>
                          <th style={thStyle("location")} onClick={() => handleSort("location")}>Location <SortIcon col="location" /></th>
                          <th style={thStyle("installedProducts")}>Installed Products</th>
                          <th style={thStyle("intentScore")} onClick={() => handleSort("intentScore")}>Intent Score <SortIcon col="intentScore" /></th>
                          <th style={thStyle("fitScore")} onClick={() => handleSort("fitScore")}>Fit Score <SortIcon col="fitScore" /></th>
                          <th style={thStyle("intentTopic")} onClick={() => handleSort("intentTopic")}>Top Intent Topic <SortIcon col="intentTopic" /></th>
                          <th style={thStyle("recommendedProduct")} onClick={() => handleSort("recommendedProduct")}>Recommended <SortIcon col="recommendedProduct" /></th>
                          <th style={{ ...thStyle("whyThis"), maxWidth: 220 }}>Why This Account</th>
                        </>
                      ) : (
                        <>
                          <th style={thStyle("company")} onClick={() => handleSort("company")}>Company Name <SortIcon col="company" /></th>
                          <th style={thStyle("industry")} onClick={() => handleSort("industry")}>Industry <SortIcon col="industry" /></th>
                          <th style={thStyle("installedProducts")}>Installed Products</th>
                          <th style={thStyle("intentScore")} onClick={() => handleSort("intentScore")}>Intent Score <SortIcon col="intentScore" /></th>
                          <th style={thStyle("renewalDate")} onClick={() => handleSort("renewalDate")}>Renewal Date <SortIcon col="renewalDate" /></th>
                          <th style={thStyle("lastActivity")}>Last Activity</th>
                          <th style={thStyle("recommendedUpsell")} onClick={() => handleSort("recommendedUpsell")}>Upsell Play <SortIcon col="recommendedUpsell" /></th>
                          <th style={{ ...thStyle("whyThis"), maxWidth: 220 }}>Why This Account</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map(row => (
                      <tr key={row.id} className="tbl-row" style={{ cursor: "default" }}>
                        {isNetNew ? (
                          <>
                            <td style={tdStyle}><div style={{ fontWeight: 600 }}>{row.company}</div></td>
                            <td style={tdStyle}><span style={{ padding: "2px 8px", background: "var(--blue-pale2)", color: "var(--blue)", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.industry}</span></td>
                            <td style={tdStyle}>{row.location}</td>
                            <td style={{ ...tdStyle, maxWidth: 140 }}><div style={{ fontSize: 12, color: "var(--slate)" }}>{row.installedProducts || "—"}</div></td>
                            <td style={tdStyle}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: row.intentScore >= 85 ? "var(--green-pale)" : row.intentScore >= 70 ? "var(--amber-pale)" : "var(--red-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 12, color: row.intentScore >= 85 ? "var(--green)" : row.intentScore >= 70 ? "var(--amber)" : "var(--red)" }}>{row.intentScore}</div>
                              </div>
                            </td>
                            <td style={tdStyle}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ flex: 1, height: 5, background: "var(--border)", borderRadius: 3 }}>
                                  <div style={{ width: `${row.fitScore}%`, height: "100%", background: "var(--blue)", borderRadius: 3 }} />
                                </div>
                                <span style={{ fontSize: 12, color: "var(--slate)", minWidth: 28 }}>{row.fitScore}</span>
                              </div>
                            </td>
                            <td style={tdStyle}><span style={{ padding: "2px 8px", background: "#f3e8ff", color: "#7c3aed", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.intentTopic}</span></td>
                            <td style={tdStyle}><span style={{ padding: "2px 8px", background: "var(--blue-pale2)", color: "var(--blue)", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.recommendedProduct}</span></td>
                            <td style={{ ...tdStyle, maxWidth: 220 }}>
                              <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.5 }}>
                                {expandedRow === row.id ? row.whyThis : row.whyThis.slice(0, 60) + "..."}
                                <button onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)} style={{ marginLeft: 4, background: "none", border: "none", color: "var(--blue)", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-body)" }}>{expandedRow === row.id ? "Less" : "More"}</button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td style={tdStyle}><div style={{ fontWeight: 600 }}>{row.company}</div></td>
                            <td style={tdStyle}><span style={{ padding: "2px 8px", background: "var(--green-pale)", color: "var(--green)", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.industry}</span></td>
                            <td style={{ ...tdStyle, maxWidth: 160 }}><div style={{ fontSize: 12, color: "var(--slate)" }}>{row.installedProducts}</div></td>
                            <td style={tdStyle}>
                              <div style={{ width: 32, height: 32, borderRadius: "50%", background: row.intentScore >= 85 ? "var(--green-pale)" : row.intentScore >= 70 ? "var(--amber-pale)" : "var(--blue-pale2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 12, color: row.intentScore >= 85 ? "var(--green)" : row.intentScore >= 70 ? "var(--amber)" : "var(--blue)" }}>{row.intentScore}</div>
                            </td>
                            <td style={tdStyle}><span style={{ padding: "2px 8px", background: "var(--amber-pale)", color: "var(--amber)", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.renewalDate}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: 12, color: "var(--slate)" }}>{row.lastActivity}</span></td>
                            <td style={tdStyle}><span style={{ padding: "2px 8px", background: "var(--blue-pale2)", color: "var(--blue)", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.recommendedUpsell}</span></td>
                            <td style={{ ...tdStyle, maxWidth: 220 }}>
                              <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.5 }}>
                                {expandedRow === row.id ? row.whyThis : row.whyThis.slice(0, 60) + "..."}
                                <button onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)} style={{ marginLeft: 4, background: "none", border: "none", color: "var(--blue)", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-body)" }}>{expandedRow === row.id ? "Less" : "More"}</button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div style={{ padding: "14px 18px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg)" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--slate-light)" }}>
                  Showing {Math.min((page - 1) * pageSize + 1, sorted.length)}–{Math.min(page * pageSize, sorted.length)} of {sorted.length} accounts
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                    if (p < 1 || p > totalPages) return null;
                    return <button key={p} className={`page-btn${page === p ? " active" : ""}`} onClick={() => setPage(p)}>{p}</button>;
                  })}
                  <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--slate-light)" }}>
                  Page {page} of {totalPages}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ padding: "14px 18px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 10, background: "white" }}>
                <button className="action-btn-secondary">⬆ Upload CSV</button>
                <button className="action-btn-primary">⬇ Download Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("signin"); // signin | getstarted | dashboard
  const [user, setUser] = useState("");
  const [mode, setMode] = useState(null); // netnew | expand

  const handleLogin = (name) => { setUser(name); setScreen("getstarted"); };
  const handleSelect = (m) => { setMode(m); setScreen("dashboard"); };

  return (
    <>
      <FontLink />
      {screen === "signin" && <SignIn onLogin={handleLogin} />}
      {screen === "getstarted" && <GetStarted user={user} onSelect={handleSelect} onBack={() => setScreen("signin")} />}
      {screen === "dashboard" && <Dashboard mode={mode} user={user} onBack={() => setScreen("getstarted")} />}
    </>
  );
}
