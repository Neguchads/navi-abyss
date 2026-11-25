// NAVYV reference shell: deterministic post-build composition; no runtime dependencies.
export function applyReference(html) {
  const replaceOnce=(pattern,value)=>{const matches=html.match(new RegExp(pattern.source,pattern.flags.includes("g")?pattern.flags:pattern.flags+"g"));if(!matches||matches.length!==1)throw new Error("Reference shell anchor: "+pattern);html=html.replace(pattern,()=>value);};
  replaceOnce(/<title>Abyssal Garden<\/title>/,"<title>NAVYV Abyss | NAVI Engineering Universe</title>");
  replaceOnce(/<\/head>/,`<meta name="description" content="An immersive WebGPU laboratory in the NAVI Engineering Universe. Explore, build, verify.">
<style id="navi-reference-style">
:root{--navi-ink:#070d16;--navi-panel:#0b111b;--navi-line:#34516a;--navi-cyan:#63daff;--navi-text:#eaf4ff;--navi-muted:#b3c6d9}
#m{box-sizing:border-box;grid-template-columns:minmax(0,29em) minmax(0,27em);align-content:center;align-items:center;justify-content:center;gap:clamp(1em,4vw,4em);padding:2em 3em 5em;text-align:left;overflow:auto;background:linear-gradient(105deg,#070d16ed,#0b111b9c 48%,#070d16bb)}
.navi-mission{min-width:0;max-width:29em;display:grid;gap:.7em}
.navi-kicker{display:flex;align-items:center;gap:.8em;color:var(--navi-cyan);font:650 .72em/1.4 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase}
.navi-mark{width:2.9em;height:2.9em;flex:none}
.navi-mission h1{font-size:clamp(2.6em,5vw,4.7em);line-height:.94;letter-spacing:-.055em;background:linear-gradient(145deg,#f5f7fa 20%,#9ab2c8 58%,#63daff);background-clip:text;-webkit-background-clip:text;text-transform:none}
.navi-mission h1 span{display:block;color:var(--navi-cyan);-webkit-text-fill-color:var(--navi-cyan);font-weight:500;letter-spacing:.04em;font-size:.65em;margin-top:.12em}
.navi-summary{font-size:.94em;font-weight:450;line-height:1.6;color:var(--navi-muted);max-width:29ch}
.navi-register{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.4em;margin:0;padding:.65em 0;border-top:1px solid var(--navi-line);border-bottom:1px solid var(--navi-line)}
.navi-register div{min-width:0}.navi-register dt{font:.64em/1.5 ui-monospace,monospace;color:var(--navi-muted);text-transform:uppercase}.navi-register dd{margin:0;color:var(--navi-text);font-size:.75em;overflow-wrap:anywhere}
.navi-caption{font:600 .65em/1.4 ui-monospace,monospace;letter-spacing:.08em;color:var(--navi-muted)}
#a{width:100%;box-sizing:border-box;padding:1em;border:1px solid var(--navi-line);border-radius:.8em;background:#0b1522d9;text-align:center;box-shadow:0 1em 4em #0007}
#d{background:linear-gradient(120deg,#63daff,#169cc5);color:#07111a;letter-spacing:.08em}
#f{box-sizing:border-box;bottom:0;flex-wrap:wrap;gap:.45em;padding:.65em 1em 1em;font-size:.69em;background:linear-gradient(transparent,#070d16d9)}
#f a{padding:.6em .8em;box-shadow:none;border:1px solid var(--navi-line);border-radius:.4em;background:#0b1522;color:var(--navi-text);font-weight:650;letter-spacing:.04em}
#f a:hover{border-color:var(--navi-cyan);color:var(--navi-cyan)}
@media(max-width:760px) and (pointer:fine){#m{grid-template-columns:minmax(0,28em);align-content:start;gap:.9em;padding:1.3em 1em 1em}.navi-mission h1{font-size:3em}#f{position:static;grid-column:1;background:none}}
@media(pointer:coarse),(max-height:480px){#m{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:.8em;padding:.8em 1em 2.8em}.navi-mission h1{font-size:2.4em}.navi-summary{font-size:.8em}.navi-register{padding:.3em 0}#a{padding:.55em}#f{font-size:.58em;padding:.4em}.navi-caption{display:none}}
@media(prefers-reduced-motion:reduce){#m,#a>*,#d,#f a{transition:none}}
</style></head>`);
  replaceOnce(/<h1>Abyssal Garden<\/h1>/,`<header class="navi-mission"><p class="navi-kicker"><svg class="navi-mark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#a9bdce" d="M4 40 15 7h7l13 18 9-18-10 33h-6L15 22 9 40Z"/><path fill="#63daff" d="m16 45 12-15 6 9Z"/></svg> NAVI Engineering Universe / 01</p><h1>NAVYV<span>ABYSS</span></h1><p class="navi-summary">An immersive engineering laboratory beneath the surface. Explore a procedural world, then inspect the systems that build it.</p><dl class="navi-register"><div><dt>Engine</dt><dd>WebGPU</dd></div><div><dt>Delivery</dt><dd>Offline HTML</dd></div><div><dt>Lifecycle</dt><dd>Experimental</dd></div></dl><p class="navi-caption">EXPLORE / BUILD / VERIFY · Reference implementation</p></header>`);
  replaceOnce(/<p id=f>[\s\S]*?<\/p>/,`<nav id=f aria-label="Engineering ecosystem"><a href="https://github.com/Neguchads/navyv-abyss" target="_blank" rel="noopener noreferrer">Source</a><a href="https://github.com/Neguchads/navi-core" target="_blank" rel="noopener noreferrer">NAVI Core</a><a href="https://github.com/Neguchads/navi-core/blob/main/docs/NEF.md" target="_blank" rel="noopener noreferrer">NEF</a><a href="https://github.com/Neguchads/navi-graphify" target="_blank" rel="noopener noreferrer">Graphify</a><a href="https://github.com/Neguchads/Neguchads" target="_blank" rel="noopener noreferrer">Universe</a><a href="https://github.com/Noniv/abyssal-garden" target="_blank" rel="noopener noreferrer">Upstream · MIT</a><a href="https://ko-fi.com/noniv" target="_blank" rel="noopener noreferrer">Support upstream</a></nav>`);
  return html;
}
