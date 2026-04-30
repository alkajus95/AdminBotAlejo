// src/shared/js/storage.js

export function guardarSesion(usuario, token) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token); // Guardamos el token de seguridad
}

export function obtenerToken() {
    return localStorage.getItem('token');
}

export function obtenerUsuario() {
    return JSON.parse(localStorage.getItem('usuario'));
}

export function cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    window.location.href = '/src/pages/auth/index.html';
}