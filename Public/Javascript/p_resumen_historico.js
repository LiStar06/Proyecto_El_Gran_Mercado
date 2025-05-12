document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const productosContainer = document.getElementById("productos-container");
  const productModalOverlay = document.getElementById("product-modal-overlay");
  const productDetailsModal = document.getElementById("product-details-modal");
  const detallesProducto = document.getElementById("detalles-producto");
  const cartModalOverlay = document.getElementById("cart-modal-overlay");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalPrice = document.getElementById("cart-total-price");
  const historicoPreciosCanvas = document.getElementById(
    "historicoPreciosChart"
  );
  const productoSelect = document.getElementById("productoSelect");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const cartIconContainer = document.querySelector(".cart-icon-container");
  const cartCountBadge = document.getElementById("cart-count");
  const productModalCloseBtn = document.querySelector(".modal-close-btn");
  const cartModalCloseBtn = document.querySelector(".cart-close-btn");
  const checkoutBtn = document.querySelector(".checkout-btn");

  // Check critical DOM elements
  if (
    !productosContainer ||
    !cartCountBadge ||
    !productModalOverlay ||
    !cartModalOverlay
  ) {
    console.error("Critical DOM elements missing");
    return;
  }

  // Data
  const productos = [
    {
      id: 1,
      nombre: "Manzanas Doradas",
      descripcion: "Frutas mágicas con un brillo único.",
      precio: 25,
      disponible: true,
      imagen:
        "https://placehold.co/400x300/EEE/31343C?text=Manzanas+Doradas&font=Montserrat",
    },
    {
      id: 2,
      nombre: "Peras Mágicas",
      descripcion: "Peras encantadas que deleitan el paladar.",
      precio: 18,
      disponible: true,
      imagen:
        "https://placehold.co/400x300/EEE/31343C?text=Peras+Mágicas&font=Montserrat",
    },
    {
      id: 3,
      nombre: "Plátanos Épicos",
      descripcion: "Plátanos de fuerza legendaria.",
      precio: 30,
      disponible: false,
      imagen:
        "https://placehold.co/400x300/EEE/31343C?text=Plátanos+Épicos&font=Montserrat",
    },
    {
      id: 4,
      nombre: "Uvas Legendarias",
      descripcion: "Uvas que cuentan historias de antaño.",
      precio: 15,
      disponible: true,
      imagen:
        "https://placehold.co/400x300/EEE/31343C?text=Uvas+Legendarias&font=Montserrat",
    },
    {
      id: 5,
      nombre: "Melones Divinos",
      descripcion: "Melones bendecidos por los dioses.",
      precio: 40,
      disponible: true,
      imagen:
        "https://placehold.co/400x300/EEE/31343C?text=Melones+Divinos&font=Montserrat",
    },
    {
      id: 6,
      nombre: "Fresas Épicas",
      descripcion: "Fresas con un toque de aventura.",
      precio: 22,
      disponible: false,
      imagen:
        "https://placehold.co/400x300/EEE/31343C?text=Fresas+Épicas&font=Montserrat",
    },
  ];

  const historicoPreciosData = {
    "Manzanas Doradas": [
      { fecha: "2023-01-01", precio: 25 },
      { fecha: "2023-01-08", precio: 27 },
      { fecha: "2023-01-15", precio: 30 },
      { fecha: "2023-01-22", precio: 28 },
      { fecha: "2023-01-29", precio: 32 },
      { fecha: "2023-02-05", precio: 35 },
      { fecha: "2023-02-12", precio: 33 },
    ],
    "Peras Mágicas": [
      { fecha: "2023-01-01", precio: 15 },
      { fecha: "2023-01-08", precio: 16 },
      { fecha: "2023-01-15", precio: 18 },
      { fecha: "2023-01-22", precio: 17 },
      { fecha: "2023-01-29", precio: 20 },
      { fecha: "2023-02-05", precio: 22 },
      { fecha: "2023-02-12", precio: 21 },
    ],
    "Plátanos Épicos": [
      { fecha: "2023-01-01", precio: 30 },
      { fecha: "2023-01-08", precio: 32 },
      { fecha: "2023-01-15", precio: 34 },
      { fecha: "2023-01-22", precio: 33 },
      { fecha: "2023-01-29", precio: 36 },
      { fecha: "2023-02-05", precio: 38 },
      { fecha: "2023-02-12", precio: 37 },
    ],
    "Uvas Legendarias": [
      { fecha: "2023-01-01", precio: 15 },
      { fecha: "2023-01-08", precio: 17 },
      { fecha: "2023-01-15", precio: 16 },
      { fecha: "2023-01-22", precio: 18 },
      { fecha: "2023-01-29", precio: 20 },
      { fecha: "2023-02-05", precio: 19 },
      { fecha: "2023-02-12", precio: 21 },
    ],
    "Melones Divinos": [
      { fecha: "2023-01-01", precio: 40 },
      { fecha: "2023-01-08", precio: 41 },
      { fecha: "2023-01-15", precio: 43 },
      { fecha: "2023-01-22", precio: 42 },
      { fecha: "2023-01-29", precio: 45 },
      { fecha: "2023-02-05", precio: 47 },
      { fecha: "2023-02-12", precio: 46 },
    ],
    "Fresas Épicas": [
      { fecha: "2023-01-01", precio: 22 },
      { fecha: "2023-01-08", precio: 24 },
      { fecha: "2023-01-15", precio: 23 },
      { fecha: "2023-01-22", precio: 25 },
      { fecha: "2023-01-29", precio: 27 },
      { fecha: "2023-02-05", precio: 26 },
      { fecha: "2023-02-12", precio: 28 },
    ],
  };

  let carrito = [];
  try {
    const storedCarrito = localStorage.getItem("carrito");
    if (storedCarrito) {
      carrito = JSON.parse(storedCarrito);
      if (!Array.isArray(carrito)) {
        carrito = [];
      }
    }
    console.log("Carrito inicializado desde localStorage:", carrito);
  } catch (e) {
    console.error("Error parsing carrito from localStorage:", e);
    carrito = [];
  }
  let historicoPreciosChart;

  // Initialize cart count
  updateCartCount();

  // Fallback notification function
  const mostrarMensaje =
    typeof window.mostrarMensaje === "function"
      ? window.mostrarMensaje
      : (mensaje, tipo) => {
          const mensajeElement = document.createElement("div");
          mensajeElement.className = `mensaje-emergente ${tipo}`;
          mensajeElement.innerHTML = `
                <span>${mensaje}</span>
                <button class="close-btn">×</button>
            `;
          document.body.appendChild(mensajeElement);
          const closeBtn = mensajeElement.querySelector(".close-btn");
          closeBtn.addEventListener("click", () => mensajeElement.remove());
          setTimeout(() => mensajeElement.remove(), 3000);
          return mensajeElement;
        };

  // Event Listeners
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      navToggle.classList.toggle("active");
      try {
        window.reproducirSonido("clic");
      } catch (e) {}
      try {
        window.retroalimentacionVibracion([30]);
      } catch (e) {}
    });
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      try {
        window.reproducirSonido("transicion");
      } catch (e) {}
      try {
        window.retroalimentacionVibracion([50]);
      } catch (e) {}
      try {
        window.crearParticulas(e.target, "monedas");
      } catch (e) {}
    });
  });

  if (cartIconContainer) {
    cartIconContainer.addEventListener("click", () => {
      mostrarCarrito();
      try {
        window.reproducirSonido("clic");
      } catch (e) {}
      try {
        window.retroalimentacionVibracion([30]);
      } catch (e) {}
      try {
        window.crearParticulas(cartIconContainer, "monedas");
      } catch (e) {}
    });
  }

  if (productModalCloseBtn) {
    productModalCloseBtn.addEventListener("click", () => {
      productModalOverlay.classList.remove("active");
      try {
        window.reproducirSonido("clic");
      } catch (e) {}
      try {
        window.retroalimentacionVibracion([30]);
      } catch (e) {}
    });
  }

  if (cartModalCloseBtn) {
    cartModalCloseBtn.addEventListener("click", () => {
      cartModalOverlay.classList.remove("active");
      try {
        window.reproducirSonido("clic");
      } catch (e) {}
      try {
        window.retroalimentacionVibracion([30]);
      } catch (e) {}
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      realizarCompra();
      try {
        window.reproducirSonido("transicion");
      } catch (e) {}
      try {
        window.retroalimentacionVibracion([50]);
      } catch (e) {}
      try {
        window.crearParticulas(checkoutBtn, "monedas");
      } catch (e) {}
    });
  }

  if (productModalOverlay) {
    productModalOverlay.addEventListener("click", (e) => {
      if (e.target === productModalOverlay) {
        productModalOverlay.classList.remove("active");
        try {
          window.reproducirSonido("clic");
        } catch (e) {}
        try {
          window.retroalimentacionVibracion([30]);
        } catch (e) {}
      }
    });
  }

  if (cartModalOverlay) {
    cartModalOverlay.addEventListener("click", (e) => {
      if (e.target === cartModalOverlay) {
        cartModalOverlay.classList.remove("active");
        try {
          window.reproducirSonido("clic");
        } catch (e) {}
        try {
          window.retroalimentacionVibracion([30]);
        } catch (e) {}
      }
    });
  }

  function formatMoney(amount) {
    return amount.toLocaleString("es-DO", {
      style: "currency",
      currency: "DOP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  function updateCartCount() {
    const totalItems = carrito.reduce(
      (sum, item) => sum + (item.cantidad || 0),
      0
    );
    cartCountBadge.textContent = totalItems;
    if (totalItems > 0) {
      cartCountBadge.classList.add("updated");
      cartIconContainer.classList.add("added");
      setTimeout(() => {
        cartCountBadge.classList.remove("updated");
        cartIconContainer.classList.remove("added");
      }, 400);
    }
    console.log("Cart count updated:", totalItems);
  }

  function mostrarProductos() {
    productosContainer.innerHTML = "";
    productos.forEach((producto, index) => {
      const productoCard = document.createElement("div");
      productoCard.className = "producto-card";
      productoCard.dataset.productoId = producto.id;
      productoCard.style.animationDelay = `${index * 0.1}s`;

      productoCard.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${
        producto.nombre
      }">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <p class="producto-precio">${formatMoney(producto.precio)}</p>
                <p class="${
                  producto.disponible
                    ? "producto-disponible"
                    : "producto-agotado"
                }">
                    ${producto.disponible ? "Disponible" : "Agotado"}
                </p>
                <button class="btn-agregar-carrito" ${
                  !producto.disponible ? "disabled" : ""
                }>
                    Agregar al Carrito
                </button>
            `;

      productoCard
        .querySelector(".btn-agregar-carrito")
        .addEventListener("click", (e) => {
          console.log(
            "Agregar al carrito clicked for product ID:",
            producto.id
          );
          agregarAlCarrito(producto.id, productoCard, e.target);
          try {
            window.reproducirSonido("transicion");
          } catch (e) {}
          try {
            window.retroalimentacionVibracion([50]);
          } catch (e) {}
          try {
            window.crearParticulas(e.target, "monedas");
          } catch (e) {}
        });

      productoCard.addEventListener("click", (e) => {
        if (e.target.closest(".btn-agregar-carrito")) return;
        mostrarDetallesProducto(producto.id);
        try {
          window.reproducirSonido("clic");
        } catch (e) {}
        try {
          window.retroalimentacionVibracion([30]);
        } catch (e) {}
        try {
          window.crearParticulas(productoCard, "monedas");
        } catch (e) {}
      });

      productosContainer.appendChild(productoCard);
    });
  }

  function mostrarDetallesProducto(productoId) {
    const producto = productos.find((p) => p.id === productoId);
    if (producto && detallesProducto && productModalOverlay) {
      detallesProducto.innerHTML = `
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="md:w-1/2">
                        <img src="${producto.imagen}" alt="${
        producto.nombre
      }" class="rounded-md w-full">
                    </div>
                    <div class="md:w-1/2">
                        <h3 class="text-3xl font-bold text-gray-800 mb-4">${
                          producto.nombre
                        }</h3>
                        <p class="text-gray-600 text-lg mb-4">${
                          producto.descripcion
                        }</p>
                        <p class="text-2xl font-semibold text-green-600 mb-4">Precio: ${formatMoney(
                          producto.precio
                        )}</p>
                        <p class="${
                          producto.disponible
                            ? "text-green-500"
                            : "text-red-500"
                        } font-medium text-lg mb-4">
                            Disponibilidad: ${
                              producto.disponible ? "Disponible" : "Agotado"
                            }
                        </p>
                        <button class="btn-agregar-carrito" data-producto-id="${
                          producto.id
                        }" ${producto.disponible ? "" : "disabled"}>
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            `;
      productModalOverlay.classList.add("active");
      productDetailsModal.scrollTop = 0;

      // Add event listener for modal's add to cart button
      const modalAddButton = detallesProducto.querySelector(
        ".btn-agregar-carrito"
      );
      if (modalAddButton) {
        modalAddButton.addEventListener("click", (e) => {
          const id = parseInt(e.target.dataset.productoId);
          console.log("Modal Agregar al carrito clicked for product ID:", id);
          agregarAlCarrito(id, null, e.target);
          try {
            window.reproducirSonido("transicion");
          } catch (e) {}
          try {
            window.retroalimentacionVibracion([50]);
          } catch (e) {}
          try {
            window.crearParticulas(e.target, "monedas");
          } catch (e) {}
        });
      }
    }
  }

  function mostrarCarrito() {
    if (!cartItemsContainer || !cartModalOverlay || !cartTotalPrice) return;
    cartItemsContainer.innerHTML = "";
    if (carrito.length === 0) {
      cartItemsContainer.innerHTML = '<p class="cart-empty">Carrito vacío</p>';
      cartTotalPrice.textContent = "Total: $0";
      checkoutBtn.disabled = true;
    } else {
      let total = 0;
      carrito.forEach((item) => {
        total += item.precio * item.cantidad;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="cart-item-details">
                        <h4>${item.nombre}</h4>
                        <p>Precio: ${formatMoney(item.precio)}</p>
                        <p>Cantidad: ${item.cantidad}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn-remove-item" data-producto-id="${
                          item.id
                        }">Quitar</button>
                    </div>
                `;
        cartItemsContainer.appendChild(cartItem);
      });
      cartTotalPrice.textContent = `Total: ${formatMoney(total)}`;
      checkoutBtn.disabled = false;

      // Add event listeners for remove buttons
      cartItemsContainer
        .querySelectorAll(".btn-remove-item")
        .forEach((button) => {
          button.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.productoId);
            quitarDelCarrito(id, e.target);
          });
        });
    }
    cartModalOverlay.classList.add("active");
    cartModalOverlay.querySelector(".cart-modal").scrollTop = 0;
    console.log("Carrito mostrado:", carrito);
  }

  function agregarAlCarrito(productoId, cardElement, buttonElement) {
    console.log("Intentando agregar producto ID:", productoId);
    const producto = productos.find((p) => p.id === productoId);
    if (!producto) {
      console.error("Producto no encontrado:", productoId);
      mostrarMensaje("Error: Producto no encontrado.", "error");
      return;
    }
    if (producto.disponible) {
      let existeEnCarrito = carrito.find((item) => item.id === productoId);
      let cantidad = 1;
      if (existeEnCarrito) {
        existeEnCarrito.cantidad += 1;
        cantidad = existeEnCarrito.cantidad;
      } else {
        existeEnCarrito = {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
          imagen: producto.imagen,
        };
        carrito.push(existeEnCarrito);
      }
      try {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log("Carrito actualizado en localStorage:", carrito);
      } catch (e) {
        console.error("Error saving carrito to localStorage:", e);
        mostrarMensaje("Error al guardar el carrito.", "error");
        return;
      }
      const mensaje =
        cantidad === 1
          ? `${cantidad} ${producto.nombre} añadido al carrito!`
          : `${cantidad} ${producto.nombre} añadidos al carrito!`;
      mostrarMensaje(mensaje, "exito");
      updateCartCount();
      if (cardElement) {
        cardElement.classList.add("added");
        setTimeout(() => cardElement.classList.remove("added"), 300);
      }
      if (buttonElement) {
        buttonElement.classList.add("added");
        setTimeout(() => buttonElement.classList.remove("added"), 300);
      }
    } else {
      mostrarMensaje("Producto no disponible.", "error");
    }
  }

  function quitarDelCarrito(productoId, buttonElement) {
    console.log("Eliminando producto ID:", productoId);
    carrito = carrito.filter((item) => item.id !== productoId);
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log("Carrito actualizado en localStorage:", carrito);
    } catch (e) {
      console.error("Error saving carrito to localStorage:", e);
    }
    mostrarMensaje("Producto eliminado del carrito.", "exito");
    updateCartCount();
    mostrarCarrito();
    try {
      window.reproducirSonido("clic");
    } catch (e) {}
    try {
      window.retroalimentacionVibracion([30]);
    } catch (e) {}
    try {
      window.crearParticulas(buttonElement, "monedas");
    } catch (e) {}
  }

  function realizarCompra() {
    if (carrito.length === 0) return;
    const total = carrito.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
    carrito = [];
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log("Carrito vaciado en localStorage:", carrito);
    } catch (e) {
      console.error("Error saving carrito to localStorage:", e);
    }
    mostrarMensaje(`Compra realizada por ${formatMoney(total)}!`, "exito");
    updateCartCount();
    mostrarCarrito();
    cartModalOverlay.classList.remove("active");
  }

  function createChart(data, title) {
    if (!historicoPreciosCanvas) return;
    const ctx = historicoPreciosCanvas.getContext("2d");
    const chartData = {
      labels: data[Object.keys(data)[0]].map((item) => item.fecha),
      datasets: Object.keys(data).map((nombreProducto) => ({
        label: nombreProducto,
        data: data[nombreProducto].map((item) => item.precio),
        borderColor: [
          "#ff6f61",
          "#8884d8",
          "#3b82f6",
          "#22c55e",
          "#f97316",
          "#ec4899",
        ][Object.keys(data).indexOf(nombreProducto) % 6],
        backgroundColor: "transparent",
        fill: false,
        lineTension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: [
          "#ff6f61",
          "#8884d8",
          "#3b82f6",
          "#22c55e",
          "#f97316",
          "#ec4899",
        ][Object.keys(data).indexOf(nombreProducto) % 6],
      })),
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: title,
          font: { family: "MedievalSharp", size: 20 },
          color: "#ffd700",
          padding: { bottom: 10 },
        },
        legend: {
          position: "bottom",
          labels: {
            font: { family: "MedievalSharp", size: 14 },
            color: "#ffd700",
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#ffd700",
          bodyColor: "#fff",
          borderColor: "#ffd700",
          borderWidth: 1,
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${formatMoney(context.parsed.y)}`,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Fecha",
            font: { family: "MedievalSharp", size: 14 },
            color: "#ffd700",
          },
          ticks: { color: "#fff" },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
        },
        y: {
          title: {
            display: true,
            text: "Precio",
            font: { family: "MedievalSharp", size: 14 },
            color: "#ffd700",
          },
          ticks: {
            color: "#fff",
            callback: (value) => formatMoney(value),
          },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
        },
      },
    };

    if (historicoPreciosChart) {
      historicoPreciosChart.destroy();
    }

    historicoPreciosChart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });
  }

  function populateProductoSelect() {
    if (!productoSelect) return;
    for (const producto in historicoPreciosData) {
      const option = document.createElement("option");
      option.value = producto;
      option.textContent = producto;
      productoSelect.appendChild(option);
    }
  }

  function handleProductoSelectChange() {
    if (!productoSelect) return;
    const selectedProducto = productoSelect.value;
    if (selectedProducto) {
      const data = {
        [selectedProducto]: historicoPreciosData[selectedProducto],
      };
      createChart(data, `Histórico de Precios de ${selectedProducto}`);
      try {
        window.reproducirSonido("clic");
      } catch (e) {}
      try {
        window.retroalimentacionVibracion([30]);
      } catch (e) {}
    } else {
      createChart(
        historicoPreciosData,
        "Histórico de Precios de Todos los Productos"
      );
      try {
        window.reproducirSonido("transicion");
      } catch (e) {}
      try {
        window.retroalimentacionVibracion([50]);
      } catch (e) {}
    }
  }

  // Initialize
  mostrarProductos();
  populateProductoSelect();
  createChart(
    historicoPreciosData,
    "Histórico de Precios de Todos los Productos"
  );
  if (productoSelect) {
    productoSelect.addEventListener("change", handleProductoSelectChange);
  }
  try {
    window.configurarMusicaGlobal();
  } catch (e) {}
  try {
    window.reproducirSonido("transicion");
  } catch (e) {}
});
