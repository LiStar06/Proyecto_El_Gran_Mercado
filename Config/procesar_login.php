<?php
session_start();
header('Content-Type: application/json');
include 'database.php'; // Conexión a la base de datos

// Recibir los datos del formulario
$email = trim($_POST['usuario']);
$password = trim($_POST['password']);

// Validaciones básicas
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor, complete todos los campos.']);
    exit;
}

// Consultar la base de datos para encontrar al usuario
$sql = "SELECT * FROM jugadores WHERE correo_electronico = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Si el usuario existe
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verificar la contraseña
    if (password_verify($password, $user['contrasena_hash'])) {
        // Iniciar sesión
        
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['nombre_usuario'] = $user['nombre_usuario'];

        echo json_encode(['success' => true, 'message' => '¡Inicio de sesión exitoso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrecta.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrecta.']);
}

// Cerrar conexiones
$stmt->close();
$conn->close();
?>
