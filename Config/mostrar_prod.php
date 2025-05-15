<?php
session_start();
header('Content-Type: application/json');
require_once 'database.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

$jugador_id = $_SESSION['user_id'];

try {
    // Obtener el negocio activo del jugador
    $stmt = $conn->prepare("SELECT id, nombre, tipo_negocio_id FROM negocios WHERE jugador_id = ? LIMIT 1");
    $stmt->bind_param("i", $jugador_id);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($negocio = $resultado->fetch_assoc()) {
        $negocio_id = $negocio['id'];
        $nombre_negocio = $negocio['nombre'];
        $tipo_negocio_id = $negocio['tipo_negocio_id'];

        // Mapear el tipo_negocio_id a categoría de productos
        $categoria = '';
        switch ($tipo_negocio_id) {
            case 1:
                $categoria = 'Joyería';
                break;
            case 2:
                $categoria = 'Ropa';
                break;
            case 3:
                $categoria = 'Víveres';
                break;
            default:
                echo json_encode(['success' => false, 'message' => 'Tipo de negocio no reconocido']);
                exit;
        }

        // Obtener productos de la categoría correspondiente
        $stmt = $conn->prepare("SELECT id, nombre, precio_base FROM productos WHERE categoria = ?");
        $stmt->bind_param("s", $categoria);
        $stmt->execute();
        $resultado = $stmt->get_result();

        $productos = [];
        while ($row = $resultado->fetch_assoc()) {
            $productos[] = [
                "id" => $row["id"],
                "nombre" => $row["nombre"],
                "precio" => $row["precio_base"]
            ];
        }

        echo json_encode([
            "success" => true,
            "negocio_id" => $negocio_id,
            "nombre_negocio" => $nombre_negocio,
            "productos" => $productos
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró un negocio para este jugador']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>


