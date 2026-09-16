import { NextResponse } from 'next/server';
import { olFetch } from '@/lib/openlibrary';
import { gutenbergSearch } from '@/lib/sources';

export async function GET(request){
 const q=new URL(request.url).searchParams.get('q')?.trim();
 if(!q)return NextResponse.json({openLibrary:[],gutenberg:[]});
 const [ol,gt]=await Promise.all([
  olFetch('/search.json',{q,limit:30}).catch(()=>({docs:[]})),
  gutenbergSearch(q,1).catch(()=>({results:[]})),
 ]);
 return NextResponse.json({
  openLibrary:(ol.docs||[]).map(d=>({...d,key:d.key,title:d.title,author_name:d.author_name,cover_i:d.cover_i})),
  gutenberg:gt.results||[]
 },{headers:{'Cache-Control':'s-maxage=600, stale-while-revalidate=3600'}});
}
