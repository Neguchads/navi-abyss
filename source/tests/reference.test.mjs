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

test('own dashboard is offline and contains all reference views', () => {
  const dashboard = read('../../reference.html');
  assert.doesNotMatch(dashboard, /<(?:script|link|img)\b[^>]*(?:src|href)=["']?https?:/i);
  for (const id of ['overview','architecture','engineering']) assert.match(dashboard, new RegExp('id="'+id+'" data-view'));
  assert.match(dashboard, /Credits:/);
  assert.doesNotMatch(read('../../README.md'), /\.github\/screenshots\/[^)]+\.jpg/);
});
