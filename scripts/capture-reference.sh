#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
browser="${CHROME_BIN:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
out="${1:-.github/screenshots}"
mkdir -p "$out"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
for pair in ocean:overview graph:architecture fleet:engineering; do
  view="${pair%:*}"; name="${pair#*:}"; url="file://$(pwd)/reference.html?capture=1#$view"
  flags=(--headless --disable-gpu --no-sandbox --disable-dev-shm-usage --no-first-run --no-default-browser-check --force-device-scale-factor=1 --window-size=1440,1060 --virtual-time-budget=2000)
  "$browser" "${flags[@]}" --user-data-dir="$tmp/$view-check" --dump-dom "$url" > "$tmp/$view.html"
  grep -q 'data-rendered="true"' "$tmp/$view.html"
  "$browser" "${flags[@]}" --user-data-dir="$tmp/$view" --screenshot="$(realpath "$out")/navi-$name.png" "$url"
  test -s "$out/navi-$name.png"
done
python3 - "$out" <<'PY'
import hashlib,pathlib,struct,sys
out=pathlib.Path(sys.argv[1]); hashes=set()
for name in ("overview","architecture","engineering"):
    p=out/f"navi-{name}.png"; data=p.read_bytes()
    assert data[:8]==b"\x89PNG\r\n\x1a\n" and struct.unpack(">II",data[16:24])==(1440,1060),p
    assert len(data)>10000,p
    hashes.add(hashlib.sha256(data).hexdigest())
assert len(hashes)==3
PY
