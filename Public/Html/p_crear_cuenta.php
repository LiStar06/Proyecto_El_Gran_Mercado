<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="../Css/estilos_crear_cuenta.css"> 
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>
<body>
    <div class="fondo">
        <section id = "Caja_de_contenido">
            <img id = "Logo" src="../Imagenes/logo.png" alt="Logo">
            <h1 id="Titulo">Bienvenido al menú de Registro</h1>

            <form  id="registroForm" action="" method="POST">
                <label for="nombre_del_jugador">Nombre<br></label>
                <input type="text" id="nombre_del_jugador" name="nombre" required>
                <br><br>
                <label for="usuario">Correo electronico <br></label>
                <input type="text" id="usuario" name="usuario" required>
                <br><br>
                <label for="password">Contraseña <br></label>
                <input type="password" id="password" name="password" required>
                <br>
                <button id="Registrarse" type="submit">Registrarse</button>
            </form>
            
        </section>
    </div>
    <script src="../Javascript/crear_registro.js"></script>
</body>
</html>