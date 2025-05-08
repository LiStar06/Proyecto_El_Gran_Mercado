<?php
header('Content-Type: application/json; charset=utf-8');
error_log("Se accedió al archivo obtenerCapitales.php");
include 'database.php';

if (!$conn || $conn->connect_error) {
    echo json_encode(['error' => 'Error de conexión con la base de datos']);
    exit;
}

$sql = "SELECT DISTINCT id_negocio_juego AS id, capital_inicial AS monto FROM negocios_juego";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['error' => 'Error al consultar los capitales']);
    exit;
}

if ($result->num_rows === 0) {
    echo json_encode([]); // Devolver un array JSON vacío si no hay capitales registrados
    exit;
}

$capitales = array();
while ($row = $result->fetch_assoc()) {
    $capitales[] = $row;
}

echo json_encode($capitales);
$conn->close();
exit;
?>