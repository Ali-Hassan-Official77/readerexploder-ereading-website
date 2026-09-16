const GUTENDEX = 'https://gutendex.com/books/';
const MANGADEX = 'https://api.mangadex.org';
const GOOGLE_BOOKS = process.env.GOOGLE_BOOKS_BASE_URL || 'https://www.googleapis.com/books/v1';
const INTERNET_ARCHIVE = process.env.INTERNET_ARCHIVE_BASE_URL || 'https://archive.org';

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: { Accept: 'application/json', ...(options.headers || {}) },
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function gutenbergSearch(query = '', page = 1) {
  const url = new URL(GUTENDEX);
  if (query) url.searchParams.set('search', query);
  url.searchParams.set('page', page);
  return fetchJson(url, { next: { revalidate: 3600 } });
}

export async function gutenbergBook(id) {
  return fetchJson(`${GUTENDEX}${id}`, { next: { revalidate: 3600 } });
}

export async function googleBooksSearch(query, limit = 18) {
  if (!query?.trim()) return { items: [] };
  const url = new URL(`${GOOGLE_BOOKS}/volumes`);
  url.searchParams.set('q', query.trim());
  url.searchParams.set('maxResults', String(Math.min(limit, 40)));
  url.searchParams.set('printType', 'books');
  url.searchParams.set('orderBy', 'relevance');
  return fetchJson(url, { next: { revalidate: 3600 } });
}

export async function internetArchiveBooks(query = 'mediatype:texts AND collection:opensource') {
  const url = new URL(`${INTERNET_ARCHIVE}/advancedsearch.php`);
  url.searchParams.set('q', query);
  url.searchParams.set('fl[]', 'identifier,title,creator,description,year');
  url.searchParams.set('rows', '18');
  url.searchParams.set('page', '1');
  url.searchParams.set('output', 'json');
  return fetchJson(url, { next: { revalidate: 3600 } });
}

export function gutenbergReadUrl(book) {
  return book?.formats?.['text/html'] || book?.formats?.['text/html; charset=utf-8'] || null;
}

export function mangaSearch(query, limit = 12) {
  const url = new URL(`${MANGADEX}/manga`);
  url.searchParams.set('title', query);
  url.searchParams.set('limit', String(limit));
  url.searchParams.append('includes[]', 'cover_art');
  return fetchJson(url, { next: { revalidate: 1800 } });
}

export function mangaCoverUrl(item) {
  const rel = item?.relationships?.find(r => r.type === 'cover_art');
  if (!rel?.attributes?.fileName) return null;
  return `https://uploads.mangadex.org/covers/${item.id}/${rel.attributes.fileName}`;
}
