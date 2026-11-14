// More-specific media ranges override wildcards, including explicit q=0.
export function representation(accept = '*/*') {
 const ranges = accept.toLowerCase().split(',').map(part => {
  const [type, ...params] = part.trim().split(';').map(s => s.trim());
  const qParam = params.find(p => /^q\s*=/.test(p));
  const q = qParam === undefined ? 1 : Number(qParam.split('=')[1]);
  return {type, q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0};
 });
 function quality(type) {
  for (const match of [type, 'text/*', '*/*']) {
   const matches = ranges.filter(r => r.type === match);
   if (matches.length) return Math.max(...matches.map(r => r.q));
  }
  return 0;
 }
 const html = quality('text/html'), markdown = quality('text/markdown');
 if (!html && !markdown) return null;
 // Prefer HTML on equal weights; a plain text/markdown request still selects Markdown.
 return markdown > html ? 'markdown' : 'html';
}
