// Funciones específicas de ventas
function generarCantidadPedida() {
  const selectorCliente = document.getElementById("clienteSelect");
  const selectorProducto = document.getElementById("productoSelect");
  if (
    selectorCliente &&
    selectorProducto &&
    selectorCliente.value &&
    selectorProducto.value
  ) {
    const cantidadPedida = Math.floor(Math.random() * 10) + 1;
    const entradaCantidadPedida = document.getElementById("cantidadPedida");
    if (entradaCantidadPedida) {
      entradaCantidadPedida.value = cantidadPedida;
      entradaCantidadPedida.classList.add("resaltar");
      setTimeout(
        () => entradaCantidadPedida.classList.remove("resaltar"),
        1000
      );
      calcularMonto();
    }
  }
}

function calcularMonto() {
  const selectorProducto = document.getElementById("productoSelect");
  const entradaCantidadVender = document.getElementById("cantidadVender");
  const entradaMontoVenta = document.getElementById("montoVenta");

  if (
    selectorProducto &&
    entradaCantidadVender &&
    entradaMontoVenta &&
    selectorProducto.value
  ) {
    const cantidad = parseInt(entradaCantidadVender.value) || 0;
    const producto = inventario.find(
      (p) => p.nombre === selectorProducto.value
    );
    if (producto) {
      entradaMontoVenta.value = (cantidad * producto.precio).toFixed(2);

      if (cantidad > 0) {
        entradaMontoVenta.classList.add("pulso");
        setTimeout(() => entradaMontoVenta.classList.remove("pulso"), 500);
      }
    } else {
      entradaMontoVenta.value = "";
    }
  }
}

async function venderProducto() {
  retroalimentacionVibracion();

  const selectorCliente = document.getElementById("clienteSelect");
  const selectorProducto = document.getElementById("productoSelect");
  const entradaCantidadVender = document.getElementById("cantidadVender");
  const cantidadVender = parseInt(entradaCantidadVender.value) || 0;
  const producto = inventario.find((p) => p.nombre === selectorProducto.value);

  if (!selectorCliente.value) {
    selectorCliente.classList.add("sacudir");
    setTimeout(() => selectorCliente.classList.remove("sacudir"), 500);
    mostrarMensaje("Selecciona un cliente", "error");
    return;
  }
  if (!selectorProducto.value) {
    selectorProducto.classList.add("sacudir");
    setTimeout(() => selectorProducto.classList.remove("sacudir"), 500);
    mostrarMensaje("Selecciona un producto", "error");
    return;
  }
  if (cantidadVender <= 0) {
    entradaCantidadVender.classList.add("sacudir");
    setTimeout(() => entradaCantidadVender.classList.remove("sacudir"), 500);
    mostrarMensaje("Cantidad inválida", "error");
    return;
  }
  if (!producto || producto.cantidad < cantidadVender) {
    const entradaDisponible = document.getElementById("cantidadDisponible");
    entradaDisponible.classList.add("sacudir");
    setTimeout(() => entradaDisponible.classList.remove("sacudir"), 500);
    mostrarMensaje("Stock insuficiente", "error");
    return;
  }

  try {
    const monto = cantidadVender * producto.precio;
    producto.cantidad -= cantidadVender;
    capital += monto;

    ventas.push({
      producto_id: producto.id,
      nombre: producto.nombre,
      cantidad: cantidadVender,
      monto: monto,
      cliente: selectorCliente.value,
      fecha: new Date().toISOString(),
    });

    actualizarInterfaz();
    mostrarMensaje(
      `Venta realizada: ${cantidadVender} unidades por $${monto}`,
      "exito"
    );

    reiniciarFormularioVentas();
    document.querySelector(".contenedor-admin").classList.add("pulso");
    setTimeout(
      () =>
        document.querySelector(".contenedor-admin").classList.remove("pulso"),
      500
    );
  } catch (error) {
    mostrarMensaje("Error al procesar venta: " + error.message, "error");
  }

  // Añadir al final:
  crearParticulas(document.querySelector(".action-btn"), "monedas");
  reproducirSonido("transicion");
  efectoActualizacion(document.getElementById("capital"));
}

function reiniciarFormularioVentas() {
  const selectorCliente = document.getElementById("clienteSelect");
  const selectorProducto = document.getElementById("productoSelect");
  const entradaCantidadPedida = document.getElementById("cantidadPedida");
  const entradaCantidadVender = document.getElementById("cantidadVender");
  const entradaCantidadDisponible =
    document.getElementById("cantidadDisponible");
  const entradaMontoVenta = document.getElementById("montoVenta");

  if (selectorCliente) selectorCliente.value = "";
  if (selectorProducto) selectorProducto.value = "";
  if (entradaCantidadPedida) entradaCantidadPedida.value = "";
  if (entradaCantidadVender) entradaCantidadVender.value = "0";
  if (entradaCantidadDisponible) entradaCantidadDisponible.value = "";
  if (entradaMontoVenta) entradaMontoVenta.value = "";
}

// Event listeners específicos de ventas
document.addEventListener("DOMContentLoaded", () => {
  const entradaCantidadVender = document.getElementById("cantidadVender");
  if (entradaCantidadVender) {
    entradaCantidadVender.addEventListener("input", calcularMonto);
  }

  reiniciarFormularioVentas();
});
