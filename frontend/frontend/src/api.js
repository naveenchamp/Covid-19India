const TOKEN_STORAGE_KEY = 'covid_portal_jwt_token'
const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '')

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)

export const setStoredToken = token => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

const request = async (path, options = {}) => {
  const token = getStoredToken()
  const {method = 'GET', body} = options
  const headers = {}

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    throw new Error(typeof data === 'string' ? data : 'Something went wrong')
  }

  return data
}

export const loginUser = credentials =>
  request('/login/', {method: 'POST', body: credentials})

export const getStates = () => request('/states/')

export const getStateById = stateId => request(`/states/${stateId}/`)

export const getStateStats = stateId => request(`/states/${stateId}/stats/`)

export const createDistrict = district =>
  request('/districts/', {method: 'POST', body: district})

export const getDistrictById = districtId => request(`/districts/${districtId}/`)

export const updateDistrict = (districtId, district) =>
  request(`/districts/${districtId}/`, {method: 'PUT', body: district})

export const deleteDistrict = districtId =>
  request(`/districts/${districtId}/`, {method: 'DELETE'})

export {API_BASE_URL}
