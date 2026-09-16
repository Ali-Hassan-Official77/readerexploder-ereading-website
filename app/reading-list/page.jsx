'use client';

import Link from 'next/link';
import { Bookmark, Check, Trash2 } from 'lucide-react';
import { useReadingList } from '@/lib/useReadingList';
import { coverUrl } from '@/lib/openlibrary';
import SmartImage from '@/components/SmartImage';

export default function ReadingListPage() {
  const { list, toggle } = useReadingList();

  return (
    <div className="mx-auto min-h-[65vh] max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <div className="max-w-3xl">
        <p className="eyebrow text-accent">Your private shelf</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">Books worth keeping close.</h1>
        <p className="mt-5 text-sm leading-7 text-muted">Saved locally in this browser. No account required, no noisy social layer — just your next reads.</p>
      </div>

      {list.length === 0 ? (
        <div className="mt-12 grid place-items-center rounded-[30px] border border-dashed border-white/10 bg-white/[.015] px-6 py-24 text-center">
          <div className="grid size-14 place-items-center rounded-2xl border border-accent/20 bg-accent/[.07] text-accent"><Bookmark size={23}/></div>
          <p className="mt-5 font-display text-3xl">Your shelf is waiting.</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">Save a title from any book card and it will appear here instantly.</p>
          <Link href="/" className="mt-7 rounded-full bg-paper px-5 py-3 text-xs font-bold text-ink transition hover:-translate-y-0.5">Browse books</Link>
        </div>
      ) : (
        <div className="mt-12 space-y-3">
          {list.map((b) => (
            <div key={b.id} className="group flex items-center gap-4 rounded-[22px] border border-white/[.07] bg-white/[.025] p-3 transition hover:border-accent/25 hover:bg-white/[.04]">
              <div className="relative h-28 w-[74px] shrink-0 overflow-hidden rounded-[14px] bg-panel-2">
                {b.cover_i ? <SmartImage src={coverUrl(b.cover_i, 'M')} alt={b.title} fill className="object-cover"/> : <div className="grid size-full place-items-center p-2 text-center font-display text-sm text-muted">{b.title}</div>}
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/book/${b.id}`} className="font-display text-2xl leading-none text-paper hover:text-accent">{b.title}</Link>
                {b.author && <p className="mt-2 text-sm text-muted">{b.author}</p>}
                <p className="mt-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[.15em] text-accent"><Check size={11}/> Saved to your shelf</p>
              </div>
              <button onClick={() => toggle(b)} className="rounded-full border border-white/10 p-2.5 text-muted transition hover:border-red-300/30 hover:text-red-200" aria-label={`Remove ${b.title}`}><Trash2 size={15}/></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
