'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  BookOpen,
  Search as SearchIcon,
  ArrowUpRight,
  Archive,
  Globe2,
} from 'lucide-react';
import { coverUrl, bareId } from '@/lib/openlibrary';
import SmartImage from '@/components/SmartImage';
import GoogleBookCard from '@/components/GoogleBookCard';

function Results() {
  const params = useSearchParams();
  const router = useRouter();

  const initialQuery = params.get('q') || '';

  const [q, setQ] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [free, setFree] = useState([]);
  const [google, setGoogle] = useState([]);
  const [archive, setArchive] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(async (term) => {
    const searchTerm = term.trim();

    if (!searchTerm) {
      setResults([]);
      setFree([]);
      setGoogle([]);
      setArchive([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [openLibraryResponse, exploreResponse] = await Promise.all([
        fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`),
        fetch(`/api/explore?q=${encodeURIComponent(searchTerm)}`),
      ]);

      if (!openLibraryResponse.ok || !exploreResponse.ok) {
        throw new Error('Search request failed');
      }

      const [openLibraryData, exploreData] = await Promise.all([
        openLibraryResponse.json(),
        exploreResponse.json(),
      ]);

      setResults(
        Array.isArray(openLibraryData.openLibrary)
          ? openLibraryData.openLibrary
          : []
      );

      setFree(
        Array.isArray(openLibraryData.gutenberg)
          ? openLibraryData.gutenberg
          : []
      );

      setGoogle(
        Array.isArray(exploreData.googleBooks)
          ? exploreData.googleBooks
          : []
      );

      setArchive(
        Array.isArray(exploreData.archive)
          ? exploreData.archive
          : []
      );
    } catch {
      setResults([]);
      setFree([]);
      setGoogle([]);
      setArchive([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const searchTerm = initialQuery.trim();

    if (!searchTerm) {
      return;
    }

    let cancelled = false;

    async function loadInitialResults() {
      setLoading(true);

      try {
        const [openLibraryResponse, exploreResponse] = await Promise.all([
          fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`),
          fetch(`/api/explore?q=${encodeURIComponent(searchTerm)}`),
        ]);

        if (!openLibraryResponse.ok || !exploreResponse.ok) {
          throw new Error('Search request failed');
        }

        const [openLibraryData, exploreData] = await Promise.all([
          openLibraryResponse.json(),
          exploreResponse.json(),
        ]);

        if (cancelled) {
          return;
        }

        setResults(
          Array.isArray(openLibraryData.openLibrary)
            ? openLibraryData.openLibrary
            : []
        );

        setFree(
          Array.isArray(openLibraryData.gutenberg)
            ? openLibraryData.gutenberg
            : []
        );

        setGoogle(
          Array.isArray(exploreData.googleBooks)
            ? exploreData.googleBooks
            : []
        );

        setArchive(
          Array.isArray(exploreData.archive)
            ? exploreData.archive
            : []
        );
      } catch {
        if (cancelled) {
          return;
        }

        setResults([]);
        setFree([]);
        setGoogle([]);
        setArchive([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInitialResults();

    return () => {
      cancelled = true;
    };
  }, [initialQuery]);

  function submit(event) {
    event.preventDefault();

    const searchTerm = q.trim();

    if (!searchTerm) {
      router.replace('/search');
      setResults([]);
      setFree([]);
      setGoogle([]);
      setArchive([]);
      setLoading(false);
      return;
    }

    router.replace(`/search?q=${encodeURIComponent(searchTerm)}`);
    fetchResults(searchTerm);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
      <div className="max-w-4xl">
        <p className="eyebrow text-accent">The universal shelf</p>

        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-7xl">
          Find your next <em>obsession.</em>
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
          One search across Open Library, public-domain books, Google Books
          and Internet Archive — so a missing cover or unavailable edition
          never has to end the hunt.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="mt-9 flex max-w-5xl gap-2 rounded-[22px] border border-white/10 bg-white/[.035] p-2 shadow-2xl"
      >
        <SearchIcon
          className="ml-3 self-center text-muted"
          size={18}
        />

        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Title, author, language, idea…"
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted"
        />

        <button
          type="submit"
          className="rounded-[15px] bg-paper px-6 py-3 text-xs font-bold text-ink transition hover:-translate-y-0.5"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {Array.from({ length: 18 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[2/3] animate-pulse rounded-[22px] bg-white/[.04]"
            />
          ))}
        </div>
      ) : q ? (
        <div className="mt-14">
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="eyebrow">Open Library</p>
                <h2 className="font-display text-3xl">
                  Catalog matches
                </h2>
              </div>

              <span className="text-xs text-muted">
                {results.length} shown
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {results.map((book, index) => (
                <a
                  key={book.key || index}
                  href={`/book/${bareId(book.key)}`}
                  className="book-card group rounded-[22px] border border-white/[.07] bg-white/[.025] p-2.5"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-[17px] bg-panel">
                    {book.cover_i ? (
                      <SmartImage
                        src={coverUrl(book.cover_i, 'M')}
                        alt={book.title}
                        fill
                        sizes="190px"
                        className="object-cover transition group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid size-full place-items-center p-4 text-center font-display text-lg text-muted">
                        {book.title}
                      </div>
                    )}
                  </div>

                  <p className="mt-3 line-clamp-2 font-display text-lg leading-5">
                    {book.title}
                  </p>

                  <p className="mt-1 line-clamp-1 text-[10px] uppercase tracking-wider text-muted">
                    {book.author_name?.[0]}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <section className="mt-20 border-t border-white/[.07] pt-10">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="eyebrow text-accent">Google Books</p>
                <h2 className="font-display text-3xl">
                  More editions & previews
                </h2>
              </div>

              <Globe2
                size={18}
                className="text-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {google.map((book) => (
                <GoogleBookCard
                  key={book.id}
                  book={book}
                />
              ))}
            </div>
          </section>

          <section className="mt-20 border-t border-white/[.07] pt-10">
            <div className="mb-5">
              <p className="eyebrow text-accent">Free & legal</p>
              <h2 className="font-display text-3xl">
                Gutenberg matches
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {free.map((book) => (
                <a
                  key={book.id}
                  href={`/read/gutenberg/${book.id}`}
                  className="book-card group rounded-[22px] border border-white/[.07] bg-white/[.025] p-2.5"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-[17px] bg-panel">
                    {book.formats?.['image/jpeg'] ? (
                      <SmartImage
                        src={book.formats['image/jpeg']}
                        alt={book.title}
                        fill
                        sizes="190px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid size-full place-items-center p-4 text-center font-display text-lg text-muted">
                        {book.title}
                      </div>
                    )}
                  </div>

                  <p className="mt-3 line-clamp-2 font-display text-lg leading-5">
                    {book.title}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-wider text-accent">
                    Read online ↗
                  </p>
                </a>
              ))}
            </div>
          </section>

          <section className="mt-20 border-t border-white/[.07] pt-10">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="eyebrow text-accent">Internet Archive</p>
                <h2 className="font-display text-3xl">
                  The deep shelf
                </h2>
              </div>

              <Archive
                size={18}
                className="text-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {archive.map((book) => (
                <a
                  key={book.id}
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                  className="book-card group rounded-[22px] border border-white/[.07] bg-white/[.025] p-2.5"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-[17px] bg-panel">
                    {book.cover ? (
                      <SmartImage
                        src={book.cover}
                        alt={book.title}
                        fill
                        sizes="190px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid size-full place-items-center p-4 text-center font-display text-lg text-muted">
                        {book.title}
                      </div>
                    )}
                  </div>

                  <p className="mt-3 line-clamp-2 font-display text-lg leading-5">
                    {book.title}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-accent">
                    Archive
                    <ArrowUpRight size={10} />
                  </p>
                </a>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-20 grid place-items-center rounded-[30px] border border-dashed border-white/10 bg-white/[.015] py-28 text-center">
          <BookOpen
            size={28}
            className="text-accent"
          />

          <p className="mt-4 font-display text-2xl">
            Start with a title, author or idea.
          </p>

          <p className="mt-2 text-sm text-muted">
            Try “classic novels”, “philosophy”, or your favorite author.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-muted">
          Loading search…
        </div>
      }
    >
      <Results />
    </Suspense>
  );
}