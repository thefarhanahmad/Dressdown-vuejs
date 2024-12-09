import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

const secondApiInstance = axios.create({
  baseURL: process.env.VUE_APP_SECOND_API_BASE_URL,
});

export { apiInstance, secondApiInstance };
