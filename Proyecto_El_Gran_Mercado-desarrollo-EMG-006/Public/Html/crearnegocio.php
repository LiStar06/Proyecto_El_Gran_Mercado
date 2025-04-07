<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Negocio - El Gran Mercado</title>
    <link rel="stylesheet" href="../Css/estilos.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body class="fondo">
    <div class="container">
        <div class="menu crear-negocio">
            <img src="../Imagenes/logo.png" alt="Logo del juego" class="logo">
            <h1>Crear Negocio</h1>
            <form id="crear-negocio-form">
                <div class="form-group">
                    <label for="nombre">Nombre del negocio:</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Ej: Mi Tienda" required>
                </div>
                <div class="form-group">
                    <label for="tipo">Tipo de negocio:</label>
                    <div class="input-group">
                        <input type="text" id="tipo" name="tipo" placeholder="Ej: Supermercado" required>
                        <span class="input-group-append">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="capital">Capital inicial:</label>
                    <div class="input-group">
                        <span class="input-group-prepend">$</span>
                        <input type="number" id="capital" name="capital" placeholder="Ej: 1000" required>
                    </div>
                </div>
                <div class="botones">
                    <a href="EGM-002.php" class="menu-button">Menú Principal</a>
                    <button type="submit" class="menu-button">Crear</button>
                </div>
            </form>
        </div>
    </div>
    <script src="script-crear-negocio.js"></script>
</body>
</html>