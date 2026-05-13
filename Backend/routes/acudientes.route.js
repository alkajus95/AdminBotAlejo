import { Router } from 'express';
// Importamos exactamente los nombres que exportamos arriba
import { createAcudiente, getAcudientes } from '../controllers/acudiente.controller.js';

const router = Router();

router.get('/acudientes', getAcudientes);
router.post('/acudientes', createAcudiente);

export default router;