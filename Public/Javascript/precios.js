let productoActual = null;

// Bandera temporal para deshabilitar conexión al servidor
const MODO_DESARROLLADO_SIN_CONEXION = true; // Cambiar a false cuando la conexión esté lista

document.addEventListener("DOMContentLoaded", () => {
  cargarSelectores();
  configurarEventos();
  actualizarCapital();

  document.querySelector(".contenedor-admin").classList.add("entrada-suave");
});

function configurarEventos() {
  document
    .getElementById("productoSelect")
    .addEventListener("change", function () {
      productoActual = inventario.find((p) => p.nombre === this.value);
      actualizarInfoProducto();
      reproducirSonido("clic");
    });

  document
    .getElementById("nuevoPrecio")
    .addEventListener("input", calcularDiferencia);
}

function actualizarInfoProducto() {
  if (!productoActual) return;

  const { codigo, cantidad, precio, demanda } = productoActual;

  document.getElementById("codigoProducto").value = codigo;
  document.getElementById("existencias").value = cantidad;
  document.getElementById("precioActual").value = precio.toFixed(2);
  document.getElementById("nuevoPrecio").value = "";

  const porcentajeDemanda = Math.min(100, demanda * 10);
  const barraDemanda = document.getElementById("barraDemanda");
  barraDemanda.style.width = `${porcentajeDemanda}%`;

  barraDemanda.style.background =
    porcentajeDemanda > 70
      ? "var(--color-exito)"
      : porcentajeDemanda > 30
      ? "var(--color-secundario)"
      : "var(--color-error)";

  document.getElementById("textoDemanda").textContent = `${demanda}/10`;
  calcularDiferencia();
}

function calcularDiferencia() {
  if (!productoActual) return;

  const nuevoPrecio =
    parseFloat(document.getElementById("nuevoPrecio").value) ||
    productoActual.precio;
  const diferencia = nuevoPrecio - productoActual.precio;
  const porcentaje = ((diferencia / productoActual.precio) * 100).toFixed(2);

  const difElement = document.getElementById("diferenciaPrecio");
  const textoElement = document.getElementById("textoDiferencia");

  textoElement.textContent = `${diferencia >= 0 ? "+" : ""}${diferencia.toFixed(
    2
  )} (${porcentaje}%)`;

  if (diferencia > 0) {
    difElement.style.color = "var(--color-exito)";
    textoElement.innerHTML += " ↑";
  } else if (diferencia < 0) {
    difElement.style.color = "var(--color-error)";
    textoElement.innerHTML += " ↓";
  } else {
    difElement.style.color = "var(--color-secundario)";
  }
}

async function guardarPrecio() {
  if (!productoActual) {
    mostrarMensaje("Selecciona un producto primero", "error");
    document.getElementById("productoSelect").classList.add("sacudir");
    setTimeout(
      () =>
        document.getElementById("productoSelect").classList.remove("sacudir"),
      500
    );
    return;
  }

  const nuevoPrecio = parseFloat(document.getElementById("nuevoPrecio").value);
  if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
    mostrarMensaje("Ingresa un precio válido", "error");
    document.getElementById("nuevoPrecio").classList.add("sacudir");
    setTimeout(
      () => document.getElementById("nuevoPrecio").classList.remove("sacudir"),
      500
    );
    return;
  }

  const precioAnterior = productoActual.precio;
  const precioActualizado = parseFloat(nuevoPrecio.toFixed(2));

  if (MODO_DESARROLLADO_SIN_CONEXION) {
    console.log("Modo sin conexión: actualizando precio solo en el cliente.");
    productoActual.precio = precioActualizado;
    inventario = inventario.map((p) =>
      p.id === productoActual.id ? { ...p, precio: precioActualizado } : p
    );

    crearParticulas(document.querySelector(".action-btn"), "exito");
    retroalimentacionVibracion(50);
    document.querySelector(".action-btn").classList.add("pulso");

    mostrarMensaje(
      `Precio actualizado de $${precioAnterior} a $${precioActualizado.toFixed(
        2
      )}`,
      "exito"
    );

    setTimeout(() => {
      document.querySelector(".action-btn").classList.remove("pulso");
      actualizarInfoProducto();
    }, 500);
    return;
  }

  try {
    const response = await fetch("../../Config/actualizar_precio.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_producto_juego: productoActual.id,
        precio: precioActualizado,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el precio en el servidor.");
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Respuesta del servidor (no es JSON):", text);
      throw new Error("El servidor no devolvió un formato JSON válido.");
    }

    const data = await response.json();
    if (data.success) {
      productoActual.precio = precioActualizado;
      inventario = inventario.map((p) =>
        p.id === productoActual.id ? { ...p, precio: precioActualizado } : p
      );

      crearParticulas(document.querySelector(".action-btn"), "exito");
      retroalimentacionVibracion(50);
      document.querySelector(".action-btn").classList.add("pulso");

      mostrarMensaje(
        `Precio actualizado de $${precioAnterior} a $${precioActualizado.toFixed(
          2
        )}`,
        "exito"
      );

      setTimeout(() => {
        document.querySelector(".action-btn").classList.remove("pulso");
        actualizarInfoProducto();
      }, 500);
    } else {
      throw new Error(data.message || "Error al actualizar el precio.");
    }
  } catch (error) {
    console.error("Error al guardar precio:", error);
    mostrarMensaje("Error al actualizar el precio. Intenta de nuevo.", "error");
  }
}
