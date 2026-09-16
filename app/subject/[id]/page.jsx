import { olFetch, normalizeWork } from '@/lib/openlibrary';
import BookCard from '@/components/BookCard';

export const revalidate=1800;
export default async function SubjectPage({params}){
 const {id}=await params;
 let books=[]; try{const d=await olFetch(`/subjects/${id}.json`,{limit:36});books=(d.works||[]).map(w=>normalizeWork({key:w.key,title:w.title,cover_id:w.cover_id,authors:w.authors}))}catch{}
 const label=id.replace(/_/g,' ');
 return <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-8 md:py-16"><p className="eyebrow text-accent">Browse by subject</p><h1 className="mt-3 font-display text-5xl capitalize md:text-7xl">{label}</h1><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">{books.map((b,i)=><BookCard key={b.key||i} book={b}/>)}</div></div>
}
