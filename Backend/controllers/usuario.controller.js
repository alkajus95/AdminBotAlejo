import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const getUsuario = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, nombres, apellidos, correo FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, correo, password } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        
        await db.query(
            'INSERT INTO usuarios (nombres, apellidos, correo, password_hash) VALUES (?, ?, ?, ?)',
            [nombres, apellidos, correo, password_hash]
        );
        res.status(201).json({ ok: true, message: "Usuario creado" });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};