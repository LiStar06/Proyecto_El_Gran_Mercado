// administracion.js - Funciones específicas para el panel de administración

// Datos iniciales del negocio
const datosNegocio = {
  nombre: "Mercado Central",
  capital: 1000,
  productos: [
    {
      id: 1,
      nombre: "Manzanas",
      cantidad: 20,
      precio: 15,
      codigo: "P001",
      demanda: 5,
    },
    {
      id: 2,
      nombre: "Peras",
      cantidad: 15,
      precio: 18,
      codigo: "P002",
      demanda: 8,
    },
    {
      id: 3,
      nombre: "Plátanos",
      cantidad: 30,
      precio: 12,
      codigo: "P003",
      demanda: 3,
    },
  ],
  ventas: [],
  clientes: ["Edwin", "Manuela", "Liyan", "Luis", "Yamira"],
};

// Inicializar el panel de administración
function inicializarAdministracion() {
  actualizarDatosNegocio();
  configurarInteracciones();
  iniciarEfectosVisuales();

  // Actualizar cada 5 segundos (simulación)
  setInterval(actualizarDatosNegocio, 5000);

  setInterval(() => crearBackgroundParticles(), 1000);
}

// Actualizar los datos del negocio en la interfaz
function actualizarDatosNegocio() {
  // Actualizar capital
  document.getElementById("capital").textContent = `$${capital.toFixed(2)}`;

  // Calcular estadísticas
  const totalProductos = inventario.length;
  const totalStock = inventario.reduce(
    (sum, producto) => sum + producto.cantidad,
    0
  );
  const maxStock = Math.max(...inventario.map((p) => p.cantidad));
  const minStock = Math.min(...inventario.map((p) => p.cantidad));
  const maxProducto =
    inventario.find((p) => p.cantidad === maxStock)?.nombre || "Ninguno";
  const minProducto =
    inventario.find((p) => p.cantidad === minStock)?.nombre || "Ninguno";

  // Actualizar inventario
  const inventarioHTML = `
        <div class="item-info">
            <span class="item-etiqueta">Productos:</span>
            <span class="item-valor">${totalProductos} tipos</span>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Stock total:</span>
            <span class="item-valor">${totalStock} unidades</span>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Más stock:</span>
            <span class="item-valor">${maxProducto} (${maxStock})</span>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Menos stock:</span>
            <span class="item-valor">${minProducto} (${minStock})</span>
        </div>
    `;
  document.getElementById("contenido-inventario").innerHTML = inventarioHTML;

  // Actualizar finanzas (datos de ejemplo)
  const ventasTotales = ventas.reduce((sum, venta) => sum + venta.monto, 0);
  const comprasTotales = 500; // Esto debería venir de un historial de compras
  const beneficioNeto = ventasTotales - comprasTotales;
  const margenPromedio =
    ventasTotales > 0 ? Math.round((beneficioNeto / ventasTotales) * 100) : 0;

  const finanzasHTML = `
        <div class="item-info">
            <span class="item-etiqueta">Ventas:</span>
            <span class="item-valor">$${ventasTotales.toFixed(2)}</span>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Compras:</span>
            <span class="item-valor">$${comprasTotales.toFixed(2)}</span>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Beneficio:</span>
            <span class="item-valor">$${beneficioNeto.toFixed(2)}</span>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Margen:</span>
            <span class="item-valor">${margenPromedio}%</span>
        </div>
    `;
  document.getElementById("contenido-finanzas").innerHTML = finanzasHTML;

  // Actualizar indicadores (datos de ejemplo)
  const topProducto =
    ventas.length > 0
      ? ventas.reduce((acc, venta) => {
          acc[venta.nombre] = (acc[venta.nombre] || 0) + venta.cantidad;
          return acc;
        }, {})
      : {};
  const productoMasVendido =
    Object.keys(topProducto).length > 0
      ? Object.entries(topProducto).sort((a, b) => b[1] - a[1])[0][0]
      : "Ninguno";

  const topCliente =
    ventas.length > 0
      ? ventas.reduce((acc, venta) => {
          acc[venta.cliente] = (acc[venta.cliente] || 0) + 1;
          return acc;
        }, {})
      : {};
  const clienteFrecuente =
    Object.keys(topCliente).length > 0
      ? Object.entries(topCliente).sort((a, b) => b[1] - a[1])[0][0]
      : "Ninguno";

  const demandaPromedio =
    inventario.length > 0
      ? Math.round(
          inventario.reduce((sum, p) => sum + p.demanda, 0) / inventario.length
        )
      : 0;

  const indicadoresHTML = `
        <div class="item-info">
            <span class="item-etiqueta">Top Producto:</span>
            <span class="item-valor">${productoMasVendido}</span>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Cliente Frecuente:</span>
            <span class="item-valor">${clienteFrecuente}</span>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Demanda Promedio:</span>
            <div class="barra-demanda">
                <div class="barra-demanda-llena" style="width: ${
                  demandaPromedio * 10
                }%"></div>
            </div>
        </div>
        <div class="item-info">
            <span class="item-etiqueta">Rotación Stock:</span>
            <span class="item-valor">7 días</span>
        </div>
    `;
  document.getElementById("contenido-indicadores").innerHTML = indicadoresHTML;

  const barraDemanda = document.querySelector(".barra-demanda-llena");
  if (barraDemanda) {
    barraDemanda.classList.add("glow");
  }

  // Efecto visual al actualizar
  document.querySelectorAll(".caja-juego").forEach((caja) => {
    caja.classList.add("pulso");
    setTimeout(() => caja.classList.remove("pulso"), 500);
    crearBoxParticles(caja); // Add particles to boxes on update
  });
}

// Configurar interacciones
function configurarInteracciones() {
  // Efectos hover en cajas
  document.querySelectorAll(".caja-juego").forEach((caja) => {
    caja.addEventListener("mouseenter", () => {
      reproducirSonido("clic");
      caja.style.transform = "translateY(-5px)";
    });

    caja.addEventListener("mouseleave", () => {
      caja.style.transform = "";
    });
  });

  // Efectos en botones
  document.querySelectorAll(".action-btn").forEach((boton) => {
    boton.addEventListener("mouseenter", () => {
      reproducirSonido("clic");
    });
    boton.addEventListener("click", () => {
      boton.classList.add("ripple"); // Trigger ripple effect
    });
  });
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

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", inicializarAdministracion);
