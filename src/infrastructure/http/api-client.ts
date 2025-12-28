import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.interceptors.request.use((config) => {
  const sessionStr = localStorage.getItem('auth_session');
  if (sessionStr) {
    try {
      const session = JSON.parse(sessionStr);
      if (session.token?.accessToken) {
        config.headers.Authorization = `Bearer ${session.token.accessToken}`;
      }
    } catch (error) {
      console.error('Error parsing auth session:', error);
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('auth_session');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
