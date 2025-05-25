<?php
session_start();
include 'database.php'; 

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Jugador no autenticado"]);
    exit;
}

$jugador_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

// Variables recibidas desde el JS
$monto = $data['monto'] ?? 0;
$monto_del_prestamo = $data['monto_del_prestamo'] ?? 0;
$monto_de_cuotas = $data['monto_de_cuotas'] ?? 0;
$numero_cuotas = $data['numero_cuotas'] ?? 0;

if ($monto <= 0 || $monto_del_prestamo <= 0 || $monto_de_cuotas <= 0 || $numero_cuotas <= 0) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

// Verificar si ya tiene préstamo activo
$stmt = $conn->prepare("SELECT id FROM prestamos WHERE jugador_id = ? AND cuotas_pagas < numero_cuotas");
$stmt->bind_param("i", $jugador_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Ya tienes un préstamo activo"]);
    exit;
}

$conn->begin_transaction();

try {
    // 1. Insertar préstamo
    $stmt = $conn->prepare("INSERT INTO prestamos (jugador_id, monto, monto_del_prestamo, monto_de_cuotas, numero_cuotas, cuotas_pagas) VALUES (?, ?, ?, ?, ?, 0)");
    $stmt->bind_param("iiiii", $jugador_id, $monto, $monto_del_prestamo, $monto_de_cuotas, $numero_cuotas);
    $stmt->execute();

    // 2. Actualizar saldo del negocio
    $stmt = $conn->prepare("UPDATE negocios SET saldo = saldo + ? WHERE jugador_id = ?");
    $stmt->bind_param("ii", $monto, $jugador_id);
    $stmt->execute();

    $conn->commit();
    echo json_encode(["success" => true, "message" => "Préstamo guardado y saldo actualizado"]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Error al guardar: " . $e->getMessage()]);
}
?>



