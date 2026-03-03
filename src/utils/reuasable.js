export const BackButton = ({ onClick }) => (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: "1.5px solid var(--border)", borderRadius: 8, background: "white", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--slate)", fontWeight: 500, transition: "all .15s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--slate)"; }}>
        ← Back
    </button>
);

export const TDLogo = ({ size = "md" }) => {
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