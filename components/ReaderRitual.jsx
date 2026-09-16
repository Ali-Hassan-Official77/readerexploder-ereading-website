'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BookOpen,
  Flame,
  Library,
  Sparkles,
  Target,
} from 'lucide-react';
import { useReadingList } from '@/lib/useReadingList';

const prompts = [
  'Read ten pages before you open another tab.',
  'Pick a book you know nothing about.',
  'Give one quiet chapter your full attention.',
  'Read somewhere you have never read before.',
  'Choose the title with the strangest cover.',
  'Revisit a line that stayed with you.',
];

export default function ReaderRitual() {
  const { list } = useReadingList();

  /*
   * Keep the first render identical on server and client.
   * The reading-list count is populated only after hydration.
   */
  const [savedCount, setSavedCount] = useState(0);

  /*
   * Use a stable prompt during SSR/hydration.
   * After hydration, update it using the current day.
   */
  const [prompt, setPrompt] = useState(prompts[0]);

  useEffect(() => {
    setSavedCount(list.length);

    const day = new Date().getDate();
    setPrompt(prompts[day % prompts.length]);
  }, [list.length]);

  return (
    <section className="mx-5 my-10 overflow-hidden rounded-[30px] border border-accent/20 bg-[radial-gradient(circle_at_15%_10%,rgba(215,176,106,.16),transparent_35%),linear-gradient(135deg,rgba(255,255,255,.045),rgba(255,255,255,.015))] md:mx-8">
      <div className="grid gap-8 p-7 md:grid-cols-[1.25fr_.75fr] md:p-10">
        <div>
          <div className="eyebrow flex items-center gap-2 text-accent">
            <Sparkles size={13} />
            The Reader Ritual
          </div>

          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[.95] md:text-5xl">
            A small reason to come back tomorrow.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            {prompt}
          </p>

          <Link
            href="/search?q="
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-ink transition hover:-translate-y-0.5"
          >
            Find a book
            <BookOpen size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="ritual-stat">
            <Flame size={18} className="text-accent" />
            <strong>Daily</strong>
            <span>reading prompt</span>
          </div>

          <div className="ritual-stat">
            <Library size={18} className="text-accent" />
            <strong>{savedCount}</strong>
            <span>saved titles</span>
          </div>

          <div className="ritual-stat">
            <Target size={18} className="text-accent" />
            <strong>10</strong>
            <span>pages challenge</span>
          </div>

          <div className="ritual-stat">
            <Sparkles size={18} className="text-accent" />
            <strong>∞</strong>
            <span>stories to discover</span>
          </div>
        </div>
      </div>
    </section>
  );
}