// Escuchar el evento de carga del DOM para inicializar el script
document.addEventListener("DOMContentLoaded", function () {
  // Selección de elementos del DOM con IDs actualizados según el HTML
  const formulario = document.getElementById("registroForm");
  const nombreInput = document.getElementById("nombre_del_jugador");
  const correoInput = document.getElementById("usuario");
  const passwordInput = document.getElementById("password");
  const btnRegistrar = document.getElementById("btnRegistrar");
  const btnVolver = document.getElementById("btnVolver");
  const btnVerContrasena = document.querySelector(".btn-ver-contrasena");
  const nivelesFortaleza = document.querySelectorAll(".nivel");
  const textoFortaleza = document.querySelector(".valor-fortaleza");

  // Estado para rastrear si la contraseña es visible
  let contrasenaVisible = false;

  // Función de inicialización
  function init() {
    setupEventListeners();
  }

  // Configurar event listeners para los elementos del formulario
  function setupEventListeners() {
    // Eventos de focus y blur para resaltar los inputs
    nombreInput.addEventListener("focus", () => highlightInput(nombreInput));
    correoInput.addEventListener("focus", () => highlightInput(correoInput));
    passwordInput.addEventListener("focus", () =>
      highlightInput(passwordInput)
    );

    nombreInput.addEventListener("blur", () => unhighlightInput(nombreInput));
    correoInput.addEventListener("blur", () => unhighlightInput(correoInput));
    passwordInput.addEventListener("blur", () =>
      unhighlightInput(passwordInput)
    );

    // Validación en tiempo real al escribir en los campos
    nombreInput.addEventListener("input", () => validarNombre());
    correoInput.addEventListener("input", () => validarCorreo());
    passwordInput.addEventListener("input", () => validarContrasena());

    // Alternar visibilidad de la contraseña
    btnVerContrasena.addEventListener("click", toggleContrasenaVisible);

    // Manejar el envío del formulario
    formulario.addEventListener("submit", handleSubmit);

    // Navegación al botón de volver
    btnVolver.addEventListener("click", () => {
      transicionPagina("index.php");
    });
  }

  // Resaltar el input al recibir foco
  function highlightInput(input) {
    const container = input.closest(".input-con-icono");
    container.style.boxShadow = "0 0 8px var(--color-resplandor)";
  }

  // Quitar el resaltado al perder el foco
  function unhighlightInput(input) {
    const container = input.closest(".input-con-icono");
    container.style.boxShadow = "none";
  }

  // Validar el campo de nombre
  function validarNombre() {
    const valor = nombreInput.value.trim();
    const grupo = nombreInput.closest(".grupo-formulario");
    const inputContainer = nombreInput.closest(".input-con-icono");

    if (!valor) {
      showError(grupo, inputContainer, "El nombre es requerido", false);
      return false;
    }
    if (valor.length < 3) {
      showError(grupo, inputContainer, "Mínimo 3 caracteres", false);
      return false;
    }
    showSuccess(inputContainer, false);
    return true;
  }

  // Validar el campo de correo
  function validarCorreo() {
    const valor = correoInput.value.trim();
    const grupo = correoInput.closest(".grupo-formulario");
    const inputContainer = correoInput.closest(".input-con-icono");

    if (!valor) {
      showError(grupo, inputContainer, "El correo es requerido", false);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      showError(grupo, inputContainer, "Correo no válido", false);
      return false;
    }
    showSuccess(inputContainer, false);
    return true;
  }

  // Validar el campo de contraseña
  function validarContrasena() {
    const valor = passwordInput.value;
    const grupo = passwordInput.closest(".grupo-formulario");
    const inputContainer = passwordInput.closest(".input-con-icono");

    if (!valor) {
      showError(grupo, inputContainer, "La contraseña es requerida", false);
      updatePasswordStrength(0);
      return false;
    }
    if (valor.length < 6) {
      showError(grupo, inputContainer, "Mínimo 6 caracteres", false);
      updatePasswordStrength(0.2);
      return false;
    }
    const strength = calculatePasswordStrength(valor);
    updatePasswordStrength(strength);
    showSuccess(inputContainer, false);
    return true;
  }

  // Calcular la fortaleza de la contraseña
  function calculatePasswordStrength(password) {
    let strength = 0;
    strength += Math.min(password.length / 15, 0.4); // Longitud (máx 40%)
    if (/[A-Z]/.test(password)) strength += 0.15; // Mayúsculas
    if (/[0-9]/.test(password)) strength += 0.15; // Números
    if (/[^A-Za-z0-9]/.test(password)) strength += 0.15; // Caracteres especiales
    if (!/(123|abc|qwe|asd|zxc|password|contraseña)/i.test(password))
      strength += 0.15; // Sin secuencias simples
    return Math.min(strength, 1);
  }

  // Actualizar el indicador visual de fortaleza
  function updatePasswordStrength(strength) {
    nivelesFortaleza.forEach((nivel) => {
      nivel.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    });
    const nivelesActivos = Math.ceil(strength * nivelesFortaleza.length);
    let color, texto;
    if (strength < 0.3) {
      color = "var(--color-seguridad-bajo)";
      texto = "débil";
    } else if (strength < 0.6) {
      color = "var(--color-seguridad-medio)";
      texto = "moderada";
    } else if (strength < 0.8) {
      color = "var(--color-seguridad-alto)";
      texto = "fuerte";
    } else {
      color = "var(--color-seguridad-muy-alto)";
      texto = "muy fuerte";
    }
    for (let i = 0; i < nivelesActivos; i++) {
      nivelesFortaleza[i].style.backgroundColor = color;
    }
    textoFortaleza.textContent = texto;
    textoFortaleza.style.color = color;
  }

  // Mostrar mensaje de error en el formulario
  function showError(grupo, inputContainer, message, playSound = true) {
    grupo.classList.add("error");
    inputContainer.classList.remove("valid");
    inputContainer.classList.add("invalid");
    const errorElement = grupo.querySelector(".mensaje-error");
    errorElement.textContent = message;
    errorElement.style.opacity = "1";
    if (playSound) reproducirSonido("error");
  }

  // Mostrar estado de éxito en el formulario
  function showSuccess(inputContainer, playSound = true) {
    inputContainer.classList.remove("invalid");
    inputContainer.classList.add("valid");
    if (playSound) reproducirSonido("clic");
    const grupo = inputContainer.closest(".grupo-formulario");
    grupo.classList.remove("error");
    grupo.querySelector(".mensaje-error").style.opacity = "0";
  }

  // Alternar visibilidad de la contraseña
  function toggleContrasenaVisible() {
    contrasenaVisible = !contrasenaVisible;
    passwordInput.type = contrasenaVisible ? "text" : "password";
    const icon = btnVerContrasena.querySelector("img");
    icon.src = contrasenaVisible
      ? "../Imagenes/ocultar-icon.png"
      : "../Imagenes/ver-icon.png";
    icon.alt = contrasenaVisible ? "Ocultar contraseña" : "Mostrar contraseña";
    reproducirSonido("clic"); // Reproducir sonido al cambiar visibilidad
  }

  // Manejar el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const isNombreValid = validarNombre();
    const isCorreoValid = validarCorreo();
    const isPasswordValid = validarContrasena();

    if (!isNombreValid || !isCorreoValid || !isPasswordValid) {
      // Mostrar mensaje de error usando la función mostrarMensaje de funcionesComunes.js
      mostrarMensaje(
        "Por favor completa correctamente todos los campos",
        "error",
        3000
      );
      return;
    }

    // Mostrar estado de carga en el botón
    btnRegistrar.disabled = true;
    btnRegistrar.classList.add("loading");
    btnRegistrar.innerHTML = `
            <img src="../Imagenes/icons/loading-spinner.png" alt="Cargando">
            <span>Registrando...</span>
        `;

    try {
      const formData = new FormData(formulario);
      const response = await fetch("../../Config/procesar_reg.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      c
      if (data.success) {
        // Mostrar mensaje de éxito usando la función mostrarMensaje de funcionesComunes.js
        mostrarMensaje(
          `¡Bienvenido ${nombreInput.value.trim()}! Tu cuenta ha sido creada con éxito.`,
          "exito",
          3000
        );
        crearParticulas(btnRegistrar, "ganancia");
        formulario.reset();
        setTimeout(
          () => (window.location.href = "../Html/crearnegocio.php"),
          3000
        ); // Redirigir después de 3 segundos
      } else {
        throw new Error(data.message || "Error desconocido al registrar");
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "No se pudo conectar con el servidor.";
      if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "Error de conexión: Verifica que el servidor esté activo.";
      }
      // Mostrar mensaje de error usando la función mostrarMensaje de funcionesComunes.js
      mostrarMensaje(errorMessage, "error", 3000);
      resetRegisterButton();
    }
  }

  // Restaurar el estado del botón de registro
  function resetRegisterButton() {
    btnRegistrar.disabled = false;
    btnRegistrar.classList.remove("loading");
    btnRegistrar.innerHTML = `
            <img src="../Imagenes/registrar-icon.png" alt="Registrar">
            <span>Crear cuenta</span>
        `;
  }

  // Iniciar la aplicación
  init();
});
