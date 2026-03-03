import React, { useState } from 'react'
import { BackButton, TDLogo } from '../utils/reuasable.js';

// ── Screen 2: Get Started ─────────────────────────────────────────────────────
export const GetStarted = ({ user, onSelect, onBack }) => {
    
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