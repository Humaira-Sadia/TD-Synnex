import React, { useState, useEffect } from 'react';
import { TDLogo } from '../utils/reuasable.js';

// ── Screen 1: Sign In ─────────────────────────────────────────────────────────
export const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const chatbotDiv = document.getElementById("floatingChatBotDiv");
    console.log("Chatbot Div", chatbotDiv);
    if (chatbotDiv) chatbotDiv.style.display = "none";

    // Show it again if needed when component unmounts
    return () => {
      if (chatbotDiv) chatbotDiv.style.display = "block";
    };
  }, []);

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