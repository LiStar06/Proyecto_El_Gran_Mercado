<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Gran Mercado</title>
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

    <!-- Encabezado: Barra superior con logo, título y capital -->
    <header class="header-bar">
        <img src="../Imagenes/logo.png" alt="Logo" class="logo">
        <h1>Pagar prestamo</h1>
        <p class="visualizador-capital">
            Capital: $<span id="capital" class="capital-value"></span>
        </p>
    </header>

    <!-- Contenido principal: Secciones de productos y opciones de compra -->
    <main class="contenedor-admin">
        <section class="secciones">
            <!-- Sección izquierda: Selección y detalles de productos -->
            <div class="seccion izquierda">
                <h2>Pendiente</h2>               
                <input type="number" id="valorPendiente"  readonly>
                <h2>Monto</h2>               
                <input type="number" id="montoAPagar"  readonly>
                
            </div>

            <!-- Sección derecha: Configuración de compra -->
            <div class="seccion derecha">
                <h2>Cuota</h2>            
                <!-- <input type="number" id="numeroDeCuota"  readonly> -->
                <div class="contenedor-entrada-numerica">
                        <input type="number" id="numeroDeCuota" readonly min="1" value="1">
                        <div class="number-input-buttons">
                            <!-- Botones para incrementar/decrementar la cantidad -->
                            <button type="button" class="number-input-button increment" onclick="incrementarValorPagar('numeroDeCuota')"></button>
                            <button type="button" class="number-input-button decrement" onclick="decrementarValorPagar('numeroDeCuota')"></button>
                        </div>
                </div>
                <h2>Cuotas pendientes</h2>            
                <input type="number" id="cuotasPendientes"  readonly>
                <h2>Total a Pagar</h2>            
                <input type="number" id="totalAPagar"  readonly>
            </div>
        </section>

        <!-- Botón de acción para confirmar pago -->
        <button class="action-btn" onclick="guardarPagoCuotas()">
            <img src="../Imagenes/comprar-icon.png" alt="Comprar" class="btn-icon"> Pagar
        </button>
    </main>

    <!-- Pie de página: Navegación a otras páginas -->
    <footer class="botones">
        <button class="nav-btn" onclick="transicionPagina('p_resumen.php')">
            <img src="../Imagenes/resumen-icon.png" alt="Detalles" class="btn-icon"> Detalles
        </button>
        <button class="nav-btn" onclick="transicionPagina('p_administracion.php')">
            <img src="../Imagenes/menu-icon.png" alt="Menú" class="btn-icon"> Administracion
        </button>
    </footer>
    </div>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/prestamos.js"></script>
</body>

</html>
```