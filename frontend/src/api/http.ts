import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

// create axios instance
const http: AxiosInstance = axios.create({
  // read from env
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  withCredentials: true, // allow cross-domain requests to carry cookies
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// request interceptor
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
}, error => Promise.reject(error))

// response interceptor
http.interceptors.response.use(
  async (response) => {
    if (response.request.responseType === 'blob') {
      return response
    }

    console.log('response', response)

    switch (response.status) {
      case 200:
        return Promise.resolve(response.data)
      default:
        return Promise.reject(response.data)
    }
  },
  async (error) => {
    console.log('error', error)
    return Promise.reject(error);
  }
)

export default http
