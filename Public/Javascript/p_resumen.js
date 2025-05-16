const gananciasTotalesElement = document.getElementById("ganancias-totales");
const tablaProductos = document.querySelector("#resumenProductos tbody");
const masVendidosSelect = document.getElementById("masVendidosSelect");
const invertidoInput = document.getElementById("invertido");
const gananciasInput = document.getElementById("ganancias");
const capitalElement = document.getElementById("capital");
const paginacionElement = document.querySelector(".paginacion");

// Datos de ejemplo
let gananciasTotales = 125000;
const productosMasVendidos = [
  { nombre: "Producto A", cantidad: 150, precio: 25 },
  { nombre: "Producto B", cantidad: 120, precio: 18 },
  { nombre: "Producto C", cantidad: 100, precio: 30 },
  { nombre: "Producto D", cantidad: 200, precio: 15 },
  { nombre: "Producto E", cantidad: 50, precio: 40 },
  { nombre: "Producto F", cantidad: 80, precio: 22 },
  { nombre: "Producto G", cantidad: 30, precio: 60 },
  { nombre: "Producto H", cantidad: 180, precio: 12 },
  { nombre: "Producto I", cantidad: 95, precio: 28 },
  { nombre: "Producto J", cantidad: 110, precio: 33 },
];
const productosMenosVendidos = [
  { nombre: "Producto X", cantidad: 10, precio: 40 },
  { nombre: "Producto Y", cantidad: 20, precio: 35 },
  { nombre: "Producto Z", cantidad: 30, precio: 50 },
  { nombre: "Producto W", cantidad: 5, precio: 100 },
  { nombre: "Producto K", cantidad: 12, precio: 75 },
  { nombre: "Producto L", cantidad: 18, precio: 60 },
  { nombre: "Producto M", cantidad: 25, precio: 55 },
  { nombre: "Producto N", cantidad: 8, precio: 90 },
  { nombre: "Producto O", cantidad: 15, precio: 80 },
  { nombre: "Producto P", cantidad: 22, precio: 62 },
];

let paginaActual = 1;
const productosPorPagina = 4;
let tipoOrden = "masVendidos";
let totalPaginas = 0;

// Formatear el dinero a pesos dominicanos
function formatMoney(amount) {
  return amount.toLocaleString("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Calcula el valor invertido y las ganancias totales
function calcularInversionYGanancias() {
  let valorInvertido = 0;
  let productos =
    tipoOrden === "masVendidos" ? productosMasVendidos : productosMenosVendidos;
  productos.forEach((producto) => {
    valorInvertido += producto.precio * producto.cantidad;
  });
  const ganancias = gananciasTotales - valorInvertido;
  return { invertido: valorInvertido, ganancias: ganancias };
}

// Actualiza la tabla de productos
function actualizarTabla(productos, pagina) {
  tablaProductos.innerHTML = "";

  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productos.slice(inicio, fin);

  if (productosPagina.length === 0) {
    tablaProductos.innerHTML =
      '<tr><td colspan="3" class="no-products">No hay productos en esta página.</td></tr>';
  } else {
    productosPagina.forEach((producto, index) => {
      const fila = document.createElement("tr");
      fila.className = "entrada-suave";
      fila.style.animationDelay = `${index * 0.15}s`;
      fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${formatMoney(producto.precio)}</td>
            `;
      fila.addEventListener("click", () => {
        reproducirSonido("clic");
        fila.classList.add("pulso");
        setTimeout(() => fila.classList.remove("pulso"), 500);
      });
      tablaProductos.appendChild(fila);
    });
  }

  // Actualizar valores financieros
  const { invertido, ganancias } = calcularInversionYGanancias();
  invertidoInput.value = formatMoney(invertido);
  gananciasInput.value = formatMoney(ganancias);
  capitalElement.textContent = formatMoney(obtenerCapitalInicial());
  gananciasTotalesElement.textContent = formatMoney(gananciasTotales);
}

// Calcula y muestra los valores financieros
function calcularYMostrarValores() {
  const { invertido, ganancias } = calcularInversionYGanancias();
  const capitalInicial = obtenerCapitalInicial();

  invertidoInput.value = formatMoney(invertido);
  gananciasInput.value = formatMoney(ganancias);
  capitalElement.textContent = formatMoney(capitalInicial);
  gananciasTotalesElement.textContent = formatMoney(gananciasTotales);

  // Efectos visuales para actualización (sidebar inputs)
  [invertidoInput, gananciasInput].forEach((el) => {
    el.classList.add("pulso-actualizacion");
    setTimeout(() => el.classList.remove("pulso-actualizacion"), 500);
  });
}

// Obtiene el capital inicial
function obtenerCapitalInicial() {
  return 100000;
}

// Actualiza la paginación
function actualizarPaginacion() {
  paginacionElement.innerHTML = "";
  const productos =
    tipoOrden === "masVendidos" ? productosMasVendidos : productosMenosVendidos;
  totalPaginas = Math.ceil(productos.length / productosPorPagina);

  if (totalPaginas <= 1) {
    paginacionElement.innerHTML =
      '<span class="paginacion-btn active">1</span>';
    return;
  }

  const prevSpan = document.createElement("span");
  prevSpan.textContent = "«";
  prevSpan.className = "paginacion-btn";
  prevSpan.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      actualizarTabla(productos, paginaActual);
      actualizarPaginacion();
      reproducirSonido("clic");
    }
  });
  paginacionElement.appendChild(prevSpan);

  for (let i = 1; i <= totalPaginas; i++) {
    const span = document.createElement("span");
    span.textContent = i;
    span.className = "paginacion-btn";
    if (i === paginaActual) {
      span.classList.add("active");
    }
    span.addEventListener("click", () => {
      paginaActual = i;
      actualizarTabla(productos, paginaActual);
      actualizarPaginacion();
      reproducirSonido("clic");
    });
    paginacionElement.appendChild(span);
  }

  const nextSpan = document.createElement("span");
  nextSpan.textContent = "»";
  nextSpan.className = "paginacion-btn";
  nextSpan.addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      actualizarTabla(productos, paginaActual);
      actualizarPaginacion();
      reproducirSonido("clic");
    }
  });
  paginacionElement.appendChild(nextSpan);
}

// Inicialización de la página
function inicializarPagina() {
  masVendidosSelect.value = tipoOrden;

  let productosIniciales = [];
  if (tipoOrden === "masVendidos") {
    productosMasVendidos.sort((a, b) => b.cantidad - a.cantidad);
    productosIniciales = productosMasVendidos;
  } else {
    productosMenosVendidos.sort((a, b) => a.cantidad - b.cantidad);
    productosIniciales = productosMenosVendidos;
  }

  actualizarTabla(productosIniciales, paginaActual);
  calcularYMostrarValores();
  actualizarPaginacion();

  // Animación inicial
  document.querySelector(".main-content").classList.add("entrada-suave");
  document.querySelector(".summary-sidebar").classList.add("entrada-lateral");
  document
    .querySelectorAll(".stat-card")
    .forEach((card) => card.classList.add("pulso-inicial"));
}

// Configurar eventos
masVendidosSelect.addEventListener("change", () => {
  paginaActual = 1;
  tipoOrden = masVendidosSelect.value;
  let productos = [];
  if (tipoOrden === "masVendidos") {
    productos = productosMasVendidos.slice();
    productos.sort((a, b) => b.cantidad - a.cantidad);
  } else {
    productos = productosMenosVendidos.slice();
    productos.sort((a, b) => a.cantidad - b.cantidad);
  }
  actualizarTabla(productos, paginaActual);
  actualizarPaginacion();
  reproducirSonido("clic");
});

// Inicializar página
document.addEventListener("DOMContentLoaded", inicializarPagina);
