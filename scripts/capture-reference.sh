#!/usr/bin/env bash
# Capture actual local reference HTML; no external assets or GPU required.
set -euo pipefail
cd "$(dirname "$0")/.."
browser="${CHROME_BIN:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
test -n "$browser"
out="${1:-.github/screenshots}"
mkdir -p "$out"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
for view in overview architecture engineering; do
  "$browser" --headless --disable-gpu --no-sandbox --disable-dev-shm-usage --no-first-run --no-default-browser-check --user-data-dir="$tmp/$view" --force-device-scale-factor=1 --window-size=1440,1060 --virtual-time-budget=1500 --screenshot="$(realpath "$out")/navi-$view.png" "file://$(pwd)/reference.html#$view"
  test -s "$out/navi-$view.png"
done
python3 - "$out" <<'PY'
import hashlib, pathlib, struct, sys
out=pathlib.Path(sys.argv[1])
hashes=set()
for name in ("overview","architecture","engineering"):
    p=out/f"navi-{name}.png"; data=p.read_bytes()
    assert data[:8]==b"\x89PNG\r\n\x1a\n", p
    assert struct.unpack(">II",data[16:24])==(1440,1060), p
    assert len(data)>10000, p
    hashes.add(hashlib.sha256(data).hexdigest())
assert len(hashes)==3, "duplicate captures"
PY
