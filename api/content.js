import pages from './content-data.json' with { type: 'json' };
import profile from './profile-data.json' with { type: 'json' };
export default function handler(req, res) {
 const url = new URL(req.url, 'https://caseymanos.com');
 let pathname = url.searchParams.get('path') ?? url.pathname;
 pathname = '/' + pathname.replace(/^\/+|\/+$/g, '');
 const isApi = pathname === '/api' || pathname.startsWith('/api/');
 res.setHeader('Vary', 'Accept');
 res.setHeader('Cache-Control','public, max-age=0, must-revalidate');
 const send=(status,type,body)=>{res.statusCode=status;res.setHeader('Content-Type',`${type}; charset=utf-8`);res.end(req.method==='HEAD'?'':body);};
 const error=(status,code,message,resolution)=>send(status,'application/json',JSON.stringify({error:{code,message,resolution}}));
 if (!['GET','HEAD'].includes(req.method)) {
  res.setHeader('Allow','GET, HEAD');
  return error(405,'method_not_allowed','This site provides read-only content.','Use GET or HEAD. See https://caseymanos.com/docs/');
 }
 if(pathname === '/api/profile') return send(200,'application/json',JSON.stringify(profile));
 if(isApi) return error(404,'not_found','No API endpoint exists at this path.','Use GET /api/profile. See https://caseymanos.com/openapi.json');
 if(pathname.endsWith('.md')) pathname=pathname.slice(0,-3);
 if(pathname==='/index') pathname='/';
 const content=pages[pathname];
 return send(content?200:404,'text/markdown',content ?? '# Page not found\n\nThis address does not match a page on Casey Manos\'s website. Browse the [sitemap](https://caseymanos.com/sitemap.xml), [homepage](https://caseymanos.com/), or [agent guide](https://caseymanos.com/llms.txt).\n');
}
