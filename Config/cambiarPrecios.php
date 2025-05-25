<?php
session_start(); 
include 'database.php';

// Verifica que el jugador haya iniciado sesión
if (!isset($_SESSION["user_id"])) {
    echo "Jugador no autenticado.";
    exit;
}

$jugador_id = $_SESSION["user_id"];



// Validar método y entrada
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $producto_id = $_POST["producto_id"];
    $nuevo_precio = $_POST["nuevo_precio"];

    if (!is_numeric($nuevo_precio)) {
        echo "Precio no válido.";
        exit;
    }

    // Obtener el negocio asociado al jugador
    $stmt = $conn->prepare("SELECT id FROM negocios WHERE jugador_id = ? LIMIT 1");
    $stmt->bind_param("i", $jugador_id);
    $stmt->execute();
    $stmt->bind_result($negocio_id);
    $stmt->fetch();
    $stmt->close();

    if (!$negocio_id) {
        echo "No se encontró un negocio asociado al jugador.";
        exit;
    }

    // Validar que el producto pertenece al negocio 
    $stmt = $conn->prepare("SELECT id FROM productos_negocio WHERE negocio_id = ? AND producto_id = ?");
    $stmt->bind_param("ii", $negocio_id, $producto_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        echo "El producto no pertenece a este negocio.";
        $stmt->close();
        exit;
    }
    $stmt->close();

    // Actualizar el precio base del producto (en la tabla productos)
    $stmt = $conn->prepare("UPDATE productos_negocio SET precio_venta = ? WHERE producto_id = ?");
    $stmt->bind_param("di", $nuevo_precio, $producto_id);

    if ($stmt->execute()) {
        echo "Precio actualizado correctamente.";
    } else {
        echo "Error al actualizar: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Método no permitido.";
}

$conn->close();
?>

