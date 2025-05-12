<?php
session_start();
$_SESSION = []; // Vacía el array de sesión

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy(); // Destruye la sesión

header("Location: /Proyecto_El_Gran_Mercado/Public/Html/p_iniciar_sesion.php"); // Redirige al login o página principal
exit;
