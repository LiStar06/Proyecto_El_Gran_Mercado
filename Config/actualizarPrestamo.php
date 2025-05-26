<?php
session_start();
include 'database.php';
header('Content-Type: application/json');

$jugador_id = $_SESSION['user_id'] ?? null;

if (!$jugador_id) {
    echo json_encode(["success" => false, "message" => "Usuario no autenticado"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$cuotasPagadasNuevas = $data['numero_cuotas'] ?? 0;
$montoPagado = $data['monto'] ?? 0;

if ($cuotasPagadasNuevas <= 0 || $montoPagado <= 0) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

// Iniciar transacción
$conn->begin_transaction();

try {
    // Obtener préstamo activo
    $stmt = $conn->prepare("SELECT id, monto, numero_cuotas, cuotas_pagas FROM prestamos WHERE jugador_id = ? AND cuotas_pagas < numero_cuotas LIMIT 1");
    $stmt->bind_param("i", $jugador_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception("No hay préstamo activo");
    }

    $prestamo = $result->fetch_assoc();

    $cuotasRestantes = $prestamo['numero_cuotas'] - $prestamo['cuotas_pagas'];
    $cuotasAplicables = min($cuotasPagadasNuevas, $cuotasRestantes);
    $nuevoMonto = max(0, $prestamo['monto'] - $montoPagado);
    $nuevasCuotasPagas = $prestamo['cuotas_pagas'] + $cuotasAplicables;

    // Actualizar préstamo
    $update = $conn->prepare("UPDATE prestamos SET monto = ?, cuotas_pagas = ? WHERE id = ?");
    $update->bind_param("dii", $nuevoMonto, $nuevasCuotasPagas, $prestamo['id']);
    $update->execute();

    // Restar del saldo del negocio del jugador
    $updateSaldo = $conn->prepare("UPDATE negocios SET saldo = saldo - ? WHERE jugador_id = ?");
    $updateSaldo->bind_param("di", $montoPagado, $jugador_id);
    $updateSaldo->execute();

    $conn->commit();
    echo json_encode(["success" => true, "message" => "Préstamo y saldo actualizados correctamente"]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}

