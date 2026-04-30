import { FindUserByEmail } from '../models/auth.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Esta es la llave secreta. ¡Debe ser la misma en el middleware!
const SECRET_KEY = 'adminbot_secret_123'; 

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await FindUserByEmail(email);

        if (!user) {
            return res.status(401).json({ ok: false, message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!validPassword) {
            return res.status(401).json({ ok: false, message: "Contraseña incorrecta" });
        }

        // Aquí creamos el token usando la llave
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        return res.json({
            ok: true,
            token,
            user: {
                id: user.id,
                nombres: user.first_name, 
                email: user.email
            }
        });

    } catch (err) {
        console.error("ERROR EN LOGIN:", err);
        return res.status(500).json({ ok: false, message: "Error interno" });
    }
};