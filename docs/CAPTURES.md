# Capture provenance
The three official screenshots are real Chromium browser captures of `reference.html`, with deterministic scene time (`?capture=1`), viewport 1440 × 1060, device scale 1. Modes: ocean, graph and fleet. No AI image generation or upstream screenshots.
```sh
bash scripts/capture-reference.sh
```
Requires Chrome/Chromium and Python 3. Set CHROME_BIN if needed. Capture script checks a rendered scene marker, valid dimensions and distinct content. Browser image bytes may vary by system. Legacy WebGPU performance and full user interaction require separate acceptance.
