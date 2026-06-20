import { useState, useEffect } from "react";

const KEYS = {
  onboarded: "spark_onboarded",
  plantName: "spark_plant_name",
  band: "spark_band",
  bloomProgress: "spark_bloom_progress",
  bloomStage: "spark_bloom_stage",
  vibeHistory: "spark_vibe_history",
  spillCount: "spark_spill_count",
  spillToday: "spark_spill_today",
  spillCountToday: "spark_spill_count_today",
  totalActions: "spark_total_actions",
  lastOpened: "spark_last_opened",
  memories: "spark_memories",
};

function load(key, fallback = null) {
  try { const val = localStorage.getItem(key); return val !== null ? JSON.parse(val) : fallback; } catch { return fallback; }
}
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }

const BLOOM_STAGES = [
  { emoji: "🌱", name: "Seed", desc: "You showed up. That was enough." },
  { emoji: "🌿", name: "Sprouting", desc: "Something's starting." },
  { emoji: "🌻", name: "Growing", desc: "You're finding your way." },
  { emoji: "🌸", name: "Budding", desc: "Big things coming." },
  { emoji: "💐", name: "Blooming", desc: "Look how far you've come." },
  { emoji: "✨", name: "Seeding", desc: "Now you're growing others." },
];

const PROGRESS_PER_ACTION = { open: 1, vibe: 3, spill: 5, cooldown: 4, explore: 2 };

export function useSparkStorage() {
  const [onboarded, setOnboarded] = useState(() => load(KEYS.onboarded, false));
  const [plantName, setPlantNameState] = useState(() => load(KEYS.plantName, "Ziggy"));
  const [band, setBandState] = useState(() => load(KEYS.band, null));
  const [bloomProgress, setBloomProgressState] = useState(() => load(KEYS.bloomProgress, 0));
  const [bloomStage, setBloomStageState] = useState(() => load(KEYS.bloomStage, 0));
  const [vibeHistory, setVibeHistoryState] = useState(() => load(KEYS.vibeHistory, []));
  const [spillCount, setSpillCountState] = useState(() => load(KEYS.spillCount, 0));
  const [totalActions, setTotalActionsState] = useState(() => load(KEYS.totalActions, 0));
  const [memories, setMemoriesState] = useState(() => load(KEYS.memories, []));
  const today = new Date().toDateString();
  const spillDay = load(KEYS.spillToday, "");
  const [spillCountToday, setSpillCountTodayState] = useState(() => spillDay === today ? load(KEYS.spillCountToday, 0) : 0);

  useEffect(() => {
    if (!onboarded) return;
    const last = load(KEYS.lastOpened, "");
    const now = new Date().toDateString();
    if (last !== now) { save(KEYS.lastOpened, now); addProgress("open"); }
  }, [onboarded]);

  const addMemory = (text) => {
    const entry = { text, date: new Date().toISOString() };
    setMemoriesState(prev => { const next = [...prev.slice(-19), entry]; save(KEYS.memories, next); return next; });
  };

  const addProgress = (actionType = "open") => {
    const gain = PROGRESS_PER_ACTION[actionType] || 1;
    setBloomProgressState(prev => {
      let newProg = prev + gain;
      let newStage = load(KEYS.bloomStage, 0);
      if (newProg >= 100 && newStage < BLOOM_STAGES.length - 1) {
        newProg = 0; newStage = newStage + 1;
        save(KEYS.bloomStage, newStage); setBloomStageState(newStage);
        addMemory(`You reached ${BLOOM_STAGES[newStage].name}. ${BLOOM_STAGES[newStage].desc}`);
      }
      save(KEYS.bloomProgress, newProg); return newProg;
    });
    setTotalActionsState(prev => { const next = prev + 1; save(KEYS.totalActions, next); return next; });
  };

  const completeOnboarding = ({ band, plantName }) => {
    save(KEYS.onboarded, true); save(KEYS.band, band); save(KEYS.plantName, plantName);
    save(KEYS.bloomProgress, 5); save(KEYS.bloomStage, 0);
    setOnboarded(true); setBandState(band); setPlantNameState(plantName);
    setBloomProgressState(5); setBloomStageState(0);
    const mem = [{ text: `${plantName} was planted today. Every time you come back, they grow.`, date: new Date().toISOString() }];
    save(KEYS.memories, mem); setMemoriesState(mem);
  };

  const recordVibe = (vibe) => {
    const entry = { vibe, date: new Date().toISOString() };
    setVibeHistoryState(prev => {
      const next = [...prev.slice(-49), entry];
      save(KEYS.vibeHistory, next);
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        const POSITIVE = ["Float", "Fired Up", "Almost"];
        const TOUGH = ["Volcano", "Fog", "Zapped", "Shell", "Wobbly"];
        if (TOUGH.includes(last.vibe) && POSITIVE.includes(vibe)) {
          addMemory(`Last time you checked in you were feeling ${last.vibe}. Today you picked ${vibe}. Look at that.`);
        }
      }
      return next;
    });
    addProgress("vibe");
  };

  const recordSpill = () => {
    const newTotal = spillCount + 1; save(KEYS.spillCount, newTotal); setSpillCountState(newTotal);
    const newToday = spillCountToday + 1; save(KEYS.spillToday, today); save(KEYS.spillCountToday, newToday); setSpillCountTodayState(newToday);
    addProgress("spill");
    if (newTotal === 5) addMemory("You've spilled 5 times. That's 5 times you got something out of your head.");
    if (newTotal === 10) addMemory("10 spills. That's a lot of stuff that's no longer stuck inside you.");
    if (newTotal === 25) addMemory("25 spills. You keep coming back. That means something.");
  };

  const getLatestMemory = () => { const all = load(KEYS.memories, []); return all.length > 0 ? all[all.length - 1].text : null; };

  const resetAll = () => {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    setOnboarded(false); setPlantNameState("Ziggy"); setBandState(null);
    setBloomProgressState(0); setBloomStageState(0); setVibeHistoryState([]);
    setSpillCountState(0); setSpillCountTodayState(0); setTotalActionsState(0); setMemoriesState([]);
  };

  return {
    onboarded, plantName, band, bloomProgress, bloomStage,
    bloomStages: BLOOM_STAGES, currentStage: BLOOM_STAGES[bloomStage] || BLOOM_STAGES[0],
    vibeHistory, spillCount, spillCountToday, totalActions, memories,
    completeOnboarding, addProgress, recordVibe, recordSpill, addMemory, getLatestMemory, resetAll,
  };
}
