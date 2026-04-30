import express from "express";
import cors from "cors";

// 1. IMPORTAR LAS RUTAS (Aquí es donde estaba el fallo)
import authRoutes from './routes/auth.route.js';
import usuarioRoutes from './routes/usuarios.route.js';
import dashboardRoutes from './routes/dashboard.route.js'; // <-- ASEGÚRATE DE QUE ESTA LÍNEA EXISTA

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 2. CONECTAR LAS RUTAS CON LA API
app.use('/api', authRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', dashboardRoutes); // <-- AQUÍ SE ACTIVA LA CONEXIÓN

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor del Cacique corriendo en http://localhost:${PORT}`);
});