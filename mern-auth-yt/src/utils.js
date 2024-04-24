import axios from 'axios';

// Define your API base URL
const API_URL = 'http://localhost:3001/api';

// Create an Axios instance with the specified configuration
export const baseAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Mandatory to set true for sending cookies
});
