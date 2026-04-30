import db from './config/db.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const crearAdmin = async () => {
    try {
        const passwordPlana = 'jukaLOVE0603';
        const email = 'admin@adminbot.com';

        // 1. Encriptar la contraseña correctamente
        const password_hash = await bcrypt.hash(passwordPlana, 10);
        
        // 2. Generar un ID de 36 caracteres
        const id = randomUUID();

        // 3. Limpiar intentos anteriores (opcional, para evitar duplicados)
        await db.query('DELETE FROM users WHERE email = ?', [email]);

        // 4. Insertar en la tabla 'users'
        await db.query(
            `INSERT INTO users (id, first_name, last_name, email, password_hash, role, active, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
            [id, 'Alejandro', 'Gracia', email, password_hash, 'ADMIN', 1]
        );

        console.log("-----------------------------------------");
        console.log("✅ ¡USUARIO CREADO EXITOSAMENTE!");
        console.log(`📧 Correo: ${email}`);
        console.log(`🔑 Contraseña: ${passwordPlana}`);
        console.log("-----------------------------------------");
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error al crear el admin:", error.message);
        process.exit(1);
    }
};

crearAdmin();