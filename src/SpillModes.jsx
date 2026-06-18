import { useState, useEffect, useRef } from "react";

const C = {
  teal: "#0891B2", tealLight: "#E0F7FA",
  pink: "#EC4899", pinkLight: "#FCE4EC",
  purple: "#7C3AED", purpleLight: "#EDE9FE",
  yellow: "#F59E0B", yellowLight: "#FEF9C3",
  green: "#10B981", greenLight: "#D1FAE5",
  dark: "#1E293B", mid: "#64748B",
  white: "#FFFFFF", border: "rgba(0,0,0,0.08)",
  orange: "#EA580C",
};

const Btn = ({ children, onClick, bg = C.teal, color = C.white, style = {} }) => (
  <button onClick={onClick} style={{
    background: bg, color, border: "none", borderRadius: 14,
    padding: "14px 24px", fontFamily: "Nunito, sans-serif",
    fontSize: 15, fontWeight: 800, cursor: "pointer",
    width: "100%", transition: "transform 0.1s", ...style,
  }}
    onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
  >{children}</button>
);

// ── SPIN A PROMPT ──────────────────────────────────────────────
const ALL_PROMPTS = [
  { cat: "😂", label: "Make me laugh", prompts: [
    "Write a strongly worded letter to a food you hate.",
    "Describe your bedroom to an alien who has never seen one.",
    "What would your pet say about you if it could talk?",
    "Write a one-star review of school.",
    "Invent a new word for a feeling that doesn't have one yet.",
    "What would your brain say if it could text you right now?",
  ]},
  { cat: "🤔", label: "Make me think", prompts: [
    "What's something you changed your mind about recently?",
    "If your anxiety had a name and a personality, what would it be?",
    "What do you wish people understood about you?",
    "Describe yourself from the point of view of your best friend.",
    "What would you do if you weren't scared?",
    "What's something nobody knows about you?",
  ]},
  { cat: "💥", label: "I need to vent", prompts: [
    "What's something that happened recently that you're still annoyed about?",
    "Write the text you wish you could send but never will.",
    "What do you wish you could say out loud but can't?",
    "What's been building up that you haven't told anyone?",
    "Write a letter to someone who hurt you. You're not sending it.",
    "What's the thing you keep pushing down?",
  ]},
  { cat: "✨", label: "Good vibes only", prompts: [
    "What's something small that made you smile recently?",
    "Write about a place that makes you feel safe.",
    "Who is someone who genuinely makes things better?",
    "What's something you're actually good at?",
    "Describe the best version of tomorrow.",
    "What's a tiny thing you're looking forward to?",
  ]},
  { cat: "🌙", label: "Late night thoughts", prompts: [
    "What are you thinking about that you can't switch off?",
    "What do you wish you could say to your younger self?",
    "What does your ideal life look like in 5 years?",
    "What's something you've been putting off dealing with?",
    "If tonight was the last night of this chapter, what would you want to remember?",
    "What are you carrying right now that's not yours to carry?",
  ]},
  { cat: "🎭", label: "Get weird with it", prompts: [
    "Describe today using only colours.",
    "Write today as a movie scene.",
    "If your mood was a weather system, what would it be?",
    "Write a conversation between your brain and your heart.",
    "What song is the soundtrack to this exact moment?",
    "Describe your feelings as a place. What does it look like?",
  ]},
];

export function SpinPrompt({ onBack }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [writing, setWriting] = useState(false);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [angle, setAngle] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setSaved(false);
    setText("");
    setWriting(false);
    const pool = selectedCat
      ? ALL_PROMPTS.find(c => c.cat === selectedCat)?.prompts || []
      : ALL_PROMPTS.flatMap(c => c.prompts);
    let spins = 0;
    const maxSpins = 8 + Math.floor(Math.random() * 6);
    const interval = setInterval(() => {
      setCurrentPrompt(pool[Math.floor(Math.random() * pool.length)]);
      setAngle(a => a + 45);
      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 120 - spins * 8 < 60 ? 60 : 120 - spins * 8);
  };

  if (saved) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", background: C.tealLight }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill={C.teal} opacity="0.15" />
        <circle cx="40" cy="40" r="26" fill={C.teal} opacity="0.25" />
        <circle cx="40" cy="40" r="16" fill={C.teal} />
        <text x="40" y="46" textAnchor="middle" fontSize="18" fill="white">✓</text>
      </svg>
      <div style={{ fontSize: 22, fontWeight: 900, color: C.teal, marginTop: 16, marginBottom: 8 }}>Saved. Nice one.</div>
      <div style={{ fontSize: 14, color: C.mid, marginBottom: 32, lineHeight: 1.5 }}>Your plant just grew a tiny bit.</div>
      <Btn onClick={onBack} bg={C.teal}>Back to Spill</Btn>
    </div>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0891B2,#06B6D4)", padding: "12px 16px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.white }}>Spin a prompt</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {/* Category picker */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.mid, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>What kind of prompt?</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div onClick={() => setSelectedCat(null)} style={{ background: !selectedCat ? C.teal : C.white, color: !selectedCat ? C.white : C.mid, border: `1.5px solid ${!selectedCat ? C.teal : C.border}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              All
            </div>
            {ALL_PROMPTS.map(c => (
              <div key={c.cat} onClick={() => setSelectedCat(selectedCat === c.cat ? null : c.cat)} style={{ background: selectedCat === c.cat ? C.teal : C.white, color: selectedCat === c.cat ? C.white : C.dark, border: `1.5px solid ${selectedCat === c.cat ? C.teal : C.border}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                {c.cat} {c.label}
              </div>
            ))}
          </div>
        </div>

        {/* Spin area */}
        <div style={{ background: C.white, borderRadius: 20, border: `2px solid ${C.border}`, padding: 24, textAlign: "center", marginBottom: 16, minHeight: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {!currentPrompt && !spinning && (
            <div style={{ color: C.mid, fontSize: 14, lineHeight: 1.5 }}>
              Tap the button below to get a prompt.<br />Keep spinning until one feels right.
            </div>
          )}
          {(currentPrompt || spinning) && (
            <>
              {/* Animated spinner graphic */}
              <svg width="48" height="48" viewBox="0 0 48 48" style={{ marginBottom: 12, transform: `rotate(${angle}deg)`, transition: spinning ? "transform 0.1s linear" : "transform 0.5s ease-out" }}>
                <circle cx="24" cy="24" r="20" fill={C.tealLight} stroke={C.teal} strokeWidth="2" />
                {[0, 60, 120, 180, 240, 300].map((a, i) => (
                  <line key={i} x1="24" y1="24" x2={24 + 18 * Math.cos((a * Math.PI) / 180)} y2={24 + 18 * Math.sin((a * Math.PI) / 180)} stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" />
                ))}
                <circle cx="24" cy="24" r="4" fill={C.teal} />
              </svg>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.dark, lineHeight: 1.5, opacity: spinning ? 0.5 : 1, transition: "opacity 0.2s" }}>
                {currentPrompt}
              </div>
            </>
          )}
        </div>

        <Btn onClick={spin} bg={spinning ? C.mid : C.teal} style={{ marginBottom: 10 }}>
          {spinning ? "Spinning..." : currentPrompt ? "Spin again" : "Spin"}
        </Btn>

        {currentPrompt && !spinning && !writing && (
          <Btn onClick={() => setWriting(true)} bg={C.purple} style={{ marginBottom: 10 }}>
            Write to this one
          </Btn>
        )}

        {writing && (
          <>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="What comes up..."
              autoFocus
              style={{ width: "100%", minHeight: 140, border: `2px solid ${C.border}`, borderRadius: 16, padding: 16, fontFamily: "Nunito, sans-serif", fontSize: 15, color: C.dark, resize: "none", outline: "none", background: C.white, lineHeight: 1.5, marginBottom: 10 }}
              onFocus={e => e.target.style.borderColor = C.teal}
              onBlur={e => e.target.style.borderColor = C.border}
            />
            <Btn onClick={() => { if (text.trim()) setSaved(true); }} bg={C.teal}>Save it</Btn>
          </>
        )}
      </div>
    </div>
  );
}

// ── RIP IT UP ──────────────────────────────────────────────────
export function RipItUp({ onBack }) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("write"); // write | ripping | done
  const [ripProgress, setRipProgress] = useState(0);

  const doRip = () => {
    if (!text.trim()) return;
    setPhase("ripping");
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setRipProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 400);
      }
    }, 20);
  };

  if (phase === "done") return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", background: "#FFF1F2" }}>
      {/* Torn paper SVG */}
      <svg width="200" height="120" viewBox="0 0 200 120" style={{ marginBottom: 16 }}>
        <defs>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>
        {/* Left piece */}
        <g filter="url(#shadow)" transform="rotate(-15, 60, 60)">
          <path d="M10 10 L90 10 L85 35 L92 50 L80 65 L88 80 L10 80 Z" fill="white" stroke="#FECDD3" strokeWidth="1" />
          <path d="M10 15 L80 15" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <path d="M10 25 L82 25" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <path d="M10 35 L78 35" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
        </g>
        {/* Right piece */}
        <g filter="url(#shadow)" transform="rotate(12, 150, 60)">
          <path d="M110 10 L190 10 L190 80 L110 80 L118 65 L108 50 L115 35 L108 20 Z" fill="white" stroke="#FECDD3" strokeWidth="1" />
          <path d="M118 15 L185 15" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <path d="M115 25 L185 25" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <path d="M112 35 L185 35" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
        </g>
        {/* Small torn bits */}
        <rect x="88" y="5" width="6" height="8" rx="1" fill="white" stroke="#FECDD3" strokeWidth="1" transform="rotate(20, 91, 9)" />
        <rect x="94" y="70" width="5" height="7" rx="1" fill="white" stroke="#FECDD3" strokeWidth="1" transform="rotate(-15, 96, 73)" />
        <rect x="85" y="90" width="8" height="5" rx="1" fill="white" stroke="#FECDD3" strokeWidth="1" transform="rotate(5, 89, 92)" />
      </svg>
      <div style={{ fontSize: 24, fontWeight: 900, color: "#9F1239", marginBottom: 8 }}>Ripped. Gone. Done.</div>
      <div style={{ fontSize: 14, color: C.mid, marginBottom: 32, lineHeight: 1.5 }}>It's out of your head now.<br />That's what matters.</div>
      <Btn onClick={onBack} bg="#EF4444" color={C.white}>Back to Spill</Btn>
    </div>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#EF4444,#DC2626)", padding: "12px 16px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.white }}>Rip it up</div>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ background: "#FFF1F2", borderRadius: 16, padding: 14, border: "1.5px solid #FECDD3" }}>
          <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>Write the thing you want to get rid of. The thought that won't leave you alone. The thing you're angry about. Then we'll rip it to pieces together.</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#EF4444", marginTop: 6 }}>It disappears completely. No trace.</div>
        </div>

        {phase === "write" && (
          <>
            <div style={{ position: "relative", flex: 1 }}>
              {/* Paper texture background */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "repeating-linear-gradient(transparent, transparent 27px, #FEE2E2 27px, #FEE2E2 28px)", backgroundPositionY: "32px", pointerEvents: "none", zIndex: 0 }} />
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write it here..."
                autoFocus
                style={{ position: "relative", zIndex: 1, width: "100%", minHeight: 180, border: "2px solid #FECDD3", borderRadius: 16, padding: "12px 16px", fontFamily: "Nunito, sans-serif", fontSize: 16, color: C.dark, resize: "none", outline: "none", background: "transparent", lineHeight: "28px" }}
                onFocus={e => e.target.style.borderColor = "#EF4444"}
                onBlur={e => e.target.style.borderColor = "#FECDD3"}
              />
            </div>
            <Btn onClick={doRip} bg="#EF4444" color={C.white}>Rip it up</Btn>
          </>
        )}

        {phase === "ripping" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* Ripping animation */}
            <div style={{ position: "relative", width: 280, height: 160, marginBottom: 24 }}>
              {/* Left half sliding left */}
              <div style={{
                position: "absolute", left: 0, top: 0,
                width: `${50 - ripProgress * 0.3}%`,
                height: "100%",
                background: "white",
                border: "1.5px solid #FECDD3",
                borderRadius: "12px 0 0 12px",
                overflow: "hidden",
                transform: `translateX(-${ripProgress * 0.5}px) rotate(-${ripProgress * 0.05}deg)`,
                transition: "none",
                boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ padding: 12, fontSize: 13, color: "#FCA5A5", lineHeight: "28px" }}>
                  {text.substring(0, Math.floor(text.length / 2))}
                </div>
              </div>
              {/* Rip line */}
              <div style={{
                position: "absolute",
                left: `${50 - ripProgress * 0.3}%`,
                top: 0, bottom: 0,
                width: 3,
                background: `linear-gradient(180deg, transparent, #EF4444 20%, #DC2626 50%, #EF4444 80%, transparent)`,
                opacity: ripProgress < 90 ? 1 : 0,
                transition: "opacity 0.3s",
              }} />
              {/* Right half sliding right */}
              <div style={{
                position: "absolute",
                right: 0, top: 0,
                width: `${50 - ripProgress * 0.3}%`,
                height: "100%",
                background: "white",
                border: "1.5px solid #FECDD3",
                borderRadius: "0 12px 12px 0",
                overflow: "hidden",
                transform: `translateX(${ripProgress * 0.5}px) rotate(${ripProgress * 0.05}deg)`,
                boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ padding: 12, fontSize: 13, color: "#FCA5A5", lineHeight: "28px" }}>
                  {text.substring(Math.floor(text.length / 2))}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#EF4444" }}>Ripping...</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── BURN IT ────────────────────────────────────────────────────
export function BurnIt({ onBack }) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("write"); // write | burning | done
  const [burnProgress, setBurnProgress] = useState(0);
  const [flames, setFlames] = useState([]);

  const doBurn = () => {
    if (!text.trim()) return;
    setPhase("burning");
    // Generate random flame positions
    setFlames(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 0.5,
      size: 0.6 + Math.random() * 0.8,
    })));
    let p = 0;
    const interval = setInterval(() => {
      p += 1.2;
      setBurnProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 600);
      }
    }, 30);
  };

  if (phase === "done") return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", background: "#1C1917" }}>
      {/* Ash SVG */}
      <svg width="160" height="80" viewBox="0 0 160 80" style={{ marginBottom: 16 }}>
        {/* Ash pile */}
        <ellipse cx="80" cy="65" rx="60" ry="8" fill="#44403C" />
        <ellipse cx="80" cy="62" rx="45" ry="6" fill="#57534E" />
        {/* Ash particles floating */}
        {[20, 45, 70, 95, 120, 135].map((x, i) => (
          <ellipse key={i} cx={x} cy={40 - i * 5} rx="3" ry="1.5" fill="#78716C" opacity={0.3 + i * 0.1} transform={`rotate(${i * 20}, ${x}, ${40 - i * 5})`} />
        ))}
        {/* Last ember */}
        <circle cx="80" cy="55" r="3" fill="#F97316" opacity="0.6" />
        <circle cx="80" cy="55" r="1.5" fill="#FBBF24" opacity="0.8" />
      </svg>
      <div style={{ fontSize: 24, fontWeight: 900, color: "#FED7AA", marginBottom: 8 }}>Burned. Gone.</div>
      <div style={{ fontSize: 14, color: "#A8A29E", marginBottom: 32, lineHeight: 1.5 }}>Nothing left of it now.<br />How does that feel?</div>
      <Btn onClick={onBack} bg={C.orange} color={C.white}>Back to Spill</Btn>
    </div>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#EA580C,#C2410C)", padding: "12px 16px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.white }}>Burn it</div>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ background: "#FFF7ED", borderRadius: 16, padding: 14, border: "1.5px solid #FED7AA" }}>
          <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>Write the thought, the feeling, the thing that's been eating at you. Then watch it burn completely. Nothing left. Gone.</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.orange, marginTop: 6 }}>Completely destroyed. Not saved anywhere.</div>
        </div>

        {phase === "write" && (
          <>
            <div style={{ position: "relative", flex: 1 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "repeating-linear-gradient(transparent, transparent 27px, #FED7AA44 27px, #FED7AA44 28px)", backgroundPositionY: "32px", pointerEvents: "none", zIndex: 0 }} />
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write it here..."
                autoFocus
                style={{ position: "relative", zIndex: 1, width: "100%", minHeight: 180, border: "2px solid #FED7AA", borderRadius: 16, padding: "12px 16px", fontFamily: "Nunito, sans-serif", fontSize: 16, color: C.dark, resize: "none", outline: "none", background: "transparent", lineHeight: "28px" }}
                onFocus={e => e.target.style.borderColor = C.orange}
                onBlur={e => e.target.style.borderColor = "#FED7AA"}
              />
            </div>
            <Btn onClick={doBurn} bg={C.orange} color={C.white}>Burn it 🔥</Btn>
          </>
        )}

        {phase === "burning" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 280, height: 180 }}>
              {/* Paper being consumed */}
              <div style={{
                position: "absolute", bottom: 20, left: "50%",
                transform: "translateX(-50%)",
                width: 220,
                height: `${Math.max(0, 120 - burnProgress * 1.2)}px`,
                background: burnProgress > 60 ? "#1C1917" : burnProgress > 30 ? "#44403C" : "white",
                border: "1.5px solid #FED7AA",
                borderRadius: 8,
                overflow: "hidden",
                transition: "height 0.1s, background 0.5s",
              }}>
                <div style={{ padding: 10, fontSize: 13, color: burnProgress > 40 ? "#78716C" : C.dark, opacity: Math.max(0, 1 - burnProgress * 0.015), lineHeight: "28px" }}>
                  {text}
                </div>
              </div>

              {/* Flames - CSS animated */}
              <style>{`
                @keyframes flicker1 { 0%,100%{transform:scaleY(1) scaleX(1) translateY(0)} 25%{transform:scaleY(1.3) scaleX(0.8) translateY(-4px)} 75%{transform:scaleY(0.9) scaleX(1.1) translateY(2px)} }
                @keyframes flicker2 { 0%,100%{transform:scaleY(0.9) scaleX(1.1) translateY(0)} 33%{transform:scaleY(1.2) scaleX(0.9) translateY(-6px)} 66%{transform:scaleY(1) scaleX(1.2) translateY(1px)} }
                @keyframes flicker3 { 0%,100%{transform:scaleY(1.1) scaleX(0.9) translateY(0)} 50%{transform:scaleY(1.4) scaleX(0.8) translateY(-5px)} }
              `}</style>
              {flames.map((f, i) => (
                <div key={f.id} style={{
                  position: "absolute",
                  left: `${f.x}%`,
                  bottom: `${20 + Math.max(0, 120 - burnProgress * 1.2)}px`,
                  transform: "translateX(-50%)",
                  animationName: ["flicker1", "flicker2", "flicker3"][i % 3],
                  animationDuration: `${0.3 + f.delay}s`,
                  animationIterationCount: "infinite",
                  animationDelay: `${f.delay}s`,
                }}>
                  <svg width={`${f.size * 24}px`} height={`${f.size * 36}px`} viewBox="0 0 24 36">
                    <path d="M12 2 C12 2 20 10 20 20 C20 27 16.4 34 12 34 C7.6 34 4 27 4 20 C4 10 12 2 12 2Z" fill={i % 3 === 0 ? "#F97316" : i % 3 === 1 ? "#FBBF24" : "#EF4444"} opacity="0.9" />
                    <path d="M12 10 C12 10 17 16 17 22 C17 26 14.8 30 12 30 C9.2 30 7 26 7 22 C7 16 12 10 12 10Z" fill={i % 3 === 0 ? "#FBBF24" : i % 3 === 1 ? "#FEF08A" : "#F97316"} opacity="0.8" />
                    <path d="M12 16 C12 16 15 20 15 23 C15 25.2 13.7 27 12 27 C10.3 27 9 25.2 9 23 C9 20 12 16 12 16Z" fill="#FEF9C3" opacity="0.7" />
                  </svg>
                </div>
              ))}

              {/* Smoke */}
              {burnProgress > 40 && [30, 55, 75].map((x, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: 0,
                  width: 8,
                  height: `${burnProgress * 0.3}px`,
                  background: "linear-gradient(to top, #78716C, transparent)",
                  borderRadius: 4,
                  opacity: 0.3,
                  animationName: "flicker1",
                  animationDuration: `${0.8 + i * 0.2}s`,
                  animationIterationCount: "infinite",
                }} />
              ))}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.orange, marginTop: 8 }}>Burning...</div>
          </div>
        )}
      </div>
    </div>
  );
}