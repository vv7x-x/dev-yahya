const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/projects';

export const fetchProjects = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProject = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProject = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return res.json();
};
