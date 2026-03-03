import { useState, useRef, useEffect } from "react";

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const Ic = ({ d, size = 18, color = "currentColor", sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const IArrowR  = p => <Ic {...p} d="M5 12h14M12 5l7 7-7 7" />;
const IArrowL  = p => <Ic {...p} d="M19 12H5M12 19l-7-7 7-7" />;
const IUser    = p => <Ic {...p} d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8"]} />;
const IList    = p => <Ic {...p} d={["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"]} />;
const ISearch  = p => <Ic {...p} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0" />;
const IDL      = p => <Ic {...p} d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M7 10l5 5 5-5","M12 15V3"]} />;
const IUL      = p => <Ic {...p} d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"]} />;
const IChevD   = p => <Ic {...p} d="M6 9l6 6 6-6" />;
const IChevU   = p => <Ic {...p} d="M18 15l-6-6-6 6" />;
const IX       = p => <Ic {...p} d="M18 6L6 18M6 6l12 12" />;
const ISend    = p => <Ic {...p} d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />;
const IStar    = p => <Ic {...p} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2" />;
const IEye     = p => <Ic {...p} d={["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6"]} />;
const ILogout  = p => <Ic {...p} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]} />;
const ICheck   = p => <Ic {...p} d="M20 6L9 17l-5-5" />;
const IEdit    = p => <Ic {...p} d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />;
const ITrash   = p => <Ic {...p} d={["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]} />;

/* ─── Palette ────────────────────────────────────────────────────────────── */
const C = {
  teal:"#0B6B65", tealL:"#0d7d76", tealBg:"#CCEFED",
  purple:"#7C3AED", purpleBg:"#F3E8FF",
  olive:"#7B8C2A", oliveBg:"#EFF2D5",
  bg:"#EEF1F8", white:"#FFFFFF", gray:"#6B7280", dark:"#111827",
  border:"#E5E7EB", red:"#EF4444",
};

const btn = (extra={}) => ({ cursor:"pointer", fontFamily:"inherit", border:"none", ...extra });

/* ─── Shared: Topnav ─────────────────────────────────────────────────────── */
function Topnav({ onLogout, right }) {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{background:C.white,height:60,display:"flex",alignItems:"center",
      justifyContent:"space-between",padding:"0 28px",
      boxShadow:"0 1px 4px rgba(0,0,0,0.07)",flexShrink:0,position:"relative",zIndex:50}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,borderRadius:999,background:`linear-gradient(135deg,${C.teal},#0d9488)`,
          display:"flex",alignItems:"center",justifyContent:"center"}}>
          <IStar size={16} color={C.white} />
        </div>
        <span style={{fontWeight:800,fontSize:16,color:C.dark,letterSpacing:.4}}>TD SYNNEX</span>
      </div>
      {right && <div style={{position:"absolute",left:"50%",transform:"translateX(-50%)"}}>{right}</div>}
      <div style={{position:"relative"}}>
        <button onClick={()=>setOpen(o=>!o)} style={btn({
          width:38,height:38,borderRadius:999,background:C.bg,
          display:"flex",alignItems:"center",justifyContent:"center"})}>
          <IUser size={20} color={C.gray} />
        </button>
        {open && (
          <div style={{position:"absolute",right:0,top:46,background:C.white,
            borderRadius:12,padding:"6px 0",boxShadow:"0 8px 30px rgba(0,0,0,0.13)",
            minWidth:160,zIndex:200}}>
            <div style={{padding:"10px 18px",display:"flex",alignItems:"center",gap:10,fontSize:13,color:C.dark}}>
              <IUser size={15}/> MedhaV
            </div>
            <hr style={{border:"none",borderTop:`1px solid ${C.border}`,margin:"4px 0"}}/>
            <button onClick={()=>{setOpen(false);onLogout&&onLogout();}}
              style={btn({width:"100%",padding:"10px 18px",textAlign:"left",background:"none",
                display:"flex",alignItems:"center",gap:10,fontSize:13,color:C.gray})}>
              <ILogout size={15}/> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ─── KPI card ───────────────────────────────────────────────────────────── */
const KpiCard = ({color,value,label,icon})=>{
  const map={purple:{bg:C.purpleBg,fg:C.purple},teal:{bg:C.tealBg,fg:C.teal},olive:{bg:C.oliveBg,fg:C.olive}};
  const {bg,fg}=map[color];
  return(
    <div style={{background:bg,borderRadius:16,padding:"20px 22px",
      display:"flex",alignItems:"center",justifyContent:"space-between",flex:1}}>
      <div>
        <div style={{fontSize:34,fontWeight:800,color:fg,lineHeight:1}}>{value}</div>
        <div style={{fontSize:12,color:C.gray,marginTop:6,maxWidth:130}}>{label}</div>
      </div>
      <div style={{width:50,height:50,borderRadius:14,background:fg,
        display:"flex",alignItems:"center",justifyContent:"center"}}>{icon}</div>
    </div>
  );
};

/* ─── Score badge ────────────────────────────────────────────────────────── */
const Score = ({v})=>{
  const bg=v>=85?"#D1FAE5":v>=75?"#FEF3C7":"#FEE2E2";
  const fg=v>=85?"#065F46":v>=75?"#92400E":"#991B1B";
  return <span style={{background:bg,color:fg,borderRadius:6,padding:"3px 10px",fontWeight:700,fontSize:12}}>{v}</span>;
};

/* ─── Modal ──────────────────────────────────────────────────────────────── */
function Modal({children,onClose}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.42)",display:"flex",
      alignItems:"center",justifyContent:"center",zIndex:200}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.white,borderRadius:20,padding:"34px 38px",width:480,
        position:"relative",maxHeight:"90vh",overflowY:"auto"}}>
        <button onClick={onClose} style={btn({position:"absolute",right:16,top:16,
          background:"none",padding:4,color:C.gray,display:"flex"})}>
          <IX size={18}/>
        </button>
        {children}
      </div>
    </div>
  );
}

/* ─── Steps ──────────────────────────────────────────────────────────────── */
function Steps({current,labels}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:24,flexWrap:"wrap"}}>
      {labels.map((l,i)=>(
        <div key={l} style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:26,height:26,borderRadius:999,
            background:i+1<=current?C.teal:"#E5E7EB",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:12,fontWeight:700,color:i+1<=current?C.white:C.gray,flexShrink:0}}>{i+1}</div>
          <span style={{fontSize:12,fontWeight:i+1===current?700:400,
            color:i+1===current?C.dark:C.gray,whiteSpace:"nowrap"}}>{l}</span>
          {i<labels.length-1&&<div style={{width:24,height:2,background:i+1<current?C.teal:C.border,flexShrink:0}}/>}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN 1 — Sign In
═══════════════════════════════════════════════════════════════════════════ */
function SignIn({onSignIn,onCreateAccount}){
  const [email,setEmail]=useState("mail@simmmple.com");
  const [pw,setPw]=useState("");
  const [show,setShow]=useState(false);
  const [remember,setRemember]=useState(true);
  const [err,setErr]=useState("");
  const [forgot,setForgot]=useState(false);
  const [forgotEmail,setForgotEmail]=useState("");
  const [forgotSent,setForgotSent]=useState(false);

  const submit=()=>{
    if(!email.includes("@")){setErr("Please enter a valid email.");return;}
    if(pw.length<8){setErr("Password must be at least 8 characters.");return;}
    setErr(""); onSignIn();
  };

  if(forgot) return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:C.white,borderRadius:24,padding:"48px 44px",width:420,boxShadow:"0 4px 40px rgba(0,0,0,0.08)"}}>
        {forgotSent?(
          <>
            <div style={{width:56,height:56,borderRadius:999,background:C.tealBg,
              display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
              <ICheck size={26} color={C.teal}/>
            </div>
            <h2 style={{color:C.teal,fontSize:24,fontWeight:800,margin:"0 0 8px",textAlign:"center"}}>Email Sent!</h2>
            <p style={{color:C.gray,textAlign:"center",fontSize:14,margin:"0 0 28px"}}>
              Check your inbox at <b>{forgotEmail}</b> for a password reset link.
            </p>
            <button onClick={()=>{setForgot(false);setForgotSent(false);}}
              style={btn({width:"100%",padding:"13px",background:`linear-gradient(90deg,${C.teal},#0d9488)`,
                color:C.white,borderRadius:12,fontSize:15,fontWeight:700})}>
              Back to Sign In
            </button>
          </>
        ):(
          <>
            <h2 style={{color:C.teal,fontSize:28,fontWeight:800,margin:"0 0 8px"}}>Forgot Password?</h2>
            <p style={{color:C.gray,fontSize:14,margin:"0 0 24px"}}>Enter your email and we'll send you a reset link.</p>
            <label style={{fontSize:13,fontWeight:600,color:C.dark}}>Email</label>
            <input value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)}
              placeholder="mail@example.com"
              style={{display:"block",width:"100%",marginTop:6,marginBottom:20,padding:"12px 14px",
                border:`1.5px solid ${C.border}`,borderRadius:10,fontSize:14,fontFamily:"inherit",
                boxSizing:"border-box",outline:"none"}}/>
            <button onClick={()=>{if(forgotEmail.includes("@"))setForgotSent(true);}}
              style={btn({width:"100%",padding:"13px",background:`linear-gradient(90deg,${C.teal},#0d9488)`,
                color:C.white,borderRadius:12,fontSize:15,fontWeight:700,marginBottom:12})}>
              Send Reset Link
            </button>
            <button onClick={()=>setForgot(false)}
              style={btn({width:"100%",padding:"12px",border:`1.5px solid ${C.border}`,
                borderRadius:12,background:C.white,fontSize:14,fontWeight:600,color:C.dark})}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:C.white,borderRadius:24,padding:"48px 44px",width:420,boxShadow:"0 4px 40px rgba(0,0,0,0.08)"}}>
        <h2 style={{color:C.teal,fontSize:32,fontWeight:800,margin:"0 0 6px"}}>Sign In</h2>
        <p style={{color:C.gray,margin:"0 0 28px",fontSize:14}}>Enter your email and password to sign in!</p>
        <label style={{fontSize:13,fontWeight:600,color:C.dark}}>Email<span style={{color:C.teal}}>*</span></label>
        <input value={email} onChange={e=>{setEmail(e.target.value);setErr("");}}
          style={{display:"block",width:"100%",marginTop:6,marginBottom:18,padding:"12px 14px",
            border:`1.5px solid ${err&&!email.includes("@")?C.red:C.border}`,borderRadius:10,
            fontSize:14,fontFamily:"inherit",boxSizing:"border-box",outline:"none"}}
          placeholder="mail@simmmple.com"/>
        <label style={{fontSize:13,fontWeight:600,color:C.dark}}>Password<span style={{color:C.teal}}>*</span></label>
        <div style={{position:"relative",marginTop:6,marginBottom:6}}>
          <input type={show?"text":"password"} value={pw}
            onChange={e=>{setPw(e.target.value);setErr("");}}
            onKeyDown={e=>e.key==="Enter"&&submit()}
            style={{display:"block",width:"100%",padding:"12px 44px 12px 14px",
              border:`1.5px solid ${err&&pw.length<8?C.red:C.border}`,borderRadius:10,
              fontSize:14,fontFamily:"inherit",boxSizing:"border-box",outline:"none"}}
            placeholder="Min. 8 characters"/>
          <button onClick={()=>setShow(s=>!s)}
            style={btn({position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",
              background:"none",padding:0,display:"flex",color:C.gray})}>
            <IEye size={18}/>
          </button>
        </div>
        {err && <div style={{color:C.red,fontSize:12,marginBottom:8}}>{err}</div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,marginTop:10}}>
          <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:C.gray,cursor:"pointer"}}>
            <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}
              style={{accentColor:C.teal}}/> Keep me logged in
          </label>
          <span onClick={()=>setForgot(true)}
            style={{color:C.teal,fontSize:13,fontWeight:500,cursor:"pointer",textDecoration:"underline"}}>
            Forget password?
          </span>
        </div>
        <button onClick={submit}
          style={btn({width:"100%",padding:"14px",background:`linear-gradient(90deg,${C.teal},#0d9488)`,
            color:C.white,borderRadius:12,fontSize:16,fontWeight:700,letterSpacing:.3})}>
          Sign In
        </button>
        <p style={{textAlign:"center",marginTop:20,fontSize:13,color:C.gray}}>
          Not registered yet?{" "}
          <span onClick={onCreateAccount}
            style={{color:C.teal,fontWeight:600,cursor:"pointer",textDecoration:"underline"}}>
            Create an Account
          </span>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN 1b — Create Account
═══════════════════════════════════════════════════════════════════════════ */
function CreateAccount({onBack,onCreated}){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [show,setShow]=useState(false);
  const [err,setErr]=useState("");
  const submit=()=>{
    if(!name||!email.includes("@")||pw.length<8){
      setErr("Please fill all fields correctly (password ≥ 8 chars).");return;
    }
    setErr(""); onCreated();
  };
  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:C.white,borderRadius:24,padding:"48px 44px",width:420,boxShadow:"0 4px 40px rgba(0,0,0,0.08)"}}>
        <h2 style={{color:C.teal,fontSize:28,fontWeight:800,margin:"0 0 6px"}}>Create Account</h2>
        <p style={{color:C.gray,fontSize:14,margin:"0 0 24px"}}>Join TD SYNNEX to unlock AI-powered sales insights.</p>
        {[["Full Name","text",name,setName,"Jane Smith"],["Email","email",email,setEmail,"jane@company.com"]].map(([lbl,type,val,set,ph])=>(
          <div key={lbl}>
            <label style={{fontSize:13,fontWeight:600,color:C.dark}}>{lbl}<span style={{color:C.teal}}>*</span></label>
            <input type={type} value={val} onChange={e=>{set(e.target.value);setErr("");}} placeholder={ph}
              style={{display:"block",width:"100%",marginTop:6,marginBottom:16,padding:"12px 14px",
                border:`1.5px solid ${C.border}`,borderRadius:10,fontSize:14,fontFamily:"inherit",
                boxSizing:"border-box",outline:"none"}}/>
          </div>
        ))}
        <label style={{fontSize:13,fontWeight:600,color:C.dark}}>Password<span style={{color:C.teal}}>*</span></label>
        <div style={{position:"relative",marginTop:6,marginBottom:6}}>
          <input type={show?"text":"password"} value={pw}
            onChange={e=>{setPw(e.target.value);setErr("");}} placeholder="Min. 8 characters"
            style={{display:"block",width:"100%",padding:"12px 44px 12px 14px",
              border:`1.5px solid ${C.border}`,borderRadius:10,fontSize:14,fontFamily:"inherit",
              boxSizing:"border-box",outline:"none"}}/>
          <button onClick={()=>setShow(s=>!s)}
            style={btn({position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",
              background:"none",padding:0,display:"flex",color:C.gray})}>
            <IEye size={18}/>
          </button>
        </div>
        {err && <div style={{color:C.red,fontSize:12,marginBottom:8}}>{err}</div>}
        <button onClick={submit}
          style={btn({width:"100%",padding:"13px",background:`linear-gradient(90deg,${C.teal},#0d9488)`,
            color:C.white,borderRadius:12,fontSize:15,fontWeight:700,marginTop:14,marginBottom:12})}>
          Create Account
        </button>
        <button onClick={onBack}
          style={btn({width:"100%",padding:"12px",border:`1.5px solid ${C.border}`,
            borderRadius:12,background:C.white,fontSize:14,fontWeight:600,color:C.dark})}>
          Back to Sign In
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN 2 — Home
═══════════════════════════════════════════════════════════════════════════ */
function Home({onSelect,onLogout}){
  const cards=[
    {id:"prospect",tag:"Prospect Discovery",title:"Find net-new accounts",
      desc:"Check intent insights to prioritize buyers ready to engage.",
      tagColor:C.purple,iconBg:C.purple},
    {id:"expansion",tag:"Account Expansion",title:"Expand existing customers",
      desc:"Reveal untapped potential across your installed base and act on the strongest growth signals.",
      tagColor:C.teal,iconBg:C.teal},
    {id:"mylist",tag:"Saved List",title:"My List",
      desc:"Access your saved account and product lists. Upload a new list or pick up where you left off.",
      tagColor:C.olive,iconBg:C.olive},
  ];
  return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <Topnav onLogout={onLogout}/>
      <div style={{maxWidth:980,margin:"0 auto",padding:"72px 24px"}}>
        <h1 style={{textAlign:"center",fontSize:28,fontWeight:800,color:C.teal,margin:"0 0 8px"}}>
          What would you like to do today?
        </h1>
        <p style={{textAlign:"center",color:C.gray,margin:"0 0 48px",fontSize:15}}>
          Select your objective. We will bring the right insights to help you move faster.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
          {cards.map(c=>(
            <div key={c.id}
              style={{background:C.white,borderRadius:20,padding:"32px 28px",
                boxShadow:"0 2px 14px rgba(0,0,0,0.06)",display:"flex",flexDirection:"column",gap:12,
                transition:"transform .18s,box-shadow .18s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.11)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 14px rgba(0,0,0,0.06)";}}>
              <div style={{width:56,height:56,borderRadius:16,background:c.iconBg,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <IUser size={24} color={C.white}/>
              </div>
              <div style={{fontSize:11,fontWeight:700,color:c.tagColor,textTransform:"uppercase",letterSpacing:.8}}>{c.tag}</div>
              <div style={{fontSize:20,fontWeight:800,color:C.dark}}>{c.title}</div>
              <div style={{fontSize:13,color:C.gray,lineHeight:1.65,flex:1}}>{c.desc}</div>
              <button onClick={()=>onSelect(c.id)}
                style={btn({display:"flex",alignItems:"center",gap:8,color:c.tagColor,
                  background:"none",fontWeight:700,fontSize:14,padding:0,marginTop:8})}>
                Get Started
                <div style={{width:32,height:32,borderRadius:999,border:`1.5px solid ${c.tagColor}`,
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <IArrowR size={14} color={c.tagColor}/>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN 3 — My Lists
═══════════════════════════════════════════════════════════════════════════ */
const INIT_LISTS=[
  {id:1,name:"Q1 Finance Targets",type:"Account CSV"},
  {id:2,name:"PAM Prospects - East Coast",type:"Product CSV"},
  {id:3,name:"Renewal Risk Accounts",type:"Account CSV"},
];

function MyLists({onBack,onOpen,onLogout}){
  const [lists,setLists]=useState(INIT_LISTS);
  const [search,setSearch]=useState("");
  const [uploadOpen,setUploadOpen]=useState(false);
  const [step,setStep]=useState(1);
  const [listName,setListName]=useState("");
  const [listType,setListType]=useState("account");
  const [objective,setObjective]=useState("prospect");
  const [file,setFile]=useState(null);
  const [editId,setEditId]=useState(null);
  const [editName,setEditName]=useState("");
  const [deleteId,setDeleteId]=useState(null);
  const fileRef=useRef();

  const filtered=lists.filter(l=>l.name.toLowerCase().includes(search.toLowerCase()));

  const openUpload=()=>{setListName("");setListType("account");setObjective("prospect");setFile(null);setStep(1);setUploadOpen(true);};

  const finishUpload=()=>{
    if(!listName.trim())return;
    setLists(l=>[...l,{id:Date.now(),name:listName,type:listType==="account"?"Account CSV":"Product CSV"}]);
    setUploadOpen(false);
  };

  return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <Topnav onLogout={onLogout}/>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <button onClick={onBack}
              style={btn({width:36,height:36,borderRadius:999,border:`1.5px solid ${C.border}`,
                background:C.white,display:"flex",alignItems:"center",justifyContent:"center"})}>
              <IArrowL size={15} color={C.dark}/>
            </button>
            <div>
              <h2 style={{margin:0,fontSize:22,fontWeight:800}}>My Lists</h2>
              <div style={{fontSize:13,color:C.gray}}>
                {filtered.length} saved list{filtered.length!==1?"s":""} — click any list to open in dashboard
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:12}}>
            <div style={{position:"relative"}}>
              <div style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
                <ISearch size={14} color={C.gray}/>
              </div>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search"
                style={{padding:"9px 14px 9px 34px",border:`1.5px solid ${C.border}`,borderRadius:10,
                  fontSize:13,fontFamily:"inherit",outline:"none",width:210}}/>
            </div>
            <button onClick={openUpload}
              style={btn({background:`linear-gradient(90deg,${C.teal},#0d9488)`,color:C.white,
                borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:700,
                display:"flex",alignItems:"center",gap:6})}>
              + Upload New List
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div style={{display:"flex",gap:14,marginTop:24,marginBottom:28}}>
          <KpiCard color="purple" value={String(filtered.length).padStart(2,"0")} label="Total Lists" icon={<IList size={22} color={C.white}/>}/>
          <KpiCard color="teal" value={String(filtered.length*25).padStart(2,"0")} label="Total Accounts" icon={<IUser size={22} color={C.white}/>}/>
          <KpiCard color="olive" value={String(filtered.length*2).padStart(2,"0")} label="Total Products" icon={<IStar size={22} color={C.white}/>}/>
        </div>

        {/* Grid */}
        {filtered.length===0?(
          <div style={{background:C.white,borderRadius:16,padding:"64px 24px",textAlign:"center"}}>
            <div style={{fontSize:16,fontWeight:700,color:C.dark,marginBottom:8}}>No lists yet</div>
            <div style={{color:C.gray,fontSize:13,marginBottom:20}}>
              Upload your first list of accounts or products to get AI-powered insights in the dashboard.
            </div>
            <button onClick={openUpload}
              style={btn({background:`linear-gradient(90deg,${C.teal},#0d9488)`,color:C.white,
                borderRadius:10,padding:"11px 24px",fontSize:13,fontWeight:700})}>
              Upload New List
            </button>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
            {filtered.map(l=>(
              <div key={l.id} style={{background:C.white,borderRadius:18,padding:"26px 22px",
                boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{width:46,height:46,borderRadius:13,background:C.teal,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <IUser size={21} color={C.white}/>
                  </div>
                  <div style={{display:"flex",gap:4}}>
                    <button title="Rename" onClick={()=>{setEditId(l.id);setEditName(l.name);}}
                      style={btn({background:"none",padding:5,color:C.gray,display:"flex"})}>
                      <IEdit size={15}/>
                    </button>
                    <button title="Delete" onClick={()=>setDeleteId(l.id)}
                      style={btn({background:"none",padding:5,color:C.gray,display:"flex"})}>
                      <ITrash size={15}/>
                    </button>
                  </div>
                </div>
                <div style={{marginTop:14,fontWeight:800,fontSize:16,color:C.dark}}>{l.name}</div>
                <div style={{fontSize:12,color:C.gray,marginTop:3}}>{l.type}</div>
                <button onClick={()=>onOpen(l)}
                  style={btn({marginTop:22,display:"flex",alignItems:"center",gap:8,color:C.teal,
                    background:"none",fontWeight:700,fontSize:13,padding:0})}>
                  View in Dashboard
                  <div style={{width:28,height:28,borderRadius:999,border:`1.5px solid ${C.teal}`,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <IArrowR size={13} color={C.teal}/>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {uploadOpen&&(
        <Modal onClose={()=>setUploadOpen(false)}>
          <Steps current={step} labels={["Name & Type","Objective","Upload File"]}/>
          {step===1&&(
            <>
              <h3 style={{margin:"0 0 4px",fontSize:20,fontWeight:800}}>Name your list</h3>
              <p style={{color:C.gray,fontSize:13,margin:"0 0 18px"}}>Give it a clear name so you can find it later</p>
              <label style={{fontSize:13,fontWeight:600}}>List Name</label>
              <input value={listName} onChange={e=>setListName(e.target.value)}
                placeholder="e.g. Q2 Finance Targets"
                style={{display:"block",width:"100%",marginTop:6,marginBottom:18,padding:"11px 13px",
                  border:`1.5px solid ${C.border}`,borderRadius:10,fontSize:14,fontFamily:"inherit",
                  outline:"none",boxSizing:"border-box"}}/>
              <label style={{fontSize:13,fontWeight:600}}>List Type</label>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:10}}>
                {[["account","Account CSV","A list of company names or accounts."],
                  ["product","Product CSV","A list of products you want to pitch"]].map(([id,lbl,sub])=>(
                  <div key={id} onClick={()=>setListType(id)}
                    style={{border:`1.5px solid ${listType===id?C.teal:C.border}`,borderRadius:12,
                      padding:"13px 16px",cursor:"pointer",
                      background:listType===id?"#F0FAFA":C.white,
                      display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:34,height:34,borderRadius:10,background:C.teal+"22",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {id==="account"?<IUser size={16} color={C.teal}/>:<IList size={16} color={C.teal}/>}
                    </div>
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{lbl}</div>
                      <div style={{fontSize:12,color:C.gray}}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {step===2&&(
            <>
              <h3 style={{margin:"0 0 4px",fontSize:20,fontWeight:800}}>Set Objective</h3>
              <p style={{color:C.gray,fontSize:13,margin:"0 0 18px"}}>This tells the AI what to do with your list.</p>
              {[["prospect","Find Net New Accounts","Check intent signals — identify cold prospects ready to buy"],
                ["expansion","Expand Existing Customers","Check install base — find upsell and renewal opportunities"]].map(([id,lbl,sub])=>(
                <div key={id} onClick={()=>setObjective(id)}
                  style={{border:`1.5px solid ${objective===id?C.teal:C.border}`,borderRadius:12,
                    padding:"13px 16px",cursor:"pointer",
                    background:objective===id?"#F0FAFA":C.white,marginBottom:10}}>
                  <div style={{fontWeight:700,fontSize:14,color:C.teal}}>{lbl}</div>
                  <div style={{fontSize:12,color:C.gray,marginTop:2}}>{sub}</div>
                </div>
              ))}
            </>
          )}
          {step===3&&(
            <>
              <h3 style={{margin:"0 0 4px",fontSize:20,fontWeight:800}}>Upload your file</h3>
              <p style={{color:C.gray,fontSize:13,margin:"0 0 18px"}}>Accepted formats: CSV, XLS, XLSX</p>
              <input ref={fileRef} type="file" accept=".csv,.xls,.xlsx"
                style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
              <div onClick={()=>fileRef.current.click()}
                style={{border:`2px dashed ${file?C.teal:C.border}`,borderRadius:14,
                  padding:"44px 24px",textAlign:"center",background:file?"#F0FAFA":"#F8FFFE",cursor:"pointer"}}>
                <div style={{width:50,height:50,borderRadius:14,background:C.teal+"22",
                  display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                  <IUL size={24} color={C.teal}/>
                </div>
                {file?(
                  <>
                    <div style={{fontWeight:700,color:C.teal,fontSize:14}}>{file.name}</div>
                    <div style={{fontSize:12,color:C.gray,marginTop:4}}>Click to replace</div>
                  </>
                ):(
                  <>
                    <div style={{fontWeight:600,fontSize:14,color:C.dark,marginBottom:6}}>Drag & drop your file here</div>
                    <div style={{color:C.gray,fontSize:13,marginBottom:12}}>or</div>
                    <span style={{background:C.white,border:`1.5px solid ${C.teal}`,color:C.teal,
                      borderRadius:8,padding:"7px 18px",fontSize:13,fontWeight:600}}>Browse Files</span>
                  </>
                )}
              </div>
            </>
          )}
          <div style={{display:"flex",gap:12,marginTop:26}}>
            {step>1&&(
              <button onClick={()=>setStep(s=>s-1)}
                style={btn({flex:1,padding:"12px",border:`1.5px solid ${C.border}`,borderRadius:12,
                  background:C.white,fontWeight:700,fontSize:14,color:C.dark,
                  display:"flex",alignItems:"center",justifyContent:"center",gap:6})}>
                <IArrowL size={14}/> Back
              </button>
            )}
            <button
              onClick={()=>step<3?setStep(s=>s+1):finishUpload()}
              disabled={step===1&&!listName.trim()}
              style={btn({flex:2,padding:"12px",
                background:(step===1&&!listName.trim())?"#9CA3AF":`linear-gradient(90deg,${C.teal},#0d9488)`,
                border:"none",borderRadius:12,color:C.white,fontWeight:700,fontSize:14,
                display:"flex",alignItems:"center",justifyContent:"center",gap:6,
                cursor:(step===1&&!listName.trim())?"not-allowed":"pointer"})}>
              {step<3?"Continue":"Upload & Save List"} <IArrowR size={14} color={C.white}/>
            </button>
          </div>
        </Modal>
      )}

      {/* Rename Modal */}
      {editId&&(
        <Modal onClose={()=>setEditId(null)}>
          <h3 style={{margin:"0 0 16px",fontSize:20,fontWeight:800}}>Rename List</h3>
          <input value={editName} onChange={e=>setEditName(e.target.value)}
            style={{display:"block",width:"100%",padding:"11px 13px",border:`1.5px solid ${C.border}`,
              borderRadius:10,fontSize:14,fontFamily:"inherit",outline:"none",
              boxSizing:"border-box",marginBottom:20}}/>
          <div style={{display:"flex",gap:12}}>
            <button onClick={()=>setEditId(null)}
              style={btn({flex:1,padding:"12px",border:`1.5px solid ${C.border}`,
                borderRadius:12,background:C.white,fontWeight:600,fontSize:14})}>Cancel</button>
            <button onClick={()=>{setLists(l=>l.map(x=>x.id===editId?{...x,name:editName}:x));setEditId(null);}}
              style={btn({flex:2,padding:"12px",background:`linear-gradient(90deg,${C.teal},#0d9488)`,
                border:"none",borderRadius:12,color:C.white,fontWeight:700,fontSize:14})}>Save</button>
          </div>
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteId&&(
        <Modal onClose={()=>setDeleteId(null)}>
          <h3 style={{margin:"0 0 10px",fontSize:20,fontWeight:800}}>Delete List?</h3>
          <p style={{color:C.gray,fontSize:13,margin:"0 0 24px"}}>This action cannot be undone.</p>
          <div style={{display:"flex",gap:12}}>
            <button onClick={()=>setDeleteId(null)}
              style={btn({flex:1,padding:"12px",border:`1.5px solid ${C.border}`,
                borderRadius:12,background:C.white,fontWeight:600,fontSize:14})}>Cancel</button>
            <button onClick={()=>{setLists(l=>l.filter(x=>x.id!==deleteId));setDeleteId(null);}}
              style={btn({flex:2,padding:"12px",background:C.red,border:"none",
                borderRadius:12,color:C.white,fontWeight:700,fontSize:14})}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN 4 — Dashboard
═══════════════════════════════════════════════════════════════════════════ */
const ALL_ACCOUNTS=[
  {id:1,company:"Tech Solution Inc.",industry:"Manufacturing",location:"Austin, TX",installed:"RedHat OpenShift, IBM Cloud",product:"Watson",intent:85,fit:92,why:"Heavy JIRA usage signals DevOps toolchain expansion and cloud-native migration initiative."},
  {id:2,company:"Global Enterprises",industry:"Finance",location:"Dallas, TX",installed:"Watson AI, IBM Cloud",product:"api connect",intent:78,fit:80,why:"Power BI footprint indicates appetite for deeper data integration and API management."},
  {id:3,company:"Horizon",industry:"Media & Internet",location:"Miami, FL",installed:"IBM Cloud, OpenShift",product:"Apptio",intent:92,fit:84,why:"Heavy JIRA usage signals DevOps transformation; TBM maturity warrants Apptio pitch."},
  {id:4,company:"Global Enterprises",industry:"Agriculture",location:"Atlanta, GA",installed:"Hybrid Cloud",product:"api connect",intent:85,fit:79,why:"Power BI footprint indicates modernization budget; hybrid workloads need API layer."},
  {id:5,company:"Tech Solution Inc.",industry:"Hospitals & Clinics",location:"Chicago, IL",installed:"Microsoft Power BI",product:"Watson",intent:76,fit:92,why:"Heavy JIRA usage signals DevOps focus; healthcare AI use-cases align with Watson."},
  {id:6,company:"Tech Solution Inc.",industry:"Hospitals & Clinics",location:"Chicago, IL",installed:"Oracle Java",product:"Apptio",intent:71,fit:83,why:"Power BI footprint indicates mature BI stack; Apptio extends financial governance."},
  {id:7,company:"MedCare Systems",industry:"Hospitals & Clinics",location:"Houston, TX",installed:"RedHat OpenShift",product:"Watson",intent:88,fit:90,why:"RedHat base with active data integration intent — strong Watson AI fit."},
  {id:8,company:"HealthFirst Solutions",industry:"Hospitals & Clinics",location:"Dallas, TX",installed:"RedHat OpenShift",product:"Watson",intent:82,fit:87,why:"Data integration signals align with Watson Health roadmap."},
  {id:9,company:"LoneStar HealthTech",industry:"Hospitals & Clinics",location:"Austin, TX",installed:"RedHat OpenShift",product:"Watson",intent:80,fit:85,why:"Strong RedHat footprint and DevOps signals support Watson adoption."},
  {id:10,company:"Pinnacle Finance",industry:"Finance",location:"New York, NY",installed:"IBM Cloud",product:"Apptio",intent:74,fit:81,why:"Cloud cost complexity growing; Apptio TBM fits enterprise finance team."},
  {id:11,company:"RetailEdge Co.",industry:"Retail",location:"Seattle, WA",installed:"Microsoft Power BI",product:"api connect",intent:67,fit:76,why:"Omnichannel integration needs an API management layer."},
  {id:12,company:"AgriSmart LLC",industry:"Agriculture",location:"Kansas City, MO",installed:"Hybrid Cloud",product:"Watson",intent:70,fit:78,why:"Precision agriculture AI use-cases align with Watson platform capabilities."},
];

const FILTER_OPTIONS={
  Products:["Watson","api connect","Apptio","RedHat OpenShift","IBM Cloud"],
  Geography:["Texas","Illinois","Georgia","Florida","New York","Washington","Missouri"],
  Industries:["Manufacturing","Finance","Media & Internet","Agriculture","Hospitals & Clinics","Retail"],
  "Client type":["SMB","Mid-Market","Enterprise"],
  "Installed Products":["RedHat OpenShift","IBM Cloud","Watson AI","Microsoft Power BI","Oracle Java","Hybrid Cloud"],
  "Intent Topic":["DevOps","Data Integration","Cloud Migration","AI/ML","API Management","FinOps"],
  "Report type":["All Accounts","High Intent","At-Risk","Renewal Soon"],
};

const AI_RESPONSES={
  "top upsells":"Here are your top upsell opportunities:\n• Watson → Tech Solution Inc. (Austin, TX) — Intent 85\n• Apptio → Horizon (Miami, FL) — Intent 92\n• api connect → Global Enterprises (Atlanta, GA) — Intent 85",
  "net new account expansion":"Recommended net-new accounts to target:\n• MedCare Systems, Houston TX — Healthcare / RedHat\n• LoneStar HealthTech, Austin TX — Healthcare / RedHat\n• Pinnacle Finance, New York NY — Finance / IBM Cloud",
  "renewal alerts":"⚠️ Renewal alerts (next 60 days):\n• Tech Solution Inc. — Oracle Java (Chicago, IL)\n• Global Enterprises — Watson AI (Dallas, TX)\n• RetailEdge Co. — Power BI (Seattle, WA)",
  "at-risk accounts":"🔴 At-risk accounts needing attention:\n• RetailEdge Co. — Low intent score (67) signals disengagement\n• AgriSmart LLC — Intent declined 12 pts this quarter\n• Pinnacle Finance — Renewal in 30 days, no recent activity",
};

const PAGE_SIZE=6;

function Dashboard({onBack,listName,onLogout}){
  const [activeFilters,setActiveFilters]=useState({});
  const [openFilter,setOpenFilter]=useState(null);
  const [search,setSearch]=useState("");
  const [page,setPage]=useState(1);
  const [chat,setChat]=useState([
    {role:"ai",text:"Apply filters to load your results. I'll immediately surface key insights and recommended actions for your accounts."}
  ]);
  const [chatInput,setChatInput]=useState("");
  const [downloadOpen,setDownloadOpen]=useState(false);
  const [downloadPurpose,setDownloadPurpose]=useState("");
  const [customPurpose,setCustomPurpose]=useState("");
  const [downloadDone,setDownloadDone]=useState(false);
  const [expandRow,setExpandRow]=useState(null);
  const [listDropOpen,setListDropOpen]=useState(false);
  const [filtersApplied,setFiltersApplied]=useState(false);
  const chatRef=useRef();

  const filtered=ALL_ACCOUNTS.filter(a=>{
    const q=search.toLowerCase();
    if(q&&!a.company.toLowerCase().includes(q)&&!a.industry.toLowerCase().includes(q)&&!a.location.toLowerCase().includes(q))return false;
    if(activeFilters.Industries?.length&&!activeFilters.Industries.includes(a.industry))return false;
    if(activeFilters["Installed Products"]?.length&&!activeFilters["Installed Products"].some(ip=>a.installed.includes(ip)))return false;
    if(activeFilters.Products?.length&&!activeFilters.Products.includes(a.product))return false;
    if(activeFilters.Geography?.length&&!activeFilters.Geography.some(g=>a.location.includes(g)))return false;
    return true;
  });

  const totalPages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const pageData=filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);

  useEffect(()=>{ chatRef.current?.scrollTo(0,chatRef.current.scrollHeight); },[chat]);

  const toggleFilter=(group,val)=>{
    setActiveFilters(f=>{
      const prev=f[group]||[];
      const next=prev.includes(val)?prev.filter(x=>x!==val):[...prev,val];
      return {...f,[group]:next};
    });
    setFiltersApplied(false);
  };

  const clearAll=()=>{ setActiveFilters({}); setFiltersApplied(false); setPage(1); };

  const applyFilter=()=>{
    setPage(1); setFiltersApplied(true);
    const summary=Object.entries(activeFilters).filter(([,v])=>v.length).map(([k,v])=>`${k}: ${v.join(", ")}`).join(" | ");
    const count=Object.values(activeFilters).flat().length;
    setChat(h=>[...h,{role:"ai",text:count?`Filters applied — ${summary}.\n\nShowing ${filtered.length} matching account${filtered.length!==1?"s":""}.`:"Filters cleared. Showing all accounts."}]);
  };

  const sendChat=()=>{
    const text=chatInput.trim(); if(!text)return;
    setChat(h=>[...h,{role:"user",text}]); setChatInput("");
    const key=text.toLowerCase();
    const reply=Object.entries(AI_RESPONSES).find(([k])=>key.includes(k))?.[1]
      ||`Searching for "${text}"...\n\nFound ${Math.floor(Math.random()*5)+2} matching accounts. Use the filters on the left to refine results further.`;
    setTimeout(()=>setChat(h=>[...h,{role:"ai",text:reply}]),600);
  };

  const applySuggestedFilter=(chip)=>{
    if(chip.includes("Microsoft Office")) toggleFilter("Installed Products","Microsoft Power BI");
    else if(chip.includes("Manufacturing")) toggleFilter("Industries","Manufacturing");
    else if(chip.includes("Renewing")) toggleFilter("Report type","Renewal Soon");
    else if(chip.includes("Apptio")) toggleFilter("Products","Apptio");
  };

  const doDownload=()=>{
    if(!downloadPurpose&&!customPurpose.trim())return;
    setDownloadDone(true);
    setTimeout(()=>{setDownloadOpen(false);setDownloadDone(false);setDownloadPurpose("");setCustomPurpose("");},1400);
  };

  const hasActiveFilters=Object.values(activeFilters).some(v=>v.length>0);
  const activeCount=Object.values(activeFilters).flat().length;

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",fontFamily:"inherit"}}>
      <Topnav onLogout={onLogout} right={
        <div style={{position:"relative"}}>
          <button onClick={()=>setListDropOpen(o=>!o)}
            style={btn({display:"flex",alignItems:"center",gap:8,background:C.white,
              border:`1.5px solid ${C.border}`,borderRadius:10,padding:"6px 14px",
              fontSize:13,fontWeight:600,color:C.dark})}>
            {listName||"My List"} <IChevD size={14} color={C.gray}/>
          </button>
          {listDropOpen&&(
            <div style={{position:"absolute",top:42,left:0,background:C.white,
              border:`1px solid ${C.border}`,borderRadius:12,
              boxShadow:"0 8px 24px rgba(0,0,0,0.1)",zIndex:100,minWidth:190,padding:"6px 0"}}>
              {["Q1 Finance Targets","PAM Prospects - East Coast","Renewal Risk Accounts"].map(n=>(
                <button key={n} onClick={()=>setListDropOpen(false)}
                  style={btn({width:"100%",textAlign:"left",padding:"9px 16px",fontSize:13,background:"none",color:C.dark})}>
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      }/>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Sidebar */}
        <aside style={{width:196,background:C.white,borderRight:`1px solid ${C.border}`,
          padding:"16px 0",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
          <div style={{padding:"0 14px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontWeight:700,fontSize:13}}>Filters</span>
              {activeCount>0&&<span style={{background:C.teal,color:C.white,borderRadius:999,
                fontSize:11,fontWeight:700,padding:"1px 7px"}}>{activeCount}</span>}
            </div>
            {hasActiveFilters&&(
              <span onClick={clearAll} style={{color:C.teal,fontSize:12,cursor:"pointer",fontWeight:600}}>Clear all</span>
            )}
          </div>
          {Object.entries(FILTER_OPTIONS).map(([group,opts])=>(
            <div key={group}>
              <button onClick={()=>setOpenFilter(o=>o===group?null:group)}
                style={btn({display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"9px 14px",background:"none",width:"100%",fontSize:13,color:C.dark,
                  fontWeight:activeFilters[group]?.length?"700":"400"})}>
                <span>{group}{activeFilters[group]?.length?` (${activeFilters[group].length})`:""}</span>
                {openFilter===group?<IChevU size={13} color={C.gray}/>:<IChevD size={13} color={C.gray}/>}
              </button>
              {openFilter===group&&(
                <div style={{padding:"4px 14px 8px",display:"flex",flexDirection:"column",gap:5}}>
                  {opts.map(o=>{
                    const on=(activeFilters[group]||[]).includes(o);
                    return(
                      <label key={o} style={{display:"flex",alignItems:"center",gap:8,fontSize:12,
                        cursor:"pointer",color:on?C.teal:C.dark,fontWeight:on?600:400}}>
                        <input type="checkbox" checked={on} onChange={()=>toggleFilter(group,o)}
                          style={{accentColor:C.teal}}/>{o}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div style={{marginTop:"auto",padding:"12px 14px"}}>
            <button onClick={applyFilter}
              style={btn({width:"100%",padding:"11px",background:`linear-gradient(90deg,${C.teal},#0d9488)`,
                color:C.white,borderRadius:10,fontWeight:700,fontSize:13})}>
              Apply Filter
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{flex:1,padding:"18px 20px",overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <button onClick={onBack}
                style={btn({width:34,height:34,borderRadius:999,border:`1.5px solid ${C.border}`,
                  background:C.white,display:"flex",alignItems:"center",justifyContent:"center"})}>
                <IArrowL size={14} color={C.dark}/>
              </button>
              <div>
                <div style={{fontSize:12,color:C.gray}}>Hi Medha,</div>
                <h2 style={{margin:0,fontWeight:800,fontSize:18}}>Welcome to TD Synnex</h2>
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div style={{display:"flex",gap:12}}>
            <KpiCard color="purple" value="23" label="Accounts Renewing in next 60 days" icon={<IStar size={20} color={C.white}/>}/>
            <KpiCard color="teal" value="42" label="Office User without Power BI" icon={<IList size={20} color={C.white}/>}/>
            <KpiCard color="olive" value="3.2x" label="Higher Watson Adoption for JIRA User" icon={<IArrowR size={20} color={C.white}/>}/>
          </div>

          {/* Table */}
          <div style={{background:C.white,borderRadius:16,padding:"18px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{margin:0,fontWeight:800,fontSize:15}}>Existing Customers</h3>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                {!filtersApplied&&hasActiveFilters&&(
                  <span style={{fontSize:11,color:C.gray,fontStyle:"italic"}}>Click "Apply Filter" to update</span>
                )}
                <div style={{position:"relative"}}>
                  <div style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
                    <ISearch size={13} color={C.gray}/>
                  </div>
                  <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Search"
                    style={{padding:"7px 12px 7px 28px",border:`1.5px solid ${C.border}`,
                      borderRadius:8,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
                </div>
              </div>
            </div>

            {pageData.length===0?(
              <div style={{textAlign:"center",padding:"40px 0",color:C.gray,fontSize:13}}>
                No accounts match the current filters.{" "}
                <span onClick={clearAll} style={{color:C.teal,cursor:"pointer",fontWeight:600}}>Clear filters</span>
              </div>
            ):(
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead>
                    <tr>
                      {["Company","Industry","Location","Installed Product","Product","Intent","Fit","Why"].map(h=>(
                        <th key={h} style={{padding:"8px 10px",textAlign:"left",color:C.gray,
                          fontWeight:600,borderBottom:`1.5px solid #F1F5F9`,whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map(a=>(
                      <tr key={a.id} style={{borderBottom:`1px solid #F8FAFC`}}>
                        <td style={{padding:"11px 10px",fontWeight:600,color:C.dark}}>{a.company}</td>
                        <td style={{padding:"11px 10px",color:C.gray}}>{a.industry}</td>
                        <td style={{padding:"11px 10px",color:C.gray,whiteSpace:"nowrap"}}>{a.location}</td>
                        <td style={{padding:"11px 10px",color:C.gray,maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.installed}</td>
                        <td style={{padding:"11px 10px",color:C.dark,fontWeight:500}}>{a.product}</td>
                        <td style={{padding:"11px 10px"}}><Score v={a.intent}/></td>
                        <td style={{padding:"11px 10px"}}><Score v={a.fit}/></td>
                        <td style={{padding:"11px 10px",color:C.gray,maxWidth:160}}>
                          {expandRow===a.id?a.why:a.why.slice(0,38)+"..."}
                          {" "}<span onClick={()=>setExpandRow(r=>r===a.id?null:a.id)}
                            style={{color:C.teal,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>
                            {expandRow===a.id?"Less":"More"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination + Download */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <button onClick={()=>setDownloadOpen(true)}
              style={btn({display:"flex",alignItems:"center",gap:7,background:C.white,
                border:`1.5px solid ${C.border}`,borderRadius:10,padding:"9px 16px",
                fontSize:13,fontWeight:600,color:C.dark})}>
              <IDL size={14} color={C.dark}/> Download Report
            </button>
            <div style={{fontSize:13,color:C.gray,display:"flex",alignItems:"center",gap:8}}>
              Showing {pageData.length} of {filtered.length}
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                style={btn({width:28,height:28,borderRadius:6,border:`1.5px solid ${C.border}`,
                  background:C.white,display:"flex",alignItems:"center",justifyContent:"center",
                  opacity:page===1?.4:1})}>
                <IArrowL size={12} color={C.gray}/>
              </button>
              <span style={{fontSize:12,fontWeight:600,minWidth:36,textAlign:"center"}}>{page} / {totalPages}</span>
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
                style={btn({width:28,height:28,borderRadius:6,border:`1.5px solid ${C.border}`,
                  background:C.white,display:"flex",alignItems:"center",justifyContent:"center",
                  opacity:page===totalPages?.4:1})}>
                <IArrowR size={12} color={C.gray}/>
              </button>
            </div>
          </div>
        </main>

        {/* AI Panel */}
        <aside style={{width:286,background:C.teal,display:"flex",flexDirection:"column",flexShrink:0}}>
          <div style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,0.15)",
            display:"flex",alignItems:"center",gap:8}}>
            <IStar size={17} color={C.white}/>
            <span style={{fontWeight:800,color:C.white,fontSize:14}}>TD AI Guide</span>
          </div>

          {/* Suggested filters strip */}
          {chat.length===1&&(
            <div style={{padding:"12px 14px 0"}}>
              <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.65)",
                letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Suggested Starting Filters</div>
              {["Installed Product: Microsoft Office","Industry: Manufacturing","Renewal: Renewing Soon","Upsell: Apptio"].map(chip=>(
                <button key={chip} onClick={()=>applySuggestedFilter(chip)}
                  style={btn({display:"block",width:"100%",marginBottom:6,
                    background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.22)",
                    borderRadius:9,color:C.white,padding:"8px 11px",fontSize:12,textAlign:"left"})}>
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Chat messages */}
          <div ref={chatRef} style={{flex:1,overflowY:"auto",padding:"12px 13px",
            display:"flex",flexDirection:"column",gap:9}}>
            {chat.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div style={{background:m.role==="user"?C.tealL:C.white,
                  color:m.role==="user"?C.white:C.dark,borderRadius:10,padding:"9px 12px",
                  fontSize:12,maxWidth:"88%",lineHeight:1.65,whiteSpace:"pre-line",
                  boxShadow:m.role==="ai"?"0 2px 6px rgba(0,0,0,0.08)":"none"}}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick-action pills */}
          <div style={{padding:"6px 12px",display:"flex",flexWrap:"wrap",gap:5}}>
            {Object.keys(AI_RESPONSES).map(k=>(
              <button key={k} onClick={()=>{ setChatInput(k); }}
                style={btn({background:"rgba(255,255,255,0.13)",border:"1px solid rgba(255,255,255,0.26)",
                  color:C.white,borderRadius:999,padding:"4px 10px",fontSize:11})}>
                {k.replace(/^\w/,c=>c.toUpperCase())}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,0.15)",display:"flex",gap:7}}>
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask me anything"
              style={{flex:1,padding:"9px 11px",borderRadius:9,border:"none",
                fontSize:12,fontFamily:"inherit",outline:"none"}}/>
            <button onClick={sendChat}
              style={btn({width:34,height:34,borderRadius:9,background:"rgba(255,255,255,0.18)",
                border:"none",display:"flex",alignItems:"center",justifyContent:"center"})}>
              <ISend size={14} color={C.white}/>
            </button>
          </div>
        </aside>
      </div>

      {/* Download Modal */}
      {downloadOpen&&(
        <Modal onClose={()=>setDownloadOpen(false)}>
          <h3 style={{margin:"0 0 4px",fontSize:20,fontWeight:800}}>Report Usage Details</h3>
          <p style={{color:C.gray,fontSize:13,margin:"0 0 18px"}}>Please indicate how this report will be used</p>
          <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Purpose of download</div>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {["Account Targeting & Prioritization","Opportunity / Pipeline Planning",
              "Internal Review / Management Reporting","Customer Engagement Preparation",
              "Data Analysis & Offline Review"].map(p=>(
              <label key={p} style={{display:"flex",alignItems:"center",gap:10,fontSize:13,
                cursor:"pointer",color:downloadPurpose===p?C.teal:C.dark,
                fontWeight:downloadPurpose===p?700:400}}>
                <input type="radio" name="dl" value={p} checked={downloadPurpose===p}
                  onChange={()=>{setDownloadPurpose(p);setCustomPurpose("");}}
                  style={{accentColor:C.teal}}/>{p}
              </label>
            ))}
            <label style={{display:"flex",alignItems:"center",gap:10,fontSize:13,
              cursor:"pointer",color:downloadPurpose==="other"?C.teal:C.dark}}>
              <input type="radio" name="dl" value="other" checked={downloadPurpose==="other"}
                onChange={()=>setDownloadPurpose("other")} style={{accentColor:C.teal}}/> Other:
              <input value={customPurpose} onChange={e=>setCustomPurpose(e.target.value)}
                onFocus={()=>setDownloadPurpose("other")}
                placeholder="e.g. Marketing Campaign Planning"
                style={{flex:1,padding:"5px 9px",border:`1.5px solid ${C.border}`,
                  borderRadius:8,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
            </label>
          </div>
          <p style={{color:C.teal,fontSize:12,margin:"14px 0 0"}}>
            This helps us improve reporting capabilities and ensure responsible data usage.
          </p>
          <div style={{display:"flex",gap:12,marginTop:18}}>
            <button onClick={()=>setDownloadOpen(false)}
              style={btn({flex:1,padding:"11px",border:`1.5px solid ${C.border}`,
                borderRadius:12,background:C.white,fontWeight:600,fontSize:13})}>Cancel</button>
            <button onClick={doDownload}
              disabled={!downloadPurpose&&!customPurpose.trim()}
              style={btn({flex:2,padding:"11px",
                background:(!downloadPurpose&&!customPurpose.trim())?"#9CA3AF":`linear-gradient(90deg,${C.teal},#0d9488)`,
                border:"none",borderRadius:12,color:C.white,fontWeight:700,fontSize:13,
                display:"flex",alignItems:"center",justifyContent:"center",gap:6,
                cursor:(!downloadPurpose&&!customPurpose.trim())?"not-allowed":"pointer"})}>
              {downloadDone?<><ICheck size={15} color={C.white}/> Downloaded!</>:<><IDL size={15} color={C.white}/> Download Report</>}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function App(){
  const [screen,setScreen]=useState("signin");
  const [selectedList,setSelectedList]=useState(null);

  return(
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",fontSize:14}}>
      {screen==="signin"    && <SignIn onSignIn={()=>setScreen("home")} onCreateAccount={()=>setScreen("create")}/>}
      {screen==="create"    && <CreateAccount onBack={()=>setScreen("signin")} onCreated={()=>setScreen("home")}/>}
      {screen==="home"      && <Home onLogout={()=>setScreen("signin")} onSelect={id=>{ if(id==="mylist")setScreen("mylist"); else{setSelectedList(null);setScreen("dashboard");} }}/>}
      {screen==="mylist"    && <MyLists onBack={()=>setScreen("home")} onLogout={()=>setScreen("signin")} onOpen={l=>{setSelectedList(l);setScreen("dashboard");}}/>}
      {screen==="dashboard" && <Dashboard onBack={()=>setScreen("mylist")} onLogout={()=>setScreen("signin")} listName={selectedList?.name}/>}
    </div>
  );
}
