<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú Principal></title>
    <link rel="shortcut icon" href="../Imagenes/logo.png">
    <!-- Estilos generales y específicos para el menú -->
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/estilo_menu.css">
    <!-- Fuente temática -->
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet">
</head>

<body class="fondo">
    <div class="transicion-pagina">
        <img src="../Imagenes/logo.png" alt="Logo" class="transicion-logo">
    </div>
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

    <!-- Fondo temático del mercado -->
    <div class="fondo mercado-background">
        <!-- Contenedor del menú principal -->
        <div class="contenedor-menu">
            <div class="tarjeta-menu tarjeta-parchment">
                <div class="encabezado-menu">
                    <img src="../Imagenes/logo.png" alt="Logo" class="logo">
                    <h1 class="titulo-menu">Menú Principal</h1>
                    <div class="bienvenida-container">
                        <!-- Saludo personalizado con nombre de usuario -->
                        <p class="bienvenida-usuario">¡Hola Aventureros <span class="nombre-usuario"></span>!</p>
                    </div>
                </div>

                <!-- Botones de navegación del menú -->
                <div class="menu-botones">
                    <button class="btn-menu btn-glow action-btn" onclick="transicionPagina('crearnegocio.php')">
                        <img src="../Imagenes/nuevo-negocio.png" alt="Nuevo" class="btn-icono-menu">
                        <span class="btn-texto"> Nuevo Negocio</span>
                    </button>
                    <button class="btn-menu btn-glow action-btn" onclick="transicionPagina('partida.php')">
                        <img src="../Imagenes/crecimiento.png" alt="Continuar" class="btn-icono-menu">
                        <span class="btn-texto">Continuar</span>
                    </button>
                    <button class="btn-menu btn-glow action-btn" onclick="transicionPagina('p_eventos.php')">
                        <img src="../Imagenes/eventos-icon.png" alt="Eventos" class="btn-icono-menu">
                        <span class="btn-texto">Eventos</span>
                    </button>
                    <button class="btn-menu btn-salir btn-glow action-btn" id="btnSalir">
                        <div class="btn-icono-menu">
                            <img src="../Imagenes/salir-icon.png" alt="Salir">
                        </div>
                        <span class="btn-texto">Salir</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de confirmación para salir -->
    <div class="modal-confirmacion" id="modalSalir">
        <div class="modal-contenido tarjeta-parchment">
            <div class="modal-cerrar" id="cerrarModal">×</div>
            <img src="../Imagenes/icono-error.png" class="modal-icono">
            <h3>¿Abandonar el Mercado?</h3>
            <div class="modal-botones">
                <button class="modal-btn btn-cancelar btn-glow">
                    <img src="../Imagenes/cancelar-icon.png" class="modal-icono-btn" alt="Cancelar">
                    <span>Cancelar</span>
                </button>
                <button class="modal-btn btn-confirmar btn-glow">
                    <img src="../Imagenes/confirmar.png" class="modal-icono-btn" alt="Salir">
                    <span>Confirmar</span>
                </button>
            </div>
        </div>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/menu.js"></script>
</body>

</html>