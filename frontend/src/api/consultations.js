import client from './client'

export const consultationApi = {
  create: (body) => client.post('/consultations', body),
  getList: () => client.get('/consultations'),
  getOne: (id) => client.get(`/consultations/${id}`),
  remove: (id) => client.delete(`/consultations/${id}`),
}
