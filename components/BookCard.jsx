import Link from 'next/link';
import { ArrowUpRight, Bookmark, CalendarDays } from 'lucide-react';
import { coverUrl, bareId } from '@/lib/openlibrary';
import SmartImage from './SmartImage';

export default function BookCard({ book }) {
  const id = bareId(book.key);
  const cover = coverUrl(book.cover_i, 'M');
  const author = book.author_name?.[0];

  return (
    <Link
      href={`/book/${id}`}
      className="book-card focus-ring group block w-[172px] shrink-0 rounded-[22px] border border-white/[.08] bg-white/[.035] p-2.5 sm:w-[195px]"
    >
      <div className="shine relative aspect-[2/3] overflow-hidden rounded-[17px] bg-panel-2">
        {cover ? (
          <SmartImage
            src={cover}
            alt={book.title}
            fill
            sizes="195px"
            className="object-cover transition duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(215,176,106,.16),transparent_45%)] p-5 text-center font-display text-xl text-muted">
            {book.title}
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-white/75 backdrop-blur-md">
          {book.language?.[0] || 'Book'}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/25 to-transparent p-3 pt-14 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="grid size-8 place-items-center rounded-full bg-paper text-ink">
            <ArrowUpRight size={15} />
          </span>
          <span className="rounded-full border border-white/15 bg-black/40 p-2 text-white backdrop-blur">
            <Bookmark size={13} />
          </span>
        </div>
      </div>
      <div className="px-1 pb-1 pt-3">
        <p className="line-clamp-2 font-display text-[19px] leading-[1.05] text-paper">{book.title}</p>
        {author && <p className="mt-1.5 line-clamp-1 text-[10px] uppercase tracking-[.13em] text-muted">{author}</p>}
        {book.publish_year && (
          <p className="mt-2 flex items-center gap-1 text-[9px] text-muted/75">
            <CalendarDays size={11} /> {book.publish_year}
          </p>
        )}
      </div>
    </Link>
  );
}
