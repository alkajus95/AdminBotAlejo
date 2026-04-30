import db from '../config/database.js';

export const getDashboard = async (req, res) => {

}

export const createDashboard = async (req, res) => {
    const [students] = await db.query('SELECT COUNT (*) AS count FROM students');
    
    const [pendingPayments] = await db.query("SELECT COUNT (*) AS count FROM payments WHERE status = 'pending'");

    const [absencesToday] = await db.query("SELECT COUNT (*) AS count FROM absences WHERE date = CURDATE() AND status = 'abbsent'");

    return{
        totalStudents: students[0].total,
        pendingPayments: pendingPayments[0].total,
        absencesToday: absencesToday[0].total
    }

}