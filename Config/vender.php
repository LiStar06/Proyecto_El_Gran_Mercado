<?php
session_start();
header('Content-Type: application/json');
include 'database.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Jugador no autenticado']);
    exit;
}

$jugador_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

// Validar datos recibidos
$cliente_id = $data['cliente_id'] ?? null;
$producto_id = $data['producto_id'] ?? null;
$cantidad = $data['cantidad'] ?? 0;
$precio_unitario = $data['precio_unitario'] ?? 0;
$monto = $data['monto_total'] ?? 0;
// error_log(print_r($data, true));


if (!$cliente_id || !$producto_id || $cantidad <= 0 || $precio_unitario <= 0 || $monto <= 0) {
    echo json_encode(['error' => 'Datos inválidos']);
    exit;
}

// Obtener el negocio del jugador
$sqlNegocio = "SELECT id FROM negocios WHERE jugador_id = ? LIMIT 1";
$stmtNegocio = $conn->prepare($sqlNegocio);
$stmtNegocio->bind_param("i", $jugador_id);
$stmtNegocio->execute();
$resultNegocio = $stmtNegocio->get_result();

if ($resultNegocio->num_rows === 0) {
    echo json_encode(['error' => 'Negocio del jugador no encontrado']);
    exit;
}

$rowNegocio = $resultNegocio->fetch_assoc();
$negocio_id = $rowNegocio['id'];
$stmtNegocio->close();

// Insertar la venta en la base de datos
$sql = "INSERT INTO ventas (jugador_id, negocio_id, cliente_id, producto_id, cantidad, precio_unitario, monto)
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiiiidd", $jugador_id, $negocio_id, $cliente_id, $producto_id, $cantidad, $precio_unitario, $monto);

$stms = $conn->prepare("INSERT INTO transacciones 
    (negocio_id, producto_id, tipo, cantidad, precio_unitario, precio_total, fecha, jugador_id) 
    VALUES (?, ?, 'venta', ?, ?, ?, NOW(), ?)");

$stms->bind_param("iiiddi", $negocio_id, $producto_id, $cantidad, $precio_unitario, $monto, $jugador_id);
$stms->execute();


if ($stmt->execute()) {
    echo json_encode(['exito' => 'Venta registrada correctamente']);
} else {
    echo json_encode(['error' => 'Error al registrar venta: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
$stms->close();

