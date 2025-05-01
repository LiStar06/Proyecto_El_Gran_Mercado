<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ofertas del Jugador</title>
  <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>
  <h2>Ofertas Activas</h2>
  <div id="ofertas"></div>

  <script>
  fetch('../php/obtener_ofertas.php')
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById("ofertas");
      if (data.length === 0) {
        contenedor.innerHTML = "<p>No hay ofertas activas</p>";
      } else {
        data.forEach(oferta => {
          contenedor.innerHTML += `
            <div class="oferta">
              <h4>${oferta.nombre_negocio}</h4>
              <p>${oferta.descripcion}</p>
              <small>Válida del ${oferta.fecha_inicio} al ${oferta.fecha_fin}</small>
            </div>
          `;
        });
      }
    });
  </script>
</body>
</html>