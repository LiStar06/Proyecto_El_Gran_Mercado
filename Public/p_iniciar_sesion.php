<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imagen Completa</title>
    <link rel="stylesheet" href="estilos_iniciar_ses.css"> 
</head>
<body>
    <div class="fondo">
        <section id = "Caja_de_contenido">
            <img id = "Logo" src="logo.png" alt="Logo">
            <h1 id="Titulo">Iniciar Sesión</h1>

            <form action="" method="POST">
                <label for="usuario">Correo electronico <br></label>
                <input type="text" id="usuario" name="usuario" required>
                <br><br>
                <label for="password">Contraseña <br></label>
                <input type="password" id="password" name="password" required>
                <br>
                <button type="submit">Ingresar</button>
            </form>
            <h4>No tienes una cuenta? <a href="p_crear_cuenta.php">Crear cuenta</a>.</h4>
        </section>
    </div>
</body>
</html>