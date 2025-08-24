import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Support.css";

/** Tiny icon set (inline SVGs, no deps) */
const Icon = {
  breath: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M12 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm7.07 3.93a1 1 0 0 1 0 1.41l-2.12 2.12a1 1 0 1 1-1.42-1.41l2.13-2.12a1 1 0 0 1 1.41 0ZM21 11a1 1 0 1 1 0 2h-3a1 1 0 1 1 0-2h3ZM5.05 5.05a1 1 0 0 1 1.41 0l2.13 2.12A1 1 0 1 1 7.17 8.6L5.05 6.48a1 1 0 0 1 0-1.41ZM6 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1Zm10.24 4.95a1 1 0 0 1 1.41 0l2.13 2.12a1 1 0 0 1-1.42 1.41l-2.12-2.12a1 1 0 0 1 0-1.41ZM12 18a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm-7.78-.93a1 1 0 0 1 1.41-1.41l2.13 2.12a1 1 0 1 1-1.42 1.41l-2.12-2.12Z"/>
    </svg>
  ),
  music: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M19 3v12.13A4 4 0 1 1 17 19V9H9v6.13A4 4 0 1 1 7 19V5h12Z"/>
    </svg>
  ),
  game: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M6 7a4 4 0 0 0-4 4v5a3 3 0 0 0 3 3h2.5l2-2H14.5l2 2H19a3 3 0 0 0 3-3v-5a4 4 0 0 0-4-4H6Zm2 3h2v2h2v2h-2v2H8v-2H6v-2h2v-2Zm8.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-2-2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
    </svg>
  ),
  quote: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M10 7h2v2h-2V7Zm-2 4h4v6H6v-4l2-2Zm10-4h2v2h-2V7Zm-2 4h4v6h-6v-4l2-2Z"/>
    </svg>
  ),
  info: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/>
    </svg>
  ),
  play: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M8 5v14l11-7L8 5Z"/>
    </svg>
  ),
  pause: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z"/>
    </svg>
  ),
};

/** ---------- Breathing Exercise ---------- */
function BreathingExercise() {
  const patterns = {
    "Box 4‑4‑4‑4": { phases: ["Inhale", "Hold", "Exhale", "Hold"], counts: [4, 4, 4, 4] },
    "4‑7‑8": { phases: ["Inhale", "Hold", "Exhale"], counts: [4, 7, 8] },
    "Calm 5‑5": { phases: ["Inhale", "Exhale"], counts: [5, 5] },
  };

  const [selected, setSelected] = useState("Box 4‑4‑4‑4");
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(patterns[selected].counts[0]);

  const current = patterns[selected];
  const phase = current.phases[phaseIdx];
  const target = current.counts[phaseIdx];

  useEffect(() => {
    setPhaseIdx(0);
    setCount(patterns[selected].counts[0]);
    setIsRunning(false);
  }, [selected]);

  useEffect(() => {
    if (!isRunning) return;
    if (count === 0) {
      // next phase
      setPhaseIdx((p) => (p + 1) % current.counts.length);
      setCount(current.counts[(phaseIdx + 1) % current.counts.length]);
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, isRunning, phaseIdx, selected]);

  useEffect(() => {
    // restart count when phase changes while running
    if (isRunning) setCount(current.counts[phaseIdx]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseIdx]);

  const scale = useMemo(() => {
    // Make the circle grow on "Inhale", shrink on "Exhale", steady on "Hold"
    if (phase === "Inhale") return "scale-up";
    if (phase === "Exhale") return "scale-down";
    return "scale-hold";
  }, [phase]);

  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.breath /></span>
        <h2>Breathing Exercise</h2>
      </header>

      <div className="breath-controls">
        <label className="select">
          <span>Pattern</span>
          <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            {Object.keys(patterns).map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>

        <div className="btn-row">
          <button className="btn primary" onClick={() => { setIsRunning(true); setCount(target); }}>
            <Icon.play className="btn-ico" /> Start
          </button>
          <button className="btn" onClick={() => setIsRunning(false)}>
            <Icon.pause className="btn-ico" /> Pause
          </button>
          <button className="btn subtle" onClick={() => { setIsRunning(false); setPhaseIdx(0); setCount(current.counts[0]); }}>
            Reset
          </button>
        </div>
      </div>

      <div className="breath-visual">
        <div className={`circle ${scale}`} aria-live="polite" aria-label={`Phase ${phase}, ${count} seconds left`} />
        <div className="phase">{phase}</div>
        <div className="counter">{count}s</div>
      </div>

      <p className="hint">Tip: Breathe through your nose, relax your shoulders, and let your exhale be slow.</p>
    </section>
  );
}

/** ---------- Calm Music ---------- */
function CalmMusic() {
  const [isPlaying, setIsPlaying] = useState(null);
  const players = useRef({});

  const tracks = [
    // Replace src with your hosted files if you have them
    { id: 1, title: "Soft Rain", src: "" },
    { id: 2, title: "Ocean Waves", src: "" },
    { id: 3, title: "Deep Focus Tone", src: "" },
  ];

  const toggle = (id) => {
    if (!players.current[id]) return;
    if (isPlaying === id) {
      players.current[id].pause();
      setIsPlaying(null);
    } else {
      Object.values(players.current).forEach((a) => a && a.pause());
      players.current[id].play();
      setIsPlaying(id);
    }
  };

  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.music /></span>
        <h2>Calm Music & Sounds</h2>
      </header>

      <div className="list">
        {tracks.map((t) => (
          <div key={t.id} className="list-item">
            <div className="li-title">{t.title}</div>
            <div className="li-actions">
              <button className="btn" onClick={() => toggle(t.id)}>
                {isPlaying === t.id ? <><Icon.pause className="btn-ico" />Pause</> : <><Icon.play className="btn-ico" />Play</>}
              </button>
              <audio ref={(el) => (players.current[t.id] = el)} src={t.src} preload="none" />
            </div>
          </div>
        ))}
      </div>

      <details className="yt-wrap">
        <summary>Use a YouTube playlist (optional)</summary>
        {/* Replace the src with your calming playlist */}
        <div className="yt-frame">
          <iframe
            title="Calm Playlist"
            src="https://www.youtube.com/embed/videoseries?list=PLQog_ExamplePlaylistId"
            allow="autoplay; encrypted-media"
          />
        </div>
      </details>

      <p className="hint">You can host MP3 files and paste their URLs into the list above, or embed a playlist here.</p>
    </section>
  );
}

/** ---------- Mini Memory Game (4x4) ---------- */
function MiniGame() {
  const EMOJIS = ["🌿","🌙","🌊","✨","🌸","☁️","🍃","🫧"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const doubled = [...EMOJIS, ...EMOJIS]
      .map((emoji, idx) => ({ id: idx, emoji, order: Math.random() }))
      .sort((a, b) => a.order - b.order);
    setCards(doubled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
  }, []); // mount

  useEffect(() => {
    if (matched.length === 16) setWon(true);
  }, [matched]);

  const onFlip = (idx) => {
    if (flipped.includes(idx) || matched.includes(idx) || flipped.length === 2) return;
    setFlipped((f) => [...f, idx]);

    if (flipped.length === 1) {
      const first = cards[flipped[0]];
      const second = cards[idx];
      setMoves((m) => m + 1);
      if (first.emoji === second.emoji) {
        setMatched((m) => [...m, flipped[0], idx]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const reset = () => {
    const reshuffled = [...EMOJIS, ...EMOJIS]
      .map((emoji, idx) => ({ id: idx, emoji, order: Math.random() }))
      .sort((a, b) => a.order - b.order);
    setCards(reshuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
  };

  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.game /></span>
        <h2>Mini Game — Memory Match</h2>
      </header>

      <div className="game-head">
        <div className="pill">Moves: {moves}</div>
        <button className="btn" onClick={reset}>Restart</button>
      </div>

      <div className="grid">
        {cards.map((c, idx) => {
          const isUp = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={idx}
              className={`card-tile ${isUp ? "up" : ""}`}
              onClick={() => onFlip(idx)}
              aria-label={isUp ? `Card ${idx + 1} shown` : `Flip card ${idx + 1}`}
            >
              <span className="face front">🜂</span>
              <span className="face back">{c.emoji}</span>
            </button>
          );
        })}
      </div>

      {won && <div className="win">Nice! You matched them all 🎉</div>}
      <p className="hint">Short, light focus game to gently shift attention.</p>
    </section>
  );
}

/** ---------- Affirmations ---------- */
function Affirmations() {
  const quotes = [
    "I can handle this moment.",
    "My breath anchors me to calm.",
    "I choose progress over perfection.",
    "I am safe; I am present.",
    "One small step is enough right now.",
    "Exhale tension, inhale ease.",
  ];
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % quotes.length);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(quotes[idx]);
      alert("Affirmation copied 💙");
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.quote /></span>
        <h2>Affirmations</h2>
      </header>

      <blockquote className="affirmation">“{quotes[idx]}”</blockquote>
      <div className="btn-row">
        <button className="btn" onClick={next}>New</button>
        <button className="btn subtle" onClick={copy}>Copy</button>
      </div>
      <p className="hint">Rotate these or replace with your own to fit MindWell’s tone.</p>
    </section>
  );
}

/** ---------- Tips & Resources ---------- */
function TipsResources() {
  return (
    <section className="card">
      <header className="card-header">
        <span className="icon-wrap"><Icon.info /></span>
        <h2>Tips & Resources</h2>
      </header>

      <ul className="tips">
        <li><strong>Mini‑pause:</strong> unclench your jaw, drop your shoulders, sip water.</li>
        <li><strong>Micro‑journaling:</strong> write 3 words that describe how you feel.</li>
        <li><strong>Light movement:</strong> 10 gentle neck circles and a slow stretch.</li>
        <li><strong>Boundaries:</strong> mute non‑urgent notifications for 20 minutes.</li>
      </ul>

      <div className="sos">
        <p><strong>Need immediate help?</strong> Please contact your local emergency number.</p>
        <p className="sos-small">Sri Lanka examples (edit as needed): Police <b>119</b>, Ambulance <b>1990</b>. If you’re in crisis, reach out to a trusted person or local helpline.</p>
      </div>
    </section>
  );
}

/** ---------- Page Shell with Tabs ---------- */
const TABS = ["Breathing", "Calm Music", "Mini Games", "Affirmations", "Tips & Resources"];

export default function Support() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <main className="support-page">
      <section className="hero">
        <h1>MindWell Support</h1>
        <p>gentle tools to steady your mind — breathe, listen, play, reflect.</p>

        <nav className="tabs" aria-label="Support sections">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tab ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
              role="tab"
              aria-selected={tab === t}
            >
              {t}
            </button>
          ))}
        </nav>
      </section>

      <div className="grid-wrap">
        {tab === "Breathing" && (
          <>
            <BreathingExercise />
            <Affirmations />
          </>
        )}

        {tab === "Calm Music" && (
          <>
            <CalmMusic />
            <TipsResources />
          </>
        )}

        {tab === "Mini Games" && (
          <>
            <MiniGame />
            <BreathingExercise />
          </>
        )}

        {tab === "Affirmations" && (
          <>
            <Affirmations />
            <TipsResources />
          </>
        )}

        {tab === "Tips & Resources" && (
          <>
            <TipsResources />
            <BreathingExercise />
          </>
        )}
      </div>

      <footer className="foot">
        <small>Note: This page offers wellbeing support but isn’t a substitute for professional care.</small>
      </footer>
    </main>
  );
}
