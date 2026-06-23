import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    upper: [
      "NAME: SULTAN SHALAHUDDIN AL AYUBI",
      "ROLE: FULL-STACK DEVELOPER & DESIGNER",
      "FOCUS: WEB DEVELOPMENT & INTERACTIVE UI"
    ],
    lower: "informatics engineering student focused on building modern web applications. experienced in full-stack engineering, managing asset pipelines, and creating clean corporate profiles.",
  },
  {
    upper: [
      "FUN FACT — PERSONA SERIES:",
      "• PERSONA 3 INTRODUCED THE SOCIAL LINK SYSTEM",
      "• TARTARUS HAS 264 FLOORS TO CLIMB",
      "• THE EVOKER IS USED TO SUMMON A PERSONA",
      "• MEMENTO MORI — REMEMBER THAT YOU WILL DIE"
    ],
    lower: "persona 3 is set during the dark hour — a hidden 25th hour at midnight where shadows roam and ordinary humans become coffins. only evoker users can stay awake.",
  },
  {
    upper: [
      "CAREER & CONTACT:",
      "• INTERN @ PT GAMELAB INDONESIA (2024–2025)",
      "• EMAIL: SULTANSHALAHUDDIN01@GMAIL.COM",
      "• GITHUB: GITHUB.COM/GHOSTBUSTERPOPEYE",
      "• LINKEDIN: SULTAN-ALAYUBI-524760284"
    ],
    lower: "currently exploring new opportunities. open to collaborations, internships, and full-time roles in web development and design engineering. based in jember, indonesia.",
  },
];

const ROLES = [
  { text: "LEADER" },
  { text: "PARTY" },
  { text: "PARTY" },
];

const ITEMS = [
  {
    id: "about",
    label: "ABOUT ME",
    stats: [
      { tag: "UNI", value: "POLIJE", color: "#4a8fff" },
      { tag: "YR",  value: "2026",   color: "#53edff" },
    ],
  },
  {
    id: "funfact",
    label: "FUN FACT",
    stats: [
      { tag: "SRS", value: "P3",   color: "#4a8fff" },
      { tag: "HRS", value: "100+", color: "#53edff" },
    ],
  },
  {
    id: "career",
    label: "CAREER",
    stats: [
      { tag: "STS", value: "OPEN", color: "#22ff66" },
      { tag: "LOC", value: "JMB",  color: "#53edff" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive]     = useState(0);
  const [mounted, setMounted]   = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Ganti active dan tutup reveal dulu, lalu buka lagi agar animasi ulang
  const handleSelect = (index) => {
    if (index === active) {
      // Bar yang sama diklik/hover → toggle reveal
      setRevealed(prev => !prev);
    } else {
      // Bar beda → pindah active, tutup reveal dulu
      setRevealed(false);
      setActive(index);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        setRevealed(false);
        setActive(i => Math.max(0, i - 1));
      }
      if (e.key === "ArrowDown") {
        setRevealed(false);
        setActive(i => Math.min(ITEMS.length - 1, i + 1));
      }
      if (e.key === "Enter" || e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      {/* DIM overlay */}
      {revealed && <div className="sc-dim" />}

      {/* REVEAL PANEL */}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}

      {/* LB / RB NAV */}
      {revealed && (
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {/* PORTRAIT */}
      {revealed && (
        <div key={`portrait-${active}`} className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img className="sc-main-portrait" src={MAIN_IMAGES[active]} alt="" />
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
        }
        /* Bar harus bisa diklik meski parent pointer-events:none */
        .sc-bar-outer,
        .sc-bar-outer * {
          pointer-events: all;
        }

        /* ── DIM ── */
        .sc-dim {
          position: absolute; inset: 0;
          z-index: 12;
          background: rgba(40,45,54,0.68);
          pointer-events: none;
          animation: sc-dim-in 0.32s ease-out;
        }
        @keyframes sc-dim-in { from{opacity:0} to{opacity:1} }

        /* ── REVEAL PANEL ── */
        @keyframes sc-reveal-bar-in {
          0%   { opacity:0; transform:translateX(-120px) rotate(-20deg) scaleX(0.72); }
          60%  { opacity:0.96; transform:translateX(18px) rotate(-20deg) scaleX(1.03); }
          100% { opacity:0.92; transform:translateX(0) rotate(-20deg) scaleX(1); }
        }
        .sc-reveal-panel {
          position: absolute;
          top: 44vh; left: -6vw;
          width: 88vw; height: 60vh;
          z-index: 12;
          pointer-events: none;
          background: linear-gradient(180deg,rgba(255,255,255,0.98) 0%,rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0,100% 0,calc(100% - 88px) 100%,0 100%);
          box-shadow: 0 0 0 2px rgba(255,255,255,0.18),18px 0 0 rgba(215,13,44,0.82),28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22,1,0.36,1);
        }
        .sc-reveal-panel::before {
          content:"";
          position:absolute; top:0; left:0;
          width:100%; height:8px;
          background:linear-gradient(180deg,#e03d31 0%,#eb3333 100%);
          clip-path:inherit;
        }

        .sc-reveal-upper-bar {
          position:absolute;
          top:10%; left:0; width:100%; height:40%;
          background:rgba(0,0,0,0.92);
          clip-path:polygon(0 0,100% 0,calc(100% - 22px) 100%,0 100%);
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:10px; color:#fff; text-align:center;
        }
        .sc-reveal-upper-line {
          font-family:'Montserrat',sans-serif;
          font-weight:300; font-size:20px;
          letter-spacing:0.5px; line-height:1.15;
        }
        .sc-reveal-lower-bar {
          position:absolute;
          top:58%; right:0;
          width:48%; min-height:20%; max-height:34%;
          background:rgba(0,0,0,0.92);
          clip-path:polygon(0 0,100% 0,calc(100% - 22px) 100%,0 100%);
          display:flex; align-items:flex-start; justify-content:flex-start;
          color:#fff;
          font-family:'Montserrat',sans-serif;
          font-weight:300; font-size:18px;
          line-height:1.4; letter-spacing:0.4px;
          text-transform:lowercase;
          overflow-y:auto;
          padding:12px 18px 12px 22px;
        }

        /* ── LB/RB NAV ── */
        @keyframes sc-right-nav-pop {
          0%  {opacity:0;transform:scale(0.55) translateY(-10px)}
          65% {opacity:1;transform:scale(1.1) translateY(2px)}
          100%{opacity:1;transform:scale(1) translateY(0)}
        }
        @keyframes sc-arrow-left  {0%,100%{transform:translateX(0);opacity:1}50%{transform:translateX(-5px);opacity:.4}}
        @keyframes sc-arrow-right {0%,100%{transform:translateX(0);opacity:1}50%{transform:translateX(5px);opacity:.4}}

        .sc-right-nav {
          position:absolute; top:10vh; left:6vw;
          display:flex; align-items:center; gap:6px;
          pointer-events:none; z-index:14;
          transform:translateX(-40px) rotate(-20deg);
          transform-origin:left bottom;
          animation:sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family:'Bebas Neue',sans-serif;
          font-size:100px; letter-spacing:3px; line-height:1;
          color:#fff; -webkit-text-stroke:2px #000;
          paint-order:stroke fill; background:none; border:none; padding:0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width:16px;height:16px;border-radius:999px;
          background:#111;margin:0 10px;flex-shrink:0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family:'Bebas Neue',sans-serif;
          font-size:22px; color:#c4001a; display:inline-block;
        }
        .sc-right-nav .sc-nav-arrow.left  {animation:sc-arrow-left  0.8s ease-in-out infinite}
        .sc-right-nav .sc-nav-arrow.right {animation:sc-arrow-right 0.8s ease-in-out infinite}

        /* ── PORTRAIT ── */
        @keyframes sc-portrait-in {
          0%  {opacity:0;transform:translateX(78px) skewX(-8deg) scale(0.94);filter:blur(8px)}
          55% {opacity:.9;transform:translateX(-8px) skewX(-8deg) scale(1.015);filter:blur(0)}
          100%{opacity:.96;transform:translateX(0) skewX(-8deg) scale(1);filter:blur(0)}
        }
        .sc-main-portrait-shell {
          position:absolute; top:0; right:-3vw;
          z-index:13; pointer-events:none;
          width:43vw; height:100vh; overflow:hidden;
          opacity:0; transform:translateX(24px) skewX(-8deg) scale(0.98);
          transition:opacity .35s ease,transform .35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity:.96; transform:translateX(0) skewX(-8deg) scale(1);
          animation:sc-portrait-in 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .sc-main-portrait {
          width:100%;height:100%;
          object-fit:cover;object-position:top right;
          transform:skewX(8deg) scale(1.08);
          transform-origin:top right;
        }

        /* ── BARS ── */
        .sc-bar-outer {
          position:relative; flex-shrink:0;
          transform:translateX(-100%);
          transition:transform 0.55s cubic-bezier(0.22,1,0.36,1);
          cursor:pointer;
        }
        .sc-bar-outer.mounted  { transform:translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay:0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay:80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay:160ms; }

        .sc-bar {
          position:relative; width:45vw; height:64px;
          transition:height 0.25s cubic-bezier(0.22,1,0.36,1);
          background:#111;
          clip-path:polygon(0 0,100% 0,calc(100% - 14px) 100%,0 100%);
          box-shadow:0 6px 24px rgba(0,0,0,0.65); z-index:1;
        }
        .sc-bar-outer.active .sc-bar { height:90px; }

        .sc-bar-red {
          position:absolute; top:0; left:0;
          width:45vw; height:64px;
          background:#c4001a;
          clip-path:polygon(50% 0,100% 0,100% 100%,calc(50% - 10px) 100%);
          transform:translateY(-7px);
          opacity:0;
          transition:opacity 0.25s ease, height 0.25s cubic-bezier(0.22,1,0.36,1);
          z-index:0; pointer-events:none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity:1; height:90px; }

        .sc-bar-fill {
          position:absolute; inset:0; width:100%;
          background:#ffffff;
          clip-path:polygon(100% 0,100% 0,calc(100% - 32px) 100%,calc(100% - 32px) 100%);
          transition:clip-path 0.3s cubic-bezier(0.22,1,0.36,1);
          z-index:0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path:polygon(22% 0,100% 0,calc(100% - 14px) 100%,calc(22% + 138px) 100%);
        }

        .sc-bar-shade {
          position:absolute; top:0; bottom:0; left:73%; width:6%;
          background:linear-gradient(90deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0) 100%);
          z-index:1; pointer-events:none; opacity:0;
          transition:opacity 0.3s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity:1; }

        .sc-bar::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:6px;
          background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.55) 100%);
          z-index:10; pointer-events:none;
        }

        .sc-bar-content {
          position:relative; z-index:2; height:100%;
          display:flex; align-items:center;
          justify-content:space-between; padding:0 20px;
        }

        .sc-role {
          display:flex; align-items:center; flex-shrink:0;
          font-family:'Anton',sans-serif; font-size:50px;
          letter-spacing:-2px; color:#ffffff;
          transform:rotate(-30deg); user-select:none;
          line-height:1; padding:0 16px 0 8px;
        }

        .sc-main {
          flex:1; display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:3px; padding-left:78px;
        }

        .sc-label {
          font-family:'Bebas Neue',sans-serif;
          font-size:28px; letter-spacing:4px; line-height:1;
          color:rgba(255,255,255,0.85);
          transition:color 0.25s ease; user-select:none;
        }
        .sc-bar-outer.active .sc-label { color:#111111; }

        /* hint: klik untuk reveal */
        .sc-bar-hint {
          font-family:'Bebas Neue',sans-serif;
          font-size:11px; letter-spacing:3px;
          color:rgba(255,255,255,0.2);
          transition:color 0.25s ease;
          user-select:none;
          margin-top:2px;
        }
        .sc-bar-outer.active .sc-bar-hint { color:rgba(0,0,0,0.3); }

        .sc-char {
          position:absolute; top:0; left:110px;
          height:100%; width:auto; max-width:160px;
          object-fit:cover; object-position:top;
          pointer-events:none; z-index:3;
          clip-path:polygon(20px 0%,100% 0%,calc(100% - 20px) 100%,0% 100%);
        }

        /* ── FOOTER ── */
        .sc-footer {
          position:fixed; bottom:20px; right:28px;
          display:flex; flex-direction:column;
          align-items:flex-end; gap:5px;
          font-family:'Bebas Neue',sans-serif;
          z-index:14; opacity:0;
          transition:opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity:1; }
        .sc-footer-row {
          display:flex; align-items:center; gap:8px;
          font-size:13px; letter-spacing:2px;
          color:rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border:1px solid rgba(255,255,255,0.15);
          border-radius:3px; padding:1px 6px; font-size:11px;
        }

        /* ── MOBILE ── */
        .sc-mobile-controls { display:none; }
        .sc-mobile-btn {
          border:1px solid rgba(255,255,255,0.28);
          background:rgba(0,0,0,0.6); color:#fff;
          font-family:'Bebas Neue',sans-serif;
          letter-spacing:1.2px; font-size:13px;
          padding:7px 12px; border-radius:8px; min-width:86px;
        }

        @media (max-width: 768px) {
          .sc-main-portrait-shell { top:8vh;right:-9vw;width:46vw;height:44vh;z-index:13; }
          .sc-main-portrait { transform:none;object-position:center top; }
          .sc-reveal-panel {
            top:44vh!important;left:4vw!important;right:6vw!important;
            width:auto!important;height:50vh!important;z-index:14;
            transform:translateX(0) rotate(0deg)!important;
            clip-path:polygon(0 0,100% 0,calc(100% - 22px) 100%,0 100%);
          }
          .sc-reveal-panel.mounted { transform:translateX(0) rotate(0deg)!important; }
          .sc-reveal-upper-bar  { top:10%;height:46%;width:96%;left:2%; }
          .sc-reveal-upper-line { font-size:14px;line-height:1.1;padding:0 10px; }
          .sc-reveal-lower-bar  { top:62%;width:88%;bottom:8%;height:auto;max-height:none;font-size:13px;padding:8px 12px; }
          .sc-right-nav         { top:2vh;left:4vw;transform:translateX(0) rotate(-12deg); }
          .sc-footer            { display:none; }
          .sc-mobile-controls {
            position:fixed; left:8px; right:8px;
            bottom:max(8px,env(safe-area-inset-bottom));
            z-index:18; display:flex;
            align-items:center; justify-content:space-between;
            gap:8px; pointer-events:all;
          }
        }

        @media (min-width:769px) and (max-width:1200px) {
          .sc-main-portrait-shell { right:-6vw;width:44vw;height:92vh; }
          .sc-reveal-panel { top:46vh;left:-2vw;width:78vw;height:52vh;transform:translateX(0) rotate(-14deg); }
          .sc-reveal-panel.mounted { transform:translateX(0) rotate(-14deg); }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => handleSelect(i)}
            onMouseEnter={() => setActive(i)}  /* FIXED: selalu setActive, tidak cek active !== i */
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-label">{item.label}</div>
                  <div className="sc-bar-hint">
                    {active === i ? (revealed ? "CLICK TO HIDE" : "CLICK TO REVEAL") : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵ / →</span><span>REVEAL</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="sc-mobile-controls" aria-label="About mobile controls">
        <button className="sc-mobile-btn" type="button" onClick={() => navigate(-1)}>BACK</button>
        <button className="sc-mobile-btn" type="button" onClick={() => setRevealed(prev => !prev)}>
          {revealed ? "HIDE" : "REVEAL"}
        </button>
      </div>
    </div>
  );
}