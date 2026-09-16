import SmartImage from '@/components/SmartImage';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Headphones, Info, Play, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';
import { olFetch, coverUrl } from '@/lib/openlibrary';
import ReadingListButton from '@/components/ReadingListButton';
import BookRow from '@/components/BookRow';

export const revalidate=3600;

function desc(w){if(!w?.description)return 'No description is available for this edition yet.';return typeof w.description==='string'?w.description:w.description.value||'No description is available for this edition yet.'}

export async function generateMetadata({params}){
 const {id}=await params;
 try{const w=await olFetch(`/works/${id}.json`);return{title:`${w.title} — ReaderExpo`,description:desc(w).slice(0,155)}}catch{return{title:'ReaderExpo'}}
}

export default async function BookDetail({params}){
 const {id}=await params;
 let work;
 try{work=await olFetch(`/works/${id}.json`)}catch{notFound()}
 let authors=[];
 try{
  const keys=(work.authors||[]).map(a=>a.author?.key).filter(Boolean).slice(0,3);
  authors=(await Promise.all(keys.map(k=>olFetch(`${k}.json`).catch(()=>null)))).filter(Boolean).map(a=>a.name);
 }catch{}
 let related=[];
 try{
  const s=work.subjects?.[0];
  if(s){const slug=s.toLowerCase().replace(/[^a-z0-9]+/g,'_');const d=await olFetch(`/subjects/${slug}.json`,{limit:10});related=(d.works||[]).filter(w=>w.key!==`/works/${id}`).map(w=>({key:w.key,title:w.title,cover_i:w.cover_id,author_name:w.authors?.map(a=>a.name)||[]}))}
 }catch{}
 const cover=coverUrl(work.covers?.[0],'L');
 const access=work.ebooks?.[0]||work.ebook_access;
 const readUrl=access?.read_url||access?.preview_url||access?.borrow_url;
 return <div className="pb-16">
  <section className="relative overflow-hidden border-b border-white/[.07]">
   <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(215,176,106,.12),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(79,93,126,.10),transparent_32%)]"/>
   <div className="relative mx-auto max-w-[1440px] px-5 py-10 md:px-8 md:py-16">
    <Link href="/" className="mb-10 inline-flex items-center gap-2 text-xs text-muted hover:text-paper"><ArrowLeft size={14}/> Back to discovery</Link>
    <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
      <div className="mx-auto w-full max-w-[280px]">{cover?<SmartImage src={cover} alt={work.title} width={560} height={840} className="book-shadow w-full rounded-2xl border border-white/10"/>:<div className="aspect-[2/3] rounded-2xl border border-white/10 bg-panel grid place-items-center p-6 text-center font-display text-2xl">{work.title}</div>}</div>
      <div className="self-center">
       <p className="eyebrow mb-4">Book dossier</p>
       <h1 className="max-w-5xl font-display text-[clamp(3rem,6vw,6.4rem)] leading-[.9] tracking-[-.05em]">{work.title}</h1>
       {authors.length>0&&<p className="mt-5 text-base text-accent">by {authors.join(', ')}</p>}
       <p className="mt-7 max-w-3xl whitespace-pre-line text-sm leading-7 text-muted md:text-base">{desc(work)}</p>
       <div className="mt-8 flex flex-wrap gap-3">
        {readUrl?<a href={readUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-xs font-bold text-ink"><Play size={14} fill="currentColor"/> Read / borrow online <ExternalLink size={13}/></a>:<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-5 py-3 text-xs text-muted"><Info size={14}/> No online reader is advertised for this title</span>}
        <ReadingListButton book={{id,title:work.title,author:authors[0],cover_i:work.covers?.[0]}}/>
       </div>
       <div className="mt-8 flex flex-wrap gap-2">{(work.subjects||[]).slice(0,10).map(s=><span key={s} className="rounded-full border border-white/10 bg-white/[.025] px-3 py-1.5 text-[10px] uppercase tracking-[.1em] text-muted">{s}</span>)}</div>
      </div>
    </div>
   </div>
  </section>
  <div className="mx-auto max-w-[1440px]"><BookRow title="Readers also explored" eyebrow="Keep the story going" books={related}/></div>
 </div>
}
