import client, { unwrapData } from './client'
import type { ApiAuthResponse, User } from '../types'

export async function login(email: string, password: string) {
  const response = await client.post<ApiAuthResponse>('/login', {
    email,
    password,
  })

  return unwrapData<ApiAuthResponse>(response)
}

export async function register(payload: {
  name: string
  email: string
  password: string
  role: string
}) {
  const response = await client.post<ApiAuthResponse>('/register', payload)
  return unwrapData<ApiAuthResponse>(response)
}

export async function getCurrentUser() {
  const response = await client.get<{ data: User }>('/user')
  return unwrapData<User>(response)
}

export async function logout() {
  await client.post('/logout')
}
