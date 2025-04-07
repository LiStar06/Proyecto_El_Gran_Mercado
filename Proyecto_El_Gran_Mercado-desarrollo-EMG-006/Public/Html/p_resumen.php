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
            <p>Capital: $<span id="capital">0</span></p>
        </header>
        <main class="contenedor-admin">
            <section class="secciones">
                <div class="seccion izquierda">
                    <h2>Productos</h2>
                    <label>Más Vendidos</label>
                    <select id="masVendidosSelect">
                        <option value="todos">Todos</option>
                        <option value="top5">Top 5</option>
                        <option value="top10">Top 10</option>
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
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="paginacion">
                        <span>«</span> <span>1</span> <span>2</span> <span>3</span> <span>»</span>
                    </div>
                </div>
                <div class="seccion derecha seccion-resumen">
                    <br> <br> <br> <br> <br> <br> <br> <br> <br>
                    <label>Invertido</label>
                    <input type="number" id="invertido" class="resumen-input" placeholder="Invertido" readonly>
                    <label>Ganancias</label>
                    <input type="number" id="ganancias" class="resumen-input" placeholder="Ganancias" readonly>
                </div>
            </section>
        </main>
        <footer class="botones">
            <button class="nav-btn" onclick="mostrarDetalles()">
                <img src="../Imagenes/detalle-icon.png" alt="Detalles" class="btn-icon"> Detalles
            </button>
            <button class="nav-btn" onclick="location.href='Index.php'">
                <img src="../Imagenes/menu-icon.png" alt="Menú" class="btn-icon"> Menú Principal
            </button>
        </footer>
    </div>
    <script src="script.js"></script>
</body>

</html>