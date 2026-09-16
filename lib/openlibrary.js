const BASE_URL = process.env.OPEN_LIBRARY_BASE_URL || 'https://openlibrary.org';
const COVERS_URL = 'https://covers.openlibrary.org/b';

export async function olFetch(path, params = {}, revalidate = 1800) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url, {
      next: { revalidate },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`Open Library ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

export function coverUrl(id, size = 'L') {
  return id ? `${COVERS_URL}/id/${id}-${size}.jpg` : null;
}

export function bareId(key = '') {
  return key.replace('/works/', '').replace('/books/', '');
}

export function normalizeWork(w) {
  return {
    key: w.key,
    title: w.title || 'Untitled',
    cover_i: w.cover_i ?? w.cover_id,
    author_name: w.author_name || w.authors?.map(a => a.name) || [],
    first_sentence: w.first_sentence,
    edition_key: w.cover_edition_key,
    ebook_access: w.ebook_access,
    language: w.language,
    publish_year: w.first_publish_year,
    edition_count: w.edition_count,
  };
}
