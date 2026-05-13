import db from '../config/db.js';
import crypto from 'crypto';

export const getAllStudents = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const createStudent = async (req, res) => {
    const { student_code, first_name, last_name, document_type, document_number, birth_date, status } = req.body;
    const id = crypto.randomUUID();

    try {
        await db.query(
            'INSERT INTO students (id, student_code, first_name, last_name, document_type, document_number, birth_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id, student_code, first_name, last_name, document_type, document_number, birth_date, status]
        );
        res.json({ ok: true, message: "Alumno registrado" });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM students WHERE id = ?', [id]);
        res.json({ ok: true, message: "Alumno eliminado" });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};
// Añade esto al final de tu student.controller.js
export const getStats = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT status, COUNT(*) as count FROM students GROUP BY status');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};