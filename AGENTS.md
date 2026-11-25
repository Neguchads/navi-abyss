# NAVI Abyss agent instructions

Follow the existing [NAVI Core](https://github.com/Neguchads/navi-core) and [NEF](https://github.com/Neguchads/navi-core/blob/main/docs/NEF.md) policies as advisory references. Read [engineering record](docs/ENGINEERING.md) before nontrivial changes.

- Preserve original license and upstream attribution, WebGPU behavior and offline delivery.
- Resolve material ambiguity about deliverables and acceptance before implementation. Use reviewed Core `navi intake` when available; do not claim host enforcement.
- Prefer deterministic tools and one selected agent host. No secrets, private prompts or memory in public commits; learning requires explicit reviewed approval outside the worktree.
- Edit source rather than generated HTML; rebuild all affected outputs and run `npm run verify` in source. Record actual checks, blockers and rollback in handoff. Never label static syntax checks as GPU runtime evidence.
- Keep scope additive; review dependency and workflow changes before adoption.

- Cosmic reference source is in `cosmic/`; rebuild the embedded HTML and capture the scene. Do not infer dependency edges or include private repositories. Keep documented integrations distinct from curated membership.
