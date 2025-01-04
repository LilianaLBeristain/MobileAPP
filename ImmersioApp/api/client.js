import { create } from 'apisauce'

// define the api
const apiClient = create({
  baseURL: 'http://192.168.0.38:3000',
})

export default apiClient;
