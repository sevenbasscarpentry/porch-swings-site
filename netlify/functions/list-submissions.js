// /.netlify/functions/list-submissions
export async function handler(event, context) {
  const base = 'https://api.netlify.com/api/v1';
  const token = process.env.FORMS_ACCESS_TOKEN;
  const siteId = process.env.FORMS_SITE_ID || process.env.SITE_ID;
  const headers = { 'content-type': 'application/json', 'access-control-allow-origin': '*' };
  if (!token || !siteId) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing FORMS_ACCESS_TOKEN or FORMS_SITE_ID environment variable(s).' }) };
  }
  try {
    const auth = { Authorization: `Bearer ${token}` };
    const formsRes = await fetch(`${base}/sites/${siteId}/forms`, { headers: auth });
    if (!formsRes.ok) {
      const t = await formsRes.text();
      return { statusCode: formsRes.status, headers, body: JSON.stringify({ error: 'Unable to fetch forms', details: t }) };
    }
    const forms = await formsRes.json();
    const form = forms.find(f => f.name === 'quote');
    if (!form) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Form "quote" not found on this site' }) };
    const subsRes = await fetch(`${base}/forms/${form.id}/submissions?per_page=500`, { headers: auth });
    if (!subsRes.ok) {
      const t = await subsRes.text();
      return { statusCode: subsRes.status, headers, body: JSON.stringify({ error: 'Unable to fetch submissions', details: t }) };
    }
    const subs = await subsRes.json();
    const rows = subs.map(s => ({
      id: s.id, created_at: s.created_at,
      name: (s.data && s.data.name) || '',
      email: (s.data && s.data.email) || '',
      phone: (s.data && s.data.phone) || '',
      city: (s.data && s.data.city) || '',
      message: (s.data && s.data.message) || ''
    })).sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
    return { statusCode: 200, headers, body: JSON.stringify(rows) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
}
