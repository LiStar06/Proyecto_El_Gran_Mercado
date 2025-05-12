// Escuchar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const formulario = document.getElementById("loginForm");
  const correoInput = document.getElementById("usuario");
  const passwordInput = document.getElementById("password");
  const btnIniciarSesion = document.getElementById("btnIniciarSesion");
  const btnVolver = document.getElementById("btnVolver");
  const btnVerContrasena = document.querySelector(".btn-ver-contrasena");

  // Estado para controlar la visibilidad de la contraseña
  let contrasenaVisible = false;

  // Inicialización de la página
  function init() {
    setupEventListeners();
    configurarMusicaGlobal();
    crearControlSonido();
  }

  // Configurar los eventos de interacción
  function setupEventListeners() {
    // Resaltar los campos al enfocarlos
    correoInput.addEventListener("focus", () => highlightInput(correoInput));
    passwordInput.addEventListener("focus", () =>
      highlightInput(passwordInput)
    );
    correoInput.addEventListener("blur", () => unhighlightInput(correoInput));
    passwordInput.addEventListener("blur", () =>
      unhighlightInput(passwordInput)
    );

    // Validar los campos en tiempo real
    correoInput.addEventListener("input", validarCorreo);
    passwordInput.addEventListener("input", validarContrasena);

    // Mostrar u ocultar la contraseña
    btnVerContrasena.addEventListener("click", toggleContrasenaVisible);

    // Manejar el envío del formulario
    formulario.addEventListener("submit", handleSubmit);

    // Redirigir al hacer clic en "Volver"
    btnVolver.addEventListener("click", () => transicionPagina("EGM-002.php"));
  }

  // Resaltar el campo al enfocarlo
  function highlightInput(input) {
    const container = input.closest(".input-con-icono");
    container.style.boxShadow = "0 0 0 2px rgba(255, 204, 0, 0.3)";
  }

  // Quitar el resaltado al perder el foco
  function unhighlightInput(input) {
    const container = input.closest(".input-con-icono");
    container.style.boxShadow = "none";
  }

  // Validar el correo electrónico
  function validarCorreo() {
    const valor = correoInput.value.trim();
    const grupo = correoInput.closest(".grupo-formulario");
    const inputContainer = correoInput.closest(".input-con-icono");

    if (!valor) {
      showError(grupo, inputContainer, "El correo es requerido");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      showError(grupo, inputContainer, "Correo no válido");
      return false;
    }
    showSuccess(inputContainer);
    return true;
  }

  // Validar la contraseña
  function validarContrasena() {
    const valor = passwordInput.value;
    const grupo = passwordInput.closest(".grupo-formulario");
    const inputContainer = passwordInput.closest(".input-con-icono");

    if (!valor) {
      showError(grupo, inputContainer, "La contraseña es requerida");
      return false;
    }
    if (valor.length < 6) {
      showError(grupo, inputContainer, "Mínimo 6 caracteres");
      return false;
    }
    showSuccess(inputContainer);
    return true;
  }

  // Mostrar mensaje de error
  function showError(grupo, inputContainer, message) {
    grupo.classList.add("error");
    inputContainer.classList.remove("valid");
    inputContainer.classList.add("invalid");
    grupo.querySelector(".mensaje-error").textContent = message;
    grupo.querySelector(".mensaje-error").style.opacity = "1";
  }

  // Mostrar estado de éxito
  function showSuccess(inputContainer) {
    inputContainer.classList.remove("invalid");
    inputContainer.classList.add("valid");
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
    reproducirSonido("clic");
  }

  // Manejar el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();

    // Validar los campos
    const isCorreoValid = validarCorreo();
    const isPasswordValid = validarContrasena();

    if (!isCorreoValid || !isPasswordValid) {
      mostrarMensaje(
        "Por favor, completa correctamente todos los campos.",
        "error"
      );
      return;
    }

    // Mostrar estado de carga
    btnIniciarSesion.disabled = true;
    btnIniciarSesion.innerHTML = `
            <span>Cargando...</span>
        `;

    try {
      const formData = new FormData(formulario);
      const response = await fetch("../../Config/procesar_login.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Error del servidor (${response.status}): No se pudo conectar con el servidor. Verifica tu conexión o intenta de nuevo.`
        );
      }

      // Verificar el tipo de contenido de la respuesta
      const contentType = response.headers.get("Content-Type");
      console.log("Content-Type:", contentType); // Depuración

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Respuesta del servidor (no es JSON):", text);
        throw new Error(
          "El servidor no devolvió un formato JSON válido. Contacta al administrador."
        );
      }

      // Intentar parsear la respuesta como JSON
      const text = await response.text(); // Obtener el texto crudo primero
      let data;
      try {
        data = JSON.parse(text); // Intentar parsear como JSON
      } catch (jsonError) {
        console.error("Respuesta del servidor:", text); // Depuración
        throw new Error(
          "El servidor devolvió un formato inválido (no es JSON). Contacta al administrador."
        );
      }

      if (data.success) {
        mostrarMensaje("¡Bienvenido!", "exito", 2000);
        setTimeout(() => transicionPagina("../Html/partida.php"), 2000);
      } else {
        throw new Error(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
      mostrarMensaje(
        error.message ||
          "¡Oh no! No pudimos conectar con el servidor. Verifica tu conexión a internet o intenta de nuevo más tarde.",
        "error",
        4000
      );
      reproducirSonido("error");
    } finally {
      resetLoginButton();
    }
  }

  // Restablecer el botón
  function resetLoginButton() {
    btnIniciarSesion.disabled = false;
    btnIniciarSesion.innerHTML = `<span>Iniciar sesión</span>`;
  }

  // Inicializar
  init();
});
