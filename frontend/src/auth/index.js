// Minimal SPA auth helper using bearer tokens returned by backend
export async function login(email, password) {
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, device_name: 'web' }),
    credentials: 'include',
  })

  const payload = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(payload?.message || payload?.error || 'Authentication failed')
  }

  // store token in localStorage for subsequent requests
  if (payload?.token) {
    localStorage.setItem('auth_token', payload.token)
  }

  return payload
}

export async function register(payload) {
  const res = await fetch('/api/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.message || 'Registration failed')
  if (data?.token) localStorage.setItem('auth_token', data.token)
  return data
}

// --- Sanctum / cookie-based SPA helpers ---
export async function getCsrfCookie() {
  // Calls Laravel's route that sets the XSRF-TOKEN cookie
  return fetch('/sanctum/csrf-cookie', { credentials: 'include' })
}

export async function sessionLogin(email, password) {
  await getCsrfCookie()
  const res = await fetch('/auth/session/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })

  const payload = await res.json().catch(() => null)
  if (!res.ok) throw new Error(payload?.message || 'Authentication failed')
  return payload
}

export async function sessionRegister(payload) {
  await getCsrfCookie()
  const res = await fetch('/auth/session/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.message || 'Registration failed')
  return data
}

export async function sessionLogout() {
  await fetch('/auth/session/logout', { method: 'POST', credentials: 'include' })
}

export async function logout() {
  const token = localStorage.getItem('auth_token')
  try {
    await fetch('/api/v1/auth/logout', {
      method: 'POST',
      headers: { Authorization: token ? `Bearer ${token}` : '' },
      credentials: 'include',
    })
  } catch (e) {
    // ignore
  }
  localStorage.removeItem('auth_token')
}

export function authFetch(path, options = {}) {
  const token = localStorage.getItem('auth_token')
  const headers = { ...(options.headers || {}) }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return fetch(path, { ...options, headers, credentials: 'include' })
}

export async function me() {
  const token = localStorage.getItem('auth_token')
  const res = await fetch('/api/v1/auth/me', {
    method: 'GET',
    headers: { Authorization: token ? `Bearer ${token}` : '' },
    credentials: 'include',
  })
  if (!res.ok) return null
  return res.json()
}
