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
        <!-- Barra superior con logo, título y visualización de capital -->
        <header class="header-bar">
            <img src="../Imagenes/logo.png" alt="Logo" class="logo">
            <h1>Área de compras</h1>
            <p class="visualizador-capital">
                Capital: $<span id="capital" class="capital-value"></span> <!-- Muestra el capital actual -->
            </p>
        </header>

        <main class="contenedor-admin">
            <section class="secciones">
                <!-- Sección izquierda: Lista de productos y detalles -->
                <div class="seccion izquierda">
                    <h2>Lista de productos</h2>
                    <label>Nombre</label>
                    <select id="productoSelect"> <!-- Dropdown para seleccionar producto -->
                        <option value="">Selecciona un producto</option>
                    </select>
                    <label>Precio Unitario</label>
                    <input type="number" id="precioUnitario" placeholder="Precio unitario" readonly> 
                    <label>Disponible</label>
                    <input type="number" id="disponible" placeholder="Disponible" readonly> 
                    <label>Demanda</label>
                    <input type="number" id="demanda" placeholder="Demanda" readonly>
                </div>

                <!-- Sección derecha: Opciones de compra -->
                <div class="seccion derecha">
                    <h2>Opciones de compra</h2>
                    <label>Cantidad a Comprar</label>
                    <div class="contenedor-entrada-numerica">
                        <input type="number" id="cantidadCompra" min="0" placeholder="0"> <!-- Input para cantidad a comprar -->
                        <div class="number-input-buttons">
                            <!-- Botones para incrementar/decrementar la cantidad -->
                            <button type="button" class="number-input-button increment" onclick="incrementarValor('cantidadCompra')"></button>
                            <button type="button" class="number-input-button decrement" onclick="decrementarValor('cantidadCompra')"></button>
                        </div>
                    </div>
                    <label>Monto</label>
                    <input type="number" id="montoCompra" placeholder="Monto" readonly> <!-- Monto total calculado-->
                </div>
            </section>

            <!-- Botón para confirmar la compra -->
            <button class="action-btn" onclick="comprarProducto()">
                <img src="../Imagenes/comprar-icon.png" alt="Comprar" class="btn-icon"> Comprar
            </button>
        </main>

        <!-- Pie de página con botones de navegación -->
        <footer class="botones">
            <button class="nav-btn" onclick="mostrarDetalles()">
                <img src="../Imagenes/detalle-icon.png" alt="Detalles" class="btn-icon"> Detalles
            </button>
            <button class="nav-btn" onclick="window.location.href='Index.php'">
                <img src="../Imagenes/menu-icon.png" alt="Menú" class="btn-icon"> Menú Principal
            </button>
        </footer>
    </div>
    <script src="../Javascript/script.js"></script>
</body>
</html>