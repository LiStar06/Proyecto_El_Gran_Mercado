<?php
session_start();
header('Content-Type: application/json');
include 'database.php';

// Recibir datos del formulario
$nombre = trim($_POST['nombre']);
$email = trim($_POST['usuario']); // del input "usuario" (correo electrónico)
$password = trim($_POST['password']);

// Validaciones básicas
if (empty($nombre) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

if (strlen($password) < 8) {
    echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 8 caracteres.']);
    exit;
}

// Verificar si el correo ya existe
$sql_verificar = "SELECT * FROM jugadores WHERE correo_electronico = ?";
$stmt_verificar = $conn->prepare($sql_verificar);
$stmt_verificar->bind_param("s", $email);
$stmt_verificar->execute();
$result_verificar = $stmt_verificar->get_result();

if ($result_verificar->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'El correo electrónico ya está registrado.']);
    exit;
}

// Hashear la contraseña
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Valores por defecto
$nivel = 1;
$puntos_experiencia = 0;
$fecha_creacion = date('Y-m-d H:i:s');

// Insertar en la tabla 'usuarios'
$sql_insert = "INSERT INTO jugadores (nombre_usuario, correo_electronico, contrasena_hash, nivel, puntos_experiencia, fecha_creacion)
               VALUES (?, ?, ?, ?, ?, ?)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("sssiss", $nombre, $email, $hashed_password, $nivel, $puntos_experiencia, $fecha_creacion);

// Ejecutar inserción
if ($stmt_insert->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registro completado con éxito.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario.']);
}

$_SESSION['user_id'] = $conn->insert_id; // Guardar el ID del nuevo jugador en la sesión

// Cerrar conexiones
$stmt_verificar->close();
$stmt_insert->close();
$conn->close();
?>

