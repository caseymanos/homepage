import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://caseymanos.com',
	output: 'static',
	publicDir: './static',
	compressHTML: true,
	markdown: { syntaxHighlight: false }
});
