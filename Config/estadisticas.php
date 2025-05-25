<?php
session_start();
header('Content-Type: application/json');
include 'database.php';


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'No autenticado']);
    exit;
}

$jugador_id = $_SESSION['user_id'];

// Obtener ID del negocio del jugador
$sqlNegocio = "SELECT id FROM negocios WHERE jugador_id = ? LIMIT 1";
$stmt = $conn->prepare($sqlNegocio);
$stmt->bind_param("i", $jugador_id);
$stmt->execute();
$result = $stmt->get_result();
$negocio = $result->fetch_assoc();
$negocio_id = $negocio['id'] ?? null;
$stmt->close();
function obtenerNombreNegocio($conn, $jugador_id) {
    $sql = "SELECT nombre FROM negocios WHERE jugador_id = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $jugador_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $nombre = $result->fetch_assoc()['nombre'] ?? null;
    $stmt->close();
    return $nombre;
}

if (!$negocio_id) {
    echo json_encode(['error' => 'Negocio no encontrado']);
    exit;
}

$response = [];
$response['nombre_negocio'] = obtenerNombreNegocio($conn, $jugador_id);

// ---------- Inventario desde productos_negocio ----------
$sqlInv = "SELECT COUNT(*) AS tipos, SUM(cantidad) AS total_stock,
                  MAX(cantidad) AS max_stock, MIN(cantidad) AS min_stock
           FROM productos_negocio WHERE negocio_id = ?";
$stmt = $conn->prepare($sqlInv);
$stmt->bind_param("i", $negocio_id);
$stmt->execute();
$result = $stmt->get_result();
$inv = $result->fetch_assoc();
$response['inventario'] = $inv;

// Productos con más y menos stock
$sqlProductos = "SELECT p.nombre, pn.cantidad 
                 FROM productos_negocio pn 
                 JOIN productos p ON pn.producto_id = p.id 
                 WHERE pn.negocio_id = ? 
                 ORDER BY pn.cantidad DESC";
$stmt = $conn->prepare($sqlProductos);
$stmt->bind_param("i", $negocio_id);
$stmt->execute();
$productos = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$response['mas_stock'] = $productos[0]['nombre'] ?? 'Ninguno';
$response['menos_stock'] = $productos[array_key_last($productos)]['nombre'] ?? 'Ninguno';

// ---------- Ventas desde transacciones ----------
$sqlVentas = "SELECT SUM(precio_total) AS total_ventas 
              FROM transacciones 
              WHERE negocio_id = ? AND tipo = 'venta'";
$stmt = $conn->prepare($sqlVentas);
$stmt->bind_param("i", $negocio_id);
$stmt->execute();
$response['ventas'] = floatval($stmt->get_result()->fetch_assoc()['total_ventas'] ?? 0);


// ---------- Compras desde transacciones ----------
$sqlCompras = "SELECT SUM(precio_total) AS total_compras 
               FROM transacciones 
               WHERE negocio_id = ? AND tipo = 'compra'";
$stmt = $conn->prepare($sqlCompras);
$stmt->bind_param("i", $negocio_id);
$stmt->execute();
$response['compras'] = floatval($stmt->get_result()->fetch_assoc()['total_compras'] ?? 0);


// ---------- Beneficio y margen ----------
$response['beneficio'] = $response['ventas'] - $response['compras'];
$response['margen'] = $response['ventas'] > 0
    ? round(($response['beneficio'] / $response['ventas']) * 100)
    : 0;

// ---------- Top producto vendido ----------
$sqlTopProd = "SELECT p.nombre, SUM(t.cantidad) AS total 
               FROM transacciones t
               JOIN productos p ON t.producto_id = p.id
               WHERE t.negocio_id = ? AND t.tipo = 'venta'
               GROUP BY p.nombre ORDER BY total DESC LIMIT 1";
$stmt = $conn->prepare($sqlTopProd);
$stmt->bind_param("i", $negocio_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
$response['top_producto'] = $result['nombre'] ?? 'Ninguno';

// ---------- Cliente frecuente desde ventas ----------
$sqlCliente = "SELECT c.nombre, COUNT(*) AS total 
               FROM ventas v 
               JOIN clientes c ON v.cliente_id = c.id
               WHERE v.negocio_id = ?
               GROUP BY c.id ORDER BY total DESC LIMIT 1";
$stmt = $conn->prepare($sqlCliente);
$stmt->bind_param("i", $negocio_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
$response['top_cliente'] = $result['nombre'] ?? 'Ninguno';

// ---------- Enviar respuesta ----------
echo json_encode($response);
$conn->close();

