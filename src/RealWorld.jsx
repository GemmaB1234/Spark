import { useState } from "react";

const C = {
  teal: "#0891B2", tealLight: "#E0F7FA",
  pink: "#EC4899", pinkLight: "#FCE4EC",
  purple: "#7C3AED", purpleLight: "#EDE9FE",
  yellow: "#F59E0B", yellowLight: "#FEF9C3",
  green: "#10B981", greenLight: "#D1FAE5",
  red: "#EF4444", redLight: "#FEF2F2",
  orange: "#EA580C", orangeLight: "#FFF7ED",
  dark: "#1E293B", mid: "#64748B",
  white: "#FFFFFF", border: "rgba(0,0,0,0.08)",
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    {title && <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>{title}</div>}
    <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const Highlight = ({ children, color = C.tealLight, border = C.teal }) => (
  <div style={{ background: color, border: `1.5px solid ${border}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
    <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>{children}</div>
  </div>
);

const Stat = ({ num, text, color = C.purple, bg = C.purpleLight }) => (
  <div style={{ background: bg, border: `1.5px solid ${color}`, borderRadius: 14, padding: 14, marginBottom: 12, textAlign: "center" }}>
    <div style={{ fontSize: 32, fontWeight: 900, color }}>{num}</div>
    <div style={{ fontSize: 13, color: C.dark, marginTop: 4, lineHeight: 1.4 }}>{text}</div>
  </div>
);

const BackHeader = ({ title, emoji, onBack, bg }) => (
  <div style={{ background: bg, padding: "12px 16px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
    <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    <div style={{ fontSize: 22, flexShrink: 0 }}>{emoji}</div>
    <div style={{ fontSize: 16, fontWeight: 800, color: C.white, lineHeight: 1.2 }}>{title}</div>
  </div>
);

const SpillPrompt = ({ prompt, onSpill }) => (
  <div style={{ background: C.tealLight, border: `1.5px solid ${C.teal}`, borderRadius: 14, padding: 14, marginTop: 8, marginBottom: 16 }}>
    <div style={{ fontSize: 12, fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6 }}>💧 Want to spill about this?</div>
    <div style={{ fontSize: 13, color: C.dark, marginBottom: 10, lineHeight: 1.5 }}>{prompt}</div>
    <button onClick={onSpill} style={{ background: C.teal, color: C.white, border: "none", borderRadius: 10, padding: "10px 16px", fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 800, cursor: "pointer", width: "100%" }}>Go to Spill</button>
  </div>
);

// ── 1. THE HIGHLIGHT REEL ──────────────────────────────────────
function HighlightReel({ onBack, onSpill }) {
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(null);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="The highlight reel" emoji="📸" onBack={onBack} bg="linear-gradient(135deg,#7C3AED,#4F46E5)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          What you see on social media is not real life. It is a carefully selected, often edited, best-possible version of someone's life. Everyone is doing this — including the people whose lives look perfect.
        </Section>
        <Stat num="97%" text="of what people post online is the best 3% of their actual life" color={C.purple} bg={C.purpleLight} />
        <Section title="What actually goes into a post">
          Think about the last time someone posted a photo. What you didn't see: the 47 photos they took before that one, the filter they used, the angle they chose, the caption they rewrote four times, and the hour they spent deciding whether to post it at all. What you did see: one perfect moment.
        </Section>
        <Highlight color={C.purpleLight} border={C.purple}>
          You are comparing your entire life — including all the boring, hard, and bad bits — to someone else's highlight reel. That is never going to be a fair comparison. It is not supposed to be.
        </Highlight>
        <Section title="The algorithm makes it worse">
          Social media platforms are designed to show you the most engaging content — which usually means the most beautiful, dramatic, or impressive stuff. So what you see is already a filtered version of an already filtered version of someone's life.
        </Section>
        <Section title="Reality check">
          <div style={{ fontSize: 13, color: C.mid, marginBottom: 12 }}>Think about your own life. How often do you post the hard stuff?</div>
          {!revealed ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Almost never — I only post good things", "Sometimes — I post the real stuff occasionally", "Often — I'm pretty honest online"].map((opt, i) => (
                <div key={i} onClick={() => { setScore(i); setRevealed(true); }} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontSize: 14, color: C.dark }}
                  onMouseDown={e => e.currentTarget.style.background = C.purpleLight}
                  onMouseUp={e => e.currentTarget.style.background = C.white}
                >{opt}</div>
              ))}
            </div>
          ) : (
            <div style={{ background: C.purpleLight, border: `1.5px solid ${C.purple}`, borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>
                {score === 0 ? "Most people are the same. Everyone's doing the highlight reel thing — which means everyone else is also seeing a false picture of your life. Nobody's timeline is real." : score === 1 ? "That takes guts. The people who post the real stuff tend to get the most genuine responses — because everyone recognises it." : "That's genuinely rare. Being honest online is harder than it sounds. The algorithms don't always reward it — but real people do."}
              </div>
            </div>
          )}
        </Section>
        <Section title="What to do with this">
          Next time you feel worse after scrolling, remind yourself: you just watched a carefully produced show. It wasn't real life. Your life — messy, boring, complicated, ordinary — is real. That's actually the valuable thing.
        </Section>
        <SpillPrompt prompt="Is there someone online whose life makes you feel worse about yours? Write about what you actually think is going on for them." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── 2. WHEN LIKES FEEL LIKE EVERYTHING ────────────────────────
function LikesEverything({ onBack, onSpill }) {
  const [checked, setChecked] = useState([]);
  const toggle = i => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  const signs = [
    "You check how many likes you got within minutes of posting",
    "You feel genuinely upset if a post doesn't do well",
    "You've deleted a post because it didn't get enough likes",
    "You judge whether something was worth doing based on how it performed online",
    "You feel better about yourself when a post does well and worse when it doesn't",
    "You post things mainly to see how people react rather than because you want to share them",
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="When likes feel like everything" emoji="💔" onBack={onBack} bg="linear-gradient(135deg,#EC4899,#EF4444)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          If you feel a genuine lift when a post does well and a genuine dip when it doesn't — you're not weak or shallow. Your brain is doing exactly what it was designed to do. The problem is the thing it was designed to do is being exploited.
        </Section>
        <Section title="What's actually happening in your brain">
          When someone likes your post, your brain releases a small amount of dopamine — the same chemical involved in feeling good about food, connection, and achievement. Social media platforms know this. They are designed to trigger that response and then make you chase it.
        </Section>
        <Stat num="6 seconds" text="is roughly how long the dopamine hit from a like lasts before you want another one" color={C.pink} bg={C.pinkLight} />
        <Highlight color={C.pinkLight} border={C.pink}>
          You are not addicted to likes because you're vain. You're addicted to likes because billion-dollar companies spent years engineering something specifically designed to be addictive. This is not a personal failure.
        </Highlight>
        <Section title="Check in — do any of these sound familiar?">
          <div style={{ fontSize: 13, color: C.mid, marginBottom: 10 }}>Tick the ones that are true for you.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {signs.map((s, i) => (
              <div key={i} onClick={() => toggle(i)} style={{ background: checked.includes(i) ? C.pinkLight : C.white, border: `1.5px solid ${checked.includes(i) ? C.pink : C.border}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10, transition: "all 0.15s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${checked.includes(i) ? C.pink : C.border}`, background: checked.includes(i) ? C.pink : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  {checked.includes(i) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                </div>
                <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.4 }}>{s}</div>
              </div>
            ))}
          </div>
          {checked.length > 0 && (
            <div style={{ background: checked.length >= 4 ? C.redLight : checked.length >= 2 ? C.yellowLight : C.greenLight, border: `1.5px solid ${checked.length >= 4 ? C.red : checked.length >= 2 ? C.yellow : C.green}`, borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 4 }}>
                {checked.length >= 4 ? "Social media is having a real effect on how you feel about yourself." : checked.length >= 2 ? "Some of this is affecting you more than it probably should." : "You've got a relatively healthy relationship with this stuff."}
              </div>
              <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>
                {checked.length >= 4 ? "That's worth paying attention to. Your worth isn't measured in likes — but when you're in it, that's easy to forget. The stuff below might help." : checked.length >= 2 ? "It's normal for some of this to land. The trick is noticing when it's affecting how you feel about your actual life, not just your online one." : "Keep noticing though. It can creep up."}
              </div>
            </div>
          )}
        </Section>
        <Section title="What actually helps">
          Turning off like counts if the platform lets you. Posting things without immediately checking back. Asking yourself before you post — am I sharing this because I want to, or because I want a reaction? Noticing how you feel after scrolling vs after doing something offline.
        </Section>
        <SpillPrompt prompt="How do you actually feel when a post doesn't do well? Write the honest version." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── 3. COMMENT AND LIKE TRAUMA ────────────────────────────────
function CommentTrauma({ onBack, onSpill }) {
  const [step, setStep] = useState(null);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Comment and like trauma" emoji="😰" onBack={onBack} bg="linear-gradient(135deg,#EF4444,#DC2626)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Getting a nasty comment, being subtweeted, having a post ignored, watching someone screenshot your message — these things hurt. They are supposed to hurt. The fact that they happened online doesn't make them less real.
        </Section>
        <Highlight color={C.redLight} border={C.red}>
          "It's just the internet" is something people say to minimise your feelings. Online hurt is real hurt. The brain processes social rejection the same way whether it happens in person or on a screen.
        </Highlight>
        <Section title="The specific things that hit hardest">
          Being left on read. Getting fewer likes than you expected. A comment that seems fine on the surface but you know is a dig. Being left out of something you can see others were invited to. Someone screenshotting something private. Vague posts you're pretty sure are about you.
        </Section>
        <Section title="What to do right now — pick where you are">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Something just happened and I'm still in it", content: "First — close the app. Whatever it is, more scrolling is going to make it worse. Put the phone down for at least 10 minutes. You don't have to respond to anything right now. The internet will still be there. Take some actual breaths. What happened is real, your feelings about it are real, and you don't have to process it while it's still live." },
              { label: "It happened a while ago but I can't stop thinking about it", content: "This is really common. Online things stick around in a way that in-person things sometimes don't — because they're permanent, searchable, shareable. Getting it out of your head is important. Write about it. Say the thing out loud. Tell someone what happened. The more you replay it silently the bigger it gets." },
              { label: "It's been a pattern — this keeps happening", content: "If someone is consistently making you feel bad online — whether directly or indirectly — that's not something to just absorb. Blocking and muting exist for a reason. Removing yourself from someone's ability to affect you is a valid and smart choice. You don't owe anyone access to you." },
              { label: "I did something online and I'm ashamed of it", content: "This happens. People say things online they wouldn't say in person. If you've hurt someone, a genuine apology goes a long way — not a defensive one, a real one. If it's something you can delete, delete it. If you can't undo it, you can still decide to be different going forward. Everyone gets this wrong sometimes." },
            ].map((s, i) => (
              <div key={i} onClick={() => setStep(step === i ? null : i)} style={{ background: step === i ? C.redLight : C.white, border: `1.5px solid ${step === i ? C.red : C.border}`, borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.4, flex: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: C.mid, marginLeft: 8 }}>{step === i ? "▲" : "▼"}</div>
                </div>
                {step === i && <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.red}` }}>{s.content}</div>}
              </div>
            ))}
          </div>
        </Section>
        <Section title="When to tell someone">
          If something online is making you feel unsafe, or if someone is sharing private images or information about you, or if it's happened repeatedly — tell a trusted adult. Not because you can't handle it, but because some of this requires an adult to intervene.
        </Section>
        <SpillPrompt prompt="What's the online thing that's hurt you most? Write it out — you don't have to figure out why, just say what happened." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── 4. IMAGE PRESSURE AND FILTERS ─────────────────────────────
function ImagePressure({ onBack, onSpill }) {
  const [flipped, setFlipped] = useState({});
  const facts = [
    { myth: "The people I follow online actually look like that", truth: "Most images online have been filtered, edited, lit carefully, or taken from hundreds of attempts. Many have been altered using apps that reshape bodies, smooth skin, and change proportions. What you're seeing often doesn't exist in real life." },
    { myth: "If I just looked a certain way I'd feel better about myself", truth: "Research consistently shows that people who achieve the body or look they were chasing don't feel better about themselves long-term. The feeling of not being enough moves with you. It's not a body problem." },
    { myth: "Everyone else is comfortable with how they look", truth: "Studies show that the majority of young people — including the ones who look confident online — have significant insecurities about their appearance. The confident performance is usually exactly that: a performance." },
    { myth: "Beauty standards have always been like this", truth: "Beauty standards change completely across time and cultures. What's considered attractive now is completely different to what was considered attractive 50 years ago, or in different parts of the world. It's not a truth — it's a trend." },
    { myth: "Using filters is harmless", truth: "Filters can be fun. But consistently seeing a filtered version of your own face — smoother, slimmer, more symmetrical — has been shown to make people less comfortable with their real face over time. Your real face is the actual one." },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Image pressure & filters" emoji="🪞" onBack={onBack} bg="linear-gradient(135deg,#F59E0B,#EA580C)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          There is a huge amount of pressure — especially online — about how you're supposed to look. Most of it is manufactured. Here's what's actually true.
        </Section>
        <Stat num="90%" text="of young people say social media makes them feel worse about their body at least some of the time" color={C.orange} bg={C.orangeLight} />
        <Section title="Tap to flip — myth vs reality">
          <div style={{ fontSize: 13, color: C.mid, marginBottom: 10 }}>Tap each one to see what's actually true.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {facts.map((f, i) => (
              <div key={i} onClick={() => setFlipped(fl => ({ ...fl, [i]: !fl[i] }))} style={{ background: flipped[i] ? C.greenLight : C.yellowLight, border: `1.5px solid ${flipped[i] ? C.green : C.yellow}`, borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s", minHeight: 80 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: flipped[i] ? C.green : C.yellow, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6 }}>{flipped[i] ? "✓ Reality" : "Myth"}</div>
                <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.5 }}>{flipped[i] ? f.truth : f.myth}</div>
              </div>
            ))}
          </div>
        </Section>
        <Highlight color={C.tealLight} border={C.teal}>
          Your body is not a before photo. It's not a project. It's the thing that carries you through your entire life. It deserves better than being compared to images that don't exist in real life.
        </Highlight>
        <Section title="If this is really affecting you">
          If worries about how you look are taking up a lot of your time and energy, or affecting what you eat, or making you avoid things — please talk to someone. A doctor, a trusted adult, or go to Your Corner in this app. This stuff can be treated and it gets better.
        </Section>
        <SpillPrompt prompt="What's the thing about how you look that social media makes you feel worst about? Write the honest version." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── 5. MUTE BLOCK STEP BACK ───────────────────────────────────
function MuteBlock({ onBack, onSpill }) {
  const [done, setDone] = useState([]);
  const toggle = i => setDone(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i]);
  const tools = [
    { title: "Mute", desc: "They can't tell you've muted them. Their posts disappear from your feed. You're still following — nothing awkward — but you stop seeing their stuff. Use this for: people whose posts consistently make you feel worse, but where unfollowing would be complicated.", icon: "🔕" },
    { title: "Restrict", desc: "On most platforms, restricting someone means they can still comment on your posts — but only you can see their comments. They don't know. Great for: people you can't block but need some distance from.", icon: "🛡️" },
    { title: "Block", desc: "They can't see your profile, find you in search, or contact you. You can do this quietly — they won't be notified. Use this for: anyone making you feel unsafe or consistently treating you badly. You don't need a reason beyond 'I don't want them to have access to me'.", icon: "🚫" },
    { title: "Close friends list", desc: "On some platforms you can share things with a smaller group only. Use this for: posting the real stuff without it going to everyone.", icon: "👥" },
    { title: "Take a break", desc: "Most platforms have a 'take a break' feature that reminds you to stop after a set time. Or you can delete the app for a day and see how you feel. Withdrawal is real but it usually passes after about 24 hours.", icon: "⏸️" },
    { title: "Curate your feed", desc: "Actively follow accounts that make you feel good — learning things, making you laugh, showing you things you're interested in. Unfollow or mute anything that consistently makes you feel worse. You built your feed. You can rebuild it.", icon: "✨" },
    { title: "Turn off notifications", desc: "You don't have to know immediately every time someone does something. Notifications are designed to pull you back in. Turning them off gives you back control over when you engage.", icon: "🔔" },
    { title: "Screen time limits", desc: "Set a time limit on the apps you use most. The first few days feel annoying. Then it becomes normal. Your brain genuinely adjusts.", icon: "⏱️" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Mute, block, step back" emoji="🔕" onBack={onBack} bg="linear-gradient(135deg,#0891B2,#06B6D4)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          You have more control over your online experience than most people use. These tools exist. Here's what they actually do and when to use them.
        </Section>
        <Highlight color={C.tealLight} border={C.teal}>
          Blocking someone is not dramatic. Muting someone is not passive aggressive. Stepping back from an app is not failure. These are all just tools for protecting your headspace. Use them.
        </Highlight>
        <Section title="Your toolkit — tap the ones you've tried">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {tools.map((t, i) => (
              <div key={i} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{t.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 4 }}>{t.title}</div>
                    <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                  <div onClick={() => toggle(i)} style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${done.includes(i) ? C.green : C.border}`, background: done.includes(i) ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                    {done.includes(i) && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {done.length > 0 && (
            <div style={{ background: C.greenLight, border: `1.5px solid ${C.green}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#065F46" }}>You've tried {done.length} of these. That's {done.length === 1 ? "a start" : "genuinely good"}.</div>
              <div style={{ fontSize: 13, color: C.mid, marginTop: 4 }}>The more of these you use, the more your online experience becomes something you chose rather than something that just happens to you.</div>
            </div>
          )}
        </Section>
        <SpillPrompt prompt="Is there something online you've been putting up with that you could actually do something about?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── 6. ONLINE YOU VS REAL YOU ──────────────────────────────────
function OnlineVsReal({ onBack, onSpill }) {
  const [answers, setAnswers] = useState({});
  const questions = [
    "My online self is pretty much the same as my real self",
    "I feel more confident expressing myself online than in person",
    "I sometimes say things online I wouldn't say in real life",
    "I worry about how my online presence looks to other people",
    "I feel like my online self is a better version of me",
    "I've felt like I'm performing a character online rather than being myself",
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Online you vs real you" emoji="🪞" onBack={onBack} bg="linear-gradient(135deg,#7C3AED,#9333EA)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Most people have a slightly different version of themselves online. That's normal. But it's worth thinking about how different they are — and whether the gap is making you feel good or exhausted.
        </Section>
        <Section title="The performance of being online">
          When you post something, you're making choices: what to show, what to leave out, how to frame it, what caption to use. Even if you're being honest, you're still curating. We all are. The question is whether the version you're presenting feels like you or feels like a character you're maintaining.
        </Section>
        <Highlight color={C.purpleLight} border={C.purple}>
          There's nothing wrong with having a public self that's slightly different to your private self. Everyone does this — not just online. But when the gap gets big, it gets tiring. Performing a version of yourself constantly is exhausting.
        </Highlight>
        <Section title="Quick reflection — agree or disagree?">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {questions.map((q, i) => (
              <div key={i} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 10, lineHeight: 1.4 }}>{q}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Agree", "Disagree"].map(opt => (
                    <button key={opt} onClick={() => setAnswers(a => ({ ...a, [i]: opt }))} style={{ flex: 1, background: answers[i] === opt ? C.purple : C.white, color: answers[i] === opt ? C.white : C.mid, border: `1.5px solid ${answers[i] === opt ? C.purple : C.border}`, borderRadius: 10, padding: "8px 12px", fontFamily: "Nunito, sans-serif", fontSize: 12, fontWeight: 800, cursor: "pointer", transition: "all 0.15s" }}>{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {Object.keys(answers).length >= 4 && (
            <div style={{ background: C.purpleLight, border: `1.5px solid ${C.purple}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>
                {Object.values(answers).filter(a => a === "Agree").length >= 4
                  ? "You've got a pretty clear picture of where you are with this. Awareness is the first step — if any of these are tiring you out, the stuff about being more authentic online is worth trying."
                  : "There's no perfect pattern here. What matters is whether your online self feels like an expression of who you are or a performance you're keeping up."}
              </div>
            </div>
          )}
        </Section>
        <Section title="On being more real online">
          You don't have to share everything to be authentic. Authenticity isn't about oversharing — it's about not pretending. Not performing happiness you don't feel. Not chasing a version of yourself that doesn't exist. Being selective is fine. Being fake is just tiring.
        </Section>
        <SpillPrompt prompt="What's the difference between your online self and your real self? Which one do you actually prefer?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── 7. PARASOCIAL RELATIONSHIPS ───────────────────────────────
function Parasocial({ onBack, onSpill }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="People you've never met" emoji="🎭" onBack={onBack} bg="linear-gradient(135deg,#EC4899,#8B5CF6)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          A parasocial relationship is when you feel a real connection to someone — a YouTuber, a streamer, a musician, an influencer — who doesn't know you exist. The feelings are completely real. The relationship is one-sided.
        </Section>
        <Section title="Why it happens">
          When you watch someone's content regularly, your brain starts to process them like a real relationship. You learn their personality, their habits, their opinions. They feel familiar in the way a friend feels familiar. That familiarity creates genuine feelings of connection — even though they have no idea who you are.
        </Section>
        <Highlight color={C.pinkLight} border={C.pink}>
          This is not embarrassing or weird. It is how human brains work. We evolved to form bonds with people we spend time with — and your brain can't always tell the difference between spending time with someone in person and watching them on a screen.
        </Highlight>
        <Section title="When it's fine">
          Following someone whose content you enjoy, feeling motivated by them, feeling like their experience resonates with yours — all completely normal. Parasocial relationships can give you a sense of community, especially if you feel alone or like nobody around you gets it.
        </Section>
        <Section title="When to pay attention">
          When the relationship starts to feel more important than your real-life relationships. When you feel genuinely hurt or betrayed if they do something you disagree with. When you spend more time thinking about them than about the people in your actual life. When you feel like they know you — even though they don't.
        </Section>
        <Highlight color={C.yellowLight} border={C.yellow}>
          The person you follow online is also a character — a version of themselves they've chosen to present. You might feel like you know them, but you know their content, not them. That distinction matters.
        </Highlight>
        <Section title="What to do with it">
          You don't have to cut off content you enjoy. Just notice when the feelings are getting out of proportion. Make sure the people who actually know you — who can actually be there — are getting some of that energy too.
        </Section>
        <SpillPrompt prompt="Is there someone online you feel genuinely connected to? Write about what that connection feels like and what you get from it." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── 8. WHEN TO GET HELP ───────────────────────────────────────
function WhenToGetHelp({ onBack, onSpill }) {
  const [checked, setChecked] = useState([]);
  const toggle = i => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  const signs = [
    "You feel anxious or panicky when you can't check your phone",
    "Social media is the first thing you check in the morning and last thing at night",
    "You feel significantly worse about yourself after using social media most days",
    "You've cancelled real-life plans to stay online",
    "You're losing sleep because of time online or because of things that happened online",
    "Something that happened online is affecting how you feel in the rest of your life",
    "You're avoiding things because of how you feel about your appearance",
    "You've received threats, had private images shared, or been targeted by a group online",
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="When to get help" emoji="🤍" onBack={onBack} bg="linear-gradient(135deg,#1E3A5F,#1E40AF)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Most of the effects of social media are manageable with the stuff in this section. But sometimes the impact goes deeper than that — and when it does, talking to someone is the right move.
        </Section>
        <Section title="Signs it might be time to talk to someone">
          <div style={{ fontSize: 13, color: C.mid, marginBottom: 10 }}>Tick any that apply to you right now.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {signs.map((s, i) => (
              <div key={i} onClick={() => toggle(i)} style={{ background: checked.includes(i) ? "#FEF2F2" : C.white, border: `1.5px solid ${checked.includes(i) ? C.red : C.border}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10, transition: "all 0.15s" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${checked.includes(i) ? C.red : C.border}`, background: checked.includes(i) ? C.red : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  {checked.includes(i) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                </div>
                <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.4 }}>{s}</div>
              </div>
            ))}
          </div>
          {checked.length >= 3 && (
            <div style={{ background: "#FEF2F2", border: `1.5px solid ${C.red}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.red, marginBottom: 6 }}>This is affecting you more than it should.</div>
              <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.6, marginBottom: 10 }}>Please talk to someone — a trusted adult, your GP, a school counsellor. What you're experiencing is real and it responds to support. Go to Your Corner in this app for contacts.</div>
            </div>
          )}
          {checked.length > 0 && checked.length < 3 && (
            <div style={{ background: C.yellowLight, border: `1.5px solid ${C.yellow}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 4 }}>Worth keeping an eye on.</div>
              <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.5 }}>The tools in this section can help. If it gets worse or more of these start applying, please talk to someone.</div>
            </div>
          )}
        </Section>
        <Section title="If something illegal has happened online">
          If someone has shared private images of you, threatened you, or run a campaign against you — this is not just a social media problem. These things can be reported to the police. CEOP (Child Exploitation and Online Protection) exists specifically to help with this. You can report at ceop.police.uk — you don't have to manage it alone.
        </Section>
        <div style={{ background: "#FEF2F2", border: `1.5px solid ${C.red}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.red, marginBottom: 4 }}>Childline: 0800 1111</div>
          <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.5 }}>Free, confidential, available 24/7. You can talk to them about anything happening online.</div>
        </div>
        <SpillPrompt prompt="Is there something happening online that you haven't told anyone about?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC REGISTRY ─────────────────────────────────────────────
const TOPICS = {
  highlight: HighlightReel,
  likes: LikesEverything,
  comments: CommentTrauma,
  image: ImagePressure,
  mute: MuteBlock,
  online_vs_real: OnlineVsReal,
  parasocial: Parasocial,
  get_help: WhenToGetHelp,
};

const TOPIC_LIST = [
  { id: "highlight", emoji: "📸", title: "The highlight reel", desc: "What you're actually seeing online vs what's real", tags: ["comparison", "reality"] },
  { id: "likes", emoji: "💔", title: "When likes feel like everything", desc: "Why your brain does this — and what's actually going on", tags: ["dopamine", "self-worth"] },
  { id: "comments", emoji: "😰", title: "Comment and like trauma", desc: "Online hurt is real hurt. Here's how to deal with it.", tags: ["hurt", "processing"] },
  { id: "image", emoji: "🪞", title: "Image pressure & filters", desc: "Bodies, beauty standards, and what's actually true", tags: ["body image", "filters"] },
  { id: "mute", emoji: "🔕", title: "Mute, block, step back", desc: "The tools you have and when to use them", tags: ["practical", "control"] },
  { id: "online_vs_real", emoji: "🎭", title: "Online you vs real you", desc: "The gap between who you are and who you perform online", tags: ["identity", "authenticity"] },
  { id: "parasocial", emoji: "🎭", title: "People you've never met", desc: "Why you feel connected to creators — and what that means", tags: ["parasocial", "connection"] },
  { id: "get_help", emoji: "🤍", title: "When to get help", desc: "Signs social media is affecting you more than it should", tags: ["support", "safety"] },
];

const Tag = ({ label }) => (
  <span style={{ display: "inline-block", background: C.purpleLight, color: C.purple, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, marginRight: 4, marginTop: 4 }}>{label}</span>
);

export function RealWorldHome({ onSpill }) {
  const [activeTopic, setActiveTopic] = useState(null);

  if (activeTopic) {
    const TopicComponent = TOPICS[activeTopic];
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopicComponent onBack={() => setActiveTopic(null)} onSpill={onSpill} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", padding: "16px 20px 20px", color: C.white }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Real world</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>Social media & online life</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>The stuff social media does to your head — and what to do about it.</div>
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        {TOPIC_LIST.map(t => (
          <div key={t.id} onClick={() => setActiveTopic(t.id)} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 14, marginBottom: 10, cursor: "pointer", transition: "transform 0.12s" }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ fontSize: 26, flexShrink: 0 }}>{t.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{t.title}</div>
                <div style={{ fontSize: 12, color: C.mid, marginTop: 3, lineHeight: 1.4 }}>{t.desc}</div>
                <div>{t.tags.map(tag => <Tag key={tag} label={tag} />)}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4 }}><path d="M6 3L11 8L6 13" stroke={C.mid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
