import { SpinPrompt, RipItUp, BurnIt } from "./SpillModes.jsx";
import { useSparkStorage } from "./useSparkStorage.js";
import { RelationshipsHome } from "./Relationships.jsx";
import { RealWorldHome } from "./RealWorld.jsx";
import { MysteryActivity } from "./MysteryActivity.jsx";
import { useState } from "react";

const C = {
  teal: "#0891B2", tealLight: "#E0F7FA",
  pink: "#EC4899", pinkLight: "#FCE4EC",
  purple: "#7C3AED", purpleLight: "#EDE9FE",
  yellow: "#F59E0B", yellowLight: "#FEF9C3",
  green: "#10B981", greenLight: "#D1FAE5",
  dark: "#1E293B", mid: "#64748B",
  light: "#F8FAFC", white: "#FFFFFF", border: "rgba(0,0,0,0.08)",
};

const Tag = ({ label, bg = C.tealLight, color = C.teal }) => (
  <span style={{ display:"inline-block", background:bg, color, fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20, marginRight:4, marginTop:4 }}>{label}</span>
);

const Card = ({ children, onClick, style={} }) => (
  <div onClick={onClick} style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.border}`, padding:14, marginBottom:10, cursor:onClick?"pointer":"default", transition:"transform 0.12s", ...style }}
    onMouseDown={e=>{if(onClick)e.currentTarget.style.transform="scale(0.98)"}}
    onMouseUp={e=>{if(onClick)e.currentTarget.style.transform="scale(1)"}}
  >{children}</div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontSize:11, fontWeight:800, color:C.mid, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:10 }}>{children}</div>
);

const MemoryCard = ({ text }) => (
  <div style={{ background:C.yellowLight, border:`1.5px solid #FDE68A`, borderRadius:14, padding:14, marginBottom:10 }}>
    <div style={{ fontSize:10, fontWeight:800, color:"#92400E", textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:4 }}>✨ Bloom memory</div>
    <div style={{ fontSize:13, color:"#78350F", fontStyle:"italic", lineHeight:1.5 }}>{text}</div>
  </div>
);

const Btn = ({ children, onClick, bg=C.teal, color=C.white, style={} }) => (
  <button onClick={onClick} style={{ background:bg, color, border:"none", borderRadius:14, padding:"14px 24px", fontFamily:"Nunito, sans-serif", fontSize:15, fontWeight:800, cursor:"pointer", width:"100%", transition:"transform 0.1s", ...style }}
    onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
    onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
  >{children}</button>
);

const BackHeader = ({ title, onBack, bg="linear-gradient(135deg,#0891B2,#06B6D4)" }) => (
  <div style={{ background:bg, padding:"12px 16px 16px", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
    <button onClick={onBack} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:12, width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
      <i className="ti ti-arrow-left" style={{ color:C.white, fontSize:18 }} />
    </button>
    <div style={{ fontSize:17, fontWeight:800, color:C.white }}>{title}</div>
  </div>
);

// ── ONBOARDING ─────────────────────────────────────────────────
// Age to band mapping — invisible to user
function getBand(age) {
  if (age <= 10) return { id:"seedling", color:C.green, light:C.greenLight };
  if (age <= 13) return { id:"sparkling", color:C.teal, light:C.tealLight };
  if (age <= 16) return { id:"ignite", color:C.pink, light:C.pinkLight };
  return { id:"bloom", color:C.purple, light:C.purpleLight };
}
const PLANT_NAMES = ["Ziggy","Sprout","Biscuit","Chaos","Dot","Fern","Blob","Sparky"];
const TOUR_CARDS = [
  { emoji:"💧", name:"Spill", desc:"This is where you get things OUT of your head. Write stuff, draw stuff, say the thing you've been holding in. No wrong answers. Nobody else sees it.", color:C.tealLight },
  { emoji:"🌿", name:"My Bloom", desc:"Every time you open Spark, your plant grows a tiny bit. That's it. No streaks, no pressure. It just grows because you showed up.", color:C.greenLight },
  { emoji:"🤍", name:"Your Corner", desc:"If things ever feel really bad, this is where to go. Numbers to call or text, things to do right now. It's always here — you never need to log in.", color:"#FEE2E2" },
];

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(null);
  const [plantName, setPlantName] = useState("");
  const [tourIndex, setTourIndex] = useState(0);
  const [placeholder] = useState(PLANT_NAMES[Math.floor(Math.random()*PLANT_NAMES.length)]);
  const next = () => setStep(s=>s+1);
  const finish = () => onComplete({ band: getBand(age), age, plantName: plantName.trim()||placeholder });

  if(step===0) return (
    <div style={{ minHeight:"100dvh", background:"linear-gradient(160deg,#0891B2 0%,#06B6D4 50%,#10B981 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center" }}>
      <div style={{ fontSize:80, marginBottom:16 }}>⚡</div>
      <div style={{ fontSize:48, fontWeight:900, color:C.white, letterSpacing:-2, marginBottom:8 }}>spark</div>
      <div style={{ fontSize:16, color:"rgba(255,255,255,0.8)", marginBottom:8, fontWeight:600 }}>by Wired & Well</div>
      <div style={{ fontSize:18, color:C.white, marginBottom:48, lineHeight:1.6, maxWidth:280 }}>Your space. No rules. Just you.</div>
      <Btn onClick={next} bg={C.white} color={C.teal} style={{ maxWidth:280 }}>Let's go ⚡</Btn>
    </div>
  );

  if(step===1) return (
    <div style={{ minHeight:"100dvh", background:C.light, padding:24 }}>
      <div style={{ paddingTop:40, marginBottom:28 }}>
        <div style={{ fontSize:26, fontWeight:900, color:C.dark, marginBottom:8 }}>How old are you?</div>
        <div style={{ fontSize:15, color:C.mid, lineHeight:1.5 }}>Spark adjusts to fit you. Just tap your age.</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        {[7,8,9,10,11,12,13,14,15,16,17,18].map(a=>(
          <div key={a} onClick={()=>{setAge(a);next();}} style={{ background:age===a?C.teal:C.white, border:`2px solid ${age===a?C.teal:C.border}`, borderRadius:16, padding:"18px 12px", textAlign:"center", cursor:"pointer", transition:"all 0.15s" }}
            onMouseDown={e=>e.currentTarget.style.transform="scale(0.95)"}
            onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
          >
            <div style={{ fontSize:24, fontWeight:900, color:age===a?C.white:C.dark }}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if(step===2) return (
    <div style={{ minHeight:"100dvh", background:C.light, padding:24, display:"flex", flexDirection:"column" }}>
      <div style={{ paddingTop:40, marginBottom:28 }}>
        <div style={{ fontSize:48, marginBottom:16, textAlign:"center" }}>🌱</div>
        <div style={{ fontSize:26, fontWeight:900, color:C.dark, marginBottom:8 }}>Name your plant</div>
        <div style={{ fontSize:15, color:C.mid, lineHeight:1.5 }}>Every time you open Spark, your plant grows a tiny bit. It needs a name. What are you calling it?</div>
      </div>
      <input value={plantName} onChange={e=>setPlantName(e.target.value)} placeholder={placeholder} maxLength={20}
        style={{ width:"100%", border:`2px solid ${C.border}`, borderRadius:14, padding:"16px 18px", fontFamily:"Nunito, sans-serif", fontSize:18, fontWeight:700, color:C.dark, outline:"none", background:C.white, marginBottom:16 }}
        onFocus={e=>e.target.style.borderColor=C.teal}
        onBlur={e=>e.target.style.borderColor=C.border}
      />
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:32 }}>
        {PLANT_NAMES.slice(0,5).map(n=>(
          <div key={n} onClick={()=>setPlantName(n)} style={{ background:C.tealLight, borderRadius:20, padding:"5px 14px", fontSize:13, fontWeight:700, color:C.teal, cursor:"pointer" }}>{n}</div>
        ))}
      </div>
      <Btn onClick={next}>That's the one 🌱</Btn>
    </div>
  );

  if(step===3) return (
    <div style={{ minHeight:"100dvh", background:C.light, padding:24, display:"flex", flexDirection:"column" }}>
      <div style={{ paddingTop:40, marginBottom:24 }}>
        <div style={{ fontSize:26, fontWeight:900, color:C.dark, marginBottom:8 }}>Here's what's inside</div>
        <div style={{ fontSize:15, color:C.mid }}>Three things worth knowing about.</div>
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
        {TOUR_CARDS.map((t,i)=>(
          <div key={t.name} style={{ background:C.white, borderRadius:20, border:`1.5px solid ${C.border}`, padding:"18px 20px", display:"flex", alignItems:"flex-start", gap:16, opacity:i<=tourIndex?1:0.25, transition:"opacity 0.4s" }}>
            <div style={{ width:48, height:48, borderRadius:14, background:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{t.emoji}</div>
            <div>
              <div style={{ fontSize:16, fontWeight:800, color:C.dark }}>{t.name}</div>
              <div style={{ fontSize:13, color:C.mid, marginTop:3, lineHeight:1.5 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {tourIndex<TOUR_CARDS.length-1
        ? <Btn onClick={()=>setTourIndex(i=>i+1)}>Next →</Btn>
        : <Btn onClick={next} bg={C.green}>Got it — let's go 🌱</Btn>
      }
    </div>
  );

  if(step===4) return (
    <div style={{ minHeight:"100dvh", background:"linear-gradient(160deg,#0891B2 0%,#10B981 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center" }}>
      <div style={{ fontSize:80, marginBottom:16 }}>🌱</div>
      <div style={{ fontSize:28, fontWeight:900, color:C.white, marginBottom:8 }}>{plantName.trim()||placeholder} is ready</div>
      <div style={{ fontSize:16, color:"rgba(255,255,255,0.85)", marginBottom:48, lineHeight:1.6, maxWidth:280 }}>Your plant grows every time you show up. No pressure, no rules. Just you and Spark.</div>
      <Btn onClick={finish} bg={C.white} color={C.teal} style={{ maxWidth:280 }}>Start ⚡</Btn>
    </div>
  );

  return null;
}

// ── HOME ───────────────────────────────────────────────────────
function HomeScreen({ setTab, spark }) {
  const { plantName, currentStage, bloomProgress, recordVibe, getLatestMemory } = spark;
  const [selectedVibe, setSelectedVibe] = useState(null);
  const vibes = [
    { emoji:"🌋", label:"Volcano", msg:"Oof. What's making things feel like they might explode?" },
    { emoji:"🌫️", label:"Fog", msg:"That blank feeling is real. You don't have to think straight right now." },
    { emoji:"⚡", label:"Zapped", msg:"Too much input. Want to try something to cool your brain down?" },
    { emoji:"🐢", label:"Shell", msg:"Sometimes hiding is the right move. You're still here though." },
    { emoji:"🌤️", label:"Almost", msg:"Not great but not awful — that counts for something." },
    { emoji:"🎈", label:"Float", msg:"Love that for you. What's making today feel light?" },
    { emoji:"🔥", label:"Fired Up", msg:"That energy! What's got you going?" },
    { emoji:"🌊", label:"Wobbly", msg:"Wobbly is okay. What's feeling uncertain right now?" },
  ];
  return (
    <div>
      <div style={{ background:"linear-gradient(160deg,#0891B2 0%,#06B6D4 60%,#10B981 100%)", padding:"16px 20px 24px", color:C.white }}>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)" }}>Hey there</div>
        <div style={{ fontSize:20, fontWeight:800 }}>How's today hitting? 👋</div>

        <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:20, padding:14, marginTop:14, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:60, height:60, background:"rgba(255,255,255,0.2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, flexShrink:0 }}>🌿</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:800, color:C.white }}>{plantName||"Ziggy"}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)", marginTop:1 }}>{currentStage.name} — {currentStage.desc}</div>
            <div style={{ marginTop:6, background:"rgba(255,255,255,0.2)", borderRadius:4, height:5 }}>
              <div style={{ height:5, borderRadius:4, background:"rgba(255,255,255,0.9)", width:`${bloomProgress}%`, transition:"width 0.5s ease" }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding:"16px 16px 0" }}>
        <SectionTitle>Vibe check — how are you right now?</SectionTitle>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8 }}>
          {vibes.map(v=>(
            <div key={v.label} onClick={()=>{ const next = selectedVibe===v.label?null:v.label; setSelectedVibe(next); if(next) recordVibe(next); }} style={{ flexShrink:0, background:selectedVibe===v.label?C.tealLight:C.white, border:`1.5px solid ${selectedVibe===v.label?C.teal:C.border}`, borderRadius:16, padding:"10px 12px", textAlign:"center", cursor:"pointer", minWidth:68, transition:"all 0.15s" }}>
              <div style={{ fontSize:24 }}>{v.emoji}</div>
              <div style={{ fontSize:9, fontWeight:700, color:selectedVibe===v.label?C.teal:C.mid, marginTop:3 }}>{v.label}</div>
            </div>
          ))}
        </div>
        {selectedVibe && (
          <div style={{ background:C.tealLight, borderRadius:14, padding:14, marginBottom:10, border:`1.5px solid ${C.teal}` }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.teal }}>{vibes.find(v=>v.label===selectedVibe)?.msg}</div>
            <div style={{ fontSize:11, color:C.mid, marginTop:4 }}>(you don't have to answer)</div>
          </div>
        )}
        <div style={{ marginTop:8 }}>
          <SectionTitle>Quick spill</SectionTitle>
          {[
            { icon:"💧", bg:C.tealLight, title:"Brain splat", sub:"Just dump whatever's in your head — no rules, no wrong answers" },
            { icon:"⚡", bg:C.yellowLight, title:"Spark of the day", sub:"Find one tiny good thing from today — even if it was just a biscuit" },
          ].map(item=>(
            <Card key={item.title} onClick={()=>setTab("spill")}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:item.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{item.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{item.title}</div>
                  <div style={{ fontSize:11, color:C.mid, marginTop:2, lineHeight:1.4 }}>{item.sub}</div>
                </div>
                <i className="ti ti-chevron-right" style={{ color:C.mid, fontSize:16 }} />
              </div>
            </Card>
          ))}
        </div>
        {getLatestMemory() && <MemoryCard text={getLatestMemory()} />}
      </div>
    </div>
  );
}

// ── SPILL WRITE SCREEN ─────────────────────────────────────────
function SpillWriteScreen({ mode, onBack, onSave }) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const isHuge = mode.id==="huge";
  const isRip = mode.id==="rip";
  const isUnsent = mode.id==="unsent";

  const handleSave = () => {
    if(!text.trim()) return;
    setDone(true);
    onSave();
  };

  if(done && isRip) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", background:"#FFF1F2" }}>
      <div style={{ fontSize:64, marginBottom:16 }}>😤✂️</div>
      <div style={{ fontSize:24, fontWeight:900, color:"#9F1239", marginBottom:12 }}>Ripped. Gone. Done.</div>
      <div style={{ fontSize:15, color:C.mid, marginBottom:32, lineHeight:1.5 }}>It's out of your head now. That's what matters.</div>
      <Btn onClick={onBack} bg="#EF4444" color={C.white} style={{ maxWidth:200 }}>Back</Btn>
    </div>
  );

  if(done && isUnsent) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", background:C.pinkLight }}>
      <div style={{ fontSize:64, marginBottom:16 }}>💭</div>
      <div style={{ fontSize:24, fontWeight:900, color:C.pink, marginBottom:12 }}>Said. Saved. Yours.</div>
      <div style={{ fontSize:15, color:C.mid, marginBottom:32, lineHeight:1.5 }}>Nobody else will ever see that. It's just yours.</div>
      <Btn onClick={onBack} bg={C.pink} color={C.white} style={{ maxWidth:200 }}>Back</Btn>
    </div>
  );

  if(done) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", background:C.greenLight }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🌿</div>
      <div style={{ fontSize:24, fontWeight:900, color:C.green, marginBottom:12 }}>Saved. Your plant just grew.</div>
      <div style={{ fontSize:15, color:C.mid, marginBottom:32, lineHeight:1.5 }}>Getting it out of your head is the whole point. You did it.</div>
      <Btn onClick={onBack} bg={C.green} color={C.white} style={{ maxWidth:200 }}>Back</Btn>
    </div>
  );

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
      <BackHeader
        title={`${mode.icon} ${mode.name}`}
        onBack={onBack}
        bg={isRip?"linear-gradient(135deg,#EF4444,#DC2626)":isUnsent?"linear-gradient(135deg,#EC4899,#F472B6)":"linear-gradient(135deg,#0891B2,#06B6D4)"}
      />
      <div style={{ flex:1, padding:16, display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ background:C.white, borderRadius:16, padding:14, border:`1.5px solid ${C.border}` }}>
          <div style={{ fontSize:13, color:C.mid, lineHeight:1.5, marginBottom:4 }}>{mode.fullDesc}</div>
          {isUnsent && <div style={{ fontSize:11, fontWeight:800, color:C.pink }}>🔒 This stays private. Nobody else sees it.</div>}
          {isRip && <div style={{ fontSize:11, fontWeight:800, color:"#EF4444" }}>💥 Write it out. Then we rip it to pieces.</div>}
        </div>
        <textarea
          value={text}
          onChange={e=>setText(e.target.value)}
          placeholder={mode.placeholder}
          autoFocus
          style={{
            flex:1, minHeight:isHuge?120:160,
            border:`2px solid ${C.border}`, borderRadius:16,
            padding:16, fontFamily:"Nunito, sans-serif",
            fontSize:isHuge?40:15,
            fontWeight:isHuge?900:400,
            color:isHuge?C.purple:C.dark,
            textTransform:isHuge?"uppercase":"none",
            textAlign:isHuge?"center":"left",
            resize:"none", outline:"none",
            background:C.white, lineHeight:1.5,
          }}
          onFocus={e=>e.target.style.borderColor=isRip?"#EF4444":isUnsent?C.pink:C.teal}
          onBlur={e=>e.target.style.borderColor=C.border}
        />
        <Btn
          onClick={handleSave}
          bg={isRip?"#EF4444":isUnsent?C.pink:C.teal}
        >
          {isRip?"Rip it 😤":isUnsent?"Send it nowhere 💭":"Save it 🌿"}
        </Btn>
      </div>
    </div>
  );
}

// ── SPILL SCREEN ───────────────────────────────────────────────
const SPILL_MODES = [
  { id:"splat", icon:"💧", name:"Brain splat", desc:"No rules. Just dump it all out.", fullDesc:"Type anything — words, feelings, nonsense, half sentences. It doesn't have to make sense. Just get it out.", bg:C.tealLight, border:"#99F6E4", placeholder:"Just start. Anything. Words, feelings, total nonsense..." },
  { id:"spin", icon:"🎲", name:"Spin a prompt", desc:"Shuffle until one fits.", fullDesc:"", bg:C.white, border:C.border, placeholder:"" },
  { id:"unsent", icon:"💭", name:"The Unsent", desc:"Say the thing. It stays here.", fullDesc:"Write the message you never sent. The thing you wish you had said. The reply you wanted to give. It stays here — private, always.", bg:C.pinkLight, border:"#F9A8D4", placeholder:"Write the thing you never said..." },
  { id:"story", icon:"🎭", name:"Story mode", desc:"Tell it like it is someone else.", fullDesc:"Write about what happened — but write it like it happened to someone else. Say she or he or they instead of I. Sometimes that makes it easier to get out.", bg:C.white, border:C.border, placeholder:"She walked in and... or He did not know what to say when..." },
  { id:"spark", icon:"⚡", name:"Spark of the day", desc:"One tiny good thing.", fullDesc:"Even on the worst days there is usually one tiny okay thing. It does not have to be big. A good biscuit counts.", bg:C.yellowLight, border:"#FDE68A", placeholder:"Even if today was rough, one tiny thing that was okay..." },
  { id:"soundtrack", icon:"🎵", name:"Soundtrack", desc:"What song is today?", fullDesc:"Pick a song that fits how today felt. Just one. And write one line about why.", bg:C.white, border:C.border, placeholder:"Song name — and one sentence about why it fits..." },
  { id:"rip", icon:"✂️", name:"Rip it up", desc:"Write it. Rip it. Gone.", fullDesc:"", bg:"#FFF1F2", border:"#FECDD3", placeholder:"" },
  { id:"burn", icon:"🔥", name:"Burn it", desc:"Write it. Watch it burn.", fullDesc:"", bg:"#FFF7ED", border:"#FED7AA", placeholder:"" },
  { id:"huge", icon:"📢", name:"HUGE", desc:"One word. Fill the whole page.", fullDesc:"Sometimes one word is all you have got. Type it and watch it take over the whole screen.", bg:C.purpleLight, border:"#C4B5FD", placeholder:"One word..." },
];

function SpillScreen({ spark }) {
  const { recordSpill, spillCountToday } = spark;
  const [activeMode, setActiveMode] = useState(null);
  const [showMystery, setShowMystery] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  if(showMystery) return <MysteryActivity onBack={()=>setShowMystery(false)} />;
  if(activeMode?.id === "spin") return <SpinPrompt onBack={()=>setActiveMode(null)} />;
  if(activeMode?.id === "rip") return <RipItUp onBack={()=>setActiveMode(null)} />;
  if(activeMode?.id === "burn") return <BurnIt onBack={()=>setActiveMode(null)} />;
  if(activeMode) return (
    <SpillWriteScreen
      mode={activeMode}
      onBack={()=>setActiveMode(null)}
      onSave={()=>{ setSavedCount(c=>c+1); recordSpill(); }}
    />
  );

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#EC4899,#F472B6)", padding:"16px 20px 20px", color:C.white }}>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)" }}>Your space</div>
        <div style={{ fontSize:22, fontWeight:900 }}>💧 Spill</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)", marginTop:4 }}>Pick something. Say the thing. Get it out.</div>
      </div>
      <div style={{ padding:"16px 16px 0" }}>
        <div onClick={()=>setShowMystery(true)} style={{ background:"linear-gradient(135deg,#7C3AED,#9333EA)", borderRadius:16, padding:16, marginBottom:12, display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}
          onMouseDown={e=>e.currentTarget.style.transform="scale(0.98)"}
          onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
        >
          <div style={{ width:48, height:48, background:"rgba(255,255,255,0.15)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="4" width="20" height="20" rx="4" fill="rgba(255,255,255,0.3)"/>
              <circle cx="10" cy="10" r="2" fill="white"/>
              <circle cx="18" cy="10" r="2" fill="white"/>
              <circle cx="14" cy="14" r="2" fill="white"/>
              <circle cx="10" cy="18" r="2" fill="white"/>
              <circle cx="18" cy="18" r="2" fill="white"/>
            </svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:800, color:C.white }}>Stuck? Try this</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)", marginTop:2, lineHeight:1.4 }}>71 activities — get out of bed, move, reset, or spill it out</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
          {SPILL_MODES.map(m=>(
            <div key={m.id} onClick={()=>setActiveMode(m)} style={{ background:m.bg, border:`1.5px solid ${m.border}`, borderRadius:16, padding:"16px 12px", textAlign:"center", cursor:"pointer", transition:"transform 0.12s" }}
              onMouseDown={e=>e.currentTarget.style.transform="scale(0.95)"}
              onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
            >
              <div style={{ fontSize:30, marginBottom:6 }}>{m.icon}</div>
              <div style={{ fontSize:13, fontWeight:800, color:C.dark }}>{m.name}</div>
              <div style={{ fontSize:11, color:C.mid, marginTop:3, lineHeight:1.3 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        {spillCountToday>0 && <MemoryCard text={`You've spilled ${spillCountToday} time${spillCountToday===1?"":"s"} today. Getting it out of your head is the whole point.`} />}
      </div>
    </div>
  );
}

// ── COOL DOWN TOOL SCREEN ──────────────────────────────────────
function CoolDownToolScreen({ tool, onBack }) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
      <BackHeader title={`${tool.emoji} ${tool.name}`} onBack={onBack} bg={`linear-gradient(135deg,${tool.color},${tool.color}CC)`} />
      <div style={{ flex:1, padding:16, overflowY:"auto" }}>
        <div style={{ background:C.white, borderRadius:16, padding:14, border:`1.5px solid ${C.border}`, marginBottom:16 }}>
          <div style={{ fontSize:14, color:C.dark, lineHeight:1.6 }}>{tool.fullDesc}</div>
        </div>
        {tool.emoji==="🫁" && <BreathingTool color={tool.color} />}
        {tool.emoji==="🧊" && <FiveThings />}
        {tool.emoji!=="🫁" && tool.emoji!=="🧊" && (
          <div style={{ textAlign:"center", padding:32, color:C.mid }}>
            <div style={{ fontSize:48, marginBottom:12 }}>{tool.emoji}</div>
            <div style={{ fontSize:14, lineHeight:1.6 }}>This tool is coming very soon. For now — just being here, away from whatever was happening, already counts. 🌿</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── COOL DOWN ──────────────────────────────────────────────────
const COOLDOWN_TOOLS = [
  { emoji:"🫁", name:"Right here, right now", desc:"Slow everything down with your breath", fullDesc:"This is a breathing exercise. It sounds simple but it actually works — slow breathing tells your brain that you're safe. Follow the circle.", color:C.teal, bg:C.tealLight },
  { emoji:"🧊", name:"5-4-3-2-1", desc:"Use your senses to come back to now", fullDesc:"When everything feels too much, this pulls you back into the room you're actually in. Find the things it asks for — it works better than it sounds.", color:C.purple, bg:C.purpleLight },
  { emoji:"🌊", name:"Ride the wave", desc:"Let the feeling pass through instead of fighting it", fullDesc:"Feelings are like waves — they get bigger, peak, then shrink. This helps you ride it out instead of being knocked over by it.", color:"#0EA5E9", bg:"#E0F2FE" },
  { emoji:"🎵", name:"Sound it out", desc:"Music that helps your brain settle", fullDesc:"Some music genuinely helps your brain calm down. This gives you a playlist direction based on how you're feeling right now.", color:C.pink, bg:C.pinkLight },
  { emoji:"✍️", name:"Brain splat", desc:"Get it out of your head and onto something", fullDesc:"Sometimes the fastest way to feel less overwhelmed is to get everything out of your head. Doesn't have to make sense. Just dump it.", color:C.green, bg:C.greenLight },
  { emoji:"🤸", name:"Move it", desc:"Shake the feeling out through your body", fullDesc:"Feelings get stuck in your body. Moving — even just jumping or shaking your hands — actually helps shift them. This sounds weird. It works.", color:C.yellow, bg:C.yellowLight },
];

function CoolDownScreen({ spark }) {
  const [activeTool, setActiveTool] = useState(null);
  if(activeTool) return <CoolDownToolScreen tool={activeTool} onBack={()=>{ setActiveTool(null); if(spark) spark.addProgress('cooldown'); }} />;
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#0EA5E9,#0891B2)", padding:"16px 20px 20px", color:C.white }}>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)" }}>Right here, right now</div>
        <div style={{ fontSize:18, fontWeight:800 }}>Cool your brain down</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)", marginTop:4 }}>Pick whatever feels right. There's no wrong choice.</div>
      </div>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
          {COOLDOWN_TOOLS.map(t=>(
            <div key={t.name} onClick={()=>setActiveTool(t)} style={{ background:t.bg, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"16px 12px", textAlign:"center", cursor:"pointer", transition:"transform 0.12s" }}
              onMouseDown={e=>e.currentTarget.style.transform="scale(0.95)"}
              onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
            >
              <div style={{ fontSize:30, marginBottom:6 }}>{t.emoji}</div>
              <div style={{ fontSize:13, fontWeight:800, color:C.dark }}>{t.name}</div>
              <div style={{ fontSize:11, color:C.mid, marginTop:3, lineHeight:1.3 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BreathingTool({ color }) {
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(0);
  const start = () => {
    setPhase("in"); setCount(4);
    let c=4;
    const tick=setInterval(()=>{ c--; if(c<=0){ clearInterval(tick); setPhase("hold"); setCount(4); let h=4; const hold=setInterval(()=>{ h--; if(h<=0){ clearInterval(hold); setPhase("out"); setCount(6); let o=6; const out=setInterval(()=>{ o--; if(o<=0){ clearInterval(out); setPhase("done"); } else setCount(o); },1000); } else setCount(h); },1000); } else setCount(c); },1000);
  };
  const labels={ ready:"Tap the circle to start", in:"Breathe in...", hold:"Hold...", out:"Breathe out...", done:"Nice. How do you feel now?" };
  const size={ ready:80, in:110, hold:110, out:80, done:90 };
  return (
    <div style={{ textAlign:"center", padding:"20px 0" }}>
      <div onClick={phase==="ready"||phase==="done"?start:undefined} style={{ width:size[phase], height:size[phase], borderRadius:"50%", background:color, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:phase==="ready"||phase==="done"?13:32, fontWeight:800, cursor:phase==="ready"||phase==="done"?"pointer":"default", transition:"all 1.2s ease" }}>
        {phase==="ready"?"Tap me":phase==="done"?"Again?":count}
      </div>
      <div style={{ fontSize:16, fontWeight:700, color:C.dark }}>{labels[phase]}</div>
    </div>
  );
}

function FiveThings() {
  const prompts=["5 things you can SEE 👀","4 things you can TOUCH 🤚","3 things you can HEAR 👂","2 things you can SMELL 👃","1 thing you can TASTE 👅"];
  const [step,setStep]=useState(0);
  return (
    <div>
      <div style={{ background:C.white, borderRadius:16, padding:20, marginBottom:12, textAlign:"center", border:`1.5px solid ${C.border}` }}>
        <div style={{ fontSize:20, fontWeight:800, color:C.dark }}>{prompts[step]}</div>
        <div style={{ fontSize:13, color:C.mid, marginTop:6, lineHeight:1.4 }}>Look around the room you're in right now and find them</div>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        {step>0 && <button onClick={()=>setStep(step-1)} style={{ flex:1, background:C.light, border:"none", borderRadius:12, padding:12, fontFamily:"Nunito, sans-serif", fontSize:14, fontWeight:700, color:C.mid, cursor:"pointer" }}>Back</button>}
        {step<prompts.length-1
          ? <button onClick={()=>setStep(step+1)} style={{ flex:1, background:C.purple, border:"none", borderRadius:12, padding:12, fontFamily:"Nunito, sans-serif", fontSize:14, fontWeight:700, color:C.white, cursor:"pointer" }}>Found them →</button>
          : <button onClick={()=>setStep(0)} style={{ flex:1, background:C.green, border:"none", borderRadius:12, padding:12, fontFamily:"Nunito, sans-serif", fontSize:14, fontWeight:700, color:C.white, cursor:"pointer" }}>Done ✓</button>
        }
      </div>
    </div>
  );
}

// ── BLOOM ──────────────────────────────────────────────────────
function BloomScreen({ spark }) {
  const { plantName, bloomProgress, bloomStage, bloomStages, currentStage, memories } = spark;
  return (
    <div>
      <div style={{ background:"linear-gradient(160deg,#10B981,#059669)", padding:20, textAlign:"center", color:C.white }}>
        <div style={{ fontSize:64 }}>{currentStage.emoji}</div>
        <div style={{ fontSize:18, fontWeight:800, marginTop:8 }}>{plantName||"Ziggy"}</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)", marginTop:2 }}>Stage {bloomStage+1} — {currentStage.name}</div>
        <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"3px 12px", fontSize:11, fontWeight:700, color:C.white, display:"inline-block", marginTop:8 }}>{bloomProgress}% to {bloomStages[Math.min(bloomStage+1,5)].name} {bloomStages[Math.min(bloomStage+1,5)].emoji}</div>
      </div>
      <div style={{ padding:"16px 16px 0" }}>
        {bloomStages.map((s,i)=>(
          <div key={s.name} style={{ background:i<bloomStage?C.greenLight:C.white, border:`${i===bloomStage?"2px":"1.5px"} solid ${i<bloomStage?C.green:i===bloomStage?C.teal:C.border}`, borderRadius:14, padding:"12px 14px", marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:22, width:36, textAlign:"center" }}>{s.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:800, color:C.dark }}>{s.name}{i===bloomStage?" — you're here":""}</div>
              <div style={{ fontSize:11, color:C.mid, marginTop:1 }}>{s.desc}</div>
            </div>
            {i<bloomStage && <div style={{ fontSize:16, color:C.green }}>✓</div>}
            {i===bloomStage && <div style={{ fontSize:11, fontWeight:800, color:C.teal }}>NOW</div>}
          </div>
        ))}
        {memories.slice().reverse().slice(0,3).map((m,i)=>(
          <MemoryCard key={i} text={m.text} />
        ))}
      </div>
    </div>
  );
}

// ── RELATIONSHIPS ──────────────────────────────────────────────
function RelationshipsScreen({ setTab }) {
  return <RelationshipsHome onSpill={() => setTab("spill")} />;
}

// ── REAL WORLD ─────────────────────────────────────────────────
function RealWorldScreen({ setTab }) {
  return <RealWorldHome onSpill={() => setTab("spill")} />;
}

// ── SAFE CORNER ────────────────────────────────────────────────
const SAFE_ITEMS=[
  { emoji:"📞", bg:"#FEE2E2", title:"Talk to someone now", sub:"Childline: 0800 1111 — free, always open, no judgement" },
  { emoji:"💬", bg:C.yellowLight, title:"Text instead", sub:"Text HELLO to 85258 — if calling feels like too much" },
  { emoji:"🧑‍🤝‍🧑", bg:C.tealLight, title:"My trusted adult", sub:"Someone in your real life you can go to" },
  { emoji:"🫁", bg:C.purpleLight, title:"Right here, right now", sub:"Quick things to do when it's really a lot" },
  { emoji:"💧", bg:C.greenLight, title:"Spill it out", sub:"Sometimes getting it out of your head first helps" },
];

function SafeScreen() {
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#1E3A5F,#1E40AF)", padding:20, color:C.white }}>
        <div style={{ fontSize:20, fontWeight:800 }}>Your corner 🤍</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,0.85)", marginTop:6, lineHeight:1.6 }}>This bit is always here. You don't need to log in. Nobody knows you came here. No judgement, ever.</div>
      </div>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:14, padding:14, marginBottom:14 }}>
          <div style={{ fontSize:13, fontWeight:800, color:"#991B1B", marginBottom:4 }}>🚨 If you're in immediate danger right now</div>
          <div style={{ fontSize:13, color:"#7F1D1D", lineHeight:1.5 }}>Call 999 or get to your nearest A&E. You matter and people want to help you.</div>
        </div>
        {SAFE_ITEMS.map(item=>(
          <Card key={item.title}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:44, height:44, borderRadius:14, background:item.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{item.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color:C.dark }}>{item.title}</div>
                <div style={{ fontSize:12, color:C.mid, marginTop:2, lineHeight:1.4 }}>{item.sub}</div>
              </div>
              <i className="ti ti-chevron-right" style={{ color:C.mid, fontSize:16 }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── NAV ────────────────────────────────────────────────────────
const TABS=[
  { id:"home", label:"My Space", icon:"ti-home" },
  { id:"spill", label:"Spill", icon:"ti-droplet" },
  { id:"cooldown", label:"Cool Down", icon:"ti-wave-sine" },
  { id:"bloom", label:"My Bloom", icon:"ti-plant" },
  { id:"relationships", label:"People", icon:"ti-heart" },
  { id:"realworld", label:"Real World", icon:"ti-world" },
  { id:"safe", label:"Your Corner", icon:"ti-heart-handshake" },
];

// ── ROOT ───────────────────────────────────────────────────────
export default function App() {
  const spark = useSparkStorage();
  const [tab, setTab] = useState("home");

  if(!spark.onboarded) return <Onboarding onComplete={spark.completeOnboarding} />;

  const screens={
    home: <HomeScreen setTab={setTab} spark={spark} />,
    spill: <SpillScreen spark={spark} />,
    cooldown: <CoolDownScreen spark={spark} />,
    bloom: <BloomScreen spark={spark} />,
    relationships: <RelationshipsScreen setTab={setTab} />,
    realworld: <RealWorldScreen setTab={setTab} />,
    safe: <SafeScreen />,
  };

  return (
    <div style={{ height:"100dvh", width:"100%", display:"flex", flexDirection:"column", background:"#F0FDFA", fontFamily:"Nunito, sans-serif", maxWidth:480, margin:"0 auto", position:"relative", overflow:"hidden" }}>
      <div style={{ background:"linear-gradient(135deg,#0891B2,#06B6D4)", padding:"10px 20px 8px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.9)", fontWeight:700 }}>9:41</span>
        <span style={{ fontSize:18, fontWeight:900, color:C.white, letterSpacing:-1 }}>⚡ spark</span>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.9)" }}>●●●</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", paddingBottom:70, display:"flex", flexDirection:"column" }}>
        {screens[tab]}
      </div>
      <nav style={{ position:"absolute", bottom:0, left:0, right:0, background:C.white, borderTop:`1px solid ${C.border}`, display:"flex", padding:"6px 0 10px", zIndex:10 }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 2px", border:"none", background:"none", fontFamily:"Nunito, sans-serif", cursor:"pointer" }}>
            <i className={`ti ${t.icon}`} style={{ fontSize:18, color:tab===t.id?C.teal:C.mid }} />
            <span style={{ fontSize:8, fontWeight:700, color:tab===t.id?C.teal:C.mid, letterSpacing:"0.2px" }}>{t.label}</span>
            <div style={{ width:4, height:4, borderRadius:"50%", background:C.teal, opacity:tab===t.id?1:0, marginTop:1 }} />
          </button>
        ))}
      </nav>
    </div>
  );
}
