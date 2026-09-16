'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BookOpen,
  Compass,
  LibraryBig,
  Menu,
  Search,
  Sparkles,
  X,
  PenLine,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { href: '/', label: 'Discover', icon: Compass },
  { href: '/subject/fiction', label: 'Genres', icon: BookOpen },
  { href: '/search?q=', label: 'Explore', icon: Search },
  { href: '/reading-list', label: 'My Shelf', icon: LibraryBig },
  { href: '/manga', label: 'Manga', icon: PenLine },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function submit(event) {
    event.preventDefault();

    const searchTerm = q.trim();

    if (!searchTerm) {
      return;
    }

    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  }

  function handleNavigation() {
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'px-3 pt-3' : ''
      }`}
    >
      <div
        className={`mx-auto max-w-[1440px] transition-all duration-500 ${
          scrolled
            ? 'glass rounded-2xl'
            : 'border-b border-white/[.06] bg-ink/80'
        } backdrop-blur-xl`}
      >
        <div className="flex h-[78px] items-center gap-4 px-5 md:px-8">
          <Link
            href="/"
            onClick={handleNavigation}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="relative grid size-11 place-items-center overflow-hidden rounded-2xl border border-accent/25 bg-accent/[.06] shadow-[0_10px_35px_rgba(0,0,0,.25)] transition group-hover:-rotate-2">
              <Image
                src="/logo.svg"
                alt="ReaderExpo"
                width={40}
                height={40}
                priority
                className="size-10"
              />
            </span>

            <span className="font-display text-[28px] tracking-[-.035em] text-paper">
              Reader<span className="italic text-accent">Expo</span>
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(href.split('?')[0]);

              return (
                <Link
                  key={label}
                  href={href}
                  className={`focus-ring flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold transition ${
                    active
                      ? 'bg-white/[.08] text-paper'
                      : 'text-muted hover:bg-white/[.05] hover:text-paper'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <form
            onSubmit={submit}
            className="ml-auto hidden w-[min(360px,29vw)] md:block"
          >
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                size={16}
              />

              <input
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Search books, authors, ideas…"
                className="focus-ring w-full rounded-full border border-white/10 bg-white/[.045] py-2.5 pl-11 pr-4 text-xs text-paper outline-none placeholder:text-muted transition focus:border-accent/50 focus:bg-white/[.06]"
              />
            </div>
          </form>

          <Link
            href="/reading-list"
            onClick={handleNavigation}
            className="hidden items-center gap-2 rounded-full border border-accent/25 bg-accent/[.08] px-4 py-2.5 text-xs font-semibold text-accent transition hover:-translate-y-0.5 hover:bg-accent/[.14] focus-ring sm:flex"
          >
            <Sparkles size={14} />
            My Shelf
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="ml-auto rounded-full border border-white/10 p-2.5 text-paper lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/[.07] px-5 py-5 lg:hidden">
            <form
              onSubmit={submit}
              className="mb-4 flex gap-2"
            >
              <input
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Search…"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[.05] px-4 py-3 text-sm outline-none"
              />

              <button
                type="submit"
                className="rounded-xl bg-paper px-4 text-xs font-bold text-ink"
              >
                Go
              </button>
            </form>

            <nav className="grid gap-1">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={handleNavigation}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted hover:bg-white/[.05] hover:text-paper"
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}