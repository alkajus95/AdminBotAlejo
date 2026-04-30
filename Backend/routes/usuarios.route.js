import express from 'express';
import { getUsuario, createUsuario } from '../controllers/usuario.controller.js';
import { verificarToken } from '../middleware/auth.middleware.js';

const route = express.Router();

// Ruta para ver la lista (Protegida)
route.get('/usuario', verificarToken, getUsuario);

// Ruta para crear (Puedes decidir si protegerla o no)
route.post('/usuario', verificarToken, createUsuario);

export default route;