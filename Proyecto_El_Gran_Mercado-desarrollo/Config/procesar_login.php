<?php
header('Content-Type: application/json');

include 'database.php'; // Asegúrate de que la conexión a la base de datos esté incluida

// Recibir los datos del formulario
$email = trim($_POST['usuario']);
$password = trim($_POST['password']);

// Validaciones básicas
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor, complete todos los campos.']);
    exit;
}

// Consultar la base de datos para encontrar al usuario
$sql = "SELECT * FROM usuarios u JOIN credenciales c ON u.id_usuario = c.id_usuario WHERE u.email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Si el usuario existe
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verificar la contraseña
    if (password_verify($password, $user['password_hash'])) {
        // Iniciar sesión (puedes almacenar el ID de usuario en una sesión o cookie)
        session_start();
        $_SESSION['user_id'] = $user['id_usuario'];
        $_SESSION['username'] = $user['nombre']; // Puedes agregar más datos si los necesitas

        echo json_encode(['success' => true, 'message' => '¡Inicio de sesión exitoso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'El correo electrónico no está registrado.']);
}

$stmt->close();
$conn->close();
?>
