# Capture provenance
The three official screenshots are real Chromium browser captures of `reference.html`, with deterministic scene time (`?capture=1`), viewport 1440 × 1060, device scale 1. Modes: ocean, graph and fleet. No AI image generation or upstream screenshots.
```sh
bash scripts/capture-reference.sh
```
Requires Chrome/Chromium and Python 3. Set CHROME_BIN if needed. Capture script checks a rendered scene marker, valid dimensions and distinct content. Browser image bytes may vary by system. Legacy WebGPU performance and full user interaction require separate acceptance.

## Initial cosmic captures
[GitHub Actions run 45606283607](https://github.com/Neguchads/navi-abyss/actions/runs/45606283607) completed successfully from `5cc976a634d376be15b6fa64821594d829fb2282`. Three distinct 1440 × 1060 PNGs were committed in `2053c8ab156404bb615950cb04be90cd686d703d`. The initial headless RAF timing failure was fixed by synchronously rendering the capture frame. The migration workflow with write permission was removed. The permanent CI uses read-only permissions and generates fresh temporary captures without publishing them.
