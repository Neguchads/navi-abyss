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

test('all committed screenshot references are actual distinct PNG files of the stated size', () => {
  const paths = ['overview','architecture','engineering'];
  const buffers = paths.map(view => readFileSync(new URL('../../.github/screenshots/navi-'+view+'.png', import.meta.url)));
  for (const png of buffers) {
    assert.equal(png.subarray(0,8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), 1440);
    assert.equal(png.readUInt32BE(20), 1060);
    assert.ok(png.length > 10000);
  }
  for (let i=0;i<buffers.length;i++) for (let j=i+1;j<buffers.length;j++) assert.ok(!buffers[i].equals(buffers[j]));
});
