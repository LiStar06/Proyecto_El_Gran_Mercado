const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

// Configura los datos de conexión a tu base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'basededatos'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar con la BD:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Endpoint para obtener el inventario
app.get('/api/inventario', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener inventario:', err);
            res.status(500).send('Error del servidor');
        } else {
            res.json(results);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
