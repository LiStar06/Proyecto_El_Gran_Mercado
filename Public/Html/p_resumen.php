<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Gran Mercado</title>
    <link rel="stylesheet" href="../Css/styles2.css">
</head>
<body>
    <div class="fondo">
        <header class="header-bar">
            <img src="../Imagenes/logo.png" alt="Logo" class="logo">
            <h1>Resumen del Negocio</h1>
            <p class="capital">Capital: $<span id="capital">0</span></p>
        </header>

        <main class="contenedor-admin">
            <div class="ganancias-container">
                Ganancias Totales: $<span id="ganancias-totales">0</span>
            </div>
            <section class="secciones">
                <div class="seccion izquierda">
                    <h2>Productos</h2>
                    <select id="masVendidosSelect">
                        <option value="masVendidos">Más vendidos</option>
                        <option value="menosVendidos">Menos vendidos</option>
                    </select>
                    <table id="resumenTabla">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad Vendida</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><—</td>
                                <td>—</td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>—</td>
                                <td>—</td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>—</td>
                                <td>—</td>
                                <td>—</td>
                                
                            </tr>
                        </tbody>
                    </table>
                    <div class="paginacion">
                        <span>«</span> <span>1</span> <span>2</span> <span>3</span> <span>»</span>
                    </div>
                </div>

                <div class="seccion derecha seccion-resumen">
                    <h2>Resumen</h2>
                    <div class="campo">
                        <label for="invertido">Invertido</label>
                        <input type="number" id="invertido" class="resumen-input" placeholder="Invertido" readonly>
                    </div>
                    <div class="campo">
                        <label for="ganancias">Ganancias</label>
                        <input type="number" id="ganancias" class="resumen-input" placeholder="Ganancias" readonly>
                    </div>
                </div>
            </section>
            <div id="historico-precios-container">
                <canvas id="historico-precios" width="400" height="200"></canvas>
            </div>
        </main>

        <nav class="botones">
            <button class="nav-btn" onclick="mostrarDetalles()">
                <img src="../Imagenes/detalle-icon.png" alt="Detalles" class="btn-icon"> Detalles
            </button>
            <button class="nav-btn" onclick="location.href='Index.php'">
                <img src="../Imagenes/menu-icon.png" alt="Menú" class="btn-icon"> Menú Principal
            </button>
        </nav>
    </div>

    <script src="../javascript/script.js"></script>  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>
</html>
