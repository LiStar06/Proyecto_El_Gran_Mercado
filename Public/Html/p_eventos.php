
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eventos del Mercado - El Gran Mercado</title>
    <link rel="shortcut icon" href="../Imagenes/logo.png">
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/p-eventos.css">
</head>
<body class="fondo">
    <div>
        <!-- Animación de transición con logo -->
        <div class="transicion-pagina">
            <img src="../Imagenes/logo.png" alt="Logo" class="transicion-logo">
        </div>

        <!-- Control de sonido: Botón y menú desplegable -->
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

        <!-- Encabezado: Barra superior con logo y contador de intentos -->
        <header class="header-admin">
            <div class="logo-titulo">
                <img src="../Imagenes/logo.png" alt="Logo" class="logo-juego">
                <h1>Eventos del Mercado</h1>
            </div>
            <div class="info-juego">
                <div class="contador-intentos">
                    <img src="../Imagenes/intentos-icon.png" alt="Intentos">
                    <span id="intentos">5</span>/5 <!-- Contador dinámico de intentos -->
                </div>
            </div>
        </header>

        <!-- Contenido principal: Máquina de ofertas -->
        <main class="juego-contenedor">
            <div class="maquina-ofertas">
                <div class="pantalla-ofertas" id="pantalla-ofertas">
                    <!-- Columnas para mostrar ofertas dinámicas -->
                    <div class="columna-ofertas">
                        <div class="oferta-item" id="oferta-1"></div>
                    </div>
                    <div class="columna-ofertas">
                        <div class="oferta-item" id="oferta-2"></div>
                    </div>
                    <div class="columna-ofertas">
                        <div class="oferta-item" id="oferta-3"></div>
                    </div>
                </div>
                <div class="controles-maquina">
                    <!-- Botones para interactuar con ofertas -->
                    <button class="btn-juego action-btn" id="btn-cambiar">
                        <span class="btn-texto">CAMBIAR OFERTAS</span>
                        <span class="btn-contador" id="contador-cambios">0/3</span>
                    </button>
                    <button class="btn-juego action-btn" id="btn-aceptar">
                        <span class="btn-texto">ACEPTAR OFERTA</span>
                    </button>
                </div>
            </div>

            <!-- Temporizador para próximas ofertas -->
            <div class="countdown-container" id="countdown-container">
                <div class="countdown-message">
                    <h2>¡Vuelve más tarde por más ofertas!</h2>
                    <div class="flip-clock" id="countdown-timer">
                        <span class="flip-sign">-</span>
                        <span class="flip-digit" id="hours-tens">0</span>
                        <span class="flip-digit" id="hours-units">0</span>
                        <span class="separator">:</span>
                        <span class="flip-digit" id="minutes-tens">0</span>
                        <span class="flip-digit" id="minutes-units">0</span>
                        <span class="separator">:</span>
                        <span class="flip-digit" id="seconds-tens">0</span>
                        <span class="flip-digit" id="seconds-units">0</span>
                    </div>
                </div>
            </div>

            <!-- Botón para volver al menú -->
            <button class="btn-juego btn-volver action-btn" onclick="transicionPagina('EGM-002.php')">
                <img src="../Imagenes/cancelar-icon.png" class="btn-icon" alt="Salir">
                SALIR
            </button>
        </main>

        <!-- Efectos visuales dinámicos -->
        <div class="efectos-juego">
            <div class="luz-efecto"></div>
        </div>
    </div>

    <!-- Scripts para funcionalidades comunes y específicas -->
    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/eventos.js"></script>
</body>
</html>
```