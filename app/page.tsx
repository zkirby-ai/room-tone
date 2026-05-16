'use client';

import { useMemo, useState } from 'react';

type Mode = 'spark' | 'group' | 'rescue' | 'games';

type PromptCard = {
  id: string;
  text: string;
  tag: string;
  vibe: string;
  mode: Mode;
};

const PROMPTS: PromptCard[] = [
  { id: 's1', mode: 'spark', vibe: 'playful', tag: 'Quick hit', text: 'What is your most irrationally strong opinion about something completely unimportant?' },
  { id: 's2', mode: 'spark', vibe: 'story', tag: 'Story bait', text: 'What is the weirdest compliment you have ever gotten?' },
  { id: 's3', mode: 'spark', vibe: 'nostalgia', tag: 'Easy win', text: 'What felt insanely fancy to you as a kid?' },
  { id: 's4', mode: 'spark', vibe: 'chaotic', tag: 'Unhinged', text: 'What fake job title would make you sound the most dangerous at a party?' },
  { id: 'g1', mode: 'group', vibe: 'crowd', tag: 'Loop people in', text: 'Everyone point to the person here most likely to accidentally start a cult.' },
  { id: 'g2', mode: 'group', vibe: 'crowd', tag: 'Go around', text: 'Go around: what is your most niche flex that sounds fake but is true?' },
  { id: 'g3', mode: 'group', vibe: 'warm', tag: 'Better than small talk', text: 'What is something you have become weirdly evangelistic about in the last year?' },
  { id: 'g4', mode: 'group', vibe: 'late-night', tag: 'Gets stories', text: 'Best bad decision that somehow worked out?' },
  { id: 'r1', mode: 'rescue', vibe: '1:1', tag: 'Dead-air rescue', text: 'Okay, better question: what do you get weirdly obsessive about?' },
  { id: 'r2', mode: 'rescue', vibe: '1:1', tag: 'Move deeper', text: 'What is something you wish more people asked you about?' },
  { id: 'r3', mode: 'rescue', vibe: '1:1', tag: 'Playful', text: 'What is your most cursed but defendable take?' },
  { id: 'r4', mode: 'rescue', vibe: '1:1', tag: 'Personal without too much', text: 'What kind of person do you instantly like?' },
  { id: 'gm1', mode: 'games', vibe: 'party', tag: 'Pass the phone', text: 'Pass the phone. Each person shares the most chaotic job they could be trusted with for exactly one day.' },
  { id: 'gm2', mode: 'games', vibe: 'party', tag: 'Vote', text: 'One person gives a hot take. Everyone else votes: valid, insane, or secretly correct.' },
  { id: 'gm3', mode: 'games', vibe: 'party', tag: 'Rounds', text: 'Category round: worst date, weird internet, niche talent, strange hill to die on. Pick one and go.' },
  { id: 'gm4', mode: 'games', vibe: 'party', tag: 'Energy reset', text: 'Everyone says the most unexpectedly useful life advice they have ever gotten.' },
];

const MODE_META: Record<Mode, { label: string; eyebrow: string; description: string }> = {
  spark: {
    label: 'Spark',
    eyebrow: 'One good prompt',
    description: 'Fast prompts for breaking the first layer of awkward.'
  },
  group: {
    label: 'Group',
    eyebrow: '3+ people',
    description: 'Prompts that pull more people into the same orbit.'
  },
  rescue: {
    label: 'Rescue',
    eyebrow: '1:1 recovery',
    description: 'For when a conversation is flat and needs a better lane.'
  },
  games: {
    label: 'Games',
    eyebrow: 'Pass-the-phone',
    description: 'Tiny social mechanics that give the room a shape.'
  }
};

export default function HomePage() {
  const [mode, setMode] = useState<Mode>('spark');
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState<string[]>([]);

  const deck = useMemo(() => PROMPTS.filter((prompt) => prompt.mode === mode), [mode]);
  const current = deck[index % deck.length];

  function nextPrompt() {
    setIndex((value) => (value + 1) % deck.length);
  }

  function onModeChange(nextMode: Mode) {
    setMode(nextMode);
    setIndex(0);
  }

  function toggleSave(id: string) {
    setSaved((value) => (value.includes(id) ? value.filter((item) => item !== id) : [...value, id]));
  }

  return (
    <main className="shell">
      <header className="hero card">
        <p className="eyebrow">Room Tone</p>
        <h1>Conversation momentum for parties.</h1>
        <p className="lede">
          Not a charisma coach. Just a social spark plug for dead air, weird energy, and getting people actually talking.
        </p>
      </header>

      <nav className="modeTabs" aria-label="Modes">
        {(Object.keys(MODE_META) as Mode[]).map((item) => (
          <button key={item} className={`modeTab ${mode === item ? 'active' : ''}`} onClick={() => onModeChange(item)}>
            {MODE_META[item].label}
          </button>
        ))}
      </nav>

      <section className="promptCard card">
        <div className="promptMeta">
          <div>
            <p className="eyebrow">{MODE_META[mode].eyebrow}</p>
            <h2>{MODE_META[mode].label}</h2>
          </div>
          <span className="tag">{current.tag}</span>
        </div>

        <p className="modeDescription">{MODE_META[mode].description}</p>
        <blockquote>{current.text}</blockquote>

        <div className="vibeRow">
          <span className="vibe">{current.vibe}</span>
          <span className="vibe">{saved.includes(current.id) ? 'Saved' : 'Unsaved'}</span>
        </div>

        <div className="actions">
          <button className="secondaryButton" onClick={() => toggleSave(current.id)}>
            {saved.includes(current.id) ? 'Unsave' : 'Save this'}
          </button>
          <button className="primaryButton" onClick={nextPrompt}>
            Next prompt
          </button>
        </div>
      </section>

      <section className="card infoGrid">
        <article>
          <p className="eyebrow">Why this exists</p>
          <h3>Kill bad small talk</h3>
          <p>The app should help people get past the first boring five minutes without sounding like therapy homework.</p>
        </article>
        <article>
          <p className="eyebrow">Product edge</p>
          <h3>Low cringe curation</h3>
          <p>The real product is taste. Prompts should feel actually fun out loud, not like workshop slop.</p>
        </article>
        <article>
          <p className="eyebrow">Next up</p>
          <h3>Host mode / mood selector</h3>
          <p>Future versions should add modes like chill, flirty, chaotic, and smart-people-being-annoying.</p>
        </article>
      </section>

      <section className="card savedPanel">
        <div className="savedHead">
          <div>
            <p className="eyebrow">Saved prompts</p>
            <h3>{saved.length}</h3>
          </div>
          <span className="savedHint">Keep the bangers</span>
        </div>
        {saved.length === 0 ? (
          <p className="emptyText">Nothing saved yet. Save the prompts that actually get a room moving.</p>
        ) : (
          <ul>
            {PROMPTS.filter((prompt) => saved.includes(prompt.id)).map((prompt) => (
              <li key={prompt.id}>{prompt.text}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
