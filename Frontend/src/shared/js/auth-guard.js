// src/shared/js/auth-guard.js
import { obtenerToken } from './storage.js';

if (!obtenerToken()) {
    // Si no hay token, mandarlo directo al login
    window.location.href = '/src/pages/auth/index.html';
}