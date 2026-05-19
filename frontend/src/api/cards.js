import client from './client'

export const cardApi = {
  getAll: () => client.get('/cards'),
  getOne: (id) => client.get(`/cards/${id}`),
}
