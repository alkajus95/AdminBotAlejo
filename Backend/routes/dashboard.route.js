import { Router } from 'express';
import { 
    getStudentStats, 
    createStudent, 
    getAllStudents, 
    deleteStudent // <-- Importante
} from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/stats', getStudentStats);
router.get('/students', getAllStudents);
router.post('/students', createStudent);
router.delete('/students/:id', deleteStudent); // RUTA PARA BORRAR

export default router;