<?php
session_start();
include 'database.php'; // Aquí debe estar tu conexión mysqli

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "No se ha iniciado sesión."
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // Función auxiliar para obtener múltiples filas
    function obtenerFilas($conn, $query, $param) {
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $param);
        $stmt->execute();
        $resultado = $stmt->get_result();
        $filas = [];

        while ($fila = $resultado->fetch_assoc()) {
            $filas[] = $fila;
        }

        $stmt->close();
        return $filas;
    }

    // Productos más vendidos
    $masVendidos = obtenerFilas($conn, "
        SELECT p.nombre, SUM(t.cantidad) AS cantidad, AVG(t.precio_unitario) AS precio
        FROM transacciones t
        JOIN productos p ON t.producto_id = p.id
        WHERE t.tipo = 'venta' AND t.jugador_id = ?
        GROUP BY t.producto_id
        ORDER BY cantidad DESC
        LIMIT 10", $user_id);

    // Productos menos vendidos
    $menosVendidos = obtenerFilas($conn, "
        SELECT p.nombre, SUM(t.cantidad) AS cantidad, AVG(t.precio_unitario) AS precio
        FROM transacciones t
        JOIN productos p ON t.producto_id = p.id
        WHERE t.tipo = 'venta' AND t.jugador_id = ?
        GROUP BY t.producto_id
        ORDER BY cantidad ASC
        LIMIT 10", $user_id);

    // Total invertido
    $stmt = $conn->prepare("SELECT SUM(precio_total) AS total_invertido FROM transacciones WHERE tipo = 'compra' AND jugador_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($total_invertido);
    $stmt->fetch();
    $stmt->close();
    $total_invertido = $total_invertido ?? 0;

    // Total ventas
    $stmt = $conn->prepare("SELECT SUM(precio_total) AS total_ventas FROM transacciones WHERE tipo = 'venta' AND jugador_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($total_ventas);
    $stmt->fetch();
    $stmt->close();
    $total_ventas = $total_ventas ?? 0;

    $ganancias_netas = $total_ventas - $total_invertido;

    echo json_encode([
        "success" => true,
        "masVendidos" => $masVendidos,
        "menosVendidos" => $menosVendidos,
        "totalVentas" => $total_ventas,
        "totalInvertido" => $total_invertido,
        "gananciasNetas" => $ganancias_netas
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>


