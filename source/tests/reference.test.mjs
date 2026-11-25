import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyReference } from '../reference.mjs';
const read = (name) => readFileSync(new URL(name, import.meta.url), 'utf8');
const template = read('../template.html');
const output = read('../../index.html');
const rendered = applyReference(template);
test('reference shell preserves original engine placeholder and UI hooks', () => {
  assert.ok(rendered.includes('/*SCRIPT*/'));
  for (const id of ['c','m','a','l','p','b','s','w','g','d','q','k','h','f','o','i']) {
    assert.match(rendered, new RegExp('\\bid='+id+'(?:[\\s>])'));
    assert.match(output, new RegExp('\\bid='+id+'(?:[\\s>])'));
  }
});
test('published shell matches deterministic source', () => {
  for (const pattern of [/<style id="navi-reference-style">[\s\S]*?<\/style>/, /<header class="navi-mission">[\s\S]*?<\/header>/, /<nav id=f[\s\S]*?<\/nav>/]) {
    assert.ok(rendered.match(pattern));
    assert.equal(output.match(pattern)?.[0], rendered.match(pattern)[0]);
  }
  assert.match(output, /<script>[\s\S]+<\/script>/);
  assert.doesNotMatch(output, /\/\*SCRIPT\*\//);
});
test('shell is local-first, with explicit upstream credit and safe external navigation', () => {
  assert.doesNotMatch(rendered, /<(?:script|link|img)\b[^>]*(?:src|href)=["']?https?:/i);
  assert.match(rendered, /github\.com\/Noniv\/abyssal-garden/);
  assert.match(rendered, /Copyright \(c\) 2026 Maksymilian Dendura/);
  assert.match(rendered, /href="reference\.html"/);
  assert.doesNotMatch(rendered, /ko-fi\.com/);
  for (const a of rendered.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(a[0], /rel="noopener noreferrer"/);
  assert.throws(() => applyReference(rendered), /anchor/);
});

test('cosmic catalog and offline source/output contract', () => {
 const catalog=JSON.parse(read('../../cosmic/catalog.json'));
 const ids=catalog.sectors.flatMap(s=>s.repos.map(r=>r[0]));
 assert.equal(catalog.owner,'Neguchads');assert.equal(ids.length,new Set(ids).size);
 assert.ok(ids.includes('navi-abyss'));assert.ok(ids.includes('navi-core'));
 for(const id of ids)assert.match(id,/^[A-Za-z0-9_.-]+$/);
 for(const edge of catalog.integrations){assert.ok(ids.includes(edge.source));assert.ok(ids.includes(edge.target))}
 const html=read('../../reference.html');
 const serialized=read('../../cosmic/catalog.json').trim().replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
 assert.equal(html,read('../../cosmic/template.html').replace('/*CATALOG*/',()=>serialized).replace('/*COSMIC*/',()=>read('../../cosmic/scene.js').trim()));
 assert.doesNotMatch(html, /<(?:script|link|img)\b[^>]*(?:src|href)=["']?https?:/i);
 assert.match(html,/function proj\(p\)/);assert.match(html,/function water\(time\)/);assert.match(html,/function ship\(pos,heading,size\)/);
 assert.doesNotMatch(html,/navyv-abyss/i);
});
