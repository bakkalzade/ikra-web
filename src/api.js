// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Buraya baseURL'inizi yazın
});


export default api;
