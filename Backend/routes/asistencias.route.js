import { Router } from 'express';
// Importamos las funciones con los nombres EXACTOS del controlador
import { getAsistencia, createAsistencia } from '../controllers/asistencia.controller.js';

const router = Router();

/**
 * @route   GET /api/asistencia
 * @desc    Obtener el historial de todas las asistencias
 */
router.get('/asistencia', getAsistencia);

/**
 * @route   POST /api/asistencia
 * @desc    Registrar una nueva asistencia/inasistencia y notificar por WhatsApp
 */
router.post('/asistencia', createAsistencia);

export default router;