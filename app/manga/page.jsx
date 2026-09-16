'use client';

import SmartImage from '@/components/SmartImage';
import { Search, ExternalLink, BookOpenText } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MangaPage() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadManga() {
      try {
        const response = await fetch('/api/manga?q=one%20piece');

        if (!response.ok) {
          throw new Error('Failed to fetch manga');
        }

        const data = await response.json();

        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) {
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadManga();

    return () => {
      cancelled = true;
    };
  }, []);

  async function run(term = 'one piece') {
    const searchTerm = term.trim() || 'one piece';

    setLoading(true);

    try {
      const response = await fetch(
        `/api/manga?q=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch manga');
      }

      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
      <div className="max-w-3xl">
        <p className="eyebrow text-accent">Manga / manhwa discovery</p>

        <h1 className="mt-3 font-display text-5xl md:text-7xl">
          Your next panel is waiting.
        </h1>

        <p className="mt-5 text-sm leading-6 text-muted">
          Discover manga and manhwa metadata through MangaDex. Reading
          availability remains subject to the source&apos;s licensing and
          region rules.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          run(q || 'one piece');
        }}
        className="mt-9 flex max-w-2xl gap-2 rounded-2xl border border-white/10 bg-white/[.035] p-2"
      >
        <Search
          className="ml-3 self-center text-muted"
          size={18}
        />

        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Search manga or manhwa…"
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none"
        />

        <button
          type="submit"
          className="rounded-xl bg-paper px-5 py-3 text-xs font-bold text-ink"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="mt-12 text-muted">Loading titles…</div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="book-card group rounded-2xl border border-white/[.07] bg-white/[.025] p-2"
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-panel">
                {item.cover ? (
                  <SmartImage
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="190px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid size-full place-items-center p-4 text-center font-display text-lg text-muted">
                    {item.title}
                  </div>
                )}

                <span className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-full bg-paper text-ink opacity-0 transition group-hover:opacity-100">
                  <BookOpenText size={16} />
                </span>
              </div>

              <p className="mt-3 line-clamp-2 font-display text-lg leading-5">
                {item.title}
              </p>

              <p className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-accent">
                Open source
                <ExternalLink size={10} />
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}