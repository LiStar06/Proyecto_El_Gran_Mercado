<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Gran Mercado</title>
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/estilos_iniciar_ses.css">
    <link rel="shortcut icon" href="../Imagenes/logo.png">
</head>

<body class="fondo">
    <div class="transicion-pagina">
        <img src="../Imagenes/logo.png" alt="Logo" class="transicion-logo">
    </div>
    <!-- Botón de sonido-->
    <div class="sound-control">
        <button class="sound-icon" id="sound-icon">
            <img src="../Imagenes/icono-sonido.png" alt="Sonido" class="sound-icon-img">
        </button>
        <div class="sound-menu" id="sound-menu">
            <button class="action-btn" id="btn-musica">
                <img src="../Imagenes/musica-icon.png" alt="Música" class="btn-icon">
                <span class="btn-texto">Música On</span>
            </button>
            <button class="action-btn" id="btn-efectos">
                <img src="../Imagenes/efectos-icon.png" alt="Efectos" class="btn-icon">
                <span class="btn-texto">Efectos On</span>
            </button>
        </div>
    </div>
    <div class="contenedor-iniciar-sesion">
        <div class="tarjeta-iniciar-sesion">
            <div class="encabezado-tarjeta">
                <img src="../Imagenes/logo.png" alt="Logo" class="logo-tarjeta">
                <h1>Iniciar Sesión</h1>
                <p class="subtitulo">¡Accede a tu mercado y comienza a comerciar!</p>
            </div>
            <form id="loginForm" class="formulario-iniciar-sesion" action="" method="POST">
                <div class="grupo-formulario">
                    <label class="texto-etiqueta">Correo Electrónico</label>
                    <div class="input-con-icono">
                        <img src="../Imagenes/correo-icon.png" alt="Correo" class="icono-campo">
                        <input type="email" id="usuario" name="usuario" required>
                        <span class="efecto-subrayado"></span>
                        <span class="icono-validacion"></span>
                    </div>
                    <div class="mensaje-error"></div>
                </div>
                <div class="grupo-formulario">
                    <label class="texto-etiqueta">Contraseña</label>
                    <div class="input-con-icono">
                        <img src="../Imagenes/contraseña-icon.png" alt="Contraseña" class="icono-campo">
                        <input type="password" id="password" name="password" required>
                        <button type="button" class="btn-ver-contrasena" data-tooltip="Mostrar/Ocultar contraseña">
                            <img src="../Imagenes/ver-icon.png" alt="Mostrar contraseña">
                        </button>
                        <span class="efecto-subrayado"></span>
                        <span class="icono-validacion"></span>
                    </div>
                    <div class="mensaje-error"></div>
                </div>
                <div class="contenedor-botones">
                    <button type="button" id="btnVolver" class="btn-secundario action-btn">
                        <span>Volver</span>
                    </button>
                    <button type="submit" id="btnIniciarSesion" class="btn-principal action-btn">
                        <span>Iniciar sesión</span>
                    </button>
                </div>
            </form>
            <div class="pie-formulario">
                <p>¿No tienes cuenta? <a href="p_crear_cuenta.php" class="enlace-registro">Regístrate aquí</a></p>
            </div>
        </div>
    </div>
    </div>
    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/iniciar_sesion.js"></script>
</body>

</html>