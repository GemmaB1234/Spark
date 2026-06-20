import { useState } from "react";

const C = {
  teal: "#0891B2", tealLight: "#E0F7FA",
  pink: "#EC4899", pinkLight: "#FCE4EC",
  purple: "#7C3AED", purpleLight: "#EDE9FE",
  yellow: "#F59E0B", yellowLight: "#FEF9C3",
  green: "#10B981", greenLight: "#D1FAE5",
  red: "#EF4444", redLight: "#FEF2F2",
  dark: "#1E293B", mid: "#64748B",
  white: "#FFFFFF", border: "rgba(0,0,0,0.08)",
};

const Btn = ({ children, onClick, bg = C.teal, color = C.white, style = {} }) => (
  <button onClick={onClick} style={{
    background: bg, color, border: "none", borderRadius: 14,
    padding: "12px 20px", fontFamily: "Nunito, sans-serif",
    fontSize: 14, fontWeight: 800, cursor: "pointer",
    width: "100%", transition: "transform 0.1s", ...style,
  }}
    onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
  >{children}</button>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    {title && <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>{title}</div>}
    <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const Highlight = ({ children, color = C.tealLight, border = C.teal }) => (
  <div style={{ background: color, border: `1.5px solid ${border}`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
    <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>{children}</div>
  </div>
);

const BackHeader = ({ title, emoji, onBack, bg }) => (
  <div style={{ background: bg, padding: "12px 16px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
    <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    <div style={{ fontSize: 22 }}>{emoji}</div>
    <div style={{ fontSize: 16, fontWeight: 800, color: C.white, lineHeight: 1.2 }}>{title}</div>
  </div>
);

const SpillPrompt = ({ prompt, onSpill }) => (
  <div style={{ background: C.tealLight, border: `1.5px solid ${C.teal}`, borderRadius: 14, padding: 14, marginTop: 8, marginBottom: 16 }}>
    <div style={{ fontSize: 12, fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6 }}>💧 Want to spill about this?</div>
    <div style={{ fontSize: 13, color: C.dark, marginBottom: 10, lineHeight: 1.5 }}>{prompt}</div>
    <Btn onClick={onSpill} bg={C.teal} style={{ fontSize: 13, padding: "10px 16px" }}>Go to Spill</Btn>
  </div>
);

// ── TOPIC 1: What makes a good friend ─────────────────────────
function GoodFriend({ onBack, onSpill }) {
  const [selected, setSelected] = useState([]);
  const qualities = [
    { text: "Makes you laugh", good: true },
    { text: "Makes you feel bad about yourself", good: false },
    { text: "Is happy for you when good things happen", good: true },
    { text: "Only talks to you when they need something", good: false },
    { text: "Keeps your secrets", good: true },
    { text: "Tells other people your secrets", good: false },
    { text: "Checks in when you seem down", good: true },
    { text: "Makes fun of you in front of others", good: false },
    { text: "Lets you be weird without judging", good: true },
    { text: "Only wants to hang out on their terms", good: false },
  ];
  const toggle = (i) => setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const score = selected.filter(i => qualities[i].good).length;
  const wrong = selected.filter(i => !qualities[i].good).length;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="What makes a good friend?" emoji="👥" onBack={onBack} bg="linear-gradient(135deg,#EC4899,#8B5CF6)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Good friendships don't have to be perfect. They just have to feel safe. A good friend doesn't make you feel small — they make you feel more like yourself.
        </Section>
        <Section title="The basics">
          Good friends show up. Not always, because everyone has stuff going on — but mostly. They remember things you told them. They don't make you feel like you have to earn their attention.
        </Section>
        <Highlight>
          A good friendship feels easy most of the time. Not every second — but in general, you leave a conversation feeling better than when you started it, not worse.
        </Highlight>
        <Section title="What it's NOT">
          A friendship where you feel anxious about what they think of you all the time, or where you change who you are to keep them happy, or where you feel worse after seeing them — that's not a good friendship. That's exhausting.
        </Section>
        <Section title="Quick quiz — tap all the good friend qualities">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {qualities.map((q, i) => (
              <div key={i} onClick={() => toggle(i)} style={{
                background: selected.includes(i)
                  ? (qualities[i].good ? C.greenLight : C.redLight)
                  : C.white,
                border: `1.5px solid ${selected.includes(i) ? (qualities[i].good ? C.green : C.red) : C.border}`,
                borderRadius: 12, padding: "10px 14px",
                cursor: "pointer", fontSize: 14, color: C.dark,
                display: "flex", alignItems: "center", gap: 10,
                transition: "all 0.15s",
              }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected.includes(i) ? (qualities[i].good ? C.green : C.red) : C.border}`, background: selected.includes(i) ? (qualities[i].good ? C.green : C.red) : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {selected.includes(i) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                </div>
                {q.text}
              </div>
            ))}
          </div>
          {selected.length > 0 && (
            <div style={{ background: score > wrong ? C.greenLight : C.yellowLight, borderRadius: 14, padding: 14, marginTop: 12, border: `1.5px solid ${score > wrong ? C.green : C.yellow}` }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>
                {score} right {wrong > 0 ? `• ${wrong} to reconsider` : "• nice work"}
              </div>
              <div style={{ fontSize: 13, color: C.mid, marginTop: 4, lineHeight: 1.5 }}>
                {wrong > 0 ? "The ones in red? Those are red flags. A friend who does those things isn't being a good friend." : "You know what a good friendship looks like. Trust that knowledge."}
              </div>
            </div>
          )}
        </Section>
        <SpillPrompt prompt="Is there a friendship in your life you're thinking about right now?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC 2: When someone upsets you ──────────────────────────
function WhenUpset({ onBack, onSpill }) {
  const [step, setStep] = useState(0);
  const steps = [
    { q: "How big does it feel right now?", opts: ["Really big — I can't stop thinking about it", "Medium — it's bothering me", "Small but still annoying"] },
    { q: "Did they probably mean to hurt you?", opts: ["Yes, it felt deliberate", "I'm not sure", "Probably not, but it still hurt"] },
    { q: "Have you told them how you feel?", opts: ["No, I haven't said anything", "I tried but it didn't go well", "Yes and they didn't care"] },
  ];
  const [answers, setAnswers] = useState([]);
  const answer = (opt) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (step < steps.length - 1) setStep(s => s + 1);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="When someone upsets you" emoji="💬" onBack={onBack} bg="linear-gradient(135deg,#0891B2,#06B6D4)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Being upset by someone you care about is one of the worst feelings. It hits different when it's a friend or family member. Here's how to figure out what to do with it.
        </Section>
        <Section title="First — feel it">
          Before you do anything, just let yourself feel annoyed or hurt or whatever it is. You don't have to immediately work out what to do. The feeling is real and it makes sense.
        </Section>
        <Highlight color={C.yellowLight} border={C.yellow}>
          You're allowed to be upset. You don't have to explain or justify it. Something happened and it affected you. That's enough.
        </Highlight>
        <Section title="Then — figure out what you need">
          Sometimes you need to say something. Sometimes you need to just get it out of your head. Sometimes you need some space. There's no one right answer.
        </Section>
        <Section title="Quick check-in">
          <div style={{ fontSize: 13, color: C.mid, marginBottom: 12 }}>Answer these — it helps figure out next steps.</div>
          {step < steps.length && answers.length <= step && (
            <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 10 }}>{steps[step].q}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {steps[step].opts.map((opt, i) => (
                  <div key={i} onClick={() => answer(opt)} style={{ background: C.light, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontSize: 13, color: C.dark }}
                    onMouseDown={e => e.currentTarget.style.background = C.tealLight}
                    onMouseUp={e => e.currentTarget.style.background = C.light}
                  >{opt}</div>
                ))}
              </div>
            </div>
          )}
          {answers.length === steps.length && (
            <div style={{ background: C.purpleLight, border: `1.5px solid ${C.purple}`, borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.purple, marginBottom: 8 }}>Here's the honest take:</div>
              <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.6 }}>
                {answers[1].includes("deliberate") && answers[2].includes("didn't care")
                  ? "This sounds like a pattern worth paying attention to. Someone who deliberately hurts you and doesn't care when you tell them — that's worth thinking about."
                  : answers[2].includes("No, I haven't")
                  ? "It might be worth saying something — even just 'that thing you said hurt me.' You don't have to make it a big deal. Just say it."
                  : "You've tried to work it out and it's still bothering you. Give it a bit of time, and if it keeps coming up, it might be worth one more conversation."}
              </div>
            </div>
          )}
        </Section>
        <SpillPrompt prompt="Write about what happened — you could even try Story Mode and write it like it happened to someone else." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC 3: Green flags & red flags ──────────────────────────
function GreenRedFlags({ onBack, onSpill }) {
  const [revealed, setRevealed] = useState({});
  const flags = [
    { flag: "They check in on you when you seem down", type: "green", explain: "This means they're paying attention. They notice you as a person, not just when it's convenient for them." },
    { flag: "They only talk to you when they need something", type: "red", explain: "You're being used as a resource, not valued as a person. Good relationships go both ways." },
    { flag: "You feel like you can be yourself around them", type: "green", explain: "This is one of the most important things. If you're performing a version of yourself to keep them happy, that's exhausting." },
    { flag: "They make fun of you in front of others, even as a 'joke'", type: "red", explain: "Jokes that consistently put you down aren't jokes. They're just mean things with a get-out clause." },
    { flag: "They're happy when good things happen to you", type: "green", explain: "This one matters. Someone who celebrates your wins isn't threatened by you. That's rare and valuable." },
    { flag: "They tell you who you can and can't be friends with", type: "red", explain: "Controlling who you're allowed to spend time with is a serious red flag — in friendships and in romantic relationships." },
    { flag: "They apologise when they get something wrong", type: "green", explain: "Nobody's perfect. What matters is whether they take responsibility. A real apology changes something." },
    { flag: "You feel anxious about what they think of you all the time", type: "red", explain: "Some nerves are normal. But constant anxiety about a relationship means something's off." },
    { flag: "They keep your secrets", type: "green", explain: "Trust is built in small moments. Keeping your secrets is one of them." },
    { flag: "They talk about you behind your back", type: "red", explain: "If you've heard they say things about you that they wouldn't say to your face — pay attention to that." },
  ];
  const toggle = (i) => setRevealed(r => ({ ...r, [i]: !r[i] }));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Green flags & red flags" emoji="🚦" onBack={onBack} bg="linear-gradient(135deg,#10B981,#0891B2)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Green flags are signs a relationship is healthy. Red flags are signs something's off. Tap each one to find out why it matters.
        </Section>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {flags.map((f, i) => (
            <div key={i} onClick={() => toggle(i)} style={{
              background: revealed[i] ? (f.type === "green" ? C.greenLight : C.redLight) : C.white,
              border: `1.5px solid ${revealed[i] ? (f.type === "green" ? C.green : C.red) : C.border}`,
              borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{f.type === "green" ? "🟢" : "🔴"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.4 }}>{f.flag}</div>
                  {revealed[i] && (
                    <div style={{ fontSize: 13, color: C.mid, marginTop: 6, lineHeight: 1.5, borderTop: `1px solid ${f.type === "green" ? C.green : C.red}`, paddingTop: 8 }}>
                      {f.explain}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 12, color: C.mid, flexShrink: 0 }}>{revealed[i] ? "▲" : "▼"}</div>
              </div>
            </div>
          ))}
        </div>
        <Highlight color={C.yellowLight} border={C.yellow}>
          Red flags don't always mean you have to end a friendship immediately. But they're worth paying attention to. One red flag might be a bad day. Several red flags is a pattern.
        </Highlight>
        <SpillPrompt prompt="Is there a relationship in your life where you're seeing any of these flags?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC 4: Online friendships ───────────────────────────────
function OnlineFriendships({ onBack, onSpill }) {
  const [quiz, setQuiz] = useState(null);
  const scenarios = [
    { s: "Someone you met in a game asks for your real name and where you live", safe: false, why: "Your real name and location are personal details that should stay private online — even with people you've been talking to for a while." },
    { s: "An online friend asks to video call so you can actually see each other", safe: null, why: "This can be fine — but go with your gut. If anything feels off about it, trust that feeling. You're never obligated to video call anyone." },
    { s: "Someone online tells you to keep your friendship a secret from your parents", safe: false, why: "This is a serious warning sign. Anyone asking you to hide a relationship from adults who care about you is not someone you should trust." },
    { s: "You've been talking to someone online for a year and they feel like a real friend", safe: true, why: "Online friendships can be completely real and meaningful. Many people have close friends they've never met in person." },
    { s: "Someone online asks you to send them a photo of yourself", safe: null, why: "You never have to send photos to anyone online. If someone is pressuring you for photos, that is a red flag regardless of how well you think you know them." },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Online friendships" emoji="🌐" onBack={onBack} bg="linear-gradient(135deg,#7C3AED,#4F46E5)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Online friendships are real friendships. The feelings are real, the connection is real. But there are some things worth knowing about staying safe while having them.
        </Section>
        <Section title="What makes online friendships good">
          Meeting people who get you — especially if you feel like nobody around you really does — is genuinely valuable. Online friendships can give you community, understanding, and connection that you might not find locally.
        </Section>
        <Highlight color={C.purpleLight} border={C.purple}>
          You're allowed to have online friends. You don't have to justify that to anyone. But you're also allowed to have limits and to trust your instincts about people.
        </Highlight>
        <Section title="Scenario check — what would you do?">
          <div style={{ fontSize: 13, color: C.mid, marginBottom: 10 }}>Tap each one to see what's safe and what's not.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {scenarios.map((sc, i) => (
              <div key={i} onClick={() => setQuiz(quiz === i ? null : i)} style={{
                background: quiz === i ? (sc.safe === false ? C.redLight : sc.safe === true ? C.greenLight : C.yellowLight) : C.white,
                border: `1.5px solid ${quiz === i ? (sc.safe === false ? C.red : sc.safe === true ? C.green : C.yellow) : C.border}`,
                borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, lineHeight: 1.5 }}>{sc.s}</div>
                {quiz === i && (
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: sc.safe === false ? C.red : sc.safe === true ? C.green : C.yellow, marginBottom: 4 }}>
                      {sc.safe === false ? "🔴 Red flag" : sc.safe === true ? "🟢 Generally fine" : "🟡 Use your judgement"}
                    </div>
                    <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.5 }}>{sc.why}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
        <SpillPrompt prompt="Do you have any online friendships that are important to you? Or any that are making you feel unsure?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC 5: Saying no ────────────────────────────────────────
function RealYesChecker() {
  const questions = [
    { q: "Do you actually want to do this?", yes: "That's a good sign — wanting to do something is the foundation of a real yes.", no: "If you don't want to do it, that's worth paying attention to. Why are you considering saying yes?" },
    { q: "Would you be okay if no one ever found out you said yes?", yes: "A yes that doesn't need an audience is usually genuine.", no: "If you need people to see you saying yes — it might be more about how you want to look than what you actually want." },
    { q: "Would you ask someone else to do this if the roles were reversed?", yes: "If you'd ask it of someone else, the request is probably fair.", no: "If you wouldn't ask this of someone else, notice that. Why is it okay to ask it of you?" },
    { q: "Would the person asking do this for you if you needed it?", yes: "Reciprocity matters. If they'd do it for you, the relationship is probably balanced.", no: "If they wouldn't — that's worth knowing. You're allowed to expect the same energy you give." },
    { q: "Are you saying yes because you want to — or because you're scared of what happens if you don't?", yes: "A yes that comes from wanting to, not fear, is a real yes.", no: "Saying yes out of fear — of upsetting someone, of consequences, of being seen badly — isn't a free choice. That's pressure." },
    { q: "After saying yes, will you feel okay — or resentful?", yes: "If you can say yes and genuinely feel fine about it, it's probably right for you.", no: "If you already know you'll feel resentful, your gut is telling you something. Listen to it." },
  ];
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const answer = (i, val) => setAnswers(a => ({ ...a, [i]: val }));
  const yesCount = Object.values(answers).filter(v => v === true).length;
  const noCount = Object.values(answers).filter(v => v === false).length;
  const answered = Object.keys(answers).length;

  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 4 }}>Is this a real yes?</div>
      <div style={{ fontSize: 13, color: C.mid, marginBottom: 12, lineHeight: 1.5 }}>Think about something you said yes to recently — or something you're being asked to do right now. Answer honestly.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
        {questions.map((q, i) => (
          <div key={i} style={{ background: answers[i] === true ? C.greenLight : answers[i] === false ? C.pinkLight : C.white, border: `1.5px solid ${answers[i] === true ? C.green : answers[i] === false ? C.pink : C.border}`, borderRadius: 14, padding: 14, transition: "all 0.2s" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 10, lineHeight: 1.4 }}>{q.q}</div>
            {answers[i] === undefined && (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => answer(i, true)} style={{ flex: 1, background: C.greenLight, border: `1.5px solid ${C.green}`, borderRadius: 10, padding: "8px 12px", fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 800, color: C.green, cursor: "pointer" }}>Yes</button>
                <button onClick={() => answer(i, false)} style={{ flex: 1, background: C.pinkLight, border: `1.5px solid ${C.pink}`, borderRadius: 10, padding: "8px 12px", fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 800, color: C.pink, cursor: "pointer" }}>No</button>
              </div>
            )}
            {answers[i] !== undefined && (
              <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.5, borderTop: `1px solid ${answers[i] ? C.green : C.pink}`, paddingTop: 8 }}>
                {answers[i] ? q.yes : q.no}
              </div>
            )}
          </div>
        ))}
      </div>
      {answered === questions.length && (
        <div style={{ background: yesCount >= 4 ? C.greenLight : yesCount >= 2 ? C.yellowLight : C.pinkLight, border: `1.5px solid ${yesCount >= 4 ? C.green : yesCount >= 2 ? C.yellow : C.pink}`, borderRadius: 16, padding: 16, marginBottom: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: C.dark, marginBottom: 6 }}>
            {yesCount >= 4 ? "This sounds like a real yes." : yesCount >= 2 ? "This yes has some complications." : "This might not be a real yes."}
          </div>
          <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.6 }}>
            {yesCount >= 4
              ? "You want to do this and it feels right. That's what a genuine yes looks like — you're doing it for you, not for someone else's comfort."
              : yesCount >= 2
              ? "There are parts of this that feel okay and parts that don't. It's worth pausing before you commit. What would need to be different for this to feel like a genuine yes?"
              : "Most of your answers suggest you're saying yes for someone else's benefit, not yours. That's called people-pleasing — and it's exhausting. You're allowed to say no here."}
          </div>
        </div>
      )}
    </div>
  );
}

function SayingNo({ onBack, onSpill }) {
  const [practiced, setPracticed] = useState(null);
  const phrases = [
    { situation: "A friend wants you to do something you're not comfortable with", response: "I don't want to do that. I know that might be annoying but it's a no from me." },
    { situation: "Someone keeps asking after you've already said no", response: "I already said no. The answer isn't going to change." },
    { situation: "You're invited somewhere but you just don't have the energy", response: "I can't make it this time. I hope it's good though." },
    { situation: "Someone's making you feel guilty for saying no", response: "I hear that you're disappointed. I still can't do it." },
    { situation: "You agreed to something but now you've changed your mind", response: "I said yes before but I've changed my mind. I'm not going to be able to do it." },
    { situation: "Someone at school keeps asking you to do things that aren't your job", response: "That's not something I can take on. You'd need to ask someone else." },
    { situation: "You're being asked to do more than your share", response: "I've already got a lot on. I can't add anything else right now." },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Saying no (and meaning it)" emoji="🛡️" onBack={onBack} bg="linear-gradient(135deg,#EC4899,#F472B6)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Saying no is a complete sentence. You don't owe anyone an explanation for your boundaries. But it can be really hard to actually do — especially when you don't want to upset someone.
        </Section>
        <Section title="Why it's hard">
          Most people find it hard to say no because somewhere along the way they learned that keeping others happy matters more than their own comfort. That's not true. Your comfort matters just as much.
        </Section>
        <Highlight color={C.pinkLight} border={C.pink}>
          "No" is not mean. "No" is not rude. "No" is a complete answer. You're allowed to say it without a long explanation, an apology, or a reason.
        </Highlight>
        <Section title="The difference between a real yes and a people-pleasing yes">
          Not all yeses are equal. Sometimes you say yes because you genuinely want to. Sometimes you say yes because you're scared of what happens if you don't — scared of upsetting someone, of being seen as difficult, of losing someone's approval. Those are very different things.
        </Section>
        <Highlight color={C.yellowLight} border={C.yellow}>
          A people-pleasing yes feels like relief in the moment — the tension goes away. But it builds up over time. You end up exhausted, resentful, and doing things that aren't actually okay with you. And the person you said yes to never even knew there was a problem.
        </Highlight>
        <Section>
          Learning to tell the difference between a real yes and a people-pleasing yes is one of the most useful things you can do — not just in friendships, but in school, work, and every relationship you'll ever have.
        </Section>
        <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <RealYesChecker />
        </div>
        <Section title="Things you can actually say">
          <div style={{ fontSize: 13, color: C.mid, marginBottom: 10 }}>Tap a situation to see a way to handle it.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {phrases.map((p, i) => (
              <div key={i} onClick={() => setPracticed(practiced === i ? null : i)} style={{
                background: practiced === i ? C.pinkLight : C.white,
                border: `1.5px solid ${practiced === i ? C.pink : C.border}`,
                borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.mid }}>{p.situation}</div>
                {practiced === i && (
                  <div style={{ marginTop: 10, background: C.white, borderRadius: 10, padding: 12, border: `1px solid ${C.pink}` }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.pink, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>You could say:</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.5, fontStyle: "italic" }}>"{p.response}"</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
        <Section title="One important thing">
          If someone gets angry or upset when you say no — that's information about them, not about you. A person who respects you will accept your no, even if they're disappointed. That applies to friendships, family, and eventually work too.
        </Section>
        <SpillPrompt prompt="Is there something you've been saying yes to that isn't really a yes? Write about it — nobody else needs to see it." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC 6: When friendships change ─────────────────────────
function FriendshipsChange({ onBack, onSpill }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="When friendships change" emoji="💔" onBack={onBack} bg="linear-gradient(135deg,#64748B,#475569)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Friendships ending or changing is one of the most painful things about growing up — and almost nobody talks about it properly.
        </Section>
        <Section title="Why it happens">
          People change. You change. Sometimes you grow in different directions and that's nobody's fault. Sometimes things happen that damage a friendship and it can't go back to what it was. Both of these things are normal and both hurt.
        </Section>
        <Highlight color={C.yellowLight} border={C.yellow}>
          Losing a friendship can feel like grief — because it is. You're allowed to be sad about it. You don't have to pretend you're fine.
        </Highlight>
        <Section title="The drifting kind">
          Sometimes nobody does anything wrong. You just stop having as much in common. You stop messaging as much. It just... fades. This is really common and it still hurts even though there's no one to be angry at.
        </Section>
        <Section title="The falling out kind">
          When something specific happens that damages things — an argument, a betrayal, something said that can't be unsaid. This one's harder because there's a specific wound to deal with.
        </Section>
        <Highlight color={C.tealLight} border={C.teal}>
          Not every friendship is meant to last forever. Some friends are there for a season of your life — and that's okay. It doesn't mean the friendship wasn't real or didn't matter.
        </Highlight>
        <Section title="What to do with it">
          You don't have to fix it straight away. You don't have to be okay about it quickly. Give yourself time to be sad. Talk to someone about it. Write about it. Let yourself feel it — because trying to skip the sad bit doesn't work, it just delays it.
        </Section>
        <SpillPrompt prompt="Is there a friendship that's changed or ended that you're still thinking about?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC 7: Family stuff ─────────────────────────────────────
function FamilyStuff({ onBack, onSpill }) {
  const [open, setOpen] = useState(null);
  const topics = [
    { title: "When family feels hard", content: "Family is complicated. You can love people and find them really difficult at the same time. You don't have to pretend everything's fine at home." },
    { title: "Arguments at home", content: "Arguments happen in most families. But there's a difference between normal disagreements and a home environment that feels unsafe or consistently unkind. If it's the second one, talking to a trusted adult outside your family matters." },
    { title: "When you feel like the odd one out in your family", content: "Lots of people feel like they don't quite fit in their family. Like everyone else got a manual and you didn't. This is really common — especially for people who think or feel differently to the rest of their family." },
    { title: "Separated or complicated family setups", content: "Lots of families aren't the 'default' setup — divorce, step-parents, living between two homes, not being in contact with a parent. These situations are all valid and they all come with their own complicated feelings." },
    { title: "When you're worried about someone in your family", content: "If someone in your family is going through something hard — mental health, illness, relationship problems — it can affect everyone. You're allowed to have feelings about what's happening even if it's not 'your' situation." },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Family stuff" emoji="🏠" onBack={onBack} bg="linear-gradient(135deg,#F59E0B,#EA580C)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          Family is complicated. There's no perfect family. There's no family where everyone always gets along. But some family situations are harder than others and all of them are worth talking about.
        </Section>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {topics.map((t, i) => (
            <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{
              background: open === i ? C.yellowLight : C.white,
              border: `1.5px solid ${open === i ? C.yellow : C.border}`,
              borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{t.title}</div>
                <div style={{ fontSize: 12, color: C.mid }}>{open === i ? "▲" : "▼"}</div>
              </div>
              {open === i && (
                <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
                  {t.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <Highlight color={C.redLight} border={C.red}>
          If anything happening at home makes you feel unsafe — physically or emotionally — please talk to someone outside your family. A teacher, a school counsellor, or go to Your Corner in this app.
        </Highlight>
        <SpillPrompt prompt="Is there something happening at home that's on your mind?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC 8: Healthy relationships ───────────────────────────
function HealthyRelationships({ onBack, onSpill }) {
  const [checked, setChecked] = useState([]);
  const toggle = (i) => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  const checklist = [
    "I feel like I can be myself around them",
    "They respect it when I say no to something",
    "I don't feel anxious about what they think of me all the time",
    "They're not trying to change who I am",
    "I feel heard when I talk to them",
    "They treat my feelings as valid even when they disagree",
    "I don't have to keep secrets from other people because of them",
    "I feel better — not worse — after spending time with them",
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Healthy relationships" emoji="❤️" onBack={onBack} bg="linear-gradient(135deg,#EC4899,#EF4444)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <Section>
          A healthy relationship — friendship, family, or romantic — isn't about being perfect. It's about feeling safe, respected, and like you matter.
        </Section>
        <Section title="What healthy looks like">
          In a healthy relationship, both people's needs matter. You're allowed to disagree. You're allowed to have other friends and your own life. Nobody controls anyone. Nobody makes the other person feel small to feel better about themselves.
        </Section>
        <Highlight color={C.greenLight} border={C.green}>
          Healthy doesn't mean no arguments ever. It means that when things go wrong, you can talk about it. And you come out of those conversations still respecting each other.
        </Highlight>
        <Section title="Check in on a relationship you're thinking about">
          <div style={{ fontSize: 13, color: C.mid, marginBottom: 10 }}>Tick the ones that are true for a relationship in your life.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {checklist.map((item, i) => (
              <div key={i} onClick={() => toggle(i)} style={{
                background: checked.includes(i) ? C.greenLight : C.white,
                border: `1.5px solid ${checked.includes(i) ? C.green : C.border}`,
                borderRadius: 12, padding: "10px 14px",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                transition: "all 0.15s",
              }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${checked.includes(i) ? C.green : C.border}`, background: checked.includes(i) ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {checked.includes(i) && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                </div>
                <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.4 }}>{item}</div>
              </div>
            ))}
          </div>
          {checked.length > 0 && (
            <div style={{ background: checked.length >= 6 ? C.greenLight : checked.length >= 3 ? C.yellowLight : C.redLight, borderRadius: 14, padding: 14, marginTop: 12, border: `1.5px solid ${checked.length >= 6 ? C.green : checked.length >= 3 ? C.yellow : C.red}` }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 4 }}>
                {checked.length >= 6 ? "This sounds like a healthy relationship." : checked.length >= 3 ? "There's good stuff here — and some things worth thinking about." : "This is worth paying attention to."}
              </div>
              <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>
                {checked.length >= 6 ? "Not perfect — nothing is — but the foundations are solid." : checked.length >= 3 ? "What's missing matters too. It's okay to want more from a relationship." : "A relationship where most of these aren't true might not be giving you what you need."}
              </div>
            </div>
          )}
        </Section>
        <SpillPrompt prompt="What does the most important relationship in your life right now feel like?" onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── TOPIC REGISTRY ─────────────────────────────────────────────
const TOPICS = {
  good_friend: GoodFriend,
  when_upset: WhenUpset,
  flags: GreenRedFlags,
  online: OnlineFriendships,
  saying_no: SayingNo,
  change: FriendshipsChange,
  family: FamilyStuff,
  healthy: HealthyRelationships,
};

// ── RELATIONSHIPS HOME ─────────────────────────────────────────
const TOPIC_LIST = [
  { id: "good_friend", emoji: "👥", title: "What makes a good friend?", desc: "The basics of what a good friendship actually feels like", tags: ["friendship", "connection"] },
  { id: "when_upset", emoji: "💬", title: "When someone upsets you", desc: "How to figure out what to do when someone hurts your feelings", tags: ["conflict", "feelings"] },
  { id: "flags", emoji: "🚦", title: "Green flags & red flags", desc: "How to spot the signs of healthy and unhealthy relationships", tags: ["healthy", "unhealthy"] },
  { id: "online", emoji: "🌐", title: "Online friendships", desc: "Real friendships, real safety — what to know about connecting online", tags: ["online", "safety"] },
  { id: "saying_no", emoji: "🛡️", title: "Saying no (and meaning it)", desc: "No is a complete sentence. Here's how to say it.", tags: ["boundaries", "confidence"] },
  { id: "change", emoji: "💔", title: "When friendships change", desc: "Why friendships end or drift and how to deal with that", tags: ["change", "loss"] },
  { id: "family", emoji: "🏠", title: "Family stuff", desc: "The complicated feelings that come with family", tags: ["family", "home"] },
  { id: "healthy", emoji: "❤️", title: "Healthy relationships", desc: "What a healthy relationship actually feels like to be in", tags: ["love", "respect"] },
];

const Tag = ({ label }) => (
  <span style={{ display: "inline-block", background: C.tealLight, color: C.teal, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, marginRight: 4, marginTop: 4 }}>{label}</span>
);

export function RelationshipsHome({ onSpill }) {
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
      <div style={{ background: "linear-gradient(135deg,#EC4899,#8B5CF6)", padding: "16px 20px 20px", color: C.white }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Your people</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>Relationships & boundaries</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>Friendships, family, online — the stuff that gets complicated.</div>
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        {TOPIC_LIST.map(t => (
          <div key={t.id} onClick={() => setActiveTopic(t.id)} style={{
            background: C.white, border: `1.5px solid ${C.border}`,
            borderRadius: 16, padding: 14, marginBottom: 10,
            cursor: "pointer", transition: "transform 0.12s",
          }}
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
