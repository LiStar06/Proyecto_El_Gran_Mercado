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
                    <label for="tipoNegocio">Tipo de negocio:</label>
                    <select id="tipoNegocio" name="tipoNegocio" required>
                        <option value="" disabled selected>Selecciona un tipo de negocio</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="capitalInicial">Capital inicial:</label>
                    <select id="capitalInicial" name="capitalInicial" required>
                        <option value="" disabled selected>Selecciona un capital inicial</option>
                    </select>
                </div>
                <div class="botones">
                    <a href="EGM-002.php" class="menu-button">Menú Principal</a>
                    <button type="submit" class="menu-button">Crear</button>
                </div>
            </form>
        </div>
    </div>
    <script src="../Javascript/crear_negocio.js"></script>
</body>
</html>