<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Gran Mercado</title>
    <link rel="stylesheet" href="../Css/estilo_general.css">
</head>

<body class="fondo">
  <div class="transicion-pagina">
        <img src="../Imagenes/logo.png" alt="Logo" class="transicion-logo">
    </div>
    <div>
        <div class="fondo">
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
        <!-- Barra superior con logo, título y visualización de capital -->
        <header class="header-bar">
            <img src="../Imagenes/logo.png" alt="Logo" class="logo">
            <h1>Área de Ventas</h1>
            <p class="visualizador-capital">
                Capital: $<span id="capital" class="capital-value"></span> <!-- Muestra el capital actual -->
            </p>
        </header>

        <main class="contenedor-admin">
            <section class="secciones">
                <!-- Sección izquierda: Selección de cliente y producto -->
                <div class="seccion izquierda">
                    <h2>Pedidos</h2>
                    <label>Cliente</label>
                    <select id="clienteSelect">
                        <option value="">Selecciona un cliente</option>
                    </select>
                    <label>Productos</label>
                    <select id="productoSelect">
                        <option value="">Selecciona un producto</option>
                    </select>
                    <label>Cantidad</label>
                    <input type="number" id="cantidadPedida" placeholder="Cantidad pedida" min="0" readonly>
                </div>

                <!-- Sección derecha: Opciones de venta -->
                <div class="seccion derecha ventas">
                    <label>Disponible</label>
                    <input type="number" id="cantidadDisponible" placeholder="Disponible" min="0" readonly>
                    <label>Cantidad a vender</label>
                    <div class="contenedor-entrada-numerica">
                        <input type="number" id="cantidadVender" min="0" placeholder="0">
                        <div class="number-input-buttons">
                            <!-- Botones para incrementar/decrementar la cantidad -->
                            <button type="button" class="number-input-button increment" onclick="incrementarValor('cantidadVender')"></button>
                            <button type="button" class="number-input-button decrement" onclick="decrementarValor('cantidadVender')"></button>
                        </div>
                    </div>
                    <label>Monto</label>
                    <input type="number" id="montoVenta" placeholder="Monto" readonly> <!-- Monto total calculado-->
                </div>
            </section>

            <!-- Botón para confirmar la venta -->
            <div class="action-buttons">
                <button class="action-btn" onclick="venderProducto()">
                    <img src="../Imagenes/vender-icon.png" alt="Vender" class="btn-icon"> Vender
                </button>
            </div>
        </main>

        <!-- Pie de página con botones de navegación -->
        <footer class="botones">
            <button class="nav-btn" onclick="transicionPagina('p_resumen.php')">
                <img src="../Imagenes/resumen-icon.png" alt="Detalles" class="btn-icon"> Detalles
            </button>
            <button class="nav-btn" onclick="transicionPagina('EGM-002.php')">
                <img src="../Imagenes/menu-icon.png" alt="Menú" class="btn-icon"> Menú
            </button>
        </footer>
        </div>
        <script src="../Javascript/funcionesComunes.js"></script>
        <script src="../Javascript/ventas.js"></script>
    </body>

</html>