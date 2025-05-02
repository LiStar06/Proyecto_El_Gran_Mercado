<?php
header('Content-Type: application/json; charset=utf-8');
include 'database.php';

if (!$conn || $conn->connect_error) {
    echo json_encode(['error' => 'Error de conexión con la base de datos']);
    exit;
}

$sql = "SELECT id_negocio_juego AS id, categoria AS nombre FROM negocios_juego GROUP BY categoria";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['error' => 'Error al consultar los tipos de negocio']);
    exit;
}

if ($result->num_rows === 0) {
    echo json_encode([]); // Devolver un array JSON vacío si no hay tipos de negocio
    exit;
}

$tipos = array();
while ($row = $result->fetch_assoc()) {
    $tipos[] = $row;
}

echo json_encode($tipos);
$conn->close();
exit;
?>