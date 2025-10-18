import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchRoutes = () => API.get('/routes');
export const createRoute = (route) => API.post('/routes', route);
export const deleteRoute = (id) => API.delete(`/routes/${id}`);
