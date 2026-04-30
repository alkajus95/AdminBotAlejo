// models/auth.model.js
import db from "../config/db.js";

export const FindUserByEmail = async (email) => {
    // Cambiado 'usuarios' por 'users' y 'correo' por 'email'
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}