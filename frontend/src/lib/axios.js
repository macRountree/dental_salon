import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(config => {
  const tokenLocalStorage = localStorage.getItem('AUTH_TOKEN');
  if (tokenLocalStorage) {
    config.headers.Authorization = `Bearer ${tokenLocalStorage}`;
  }
  return config;
});

export default api;

//*Interceptors : functions can add into new Instance from Axios and look likes middleware

//*Interceptors Req & res
