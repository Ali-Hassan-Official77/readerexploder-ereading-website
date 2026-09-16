import Link from 'next/link';
import { ArrowUpRight, BookOpenText } from 'lucide-react';
import SmartImage from './SmartImage';

export default function SourceCard({ book }) {
  const id = book.id || book.gutenbergId;
  const cover = book.cover;

  return (
    <Link href={`/read/gutenberg/${id}`} className="book-card focus-ring group block w-[172px] shrink-0 rounded-[22px] border border-white/[.08] bg-white/[.035] p-2.5 sm:w-[195px]">
      <div className="shine relative aspect-[2/3] overflow-hidden rounded-[17px] bg-panel-2">
        {cover ? (
          <SmartImage src={cover} alt={book.title} fill sizes="195px" className="object-cover transition duration-700 group-hover:scale-[1.045]" />
        ) : (
          <div className="grid size-full place-items-center p-5 text-center font-display text-xl text-muted">{book.title}</div>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-accent/25 bg-black/45 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-accent backdrop-blur-md">Free</span>
        <div className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-xl transition group-hover:opacity-100"><BookOpenText size={16} /></div>
      </div>
      <div className="px-1 pb-1 pt-3">
        <p className="line-clamp-2 font-display text-[19px] leading-5">{book.title}</p>
        <p className="mt-1 line-clamp-1 text-[10px] uppercase tracking-[.12em] text-muted">{book.authors?.[0]?.name || 'Project Gutenberg'}</p>
      </div>
    </Link>
  );
}
