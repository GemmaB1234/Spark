import { useState } from "react";

// ── Colour tokens ──────────────────────────────────────────────
const C = {
  teal: "#0891B2", tealLight: "#E0F7FA", tealMid: "#06B6D4",
  pink: "#EC4899", pinkLight: "#FCE4EC",
  purple: "#7C3AED", purpleLight: "#EDE9FE",
  yellow: "#F59E0B", yellowLight: "#FEF9C3",
  green: "#10B981", greenLight: "#D1FAE5",
  midnight: "#1E3A5F", dark: "#1E293B", mid: "#64748B",
  light: "#F8FAFC", white: "#FFFFFF", border: "rgba(0,0,0,0.08)",
};

// ── Shared micro-components ────────────────────────────────────
const Tag = ({ label, bg = C.tealLight, color = C.teal }) => (
  <span style={{
    display: "inline-block", background: bg, color,
    fontSize: 10, fontWeight: 700, padding: "3px 8px",
    borderRadius: 20, marginRight: 4, marginTop: 4,
  }}>{label}</span>
);

const Card = ({ children, onClick, style = {} }) => (
  <div onClick={onClick} style={{
    background: C.white, borderRadius: 16,
    border: `1.5px solid ${C.border}`, padding: 14,
    marginBottom: 10, cursor: onClick ? "pointer" : "default",
    transition: "transform 0.12s",
    ...style,
  }}
    onMouseDown={e => { if (onClick) e.currentTarget.style.transform = "scale(0.98)"; }}
    onMouseUp={e => { if (onClick) e.currentTarget.style.transform = "scale(1)"; }}
  >{children}</div>
);

const SectionTitle = ({ children }) => (
  <div style={{
    fontSize: 11, fontWeight: 800, color: C.mid,
    textTransform: "uppercase", letterSpacing: "0.8px",
    marginBottom: 10,
  }}>{children}</div>
);

const MemoryCard = ({ text }) => (
  <div style={{
    background: C.yellowLight, border: `1.5px solid #FDE68A`,
    borderRadius: 14, padding: 14, marginBottom: 10,
  }}>
    <div style={{ fontSize: 10, fontWeight: 800, color: "#92400E", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 4 }}>✨ Bloom memory</div>
    <div style={{ fontSize: 13, color: "#78350F", fontStyle: "italic", lineHeight: 1.5 }}>{text}</div>
  </div>
);

// ── Screens ────────────────────────────────────────────────────

// HOME
function HomeScreen({ setTab }) {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const vibes = [
    { emoji: "🌋", label: "Volcano" }, { emoji: "🌫️", label: "Fog" },
    { emoji: "⚡", label: "Zapped" }, { emoji: "🐢", label: "Shell" },
    { emoji: "🌤️", label: "Almost" }, { emoji: "🎈", label: "Float" },
    { emoji: "🔥", label: "Fired Up" }, { emoji: "🌊", label: "Wobbly" },
  ];
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(160deg, #0891B2 0%, #06B6D4 60%, #10B981 100%)",
        padding: "16px 20px 24px", color: C.white,
      }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Hey there</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>How's today hitting? 👋</div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          background: "rgba(255,255,255,0.2)", borderRadius: 20,
          padding: "3px 10px", fontSize: 11, fontWeight: 700, marginTop: 6,
        }}>⚡ Sparkling</div>
        {/* Plant */}
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: 20,
          padding: 14, marginTop: 14, display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            width: 60, height: 60, background: "rgba(255,255,255,0.2)",
            borderRadius: "50%", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 32, flexShrink: 0,
          }}>🌿</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>Ziggy</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 1 }}>Sprouting — keep going</div>
            <div style={{ marginTop: 6, background: "rgba(255,255,255,0.2)", borderRadius: 4, height: 5 }}>
              <div style={{ height: 5, borderRadius: 4, background: "rgba(255,255,255,0.9)", width: "35%" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* Vibe check */}
        <SectionTitle>Vibe check</SectionTitle>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {vibes.map(v => (
            <div key={v.label} onClick={() => setSelectedVibe(v.label)} style={{
              flexShrink: 0, background: selectedVibe === v.label ? C.tealLight : C.white,
              border: `1.5px solid ${selectedVibe === v.label ? C.teal : C.border}`,
              borderRadius: 16, padding: "10px 12px", textAlign: "center",
              cursor: "pointer", minWidth: 68, transition: "all 0.15s",
            }}>
              <div style={{ fontSize: 24 }}>{v.emoji}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: selectedVibe === v.label ? C.teal : C.mid, marginTop: 3 }}>{v.label}</div>
            </div>
          ))}
        </div>

        {/* Quick sparks */}
        <div style={{ marginTop: 16 }}>
          <SectionTitle>Quick spark</SectionTitle>
          {[
            { icon: "📖", bg: C.tealLight, title: "Brain splat", sub: "Just dump it all out" },
            { icon: "⚡", bg: C.yellowLight, title: "Spark of the day", sub: "One tiny good thing" },
          ].map(item => (
            <Card key={item.title} onClick={() => setTab("journal")}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: C.mid, marginTop: 1 }}>{item.sub}</div>
                </div>
                <i className="ti ti-chevron-right" style={{ color: C.mid, fontSize: 16 }} />
              </div>
            </Card>
          ))}
        </div>

        <MemoryCard text="Last week you said today was a 2. You picked Float just now. Look at that." />
      </div>
    </div>
  );
}

// JOURNAL
const JOURNAL_MODES = [
  { id: "splat", icon: "🎨", name: "Brain splat", desc: "No rules. Just dump it out.", bg: C.tealLight, border: "#99F6E4", placeholder: "Just start typing. Anything. Words, feelings, nonsense..." },
  { id: "spin", icon: "🎲", name: "Spin a prompt", desc: "Shuffle until one fits.", bg: C.white, border: C.border, placeholder: "What comes up?" },
  { id: "unsent", icon: "💭", name: "The Unsent", desc: "Say the thing. It stays here.", bg: C.white, border: C.border, placeholder: "Write the thing you never said..." },
  { id: "story", icon: "🎭", name: "Story mode", desc: "Tell it like it's someone else.", bg: C.white, border: C.border, placeholder: '"She walked in and..." or "He felt..." — start anywhere.' },
  { id: "spark", icon: "⚡", name: "Spark of the day", desc: "One tiny good thing.", bg: C.yellowLight, border: "#FDE68A", placeholder: "Even if today was rough, one tiny thing that was okay..." },
  { id: "soundtrack", icon: "🎵", name: "Soundtrack", desc: "What song is today?", bg: C.white, border: C.border, placeholder: "Song name — and why it fits today..." },
];

const MYSTERY_PROMPTS = [
  "Write a strongly worded letter to a food you hate.",
  "Describe your bedroom to an alien who has never seen one.",
  "What would your pet say about you if it could talk?",
  "Invent a new word for a feeling that doesn't have one yet.",
  "If your anxiety had a name and a personality, what would it be like?",
  "Write the best possible version of tomorrow.",
];

function JournalScreen() {
  const [activeMode, setActiveMode] = useState(null);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [mysteryOpen, setMysteryOpen] = useState(false);
  const [mysteryPrompt] = useState(MYSTERY_PROMPTS[Math.floor(Math.random() * MYSTERY_PROMPTS.length)]);

  const openMode = (mode) => { setActiveMode(mode); setText(""); setSaved(false); };
  const saveEntry = () => { if (text.trim()) { setSaved(true); setActiveMode(null); } };

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #EC4899, #F472B6)", padding: "16px 20px 20px", color: C.white }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Your space</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>What do you want to do?</div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* Mystery box */}
        <div onClick={() => setMysteryOpen(!mysteryOpen)} style={{
          background: "linear-gradient(135deg, #7C3AED, #9333EA)",
          borderRadius: 16, padding: 16, marginBottom: 12,
          display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
        }}>
          <div style={{ fontSize: 32 }}>🎮</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>Mystery box</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 1 }}>Tap to unlock today's prompt</div>
          </div>
          <i className="ti ti-gift" style={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }} />
        </div>

        {mysteryOpen && (
          <div style={{ background: C.purpleLight, borderRadius: 14, padding: 14, border: `1.5px solid #C4B5FD`, marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.purple, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 4 }}>Today's mystery prompt ✨</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.5 }}>{mysteryPrompt}</div>
          </div>
        )}

        {/* Mode grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {JOURNAL_MODES.map(m => (
            <div key={m.id} onClick={() => openMode(m)} style={{
              background: m.bg, border: `1.5px solid ${m.border}`,
              borderRadius: 16, padding: "14px 12px", textAlign: "center",
              cursor: "pointer", transition: "transform 0.12s",
            }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.dark }}>{m.name}</div>
              <div style={{ fontSize: 10, color: C.mid, marginTop: 2, lineHeight: 1.3 }}>{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Write area */}
        {activeMode && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 10 }}>
              {activeMode.icon} {activeMode.name}
              {activeMode.id === "unsent" && <span style={{ fontSize: 11, fontWeight: 400, color: C.mid, display: "block", marginTop: 2 }}>This stays here. Private. Always.</span>}
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={activeMode.placeholder}
              style={{
                width: "100%", minHeight: 120, border: `1.5px solid ${C.border}`,
                borderRadius: 14, padding: 12, fontFamily: "Nunito, sans-serif",
                fontSize: 14, color: C.dark, resize: "none", outline: "none",
                background: C.white, lineHeight: 1.5,
              }}
              onFocus={e => e.target.style.borderColor = C.teal}
              onBlur={e => e.target.style.borderColor = C.border}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={saveEntry} style={{
                flex: 1, background: C.teal, color: C.white, border: "none",
                borderRadius: 12, padding: 10, fontFamily: "Nunito, sans-serif",
                fontSize: 13, fontWeight: 800, cursor: "pointer",
              }}>Save it</button>
              <button onClick={() => setActiveMode(null)} style={{
                background: C.light, color: C.mid, border: "none",
                borderRadius: 12, padding: "10px 14px", fontFamily: "Nunito, sans-serif",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
              }}>Cancel</button>
            </div>
          </div>
        )}

        {saved && (
          <div style={{
            background: C.greenLight, borderRadius: 14, padding: 14,
            border: `1.5px solid #6EE7B7`, textAlign: "center", marginBottom: 16,
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🌿</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065F46" }}>Saved. Ziggy just grew a little.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// BLOOM
const BLOOM_STAGES = [
  { emoji: "🌱", name: "Seed", desc: "You showed up. That was enough.", done: true, current: false },
  { emoji: "🌿", name: "Sprouting", desc: "Something's starting.", done: false, current: true },
  { emoji: "🌻", name: "Growing", desc: "You're finding your way.", done: false, current: false },
  { emoji: "🌸", name: "Budding", desc: "Big things coming.", done: false, current: false },
  { emoji: "💐", name: "Blooming", desc: "Look how far you've come.", done: false, current: false },
  { emoji: "✨", name: "Seeding", desc: "Now you're growing others.", done: false, current: false },
];

function BloomScreen() {
  return (
    <div>
      <div style={{
        background: "linear-gradient(160deg, #10B981, #059669)",
        padding: 20, textAlign: "center", color: C.white,
      }}>
        <div style={{ fontSize: 64 }}>🌿</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8 }}>Ziggy</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>Stage 2 — Sprouting</div>
        <div style={{
          background: "rgba(255,255,255,0.2)", borderRadius: 20,
          padding: "3px 12px", fontSize: 11, fontWeight: 700,
          color: C.white, display: "inline-block", marginTop: 8,
        }}>35% to Growing 🌻</div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {BLOOM_STAGES.map(s => (
          <div key={s.name} style={{
            background: s.done ? C.greenLight : C.white,
            border: `${s.current ? "2px" : "1.5px"} solid ${s.done ? C.green : s.current ? C.teal : C.border}`,
            borderRadius: 14, padding: "12px 14px", marginBottom: 8,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ fontSize: 22, width: 36, textAlign: "center" }}>{s.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{s.name}{s.current ? " — you're here" : ""}</div>
              <div style={{ fontSize: 11, color: C.mid, marginTop: 1 }}>{s.desc}</div>
            </div>
            {s.done && <div style={{ fontSize: 16, color: C.green }}>✓</div>}
            {s.current && <div style={{ fontSize: 11, fontWeight: 800, color: C.teal }}>NOW</div>}
          </div>
        ))}
        <MemoryCard text="You've opened Spark 8 times this week. That's 8 times you chose yourself." />
      </div>
    </div>
  );
}

// COOL DOWN
const COOLDOWN_TOOLS = [
  { emoji: "🫁", name: "Right here, right now", desc: "Slow your breath down", color: C.teal, bg: C.tealLight },
  { emoji: "🧊", name: "5-4-3-2-1", desc: "Find 5 things you can see", color: C.purple, bg: C.purpleLight },
  { emoji: "🌊", name: "Ride the wave", desc: "Let the feeling pass through", color: "#0EA5E9", bg: "#E0F2FE" },
  { emoji: "🎵", name: "Sound it out", desc: "Music that helps your brain settle", color: C.pink, bg: C.pinkLight },
  { emoji: "✍️", name: "Brain splat", desc: "Get it out of your head", color: C.green, bg: C.greenLight },
  { emoji: "🤸", name: "Move it", desc: "Shake out the feelings", color: C.yellow, bg: C.yellowLight },
];

function CoolDownScreen() {
  const [active, setActive] = useState(null);
  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #0EA5E9, #0891B2)",
        padding: "16px 20px 20px", color: C.white,
      }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Right here, right now</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>Cool your brain down</div>
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        <SectionTitle>Pick what feels right</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {COOLDOWN_TOOLS.map(t => (
            <div key={t.name} onClick={() => setActive(active?.name === t.name ? null : t)} style={{
              background: active?.name === t.name ? t.bg : C.white,
              border: `1.5px solid ${active?.name === t.name ? t.color : C.border}`,
              borderRadius: 16, padding: "14px 12px", textAlign: "center",
              cursor: "pointer", transition: "all 0.15s",
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{t.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.dark }}>{t.name}</div>
              <div style={{ fontSize: 10, color: C.mid, marginTop: 2, lineHeight: 1.3 }}>{t.desc}</div>
            </div>
          ))}
        </div>
        {active && (
          <div style={{
            background: active.bg, borderRadius: 16, padding: 16,
            border: `1.5px solid ${active.color}`, marginBottom: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 8 }}>{active.emoji} {active.name}</div>
            {active.emoji === "🫁" && <BreathingTool color={active.color} />}
            {active.emoji === "🧊" && <FiveThings />}
            {active.emoji !== "🫁" && active.emoji !== "🧊" && (
              <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>This tool is coming soon. For now — just being here counts. 🌿</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BreathingTool({ color }) {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(0);
  const start = () => {
    setPhase("in"); setCount(4);
    let c = 4;
    const tick = setInterval(() => {
      c--;
      if (c <= 0) {
        clearInterval(tick);
        setPhase("hold"); setCount(4);
        let h = 4;
        const hold = setInterval(() => {
          h--;
          if (h <= 0) {
            clearInterval(hold);
            setPhase("out"); setCount(6);
            let o = 6;
            const out = setInterval(() => {
              o--;
              if (o <= 0) { clearInterval(out); setPhase("done"); }
              else setCount(o);
            }, 1000);
          } else setCount(h);
        }, 1000);
      } else setCount(c);
    }, 1000);
  };
  const labels = { ready: "Tap to start", in: "Breathe in...", hold: "Hold...", out: "Breathe out...", done: "Nice. How do you feel?" };
  const sizes = { ready: 80, in: 100, hold: 100, out: 80, done: 90 };
  return (
    <div style={{ textAlign: "center" }}>
      <div onClick={phase === "ready" || phase === "done" ? start : undefined} style={{
        width: sizes[phase], height: sizes[phase], borderRadius: "50%",
        background: color, margin: "0 auto 12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: C.white, fontSize: phase === "ready" || phase === "done" ? 13 : 28,
        fontWeight: 800, cursor: phase === "ready" || phase === "done" ? "pointer" : "default",
        transition: "all 1s ease",
      }}>
        {phase === "ready" ? "Start" : phase === "done" ? "Again?" : count}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{labels[phase]}</div>
    </div>
  );
}

function FiveThings() {
  const prompts = ["5 things you can SEE 👀", "4 things you can TOUCH 🤚", "3 things you can HEAR 👂", "2 things you can SMELL 👃", "1 thing you can TASTE 👅"];
  const [step, setStep] = useState(0);
  return (
    <div>
      <div style={{ background: C.white, borderRadius: 12, padding: 14, marginBottom: 10, textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.dark }}>{prompts[step]}</div>
        <div style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>Look around and find them</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {step > 0 && <button onClick={() => setStep(step - 1)} style={{ flex: 1, background: C.light, border: "none", borderRadius: 10, padding: 10, fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 700, color: C.mid, cursor: "pointer" }}>Back</button>}
        {step < prompts.length - 1
          ? <button onClick={() => setStep(step + 1)} style={{ flex: 1, background: C.purple, border: "none", borderRadius: 10, padding: 10, fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 700, color: C.white, cursor: "pointer" }}>Found them →</button>
          : <button onClick={() => setStep(0)} style={{ flex: 1, background: C.green, border: "none", borderRadius: 10, padding: 10, fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 700, color: C.white, cursor: "pointer" }}>Done ✓</button>
        }
      </div>
    </div>
  );
}

// RELATIONSHIPS
const REL_TOPICS = [
  { emoji: "👥", title: "What makes a good friend?", tags: ["friendship", "boundaries"] },
  { emoji: "💬", title: "When someone upsets you", tags: ["conflict", "feelings"] },
  { emoji: "🚦", title: "Green flags & red flags", tags: ["healthy", "unhealthy"] },
  { emoji: "🌐", title: "Online friendships", tags: ["online", "safety"] },
  { emoji: "🛡️", title: "Saying no (and meaning it)", tags: ["boundaries", "confidence"] },
  { emoji: "💔", title: "When friendships change", tags: ["change", "grief"] },
  { emoji: "🏠", title: "Family stuff", tags: ["family", "home"] },
  { emoji: "❤️", title: "Healthy relationships", tags: ["love", "respect"] },
];

function RelationshipsScreen() {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6)", padding: "16px 20px 20px", color: C.white }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Your people</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>Relationships & boundaries</div>
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        {REL_TOPICS.map(t => (
          <Card key={t.title}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 22 }}>{t.emoji}</span>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{t.title}</div>
            </div>
            <div>{t.tags.map(tag => <Tag key={tag} label={tag} />)}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// REAL WORLD
const RW_TOPICS = [
  { emoji: "📸", title: "The highlight reel", stat: { num: "97%", text: "of what people post is the best 3% of their life" }, tags: ["comparison", "reality"] },
  { emoji: "💔", title: "When likes feel like everything", tags: ["comparison", "self-worth"] },
  { emoji: "🔕", title: "Mute, block, step back", tags: ["practical tools"] },
  { emoji: "🪞", title: "Online you vs real you", tags: ["identity", "authenticity"] },
  { emoji: "😰", title: "Comment and like trauma", tags: ["hurt", "processing"] },
  { emoji: "🤳", title: "Image pressure & filters", tags: ["body image", "reality"] },
];

function RealWorldScreen() {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)", padding: "16px 20px 20px", color: C.white }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Real world</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>Social media & online life</div>
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        {RW_TOPICS.map(t => (
          <Card key={t.title}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: t.stat ? 8 : 6 }}>
              <span style={{ fontSize: 22 }}>{t.emoji}</span>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{t.title}</div>
            </div>
            {t.stat && (
              <div style={{ background: C.purpleLight, borderRadius: 12, padding: 12, marginBottom: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.purple }}>{t.stat.num}</div>
                <div style={{ fontSize: 11, color: C.mid, marginTop: 2 }}>{t.stat.text}</div>
              </div>
            )}
            <div>{t.tags.map(tag => <Tag key={tag} label={tag} bg={C.purpleLight} color={C.purple} />)}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// SAFE CORNER
const SAFE_ITEMS = [
  { emoji: "📞", bg: "#FEE2E2", title: "Talk to someone now", sub: "Childline: 0800 1111 — free, 24/7" },
  { emoji: "💬", bg: C.yellowLight, title: "Text instead", sub: "Text HELLO to 85258 — Crisis Text Line" },
  { emoji: "🧑‍🤝‍🧑", bg: C.tealLight, title: "My trusted adult", sub: "Someone I can talk to in real life" },
  { emoji: "🫁", bg: C.purpleLight, title: "Right here, right now", sub: "Quick things to do when it's a lot" },
  { emoji: "📖", bg: C.greenLight, title: "Write it out", sub: "Get it out of your head first" },
];

function SafeScreen() {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1E3A5F, #1E40AF)", padding: 20, color: C.white }}>
        <div style={{ fontSize: 20, fontWeight: 800 }}>Your corner 🤍</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.5 }}>This is always here. No login needed. No one judges you for being here.</div>
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#991B1B", marginBottom: 4 }}>🚨 If you're in immediate danger</div>
          <div style={{ fontSize: 13, color: "#7F1D1D", lineHeight: 1.5 }}>Call 999 or go to your nearest A&E. You matter.</div>
        </div>
        {SAFE_ITEMS.map(item => (
          <Card key={item.title}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{item.title}</div>
                <div style={{ fontSize: 11, color: C.mid, marginTop: 1 }}>{item.sub}</div>
              </div>
              <i className="ti ti-chevron-right" style={{ color: C.mid, fontSize: 16 }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── NAV CONFIG ─────────────────────────────────────────────────
const TABS = [
  { id: "home", label: "My Space", icon: "ti-home" },
  { id: "journal", label: "Journal", icon: "ti-pencil" },
  { id: "cooldown", label: "Cool Down", icon: "ti-wave-sine" },
  { id: "bloom", label: "My Bloom", icon: "ti-plant" },
  { id: "relationships", label: "People", icon: "ti-heart" },
  { id: "realworld", label: "Real World", icon: "ti-world" },
  { id: "safe", label: "Your Corner", icon: "ti-heart-handshake" },
];

// ── ROOT APP ───────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");

  const screens = {
    home: <HomeScreen setTab={setTab} />,
    journal: <JournalScreen />,
    cooldown: <CoolDownScreen />,
    bloom: <BloomScreen />,
    relationships: <RelationshipsScreen />,
    realworld: <RealWorldScreen />,
    safe: <SafeScreen />,
  };

  return (
    <div style={{
      height: "100dvh", width: "100%", display: "flex",
      flexDirection: "column", background: "#F0FDFA",
      fontFamily: "Nunito, sans-serif", maxWidth: 480, margin: "0 auto",
      position: "relative", overflow: "hidden",
    }}>
      {/* Status bar */}
      <div style={{
        background: "linear-gradient(135deg, #0891B2, #06B6D4)",
        padding: "10px 20px 8px", display: "flex",
        justifyContent: "space-between", alignItems: "center", flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>9:41</span>
        <span style={{ fontSize: 18, fontWeight: 900, color: C.white, letterSpacing: -1 }}>⚡ spark</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.9)" }}>●●●</span>
      </div>

      {/* Screen */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 70 }}>
        {screens[tab]}
      </div>

      {/* Nav */}
      <nav style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: C.white, borderTop: `1px solid ${C.border}`,
        display: "flex", padding: "6px 0 10px", zIndex: 10,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            padding: "4px 2px", border: "none", background: "none",
            fontFamily: "Nunito, sans-serif", cursor: "pointer",
          }}>
            <i className={`ti ${t.icon}`} style={{ fontSize: 18, color: tab === t.id ? C.teal : C.mid }} />
            <span style={{ fontSize: 8, fontWeight: 700, color: tab === t.id ? C.teal : C.mid, letterSpacing: "0.2px" }}>{t.label}</span>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.teal, opacity: tab === t.id ? 1 : 0, marginTop: 1 }} />
          </button>
        ))}
      </nav>
    </div>
  );
}
