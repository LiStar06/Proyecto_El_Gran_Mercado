document.addEventListener("DOMContentLoaded", () => {
  const inputCantidad = document.getElementById("cantidadAprobada");
  const inputCuotas = document.getElementById("cantidadCuotas");
  const inputMontoAPagar = document.getElementById("montoAPagar");
  const inputMontoDeCuotas = document.getElementById("montoDeCuotas");

  fetch("../../Config/mostrarValorPrestamo.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const cantidadAprobada = data.cantidadAprobada;
        const cantidadCuotas = data.cantidadCuotas;
        const montoAPagar = Math.round(cantidadAprobada * 1.10);
        const montoDeCuotas = Math.round(montoAPagar / cantidadCuotas);

        inputCantidad.value = cantidadAprobada;
        inputCuotas.value = cantidadCuotas;
        inputMontoAPagar.value = montoAPagar;
        inputMontoDeCuotas.value = montoDeCuotas;
      } else {
        console.error("Error del servidor:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error al obtener datos del préstamo:", error);
    });

  obtenerDatosPrestamo();
});

function guardarPrestamo() {
  const monto = parseInt(document.getElementById("montoAPagar").value);
  const montoDelPrestamo = parseInt(document.getElementById("cantidadAprobada").value);
  const montoDeCuotas = parseInt(document.getElementById("montoDeCuotas").value);
  const numeroCuotas = parseInt(document.getElementById("cantidadCuotas").value);

  if (!monto || !numeroCuotas || !montoDelPrestamo || !montoDeCuotas) {
    alert("Faltan datos del préstamo");
    return;
  }

  fetch("../../Config/guardarPrestamo.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      monto: monto,
      monto_del_prestamo: montoDelPrestamo,
      monto_de_cuotas: montoDeCuotas,
      numero_cuotas: numeroCuotas
    })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        mostrarMensaje("Préstamo guardado y saldo actualizado", "exito");
      } else {
        mostrarMensaje("Error: " + data.message, "error");
      }
    })
    .catch((error) => {
      console.error("Error al guardar el préstamo:", error);
    });
}

let montoAPagar = 0;
function obtenerDatosPrestamo() {
  fetch('../../Config/datosPrestamos.php')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.getElementById('valorPendiente').value = data.valorPendiente;
        document.getElementById('cuotasPendientes').value = data.cuotasPendientes;
        document.getElementById('montoAPagar').value = data.montoAPagar;
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error("Error al obtener datos del préstamo:", error);
    });
}


function incrementarValorPagar(id, paso = 1) {
    retroalimentacionVibracion(20);
    const entrada = document.getElementById(id);
    let valor = parseInt(entrada.value) || 0;

    // Verifica si al incrementar se supera el límite de 11
    if (valor + paso > 11) {
        entrada.value = 11;
    }else {
        entrada.value = valor + paso;
    }

    dispararEventoEntrada(entrada);
    entrada.classList.add('resaltar');
    setTimeout(() => entrada.classList.remove('resaltar'), 300);
    actualizarMontoAPagar();
}


//Decrementa valor de entrada, evita negativos.

function decrementarValorPagar(id, paso = 1) {
    retroalimentacionVibracion(20);
    const entrada = document.getElementById(id);
    let valor = parseInt(entrada.value);

    // Si el valor es inválido o menor que 1, lo ajustamos a 1
    if (isNaN(valor) || valor <= 1) {
        entrada.value = 1;
    } else {
        entrada.value = valor - paso;
        // Si el resultado es menor que 1, lo dejamos en 1
        if (entrada.value < 1) {
            entrada.value = 1;
        }
    }

    dispararEventoEntrada(entrada);
    entrada.classList.add('resaltar');
    setTimeout(() => entrada.classList.remove('resaltar'), 300);
    actualizarMontoAPagar();
}
function actualizarMontoAPagar() {
    const numeroDeCuota = parseInt(document.getElementById('numeroDeCuota').value);
    const montoDeCuotas = parseFloat(document.getElementById('montoAPagar').value);

    if (!isNaN(numeroDeCuota) && !isNaN(montoDeCuotas)) {
        const montoAPagar = numeroDeCuota * montoDeCuotas;
        document.getElementById('montoAPagar').value = montoAPagar.toFixed(2);
    }
}

setTimeout(() => {
    actualizarCapital();
}, 1000); // espera un segundo para que se haya cargado




