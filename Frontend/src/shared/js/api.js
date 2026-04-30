import { obtenerToken } from './storage.js';

const API_URL = 'http://localhost:3000/api';

export async function request(endpoint, options = {}) {
    const token = obtenerToken();
    const headers = { 
        'Content-Type': 'application/json',
        ...options.headers 
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(API_URL + endpoint, { ...options, headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Error en la petición');
    return data;
}