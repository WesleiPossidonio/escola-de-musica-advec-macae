import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-emam.vercel.app/',
  withCredentials: true,
})

// api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {

//   return config
// })

export default api