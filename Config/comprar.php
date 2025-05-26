<?php
session_start();
header('Content-Type: application/json');
require_once 'database.php';

// Verificar sesión activa
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

$jugador_id = $_SESSION['user_id'];

try {
    // Obtener el negocio activo del jugador
    $stmt = $conn->prepare("SELECT id, saldo FROM negocios WHERE jugador_id = ? LIMIT 1");
    $stmt->bind_param("i", $jugador_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$negocio = $result->fetch_assoc()) {
        echo json_encode(['success' => false, 'message' => 'No se encontró un negocio activo para este jugador']);
        exit;
    }

    $negocio_id = $negocio['id'];
    $capital_actual = $negocio['saldo'];

    // --- GET: solo devolver capital actual ---
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode(['success' => true, 'capital' => $capital_actual]);
        exit;
    }

    // --- POST: procesar compra ---
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        // Validar datos
        $producto_id = $data['producto_id'] ?? null;
        $cantidad = $data['cantidad'] ?? 0;
        $precio_unitario = $data['precio_unitario'] ?? 0;
        $precio_total = $data['precio_total'] ?? 0;
        $precioVenta = $precio_unitario * 0.20 + $precio_unitario;

        if (!$producto_id || $cantidad <= 0 || $precio_unitario <= 0 || $precio_total <= 0) {
            echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
            exit;
        }

        if ($capital_actual < $precio_total) {
            echo json_encode(['success' => false, 'message' => 'Capital insuficiente']);
            exit;
        }

        // 1. Registrar la transacción
       $stmt = $conn->prepare("INSERT INTO transacciones 
            (negocio_id, producto_id, tipo, cantidad, precio_unitario, precio_total, fecha, jugador_id) 
            VALUES (?, ?, 'compra', ?, ?, ?, NOW(), ?)");

        $stmt->bind_param("iiiddi", $negocio_id, $producto_id, $cantidad, $precio_unitario, $precio_total, $jugador_id);
        $stmt->execute();


        // 2. Actualizar el capital del negocio
        $nuevo_capital = $capital_actual - $precio_total;
        $stmt = $conn->prepare("UPDATE negocios SET saldo = ? WHERE id = ?");
        $stmt->bind_param("di", $nuevo_capital, $negocio_id);
        $stmt->execute();

        // 3. Actualizar inventario del negocio
        $stmt = $conn->prepare("SELECT cantidad FROM productos_negocio WHERE negocio_id = ? AND producto_id = ?");
        $stmt->bind_param("ii", $negocio_id, $producto_id);
        $stmt->execute();
        $res = $stmt->get_result();

        if ($row = $res->fetch_assoc()) {
            $nueva_cantidad = $row['cantidad'] + $cantidad;
            $stmt = $conn->prepare("UPDATE productos_negocio SET cantidad = ? WHERE negocio_id = ? AND producto_id = ?");
            $stmt->bind_param("iii", $nueva_cantidad, $negocio_id, $producto_id);
        } else {
            $stmt = $conn->prepare("INSERT INTO productos_negocio (negocio_id, producto_id, cantidad, precio_compra, precio_venta) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("iiidd", $negocio_id, $producto_id, $cantidad, $precio_unitario, $precioVenta);
        }
        $stmt->execute();

        echo json_encode(['success' => true, 'capital' => $nuevo_capital]);
        exit;
    }

    // Si el método no es GET ni POST
    echo json_encode(['success' => false, 'message' => 'Método HTTP no permitido']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}


