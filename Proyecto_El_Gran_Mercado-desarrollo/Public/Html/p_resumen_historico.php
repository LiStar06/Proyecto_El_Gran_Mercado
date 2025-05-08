<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico de precios</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../Css/p_resumen_historico.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
    <header>
        <nav class="nav">
            <a>Histórico de precios y tendencias del mercado</a>
            <div class="nav-links">
                <a href="#" class="nav-link">Inicio</a>
                <a href="#" class="nav-link">Productos</a>
                <a href="#" class="nav-link">Carrito</a>
                <a href="#historicoPreciosChart" class="nav-link">Gráfica</a>
            </div>
        </nav>
    </header>

    <main class="main-content">
        <h1 class="main-title">Tendencias</h1>

        <section class="product-container" id="productos-container"></section>

        <section class="product-details-container" id="detalles-producto-container">
            <h2 class="product-details-title">Detalles del Producto</h2>
            <div id="detalles-producto" class="product-details"></div>
            <nav class="botones">
                <a href="p_resumen.php" class="menu-button opcion">Resumen del negocio</a>
            </nav>
        </section>

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
    <script src="../Javascript/p_resumen_historico.js"></script>
</body>
</html>
