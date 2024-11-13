const express = require('express');
const db = require('../db/database');
const xlsx = require('xlsx');
const router = express.Router();

// Ruta para ver tickets pendientes
router.get('/tickets', (req, res) => {
    db.all("SELECT * FROM tickets WHERE estado = 'Pendiente'", [], (err, rows) => {
        if (err) return res.status(500).send("Error al recuperar tickets");
        res.json(rows);
    });
});

// Ruta para asignar responsable y aceptar ticket
router.post('/accept', (req, res) => {
    const { id, responsable } = req.body;
    db.run(`UPDATE tickets SET responsable = ?, estado = 'Aceptado', fecha_aceptacion = CURRENT_TIMESTAMP WHERE id = ?`, [responsable, id], function(err) {
        if (err) return res.status(500).send("Error al aceptar el ticket");
        res.redirect('/admin.html');
    });
});

// Ruta para cerrar ticket
router.post('/close', (req, res) => {
    const { id } = req.body;
    db.run(`UPDATE tickets SET estado = 'Cerrado', fecha_cierre = CURRENT_TIMESTAMP WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).send("Error al cerrar el ticket");
        res.redirect('/admin.html');
    });
});

// Ruta para exportar a Excel
router.get('/download', (req, res) => {
    db.all("SELECT * FROM tickets", [], (err, rows) => {
        if (err) return res.status(500).send("Error al exportar tickets");
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(rows);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Tickets");

        const filename = "tickets_report.xlsx";
        xlsx.writeFile(workbook, filename);
        res.download(filename);
    });
});

module.exports = router;
