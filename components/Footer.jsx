'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Heart,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';

/* =========================================================
   CONTACT
========================================================= */

const EMAIL = 'alihassanofficial@gmail.com';
const WHATSAPP_NUMBER = '923423016198';

const WHATSAPP_MESSAGE =
  "Hi ReaderExpo, I'd like to order a physical book.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

/* =========================================================
   WHATSAPP SVG
========================================================= */

function WhatsAppIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.51 0 .16 5.35.16 11.92c0 2.1.55 4.15 1.6 5.96L.06 24l6.26-1.64a11.9 11.9 0 0 0 5.75 1.46h.01c6.56 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.48-8.42Z"
        fill="currentColor"
      />

      <path
        d="M17.49 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
        fill="white"
      />
    </svg>
  );
}

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080808] text-paper">
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-accent/5 blur-[120px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[380px] w-[380px] rounded-full bg-white/[0.025] blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1520px] px-5 py-14 sm:px-7 md:px-10 lg:py-20">
        {/* ===================================================
            TOP BRAND AREA
        =================================================== */}

        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="ReaderExpo home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] transition duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                <BookOpen
                  size={19}
                  strokeWidth={1.7}
                  className="text-accent"
                />
              </span>

              <span className="font-display text-2xl tracking-[-0.04em]">
                ReaderExpo
              </span>
            </Link>

            <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-[15px]">
              Discover books, authors, classics and stories from across the
              world — all in one quiet place built for curious readers.
            </p>

            {/* Contact details */}
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex w-fit items-center gap-3 text-sm text-muted transition hover:text-paper"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] transition group-hover:border-accent/30 group-hover:text-accent">
                  <Mail size={14} />
                </span>

                <span>{EMAIL}</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-3 text-sm text-muted transition hover:text-paper"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] transition group-hover:border-[#25D366]/40 group-hover:text-[#25D366]">
                  <WhatsAppIcon size={16} />
                </span>

                <span>+92 342 3016198</span>
              </a>

              <div className="inline-flex w-fit items-center gap-3 text-sm text-muted">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                  <MapPin size={14} className="text-accent" />
                </span>

                <span>Islamabad, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Explore */}
            <div>
              <p className="eyebrow text-accent">Explore</p>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/"
                  className="w-fit text-sm text-muted transition hover:translate-x-1 hover:text-paper"
                >
                  Home
                </Link>

                <Link
                  href="/search"
                  className="w-fit text-sm text-muted transition hover:translate-x-1 hover:text-paper"
                >
                  Discover
                </Link>

                <Link
                  href="/search?q="
                  className="w-fit text-sm text-muted transition hover:translate-x-1 hover:text-paper"
                >
                  Search Books
                </Link>

                <Link
                  href="/library"
                  className="w-fit text-sm text-muted transition hover:translate-x-1 hover:text-paper"
                >
                  My Library
                </Link>
              </div>
            </div>

            {/* Collections */}
            <div>
              <p className="eyebrow text-accent">Collections</p>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/search?q=fiction"
                  className="w-fit text-sm text-muted transition hover:translate-x-1 hover:text-paper"
                >
                  Fiction
                </Link>

                <Link
                  href="/search?q=classics"
                  className="w-fit text-sm text-muted transition hover:translate-x-1 hover:text-paper"
                >
                  Classics
                </Link>

                <Link
                  href="/search?q=romance"
                  className="w-fit text-sm text-muted transition hover:translate-x-1 hover:text-paper"
                >
                  Romance
                </Link>

                <Link
                  href="/search?q=mystery"
                  className="w-fit text-sm text-muted transition hover:translate-x-1 hover:text-paper"
                >
                  Mystery
                </Link>
              </div>
            </div>

            {/* Sources */}
            <div>
              <p className="eyebrow text-accent">Sources</p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="https://openlibrary.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition hover:text-paper"
                >
                  Open Library
                  <ArrowUpRight
                    size={12}
                    className="opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href="https://www.gutenberg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition hover:text-paper"
                >
                  Project Gutenberg
                  <ArrowUpRight
                    size={12}
                    className="opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href="https://books.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition hover:text-paper"
                >
                  Google Books
                  <ArrowUpRight
                    size={12}
                    className="opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href="https://archive.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition hover:text-paper"
                >
                  Internet Archive
                  <ArrowUpRight
                    size={12}
                    className="opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            PHYSICAL BOOK ORDER CARD
        =================================================== */}

        <div className="relative mt-14 overflow-hidden rounded-[30px] border border-accent/20 bg-[radial-gradient(circle_at_10%_0%,rgba(215,176,106,.16),transparent_35%),linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.015))]">
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-[80px]"
          />

          <div className="relative grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-9">
            {/* Copy */}
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                <Sparkles size={13} />
                Physical Book Orders
              </div>

              <h2 className="mt-3 max-w-2xl font-display text-2xl leading-[1] tracking-[-0.025em] sm:text-3xl">
                Want a physical copy?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Selected books can be ordered for delivery anywhere in
                Pakistan. Standard nationwide delivery is{' '}
                <span className="font-semibold text-paper">Rs. 300</span>.
              </p>

              <p className="mt-2 text-xs leading-6 text-muted/80">
                Contact us to check availability, price and order details.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order a physical book on WhatsApp"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_12px_35px_rgba(37,211,102,.12)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <WhatsAppIcon size={17} />
                WhatsApp to Order
                <ArrowUpRight size={14} />
              </a>

              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  'Physical Book Order'
                )}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-paper transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.07]"
              >
                <Mail size={15} />
                Email Us
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM DIVIDER
        =================================================== */}

        <div className="my-9 h-px bg-white/10 sm:my-10" />

        {/* ===================================================
            BOTTOM BAR
        =================================================== */}

        <div className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} ReaderExpo. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              Made for readers
              <Heart size={12} className="text-accent" />
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

            <span>Islamabad, Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}