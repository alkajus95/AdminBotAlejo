import { request } from '../../shared/js/api.js';
import { validarCorreo, limpiarError, mostrarError } from '../../shared/js/utils.js';
import { guardarSesion } from '../../shared/js/storage.js';

const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorDisplay = document.getElementById('ErrorMessage');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Limpiar errores previos
    if (errorDisplay) errorDisplay.innerText = '';

    const correo = email.value.trim();
    const clave = password.value.trim();

    // Validaciones básicas
    if (!validarCorreo(correo)) {
        return mostrarError(errorDisplay, 'Correo electrónico no válido');
    }

    if (clave.length < 6) { // Corregido: antes tenías '=' que es asignación
        return mostrarError(errorDisplay, 'La contraseña debe tener al menos 6 caracteres');
    }

    try {
        // Petición al backend
        const data = await request('/login', {
            method: 'POST',
            body: JSON.stringify({ email: correo, password: clave })
        });

        if (data.ok) {
            // Guardar usuario y token, luego redirigir
            guardarSesion(data.user, data.token);
            window.location.href = '../dashboard/index.html';
        }
    } catch (err) {
        mostrarError(errorDisplay, err.message || 'Error al intentar ingresar');
    }
});