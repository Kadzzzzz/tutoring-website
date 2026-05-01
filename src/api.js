const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function getToken() {
  return localStorage.getItem('admin_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur réseau' }));
    throw new Error(err.error || 'Erreur serveur');
  }
  return res.json();
}

export const api = {
  // Public
  getSubjects:  ()     => request('/api/subjects'),
  getSubject:   (slug) => request(`/api/subjects/${slug}`),
  getChapter:   (id)   => request(`/api/chapters/${id}`),
  getDocuments: (p)    => request(`/api/documents?${new URLSearchParams(p)}`),
  getColles:    (p)    => request(`/api/colles?${new URLSearchParams(p)}`),
  getColle:     (id)   => request(`/api/colles/${id}`),
  getConcours:  (p)    => request(`/api/concours?${new URLSearchParams(p)}`),
  getConcour:   (id)   => request(`/api/concours/${id}`),

  // Auth
  login: (email, password) => request('/api/admin/login', {
    method: 'POST', body: JSON.stringify({ email, password })
  }),
  setup: (email, password) => request('/api/admin/setup', {
    method: 'POST', body: JSON.stringify({ email, password })
  }),

  // Admin
  getStats:          ()        => request('/api/admin/stats'),
  getAdminSubjects:  ()        => request('/api/admin/subjects'),
  createSubject:     (d)       => request('/api/admin/subjects',       { method: 'POST',   body: JSON.stringify(d) }),
  updateSubject:     (id, d)   => request(`/api/admin/subjects/${id}`, { method: 'PUT',    body: JSON.stringify(d) }),
  deleteSubject:     (id)      => request(`/api/admin/subjects/${id}`, { method: 'DELETE' }),

  getAdminChapters:  ()        => request('/api/admin/chapters'),
  createChapter:     (d)       => request('/api/admin/chapters',       { method: 'POST',   body: JSON.stringify(d) }),
  updateChapter:     (id, d)   => request(`/api/admin/chapters/${id}`, { method: 'PUT',    body: JSON.stringify(d) }),
  deleteChapter:     (id)      => request(`/api/admin/chapters/${id}`, { method: 'DELETE' }),

  getAdminDocuments: ()        => request('/api/admin/documents'),
  createDocument:    (d)       => request('/api/admin/documents',       { method: 'POST',   body: JSON.stringify(d) }),
  updateDocument:    (id, d)   => request(`/api/admin/documents/${id}`, { method: 'PUT',    body: JSON.stringify(d) }),
  deleteDocument:    (id)      => request(`/api/admin/documents/${id}`, { method: 'DELETE' }),

  createColle:       (d)       => request('/api/admin/colles',          { method: 'POST',   body: JSON.stringify(d) }),
  updateColle:       (id, d)   => request(`/api/admin/colles/${id}`,    { method: 'PUT',    body: JSON.stringify(d) }),
  deleteColle:       (id)      => request(`/api/admin/colles/${id}`,    { method: 'DELETE' }),
  createPlanche:     (cid, d)  => request(`/api/admin/colles/${cid}/planches`, { method: 'POST', body: JSON.stringify(d) }),
  deletePlanche:     (id)      => request(`/api/admin/planches/${id}`,  { method: 'DELETE' }),

  getAdminConcours:  ()        => request('/api/admin/concours'),
  createConcours:    (d)       => request('/api/admin/concours',        { method: 'POST',   body: JSON.stringify(d) }),
  updateConcours:    (id, d)   => request(`/api/admin/concours/${id}`,  { method: 'PUT',    body: JSON.stringify(d) }),
  deleteConcours:    (id)      => request(`/api/admin/concours/${id}`,  { method: 'DELETE' }),

  uploadPdf: async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    const token = getToken();
    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    });
    if (!res.ok) throw new Error('Erreur lors de l\'upload');
    return res.json();
  }
};
