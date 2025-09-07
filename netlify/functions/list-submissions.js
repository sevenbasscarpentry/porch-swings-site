// /.netlify/functions/list-submissions
// Requires environment variables:
//   FORMS_ACCESS_TOKEN  — Netlify Personal Access Token with read access
//   FORMS_SITE_ID       — Your Netlify Site ID
export async function handler(event, context) {
  const token = process.env.FORMS_ACCESS_TOKEN;
  const siteId = process.env.FORMS_SITE_ID || process.env.SITE_ID;
  if (!token || !siteId) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
      body: JSON.stringify({ error: 'Missing FORMS_ACCESS_TOKEN or FORMS_SITE_ID env vars' })
    };
  }
  const headers = { Authorization: `Bearer ${token}` };
  const base = 'https://api.netlify.com/api/v1';
  try {
    // 1) Get all forms for the site; find "quote"
    const formsRes = await fetch(`${base}/sites/${siteId}/forms`, { headers });
    if (!formsRes.ok) throw new Error(`forms ${formsRes.status}`);
    const forms = await formsRes.json();
    const form = forms.find(f => f.name === 'quote');
    if (!form) {
      return { statusCode: 404, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }, body: JSON.stringify([]) };
    }
    // 2) Get submissions (first 500)
    const subsRes = await fetch(`${base}/forms/${form.id}/submissions?per_page=500`, { headers });
    if (!subsRes.ok) throw new Error(`subs ${subsRes.status}`);
    const subs = await subsRes.json();
    const rows = subs.map(s => {
      // fields live in s.data
      const d = s.data || {};
      return {
        id: s.id,
        created_at: s.created_at,
        name: d.name || '',
        email: d.email || '',
        phone: d.phone || '',
        city: d.city || '',
        message: d.message || ''
      };
    }).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
      body: JSON.stringify(rows)
    };
  } catch (e) {
    return { statusCode: 500, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }, body: JSON.stringify({ error: e.message }) };
  }
}
