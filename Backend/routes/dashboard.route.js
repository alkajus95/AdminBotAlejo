import { Router } from 'express';
import { getAllStudents, createStudent, deleteStudent, getStats } from '../controllers/student.controller.js'; 
import { createAsistencia } from '../controllers/asistencia.controller.js'; 
import { createAcudiente } from '../controllers/acudiente.controller.js'; 

const router = Router();

// Rutas de Estudiantes
router.get('/students', getAllStudents);
router.post('/students', createStudent);
router.delete('/students/:id', deleteStudent);
router.get('/stats', getStats); // <-- ESTA ES VITAL PARA EL GRÁFICO

// Rutas de Asistencia y Acudientes
router.post('/asistencia', createAsistencia);
router.post('/acudientes', createAcudiente);

export default router;