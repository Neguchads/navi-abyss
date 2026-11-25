#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
browser="${CHROME_BIN:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
python3 - "$tmp" <<'PY'
from pathlib import Path
import sys
html=Path("reference.html").read_text()
test=r"""<script>
(function(){
const assert=(condition,message)=>{if(!condition)throw Error(message)};
const $=id=>document.getElementById(id);
assert(document.documentElement.dataset.rendered==='true','scene not rendered');
assert(document.documentElement.dataset.stars==='15','star count');
assert($('repoLink').href==='https://github.com/Neguchads/navi-abyss','initial repo');
$('search').value='navi-core';$('search').dispatchEvent(new Event('input'));
assert($('count').textContent.startsWith('1 / 15'),'search');
$('directoryToggle').click();assert($('directoryToggle').getAttribute('aria-expanded')==='true','directory');
assert($('directoryList').children.length===1,'filtered list');
$('directoryList').firstElementChild.click();
assert($('repoLink').href==='https://github.com/Neguchads/navi-core','selected GitHub URL');
assert($('directoryToggle').getAttribute('aria-expanded')==='false','directory closes');
$('edges').click();assert($('edges').getAttribute('aria-pressed')==='false','route toggle');
document.querySelector('[data-mode="fleet"]').click();
assert($('modeCaption').textContent.includes('NAVAL'),'fleet mode');
$('search').value='';$('search').dispatchEvent(new Event('input'));
$('filter').value='games';$('filter').dispatchEvent(new Event('change'));
assert($('count').textContent.startsWith('4 / 15'),'category filter');
$('cinema').click();assert(document.body.classList.contains('cinema'),'cinematic');
$('cinema').click();assert(!document.body.classList.contains('cinema'),'exit cinematic');
document.documentElement.dataset.smoke='pass';
})();
</script>"""
Path(sys.argv[1],"test.html").write_text(html.replace("</body>",test+"</body>"))
PY
"$browser" --headless --disable-gpu --no-sandbox --disable-dev-shm-usage --no-first-run --user-data-dir="$tmp/profile" --window-size=1440,1060 --virtual-time-budget=2000 --dump-dom "file://$tmp/test.html?capture=1#ocean" > "$tmp/result.html"
grep -q 'data-smoke="pass"' "$tmp/result.html"
echo "NAVI browser smoke: passed"
