

// Inicializar el panel de administración
function inicializarAdministracion() {
  actualizarDatosNegocio();
  iniciarEfectosVisuales();
  mostrarMontoPrestamo();
  obtenerNivelJugador();
  // Actualizar cada 5 segundos (simulación)
  setInterval(actualizarDatosNegocio, 5000);

  // setInterval(() => crearBackgroundParticles(), 1000);
}

// Actualizar los datos del negocio en la interfaz
async function actualizarDatosNegocio() {
  try {
    const res = await fetch("../../Config/estadisticas.php");
    const datos = await res.json();

    if (datos.error) {
      console.error(datos.error);
      return;
    }
    document.getElementById("nombre-negocio").textContent = datos.nombre_negocio;


    // Capital
    // document.getElementById("capital").textContent = `$${(datos.ventas).toFixed(2)}`;

    // Inventario
    document.getElementById("contenido-inventario").innerHTML = `
      <div class="item-info"><span class="item-etiqueta">Productos:</span>
      <span class="item-valor">${datos.inventario.tipos} tipos</span></div>
      <div class="item-info"><span class="item-etiqueta">Stock total:</span>
      <span class="item-valor">${datos.inventario.total_stock} unidades</span></div>
      <div class="item-info"><span class="item-etiqueta">Más stock:</span>
      <span class="item-valor">${datos.mas_stock} (${datos.inventario.max_stock})</span></div>
      <div class="item-info"><span class="item-etiqueta">Menos stock:</span>
      <span class="item-valor">${datos.menos_stock} (${datos.inventario.min_stock})</span></div>
    `;

    // Finanzas
    document.getElementById("contenido-finanzas").innerHTML = `
      <div class="item-info"><span class="item-etiqueta">Ventas:</span>
      <span class="item-valor">$${datos.ventas.toFixed(2)}</span></div>
      <div class="item-info"><span class="item-etiqueta">Compras:</span>
      <span class="item-valor">$${datos.compras.toFixed(2)}</span></div>
      <div class="item-info"><span class="item-etiqueta">Beneficio:</span>
      <span class="item-valor">$${datos.beneficio.toFixed(2)}</span></div>
      <div class="item-info"><span class="item-etiqueta">Margen:</span>
      <span class="item-valor">${datos.margen}%</span></div>
    `;

    // Indicadores
    document.getElementById("contenido-indicadores").innerHTML = `
      <div class="item-info"><span class="item-etiqueta">Top Producto:</span>
      <span class="item-valor">${datos.top_producto}</span></div>
      <div class="item-info"><span class="item-etiqueta">Cliente Frecuente:</span>
      <span class="item-valor">${datos.top_cliente}</span></div>
      
      </div></div>
      <div class="item-info"><span class="item-etiqueta">Rotación Stock:</span>
      <span class="item-valor">7 días</span></div>
    `;

    // document.querySelectorAll(".caja-juego").forEach((caja) => {
    //   caja.classList.add("pulso");
    //   setTimeout(() => caja.classList.remove("pulso"), 500);
    //   crearBoxParticles(caja);
    // });

  } catch (error) {
    console.error("Error al cargar estadísticas:", error);
  }
}


// Iniciar efectos visuales
function iniciarEfectosVisuales() {
  // Efecto de monedas en el capital
  const capitalBox = document.querySelector(".capital-box");
  setInterval(() => {
    crearParticulas(capitalBox, "monedas");
  }, 10000);

  // Animación escalonada de las cajas
  document.querySelectorAll(".caja-juego").forEach((caja, index) => {
    caja.style.animationDelay = `${index * 0.2}s`;
  });
}
function mostrarMontoPrestamo() {
    fetch('../../Config/obtenerMontoPrestamo.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('credito').innerText = data.montoPrestamo;
                document.getElementById('credito').style.color = 'red';
                
            } else {
                console.error("Error:", data.message);
                document.getElementById('credito').innerText = "0";
                
            }
        })
        .catch(error => {
            console.error("Error al obtener el monto del préstamo:", error);
        });
}
function obtenerNivelJugador() {
    fetch('../../Config/obtener_nivel.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('nivel').textContent = data.nivel;
            } else {
                console.error("Error:", data.message);
            }
        })
        .catch(error => {
            console.error("Error al obtener el nivel del jugador:", error);
        });
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", inicializarAdministracion);
