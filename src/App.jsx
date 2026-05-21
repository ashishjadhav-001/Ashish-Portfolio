import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ── EmailJS config — replace with your actual values from emailjs.com ──
const EJ_SERVICE_ID  = "service_9u21ryq";
const EJ_TEMPLATE_ID = "template_1uqqxjk";
const EJ_PUBLIC_KEY  = "IpO475RHjsL4eOQEI";

const skills = {
  "Programming & Backend": { icon: "⚙️", color: "#00d4ff", items: ["Python", "OOP", "Data Structures", "Algorithms", "FastAPI", "REST APIs"] },
  "Machine Learning": { icon: "🤖", color: "#7c3aed", items: ["Scikit-learn", "XGBoost", "Model Training", "Feature Engineering", "Model Validation"] },
  "Deep Learning": { icon: "🧠", color: "#f59e0b", items: ["TensorFlow", "PyTorch", "CNN", "RNN", "LSTM", "Transformers"] },
  "Generative AI & NLP": { icon: "✨", color: "#10b981", items: ["LLMs", "RAG", "Hugging Face", "LangChain", "Text Embeddings", "Semantic Search", "Chatbots"] },
  "Databases": { icon: "🗄️", color: "#ef4444", items: ["MySQL", "MongoDB", "Vector Databases", "FAISS", "Pinecone", "ChromaDB"] },
  "Frontend": { icon: "🎨", color: "#ec4899", items: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Streamlit"] },
  "Cloud & Deployment": { icon: "☁️", color: "#06b6d4", items: ["AWS", "GCP", "API Integration", "Model Deployment"] },
  "Tools & Concepts": { icon: "🛠️", color: "#a78bfa", items: ["Git", "GitHub", "Data Preprocessing", "Hyperparameter Tuning", "AI Pipelines"] },
};

const projects = [
  { title: "Multi-Agent AI System", emoji: "🤖", color: "#00d4ff", tech: ["LangChain", "Streamlit", "BeautifulSoup", "Requests", "python-dotenv", "Render"], description: "A modular Multi-Agent AI System where multiple intelligent agents collaborate to perform tasks like searching, reading, and processing information — all through an interactive web interface.", github: "https://github.com/ashishjadhav-001/Multi-Agent-AI-System" },
  { title: "RAG Multi-Document Assistant", emoji: "📄", color: "#7c3aed", tech: ["Python", "Streamlit", "LangChain", "Mistral AI", "ChromaDB", "PyPDF", "dotenv"], description: "A powerful Retrieval-Augmented Generation (RAG) application that allows users to upload multiple PDF documents and ask questions. Retrieves relevant context and generates accurate answers using LLMs.", github: "https://github.com/ashishjadhav-001/RAG-Multi-Document-Assistant" },
  { title: "AI Object Detection (YOLOv8m)", emoji: "👁️", color: "#f59e0b", tech: ["Python", "YOLOv8m", "OpenCV", "Streamlit", "NumPy", "Pillow"], description: "A real-time computer vision application that detects objects from images and webcam input using the powerful YOLOv8m model. Demonstrates end-to-end Deep Learning, Computer Vision, and UI development.", github: "https://github.com/ashishjadhav-001/AI-object-detection-yolov8m" },
  { title: "AI Resume Screening System", emoji: "📋", color: "#10b981", tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "NLTK", "TF-IDF", "Cosine Similarity", "FastAPI"], description: "An end-to-end ML application that evaluates resumes against job descriptions using NLP. Mimics a real-world ATS by providing similarity scores, skill matching, and missing skill insights.", github: "https://github.com/ashishjadhav-001/AI-resume-screening" },
];

const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

const stats = [
  { label: "Years Exp", value: 2, suffix: "+", icon: "🗓️", color: "#00d4ff" },
  { label: "Skill Sets", value: 8, suffix: "", icon: "⚡", color: "#7c3aed" },
  { label: "Technologies", value: 40, suffix: "+", icon: "🛠️", color: "#10b981" },
  { label: "AI/ML Projects", value: 12, suffix: "+", icon: "🤖", color: "#f59e0b" },
];

const TYPING_PHRASES = [
  "< AI / ML Engineer />",
  "< Building LLM Applications />",
  "< Generative AI Developer />",
  "< Deep Learning Engineer />",
  "< RAG & Chatbot Builder />",
];

function AnimatedCounter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let s = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          s += step;
          if (s >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(s));
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}</span>;
}

function TypingAnimation() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    const current = TYPING_PHRASES[phraseIdx];
    if (!isDeleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else { setIsPaused(true); }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else { setIsDeleting(false); setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length); }
    }
  }, [displayed, isDeleting, isPaused, phraseIdx]);
  return (
    <div className="typing-anim">
      <span>{displayed}</span>
      <span className="cursor-blink" />
    </div>
  );
}

function BrainIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <radialGradient id="bg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#7c3aed" />
        </radialGradient>
      </defs>
      <path d="M32 12 C24 12 16 18 16 26 C16 30 18 33 20 35 C17 36 14 39 14 43 C14 48 18 52 23 52 C25 52 27 51 28 50 L28 52 L36 52 L36 50 C37 51 39 52 41 52 C46 52 50 48 50 43 C50 39 47 36 44 35 C46 33 48 30 48 26 C48 18 40 12 32 12Z" fill="url(#bg2)" opacity="0.15" />
      <path d="M32 13 C24 13 17 19 17 27 C17 31 19 34 21 36 C18 37.5 15 40.5 15 44 C15 49 19 53 24 53 C26 53 28 52 29 51" stroke="url(#bg2)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M32 13 C40 13 47 19 47 27 C47 31 45 34 43 36 C46 37.5 49 40.5 49 44 C49 49 45 53 40 53 C38 53 36 52 35 51" stroke="url(#bg2)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="32" y1="13" x2="32" y2="53" stroke="url(#bg2)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6"/>
      <path d="M24 24 Q20 28 22 33" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M20 38 Q18 42 21 46" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M40 24 Q44 28 42 33" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M44 38 Q46 42 43 46" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <circle cx="24" cy="24" r="2" fill="#00d4ff" opacity="0.9"/>
      <circle cx="22" cy="33" r="2" fill="#7c3aed" opacity="0.9"/>
      <circle cx="40" cy="24" r="2" fill="#00d4ff" opacity="0.9"/>
      <circle cx="42" cy="33" r="2" fill="#7c3aed" opacity="0.9"/>
      <circle cx="32" cy="32" r="2.5" fill="url(#bg2)" />
    </svg>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);

  const scrollToSection = (id) => {
    setActiveNav(id);
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus("sending");
    emailjs.send(
      EJ_SERVICE_ID,
      EJ_TEMPLATE_ID,
      {
        from_name:  formData.name,
        from_email: formData.email,
        message:    formData.message,
        to_email:   "jadhavash1406@gmail.com",
      },
      EJ_PUBLIC_KEY
    )
    .then(() => {
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch(() => {
      setFormStatus("error");
    });
  };

  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i * 37 + 7) % 100}%`, top: `${(i * 53 + 13) % 100}%`,
    width: `${3 + (i % 3) * 2}px`, height: `${3 + (i % 3) * 2}px`,
    background: i % 3 === 0 ? "#00d4ff33" : i % 3 === 1 ? "#7c3aed33" : "#10b98133",
    animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.3}s infinite alternate`,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#050a14", color: "#e2e8f0", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a1628; }
        ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 2px; }

        @keyframes float { from{transform:translateY(0) rotate(0deg);} to{transform:translateY(-16px) rotate(180deg);} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 16px #00d4ff33;} 50%{box-shadow:0 0 32px #00d4ff66;} }
        @keyframes gradient-shift { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
        @keyframes slide-in { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @keyframes brain-pulse { 0%,100%{filter:drop-shadow(0 0 5px #00d4ff66);} 50%{filter:drop-shadow(0 0 14px #7c3aedaa);} }
        @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-10px);} to{opacity:1;transform:translateY(0);} }

        /* Mobile menu overlay */
        .mobile-menu { position:fixed; top:64px; left:0; right:0; background:#050a14f5; backdrop-filter:blur(20px); border-bottom:1px solid #00d4ff15; padding:16px; display:flex; flex-direction:column; gap:4px; z-index:99; animation:fadeDown 0.2s ease-out; }
        .mobile-menu button { background:transparent; border:none; color:#94a3b8; padding:12px 16px; border-radius:10px; cursor:pointer; fontSize:15px; fontWeight:500; fontFamily:inherit; text-align:left; transition:all 0.2s; }
        .mobile-menu button:hover, .mobile-menu button.active { background:#00d4ff0d; color:#00d4ff; }

        /* Nav */
        .nav-link:hover { color:#00d4ff !important; background:#00d4ff0d !important; }
        .nav-link.active-nav { color:#00d4ff !important; background:#00d4ff12 !important; border-color:#00d4ff33 !important; }

        /* Cards */
        .skill-card:hover { transform:translateY(-4px) !important; }
        .skill-tag:hover { background:#00d4ff22 !important; border-color:#00d4ff !important; color:#00d4ff !important; }
        .project-card:hover { transform:translateY(-5px) !important; }
        .github-btn:hover { background:#00d4ff18 !important; border-color:#00d4ff88 !important; color:#00d4ff !important; }
        .stat-card:hover { transform:translateY(-3px) !important; }
        .contact-chip:hover { transform:translateY(-2px) !important; }
        .edu-card:hover { border-color:#f59e0b44 !important; transform:translateY(-4px) !important; }
        .send-btn:hover { opacity:0.88 !important; transform:translateY(-2px) !important; }
        .hero-resume-btn:hover { opacity:0.88 !important; transform:translateY(-2px) !important; }
        .hero-contact-btn:hover { border-color:#00d4ff55 !important; color:#00d4ff !important; transform:translateY(-2px) !important; }
        .form-input:focus { border-color:#00d4ff55 !important; outline:none !important; background:#0f1f38 !important; }

        /* Typing */
        .typing-anim { font-size:clamp(12px,3.5vw,18px); font-weight:600; color:#7c3aed; margin:14px 0 18px; font-family:'Space Mono',monospace; min-height:1.7em; display:flex; align-items:center; justify-content:center; gap:2px; animation:slide-in 0.7s ease-out 0.2s both; }
        .cursor-blink { display:inline-block; width:2px; height:1em; background:#7c3aed; margin-left:3px; animation:blink 0.8s step-start infinite; vertical-align:middle; flex-shrink:0; }

        /* Section label */
        .section-label { font-family:'Space Mono',monospace; font-size:11px; color:#00d4ff; letter-spacing:3px; margin-bottom:10px; }

        /* Responsive grids */
        .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:14px; }
        .projects-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:18px; }
        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:44px; }
        .contact-chips { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:22px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns:repeat(2,1fr); gap:10px; margin-top:32px; }
          .skills-grid { grid-template-columns:1fr; }
          .projects-grid { grid-template-columns:1fr; }
          .contact-chips { grid-template-columns:1fr; }
          .form-row { grid-template-columns:1fr; gap:12px; }
          .exp-edu-grid { flex-direction:column !important; }
          .section-pad { padding:56px 18px !important; }
          .hero-pad { padding:90px 20px 48px !important; }
          .form-card { padding:24px 18px !important; }
          .contact-section { padding:56px 18px 72px !important; }
          .footer-inner { flex-direction:column; align-items:center; gap:8px; text-align:center; }
          .nav-desktop { display:none !important; }
          .hamburger { display:flex !important; }
          .exp-card { padding:20px !important; }
          .edu-inner { padding:20px !important; }
          .stat-num { font-size:26px !important; }
          .stat-label { font-size:9px !important; }
          .hero-btns { flex-direction:column; align-items:center; }
          .hero-btns a, .hero-btns button { width:100% !important; max-width:280px; }
          .proj-title { font-size:14px !important; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
          .stat-card-inner { padding:16px 10px 14px !important; }
          .stat-num { font-size:24px !important; }
          .typing-anim { font-size:11px; }
        }
      `}</style>

      {/* BG grid */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:`linear-gradient(#00d4ff07 1px,transparent 1px),linear-gradient(90deg,#00d4ff07 1px,transparent 1px)`, backgroundSize:"60px 60px" }} />
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}>
        {particles.map((p,i) => <div key={i} style={{ position:"absolute", borderRadius:"50%", pointerEvents:"none", ...p }} />)}
      </div>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"#050a14e8", backdropFilter:"blur(20px)", borderBottom:"1px solid #00d4ff10", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:9, background:"linear-gradient(135deg,#00d4ff,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:"#fff", animation:"pulse-glow 3s ease-in-out infinite", flexShrink:0 }}>AJ</div>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#00d4ff", letterSpacing:2 }}>ASHISH.DEV</span>
        </div>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display:"flex", gap:2 }}>
          {navItems.map(item => (
            <button key={item} className={`nav-link${activeNav===item?" active-nav":""}`} onClick={() => scrollToSection(item)} style={{ background:"transparent", border:"1px solid transparent", color:"#94a3b8", padding:"6px 13px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500, transition:"all 0.2s", fontFamily:"inherit" }}>{item}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(o=>!o)} style={{ display:"none", flexDirection:"column", gap:5, background:"transparent", border:"none", cursor:"pointer", padding:8 }}>
          <span style={{ width:22, height:2, background: menuOpen ? "#00d4ff" : "#94a3b8", borderRadius:2, transition:"all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ width:22, height:2, background: menuOpen ? "transparent" : "#94a3b8", borderRadius:2, transition:"all 0.2s" }} />
          <span style={{ width:22, height:2, background: menuOpen ? "#00d4ff" : "#94a3b8", borderRadius:2, transition:"all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(item => (
            <button key={item} className={activeNav===item?"active":""} onClick={() => scrollToSection(item)}>{item}</button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"90px 20px 48px", position:"relative", zIndex:1 }} className="hero-pad">
        <div style={{ maxWidth:720, width:"100%", textAlign:"center" }}>

          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#00d4ff08", border:"1px solid #00d4ff22", borderRadius:100, padding:"7px 16px 7px 9px", marginBottom:20, animation:"slide-in 0.6s ease-out" }}>
            <div style={{ animation:"brain-pulse 3s ease-in-out infinite", flexShrink:0 }}><BrainIcon size={26} /></div>
            <span style={{ fontSize:11, color:"#00d4ff", fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>AI / ML ENGINEER</span>
          </div>

          {/* Name */}
          <div style={{ animation:"slide-in 0.7s ease-out 0.1s both" }}>
            <p style={{ fontSize:"clamp(15px,3vw,20px)", color:"#94a3b8", fontWeight:500, marginBottom:2 }}>Hi, I'm</p>
            <h1 style={{ fontSize:"clamp(44px,10vw,88px)", fontWeight:900, lineHeight:1.05, letterSpacing:"-1px" }}>
              <span style={{ background:"linear-gradient(135deg,#00d4ff 0%,#7c3aed 50%,#10b981 100%)", backgroundSize:"200% 200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"gradient-shift 4s ease infinite" }}>Ashish</span>
              <br /><span style={{ color:"#e2e8f0" }}>Jadhav</span>
            </h1>
          </div>

          <TypingAnimation />

          <p style={{ fontSize:"clamp(13px,2.5vw,16px)", color:"#94a3b8", lineHeight:1.85, maxWidth:520, margin:"0 auto", animation:"slide-in 0.7s ease-out 0.3s both", padding:"0 4px" }}>
            Passionate about crafting end-to-end ML pipelines, Generative AI applications, and intelligent automation. Currently building at <strong style={{ color:"#00d4ff" }}>SDK Infotech Pvt. Ltd.</strong> with 2+ years of experience.
          </p>

          {/* Buttons */}
          <div className="hero-btns" style={{ display:"flex", gap:12, marginTop:28, justifyContent:"center", flexWrap:"wrap", animation:"slide-in 0.7s ease-out 0.4s both" }}>
            <a href="https://drive.google.com/file/d/1kkDtOaEo-05Ei0JcI4GX7QHAm0_Xu_dP/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="hero-resume-btn" style={{ background:"linear-gradient(135deg,#00d4ff,#7c3aed)", border:"2px solid transparent", color:"#fff", padding:"13px 0", borderRadius:12, cursor:"pointer", fontSize:14, fontWeight:700, transition:"all 0.25s", fontFamily:"inherit", boxShadow:"0 0 24px #00d4ff1a", textDecoration:"none", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, width:200 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </a>
            <button onClick={() => scrollToSection("Contact")} className="hero-contact-btn" style={{ background:"transparent", border:"2px solid #ffffff22", color:"#e2e8f0", padding:"13px 0", borderRadius:12, cursor:"pointer", fontSize:14, fontWeight:700, transition:"all 0.25s", fontFamily:"inherit", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, width:200 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              Contact Me
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map(stat => (
              <div key={stat.label} className="stat-card" style={{ background:"#0a1628", border:`1px solid ${stat.color}18`, borderRadius:16, transition:"all 0.3s", cursor:"default", position:"relative", overflow:"hidden", textAlign:"center" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${stat.color},transparent)` }} />
                <div className="stat-card-inner" style={{ padding:"18px 12px 14px" }}>
                  <div style={{ fontSize:16, marginBottom:4 }}>{stat.icon}</div>
                  <div className="stat-num" style={{ fontSize:30, fontWeight:900, fontFamily:"'Space Mono',monospace", color:stat.color, lineHeight:1 }}>
                    <AnimatedCounter target={stat.value} />{stat.suffix}
                  </div>
                  <div className="stat-label" style={{ fontSize:9, color:"#4b6080", marginTop:6, letterSpacing:1, fontFamily:"'Space Mono',monospace", lineHeight:1.4 }}>{stat.label.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:"72px 20px", position:"relative", zIndex:1 }} className="section-pad">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ marginBottom:40, textAlign:"center" }}>
            <div className="section-label">// 02. TECHNICAL EXPERTISE</div>
            <h2 style={{ fontSize:"clamp(26px,5vw,46px)", fontWeight:800 }}>Skills & <span style={{ color:"#7c3aed" }}>Technologies</span></h2>
          </div>
          <div className="skills-grid">
            {Object.entries(skills).map(([cat, { icon, color, items }]) => (
              <div key={cat} className="skill-card" onMouseEnter={() => setHoveredSkill(cat)} onMouseLeave={() => setHoveredSkill(null)} style={{ background:"#0a1628", border:`1px solid ${hoveredSkill===cat ? color+"44" : "#ffffff0d"}`, borderRadius:18, padding:"22px", transition:"all 0.3s", position:"relative", overflow:"hidden" }}>
                {hoveredSkill===cat && <div style={{ position:"absolute", top:-30, right:-30, width:80, height:80, borderRadius:"50%", background:color+"12", filter:"blur(24px)", pointerEvents:"none" }} />}
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:color+"14", border:`1px solid ${color}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{icon}</div>
                  <h3 style={{ fontSize:13, fontWeight:700, color:"#e2e8f0" }}>{cat}</h3>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {items.map(s => <span key={s} className="skill-tag" style={{ background:color+"0e", border:`1px solid ${color}20`, color, padding:"4px 10px", borderRadius:7, fontSize:11, fontWeight:600, transition:"all 0.2s", cursor:"default" }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:"72px 20px", position:"relative", zIndex:1 }} className="section-pad">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ marginBottom:40, textAlign:"center" }}>
            <div className="section-label">// 03. FEATURED WORK</div>
            <h2 style={{ fontSize:"clamp(26px,5vw,46px)", fontWeight:800 }}>My <span style={{ color:"#7c3aed" }}>Projects</span></h2>
          </div>
          <div className="projects-grid">
            {projects.map((proj, i) => (
              <div key={proj.title} className="project-card" onMouseEnter={() => setHoveredProject(i)} onMouseLeave={() => setHoveredProject(null)} style={{ background:"#0a1628", border:`1px solid ${hoveredProject===i ? proj.color+"44" : "#ffffff0d"}`, borderRadius:20, padding:"24px", transition:"all 0.3s", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${proj.color},transparent)`, opacity:hoveredProject===i?1:0.3, transition:"opacity 0.3s" }} />
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:46, height:46, borderRadius:12, background:proj.color+"14", border:`1px solid ${proj.color}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{proj.emoji}</div>
                  <h3 className="proj-title" style={{ fontSize:15, fontWeight:800, color:"#e2e8f0", lineHeight:1.35, paddingTop:2 }}>{proj.title}</h3>
                </div>
                <p style={{ color:"#8a9ab5", fontSize:13, lineHeight:1.75, flexGrow:1 }}>{proj.description}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {proj.tech.map(t => <span key={t} style={{ background:proj.color+"10", border:`1px solid ${proj.color}22`, color:proj.color, padding:"3px 9px", borderRadius:6, fontSize:10, fontWeight:700 }}>{t}</span>)}
                </div>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="github-btn" style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#ffffff08", border:"1px solid #ffffff14", borderRadius:9, padding:"9px 14px", textDecoration:"none", color:"#94a3b8", fontSize:12, fontWeight:600, transition:"all 0.2s", alignSelf:"flex-start" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  View on GitHub
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE & EDUCATION ── */}
      <section id="experience" style={{ padding:"72px 20px", position:"relative", zIndex:1 }} className="section-pad">
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ marginBottom:40, textAlign:"center" }}>
            <div className="section-label">// 04. WORK & EDUCATION</div>
            <h2 style={{ fontSize:"clamp(26px,5vw,46px)", fontWeight:800 }}>Experience & <span style={{ color:"#7c3aed" }}>Education</span></h2>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
            {/* Work */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:30, height:30, borderRadius:8, background:"#00d4ff14", border:"1px solid #00d4ff28", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>💼</div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#00d4ff", letterSpacing:2 }}>WORK EXPERIENCE</span>
              </div>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:15, top:0, bottom:0, width:2, background:"linear-gradient(to bottom,#00d4ff,#7c3aed,transparent)", borderRadius:2 }} />
                <div style={{ paddingLeft:44, position:"relative" }}>
                  <div style={{ position:"absolute", left:5, top:20, width:20, height:20, borderRadius:"50%", background:"linear-gradient(135deg,#00d4ff,#7c3aed)", border:"3px solid #050a14", animation:"pulse-glow 3s ease-in-out infinite" }} />
                  <div className="exp-card" style={{ background:"#0a1628", border:"1px solid #00d4ff18", borderRadius:18, padding:"24px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8, marginBottom:16 }}>
                      <div>
                        <h3 style={{ fontSize:"clamp(16px,4vw,19px)", fontWeight:800, color:"#e2e8f0" }}>AI / ML Engineer</h3>
                        <p style={{ color:"#00d4ff", fontWeight:600, fontSize:13, marginTop:3 }}>SDK Infotech Pvt. Ltd.</p>
                      </div>
                      <div style={{ background:"#00d4ff0e", border:"1px solid #00d4ff28", borderRadius:7, padding:"4px 10px", fontSize:11, fontFamily:"'Space Mono',monospace", color:"#00d4ff", whiteSpace:"nowrap" }}>2022 — Present</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      {["Developed and deployed end-to-end ML pipelines using FastAPI and cloud platforms.","Built RAG-based LLM applications with LangChain, FAISS, and ChromaDB.","Implemented deep learning models (CNN, LSTM, Transformers) for CV and NLP tasks.","Integrated vector databases for semantic search and recommendation systems.","Optimized model performance through hyperparameter tuning and feature engineering."].map((pt,i) => (
                        <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                          <span style={{ color:"#7c3aed", fontSize:13, lineHeight:1.6, flexShrink:0 }}>▸</span>
                          <p style={{ color:"#8a9ab5", fontSize:13, lineHeight:1.7 }}>{pt}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:16 }}>
                      {["Python","FastAPI","LangChain","AWS","GCP","PyTorch"].map(t => (
                        <span key={t} style={{ background:"#7c3aed12", border:"1px solid #7c3aed28", color:"#a78bfa", padding:"3px 9px", borderRadius:6, fontSize:11, fontWeight:700 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:30, height:30, borderRadius:8, background:"#f59e0b14", border:"1px solid #f59e0b28", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>🎓</div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#f59e0b", letterSpacing:2 }}>EDUCATION</span>
              </div>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:15, top:0, bottom:0, width:2, background:"linear-gradient(to bottom,#f59e0b,#ef444488,transparent)", borderRadius:2 }} />
                <div style={{ paddingLeft:44, position:"relative" }}>
                  <div style={{ position:"absolute", left:5, top:20, width:20, height:20, borderRadius:"50%", background:"linear-gradient(135deg,#f59e0b,#ef4444)", border:"3px solid #050a14" }} />
                  <div className="edu-card edu-inner" style={{ background:"#0a1628", border:"1px solid #f59e0b1a", borderRadius:18, padding:"24px", transition:"all 0.3s", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#f59e0b,transparent)" }} />
                    <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:18 }}>
                      <div style={{ width:48, height:48, borderRadius:12, background:"#f59e0b14", border:"1px solid #f59e0b28", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🎓</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <h3 style={{ fontSize:"clamp(15px,3.5vw,18px)", fontWeight:800, color:"#e2e8f0", lineHeight:1.3 }}>Bachelor of Computer Science</h3>
                        <p style={{ color:"#f59e0b", fontWeight:600, fontSize:13, marginTop:3, lineHeight:1.4 }}>Kavayitri Bahinabai Chaudhari North Maharashtra University</p>
                        <div style={{ marginTop:8 }}>
                          <div style={{ background:"#f59e0b0e", border:"1px solid #f59e0b28", borderRadius:7, padding:"4px 10px", fontSize:11, fontFamily:"'Space Mono',monospace", color:"#f59e0b", display:"inline-block" }}>2021 — 2024</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ background:"#ffffff05", borderRadius:10, padding:"14px 16px" }}>
                      <p style={{ fontSize:10, color:"#4b6080", fontFamily:"'Space Mono',monospace", letterSpacing:1, marginBottom:10 }}>CORE SUBJECTS</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {["Data Structures","Algorithms","Machine Learning","Database Systems","Computer Networks","OOP","Operating Systems"].map(s => (
                          <span key={s} style={{ background:"#f59e0b0e", border:"1px solid #f59e0b22", color:"#f59e0b", padding:"3px 9px", borderRadius:6, fontSize:10, fontWeight:600 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"72px 20px 88px", position:"relative", zIndex:1 }} className="contact-section">
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ marginBottom:40, textAlign:"center" }}>
            <div className="section-label">// 05. GET IN TOUCH</div>
            <h2 style={{ fontSize:"clamp(26px,5vw,46px)", fontWeight:800 }}>Let's <span style={{ color:"#7c3aed" }}>Connect</span></h2>
            <p style={{ color:"#4b6080", marginTop:10, fontSize:"clamp(13px,2vw,15px)", maxWidth:440, lineHeight:1.75, margin:"10px auto 0", padding:"0 8px" }}>Open to exciting AI/ML roles, freelance projects, and collaborations. Let's build something intelligent together.</p>
          </div>

          {/* Contact chips */}
          <div className="contact-chips">
            {[
              { icon:"✉️", label:"Email", value:"jadhavash1406@gmail.com", href:"mailto:jadhavash1406@gmail.com", color:"#00d4ff" },
              { icon:"💼", label:"LinkedIn", value:"ashish-jadhav-ds", href:"https://www.linkedin.com/in/ashish-jadhav-ds", color:"#0ea5e9" },
              { icon:"🐙", label:"GitHub", value:"ashishjadhav-001", href:"https://github.com/ashishjadhav-001", color:"#a78bfa" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-chip" style={{ background:"#0a1628", border:`1px solid ${c.color}18`, borderRadius:14, padding:"14px 16px", textDecoration:"none", display:"flex", alignItems:"center", gap:12, transition:"all 0.25s" }}>
                <div style={{ width:38, height:38, borderRadius:10, background:c.color+"14", border:`1px solid ${c.color}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{c.icon}</div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:10, color:"#4b6080", fontFamily:"'Space Mono',monospace", letterSpacing:1 }}>{c.label.toUpperCase()}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:c.color, marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Message form */}
          <div className="form-card" style={{ background:"#0a1628", border:"1px solid #00d4ff18", borderRadius:20, padding:"32px 36px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#00d4ff,#7c3aed,transparent)" }} />
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,#00d4ff22,#7c3aed22)", border:"1px solid #00d4ff28", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>✉️</div>
              <div>
                <h3 style={{ fontSize:"clamp(16px,3vw,20px)", fontWeight:800, color:"#e2e8f0" }}>Send a Message</h3>
                <p style={{ fontSize:12, color:"#4b6080", marginTop:2 }}>I usually respond within 24 hours</p>
              </div>
            </div>

            <div className="form-row">
              <div>
                <label style={{ fontSize:10, color:"#4b6080", fontFamily:"'Space Mono',monospace", letterSpacing:1.2, marginBottom:6, display:"block" }}>YOUR NAME</label>
                <input className="form-input" value={formData.name} onChange={e => setFormData(p=>({...p,name:e.target.value}))} placeholder="John Doe" style={{ background:"#0d1a2e", border:"1px solid #ffffff14", borderRadius:9, padding:"12px 14px", color:"#e2e8f0", fontSize:14, fontFamily:"inherit", transition:"all 0.2s", width:"100%" }} />
              </div>
              <div>
                <label style={{ fontSize:10, color:"#4b6080", fontFamily:"'Space Mono',monospace", letterSpacing:1.2, marginBottom:6, display:"block" }}>YOUR EMAIL</label>
                <input className="form-input" type="email" value={formData.email} onChange={e => setFormData(p=>({...p,email:e.target.value}))} placeholder="john@example.com" style={{ background:"#0d1a2e", border:"1px solid #ffffff14", borderRadius:9, padding:"12px 14px", color:"#e2e8f0", fontSize:14, fontFamily:"inherit", transition:"all 0.2s", width:"100%" }} />
              </div>
            </div>

            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:10, color:"#4b6080", fontFamily:"'Space Mono',monospace", letterSpacing:1.2, marginBottom:6, display:"block" }}>YOUR MESSAGE</label>
              <textarea className="form-input" value={formData.message} onChange={e => setFormData(p=>({...p,message:e.target.value}))} placeholder="Hi Ashish, I'd love to discuss an opportunity with you..." rows={5} style={{ background:"#0d1a2e", border:"1px solid #ffffff14", borderRadius:9, padding:"12px 14px", color:"#e2e8f0", fontSize:14, fontFamily:"inherit", transition:"all 0.2s", width:"100%", resize:"vertical" }} />
            </div>

            {formStatus==="sent" ? (
              <div style={{ background:"#10b98112", border:"1px solid #10b98130", borderRadius:10, padding:"14px", color:"#10b981", fontSize:14, fontWeight:600, textAlign:"center" }}>✅ Message sent! I'll get back to you soon.</div>
            ) : formStatus==="error" ? (
              <div style={{ background:"#ef444412", border:"1px solid #ef444430", borderRadius:10, padding:"14px", color:"#ef4444", fontSize:14, fontWeight:600, textAlign:"center" }}>❌ Something went wrong. Please email me directly at jadhavash1406@gmail.com</div>
            ) : (
              <button className="send-btn" onClick={handleSend} disabled={formStatus==="sending"} style={{ background:"linear-gradient(135deg,#00d4ff,#7c3aed)", border:"none", color:"#fff", padding:"14px 32px", borderRadius:11, cursor:"pointer", fontSize:14, fontWeight:700, fontFamily:"inherit", transition:"all 0.25s", display:"inline-flex", alignItems:"center", gap:8 }}>
                {formStatus==="sending"
                  ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:"spin 1s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>Sending...</>
                  : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Message</>
                }
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid #ffffff07", padding:"22px 20px", position:"relative", zIndex:1 }}>
        <div className="footer-inner" style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#243247" }}>© 2025 Ashish Jadhav · AI/ML Engineer</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#243247" }}>Built with ⚡ React</span>
        </div>
      </footer>
    </div>
  );
}
