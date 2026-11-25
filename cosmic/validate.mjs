// Local catalog validation, performed before emitting executable HTML.
const slug = x => typeof x === 'string' && /^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,99}$/.test(x);
export function validateCatalog(c) {
  if (!c || c.schema_version !== 1 || c.owner !== 'Neguchads' ||
      c.relationship !== 'curated-membership' || !Array.isArray(c.sectors) ||
      c.sectors.length !== 4 || !Array.isArray(c.integrations)) throw Error('Invalid cosmic catalog');
  const sectors = new Set(), repos = new Set(), edges = new Set();
  for (const s of c.sectors) {
    if (!s || !slug(s.id) || sectors.has(s.id) ||
        typeof s.en !== 'string' || typeof s.pt !== 'string' ||
        !Array.isArray(s.desc) || s.desc.length !== 2 ||
        !s.desc.every(x => typeof x === 'string') ||
        typeof s.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(s.color) ||
        !Array.isArray(s.pos) || s.pos.length !== 3 || !s.pos.every(Number.isFinite) ||
        !Array.isArray(s.repos)) throw Error('Invalid cosmic sector');
    sectors.add(s.id);
    for (const r of s.repos) {
      if (!Array.isArray(r) || r.length !== 2 || !slug(r[0]) ||
          typeof r[1] !== 'string' || repos.has(r[0].toLowerCase())) throw Error('Invalid cosmic repository');
      repos.add(r[0].toLowerCase());
    }
  }
  for (const e of c.integrations) {
    if (!e || !slug(e.source) || !slug(e.target) || !slug(e.kind) ||
        !repos.has(e.source.toLowerCase()) || !repos.has(e.target.toLowerCase()))
      throw Error('Invalid cosmic integration');
    const key = JSON.stringify([e.source.toLowerCase(), e.target.toLowerCase(), e.kind]);
    if (edges.has(key)) throw Error('Duplicate cosmic integration');
    edges.add(key);
  }
  if (!c.source || c.source.repository !== 'Neguchads/navi-graphify' ||
      !/^[a-f0-9]{40}$/.test(c.source.commit) || c.source.path !== 'integrations/portfolio/catalog.json')
    throw Error('Invalid cosmic provenance');
  return c;
}
