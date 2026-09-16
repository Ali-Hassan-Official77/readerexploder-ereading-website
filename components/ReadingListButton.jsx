'use client';
import { Bookmark, Check } from 'lucide-react';
import { useReadingList } from '@/lib/useReadingList';

export default function ReadingListButton({book,className=''}) {
 const {isSaved,toggle}=useReadingList(); const saved=isSaved(book.id);
 return <button onClick={()=>toggle(book)} aria-pressed={saved} className={`focus-ring inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-bold transition ${saved?'border-accent/40 bg-accent text-ink':'border-white/15 bg-white/[.04] text-paper hover:border-accent/50 hover:bg-accent/[.08]'} ${className}`}>
  {saved?<Check size={15}/>:<Bookmark size={15}/>} {saved?'Saved to shelf':'Save to shelf'}
 </button>;
}
