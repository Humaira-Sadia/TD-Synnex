import { useState, useRef, useEffect } from "react";
import { US_STATES, NET_NEW_DATA, EXPAND_DATA, NET_NEW_INSIGHTS, EXPAND_INSIGHTS, NET_NEW_BOT, EXPAND_BOT } from "./utils/constant.js";
import { GetStarted } from "./components/GetStarted.jsx";
import { BackButton, TDLogo } from "./utils/reuasable.js";
import { SignIn } from "./components/SignIn.jsx";

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

  useEffect(() => {
    const chatbotDiv = document.getElementById("floatingChatBotDiv");
    console.log("Chatbot Div", chatbotDiv);
    if (chatbotDiv) chatbotDiv.style.display = "none";

    // Show it again if needed when component unmounts
    return () => {
      if (chatbotDiv) chatbotDiv.style.display = "block";
    };
  }, []);

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
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", flex: 1, overflow: "hidden", height: "calc(100vh - 57px)" }}>

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
