import { NextResponse } from 'next/server';
import { googleBooksSearch, internetArchiveBooks } from '@/lib/sources';

export async function GET(request) {
  const q = new URL(request.url).searchParams.get('q')?.trim();
  if (!q) return NextResponse.json({ googleBooks: [], archive: [] });

  const [google, archiveData] = await Promise.all([
    googleBooksSearch(q, 18).catch(() => ({ items: [] })),
    internetArchiveBooks(`mediatype:texts AND (title:(${q}) OR creator:(${q}))`).catch(() => ({ response: { docs: [] } })),
  ]);

  const googleBooks = (google.items || []).map(item => {
    const info = item.volumeInfo || {};
    const image = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;
    return {
      id: item.id,
      title: info.title || 'Untitled',
      authors: info.authors || [],
      description: info.description || '',
      published: info.publishedDate || '',
      categories: info.categories || [],
      cover: image ? image.replace('http://', 'https://') : null,
      preview: info.previewLink || null,
      infoLink: info.infoLink || null,
    };
  });

  const archive = (archiveData?.response?.docs || []).map(item => ({
    id: item.identifier,
    title: item.title || 'Untitled',
    creator: Array.isArray(item.creator) ? item.creator[0] : item.creator || 'Internet Archive',
    year: item.year || '',
    description: item.description || '',
    cover: item.identifier ? `https://archive.org/services/img/${item.identifier}` : null,
    url: item.identifier ? `https://archive.org/details/${item.identifier}` : null,
  }));

  return NextResponse.json(
    { googleBooks, archive },
    { headers: { 'Cache-Control': 's-maxage=1800, stale-while-revalidate=86400' } }
  );
}
