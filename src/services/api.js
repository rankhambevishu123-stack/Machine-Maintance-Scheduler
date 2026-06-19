const API_BASE = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  health: () => request("/health"),
  summary: () => request("/summary"),
  dbStatus: () => request("/db-status"),
  inspectDb: () => request("/db-inspect"),
  login: (department, password) => request("/login", {
    method: "POST",
    body: JSON.stringify({ department, password }),
  }),
  list: (collection) => request(`/${collection}`),
  create: (collection, payload) => request(`/${collection}`, {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  update: (collection, id, payload) => request(`/${collection}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }),
  remove: (collection, id) => request(`/${collection}/${id}`, {
    method: "DELETE",
  }),
};