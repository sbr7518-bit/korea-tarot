import client from './client'

export const authApi = {
  signup: (body) => client.post('/auth/signup', body),
  login: (body) => client.post('/auth/login', body),
  logout: () => client.post('/auth/logout'),
}
