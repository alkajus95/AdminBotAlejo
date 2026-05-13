import { Router } from 'express'; // Asegúrate de que Router esté entre llaves
import { sendMessage } from './whatsapp.controller.js';

const router = Router();

// Esta ruta queda en: http://localhost:3000/api/whatsapp/send
router.post('/send', sendMessage);

export default router;