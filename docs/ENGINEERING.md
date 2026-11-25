# NAVYV Abyss — engineering reference

Status: experimental. Reference 01 in NAVI Engineering Universe.

## Architecture
The existing static-website verification profile and pinned NAVI pilot remain authoritative. NEF is advisory. Do not rearrange upstream folders merely to match a reference.

- `source/src/`: upstream procedural rendering, geometry, controls, audio and quality selection.
- `source/template.html`: upstream UI template and engine DOM contract.
- `source/reference.mjs`: pure post-build composition, owns NAVYV branding and public navigation; applied by `source/build.mjs` to all build modes.
- `index.html`: offline distributable; no fetch, AI calls or external asset requirements added.
- `integration/universe.css`: existing consumer theme; unchanged for downstream compatibility.
- `.navi/project.toml` and existing pilot: read-only, pinned Core verification. No cross-repository writes or private export.

Flow: source + template → esbuild → deterministic NAVYV shell → offline HTML. Public navigation is explicit links, not an embedded live graph or authentication service.

## Verification
Run from `source/`: `npm ci`, `npm run verify`, `npm run build`, then `npm run verify` again. Check for unexpected generated diff with `git diff -- ../index.html`. The reference tests check exact shell parity, engine hooks, attribution and offline asset constraints. Test actual loading, entering/resuming, quality presets, audio, keyboard, touch and unsupported WebGPU in supported browsers. Static checks do not prove rendering or performance.

## Roadmap
| Milestone | Status | Acceptance |
|---|---|---|
| Brand and source shell | Implemented, pending runtime review | Published HTML and source share identical shell sections |
| Core pilot | Existing | Pinned gate passes for current revision |
| NEF adoption | Reference documentation added | Review architecture, roadmap and handoff |
| Runtime acceptance | Pending | Desktop and mobile WebGPU manual smoke tests |
| Public graph integration | Planned, not connected | Reviewed versioned public-only catalog; offline fallback |

## Handoff
Scope: reference shell, README and tests. Original renderer, audio, license, package dependency versions and downstream CSS unchanged. The distributed engine script was preserved from the base artifact; the full esbuild rebuild and GPU runtime must be verified before treating this as release-ready. The earlier pilot checks tracked JS syntax only. No claim of live NAVI telemetry.

Decision: retain English as the existing project language; use the existing Neguchads navy/cyan palette and an adapted geometric mark. Preserve upstream credit and support links.

Next: review PR, run verification/build and visual smoke tests, then consider additional NEF reference profiles and actual graph integration. Rollback by reverting the reference commit; retain existing pilot.
