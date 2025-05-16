document.addEventListener("DOMContentLoaded", function () {
  // Efectos iniciales
  setTimeout(() => {
    const tarjeta = document.querySelector(".tarjeta-menu");
    tarjeta.classList.add("zoom-al-acercar");

    // Animación secuencial de botones con mayor impacto
    document.querySelectorAll(".btn-menu").forEach((btn, index) => {
      setTimeout(() => {
        btn.classList.add("aparecer");
        btn.style.animation = `aparecer ${0.6 + index * 0.15}s ease-out`;
        btn.classList.add("resaltar");
        setTimeout(() => btn.classList.remove("resaltar"), 1000);
      }, index * 200);
    });

    // Animación de bienvenida
    const bienvenida = document.querySelector(".bienvenida-container");
    bienvenida.classList.add("resaltar");
    setTimeout(() => bienvenida.classList.remove("resaltar"), 1200);

    // Animación del título
    const titulo = document.querySelector(".titulo-menu");
    titulo.classList.add("zoom-al-acercar");
    setTimeout(() => titulo.classList.remove("zoom-al-acercar"), 1000);
  }, 300);

  // Configurar interacciones
  configurarInteracciones();

  // Iniciar música de fondo
  configurarMusicaGlobal();
});

function configurarInteracciones() {
  // Efectos hover en botones
  document.querySelectorAll(".btn-menu").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      reproducirSonido("clic");
      this.querySelector(".btn-icono-menu").classList.add("pulso");
      this.classList.add("resaltar");
    });

    btn.addEventListener("mouseleave", function () {
      this.querySelector(".btn-icono-menu").classList.remove("pulso");
      this.classList.remove("resaltar");
    });

    btn.addEventListener("click", function () {
      reproducirSonido("transicion");
      this.classList.add("clicked");
      setTimeout(() => this.classList.remove("clicked"), 400);
    });
  });

  // Manejo del botón de salida
  const btnSalir = document.getElementById("btnSalir");
  const modalSalir = document.getElementById("modalSalir");
  const btnCerrarModal = document.getElementById("cerrarModal");
  const btnCancelar = document.querySelector(".btn-cancelar");
  const btnConfirmar = document.querySelector(".btn-confirmar");

  btnSalir.addEventListener("click", function (e) {
    e.preventDefault();
    mostrarModalSalir();
  });

  btnCerrarModal.addEventListener("click", cerrarModalSalir);
  btnCancelar.addEventListener("click", cerrarModalSalir);
  btnConfirmar.addEventListener("click", confirmarSalida);

  function mostrarModalSalir() {
    reproducirSonido("notificacion");
    modalSalir.style.display = "flex";

    // Efecto de vibración
    btnSalir.classList.add("sacudir");
    setTimeout(() => btnSalir.classList.remove("sacudir"), 600);

    // Animación del modal
    const modalContenido = document.querySelector(".modal-contenido");
    modalContenido.classList.add("zoom-al-acercar");
    setTimeout(() => modalContenido.classList.remove("zoom-al-acercar"), 700);
  }

  function cerrarModalSalir() {
    reproducirSonido("clic");
    modalSalir.style.display = "none";
  }

  function confirmarSalida() {
    reproducirSonido("transicion");
    transicionPagina("index.php");
  }
}
