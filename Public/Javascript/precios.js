// let productoActual = null;

// // Bandera de desarrollo (cambiar a false en producción)
// const MODO_DESARROLLADO_SIN_CONEXION = false;

// document.addEventListener("DOMContentLoaded", () => {
//   configurarEventos();
// });

// function configurarEventos() {
  
//   document.getElementById("productoSelect").addEventListener("change", () => {
//     productoActual = inventario.find((p) => p.nombre === productoSelect.value);
//     actualizarInfoProducto();
//   });

//   document.getElementById("nuevoPrecio").addEventListener("input", calcularDiferencia);
// }

// function actualizarInfoProducto() {
//   if (!productoActual) return;

//   document.getElementById("precioActual").value = productoActual.precio.toFixed(2);
//   document.getElementById("nuevoPrecio").value = "";
//   calcularDiferencia();
// }

// function calcularDiferencia() {
//   if (!productoActual) return;

//   const nuevoPrecio =
//     parseFloat(document.getElementById("nuevoPrecio").value) || productoActual.precio;
//   const diferencia = nuevoPrecio - productoActual.precio;
//   const porcentaje = ((diferencia / productoActual.precio) * 100).toFixed(2);

//   const difElement = document.getElementById("diferenciaPrecio");
//   const textoElement = document.getElementById("textoDiferencia");

//   textoElement.textContent = `${diferencia >= 0 ? "+" : ""}${diferencia.toFixed(2)} (${porcentaje}%)`;
//   difElement.style.color = diferencia > 0 ? "green" : diferencia < 0 ? "red" : "gray";
// }

// async function guardarPrecio() {
//   if (!productoActual) return alert("Selecciona un producto.");

//   const nuevoPrecio = parseFloat(document.getElementById("nuevoPrecio").value);
//   if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) return alert("Precio inválido.");

//   if (MODO_DESARROLLADO_SIN_CONEXION) {
//     productoActual.precio = nuevoPrecio;
//     alert("Precio actualizado localmente: $" + nuevoPrecio.toFixed(2));
//     return;
//   }

//   try {
//     const response = await fetch("../../Config/actualizar_precio.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id_producto_juego: productoActual.id, precio: nuevoPrecio }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       productoActual.precio = nuevoPrecio;
//       alert("Precio actualizado en el servidor: $" + nuevoPrecio.toFixed(2));
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (error) {
//     console.error("Error al actualizar precio:", error);
//     alert("Error al actualizar el precio.");
//   }
// }
function enviarPrecios() {
    const productoId = document.getElementById("productoSelect").value;
    const precioActual = document.getElementById("precioActual").value;
    const nuevoPrecio = document.getElementById("nuevoPrecio").value;

    if (!productoId) {
        mostrarMensaje("Selecciona un producto .", "error");
        return;
    }if (!nuevoPrecio) {
        mostrarMensaje("Selecciona un nuevo precio.", "error");
        return;
    }

    fetch("../../Config/cambiarPrecios.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `producto_id=${encodeURIComponent(productoId)}&precio_actual=${encodeURIComponent(precioActual)}&nuevo_precio=${encodeURIComponent(nuevoPrecio)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log("Respuesta del servidor:", data);
        mostrarMensaje("Precio actualizado correctamente");
    })
    .catch(error => {
        mostrarMensaje("Error al enviar los datos:", "error");
    });
}
