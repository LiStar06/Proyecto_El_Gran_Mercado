<?php
session_start();
include 'database.php';
header('Content-Type: application/json');

$jugador_id = $_SESSION['user_id'] ?? null;

if (!$jugador_id) {
    echo json_encode(["success" => false, "message" => "Usuario no autenticado"]);
    exit;
}

// Obtener el monto actual del préstamo activo
$stmt = $conn->prepare("SELECT monto FROM prestamos WHERE jugador_id = ? AND cuotas_pagas < numero_cuotas LIMIT 1");
$stmt->bind_param("i", $jugador_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "No hay préstamo activo"]);
    exit;
}

$row = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "montoPrestamo" => round($row['monto'], 2)
]);
