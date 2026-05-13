import db from '../config/db.js';
import crypto from 'crypto';
import { sendWhatsappMessage } from '../modules/whatsapp/whatsapp.services.js';

// 1. OBTENER ASISTENCIAS (Nombre exacto: getAsistencia)
export const getAsistencia = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM attendance ORDER BY date DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

// 2. CREAR ASISTENCIA (Corregido con tus columnas: date y observations)
export const createAsistencia = async (req, res) => {
    const { student_id, status, observation } = req.body;
    const id = crypto.randomUUID();

    try {
        // Usamos los nombres exactos de tu tabla en MySQL
        await db.query(
            'INSERT INTO attendance (id, student_id, date, status, observations) VALUES (?, ?, CURDATE(), ?, ?)',
            [id, student_id, status, observation]
        );

        // Si es inasistencia, buscamos al acudiente
        if (status === 'Ausente') {
            const [rows] = await db.query(`
                SELECT g.phone 
                FROM guardians g
                JOIN student_guardians sg ON g.id = sg.guardian_id
                WHERE sg.student_id = ?
                LIMIT 1
            `, [student_id]);

            if (rows && rows.length > 0 && rows[0].phone) {
                const phone = rows[0].phone;
                // Enviamos sin bloquear la respuesta principal
                sendWhatsappMessage(phone, "AdminBot: Se reporta inasistencia del estudiante hoy.")
                    .catch(e => console.log("⚠️ Error en WhatsApp (Meta):", e.message));
            }
        }

        return res.json({ ok: true, message: "Asistencia registrada correctamente" });

    } catch (error) {
        console.error("❌ ERROR EN DB:", error.sqlMessage || error.message);
        return res.status(500).json({ 
            ok: false, 
            message: "Error interno del servidor", 
            sqlError: error.sqlMessage 
        });
    }
};