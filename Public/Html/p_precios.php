<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Gran Mercado - Ajustar Precios</title>
    <link rel="stylesheet" href="../Css/estilo_general.css">
</head>

<body class="fondo">
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

        <header class="header-bar">
            <img src="../Imagenes/logo.png" alt="Logo" class="logo">
            <h1>Ajustar Precios</h1>
            <p class="visualizador-capital">Capital: $<span id="capital" class="capital-value"></span></p> 
        </header>

        <!-- Contenido principal: Secciones para selección de producto y ajuste de precio -->
        <main class="contenedor-admin">
            <section class="secciones">
                <!-- Sección izquierda: Selección de producto y detalles -->
                <div class="seccion izquierda">
                    <h2>Producto</h2>
                    <label>Seleccionar</label>
                    <select id="productoSelect">
                        <option value="">Selecciona un producto</option>
                    </select>
                    <div class="info-producto">
                        <label>Código</label>
                        <input type="text" id="codigoProducto" readonly> 
                        <label>Existencias</label>
                        <input type="number" id="existencias" readonly>
                        <label>Demanda</label>
                        <div class="barra-demanda">
                            <div class="barra-demanda-llena" id="barraDemanda"></div>
                            <span id="textoDemanda"></span>
                        </div>
                    </div>
                </div>

                <!-- Sección derecha: Configuración de nuevo precio -->
                <div class="seccion derecha">
                    <h2>Ajuste de Precio</h2>
                    <label>Precio Actual</label>
                    <input type="number" id="precioActual" readonly>
                    <label>Nuevo Precio</label>
                    <div class="contenedor-entrada-numerica">
                        <input type="number" id="nuevoPrecio" min="0"> 
                        <div class="number-input-buttons">
                            <!-- Botones para ajustar precio en incrementos de 5 -->
                            <button type="button" class="number-input-button increment" onclick="incrementarValor('nuevoPrecio', 5)"></button>
                            <button type="button" class="number-input-button decrement" onclick="decrementarValor('nuevoPrecio', 5)"></button>
                        </div>
                    </div>
                    <div class="diferencia-precio" id="diferenciaPrecio">
                        <span id="textoDiferencia">+$0 (0%)</span> 
                    </div>
                </div>
            </section>

            <!-- Botón para guardar cambios -->
            <div class="action-buttons">
                <button class="action-btn" onclick="guardarPrecio()">
                    <img src="../Imagenes/ajustar-icon.png" alt="Ajustar" class="btn-icon"> Aplicar Cambios
                </button>
            </div>
        </main>

        <!-- Pie de página: Navegación a otras páginas -->
        <footer class="botones">
            <button class="nav-btn" onclick="transicionPagina('p_resumen.php')">
                <img src="../Imagenes/resumen-icon.png" alt="Resumen" class="btn-icon"> Resumen
            </button>
            <button class="nav-btn" onclick="transicionPagina('EGM-002.php')">
                <img src="../Imagenes/menu-icon.png" alt="Menú" class="btn-icon"> Menú
            </button>
        </footer>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/precios.js"></script>
</body>

</html>