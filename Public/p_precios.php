<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imagen Completa</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="fondo">
        <header class="header-bar">
            <img src="logo.png" alt="Logo" class="logo">
            <h1>Ajustar Precios</h1>
            <p>Capital: $<span id="capital">0</span></p>
        </header>
        <main class="contenedor-admin">
            <section class="secciones">
                <div class="seccion izquierda">
                    <h2>Productos</h2>
                    <label>Producto</label>
                    <select id="productoSelect">
                        <option value="">Selecciona un producto</option>
                        <option value="Producto 1">Producto 1</option>
                        <option value="Producto 2">Producto 2</option>
                    </select>
                    <label>Código</label>
                    <input type="text" id="codigoProducto" placeholder="Código" readonly>
                </div>
                <div class="seccion derecha">
                    <br> <br>
                    <label>Precio Actual</label>
                    <input type="number" id="precioActual" placeholder="Precio actual" min="0" readonly>
                    <label>Nuevo Precio</label>
                    <input type="number" id="nuevoPrecio" placeholder="Nuevo precio" min="0">
                </div>
            </section>
            <button class="action-btn" onclick="guardarPrecio()">
                <img src="ajustar-icon.png" alt="Ajustar" class="btn-icon"> Ajustar
            </button>
        </main>
        <footer class="botones">
            <button class="nav-btn" onclick="mostrarDetalles()">
                <img src="detalle-icon.png" alt="Detalles" class="btn-icon"> Detalles
            </button>
            <button class="nav-btn" onclick="location.href='Index.php'">
                <img src="menu-icon.png" alt="Menú" class="btn-icon"> Menú Principal
            </button>
        </footer>
    </div>
    <script src="script.js"></script>
</body>

</html>