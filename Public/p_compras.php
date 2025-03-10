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
            <h1>Área de compras</h1>
            <p>Capital: $<span id="capital">0</span></p>
        </header>
        <main class="contenedor-admin">
            <section class="secciones">
                <div class="seccion izquierda">
                    <h2>Lista de productos</h2>
                    <label>Nombre</label>
                    <select id="productoSelect">
                        <option value="">Selecciona un producto</option>
                        <option value="Producto 1">Producto 1</option>
                        <option value="Producto 2">Producto 2</option>
                    </select>
                    <label>Precio Unitario</label>
                    <input type="number" id="precioUnitario" placeholder="Precio unitario" readonly>
                    <label>Disponible</label>
                    <input type="number" id="disponible" placeholder="Disponible" readonly>
                    <label>Demandada</label>
                    <input type="number" id="demandada" placeholder="Demandada" readonly>
                </div>
                <div class="seccion derecha">
                    <h2>Opciones de compra</h2>
                    <label>Cantidad</label>
                    <input type="number" id="cantidadCompra" placeholder="Cantidad" min="0">
                    <label>Monto</label>
                    <input type="number" id="montoCompra" placeholder="Monto" readonly>
                </div>
            </section>
            <button class="action-btn" onclick="comprarProducto()">
                <img src="comprar-icon.png" alt="Comprar" class="btn-icon"> Comprar
            </button>
        </main>
        <footer class="botones">
            <button class="nav-btn" onclick="mostrarDetalles()">
                <img src="detalle-icon.png" alt="Detalles" class="btn-icon"> Detalles
            </button>
            <button class="nav-btn" onclick="window.location.href='Index.php'">
                <img src="menu-icon.png" alt="Menú" class="btn-icon"> Menú Principal
            </button>
        </footer>
    </div>
    <script src="script.js"></script>       
</body>
</html>