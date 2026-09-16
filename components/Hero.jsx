'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, BookOpen, ChevronRight, LibraryBig, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { coverUrl, bareId } from '@/lib/openlibrary';
import ReadingListButton from './ReadingListButton';
import SmartImage from './SmartImage';

export default function Hero({ books = [] }) {
  const slides = books.slice(0, 5);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setActive(i => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  if (!slides.length) return null;
  const book = slides[active];
  const id = bareId(book.key);

  return (
    <section className="relative overflow-hidden border-b border-white/[.06]">
      <div className="site-grid pointer-events-none absolute inset-0 opacity-80" />
      <div className="absolute -left-40 top-10 size-[500px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute right-[-12%] top-[-15%] size-[650px] rounded-full bg-[#6e7898]/10 blur-[150px]" />
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.04fr_.96fr] md:px-8 md:pb-24 md:pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={book.key} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .65, ease: [.16, 1, .3, 1] }}>
            <div className="eyebrow mb-5 flex items-center gap-2"><span className="size-1.5 rounded-full bg-accent shadow-[0_0_18px_#d7b06a]" /> Curated for curious minds</div>
            <h1 className="max-w-4xl font-display text-[clamp(3.5rem,7.5vw,7.9rem)] font-medium leading-[.82] tracking-[-.06em] text-paper">
              Stories that <em className="text-accent">stay</em> with you.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted md:text-lg">
              Discover remarkable books, revisit timeless classics, build your private shelf, and find legitimate places to read.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/book/${id}`} className="shine focus-ring group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-xs font-bold text-ink shadow-[0_14px_40px_rgba(0,0,0,.28)]">
                Open spotlight <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <ReadingListButton book={{ id, title: book.title, author: book.author_name?.[0], cover_i: book.cover_i }} />
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 border-t border-white/10 pt-6 text-xs text-muted sm:grid-cols-3">
              <span className="flex items-center gap-2"><BookOpen size={15} className="text-accent" /> Huge catalog</span>
              <span className="flex items-center gap-2"><LibraryBig size={15} className="text-accent" /> Personal shelf</span>
              <span className="flex items-center gap-2"><Sparkles size={15} className="text-accent" /> Free classics</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative mx-auto h-[440px] w-full max-w-[520px] md:h-[590px]">
          <div className="absolute left-1/2 top-1/2 h-[74%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[48px] border border-accent/20 bg-accent/[.04] shadow-[0_0_100px_rgba(215,176,106,.09)]" />
          {slides.map((b, i) => {
            const offset = (i - active + slides.length) % slides.length;
            const pos = offset === 0 ? 0 : offset === 1 ? 1 : offset === slides.length - 1 ? -1 : 2;
            return (
              <motion.div key={b.key} animate={{ x: `${pos * 24}%`, y: pos === 0 ? 0 : pos === 1 ? 28 : -28, rotate: pos * 6, scale: pos === 0 ? 1 : .82, opacity: pos === 0 ? 1 : pos === 1 || pos === -1 ? .5 : 0, zIndex: pos === 0 ? 30 : 20 - Math.abs(pos) }} transition={{ duration: .75, ease: [.16, 1, .3, 1] }} className="absolute left-1/2 top-1/2 aspect-[2/3] w-[52%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative size-full overflow-hidden rounded-[22px] border border-white/15 bg-panel book-shadow">
                  {b.cover_i ? <SmartImage src={coverUrl(b.cover_i, 'L')} alt={b.title} fill sizes="300px" className="object-cover" priority={pos === 0} /> : <div className="grid size-full place-items-center p-6 text-center font-display text-2xl">{b.title}</div>}
                  {pos === 0 && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 pt-28"><p className="font-display text-2xl">{b.title}</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-white/60">{b.author_name?.[0] || 'Unknown author'}</p></div>}
                </div>
              </motion.div>
            );
          })}
          <div className="absolute bottom-1 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xl">
            {slides.map((s, i) => <button key={s.key} onClick={() => setActive(i)} aria-label={`Show ${s.title}`} className={`h-1 rounded-full transition-all ${i === active ? 'w-8 bg-accent' : 'w-2 bg-white/25'}`} />)}
            <ChevronRight size={13} className="ml-1 text-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
