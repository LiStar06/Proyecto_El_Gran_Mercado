<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego de Negocios</title>
    <link rel="shortcut icon" href="../Imagenes/logo.png">
    <link rel="stylesheet" href="../Css/estilos_p_principal.css">
    <link rel="stylesheet" href="../Css/estilo_general.css">
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>

<body class="fondo">

    <div class="transicion-pagina">
        <img src="../Imagenes/logo.png" alt="Logo" class="transicion-logo">
    </div>
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

    <main class="fondo-principal">
        <!-- Barra de navegación superior -->
        <nav class="barra-navegacion">
            <div class="contenedor-logo">
                <img src="../Imagenes/logo.png" alt="Logo Juego" class="logo-juego">
                <h1 class="titulo-juego"></h1>
            </div>
            <div>
                <button class="btn-juego action-btn" onclick="transicionPagina('p_iniciar_sesion.php')">
                    <span class="btn-icon" style="background-image: url('../Imagenes/play-icon.png');"></span>
                    Jugar
                </button>
                <button class="btn-juego action-btn" onclick="transicionPagina('p_crear_cuenta.php')">
                    <span class="btn-icon" style="background-image: url('../Imagenes/registrar-icon.png');"></span>
                    Registrarse
                </button>
            </div>
        </nav>

        <!-- Sección de bienvenida -->
        <section class="contenedor-principal">
            <div class="tarjeta-bienvenida entrada-suave">
                <h2 class="titulo-bienvenida">¡Bienvenido a</span>!</h2>
                <p class="texto-destacado"></p>
                <div class="contenido-bienvenida">
                    <!-- Lista de características del juego -->
                    <ul class="lista-caracteristicas">
                        <li><span class="caracteristica-icono" style="background-image: url('../Imagenes/tienda-icon.png');"></span> Compra y vende productos en un mercado dinámico</li>
                        <li><span class="caracteristica-icono" style="background-image: url('../Imagenes/administra-icon.png');"></span> Administra tu negocio y toma decisiones estratégicas</li>
                        <li><span class="caracteristica-icono" style="background-image: url('../Imagenes/crecimiento-icon.png');"></span> Ajusta precios según la oferta y demanda</li>
                        <li><span class="caracteristica-icono" style="background-image: url('../Imagenes/desafíos-icon.png');"></span> Supera desafíos y conviértete en un magnate</li>
                    </ul>
                    <!-- Llamado a la acción -->
                    <div class="llamado-accion">
                        <p>¿Tienes lo necesario para construir un imperio comercial?</p>
                        <button class="btn-empezar" onclick="transicionPagina('p_iniciar_sesion.php')"> ¡Comenzar Aventura!
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script src="../Javascript/funcionesComunes.js"></script>
    <script src="../Javascript/prinpal.js"></script>
</body>

</html>