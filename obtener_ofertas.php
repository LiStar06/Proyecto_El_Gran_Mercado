<?php
$conexion = new mysqli("localhost", "root", "", "el_gran_mercado");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$id_jugador = 1;

$sql = "
SELECT e.descripcion, e.fecha_inicio, e.fecha_fin, n.nombre_negocio
FROM eventos e
JOIN negocios n ON e.id_negocio = n.id_negocio
WHERE n.id_jugador = ? AND CURDATE() BETWEEN e.fecha_inicio AND e.fecha_fin
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_jugador);
$stmt->execute();

$resultado = $stmt->get_result();
$ofertas = [];

while ($fila = $resultado->fetch_assoc()) {
    $ofertas[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($ofertas);
$conexion->close();
?>