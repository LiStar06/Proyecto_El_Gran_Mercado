<?php
$servername = "localhost"; // Cambia esto si el servidor es diferente
$username = "root"; // Usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$database = "el_gran_mercado"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos";
}
?>