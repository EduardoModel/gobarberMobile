import axios from 'axios';

const api = axios.create({
  // For android the localhost need to be replaced with the address 10.0.2.2
  baseURL: 'http://localhost:8080',
});

export default api;
