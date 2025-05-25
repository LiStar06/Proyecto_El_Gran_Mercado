const gananciasTotalesElement = document.getElementById("ganancias-totales");
const tablaProductos = document.querySelector("#resumenProductos tbody");
const masVendidosSelect = document.getElementById("masVendidosSelect");
const invertidoInput = document.getElementById("invertido");
const gananciasInput = document.getElementById("ganancias");
const capitalElement = document.getElementById("capital");
const paginacionElement = document.querySelector(".paginacion");

let productosMasVendidos = [];
let productosMenosVendidos = [];
let gananciasTotales = 0;
let totalInvertido = 0;

let paginaActual = 1;
const productosPorPagina = 4;
let tipoOrden = "masVendidos";
let totalPaginas = 0;

function formatMoney(amount) {
  return Number(amount).toLocaleString("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function calcularInversionYGanancias() {
  const ganancias = gananciasTotales - totalInvertido;
  return { invertido: totalInvertido, ganancias: ganancias };
}

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

  const { invertido, ganancias } = calcularInversionYGanancias();
  invertidoInput.value = formatMoney(invertido);
  gananciasInput.value = formatMoney(ganancias);
  gananciasTotalesElement.textContent = formatMoney(gananciasTotales);
}

function calcularYMostrarValores() {
  const { invertido, ganancias } = calcularInversionYGanancias();
  const capital = document.getElementById("capital");
  const capitalInicial = capital;

  invertidoInput.value = formatMoney(invertido);
  gananciasInput.value = formatMoney(ganancias);
  capitalElement.textContent = formatMoney(capitalInicial);
  gananciasTotalesElement.textContent = formatMoney(gananciasTotales);

  [invertidoInput, gananciasInput].forEach((el) => {
    el.classList.add("pulso-actualizacion");
    setTimeout(() => el.classList.remove("pulso-actualizacion"), 500);
  });
}

// function obtenerCapitalInicial() {
//   return 100000;
// }

function actualizarPaginacion() {
  paginacionElement.innerHTML = "";
  const productos = tipoOrden === "masVendidos" ? productosMasVendidos : productosMenosVendidos;
  totalPaginas = Math.ceil(productos.length / productosPorPagina);

  if (totalPaginas <= 1) {
    paginacionElement.innerHTML = '<span class="paginacion-btn active">1</span>';
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

function inicializarPagina() {
  fetch("../../Config/resumen.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        productosMasVendidos = data.masVendidos;
        productosMenosVendidos = data.menosVendidos;
        gananciasTotales = parseFloat(data.totalVentas);
        totalInvertido = parseFloat(data.totalInvertido);

        masVendidosSelect.value = tipoOrden;

        let productosIniciales = tipoOrden === "masVendidos"
          ? productosMasVendidos
          : productosMenosVendidos;

        actualizarTabla(productosIniciales, paginaActual);
        calcularYMostrarValores();
        actualizarPaginacion();

        document.querySelector(".main-content").classList.add("entrada-suave");
        document.querySelector(".summary-sidebar").classList.add("entrada-lateral");
        document.querySelectorAll(".stat-card").forEach((card) => card.classList.add("pulso-inicial"));
      } else {
        console.error("Error en respuesta del servidor:", data.message);
      }
    })
    .catch((err) => console.error("Error al obtener datos del resumen:", err));
}

masVendidosSelect.addEventListener("change", () => {
  paginaActual = 1;
  tipoOrden = masVendidosSelect.value;
  let productos = tipoOrden === "masVendidos"
    ? productosMasVendidos
    : productosMenosVendidos;

  actualizarTabla(productos, paginaActual);
  actualizarPaginacion();
  reproducirSonido("clic");
});

// Ejecutar al cargar
inicializarPagina();
// Inicializar página
// document.addEventListener("DOMContentLoaded", inicializarPagina);
