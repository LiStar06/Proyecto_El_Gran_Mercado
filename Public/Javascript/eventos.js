// Variables del juego
let intentos = 5;
let cambiosDiarios = 0;
const CAMBIOS_DIARIOS_MAX = 3;
let ofertasActivas = [];
let temporizadoresOfertas = [];
let intervaloCountdown;

// Productos para las ofertas
const productos = [
  { nombre: "Manzanas Doradas", precioBase: 200 },
  { nombre: "Peras Mágicas", precioBase: 300 },
  { nombre: "Plátanos Épicos", precioBase: 400 },
  { nombre: "Uvas Legendarias", precioBase: 250 },
  { nombre: "Melones Divinos", precioBase: 350 },
];

// Elementos del DOM
const pantallaOfertas = document.getElementById("pantalla-ofertas");
const btnCambiar = document.getElementById("btn-cambiar");
const btnAceptar = document.getElementById("btn-aceptar");
const intentosElement = document.getElementById("intentos");
const contadorCambiosElement = document.getElementById("contador-cambios");
const countdownContainer = document.getElementById("countdown-container");

// Inicializar el juego
document.addEventListener("DOMContentLoaded", () => {
  configurarMusicaGlobal();
  reproducirSonido("transicion");
  configurarEventos();
  generarTodasOfertas();
  actualizarUI();
  actualizarContadorCambios();
});

// Configurar eventos del juego
function configurarEventos() {
  btnCambiar.addEventListener("click", cambiarOfertas);
  btnAceptar.addEventListener("click", aceptarOferta);

  document.addEventListener("click", (e) => {
    const ofertaItem = e.target.closest(".oferta-item");
    if (ofertaItem && ofertaItem.classList.contains("activa")) {
      seleccionarOferta(ofertaItem);
    }
  });
}

// Generar un descuento aleatorio entre 10% y 35%
function generarDescuento() {
  return Math.floor(Math.random() * (35 - 10 + 1)) + 10;
}

// Generar tres ofertas nuevas
function generarTodasOfertas() {
  limpiarTemporizadores();
  ofertasActivas = [];
  for (let i = 1; i <= 3; i++) {
    generarOferta(i);
  }
}

// Generar una oferta individual
function generarOferta(numero) {
  const producto = productos[Math.floor(Math.random() * productos.length)];
  const descuento = generarDescuento();
  const precioFinal =
    producto.precioBase - producto.precioBase * (descuento / 100);

  // Generar duración variada (horas, minutos, o segundos)
  const unidadTiempo = Math.floor(Math.random() * 3); // 0: horas, 1: minutos, 2: segundos
  let tiempoOferta;
  let displayTiempo;
  let displayUnidad;

  if (unidadTiempo === 0) {
    // Horas: 1 a 24 horas
    tiempoOferta = (Math.floor(Math.random() * 24) + 1) * 3600; // Convertir a segundos
    displayTiempo = tiempoOferta / 3600;
    displayUnidad = "h";
  } else if (unidadTiempo === 1) {
    // Minutos: 1 a 60 minutos
    tiempoOferta = (Math.floor(Math.random() * 60) + 1) * 60; // Convertir a segundos
    displayTiempo = tiempoOferta / 60;
    displayUnidad = "m";
  } else {
    // Segundos: 10 a 120 segundos
    tiempoOferta = Math.floor(Math.random() * (120 - 10 + 1)) + 10;
    displayTiempo = tiempoOferta;
    displayUnidad = "s";
  }

  const elementoOferta = document.getElementById(`oferta-${numero}`);
  const oferta = {
    id: numero,
    producto: producto.nombre,
    precioOriginal: producto.precioBase,
    descuento,
    precioFinal,
    tiempoRestante: tiempoOferta,
    tiempoInicio: Date.now(),
    elemento: elementoOferta,
    intervalo: null,
  };

  ofertasActivas.push(oferta);

  elementoOferta.innerHTML = `
        <div class="oferta-titulo">
            <span class="oferta-nombre">${producto.nombre}</span>
            <span class="oferta-descuento">${descuento}% OFF</span>
        </div>
        <div class="oferta-detalle">
            <span>Precio: <span class="oferta-precio-original">$${producto.precioBase.toFixed(
              2
            )}</span></span>
            <span>Oferta: <span class="oferta-precio-final">$${precioFinal.toFixed(
              2
            )}</span></span>
        </div>
        <div class="oferta-tiempo">
            <img src="../Imagenes/reloj-icon.png" width="16">
            <span class="tiempo-oferta">${Math.floor(
              displayTiempo
            )}${displayUnidad}</span>
        </div>
    `;

  elementoOferta.className = "oferta-item activa";

  oferta.intervalo = setInterval(() => {
    const tiempoTranscurrido = Math.floor(
      (Date.now() - oferta.tiempoInicio) / 1000
    );
    const tiempoRestante = oferta.tiempoRestante - tiempoTranscurrido;
    const tiempoElement = elementoOferta.querySelector(".tiempo-oferta");

    if (tiempoElement) {
      if (tiempoRestante >= 3600) {
        const horas = Math.floor(tiempoRestante / 3600);
        tiempoElement.textContent = `${horas}h`;
      } else if (tiempoRestante >= 60) {
        const minutos = Math.floor(tiempoRestante / 60);
        tiempoElement.textContent = `${minutos}m`;
      } else {
        tiempoElement.textContent = `${Math.abs(tiempoRestante)}s`;
      }

      if (tiempoRestante <= 30) {
        tiempoElement.style.color = "#ff0000";
        tiempoElement.style.animation = "parpadeo 0.5s infinite";
      }
    }

    if (tiempoRestante <= 0) {
      clearInterval(oferta.intervalo);
      const index = temporizadoresOfertas.indexOf(oferta.intervalo);
      if (index > -1) {
        temporizadoresOfertas.splice(index, 1);
      }
      ofertaPerdida(oferta);
    }
  }, 1000);

  temporizadoresOfertas.push(oferta.intervalo);
}

// Cambiar todas las ofertas
function cambiarOfertas() {
  if (cambiosDiarios >= CAMBIOS_DIARIOS_MAX) {
    mostrarMensaje("No tienes más cambios disponibles", "error");
    retroalimentacionVibracion([50]);
    return;
  }

  cambiosDiarios++;
  actualizarContadorCambios();
  reproducirSonido("clic");
  retroalimentacionVibracion([30]);

  pantallaOfertas.classList.add("cambiando");
  limpiarTemporizadores();

  setTimeout(() => {
    pantallaOfertas.classList.remove("cambiando");
    generarTodasOfertas();
  }, 300);
}

// Seleccionar una oferta
function seleccionarOferta(ofertaElement) {
  document.querySelectorAll(".oferta-item").forEach((item) => {
    item.classList.remove("seleccionada");
  });
  ofertaElement.classList.add("seleccionada");
  reproducirSonido("clic");
}

// Aceptar la oferta seleccionada
function aceptarOferta() {
  if (intentos <= 0) {
    mostrarMensaje("No tienes más intentos", "error");
    retroalimentacionVibracion([100, 50, 100]);
    return;
  }

  const ofertaSeleccionada = ofertasActivas.find((o) =>
    o.elemento.classList.contains("seleccionada")
  );
  if (!ofertaSeleccionada) {
    mostrarMensaje("Selecciona una oferta primero", "error");
    retroalimentacionVibracion([50, 50]);
    return;
  }

  intentos--;
  clearInterval(ofertaSeleccionada.intervalo);
  const index = temporizadoresOfertas.indexOf(ofertaSeleccionada.intervalo);
  if (index > -1) {
    temporizadoresOfertas.splice(index, 1);
  }
  ofertaSeleccionada.elemento.classList.add("aceptada");
  setTimeout(() => {
    ofertaSeleccionada.elemento.classList.remove(
      "aceptada",
      "seleccionada",
      "activa"
    );
    generarOferta(ofertaSeleccionada.id);
  }, 500);

  mostrarMensaje(`¡Oferta aceptada!`, "exito");
  retroalimentacionVibracion([20, 20, 40]);
  actualizarUI();

  if (intentos <= 0) {
    setTimeout(() => {
      mostrarMensaje(
        "¡Terminan Las Ofertas! Vuelve Luego por más ofertas.",
        "error"
      );
      // Limpieza completa de todos los temporizadores y estados
      limpiarTemporizadores();
      ofertasActivas = [];
      document.querySelectorAll(".oferta-item").forEach((item) => {
        item.classList.remove("activa", "seleccionada", "aceptada", "perdida");
        item.innerHTML = "";
      });
      mostrarCountdown();
    }, 1000);
  }
}

// Oferta perdida por tiempo
function ofertaPerdida(oferta) {
  oferta.elemento.classList.add("perdida");
  setTimeout(() => {
    oferta.elemento.classList.remove("perdida", "activa");
    generarOferta(oferta.id);
  }, 500);
  mostrarMensaje(`Oferta ${oferta.id} perdida - Se acabó el tiempo`, "error");
  retroalimentacionVibracion([200, 100, 200]);
}

// Actualizar la interfaz de usuario
function actualizarUI() {
  intentosElement.textContent = intentos;
  if (intentos <= 2) {
    intentosElement.style.color = "#ff5555";
  } else {
    intentosElement.style.color = "#55ff55";
  }
}

// Actualizar contador de cambios
function actualizarContadorCambios() {
  contadorCambiosElement.textContent = `${cambiosDiarios}/${CAMBIOS_DIARIOS_MAX}`;
  btnCambiar.disabled = cambiosDiarios >= CAMBIOS_DIARIOS_MAX;
}

// Limpiar todos los temporizadores
function limpiarTemporizadores() {
  temporizadoresOfertas.forEach((intervalo) => clearInterval(intervalo));
  temporizadoresOfertas = [];
}

// Mostrar cuenta regresiva con duración aleatoria
function mostrarCountdown() {
  pantallaOfertas.style.display = "none";
  btnCambiar.style.display = "none";
  btnAceptar.style.display = "none";
  countdownContainer.style.display = "flex";

  // Generar duración aleatoria para el countdown (horas, minutos, o segundos)
  const unidadTiempo = Math.floor(Math.random() * 3); // 0: horas, 1: minutos, 2: segundos
  let countdownDurationSeconds;

  if (unidadTiempo === 0) {
    // Horas: 1 a 12 horas
    countdownDurationSeconds = (Math.floor(Math.random() * 12) + 1) * 3600;
    console.log(
      `Countdown set to ${Math.floor(countdownDurationSeconds / 3600)} hours`
    );
  } else if (unidadTiempo === 1) {
    // Minutos: 1 a 60 minutos
    countdownDurationSeconds = (Math.floor(Math.random() * 60) + 1) * 60;
    console.log(
      `Countdown set to ${Math.floor(countdownDurationSeconds / 60)} minutes`
    );
  } else {
    // Segundos: 10 a 120 segundos
    countdownDurationSeconds = Math.floor(Math.random() * (120 - 10 + 1)) + 10;
    console.log(`Countdown set to ${countdownDurationSeconds} seconds`);
  }

  let timeLeftSeconds = countdownDurationSeconds;

  intervaloCountdown = setInterval(() => {
    if (timeLeftSeconds <= 0) {
      clearInterval(intervaloCountdown);
      resetJuego();
      return;
    }

    const hours = Math.floor(timeLeftSeconds / 3600);
    const minutes = Math.floor((timeLeftSeconds % 3600) / 60);
    const seconds = timeLeftSeconds % 60;

    actualizarFlipClock(hours, minutes, seconds);

    timeLeftSeconds--;
  }, 1000);
}

// Actualizar el contador con animación de flip
function actualizarFlipClock(hours, minutes, seconds) {
  const timerParts = [
    {
      value: Math.floor(Math.abs(hours) / 10),
      element: document.getElementById("hours-tens"),
    },
    {
      value: Math.abs(hours) % 10,
      element: document.getElementById("hours-units"),
    },
    {
      value: Math.floor(Math.abs(minutes) / 10),
      element: document.getElementById("minutes-tens"),
    },
    {
      value: Math.abs(minutes) % 10,
      element: document.getElementById("minutes-units"),
    },
    {
      value: Math.floor(Math.abs(seconds) / 10),
      element: document.getElementById("seconds-tens"),
    },
    {
      value: Math.abs(seconds) % 10,
      element: document.getElementById("seconds-units"),
    },
  ];

  timerParts.forEach((part) => {
    if (part.element && part.element.textContent !== part.value.toString()) {
      part.element.textContent = part.value;
      part.element.classList.add("flip");
      setTimeout(() => part.element.classList.remove("flip"), 500);
    }
  });

  const signElement = document.querySelector(".flip-sign");
  if (signElement) {
    signElement.textContent = hours < 0 ? "-" : "";
  }
}

// Reiniciar el juego para nuevas ofertas
function resetJuego() {
  intentos = 5;
  cambiosDiarios = 0;
  limpiarTemporizadores();
  countdownContainer.style.display = "none";
  pantallaOfertas.style.display = "flex";
  btnCambiar.style.display = "flex";
  btnAceptar.style.display = "flex";
  generarTodasOfertas();
  actualizarUI();
  actualizarContadorCambios();
}
