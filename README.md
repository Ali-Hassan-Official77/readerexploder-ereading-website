# ReaderExpo

ReaderExpo is a premium reading-discovery experience built with Next.js, Open Library, Project Gutenberg, Google Books and Internet Archive.

## Environment

Copy `.env.example` to `.env.local`:

```dotenv
OPEN_LIBRARY_BASE_URL=https://openlibrary.org
GOOGLE_BOOKS_BASE_URL=https://www.googleapis.com/books/v1
INTERNET_ARCHIVE_BASE_URL=https://archive.org
```

All three are public endpoints; no API key is required for the current integrations.

## Run locally

```powershell
npm install
npm run dev
```

## Production

```powershell
npm run build
npm start
```

### Vercel

Add the variables from `.env.example` under **Project Settings → Environment Variables** if you want to override the defaults.

The project deliberately uses a resilient native image component for external book covers. This avoids relying on Next Image optimization for third-party cover hosts, while providing a local ReaderExpo fallback when an upstream cover is unavailable.

## Sources

- Open Library — catalog and covers
- Project Gutenberg / Gutendex — public-domain reading
- Google Books — additional editions, metadata and previews
- Internet Archive — deep-search discovery
- MangaDex — manga/manhwa metadata
