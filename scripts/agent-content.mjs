import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const pages = {};
const decode = s => s.replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g, (_,n)=>String.fromCodePoint(+n)).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&amp;/g,'&');
async function walk(dir) {
 for (const entry of await readdir(dir,{withFileTypes:true})) {
  const file=path.join(dir,entry.name);
  if(entry.isDirectory()) { if(entry.name !== 'dad') await walk(file); continue; }
  if(!file.endsWith('.html') || entry.name==='404.html') continue;
  const html=await readFile(file,'utf8');
  const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if(!main) continue;
  const url='/'+path.relative('dist',file).replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/$/,'');
  let md=main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'')
   .replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi,(_,code)=>'\n\n```\n'+decode(code.replace(/<[^>]+>/g,''))+'\n```\n\n')
   .replace(/<h([1-6])\b[^>]*>/gi,(_,n)=>'\n\n'+'#'.repeat(+n)+' ')
   .replace(/<\/h[1-6]>/gi,'\n\n')
   .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,(_,href,label)=>`[${label.replace(/<[^>]+>/g,'')}](${new URL(decode(href),'https://caseymanos.com').href})`)
   .replace(/<li\b[^>]*>/gi,'\n- ').replace(/<\/(?:p|div|section|ul|ol)>/gi,'\n\n').replace(/<br\s*\/?>/gi,'\n')
   .replace(/<[^>]+>/g,'');
  pages[url||'/']=decode(md).replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim()+'\n';
 }
}
await walk('dist');
await writeFile('api/content-data.json',JSON.stringify(pages,null,2)+'\n');
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.keys(pages).map(p=>`<url><loc>https://caseymanos.com${p}</loc></url>`).join('')+'</urlset>\n';
await writeFile('dist/sitemap.xml',xml);
console.log(`Generated Markdown representations and sitemap for ${Object.keys(pages).length} pages`);
