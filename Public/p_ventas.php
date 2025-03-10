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
            <h1>Área de Ventas</h1>
            <p>Capital: $<span id="capital">0</span></p>
        </header>
        <main class="contenedor-admin">
            <section class="secciones">
                <div class="seccion izquierda">
                    <h2>Pedidos</h2>
                    <label>Cliente</label>
                    <select id="clienteSelect">
                        <option value="">Selecciona un cliente</option>
                        <option value="Cliente 1">Cliente 1</option>
                        <option value="Cliente 2">Cliente 2</option>
                    </select>
                    <label>Producto</label>
                    <select id="productoSelect">
                        <option value="">Selecciona un producto</option>
                        <option value="Producto 1">Producto 1</option>
                        <option value="Producto 2">Producto 2</option>
                    </select>
                    <label>Cantidad</label>
                    <input type="number" id="cantidadPedida" placeholder="Cantidad pedida" min="0" readonly>
                </div>
                <div class="seccion derecha">
                    <br> <br>
                    <label>Disponible</label>
                    <input type="number" id="cantidadDisponible" placeholder="Disponible" min="0" readonly>
                    <label>Cantidad a vender</label>
                    <input type="number" id="cantidadVender" placeholder="Cantidad a vender" min="0">
                    <label>Monto</label>
                    <input type="number" id="montoVenta" placeholder="Monto" readonly>
                </div>
            </section>
            <button class="action-btn" onclick="venderProducto()">
                <img src="vender-icon.png" alt="Vender" class="btn-icon"> Vender
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