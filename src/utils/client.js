import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080/api'
    : '/api',
});

export default client;
