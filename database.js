const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tickets.db');

// Crear tabla de tickets
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        area TEXT,
        solicitud TEXT,
        fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        responsable TEXT,
        fecha_aceptacion TIMESTAMP,
        estado TEXT DEFAULT 'Pendiente',
        fecha_cierre TIMESTAMP
    )`);
});

module.exports = db;
