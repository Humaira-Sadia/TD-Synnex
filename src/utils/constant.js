export const US_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

export const NET_NEW_DATA = [
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

export const EXPAND_DATA = [
  { id: 1, company: "Axiom Financial Services", industry: "Finance", location: "New York", installedProducts: "Microsoft Office, Jira Software", intentScore: 91, fitScore: 88, renewalDate: "Mar 15, 2025", lastActivity: "2 days ago", recommendedUpsell: "Watson", whyThis: "Heavy Jira usage signals DevOps maturity. Watson AIOps would reduce MTTR by est. 40%. Renewal approaching." },
  { id: 2, company: "TechBridge Manufacturing", industry: "Manufacturing", location: "Texas", installedProducts: "Oracle Java, Microsoft Power BI", intentScore: 85, fitScore: 82, renewalDate: "Apr 30, 2025", lastActivity: "1 week ago", recommendedUpsell: "API Connect", whyThis: "Power BI footprint indicates analytics investment. API Connect enables real-time data mesh they're evaluating." },
  { id: 3, company: "Northgate Hospital System", industry: "Hospitals & Physician Clinics", location: "Illinois", installedProducts: "Microsoft Office", intentScore: 79, fitScore: 77, renewalDate: "Jun 1, 2025", lastActivity: "3 days ago", recommendedUpsell: "Apptio", whyThis: "Single-product customer with high expansion potential. Apptio cost optimization aligns with budget pressure they've expressed." },
  { id: 4, company: "Crestwood Media Group", industry: "Media & Internet", location: "California", installedProducts: "JavaScript, Jira Software", intentScore: 74, fitScore: 71, renewalDate: "May 20, 2025", lastActivity: "5 days ago", recommendedUpsell: "Watson", whyThis: "Engineering-led account. Watson code assistant would accelerate their streaming platform dev roadmap." },
  { id: 5, company: "Prairie Harvest Farms", industry: "Agriculture", location: "Iowa", installedProducts: "Microsoft Office, Oracle Java", intentScore: 68, fitScore: 65, renewalDate: "Jul 15, 2025", lastActivity: "2 weeks ago", recommendedUpsell: "Apptio", whyThis: "Java infrastructure signals legacy modernization journey. Apptio IT financial management closes visibility gap." },
  { id: 6, company: "Emerald City Finance", industry: "Finance", location: "Washington", installedProducts: "Microsoft Power BI, Jira Software", intentScore: 65, fitScore: 70, renewalDate: "Aug 1, 2025", lastActivity: "1 week ago", recommendedUpsell: "API Connect", whyThis: "BI + DevOps combo suggests they're building internal data products. API Connect is natural next step." },
  { id: 7, company: "Ironworks Industrial", industry: "Manufacturing", location: "Pennsylvania", installedProducts: "Oracle Java, Microsoft Office", intentScore: 61, fitScore: 63, renewalDate: "Sep 10, 2025", lastActivity: "10 days ago", recommendedUpsell: "Watson", whyThis: "Manufacturing ops team evaluating AI for predictive maintenance. Watson ML fits stated use case." },
  { id: 8, company: "Coastal Health Network", industry: "Hospitals & Physician Clinics", location: "Florida", installedProducts: "JavaScript, Microsoft Power BI", intentScore: 57, fitScore: 60, renewalDate: "Oct 5, 2025", lastActivity: "3 weeks ago", recommendedUpsell: "Apptio", whyThis: "Power BI usage at dept level — Apptio enables enterprise-wide cost transparency for CFO initiatives." },
];

export const NET_NEW_INSIGHTS = [
  { icon: "🎯", value: "142", label: "High-intent prospects identified", color: "var(--blue)", bg: "var(--blue-pale2)" },
  { icon: "🏦", value: "Finance 38%", label: "Top industry by intent", color: "var(--green)", bg: "var(--green-pale)" },
  { icon: "📍", value: "Texas", label: "Fastest growing region", color: "var(--amber)", bg: "var(--amber-pale)" },
  { icon: "🔐", value: "PAM +62%", label: "Fastest rising intent topic", color: "#7c3aed", bg: "#f3e8ff" },
];

export const EXPAND_INSIGHTS = [
  { icon: "⏰", value: "23", label: "Accounts renewing in 60 days", color: "var(--red)", bg: "var(--red-pale)" },
  { icon: "📦", value: "42", label: "Office users without Power BI", color: "var(--blue)", bg: "var(--blue-pale2)" },
  { icon: "📈", value: "3.2x", label: "Higher Watson adoption for Jira users", color: "var(--green)", bg: "var(--green-pale)" },
  { icon: "💡", value: "API Connect", label: "Top expansion play this quarter", color: "var(--amber)", bg: "var(--amber-pale)" },
];

export const NET_NEW_BOT = [
  { from: "bot", text: "👋 Hi Sarah! I've analyzed the current market and found 142 high-intent prospects matching your criteria. Finance and Manufacturing sectors are showing the strongest buying signals this week." },
  { from: "user", text: "Which ones should I prioritize first?" },
  { from: "bot", text: "Based on intent score and fit score combined, I recommend starting with Meridian Health Systems (score 94) and Vertex Capital Group (88). Both have decision-makers actively researching your top products." },
  { from: "user", text: "Any insight on Meridian Health?" },
  { from: "bot", text: "Meridian has 3 senior stakeholders researching PAM solutions in the last 14 days. They have no current IBM relationship — this is a clean entry. I'd suggest leading with a security-focused Watson pitch. Want me to draft talking points?" },
];

export const EXPAND_BOT = [
  { from: "bot", text: "👋 Hi Sarah! 23 of your accounts are up for renewal within 60 days. Axiom Financial is the highest priority — renewal is March 15 and they're showing strong Watson upsell signals." },
  { from: "user", text: "Tell me more about the Axiom opportunity." },
  { from: "bot", text: "Axiom has heavy Jira usage (340+ seats) which signals DevOps maturity. Watson AIOps would reduce their MTTR by an estimated 40%. Their IT Director attended our AI webinar last week — strong timing." },
  { from: "user", text: "What's the best play for TechBridge?" },
  { from: "bot", text: "TechBridge is running Power BI across 5 departments, which tells us they're investing in data products. API Connect enables the real-time data mesh their CTO mentioned in a recent LinkedIn post. Contract renewal April 30 — ideal upsell window." },
];