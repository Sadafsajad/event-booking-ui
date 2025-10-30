// src/plugins/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    else config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

// For Sanctum cookie-based auth (must call before login/register)
export async function initSanctum() {
  await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true })
}
