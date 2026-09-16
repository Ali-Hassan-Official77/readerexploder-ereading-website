import { olFetch, normalizeWork } from '@/lib/openlibrary';
import { gutenbergSearch } from '@/lib/sources';
import Hero from '@/components/Hero';
import BookRow from '@/components/BookRow';
import SourceCard from '@/components/SourceCard';
import ReaderRitual from '@/components/ReaderRitual';

export const revalidate = 1800;

async function subject(s) {
  try {
    const d = await olFetch(`/subjects/${s}.json`, { limit: 14 });
    return (d.works || []).map(w => normalizeWork({ key:w.key, title:w.title, cover_id:w.cover_id, authors:w.authors }));
  } catch { return []; }
}
async function trending() {
  try {
    const d = await olFetch('/trending/daily.json');
    return (d.works || d).map(normalizeWork);
  } catch { return []; }
}
async function freeBooks() {
  try {
    const d = await gutenbergSearch('', 1);
    return d.results || [];
  } catch { return []; }
}

export default async function HomePage() {
  const [trend, fiction, fantasy, mystery, romance, science, history, poetry, free] = await Promise.all([
    trending(), subject('fiction'), subject('fantasy'), subject('mystery'), subject('romance'),
    subject('science'), subject('history'), subject('poetry'), freeBooks()
  ]);

  return (
    <div className="pb-16">
      <Hero books={trend.length ? trend : fiction} />
      <div className="mx-auto max-w-[1440px]">
        <BookRow title="Trending right now" eyebrow="The shelf is moving" books={trend} viewAllHref="/search?q=" />
        <ReaderRitual />

        <section className="mx-5 my-10 overflow-hidden rounded-[30px] border border-accent/15 bg-[radial-gradient(circle_at_85%_20%,rgba(215,176,106,.12),transparent_35%),linear-gradient(135deg,rgba(215,176,106,.07),rgba(255,255,255,.02))] p-6 md:mx-8 md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-accent">Free & legal reading</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">Open a classic. Lose an afternoon.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Public-domain titles from Project Gutenberg, surfaced without making readers hunt for the source.</p>
            </div>
            <a href="https://www.gutenberg.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent">Project Gutenberg ↗</a>
          </div>
          <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-2">{free.slice(0,12).map(b => <SourceCard key={b.id} book={{...b,gutenbergId:b.id,cover:b.formats?.['image/jpeg']}} />)}</div>
        </section>

        <BookRow title="Fiction with a pulse" eyebrow="Stories & imagination" books={fiction} viewAllHref="/subject/fiction" />
        <BookRow title="Fantasy worlds" eyebrow="Escape the ordinary" books={fantasy} viewAllHref="/subject/fantasy" />
        <BookRow title="Mystery & thrillers" eyebrow="One more chapter" books={mystery} viewAllHref="/subject/mystery" />
        <BookRow title="Romance picks" eyebrow="For the soft-hearted" books={romance} viewAllHref="/subject/romance" />
        <BookRow title="Science & ideas" eyebrow="Make your mind wander" books={science} viewAllHref="/subject/science" />
        <BookRow title="History & memory" eyebrow="The stories behind us" books={history} viewAllHref="/subject/history" />
        <BookRow title="Poetry & language" eyebrow="A few words can change a day" books={poetry} viewAllHref="/subject/poetry" />
      </div>
    </div>
  );
}
