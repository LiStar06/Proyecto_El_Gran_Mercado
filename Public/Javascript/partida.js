document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const opciones = document.querySelectorAll(".tarjeta-opcion");
  const btnVolver = document.getElementById("btnVolver");

  // Añadir efectos de animación a las opciones
  opciones.forEach((opcion) => {
    opcion.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      reproducirSonido("clic");
    });

    opcion.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

    opcion.addEventListener("click", function () {
      this.classList.add("seleccionado");
      setTimeout(() => {
        this.classList.remove("seleccionado");
      }, 300);
      reproducirSonido("clic");
    });
  });

  // Efecto para el botón volver
  btnVolver.addEventListener("click", function () {
    this.classList.add("presionado");
    setTimeout(() => {
      this.classList.remove("presionado");
    }, 300);
    reproducirSonido("clic");
  });
});
