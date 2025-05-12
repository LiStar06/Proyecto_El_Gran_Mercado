
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - El Gran Mercado</title>
    <link rel="shortcut icon" href="../Imagenes/logo.png">
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/estilos_crear_cuenta.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body class="fondo">
    <div class="transicion-pagina">
        <img src="../Imagenes/logo.png" alt="Logo" class="transicion-logo">
    </div>

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
        <div class="contenedor-crear-cuenta">
            <div class="tarjeta-registro">
                <div class="encabezado-tarjeta">
                    <img src="../Imagenes/logo.png" alt="Logo" class="logo-tarjeta">
                    <h1>Registro de Mercader</h1>
                    <p class="subtitulo">Comienza tu aventura en el gran mercado</p>
                </div>

                <form id="registroForm" class="formulario-registro" method="POST" novalidate>
                    <!-- Campo Nombre -->
                    <div class="grupo-formulario">
                        <div class="etiqueta-contenedor">
                            <label for="nombre_del_jugador">
                                <span class="texto-etiqueta">Nombre completo</span>
                                <button type="button" class="icono-info" aria-label="Información" data-tooltip="Usa tu nombre real o de personaje (3-20 caracteres)">?</button>
                            </label>
                        </div>
                        <div class="input-con-icono">
                            <img src="../Imagenes/user-icon.png" alt="Nombre" class="icono-campo">
                            <input type="text" id="nombre_del_jugador" name="nombre" placeholder="Ej: Alfonso de Mercado" minlength="3" maxlength="20" required>
                            <div class="efecto-subrayado"></div>
                            <div class="icono-validacion"></div>
                        </div>
                        <div class="mensaje-error"></div>
                    </div>

                    <!-- Campo Correo -->
                    <div class="grupo-formulario">
                        <div class="etiqueta-contenedor">
                            <label for="usuario">
                                <span class="texto-etiqueta">Correo electrónico</span>
                                <button type="button" class="icono-info" aria-label="Información" data-tooltip="Usaremos este correo para mantener tu partida activa">?</button>
                            </label>
                        </div>
                        <div class="input-con-icono">
                            <img src="../Imagenes/correo-icon.png" alt="Correo" class="icono-campo">
                            <input type="email" id="usuario" name="usuario" placeholder="ejemplo@elgranmercado.com" required>
                            <div class="efecto-subrayado"></div>
                            <div class="icono-validacion"></div>
                        </div>
                        <div class="mensaje-error"></div>
                    </div>

                    <!-- Campo Contraseña -->
                    <div class="grupo-formulario">
                        <div class="etiqueta-contenedor">
                            <label for="password">
                                <span class="texto-etiqueta">Contraseña</span>
                                <button type="button" class="icono-info" aria-label="Información" data-tooltip="Mínimo 6 caracteres, usa mayúsculas y números">?</button>
                            </label>
                        </div>
                        <div class="input-con-icono">
                            <img src="../Imagenes/contraseña-icon.png" alt="Contraseña" class="icono-campo">
                            <input type="password" id="password" name="password" placeholder="••••••" minlength="6" required>
                            <button type="button" class="btn-ver-contrasena" aria-label="Mostrar contraseña">
                                <img src="../Imagenes/ver-icon.png" alt="Ver contraseña" class="icono-ojo">
                            </button>
                            <div class="efecto-subrayado"></div>
                            <div class="icono-validacion"></div>
                        </div>
                        <div class="mensaje-error"></div>
                        <div class="indicador-fortaleza">
                            <div class="niveles-fortaleza">
                                <div class="nivel" data-nivel="1"></div>
                                <div class="nivel" data-nivel="2"></div>
                                <div class="nivel" data-nivel="3"></div>
                                <div class="nivel" data-nivel="4"></div>
                            </div>
                            <span class="texto-fortaleza">Seguridad: <span class="valor-fortaleza">baja</span></span>
                        </div>
                    </div>

                    <div class="contenedor-botones">
                        <button type="button" class="btn-secundario action-btn "  onclick="transicionPagina('index.php')" id="btnVolver">
                            <img src="../Imagenes/inicio-icon.png" class="btn-icon" alt="Volver">
                            <span>Volver</span>
                        </button>
                        <button type="submit" class="btn-principal  action-btn contenedor-icon" id="btnRegistrar">
                            <img src="../Imagenes/registrar-icon.png" class="btn-icon" alt="Registrar">
                            <span>Crear cuenta</span>
                        </button>
                    </div>
                </form>

                <div class="pie-formulario">
                    <p>¿Ya tienes cuenta? <a href="p_iniciar_sesion.php" class="enlace-login">Inicia sesión aquí</a></p>
                </div>
            </div>
        </div>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/crear_registro.js"></script>
</body>
</html>