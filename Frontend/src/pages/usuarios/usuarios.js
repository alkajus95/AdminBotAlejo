import { request } from '../../shared/js/api.js';
import { cerrarSesion } from '../../shared/js/storage.js';

const tableBody = document.getElementById('usuarios-table-body');
const userForm = document.getElementById('form-usuario');
const userModal = document.getElementById('user-modal');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const searchInput = document.getElementById('search-input');

// 1. Cargar y Listar Usuarios
async function cargarUsuarios() {
    try {
        const data = await request('/usuario');
        renderizarTabla(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function renderizarTabla(usuarios) {
    tableBody.innerHTML = '';
    usuarios.forEach(user => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-white/5 transition";
        tr.innerHTML = `
            <td class="p-4 text-xs text-gray-500">#${user.id}</td>
            <td class="p-4 text-sm font-medium">${user.nombres} ${user.apellidos}</td>
            <td class="p-4 text-sm text-gray-400">${user.correo}</td>
            <td class="p-4 text-center">
                <button class="text-blue-400 hover:text-blue-300 mr-3 text-xs font-bold" onclick="prepararEdicion(${user.id})">EDITAR</button>
                <button class="text-red-400 hover:text-red-300 text-xs font-bold" onclick="eliminarUsuario(${user.id})">ELIMINAR</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// 2. Crear Usuario (Enviar al Backend)
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        nombres: document.getElementById('reg-nombres').value,
        apellidos: document.getElementById('reg-apellidos').value,
        correo: document.getElementById('reg-correo').value,
        password: document.getElementById('reg-pass').value
    };

    try {
        await request('/usuario', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        
        alert("Usuario creado correctamente");
        cerrarModal();
        cargarUsuarios();
        userForm.reset();
    } catch (error) {
        alert("Error al guardar: " + error.message);
    }
});

// 3. Buscador en tiempo real (Tarea 2.5)
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filas = tableBody.querySelectorAll('tr');
    filas.forEach(fila => {
        fila.style.display = fila.innerText.toLowerCase().includes(term) ? '' : 'none';
    });
});

// Funciones de Interfaz
btnOpenModal.onclick = () => userModal.classList.remove('hidden');
btnCloseModal.onclick = cerrarModal;
function cerrarModal() { userModal.classList.add('hidden'); }
document.getElementById('logout-btn').onclick = cerrarSesion;

cargarUsuarios();