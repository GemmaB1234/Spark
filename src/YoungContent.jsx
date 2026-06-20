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

const BackHeader = ({ title, emoji, onBack, bg }) => (
  <div style={{ background: bg, padding: "12px 16px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
    <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    <div style={{ fontSize: 26, flexShrink: 0 }}>{emoji}</div>
    <div style={{ fontSize: 17, fontWeight: 800, color: C.white, lineHeight: 1.2 }}>{title}</div>
  </div>
);

const BigText = ({ children }) => (
  <div style={{ fontSize: 16, color: C.dark, lineHeight: 1.8, marginBottom: 16 }}>{children}</div>
);

const BigHighlight = ({ children, color = C.tealLight, border = C.teal }) => (
  <div style={{ background: color, border: `2px solid ${border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
    <div style={{ fontSize: 15, color: C.dark, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const SpillPrompt = ({ prompt, onSpill }) => (
  <div style={{ background: C.tealLight, border: `1.5px solid ${C.teal}`, borderRadius: 14, padding: 14, marginTop: 8, marginBottom: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 800, color: C.teal, marginBottom: 6 }}>💧 Want to write or draw about this?</div>
    <div style={{ fontSize: 14, color: C.dark, marginBottom: 10, lineHeight: 1.5 }}>{prompt}</div>
    <button onClick={onSpill} style={{ background: C.teal, color: C.white, border: "none", borderRadius: 10, padding: "10px 16px", fontFamily: "Nunito, sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", width: "100%" }}>Go to Spill</button>
  </div>
);

// ── FRIENDS TOPICS ─────────────────────────────────────────────

function MakingFriends({ onBack, onSpill }) {
  const [tried, setTried] = useState([]);
  const toggle = i => setTried(t => t.includes(i) ? t.filter(x => x !== i) : [...t, i]);
  const ideas = [
    { idea: "Ask them what their favourite game is", icon: "🎮" },
    { idea: "Say 'can I join in?' if they're playing something", icon: "🙋" },
    { idea: "Give them a genuine compliment — something you actually mean", icon: "⭐" },
    { idea: "Ask them about something you noticed — like their bag or their book", icon: "👀" },
    { idea: "Share something you like — a snack, a joke, a fact", icon: "🍪" },
    { idea: "Just say hi and smile — sometimes that's genuinely enough", icon: "👋" },
    { idea: "Sit near them and see if a conversation starts naturally", icon: "🪑" },
    { idea: "Ask for help with something small — people like being helpful", icon: "🤝" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Making new friends" emoji="👋" onBack={onBack} bg="linear-gradient(135deg,#10B981,#0891B2)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Making new friends can feel really scary. Even people who seem really confident find it hard sometimes. Here are some things that actually work.</BigText>
        <BigHighlight color={C.greenLight} border={C.green}>
          You don't have to be funny or interesting or cool to make friends. You just have to show up and be kind. Most people are waiting for someone else to say hello first.
        </BigHighlight>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Things you could try — tick the ones you want to try</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {ideas.map((item, i) => (
            <div key={i} onClick={() => toggle(i)} style={{ background: tried.includes(i) ? C.greenLight : C.white, border: `2px solid ${tried.includes(i) ? C.green : C.border}`, borderRadius: 14, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s" }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ fontSize: 14, color: C.dark, flex: 1, lineHeight: 1.4 }}>{item.idea}</div>
              <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${tried.includes(i) ? C.green : C.border}`, background: tried.includes(i) ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {tried.includes(i) && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>}
              </div>
            </div>
          ))}
        </div>
        <BigHighlight color={C.yellowLight} border={C.yellow}>
          Not everyone will want to be your friend and that is okay. It doesn't mean anything is wrong with you. Some people just aren't the right match. Keep going.
        </BigHighlight>
        <SpillPrompt prompt="Is there someone you'd like to be friends with? Draw them or write about what you like about them." onSpill={onSpill} />
      </div>
    </div>
  );
}

function LeftOut({ onBack, onSpill }) {
  const [feeling, setFeeling] = useState(null);
  const feelings = [
    { emoji: "😢", label: "Really sad", msg: "Being left out hurts so much. Your feelings make total sense. It's okay to cry about this. It doesn't mean you're a baby — it means you care about people, which is actually a good thing." },
    { emoji: "😠", label: "Really angry", msg: "Being angry about being left out is completely normal. You wanted to be included and you weren't. That's not fair and it makes sense to feel cross about it." },
    { emoji: "😕", label: "Confused", msg: "Sometimes being left out is confusing — especially if you don't know why it happened. You might keep going over it in your head. That's normal. It might help to talk to someone about it." },
    { emoji: "😶", label: "Kind of numb", msg: "Sometimes when something hurts a lot we go a bit quiet inside. That's okay. You don't always have to feel big feelings straight away. Give yourself time." },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="When someone leaves you out" emoji="💔" onBack={onBack} bg="linear-gradient(135deg,#EC4899,#F472B6)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Being left out is one of the worst feelings. Whether it was a party, a group, a game, or just a conversation — being on the outside hurts. And it's okay to say that.</BigText>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 10 }}>How are you feeling about it right now?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {feelings.map((f, i) => (
            <div key={i} onClick={() => setFeeling(feeling === i ? null : i)} style={{ background: feeling === i ? C.pinkLight : C.white, border: `2px solid ${feeling === i ? C.pink : C.border}`, borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{f.emoji}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>{f.label}</div>
              </div>
              {feeling === i && <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.pink}` }}>{f.msg}</div>}
            </div>
          ))}
        </div>
        <BigHighlight color={C.purpleLight} border={C.purple}>
          Being left out doesn't mean nobody likes you. Sometimes it happens because of things that have nothing to do with you — who was invited first, what group they were in, what happened that day. It feels personal. It often isn't.
        </BigHighlight>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>What might help right now</div>
        {["Tell a grown-up you trust how you're feeling", "Do something you enjoy to give your brain a break from it", "Write or draw about what happened", "Remember a time you were included and felt good"].map((tip, i) => (
          <div key={i} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ color: C.teal, fontWeight: 800, fontSize: 16, flexShrink: 0 }}>→</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.4 }}>{tip}</div>
          </div>
        ))}
        <SpillPrompt prompt="Draw or write about what happened. You don't have to make sense of it — just get it out." onSpill={onSpill} />
      </div>
    </div>
  );
}

function FallingOut({ onBack, onSpill }) {
  const [step, setStep] = useState(null);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Falling out and making up" emoji="🌈" onBack={onBack} bg="linear-gradient(135deg,#F59E0B,#10B981)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Friends fall out. Even really good friends. It doesn't mean the friendship is over — it means you're both human. What matters is what happens next.</BigText>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 10 }}>Where are you right now?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {[
            { label: "We just had an argument", content: "First — give it a little time. Not forever, just a bit. When people are really upset they sometimes say things they don't mean. Let the big feelings settle a little before you try to sort it out. That's not giving up — that's being smart." },
            { label: "I want to make up but I don't know how", content: "The easiest thing is often the simplest thing. Just say 'I'm sorry about what happened. I miss being your friend.' You don't need a big speech. You don't have to have it all figured out. Just say the honest thing." },
            { label: "They said something really mean and I'm hurt", content: "What they said matters and you're allowed to be hurt. You don't have to pretend it's fine when it isn't. When you're ready, you could say 'what you said really hurt me' — not to have a big argument, just to let them know. They might not have realised." },
            { label: "I said something I didn't mean and I feel bad", content: "This happens to everyone. The fact that you feel bad about it shows you care. A real apology has three parts: say what you did, say why it was wrong, say what you'll do differently. No 'but' in the middle. Just the apology." },
            { label: "We made up but things feel different now", content: "Sometimes after a falling out things feel a bit wobbly for a while. That's normal. It might take a bit of time for things to feel normal again — and they usually do, if you both want them to." },
          ].map((s, i) => (
            <div key={i} onClick={() => setStep(step === i ? null : i)} style={{ background: step === i ? C.yellowLight : C.white, border: `2px solid ${step === i ? C.yellow : C.border}`, borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, flex: 1 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: C.mid }}>{step === i ? "▲" : "▼"}</div>
              </div>
              {step === i && <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.yellow}` }}>{s.content}</div>}
            </div>
          ))}
        </div>
        <BigHighlight color={C.greenLight} border={C.green}>
          Falling out and making up is how friendships get stronger. It's not a sign that a friendship is broken — it's a sign that it's real.
        </BigHighlight>
        <SpillPrompt prompt="Write or draw about what happened between you and your friend." onSpill={onSpill} />
      </div>
    </div>
  );
}

function BeingKind({ onBack, onSpill }) {
  const [done, setDone] = useState([]);
  const toggle = i => setDone(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i]);
  const acts = [
    { act: "Say something genuinely nice to someone today", icon: "💬" },
    { act: "Notice if someone is on their own and go and say hi", icon: "👀" },
    { act: "Let someone go first", icon: "🚶" },
    { act: "Share something — a snack, a pencil, a joke", icon: "🍬" },
    { act: "Tell a friend something you like about them", icon: "⭐" },
    { act: "Say sorry if you got something wrong", icon: "🤍" },
    { act: "Stick up for someone if someone's being unkind to them", icon: "🛡️" },
    { act: "Ask someone how they're doing and actually listen", icon: "👂" },
    { act: "Include someone who usually gets left out", icon: "🫂" },
    { act: "Be kind to yourself today too", icon: "💛" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Being a good friend" emoji="⭐" onBack={onBack} bg="linear-gradient(135deg,#7C3AED,#EC4899)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Being a good friend isn't about being perfect. It's about showing up, being kind, and caring about how the other person feels. Here are some things good friends do.</BigText>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Tick the ones you want to try today</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {acts.map((item, i) => (
            <div key={i} onClick={() => toggle(i)} style={{ background: done.includes(i) ? C.purpleLight : C.white, border: `2px solid ${done.includes(i) ? C.purple : C.border}`, borderRadius: 14, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s" }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ fontSize: 14, color: C.dark, flex: 1, lineHeight: 1.4 }}>{item.act}</div>
              <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${done.includes(i) ? C.purple : C.border}`, background: done.includes(i) ? C.purple : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {done.includes(i) && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>}
              </div>
            </div>
          ))}
        </div>
        {done.length > 0 && (
          <BigHighlight color={C.greenLight} border={C.green}>
            You picked {done.length} thing{done.length === 1 ? "" : "s"}. Even one of these can make a real difference to someone's day. Including yours.
          </BigHighlight>
        )}
        <SpillPrompt prompt="Who is your best friend? Write or draw something about them — what you love about them." onSpill={onSpill} />
      </div>
    </div>
  );
}

function WhenSomeoneIsUnkind({ onBack, onSpill }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="When someone is unkind" emoji="🛡️" onBack={onBack} bg="linear-gradient(135deg,#EF4444,#EC4899)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>If someone has been unkind to you — said something mean, left you out on purpose, or been nasty — that is not okay. And it is not your fault.</BigText>
        <BigHighlight color={C.redLight} border={C.red}>
          Being unkind to someone is always wrong. It doesn't matter if they were 'just joking' or if it was 'only online'. If it made you feel bad, it counts.
        </BigHighlight>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>What to do</div>
        {[
          { title: "Tell a grown-up", desc: "This is the most important one. If someone is being unkind to you — especially if it keeps happening — tell an adult you trust. A parent, a teacher, someone. You don't have to deal with this on your own.", icon: "🧑‍🤝‍🧑" },
          { title: "Don't fight back", desc: "It usually makes things worse. Walk away if you can. You're not being weak by walking away — you're being smart.", icon: "🚶" },
          { title: "Stay near people", desc: "Unkind things often happen when someone is on their own. Stick with people you feel safe with.", icon: "👥" },
          { title: "Remember it's about them", desc: "People who are unkind to others are usually dealing with something difficult themselves. It feels personal. It usually isn't really about you.", icon: "💭" },
          { title: "Talk about it", desc: "Tell someone how you're feeling. A friend, a family member, or write it down. Getting it out of your head helps.", icon: "💬" },
        ].map((item, i) => (
          <div key={i} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: 14, marginBottom: 8, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
        <BigHighlight color={C.yellowLight} border={C.yellow}>
          If someone keeps being unkind to you even after you've told a grown-up, keep telling grown-ups. Keep going until someone helps. You deserve to feel safe.
        </BigHighlight>
        <SpillPrompt prompt="Write or draw about what happened. Or write what you WISH you could say to the person who was unkind." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── HOW I FEEL TOPICS ──────────────────────────────────────────

function NamingFeelings({ onBack, onSpill }) {
  const [selected, setSelected] = useState(null);
  const feelings = [
    { emoji: "😠", name: "Angry", body: "Your face might go red. Your fists might clench. Your heart beats faster. Your voice gets louder.", why: "Something felt unfair, or someone upset you, or something got in your way.", help: "Take big slow breaths. Count to ten. Walk away from the situation if you can. Move your body — shake it out." },
    { emoji: "😢", name: "Sad", body: "You might cry, or feel heavy, or want to be quiet. You might not feel like doing the things you usually like.", why: "Something happened that hurt. You lost something or someone. Things didn't go the way you hoped.", help: "Let yourself cry if you need to. Talk to someone you trust. Do something comforting — a favourite book, your favourite food, a cuddle." },
    { emoji: "😰", name: "Worried", body: "Your tummy might hurt. You might not be able to sleep. You might keep thinking about the same thing over and over.", why: "You're thinking about something that might go wrong. Something feels uncertain or scary.", help: "Write down what you're worried about. Talk to a grown-up. Remember: most things we worry about never actually happen." },
    { emoji: "😊", name: "Happy", body: "You feel light. You might smile a lot, or laugh easily, or feel like doing things.", why: "Something good happened. You feel safe and liked and okay.", help: "Notice it. Tell someone about it. Try to remember this feeling for harder days." },
    { emoji: "😳", name: "Embarrassed", body: "Your face might go red. You might want to hide or run away. You might feel very aware of yourself.", why: "Something happened in front of other people that you didn't want to happen.", help: "Everyone gets embarrassed. Most people forget embarrassing things much faster than you think they do." },
    { emoji: "😴", name: "Tired", body: "Everything feels harder. You might get upset more easily. It's hard to think clearly.", why: "Your body and brain need rest. Too much has happened or you haven't slept enough.", help: "Rest if you can. Drink some water. Do something quiet and easy." },
    { emoji: "🥱", name: "Bored", body: "Nothing feels interesting. Time feels slow. You might feel a bit grumpy.", why: "Your brain needs something to do. It's designed to be busy and learning.", help: "Try something new — even something small. Move your body. Call a friend." },
    { emoji: "😍", name: "Excited", body: "Your heart might beat faster. You might feel jumpy. It might be hard to sit still.", why: "Something good is coming or happening. Your body is getting ready for it.", help: "Enjoy it! Excited is a lovely feeling. Tell someone about it." },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Naming your feelings" emoji="🎨" onBack={onBack} bg="linear-gradient(135deg,#F59E0B,#EC4899)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Every feeling has a name. When you can name a feeling, it gets a little bit smaller. Tap a feeling to find out more about it.</BigText>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {feelings.map((f, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{ background: selected === i ? C.yellowLight : C.white, border: `2px solid ${selected === i ? C.yellow : C.border}`, borderRadius: 16, padding: 14, textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ fontSize: 36, marginBottom: 4 }}>{f.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{f.name}</div>
            </div>
          ))}
        </div>
        {selected !== null && (
          <div style={{ background: C.yellowLight, border: `2px solid ${C.yellow}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{feelings[selected].emoji} {feelings[selected].name}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 4 }}>What it feels like in your body:</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6, marginBottom: 10 }}>{feelings[selected].body}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 4 }}>Why it happens:</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6, marginBottom: 10 }}>{feelings[selected].why}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 4 }}>What can help:</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>{feelings[selected].help}</div>
          </div>
        )}
        <BigHighlight color={C.tealLight} border={C.teal}>
          All feelings are allowed. Even the uncomfortable ones. Feelings aren't good or bad — they're just information about what's happening inside you.
        </BigHighlight>
        <SpillPrompt prompt="How are you feeling right now? Draw it or write the word — even just one word is enough." onSpill={onSpill} />
      </div>
    </div>
  );
}

function BigFeelings({ onBack, onSpill }) {
  const [active, setActive] = useState(null);
  const tools = [
    { title: "Breathe slowly", desc: "Breathe in for 4 counts, hold for 2, breathe out for 6. Do it three times. It actually tells your brain to calm down.", icon: "🫁", color: C.teal, bg: C.tealLight },
    { title: "Move your body", desc: "Jump, shake your hands, do star jumps, run on the spot. Feelings get stuck in your body and moving them out actually helps.", icon: "🤸", color: C.green, bg: C.greenLight },
    { title: "Squeeze something tight", desc: "A cushion, a teddy, your own hands. Squeeze as hard as you can for 5 seconds then let go. Do it a few times.", icon: "✊", color: C.purple, bg: C.purpleLight },
    { title: "Name it out loud", desc: "Say 'I am feeling really angry right now' or 'I feel really sad'. Out loud if you can. Just naming it helps.", icon: "💬", color: C.pink, bg: C.pinkLight },
    { title: "Tell a grown-up", desc: "You don't have to deal with huge feelings on your own. Find a grown-up you trust and tell them how you feel.", icon: "🧑‍🤝‍🧑", color: C.orange, bg: C.orangeLight },
    { title: "Give it time", desc: "Even the biggest feelings get smaller eventually. You don't have to fix it right now. Just get through the next few minutes.", icon: "⏳", color: C.yellow, bg: C.yellowLight },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="When feelings feel too big" emoji="🌊" onBack={onBack} bg="linear-gradient(135deg,#7C3AED,#0891B2)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Sometimes feelings get so big they're hard to handle. That's okay — it happens to everyone, including grown-ups. Here are things that actually help.</BigText>
        <BigHighlight color={C.purpleLight} border={C.purple}>
          A big feeling is not going to hurt you. It might feel enormous right now. But feelings always pass — even the really big ones. You just have to get through them.
        </BigHighlight>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Tap something to try right now</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {tools.map((t, i) => (
            <div key={i} onClick={() => setActive(active === i ? null : i)} style={{ background: active === i ? t.bg : C.white, border: `2px solid ${active === i ? t.color : C.border}`, borderRadius: 16, padding: 14, textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{t.title}</div>
            </div>
          ))}
        </div>
        {active !== null && (
          <div style={{ background: tools[active].bg, border: `2px solid ${tools[active].color}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.dark, marginBottom: 6 }}>{tools[active].icon} {tools[active].title}</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>{tools[active].desc}</div>
          </div>
        )}
        <SpillPrompt prompt="Draw what a big feeling looks like for you. What colour is it? What shape? Does it have a face?" onSpill={onSpill} />
      </div>
    </div>
  );
}

function MoreThanOneFeeling({ onBack, onSpill }) {
  const [picked, setPicked] = useState([]);
  const toggle = e => setPicked(p => p.includes(e) ? p.filter(x => x !== e) : [...p, e]);
  const emojis = ["😊","😢","😠","😰","😳","😴","😍","🥱","😕","🤩","😬","🥺","😏","🫠","🤔","😌"];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Feeling more than one thing" emoji="🌈" onBack={onBack} bg="linear-gradient(135deg,#10B981,#7C3AED)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Did you know you can feel two completely different things at the same time? Like excited AND scared about something. Or happy AND sad. That's completely normal.</BigText>
        <BigHighlight color={C.greenLight} border={C.green}>
          Feelings don't have to make sense. You're allowed to feel sad at a birthday party. You're allowed to feel relieved when something scary is over but also sad it's gone. Feelings don't follow rules.
        </BigHighlight>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 4 }}>How many feelings are you feeling right now?</div>
        <div style={{ fontSize: 13, color: C.mid, marginBottom: 12 }}>Tap all the ones that fit — even if they seem opposite</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
          {emojis.map((e, i) => (
            <div key={i} onClick={() => toggle(e)} style={{ background: picked.includes(e) ? C.purpleLight : C.white, border: `2px solid ${picked.includes(e) ? C.purple : C.border}`, borderRadius: 12, padding: 12, textAlign: "center", cursor: "pointer", fontSize: 28, transition: "all 0.15s" }}>
              {e}
            </div>
          ))}
        </div>
        {picked.length >= 2 && (
          <div style={{ background: C.purpleLight, border: `1.5px solid ${C.purple}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.purple, marginBottom: 4 }}>You're feeling {picked.length} things at once.</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.5 }}>That's completely okay. The more feelings you can name, the better you get at understanding yourself.</div>
          </div>
        )}
        <BigHighlight color={C.yellowLight} border={C.yellow}>
          You don't have to pick just one feeling and stick with it. You're allowed to be complicated. Everyone is.
        </BigHighlight>
        <SpillPrompt prompt="Draw your feelings as colours mixed together. What do they make?" onSpill={onSpill} />
      </div>
    </div>
  );
}

function FeelingsInYourBody({ onBack, onSpill }) {
  const [selected, setSelected] = useState(null);
  const parts = [
    { part: "Head", feelings: "Headaches when you're stressed. Fuzzy thinking when you're tired. Racing thoughts when you're worried. Spinning feeling when you're overwhelmed.", icon: "🧠" },
    { part: "Face", feelings: "Going red when you're embarrassed or angry. Tears when you're sad. Big smiles when you're happy. Clenched jaw when you're stressed.", icon: "😊" },
    { part: "Throat", feelings: "Tight throat when you're trying not to cry. Hard to swallow when you're nervous. Voice going wobbly when you're upset.", icon: "🗣️" },
    { part: "Chest", feelings: "Heart beating fast when you're scared or excited. Tight chest when you're anxious. Warm chest when you feel loved.", icon: "❤️" },
    { part: "Tummy", feelings: "Butterflies when you're nervous or excited. Feeling sick when you're very worried. Hollow feeling when you're sad.", icon: "🫃" },
    { part: "Hands", feelings: "Sweaty hands when you're nervous. Shaky hands when you're scared. Clenched fists when you're angry.", icon: "✋" },
    { part: "Legs", feelings: "Wobbly legs when you're very nervous. Heavy legs when you're tired or sad. Restless legs when you need to move.", icon: "🦵" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="Feelings in your body" emoji="🫀" onBack={onBack} bg="linear-gradient(135deg,#EC4899,#EF4444)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Feelings don't just happen in your head — they happen in your whole body. Next time you feel something, see if you can notice where it is in your body.</BigText>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Tap a body part to find out what feelings live there</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {parts.map((p, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{ background: selected === i ? C.pinkLight : C.white, border: `2px solid ${selected === i ? C.pink : C.border}`, borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 24 }}>{p.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.dark }}>{p.part}</div>
                <div style={{ fontSize: 12, color: C.mid, marginLeft: "auto" }}>{selected === i ? "▲" : "▼"}</div>
              </div>
              {selected === i && <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.pink}` }}>{p.feelings}</div>}
            </div>
          ))}
        </div>
        <BigHighlight color={C.tealLight} border={C.teal}>
          Your body is always trying to tell you something. The more you notice it, the better you get at understanding what you need.
        </BigHighlight>
        <SpillPrompt prompt="Where do you feel feelings most in your body? Draw an outline of a person and colour in where your feelings live." onSpill={onSpill} />
      </div>
    </div>
  );
}

function AboutWorry({ onBack, onSpill }) {
  const [worryWritten, setWorryWritten] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <BackHeader title="About worry" emoji="😰" onBack={onBack} bg="linear-gradient(135deg,#0891B2,#7C3AED)" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <BigText>Worry is when your brain keeps thinking about something that might go wrong. Almost everyone worries sometimes. Here's what's actually happening — and what helps.</BigText>
        <BigHighlight color={C.purpleLight} border={C.purple}>
          Your brain worries because it's trying to keep you safe. It's looking out for problems before they happen. That's actually really clever — it just sometimes goes a bit too far.
        </BigHighlight>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>The worry trick</div>
        <BigText>Most things we worry about never actually happen. And the things that do happen — we usually cope with better than we thought we would.</BigText>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Try this — write your worry down</div>
        <BigText style={{ fontSize: 14 }}>When you get a worry out of your head and onto paper, it gets smaller. Try it.</BigText>
        {!submitted ? (
          <>
            <textarea
              value={worryWritten}
              onChange={e => setWorryWritten(e.target.value)}
              placeholder="What are you worried about right now?"
              style={{ width: "100%", minHeight: 100, border: `2px solid ${C.border}`, borderRadius: 14, padding: 12, fontFamily: "Nunito, sans-serif", fontSize: 15, color: C.dark, resize: "none", outline: "none", background: C.white, lineHeight: 1.5, marginBottom: 10 }}
              onFocus={e => e.target.style.borderColor = C.purple}
              onBlur={e => e.target.style.borderColor = C.border}
            />
            {worryWritten.trim() && (
              <button onClick={() => setSubmitted(true)} style={{ width: "100%", background: C.purple, color: C.white, border: "none", borderRadius: 12, padding: 14, fontFamily: "Nunito, sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 16 }}>I wrote it down</button>
            )}
          </>
        ) : (
          <div style={{ background: C.purpleLight, border: `2px solid ${C.purple}`, borderRadius: 14, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.purple, marginBottom: 4 }}>Good. It's out of your head now.</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>Now ask yourself: is there anything I can actually do about this today? If yes — do that one thing. If no — try to let it go for now. You've done what you can.</div>
          </div>
        )}
        <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Things that help with worry</div>
        {["Tell a grown-up what you're worried about", "Write it down or draw it", "Do something physical — move your body", "Breathe slowly — in for 4, out for 6", "Remind yourself: most worries never happen", "Do something you enjoy to give your brain a break"].map((tip, i) => (
          <div key={i} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", gap: 10 }}>
            <div style={{ color: C.purple, fontWeight: 800, flexShrink: 0 }}>→</div>
            <div style={{ fontSize: 14, color: C.dark, lineHeight: 1.4 }}>{tip}</div>
          </div>
        ))}
        <BigHighlight color={C.yellowLight} border={C.yellow}>
          If you worry a lot — so much that it stops you doing things or makes it hard to sleep — please tell a grown-up. Worry that big can be helped. You don't have to just put up with it.
        </BigHighlight>
        <SpillPrompt prompt="Write about a worry. Then write what the worst that could actually happen is — and what you'd do if it did." onSpill={onSpill} />
      </div>
    </div>
  );
}

// ── REGISTRIES ─────────────────────────────────────────────────
const FRIENDS_TOPICS = {
  making: MakingFriends,
  left_out: LeftOut,
  falling_out: FallingOut,
  being_kind: BeingKind,
  unkind: WhenSomeoneIsUnkind,
};

const FRIENDS_LIST = [
  { id: "making", emoji: "👋", title: "Making new friends", desc: "What to do when you want to make a friend but don't know how", tags: ["friendship", "confidence"] },
  { id: "left_out", emoji: "💔", title: "When someone leaves you out", desc: "What to do when you're not included", tags: ["feelings", "friendship"] },
  { id: "falling_out", emoji: "🌈", title: "Falling out and making up", desc: "What happens when friends argue and how to fix it", tags: ["conflict", "making up"] },
  { id: "being_kind", emoji: "⭐", title: "Being a good friend", desc: "The things good friends actually do", tags: ["kindness", "friendship"] },
  { id: "unkind", emoji: "🛡️", title: "When someone is unkind", desc: "What to do if someone is being mean to you", tags: ["safety", "feelings"] },
];

const FEELINGS_TOPICS = {
  naming: NamingFeelings,
  big: BigFeelings,
  multiple: MoreThanOneFeeling,
  body: FeelingsInYourBody,
  worry: AboutWorry,
};

const FEELINGS_LIST = [
  { id: "naming", emoji: "🎨", title: "Naming your feelings", desc: "What different feelings are called and what they feel like", tags: ["emotions", "understanding"] },
  { id: "big", emoji: "🌊", title: "When feelings feel too big", desc: "What to do when a feeling is really overwhelming", tags: ["big emotions", "help"] },
  { id: "multiple", emoji: "🌈", title: "Feeling more than one thing", desc: "Why you can feel happy AND sad at the same time", tags: ["mixed feelings"] },
  { id: "body", emoji: "🫀", title: "Feelings in your body", desc: "Where feelings live in your body and what they feel like", tags: ["body", "feelings"] },
  { id: "worry", emoji: "😰", title: "About worry", desc: "What worry is, why it happens, and what actually helps", tags: ["anxiety", "worry"] },
];

const Tag = ({ label }) => (
  <span style={{ display: "inline-block", background: C.tealLight, color: C.teal, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, marginRight: 4, marginTop: 4 }}>{label}</span>
);

function TopicList({ topics, list, headerBg, headerTitle, headerEmoji, headerDesc, onSpill }) {
  const [active, setActive] = useState(null);
  if (active) {
    const Component = topics[active];
    return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}><Component onBack={() => setActive(null)} onSpill={onSpill} /></div>;
  }
  return (
    <div>
      <div style={{ background: headerBg, padding: "16px 20px 20px", color: C.white }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{headerEmoji}</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>{headerTitle}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{headerDesc}</div>
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        {list.map(t => (
          <div key={t.id} onClick={() => setActive(t.id)} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: 14, marginBottom: 10, cursor: "pointer", transition: "transform 0.12s" }}
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

export function YoungFriendsHome({ onSpill }) {
  return <TopicList topics={FRIENDS_TOPICS} list={FRIENDS_LIST} headerBg="linear-gradient(135deg,#10B981,#0891B2)" headerTitle="Friends" headerEmoji="👫" headerDesc="Friendships, falling out, making up — the stuff that matters." onSpill={onSpill} />;
}

export function YoungFeelingsHome({ onSpill }) {
  return <TopicList topics={FEELINGS_TOPICS} list={FEELINGS_LIST} headerBg="linear-gradient(135deg,#F59E0B,#EC4899)" headerTitle="How I Feel" headerEmoji="💛" headerDesc="Your feelings make sense. Here's what to do with them." onSpill={onSpill} />;
}
