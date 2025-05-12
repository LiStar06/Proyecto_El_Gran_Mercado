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

    <!-- Encabezado: Barra superior con logo, título y capital -->
    <header class="header-bar">
        <img src="../Imagenes/logo.png" alt="Logo" class="logo">
        <h1>Área de compras</h1>
        <p class="visualizador-capital">
            Capital: $<span id="capital" class="capital-value"></span>
        </p>
    </header>

    <!-- Contenido principal: Secciones de productos y opciones de compra -->
    <main class="contenedor-admin">
        <section class="secciones">
            <!-- Sección izquierda: Selección y detalles de productos -->
            <div class="seccion izquierda">
                <h2>Lista de productos</h2>
                <label>Nombre</label>
                <select id="productoSelect">
                    <option value="">Selecciona un producto</option>
                </select>
                <label>Precio Unitario</label>
                <input type="number" id="precioUnitario" placeholder="Precio unitario" readonly>
                <label>Disponible</label>
                <input type="number" id="disponible" placeholder="Disponible" readonly>
                <label>Demanda</label>
                <input type="number" id="demanda" placeholder="Demanda" readonly>
            </div>

            <!-- Sección derecha: Configuración de compra -->
            <div class="seccion derecha">
                <h2>Opciones de compra</h2>
                <label>Cantidad a Comprar</label>
                <div class="contenedor-entrada-numerica">
                    <input type="number" id="cantidadCompra" min="0" placeholder="0">
                    <div class="number-input-buttons">
                        <!-- Botones para ajustar cantidad -->
                        <button type="button" class="number-input-button increment" onclick="incrementarValor('cantidadCompra')"></button>
                        <button type="button" class="number-input-button decrement" onclick="decrementarValor('cantidadCompra')"></button>
                    </div>
                </div>
                <label>Monto</label>
                <input type="number" id="montoCompra" placeholder="Monto" readonly>
            </div>
        </section>

        <!-- Botón de acción para confirmar compra -->
        <button class="action-btn" onclick="comprarProducto()">
            <img src="../Imagenes/comprar-icon.png" alt="Comprar" class="btn-icon"> Comprar
        </button>
    </main>

    <!-- Pie de página: Navegación a otras páginas -->
    <footer class="botones">
        <button class="nav-btn" onclick="transicionPagina('p_resumen.php')">
            <img src="../Imagenes/resumen-icon.png" alt="Detalles" class="btn-icon"> Detalles
        </button>
        <button class="nav-btn" onclick="transicionPagina('EGM-002.php')">
            <img src="../Imagenes/menu-icon.png" alt="Menú" class="btn-icon"> Menú Principal
        </button>
    </footer>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/compras.js"></script>
</body>

</html>
```