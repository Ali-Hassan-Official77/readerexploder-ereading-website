import { NextResponse } from 'next/server';
import { mangaSearch, mangaCoverUrl } from '@/lib/sources';

export async function GET(request){
 const q=new URL(request.url).searchParams.get('q')?.trim()||'one piece';
 try{
  const data=await mangaSearch(q,18);
  return NextResponse.json((data.data||[]).map(item=>({
    id:item.id,
    title:item.attributes?.title?.en||Object.values(item.attributes?.title||{})[0]||'Untitled',
    description:item.attributes?.description?.en||Object.values(item.attributes?.description||{})[0]||'',
    status:item.attributes?.status,
    year:item.attributes?.year,
    cover:mangaCoverUrl(item),
    url:`https://mangadex.org/title/${item.id}`,
  })),{headers:{'Cache-Control':'s-maxage=900, stale-while-revalidate=3600'}});
 }catch{return NextResponse.json([], {status:502})}
}
