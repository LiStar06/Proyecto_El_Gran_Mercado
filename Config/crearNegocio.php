<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
include 'database.php';

if (!$conn || $conn->connect_error) {
    echo json_encode(['error' => 'Error de conexión con la base de datos']);
    exit;
}

//Verificar si el jugador ha iniciado sesión
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'No has iniciado sesión.']);
    exit;
}

$jugador_id = $_SESSION['user_id'];

// Obtener los datos enviados por JavaScript (JSON)
$data = json_decode(file_get_contents("php://input"), true);

$nombre = trim($data['nombre'] ?? '');
$tipoNegocio = $data['tipoNegocio'] ?? '';
$saldo = $data['capitalInicial'] ?? '';

// Validar campos obligatorios
if (empty($nombre) || empty($tipoNegocio) || empty($saldo)) {
    echo json_encode(['error' => 'Faltan datos obligatorios']);
    exit;
}

// Validar tipo de datos
if (!is_numeric($tipoNegocio) || !is_numeric($saldo)) {
    echo json_encode(['error' => 'Los campos Tipo de Negocio y Saldo deben ser números']);
    exit;
}

// Fecha actual
$fecha_creacion = date('Y-m-d H:i:s');

// Preparar consulta SQL con el campo nombre incluido
$sql = "INSERT INTO negocios (jugador_id, nombre, tipo_negocio_id, saldo, fecha_creacion)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isids", $jugador_id, $nombre, $tipoNegocio, $saldo, $fecha_creacion);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Negocio creado exitosamente']);
} else {
    echo json_encode(['error' => 'Error al crear el negocio', 'detalles' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
