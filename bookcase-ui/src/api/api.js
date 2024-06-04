import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);



export const fetchUserData = async (userId) => {
  try {
    const response = await apiClient.get(`api/users/me`);
    console.log('Response:', response); // log the entire response
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};
