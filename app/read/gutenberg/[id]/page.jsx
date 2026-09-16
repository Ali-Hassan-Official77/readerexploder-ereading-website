import Link from 'next/link';
import { ArrowLeft, ExternalLink, Languages } from 'lucide-react';
import { gutenbergBook, gutenbergReadUrl } from '@/lib/sources';

export const revalidate=3600;

export default async function GutenbergReader({params}){
 const {id}=await params;
 let book; try{book=await gutenbergBook(id)}catch{return <div className="mx-auto max-w-3xl px-5 py-20">Book unavailable.</div>}
 const readUrl=gutenbergReadUrl(book);
 const languages=(book.languages||[]).join(', ');
 return <div className="min-h-[90vh] bg-[#0a0b0e]">
  <div className="sticky top-0 z-40 border-b border-white/[.08] bg-[#0a0b0e]/85 backdrop-blur-xl">
   <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-8">
    <Link href="/search?q=" className="flex items-center gap-2 text-xs text-muted hover:text-paper"><ArrowLeft size={14}/> Back to search</Link>
    <div className="hidden text-center sm:block"><p className="font-display text-lg">{book.title}</p><p className="text-[9px] uppercase tracking-[.2em] text-muted">{book.authors?.[0]?.name}</p></div>
    <a href={readUrl||`https://www.gutenberg.org/ebooks/${id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold text-paper hover:border-accent/40">Source <ExternalLink size={12}/></a>
   </div>
  </div>
  <div className="mx-auto max-w-[1000px] px-4 py-8 md:px-8 md:py-12">
   <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow text-accent">Public-domain reader</p><h1 className="mt-1 font-display text-4xl md:text-5xl">{book.title}</h1></div><span className="flex items-center gap-2 text-xs text-muted"><Languages size={14}/>{languages||'English'}</span></div>
   {readUrl?<iframe title={book.title} src={readUrl} className="h-[78vh] w-full rounded-2xl border border-white/10 bg-white shadow-2xl" sandbox="allow-scripts allow-same-origin allow-popups allow-forms"/>:<div className="rounded-2xl border border-white/10 bg-white/[.03] p-10 text-center"><p className="font-display text-2xl">This title has no embeddable HTML reader.</p><a href={`https://www.gutenberg.org/ebooks/${id}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-paper px-5 py-3 text-xs font-bold text-ink">Open on Gutenberg</a></div>}
  </div>
 </div>
}
