<?php
session_start();
header('Content-Type: application/json');
include 'database.php';

if (!$conn || $conn->connect_error) {
    echo json_encode(['error' => 'Error de conexión con la base de datos']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Jugador no autenticado']);
    exit;
}

$jugador_id = $_SESSION['user_id'];

// Obtener el negocio del jugador
$sqlNegocio = "SELECT id, tipo_negocio_id FROM negocios WHERE jugador_id = ? LIMIT 1";
$stmt = $conn->prepare($sqlNegocio);
$stmt->bind_param("i", $jugador_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'Negocio del jugador no encontrado']);
    exit;
}

$row = $result->fetch_assoc();
$tipo_negocio_id = $row['tipo_negocio_id'];
$negocio_id = $row['id'];

// Obtener los clientes relacionados a ese tipo de negocio
$query = "
    SELECT c.id AS cliente_id, c.nombre AS cliente_nombre, c.tipo_negocio_id, tn.nombre AS tipo_negocio
    FROM clientes c
    JOIN tipos_negocio tn ON c.tipo_negocio_id = tn.id
    WHERE c.tipo_negocio_id = ?
";

$stmtClientes = $conn->prepare($query);
$stmtClientes->bind_param("i", $tipo_negocio_id);
$stmtClientes->execute();
$resultado = $stmtClientes->get_result();

$clientes = [];

while ($cliente = $resultado->fetch_assoc()) {
    // Obtener productos aleatorios según categoría (nombre del tipo_negocio)
    $productos_query = "
        SELECT 
            p.id, 
            p.nombre, 
            p.categoria,
            COALESCE(pn.cantidad, 0) AS cantidad_disponible,
            COALESCE(pn.precio_venta, 0) AS precio_venta
        FROM productos p
        LEFT JOIN productos_negocio pn 
            ON pn.producto_id = p.id AND pn.negocio_id = ?
        WHERE p.categoria = (
            SELECT nombre FROM tipos_negocio WHERE id = ?
        )
        ORDER BY RAND()
        LIMIT 3
    ";

    $stmtProd = $conn->prepare($productos_query);
    $stmtProd->bind_param("ii", $negocio_id, $tipo_negocio_id);
    $stmtProd->execute();
    $productos_result = $stmtProd->get_result();

    $productos = [];

    while ($producto = $productos_result->fetch_assoc()) {
        $producto['cantidad_pedida'] = rand(1, 10); // cantidad aleatoria del pedido
        $productos[] = $producto;
    }

    $cliente['productos_pedidos'] = $productos;
    $clientes[] = $cliente;
}

echo json_encode($clientes);
$conn->close();


