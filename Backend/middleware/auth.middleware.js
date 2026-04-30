import jwt from 'jsonwebtoken';

// REGLA DE ORO: Debe ser la misma llave que en el controlador
const SECRET_KEY = 'adminbot_secret_123';

export const verificarToken = (req, res, next) => {
    // 1. Obtener el encabezado 'Authorization'
    const authHeader = req.headers['authorization'];
    
    // 2. Extraer el token (formato: Bearer XXXXXX)
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ ok: false, message: "No se proporcionó un token" });
    }

    // 3. Verificar si el token es válido usando la llave
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ ok: false, message: "Token no válido o expirado" });
        }
        
        // Si todo está bien, guardamos los datos del usuario en la petición
        req.usuario = decoded;
        next(); // Le damos paso al siguiente proceso (ej. obtener estadísticas)
    });
};