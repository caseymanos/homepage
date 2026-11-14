import test from 'node:test';
import assert from 'node:assert/strict';
import { representation } from './accept.mjs';
for (const [header, expected] of [
 ['text/markdown','markdown'], ['text/html','html'],
 ['text/html, text/markdown;q=0','html'],
 ['text/html;q=1, text/markdown;q=0.5','html'],
 ['text/html;q=0.5, text/markdown;q=1','markdown'],
 ['text/markdown;q=0, */*;q=1','html'],
 ['text/html;q=0, text/*;q=0.7','markdown'],
 ['text/markdown;q=0, text/html;q=0','' + null],
 ['TEXT/MARKDOWN;Q=0.8,text/html;q=0.2','markdown'],
 ['*/*','html'], ['text/html,text/markdown','html']
]) test(header, () => assert.equal(representation(header), expected === 'null' ? null : expected));
