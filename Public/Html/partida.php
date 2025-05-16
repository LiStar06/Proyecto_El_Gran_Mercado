
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Continuar Partida - El Gran Mercado</title>
    <link rel="shortcut icon" href="../Imagenes/logo.png">
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/estilos_partida.css">
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body class="fondo">
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
        <!-- Contenedor de selección de partida -->
        <div class="contenedor-partida">
            <div class="tarjeta-partida">
                <div class="encabezado-tarjeta">
                    <img src="../Imagenes/logo.png" alt="Logo" class="logo-tarjeta">
                    <h1>Continuar Partida</h1>
                    <p class="subtitulo">¡Elige tu aventura en el mercado!</p>
                </div>

                <!-- Opciones de partida (placeholders) -->
                <div class="opciones-partida">
                    <a href="#" class="action-btn">
                        <div class="opcion-contenido">
                            <h3>Reanudar Partida</h3>
                        </div>
                    </a>
                    <a href="#" class="action-btn">
                        <div class="opcion-contenido">
                            <h3>Juego 2</h3>
                        </div>
                    </a>
                    <a href="#" class="action-btn">
                        <div class="opcion-contenido">
                            <h3>Juego 3</h3>
                        </div>
                    </a>
                </div>
                <div class="contenedor-botones">
                    <button class="btn-secundario action-btn" id="btnVolver" onclick="transicionPagina('index.php')">
                        <img src="../Imagenes/inicio-icon.png" alt="Volver">
                        <span>Inicio</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/partida.js"></script>
</body>
</html>
```