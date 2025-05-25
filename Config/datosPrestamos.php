<?php
session_start();
include 'database.php';

header('Content-Type: application/json');

$jugador_id = $_SESSION['user_id'] ?? null;

if (!$jugador_id) {
    echo json_encode(["success" => false, "message" => "Usuario no autenticado"]);
    exit;
}


$query = "SELECT monto, monto_del_prestamo, monto_de_cuotas, numero_cuotas, cuotas_pagas FROM prestamos WHERE jugador_id = ? LIMIT 1";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $jugador_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "No hay préstamo"]);
    exit;
}

$data = $result->fetch_assoc();

$cuotas_pendientes = $data['numero_cuotas'] - $data['cuotas_pagas'];
$valor_pendiente = $data['monto'] - ($data['monto_de_cuotas'] * $data['cuotas_pagas']);
$montoAPagar = $data['monto_de_cuotas']; // Monto total con interés

echo json_encode([
    "success" => true,
    "valorPendiente" => round($valor_pendiente, 2),
    "cuotasPendientes" => $cuotas_pendientes,
    "montoAPagar" => $montoAPagar
]);
