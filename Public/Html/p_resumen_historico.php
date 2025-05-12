<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico de Precios - El Gran Mercado</title>
    <!-- Fuentes temáticas para estilo medieval -->
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <!-- Estilos generales y específicos -->
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/p_resumen_historico.css">
    <!-- Librería para gráficos -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
    <div class="fondo">
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

        <!-- Encabezado: Barra de navegación -->
        <header class="nav-bar">
            <div class="nav-container">
                <div class="logo-titulo">
                    <img src="../Imagenes/logo.png" alt="Logo" class="logo-juego">
                    <h1>Histórico de Precios y Tendencias</h1>
                </div>
                <button class="nav-toggle" aria-label="Toggle navigation">
                    <span class="hamburger"></span>
                </button>
                <nav class="nav-links">
                    <a onclick="transicionPagina('EGM-002.php')" class="nav-link">Inicio</a>
                    <a onclick="transicionPagina('p_ventas.php')" class="nav-link">Ventas</a>
                    <a onclick="transicionPagina('p_precios.php')" class="nav-link">Precios</a>
                    <a href="#historicoPreciosChart" class="nav-link">Gráfica</a>
                    <div class="cart-icon-container">
                        <img src="../Imagenes/carrito-icon.png" alt="Carrito" class="cart-icon">
                        <span class="cart-badge" id="cart-count">0</span>
                    </div>
                </nav>
            </div>
        </header>

        <!-- Contenido principal: Tendencias y gráficos -->
        <main class="main-content">
            <h1 class="main-title">Tendencias del Mercado</h1>
            <section class="product-container" id="productos-container"></section>

            <h2 class="price-history-title">Histórico de Precios</h2>
            <section class="price-history-container">
                <div class="select-product">
                    <label for="productoSelect" class="product-select-label">Seleccionar Producto:</label>
                    <select id="productoSelect" class="product-select">
                        <option value="">Todos los Productos</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="historicoPreciosChart" width="400" height="200"></canvas>
                </div>
            </section>
        </main>

        <!-- Modal de detalles del producto -->
        <div class="modal-overlay" id="product-modal-overlay">
            <div class="product-details-modal" id="product-details-modal">
                <h2 class="product-details-title">Detalles del Producto</h2>
                <div id="detalles-producto" class="product-details"></div>
                <div class="modal-buttons">
                    <button class="back-button modal-close-btn">
                        <img src="../Imagenes/volver-icon.png" alt="Volver" class="btn-icon"> Volver
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal de carrito -->
        <div class="modal-overlay" id="cart-modal-overlay">
            <div class="cart-modal">
                <h2 class="cart-modal-title">Carrito de Compras</h2>
                <div id="cart-items" class="cart-items"></div>
                <div class="cart-total">
                    <p id="cart-total-price">Total: $0</p>
                </div>
                <div class="modal-buttons">
                    <button class="back-button cart-close-btn">
                        <img src="../Imagenes/cancelar-icon.png" alt="Cerrar" class="btn-icon"> Cerrar
                    </button>
                    <button class="back-button checkout-btn">
                        <img src="../Imagenes/compras-icon.png" alt="Comprar" class="btn-icon"> Hacer Compra
                    </button>
                </div>
            </div>
        </div>

        <!-- Efectos visuales dinámicos -->
        <div class="efectos-juego">
            <div class="luz-efecto"></div>
        </div>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/p_resumen_historico.js"></script>
</body>

</html>
```