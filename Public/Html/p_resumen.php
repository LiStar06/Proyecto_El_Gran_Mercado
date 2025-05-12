<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Gran Mercado - Resumen del Negocio</title>
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link rel="stylesheet" href="../Css/p_resumen.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
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
        <header class="header">
            <div class="logo-titulo">
                <img src="../Imagenes/logo.png" alt="Logo" class="logo-juego">
                <h1>Resumen del Negocio</h1>
            </div>
        </header>

        <main class="main-content">
            <div class="stats-header">
                <div class="stat-card gold-glow">
                    <h3><img src="../Imagenes/moneda-icono.png" alt="Coins" class="icon-img"> Capital</h3>
                    <p id="capital" class="capital-value">$0</p>
                </div>
                <div class="stat-card treasure-glow">
                    <h3><img src="../Imagenes/crecimiento-icon.png" alt="Treasure" class="icon-img"> Ganancias Totales</h3>
                    <p id="ganancias-totales">$0</p>
                </div>
            </div>

            <div class="content-wrapper">
                <section class="dashboard-table">
                    <h2><img src="../Imagenes/producto-icon.png" alt="Chest" class="icon-img"> Productos</h2>
                    <div class="filter-controls">
                        <select id="masVendidosSelect" class="product-select">
                            <option value="masVendidos">Más Vendidos</option>
                            <option value="menosVendidos">Menos Vendidos</option>
                        </select>
                    </div>
                    <table id="resumenProductos" class="product-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <div class="paginacion" id="paginacion"></div>
                </section>

                <aside class="summary-sidebar">
                    <h2><img src="../Imagenes/resumen-icon.png" alt="Scroll" class="icon-img"> Resumen Financiero</h2>
                    <div class="summary-item">
                        <label for="invertido">Total Invertido</label>
                        <div class="value-display">
                            <input type="text" id="invertido" readonly>
                            <img src="../Imagenes/capital-icono.png" alt="Coins" class="tooltip" data-tooltip="Dinero gastado en inventario">
                        </div>
                    </div>
                    <div class="summary-item">
                        <label for="ganancias">Ganancias Netas</label>
                        <div class="value-display">
                            <input type="text" id="ganancias" readonly>
                            <img src="../Imagenes/vender-icon.png" alt="Chest" class="tooltip" data-tooltip="Ganancias después de inversión">
                        </div>
                    </div>
                </aside>
            </div>

            <div class="button-container">
                <a onclick="transicionPagina('EGM-002.php')" class="action-button action-btn">Menú Principal</a>
                <a onclick="transicionPagina('p_resumen_historico.php')" class="action-button action-btn" >Histórico de Precios</a>
            </div>
        </main>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/p_resumen.js"></script>
</body>
</html>