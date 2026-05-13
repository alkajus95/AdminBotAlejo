import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import studentRoutes from './routes/students.route.js';
import acudienteRoutes from './routes/acudientes.route.js';
import pagoRoutes from './routes/pagos.route.js';
import asistenciaRoutes from './routes/asistencias.route.js';
import notificacionRoutes from './routes/notificaciones.route.js';
import whatsappRoutes from "./modules/whatsapp/whatsapp.routes.js";
import authRoutes from './routes/auth.route.js';
import usuarioRoutes from './routes/usuarios.route.js';
import dashboardRoutes from './routes/dashboard.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', studentRoutes);
app.use('/api', acudienteRoutes);
app.use('/api', pagoRoutes);
app.use('/api', asistenciaRoutes);
app.use('/api', notificacionRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use('/api', authRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor del Cacique corriendo en http://localhost:${PORT}`);
});