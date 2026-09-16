import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BookCard from './BookCard';

export default function BookRow({ title, books, viewAllHref, eyebrow = 'Curated shelf' }) {
  if (!books?.length) return null;
  return (
    <section className="py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4 px-5 md:px-8">
        <div>
          <div className="eyebrow mb-2">{eyebrow}</div>
          <h2 className="font-display text-3xl tracking-[-.025em] text-paper md:text-[2.65rem]">{title}</h2>
        </div>
        {viewAllHref && (
          <Link href={viewAllHref} className="group flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-muted hover:text-accent">
            View all <ArrowRight size={14} className="transition group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-5 md:gap-5 md:px-8">
        {books.map((b, i) => <BookCard key={b.key || i} book={b} />)}
      </div>
    </section>
  );
}
