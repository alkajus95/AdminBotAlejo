import db from '../config/db.js';
import crypto from 'crypto';

/**
 * 1. RESUMEN DEL DASHBOARD
 * Obtiene los contadores para las tarjetas superiores.
 */
export const getDashboardSummary = async (req, res) => {
    try {
        const [total] = await db.query('SELECT COUNT(*) AS count FROM students');
        const [activos] = await db.query("SELECT COUNT(*) AS count FROM students WHERE status = 'Activo'");
        
        res.json({
            totalStudents: total[0].count,
            activeStudents: activos[0].count
        });
    } catch (error) {
        console.error("🔥 Error en getDashboardSummary:", error);
        res.status(500).json({ message: "Error al cargar el resumen" });
    }
};

/**
 * 2. LISTADO DE ALUMNOS
 * Trae a todos los integrantes para las tarjetas del grid.
 */
export const getAllStudents = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error("🔥 Error en getAllStudents:", error);
        res.status(500).json({ message: "Error al obtener la lista de alumnos" });
    }
};

/**
 * 3. ESTADÍSTICAS PARA EL GRÁFICO
 * Cuenta alumnos por estado para el Chart.js.
 */
export const getStudentStats = async (req, res) => {
    try {
        const [stats] = await db.query(`
            SELECT status, COUNT(*) as count 
            FROM students 
            GROUP BY status
        `);
        res.json(stats);
    } catch (error) {
        console.error("🔥 Error en getStudentStats:", error);
        res.status(500).json({ message: "Error al procesar estadísticas" });
    }
};

/**
 * 4. REGISTRAR NUEVO ALUMNO
 * Inserta los datos validados en la base de datos.
 */
export const createStudent = async (req, res) => {
    const { 
        student_code, 
        first_name, 
        last_name, 
        status, 
        document_type, 
        document_number, 
        birth_date 
    } = req.body;

    // Log para depuración en terminal
    console.log("📝 Intentando registrar alumno:", { first_name, last_name, document_number });

    const id = crypto.randomUUID();

    try {
        await db.query(
            `INSERT INTO students 
            (id, student_code, first_name, last_name, status, document_type, document_number, birth_date, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [id, student_code, first_name, last_name, status, document_type, document_number, birth_date]
        );
        
        res.json({ message: "Alumno guardado con éxito en el Cacique-Server" });
    } catch (error) {
        console.error("🔥 ERROR AL INSERTAR ALUMNO:", error.message);
        
        // Error específico si falta una columna en la DB
        if (error.code === 'ER_BAD_FIELD_ERROR') {
            return res.status(500).json({ message: "Error: Una columna no existe en tu tabla de MySQL." });
        }
        
        res.status(500).json({ message: "Error interno al guardar", details: error.message });
    }
};

/**
 * 5. ELIMINAR ALUMNO
 * Borra por ID. Si falla, suele ser por llaves foráneas.
 */
export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }

        res.json({ message: "Alumno removido de la Dinastía" });
    } catch (error) {
        console.error("🔥 ERROR AL ELIMINAR:", error.message);

        // Si el error es por Integridad Referencial (Foreign Key)
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ 
                message: "No se puede eliminar: Este alumno tiene pagos o asistencias registradas. Borra esos datos primero." 
            });
        }

        res.status(500).json({ message: "Error al eliminar el registro" });
    }
};