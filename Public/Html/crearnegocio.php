<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Negocio - El Gran Mercado</title>
    <link rel="shortcut icon" href="../Imagenes/logo.png">
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/crearnegocio.css">
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap" rel="stylesheet">
</head>

<body class="fondo">
    <!-- Transición de página: Animación inicial con logo -->
    <div class="transicion-pagina">
        <img src="../Imagenes/logo.png" alt="Logo" class="transicion-logo">
    </div>

    <!-- Control de sonido: Botón y menú para activar/desactivar música y efectos -->
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

    <!-- Contenedor principal: Tarjeta para el formulario de creación de negocio -->
    <div class="contenedor-crear-negocio">
        <div class="tarjeta-negocio">
            <!-- Encabezado: Logo y título -->
            <div class="encabezado-tarjeta">
                <img src="../Imagenes/logo.png" alt="Logo" class="logo">
                <h1>Crear Nuevo Negocio</h1>
            </div>

            <!-- Formulario: Captura los datos del negocio -->
            <form id="formularioNegocio" class="formulario-negocio">
                <!-- Campo Nombre del Negocio -->
                <div class="grupo-formulario">
                    <label for="nombre" class="con-tooltip">
                        <img src="../Imagenes/tienda-icon.png" alt="Nombre">
                        Nombre del Negocio
                        <span class="tooltip-contenido">Elige un nombre atractivo para tu negocio (3-20 caracteres)</span>
                    </label>
                    <div class="input-con-icono">
                        <input type="text" id="nombre" name="nombre" placeholder="Ej: Mi Tienda" minlength="3" maxlength="20" required>
                        <div class="efecto-subrayado"></div>
                    </div>
                </div>

                <!-- Campo Tipo de Negocio -->
                <div class="grupo-formulario">
                    <label for="tipo" class="con-tooltip">
                        <img src="../Imagenes/Tipo-icon.png" alt="Tipo">
                        Tipo de Negocio
                        <span class="tooltip-contenido">Selecciona el tipo de negocio que deseas administrar</span>
                    </label>
                    <div class="input-con-icono">
                        <select id="tipo" name="tipo" required>
                            <option value="">Selecciona un tipo</option>
                            <option value="Tienda General" data-tooltip="Vende diversos productos básicos">Tienda General</option>
                            <option value="Supermercado" data-tooltip="Especializado en alimentos y bebidas">Supermercado</option>
                            <option value="Mercado de Especias" data-tooltip="Productos exóticos y especias">Mercado de Especias</option>
                            <option value="Tienda de Ropa" data-tooltip="Ropa y accesorios de moda">Tienda de Ropa</option>
                            <option value="Posada" data-tooltip="Alojamiento y comida para viajeros">Posada</option>
                        </select>
                        <div class="tooltip-opcion" id="tooltipTipo"></div>
                        <div class="efecto-subrayado"></div>
                    </div>
                </div>

                <!-- Campo Capital Inicial -->
                <div class="grupo-formulario">
                    <label for="capital" class="con-tooltip">
                        <img src="../Imagenes/coin-icon.png" alt="Capital">
                        Capital Inicial
                        <span class="tooltip-contenido">Elige cuánto invertirás al comenzar (500-5000 monedas)</span>
                    </label>
                    <div class="contenedor-capital">
                        <div class="selector-capital">
                            <button type="button" class="btn-ajuste" id="decrementarCapital">
                                <img src="../Imagenes/menos-icon.png" alt="Reducir">
                            </button>
                            <div class="visualizador-moneda">
                                <span id="valorCapital">1,000</span>
                                <img src="../Imagenes/gold-coin.png" alt="Monedas" class="moneda-giratoria">
                            </div>
                            <button type="button" class="btn-ajuste" id="incrementarCapital">
                                <img src="../Imagenes/mas-icon.png" alt="Aumentar">
                            </button>
                        </div>
                        <input type="range" id="capital" name="capital" min="500" max="5000" value="1000" step="100">
                        <div class="opciones-rapidas">
                            <button type="button" class="btn-opcion" data-valor="500">
                                500
                                <span class="tooltip-contenido">Capital mínimo para empezar</span>
                            </button>
                            <button type="button" class="btn-opcion" data-valor="1000">
                                1,000
                                <span class="tooltip-contenido">Capital recomendado para principiantes</span>
                            </button>
                            <button type="button" class="btn-opcion" data-valor="2000">
                                2,000
                                <span class="tooltip-contenido">Buena inversión inicial</span>
                            </button>
                            <button type="button" class="btn-opcion" data-valor="5000">
                                5,000
                                <span class="tooltip-contenido">Gran inversión para ventaja inicial</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Botones de acción -->
                <div class="contenedor-botones">
                    <button type="button" class="nav-btn" id="btnMenu">
                        <img src="../Imagenes/menu-icon.png" alt="Volver">
                        Menu Principal
                    </button>
                    <button type="submit" class="nav-btn" id="btnCrear">
                        <img src="../Imagenes/crear-icon.png" alt="Crear">
                        Crear Negocio
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/crearnegocio.js"></script>
</body>

</html>
```