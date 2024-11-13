const express = require('express');
const db = require('../db/database');
const router = express.Router();

// Ruta para enviar un nuevo ticket
router.post('/submit', (req, res) => {
    const { nombre, area, solicitud } = req.body;
    db.run(`INSERT INTO tickets (nombre, area, solicitud) VALUES (?, ?, ?)`,
        [nombre, area, solicitud],
        function(err) {
            if (err) return res.status(500).send("Error al crear el ticket");
            res.redirect('/public/index.html'); // O redirigir a una página de éxito
        });
});

module.exports = router;
