<?php
session_start();
include 'database.php'; 

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Usuario no autenticado"]);
    exit;
}

$jugador_id = $_SESSION['user_id'];

try {
    // Obtener el tipo de negocio del jugador
    $query = "SELECT tn.saldo_inicial 
              FROM negocios n 
              JOIN tipos_negocio tn ON n.tipo_negocio_id = tn.id 
              WHERE n.jugador_id = ? 
              LIMIT 1";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $jugador_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($fila = $result->fetch_assoc()) {
        $saldo_inicial = (float)$fila['saldo_inicial'];
        $cantidad_aprobada = round($saldo_inicial * 0.70);
        $valor_cuota = round($cantidad_aprobada * 0.10);
        $cuotas = 10 + 1; // 10 cuotas de 10% + 1 adicional

        echo json_encode([
            "success" => true,
            "cantidadAprobada" => $cantidad_aprobada,
            "cantidadCuotas" => $cuotas
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Negocio no encontrado para este jugador"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
