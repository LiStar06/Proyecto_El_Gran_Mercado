<?php
$conexion = new mysqli("localhost", "root", "", "el_gran_mercado");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$ofertas = [
    1 => 'Descuento del 10% en productos lácteos',
    2 => 'Compra 2 y lleva 3 en herramientas manuales',
    3 => '20% de descuento en vitaminas y suplementos',
    4 => 'Hasta 50% de descuento por liquidación de temporada'
];

$fecha_inicio = date("Y-m-d");
$fecha_fin = date("Y-m-d", strtotime("+7 days"));

foreach ($ofertas as $id_negocio => $descripcion) {
    $stmt = $conexion->prepare("INSERT INTO eventos (id_negocio, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $id_negocio, $descripcion, $fecha_inicio, $fecha_fin);
    $stmt->execute();
}

echo "Ofertas insertadas correctamente.";
$conexion->close();
?>