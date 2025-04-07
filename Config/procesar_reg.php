<?php
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
$sql_verificar = "SELECT * FROM usuarios WHERE email = ?";
$stmt_verificar = $conn->prepare($sql_verificar);
$stmt_verificar->bind_param("s", $email);
$stmt_verificar->execute();
$result_verificar = $stmt_verificar->get_result();

if ($result_verificar->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'El correo electrónico ya está registrado.']);
    exit;
}

// Encriptar la contraseña
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Iniciar transacción
$conn->begin_transaction();

try {
    // Insertar en 'usuarios'
    $sql_usuarios = "INSERT INTO usuarios (nombre, email) VALUES (?, ?)";
    $stmt_usuarios = $conn->prepare($sql_usuarios);
    $stmt_usuarios->bind_param("ss", $nombre, $email);
    $stmt_usuarios->execute();

    $id_usuario = $stmt_usuarios->insert_id;

    // Insertar en 'credenciales'
    $sql_credenciales = "INSERT INTO credenciales (id_usuario, username, password_hash) VALUES (?, ?, ?)";
    $stmt_credenciales = $conn->prepare($sql_credenciales);
    $stmt_credenciales->bind_param("iss", $id_usuario, $email, $hashed_password); // username será el email por ahora
    $stmt_credenciales->execute();

    // Confirmar transacción
    $conn->commit();

    echo json_encode(['success' => true, 'message' => 'Registro completado con éxito.']);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario: ' . $e->getMessage()]);
}

// Cerrar conexiones
$stmt_verificar->close();
$stmt_usuarios->close();
$stmt_credenciales->close();
$conn->close();
?>
