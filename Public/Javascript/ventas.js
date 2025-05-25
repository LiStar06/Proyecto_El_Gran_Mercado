

async function venderProducto() {
  retroalimentacionVibracion();

  const selectorCliente = document.getElementById("clienteSelect");
  const selectorProducto = document.getElementById("productoSelect");
  const entradaCantidadVender = document.getElementById("cantidadVender");
  const entradaDisponible = document.getElementById("cantidadDisponible");
  const entradaPedida = document.getElementById("cantidadPedida");

  const cantidadVender = parseInt(entradaCantidadVender.value) || 0;
  const cantidadDisponible = parseInt(entradaDisponible.value) || 0;
  const cantidadPedida = parseInt(entradaPedida.value) || 0;

  // const producto = inventario.find((p) => p.nombre === selectorProducto.value);

  // Validaciones básicas
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

  // Validación de stock
  if (cantidadDisponible < cantidadVender) {
    entradaDisponible.classList.add("sacudir");
    setTimeout(() => entradaDisponible.classList.remove("sacudir"), 500);
    mostrarMensaje("Stock insuficiente", "error");
    return;
  }

  // Validación contra cantidad pedida
  if (cantidadVender > cantidadPedida) {
    entradaCantidadVender.classList.add("sacudir");
    setTimeout(() => entradaCantidadVender.classList.remove("sacudir"), 500);
    mostrarMensaje("No puedes vender más de lo que el cliente pidió", "error");
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
  registrarVenta();
  crearParticulas(document.querySelector(".action-btn"), "monedas");
  reproducirSonido("transicion");
  efectoActualizacion(document.getElementById("capital"));
}
async function registrarVenta() {
    const clienteId = document.getElementById("clienteSelect").value;
    const productoSelect = document.getElementById("productoSelect");
    const productoId = productoSelect.value;
    const cantidad = parseInt(document.getElementById("cantidadVender").value) || 0;
    const precioUnitario = parseFloat(document.getElementById("precio").value) || 0;
    const montoTotal = parseFloat(document.getElementById("montoVenta").value) || 0;

    if (!clienteId || !productoId || cantidad <= 0 || precioUnitario <= 0) {
        mostrarMensaje("Datos inválidos", "error");
        return;
    }

    const venta = {
        cliente_id: parseInt(clienteId),
        producto_id: parseInt(productoId), // 👈 Cambiado
        cantidad: cantidad,
        precio_unitario: precioUnitario,
        monto_total: montoTotal
    };

    try {
        const response = await fetch("../../Config/vender.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(venta)
        });

        const result = await response.json();

        if (result.exito) {
            mostrarMensaje(result.exito, "exito");
            reiniciarFormularioVentas();
            actualizarCapital();
        } else {
            mostrarMensaje(result.error, "error");
        }

    } catch (error) {
        mostrarMensaje("Error de red: " + error.message, "error");
    }
}
function reiniciarFormularioVentas() {
    const selectorCliente = document.getElementById("clienteSelect");
    const selectorProducto = document.getElementById("productoSelect");
    const entradaCantidadPedida = document.getElementById("cantidadPedida");
    const entradaCantidadDisponible = document.getElementById("cantidadDisponible");
    const entradaCantidadVender = document.getElementById("cantidadVender");
    const entradaPrecio = document.getElementById("precio");
    const entradaMontoVenta = document.getElementById("montoVenta");

    if (selectorCliente) selectorCliente.value = "";
    if (selectorProducto) selectorProducto.innerHTML = '<option value="">Selecciona un producto</option>';
    if (entradaCantidadPedida) entradaCantidadPedida.value = "";
    if (entradaCantidadDisponible) entradaCantidadDisponible.value = "";
    if (entradaCantidadVender) entradaCantidadVender.value = "";
    if (entradaPrecio) entradaPrecio.value = "";
    if (entradaMontoVenta) entradaMontoVenta.value = "";
}


// Event listeners específicos de ventas
document.addEventListener("DOMContentLoaded", () => {
  const entradaCantidadVender = document.getElementById("cantidadVender");
  if (entradaCantidadVender) {
    // entradaCantidadVender.addEventListener("input", calcularMonto);
  }

  // reiniciarFormularioVentas();
});
