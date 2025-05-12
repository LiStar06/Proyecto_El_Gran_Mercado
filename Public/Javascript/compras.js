// Gestiona las funcionalidades de compras,

// Calcula el monto total de la compra (cantidad * precio unitario) y actualiza el campo correspondiente.
function calcularMontoCompra() {
  const entradaCantidadCompra = document.getElementById("cantidadCompra");
  const entradaPrecioUnitario = document.getElementById("precioUnitario");
  const entradaMontoCompra = document.getElementById("montoCompra");

  // Validación de existencia de elementos
  if (entradaCantidadCompra && entradaPrecioUnitario && entradaMontoCompra) {
    const cantidad = parseInt(entradaCantidadCompra.value) || 0;
    const precio = parseFloat(entradaPrecioUnitario.value) || 0;
    entradaMontoCompra.value = (cantidad * precio).toFixed(2);

    // Añade animación visual si los valores son válidos
    if (cantidad > 0 && precio > 0) {
      entradaMontoCompra.classList.add("pulso");
      setTimeout(() => entradaMontoCompra.classList.remove("pulso"), 500); // Elimina animación tras 500ms
    }
  }
}

// Procesa la compra de un producto, actualiza inventario y capital, y proporciona retroalimentación visual/sonora.
function comprarProducto() {
  retroalimentacionVibracion(); // Activa vibración háptica

  // Cacheo de elementos DOM
  const selectorProducto = document.getElementById("productoSelect");
  const entradaCantidadCompra = document.getElementById("cantidadCompra");
  const entradaPrecioUnitario = document.getElementById("precioUnitario");
  const cantidad = parseInt(entradaCantidadCompra.value) || 0;
  const precio = parseFloat(entradaPrecioUnitario.value) || 0;
  const monto = cantidad * precio;

  // Validaciones de entrada
  if (!selectorProducto.value) {
    selectorProducto.classList.add("sacudir"); // Animación de error
    setTimeout(() => selectorProducto.classList.remove("sacudir"), 500);
    mostrarMensaje("¡Selecciona un producto!", "error");
    return;
  }
  if (cantidad <= 0) {
    entradaCantidadCompra.classList.add("sacudir");
    setTimeout(() => entradaCantidadCompra.classList.remove("sacudir"), 500);
    mostrarMensaje("¡Cantidad inválida!", "error");
    return;
  }
  if (monto > capital) {
    document.querySelector(".visualizador-capital").classList.add("sacudir");
    setTimeout(
      () =>
        document
          .querySelector(".visualizador-capital")
          .classList.remove("sacudir"),
      500
    );
    mostrarMensaje("¡Capital insuficiente!", "error");
    return;
  }

  // Busca producto existente o crea uno nuevo
  let producto = inventario.find((p) => p.nombre === selectorProducto.value);

  if (producto) {
    producto.cantidad += cantidad; // Actualiza cantidad en inventario existente
  } else {
    // Crea nuevo producto con ID único y propiedades
    producto = {
      id: inventario.length + 1,
      nombre: selectorProducto.value,
      cantidad: cantidad,
      precio: precio,
      codigo: `P${inventario.length + 1}`,
      demanda: Math.floor(Math.random() * 10) + 1, // Demanda aleatoria entre 1 y 10
    };
    inventario.push(producto); // Añade al inventario

    // Añade opción al selector de productos
    const opcion = document.createElement("option");
    opcion.value = producto.nombre;
    opcion.textContent = producto.nombre;
    opcion.dataset.id = producto.id;
    selectorProducto.appendChild(opcion);
    selectorProducto.classList.add("resaltar");
    setTimeout(() => selectorProducto.classList.remove("resaltar"), 1000);
  }

  capital -= monto; // Deduce monto del capital
  actualizarInterfaz(); // Refresca la interfaz
  mostrarMensaje(`¡Compra exitosa! +${cantidad} unidades`, "exito");

  reiniciarFormularioCompras();
  document.querySelector(".contenedor-admin").classList.add("pulso");
  setTimeout(
    () => document.querySelector(".contenedor-admin").classList.remove("pulso"),
    500
  );

  // Efectos visuales y sonoros
  crearParticulas(document.querySelector(".action-btn"), "ganancia");
  reproducirSonido("transicion");
  efectoActualizacion(document.getElementById("capital"));
}

// Limpia los campos del formulario de compras
function reiniciarFormularioCompras() {
  const selectorProducto = document.getElementById("productoSelect");
  const entradaCantidadCompra = document.getElementById("cantidadCompra");
  const entradaPrecioUnitario = document.getElementById("precioUnitario");
  const entradaMontoCompra = document.getElementById("montoCompra");
  const entradaDisponible = document.getElementById("disponible");
  const entradaDemanda = document.getElementById("demanda");

  // Limpia valores de los elementos si existen
  if (selectorProducto) selectorProducto.value = "";
  if (entradaCantidadCompra) entradaCantidadCompra.value = "";
  if (entradaPrecioUnitario) entradaPrecioUnitario.value = "";
  if (entradaMontoCompra) entradaMontoCompra.value = "";
  if (entradaDisponible) entradaDisponible.value = "";
  if (entradaDemanda) entradaDemanda.value = "";
}

// Configura eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const entradaCantidadCompra = document.getElementById("cantidadCompra");
  if (entradaCantidadCompra) {
    entradaCantidadCompra.addEventListener("input", calcularMontoCompra);
  }

  reiniciarFormularioCompras();
});
