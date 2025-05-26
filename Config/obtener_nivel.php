<?php
session_start();
include 'database.php';

header('Content-Type: application/json');

// Verifica si hay sesión iniciada
$jugador_id = $_SESSION['user_id'] ?? null;

if (!$jugador_id) {
    echo json_encode(["success" => false, "message" => "Usuario no autenticado"]);
    exit;
}

$sql = "SELECT nivel FROM jugadores WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $jugador_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "nivel" => $row['nivel']
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No se encontró el jugador"
    ]);
}
