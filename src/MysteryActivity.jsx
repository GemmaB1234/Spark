import { useState } from "react";

const C = {
  teal: "#0891B2", tealLight: "#E0F7FA",
  pink: "#EC4899", pinkLight: "#FCE4EC",
  purple: "#7C3AED", purpleLight: "#EDE9FE",
  yellow: "#F59E0B", yellowLight: "#FEF9C3",
  green: "#10B981", greenLight: "#D1FAE5",
  orange: "#EA580C", orangeLight: "#FFF7ED",
  blue: "#3B82F6", blueLight: "#EFF6FF",
  dark: "#1E293B", mid: "#64748B",
  white: "#FFFFFF", border: "rgba(0,0,0,0.08)",
};

const ACTIVITIES = [
  // 🛏️ Body basics
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Get out of bed", desc: "Just your feet on the floor. That's the whole job.", time: "10 seconds" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Drink a full glass of water", desc: "Your brain genuinely works better when you're hydrated. Boring but true.", time: "1 minute" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Have a shower", desc: "Even a quick one. Something about warm water just resets things.", time: "10 minutes" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Change your clothes", desc: "Fresh clothes = fresh start. Even if you stay in pyjamas, different ones.", time: "2 minutes" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Open a window", desc: "Let some actual air in. Your brain needs oxygen.", time: "10 seconds" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Wash your face", desc: "Cold water on your face tells your nervous system to calm down. Actually works.", time: "1 minute" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Brush your teeth", desc: "Sometimes doing one basic thing unlocks the next one.", time: "2 minutes" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Eat something — anything", desc: "Even a biscuit. Low blood sugar makes everything harder.", time: "5 minutes" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Sit up straight for one minute", desc: "Your posture genuinely affects your mood. Try it.", time: "1 minute" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Put socks on", desc: "Weird one but warm feet = calmer brain. It's a thing.", time: "30 seconds" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Lie on the floor for a minute", desc: "Flat on your back, arms out. Let the floor hold you up for once.", time: "1 minute" },
  { cat: "body", label: "Body basics", color: C.purple, light: C.purpleLight, activity: "Stretch your arms above your head", desc: "Hold it for 10 seconds. Your body has been stuck in one position.", time: "30 seconds" },

  // 🚶 Move it
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Walk to another room", desc: "Literally just physically move to a different space. New room, new brain.", time: "30 seconds" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Go outside for 2 minutes", desc: "You don't have to do anything. Just stand outside. Fresh air is actually medicine.", time: "2 minutes" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Jump 10 times", desc: "Sounds silly. Does something to your brain chemistry. Just do it.", time: "20 seconds" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Shake your hands out", desc: "Shake them like they're wet and you're trying to dry them. Tension lives in your hands.", time: "30 seconds" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Walk around the block", desc: "One loop. You don't have to think about anything. Just walk.", time: "10 minutes" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Dance to one song", desc: "By yourself, in your room, full commitment. Nobody is watching.", time: "3 minutes" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Do 5 star jumps", desc: "Your body needs to move. This is the minimum viable exercise.", time: "20 seconds" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Roll your shoulders back 5 times", desc: "You've been hunching. You know you have.", time: "20 seconds" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Sit on the floor", desc: "Just the act of being closer to the ground helps some people feel more settled.", time: "1 minute" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Clench every muscle for 5 seconds then let go", desc: "Tense everything — fists, legs, face — then release. Your body will thank you.", time: "30 seconds" },
  { cat: "move", label: "Move it", color: C.green, light: C.greenLight, activity: "Walk to the kitchen and back", desc: "The smallest movement can break a stuck spell.", time: "1 minute" },

  // 🎵 Sensory reset
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Put your favourite song on", desc: "Not a playlist. One specific song you love. Let it play fully.", time: "3 minutes" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Make a hot drink", desc: "Tea, coffee, hot chocolate — whatever. Something warm in your hands.", time: "5 minutes" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Hold something cold", desc: "Ice cube, cold glass, cold water on your wrists. Sensory reset.", time: "1 minute" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Put a hoodie on", desc: "The weighted comfort of a good hoodie is legitimate self-care.", time: "30 seconds" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Turn the lights down or off", desc: "Sometimes your brain is overstimulated and just needs less input.", time: "10 seconds" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Sit in silence for 2 minutes", desc: "No phone, no music. Just the sounds that are actually in the room.", time: "2 minutes" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Smell something you like", desc: "A candle, a perfume, something from outside. Smell bypasses your thinking brain.", time: "30 seconds" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Get under a blanket", desc: "Weight and warmth are genuinely calming for your nervous system.", time: "2 minutes" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Splash cold water on your face", desc: "Activates your dive reflex and slows your heart rate. Sounds dramatic but works.", time: "30 seconds" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Find something soft to hold", desc: "A cushion, a jumper, a soft toy — no judgement. Texture is grounding.", time: "1 minute" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Put headphones in and close your eyes", desc: "Block out the world for one song. That's allowed.", time: "3 minutes" },
  { cat: "sensory", label: "Sensory reset", color: C.pink, light: C.pinkLight, activity: "Open the curtains", desc: "Let some actual daylight in. Light tells your brain what time it is.", time: "10 seconds" },

  // 🧠 Brain reset
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Watch one funny video", desc: "One. Not a scroll. Find one thing that will make you laugh and watch just that.", time: "5 minutes" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Doodle something random", desc: "Pen and paper, not your phone. Draw whatever your hand wants to draw.", time: "5 minutes" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Read one page of anything", desc: "A book, a magazine, the back of a cereal box. Just one page.", time: "3 minutes" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Count backwards from 20", desc: "Slowly. Out loud if you can. It interrupts the thought spiral.", time: "30 seconds" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Name 10 things you can see right now", desc: "Out loud. Just naming them. Pulls your brain back into the room.", time: "1 minute" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Think of 3 things you're looking forward to", desc: "Anything. Even tiny things. Even things that are weeks away.", time: "2 minutes" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Watch something you've seen before", desc: "Something comforting that you already know. Your brain doesn't have to work.", time: "20 minutes" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Say something kind about yourself out loud", desc: "One thing. Out loud, not just in your head. It counts more when you hear it.", time: "30 seconds" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Look up something you're curious about", desc: "One interesting thing. Not a rabbit hole. One thing.", time: "5 minutes" },
  { cat: "brain", label: "Brain reset", color: C.teal, light: C.tealLight, activity: "Write down everything in your head right now", desc: "Everything. The big stuff, the dumb stuff, the random stuff. Get it out.", time: "5 minutes" },

  // 🌱 Tiny task
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Make your bed", desc: "Even just pulling the duvet straight. It makes the room feel different.", time: "2 minutes" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Put one thing away", desc: "Pick up one thing that's out of place and put it where it belongs.", time: "1 minute" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Text someone you like", desc: "One message. Could just be a meme, a voice note, anything. Connection matters.", time: "2 minutes" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Delete 10 photos from your phone", desc: "Blurry ones, duplicates, screenshots you don't need. Tiny act of control.", time: "3 minutes" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Write a list of 3 things to do tomorrow", desc: "Not a big plan. Three small things. Gets it out of your head.", time: "2 minutes" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Tidy one surface", desc: "A desk, a windowsill, your bedside table. Just one.", time: "3 minutes" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Empty your bag out and repack it", desc: "Find what's in there. Throw away the rubbish. Put it back neatly.", time: "5 minutes" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Reply to one message you've been ignoring", desc: "The shortest reply that ends the anxiety about not replying.", time: "2 minutes" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Charge your phone properly", desc: "Not just 20%. Actually let it charge. Future you will be grateful.", time: "1 minute" },
  { cat: "task", label: "Tiny task", color: C.yellow, light: C.yellowLight, activity: "Write down one thing you're worried about", desc: "Just getting it onto paper makes it less of a monster in your head.", time: "2 minutes" },

  // 🌤️ Outside world
  { cat: "outside", label: "Outside world", color: C.orange, light: C.orangeLight, activity: "Look out a window for 1 minute", desc: "Just look at what's outside. You don't have to do anything with what you see.", time: "1 minute" },
  { cat: "outside", label: "Outside world", color: C.orange, light: C.orangeLight, activity: "Find something green", desc: "A plant, a tree through a window, anything. Nature helps even in tiny doses.", time: "1 minute" },
  { cat: "outside", label: "Outside world", color: C.orange, light: C.orangeLight, activity: "Notice 3 sounds around you", desc: "Close your eyes and just listen. What can you actually hear?", time: "1 minute" },
  { cat: "outside", label: "Outside world", color: C.orange, light: C.orangeLight, activity: "Step outside and look at the sky", desc: "Even for 30 seconds. The sky is always doing something.", time: "1 minute" },
  { cat: "outside", label: "Outside world", color: C.orange, light: C.orangeLight, activity: "Water a plant", desc: "If you have one. If not, find one — a weed in a crack counts.", time: "2 minutes" },
  { cat: "outside", label: "Outside world", color: C.orange, light: C.orangeLight, activity: "Watch something outside move", desc: "A bird, clouds, traffic, people, leaves. Just watch one thing move.", time: "2 minutes" },
  { cat: "outside", label: "Outside world", color: C.orange, light: C.orangeLight, activity: "Take 3 deep breaths of outside air", desc: "Open a door or window. Three slow breaths. Feels different to indoor air.", time: "1 minute" },
  { cat: "outside", label: "Outside world", color: C.orange, light: C.orangeLight, activity: "Notice the light right now", desc: "What time of day does the light look like? Warm or cold? Bright or soft?", time: "30 seconds" },

  // 💧 Spill it
  { cat: "spill", label: "Spill it", color: C.pink, light: C.pinkLight, activity: "Write one word that describes right now", desc: "Just one. Doesn't have to be a feeling word. Could be anything.", time: "1 minute" },
  { cat: "spill", label: "Spill it", color: C.pink, light: C.pinkLight, activity: "Do a brain splat", desc: "Open Spill and just dump everything in your head into the Brain Splat. No rules.", time: "5 minutes" },
  { cat: "spill", label: "Spill it", color: C.pink, light: C.pinkLight, activity: "Write the thing you can't say out loud", desc: "Open The Unsent. Write it. It stays there. Nobody sees it.", time: "5 minutes" },
  { cat: "spill", label: "Spill it", color: C.pink, light: C.pinkLight, activity: "Find your Spark of the day", desc: "One tiny okay thing from today. Even the smallest thing counts.", time: "2 minutes" },
  { cat: "spill", label: "Spill it", color: C.pink, light: C.pinkLight, activity: "Do a vibe check", desc: "Go to My Space and tap the vibe that fits right now. Name what's happening.", time: "1 minute" },
  { cat: "spill", label: "Spill it", color: C.pink, light: C.pinkLight, activity: "Write a letter to future you", desc: "One month from now. What do you want them to know?", time: "5 minutes" },
  { cat: "spill", label: "Spill it", color: C.pink, light: C.pinkLight, activity: "Spin a prompt and write for 3 minutes", desc: "Go to Spill, hit Spin, pick the first one that feels okay, write for 3 minutes.", time: "5 minutes" },
  { cat: "spill", label: "Spill it", color: C.pink, light: C.pinkLight, activity: "Draw how you feel instead of writing it", desc: "Doesn't have to look like anything. Scribble the feeling. Use colours.", time: "5 minutes" },
];

const CATS = [
  { id: "all", label: "Everything", color: C.teal },
  { id: "body", label: "Body basics", color: C.purple },
  { id: "move", label: "Move it", color: C.green },
  { id: "sensory", label: "Sensory reset", color: C.pink },
  { id: "brain", label: "Brain reset", color: C.teal },
  { id: "task", label: "Tiny task", color: C.yellow },
  { id: "outside", label: "Outside world", color: C.orange },
  { id: "spill", label: "Spill it", color: C.pink },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MysteryActivity({ onBack }) {
  const [cat, setCat] = useState("all");
  const [current, setCurrent] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState([]);

  const getActivity = () => {
    if (spinning) return;
    setSpinning(true);
    setDone(false);
    const pool = cat === "all" ? ACTIVITIES : ACTIVITIES.filter(a => a.cat === cat);
    const available = pool.filter(a => !history.includes(a.activity));
    const source = available.length > 0 ? available : pool;

    let count = 0;
    const max = 6 + Math.floor(Math.random() * 4);
    const interval = setInterval(() => {
      setCurrent(source[Math.floor(Math.random() * source.length)]);
      count++;
      if (count >= max) {
        clearInterval(interval);
        const chosen = source[Math.floor(Math.random() * source.length)];
        setCurrent(chosen);
        setHistory(h => [...h.slice(-20), chosen.activity]);
        setSpinning(false);
      }
    }, 80 + count * 15);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#7C3AED,#9333EA)", padding: "12px 16px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.white }}>Stuck? Try this</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{ACTIVITIES.length} activities — something will fit</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {/* Category filter */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.mid, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>What kind of thing?</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATS.map(c => (
              <div key={c.id} onClick={() => { setCat(c.id); setCurrent(null); setDone(false); }} style={{
                background: cat === c.id ? c.color : C.white,
                color: cat === c.id ? C.white : C.mid,
                border: `1.5px solid ${cat === c.id ? c.color : C.border}`,
                borderRadius: 20, padding: "6px 12px",
                fontSize: 11, fontWeight: 700, cursor: "pointer",
                transition: "all 0.15s",
              }}>{c.label}</div>
            ))}
          </div>
        </div>

        {/* Activity card */}
        <div style={{
          background: current ? current.light : C.white,
          border: `2px solid ${current ? current.color : C.border}`,
          borderRadius: 20, padding: 24,
          minHeight: 200, marginBottom: 16,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", transition: "all 0.2s",
          position: "relative", overflow: "hidden",
        }}>
          {/* Decorative corner */}
          {current && (
            <div style={{
              position: "absolute", top: 12, right: 12,
              background: current.color, borderRadius: 10,
              padding: "3px 8px", fontSize: 10, fontWeight: 800, color: C.white,
            }}>{current.time}</div>
          )}

          {!current && !spinning && (
            <div style={{ color: C.mid, fontSize: 15, lineHeight: 1.6 }}>
              Feeling stuck?<br />
              <span style={{ fontWeight: 800, color: C.dark }}>Tap the button below</span><br />
              and we'll find you something to do.
            </div>
          )}

          {(current || spinning) && (
            <>
              {/* Category badge */}
              {current && (
                <div style={{
                  background: current.color, borderRadius: 20,
                  padding: "4px 12px", fontSize: 11, fontWeight: 800,
                  color: C.white, marginBottom: 12,
                  opacity: spinning ? 0.5 : 1, transition: "opacity 0.2s",
                }}>{current?.label}</div>
              )}

              {/* Main activity */}
              <div style={{
                fontSize: spinning ? 15 : 22,
                fontWeight: 900,
                color: current?.color || C.dark,
                marginBottom: 8,
                lineHeight: 1.3,
                opacity: spinning ? 0.4 : 1,
                transition: "all 0.15s",
              }}>{current?.activity}</div>

              {/* Description */}
              {!spinning && current && (
                <div style={{
                  fontSize: 14, color: C.dark,
                  lineHeight: 1.6, marginTop: 4,
                }}>{current.desc}</div>
              )}

              {spinning && (
                <div style={{ fontSize: 13, color: C.mid, marginTop: 8 }}>Finding something...</div>
              )}
            </>
          )}
        </div>

        {/* Done button */}
        {current && !spinning && !done && (
          <div style={{ marginBottom: 10 }}>
            <button onClick={() => setDone(true)} style={{
              width: "100%", background: current.light,
              border: `1.5px solid ${current.color}`,
              borderRadius: 14, padding: 14,
              fontFamily: "Nunito, sans-serif",
              fontSize: 14, fontWeight: 800,
              color: current.color, cursor: "pointer",
              marginBottom: 8,
            }}>I did it ✓</button>
          </div>
        )}

        {done && (
          <div style={{ background: C.greenLight, border: `1.5px solid ${C.green}`, borderRadius: 16, padding: 16, textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill={C.green} opacity="0.2" />
                <circle cx="16" cy="16" r="10" fill={C.green} opacity="0.3" />
                <circle cx="16" cy="16" r="6" fill={C.green} />
                <path d="M12 16L15 19L20 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#065F46" }}>
              You did something. That matters.
            </div>
            <div style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>Your plant just grew a tiny bit.</div>
          </div>
        )}

        {/* Shuffle button */}
        <button onClick={getActivity} style={{
          width: "100%",
          background: spinning ? C.mid : "linear-gradient(135deg,#7C3AED,#9333EA)",
          border: "none", borderRadius: 14, padding: "16px 24px",
          fontFamily: "Nunito, sans-serif", fontSize: 16,
          fontWeight: 800, color: C.white, cursor: "pointer",
          transition: "all 0.15s", marginBottom: 16,
        }}>
          {spinning ? "Finding something..." : current ? "Try a different one" : "Find me something to do"}
        </button>

        {/* How many options */}
        <div style={{ textAlign: "center", fontSize: 12, color: C.mid, paddingBottom: 8 }}>
          {cat === "all" ? ACTIVITIES.length : ACTIVITIES.filter(a => a.cat === cat).length} activities in this category
        </div>
      </div>
    </div>
  );
}
