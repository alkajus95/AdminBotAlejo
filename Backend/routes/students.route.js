import { Router } from 'express';
// Cambiamos getStudent por getAllStudents
import { getAllStudents, createStudent, deleteStudent } from '../controllers/student.controller.js';

const router = Router();

router.get('/students', getAllStudents);
router.post('/students', createStudent);
router.delete('/students/:id', deleteStudent);

export default router;