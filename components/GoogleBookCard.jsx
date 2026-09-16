import SmartImage from './SmartImage';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export default function GoogleBookCard({ book }) {
  return (
    <a href={book.preview || book.infoLink || '#'} target="_blank" rel="noreferrer" className="book-card focus-ring group block rounded-[22px] border border-white/[.08] bg-white/[.035] p-2.5">
      <div className="shine relative aspect-[2/3] overflow-hidden rounded-[17px] bg-panel-2">
        {book.cover ? <SmartImage src={book.cover} alt={book.title} fill sizes="220px" className="object-cover transition duration-700 group-hover:scale-[1.05]" /> : <div className="grid size-full place-items-center p-5 text-center font-display text-xl text-muted">{book.title}</div>}
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-white/75 backdrop-blur">Explore</span>
        <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-paper text-ink opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={15}/></span>
      </div>
      <div className="px-1 pb-1 pt-3">
        <p className="line-clamp-2 font-display text-lg leading-5">{book.title}</p>
        <p className="mt-1 line-clamp-1 text-[10px] uppercase tracking-[.12em] text-muted">{book.authors?.[0] || 'Google Books'}</p>
      </div>
    </a>
  );
}
