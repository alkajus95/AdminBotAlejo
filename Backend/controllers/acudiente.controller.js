import db from '../config/db.js';
import crypto from 'crypto';

// 1. OBTENER ACUDIENTES (Asegúrate que tenga la S al final)
export const getAcudientes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM guardians');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

// 2. CREAR ACUDIENTE CON CANDADO (Solo 1 por alumno)
export const createAcudiente = async (req, res) => {
    const { first_name, last_name, phone, email, student_id, relationship } = req.body;

    try {
        // --- EL CANDADO ---
        // Revisamos si el estudiante ya tiene alguien asignado en la tabla relacional
        const [existing] = await db.query(
            'SELECT id FROM student_guardians WHERE student_id = ?', 
            [student_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ 
                ok: false, 
                message: "¡Error! Este alumno ya tiene un acudiente vinculado." 
            });
        }

        // --- SI PASA EL CANDADO, CREAMOS ---
        const guardianId = crypto.randomUUID();
        const linkId = crypto.randomUUID();

        // Insertar en la tabla de guardianes
        await db.query(
            'INSERT INTO guardians (id, first_name, last_name, phone, email, whatsapp_active) VALUES (?, ?, ?, ?, ?, 1)',
            [guardianId, first_name, last_name, phone, email || null]
        );

        // Vincular en student_guardians
        await db.query(
            'INSERT INTO student_guardians (id, student_id, guardian_id, relationship, is_primary, receives_notifications) VALUES (?, ?, ?, ?, 1, 1)',
            [linkId, student_id, guardianId, relationship]
        );

        res.json({ ok: true, message: "Acudiente vinculado con éxito" });

    } catch (error) {
        console.error("❌ ERROR EN DB:", error.sqlMessage || error.message);
        res.status(500).json({ 
            ok: false, 
            message: "Error en la base de datos", 
            sqlError: error.sqlMessage 
        });
    }
};