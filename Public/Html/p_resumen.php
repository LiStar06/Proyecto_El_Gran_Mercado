<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Gran Mercado</title>
    <link rel="stylesheet" href="../Css/p_resumen.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

</head>
<body>
    <div class="fondo">
        <header class="header-bar">
            <div class="logo-container">
                <img src="../Imagenes/logo.png" alt="Logo" class="logo">
                <h1>Resumen del Negocio</h1>
            </div>
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
                        <option value="" disabled selected>Seleccione una opción</option>
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
                                <td>—</td>
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
            

        </main>

        <nav class="botones">
            <a href="EGM-002.php" class="menu-button">
                <i class="fas fa-play"></i>  Menú Principal
            </a>
            <a href="p_resumen_historico.php" class="menu-button">Histórico de Precios
                
            </a>
        </nav>
    </div>
    <script src="../Javascript/p_resumen.js"></script>
</body>
</html>