<?php
header('Content-Type: application/json; charset=utf-8');
include 'database.php';

if (!$conn || $conn->connect_error) {
    echo json_encode(['error' => 'Error de conexión con la base de datos']);
    exit;
}

// Obtener los datos enviados por JavaScript (JSON)
$data = json_decode(file_get_contents("php://input"), true);

$nombre = trim($data['nombre'] ?? ''); // Sanitización básica (eliminar espacios)
$tipoNegocio = $data['tipoNegocio'] ?? '';
$capitalInicial = $data['capitalInicial'] ?? '';

// Validar que no vengan vacíos
if (empty($nombre) || empty($tipoNegocio) || empty($capitalInicial)) {
    echo json_encode(['error' => 'Faltan datos obligatorios']);
    exit;
}

// Validar tipos de datos (opcional)
if (!is_numeric($tipoNegocio) || !is_numeric($capitalInicial)) {
    echo json_encode(['error' => 'Los campos Tipo de Negocio y Capital Inicial deben ser números']);
    exit;
}

// Preparar la consulta para insertar el nuevo negocio
$sql = "INSERT INTO negocios (nombre, tipo_negocio_id, capital_id) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $nombre, $tipoNegocio, $capitalInicial);

// Ejecutar la consulta y manejar respuesta
if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Negocio creado exitosamente']);
} else {
    echo json_encode(['error' => 'Error al crear el negocio', 'detalles' => $stmt->error]); // Añadiendo detalles del error para depuración
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>