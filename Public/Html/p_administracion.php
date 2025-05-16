<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administración - El Gran Mercado</title>
    <link rel="shortcut icon" href="../Imagenes/logo.png">
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/p-administracion.css">
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
    <!-- Barra superior con logo y título -->
    <header class="header-admin">
        <img src="../Imagenes/logo.png" alt="Logo" class="logo-admin">
        <h1 class="titulo-admin">ADMINISTRACIÓN</h1>
        <div class="info-negocio">
            <div class="info-caja">
                <span class="info-etiqueta">NEGOCIO:</span>
                <span class="info-valor">Mercado Central</span>
            </div>
            <div class="info-caja capital-box">
                <span class="info-etiqueta">CAPITAL:</span>
                <span class="info-valor" id="capital">$1,000.00</span>
                <span class="moneda-icono"></span>
            </div>
        </div>
    </header>

    <!-- Panel principal de administración -->
    <main class="panel-administracion">
        <!-- Contenedor de las tres cajas principales -->
        <div class="contenedor-cajas">
            <!-- Caja de Inventario -->
            <div class="caja-juego inventario-box">
                <h3 class="caja-titulo">
                    <img src="../Imagenes/inventario-icon.png" class="caja-icono">
                    INVENTARIO
                </h3>
                <div class="caja-contenido" id="contenido-inventario"></div>
            </div>

            <!-- Caja de Finanzas -->
            <div class="caja-juego finanzas-box">
                <h3 class="caja-titulo">
                    <img src="../Imagenes/administra-icon.png" class="caja-icono">
                    FINANZAS
                </h3>
                <div class="caja-contenido" id="contenido-finanzas"></div>
            </div>

            <!-- Caja de Indicadores -->
            <div class="caja-juego indicadores-box">
                <h3 class="caja-titulo">
                    <img src="../Imagenes/indicadores-icon.png" class="caja-icono">
                    INDICADORES
                </h3>
                <div class="caja-contenido" id="contenido-indicadores"></div>
            </div>
        </div>

        <!-- Botones de acción -->
        <div class="botones-administracion">
            <button class="action-btn btn-comprar" onclick="transicionPagina('p_compras.php')">
                <img src="../Imagenes/comprar-icon.png" alt="Comprar" class="btn-icon"> COMPRAR
            </button>

            <button class="action-btn btn-vender" onclick="transicionPagina('p_ventas.php')">
                <img src="../Imagenes/vender-icon.png" alt="Vender" class="btn-icon"> VENDER
            </button>

            <button class="action-btn btn-ajustar" onclick="transicionPagina('p_precios.php')">
                <img src="../Imagenes/ajustes-icon.png" alt="Ajustes" class="btn-icon"> AJUSTAR
            </button>

            <button class="action-btn btn-resumen" onclick="transicionPagina('p_resumen.php')">
                <img src="../Imagenes/resumen-icon.png" alt="Detalles" class="btn-icon"> RESUMEN
            </button>
        </div>
    </main>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/administracion.js"></script>
</body>

</html>