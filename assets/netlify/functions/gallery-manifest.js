// /.netlify/functions/gallery-manifest
export async function handler(event) {
  const headers = { 'content-type': 'application/json','access-control-allow-origin': '*','access-control-allow-methods': 'GET,POST,OPTIONS' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  const GH_TOKEN = process.env.GH_TOKEN;
  const GH_REPO = process.env.GH_REPO || 'sevenbasscarpentry/porch-swings-site';
  const GH_BRANCH = process.env.GH_BRANCH || 'main';
  const folderPath = 'assets/gallery';
  const manifestPath = `${folderPath}/manifest.json`;
  const apiBase = 'https://api.github.com';
  async function gh(url, init={}){
    return await fetch(url, { ...init, headers: { ...(init.headers||{}), 'Authorization': `Bearer ${GH_TOKEN}`, 'Accept': 'application/vnd.github+json', 'User-Agent': 'netlify-fn' } });
  }
  try {
    if (event.httpMethod === 'GET') {
      const listRes = await fetch(`${apiBase}/repos/${GH_REPO}/contents/${folderPath}?ref=${GH_BRANCH}`);
      if (!listRes.ok) return { statusCode: listRes.status, headers, body: JSON.stringify({ error: 'Unable to list gallery folder' }) };
      const list = await listRes.json();
      const allow = ['.jpg','.jpeg','.png','.webp','.gif'];
      const items = list.filter(f => f.type==='file' && allow.some(ext => f.name.toLowerCase().endsWith(ext)))
        .map(f => ({ name: f.name, url: `https://raw.githubusercontent.com/${GH_REPO}/${GH_BRANCH}/${folderPath}/${encodeURIComponent(f.name)}` }));
      const manRes = await fetch(`${apiBase}/repos/${GH_REPO}/contents/${manifestPath}?ref=${GH_BRANCH}`);
      let sha=null, data={}; if (manRes.ok) { const man = await manRes.json(); sha = man.sha; const content = Buffer.from(man.content, 'base64').toString('utf8'); try{ data = JSON.parse(content); }catch(e){} }
      const merged = items.map(it => ({ ...it, ...(data[it.name]||{}) }));
      return { statusCode: 200, headers, body: JSON.stringify({ items: merged, sha }) };
    }
    if (event.httpMethod === 'POST') {
      if (!GH_TOKEN) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing GH_TOKEN env var' }) };
      const body = JSON.parse(event.body||'{}');
      const items = body.items||[];
      const map = {}; items.forEach(it => { map[it.name] = { caption: it.caption||'', type: it.type||'', size: it.size||'', hanging: it.hanging||'', finish: it.finish||'' }; });
      const contentStr = JSON.stringify(map, null, 2);
      const payload = { message: 'Update gallery manifest', content: Buffer.from(contentStr, 'utf8').toString('base64'), branch: GH_BRANCH };
      if (body.sha) payload.sha = body.sha;
      const putRes = await gh(`${apiBase}/repos/${GH_REPO}/contents/${manifestPath}`, { method: 'PUT', body: JSON.stringify(payload) });
      const text = await putRes.text(); if (!putRes.ok) return { statusCode: putRes.status, headers, body: text };
      const j = JSON.parse(text); const newSha = j.content && j.content.sha;
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, sha: newSha }) };
    }
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (e) { return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) }; }
}
