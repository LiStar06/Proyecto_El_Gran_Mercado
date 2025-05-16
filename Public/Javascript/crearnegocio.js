document.addEventListener("DOMContentLoaded", function () {
  // Elementos del formulario
  const formulario = document.getElementById("formularioNegocio");
  const nombreInput = document.getElementById("nombre");
  const tipoSelect = document.getElementById("tipo");
  const capitalSlider = document.getElementById("capital");
  const capitalValue = document.getElementById("valorCapital");
  const btnIncrementar = document.getElementById("incrementarCapital");
  const btnDecrementar = document.getElementById("decrementarCapital");
  const btnOpciones = document.querySelectorAll(".btn-opcion");
  const btnCrear = document.getElementById("btnCrear");
  const btnMenu = document.getElementById("btnMenu");
  const tooltipTipo = document.getElementById("tooltipTipo");

  // Sonidos
  const sonidoSlider = new Audio("../Sonidos/slider.mp3");
  sonidoSlider.volume = 0.3;

  // Inicializar valores
  let capitalActual = 1000;
  actualizarVisualizacionCapital(capitalActual);

  // Evento para el slider de capital con sonido
  capitalSlider.addEventListener("input", function () {
    capitalActual = parseInt(this.value);
    actualizarVisualizacionCapital(capitalActual);

    // Reproducir sonido del slider inmediatamente
    if (efectosActivos) {
      // Usar efectosActivos en lugar de sonidoActivado
      sonidoSlider.currentTime = 0;
      sonidoSlider
        .play()
        .catch((e) => console.log("Error al reproducir sonido:", e));
    }
  });
  // Botones de incremento/decremento
  btnIncrementar.addEventListener("click", function () {
    capitalActual = Math.min(capitalActual + 100, 5000);
    actualizarCapital(capitalActual);
    reproducirSonido("monedas");
  });

  btnDecrementar.addEventListener("click", function () {
    capitalActual = Math.max(capitalActual - 100, 500);
    actualizarCapital(capitalActual);
    reproducirSonido("monedas");
  });

  // Opciones rápidas de capital
  btnOpciones.forEach((btn) => {
    btn.addEventListener("click", function () {
      capitalActual = parseInt(this.dataset.valor);
      actualizarCapital(capitalActual);
      reproducirSonido("monedas");

      // Efecto visual
      this.classList.add("presionado");
      setTimeout(() => {
        this.classList.remove("presionado");
      }, 300);
    });
  });

  // Configurar tooltips para las opciones del select
  tipoSelect.addEventListener("change", function () {
    const opcionSeleccionada = this.options[this.selectedIndex];
    const tooltip = opcionSeleccionada.getAttribute("data-tooltip");

    if (tooltip && this.value) {
      tooltipTipo.textContent = tooltip;
    } else {
      tooltipTipo.textContent = "";
    }
  });

  // Función para actualizar el capital
  function actualizarCapital(valor) {
    capitalActual = valor;
    capitalSlider.value = valor;
    actualizarVisualizacionCapital(valor);
  }

  // Función para actualizar la visualización del capital
  function actualizarVisualizacionCapital(valor) {
    capitalValue.textContent = valor.toLocaleString("es-ES");

    // Animación
    capitalValue.classList.add("resaltar");
    setTimeout(() => capitalValue.classList.remove("resaltar"), 300);

    // Animación moneda
    const moneda = document.querySelector(".moneda-giratoria");
    moneda.style.transform = "rotateY(360deg)";
    setTimeout(() => {
      moneda.style.transform = "rotateY(0)";
    }, 500);
  }

  // Validación del formulario
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar campos
    if (!nombreInput.value.trim()) {
      mostrarMensaje("Ingresa un nombre para tu negocio", "error");
      nombreInput.focus();
      return;
    }

    if (nombreInput.value.trim().length < 3) {
      mostrarMensaje("El nombre debe tener al menos 3 caracteres", "error");
      nombreInput.focus();
      return;
    }

    if (!tipoSelect.value) {
      mostrarMensaje("Selecciona un tipo de negocio", "error");
      tipoSelect.focus();
      return;
    }

    // Deshabilitar botón durante el proceso
    btnCrear.disabled = true;
    btnCrear.innerHTML = `
            <img src="../Imagenes/cargar-icon.png" alt="Cargando">
            <span>Creando...</span>
        `;

    // Simular envío al servidor
    setTimeout(() => {
      mostrarMensaje(
        `¡${nombreInput.value} ha sido creado con éxito!`,
        "exito"
      );
      reproducirSonido("exito");

      // Efectos visuales
      crearParticulas(btnCrear, "ganancia");

      // Redirigir después de 2 segundos
      setTimeout(() => {
        transicionPagina("Index.php");
      }, 2000);
    }, 1500);
  });

  // Botón de volver
  btnMenu.addEventListener("click", function () {
    transicionPagina("EGM-002.php");
  });

  // Efectos en los inputs
  document.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("focus", function () {
      reproducirSonido("clic");
      const efecto =
        this.closest(".input-con-icono").querySelector(".efecto-subrayado");
      efecto.style.width = "100%";
    });

    input.addEventListener("blur", function () {
      const efecto =
        this.closest(".input-con-icono").querySelector(".efecto-subrayado");
      efecto.style.width = "0";
    });
  });
});
