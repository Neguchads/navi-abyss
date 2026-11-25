# NAVI Abyss — Engineering reference
Status: experimental / cosmic universe prototype.

## Architecture
- `cosmic/catalog.json`: reviewed Graphify public catalog snapshot, sourced from the rename PR commit with 15 public repository identities checked 2026-11-25. Never ingest private repositories, raw graph files or local agent memory.
- `cosmic/scene.js`: perspective 3D geometry, orbit camera, animated triangulated water, polygonal ships, repository star billboards, curated and integration graph edges, filter and inspector.
- `cosmic/template.html` + `cosmic/build.mjs`: deterministic offline single-file `reference.html`. Canvas 2D draws projected 3D geometry with painter sorting; this is not a GPU renderer or physically accurate fluid simulation.
- `source/` + `index.html`: retained legacy underwater WebGPU engine. Original copyright, engine bytes and preferences unchanged.
- `integration/universe.css`: downstream interface contract preserved.
- `.navi/project.toml`: static-website profile, pinned Core workflow read-only. NEF references remain advisory.

Data flow: reviewed Graphify catalog → embedded JSON → star positions / integration edges → selection and public GitHub links. No live fetch or auto-discovery. Catalog membership edges are dashed; integration edges solid; neither is an AST claim.

## Acceptance and verification
Run `cd source && npm ci && npm run build && npm run verify`. Verify deterministic output for both HTML files; run browser capture with `bash scripts/capture-reference.sh` from root. Test search, category filter, inspector, focus, drag, wheel, keyboard, mode switching, cinematic, narrow screen and no canvas fallback. Real GPU performance is not certified by these tests.

## Roadmap
| Milestone | Status | Acceptance |
|---|---|---|
| Rename / public data snapshot | Implemented in PR | Review canonical catalog update and downstream references |
| Cosmic 3D geometry | Prototype implemented | Browser evidence and human visual review |
| Repository stars / graph | Implemented in prototype | Unique public IDs, valid integration endpoints, working inspector |
| Fleet / orbit modes | Implemented in prototype | Camera movement and three mode captures |
| Public catalog refresh | Planned | Reviewed snapshot pipeline with public checks and offline fallback |
| GPU renderer / pilotable ships | Planned | WebGL/WebGPU mesh, shader and free-flight acceptance |
| Legacy GPU acceptance | Pending | Hardware smoke test and measured performance |

## Handoff
Scope: rename, original cosmic reference experience, public catalog snapshot, documentation and captures. Explicit decision: use native Canvas perspective projection to avoid new runtime dependencies and support offline/headless browser operation. Flying ships are animated scenery; users navigate the camera, not a simulated ship controller. Preserve upstream credits and do not imply production verification. Initial source snapshot comes from proposed Graphify catalog PR; merge/review it separately. Rollback by reverting the cosmic commits, retain Core pin and legacy engine. No automatic merge.
