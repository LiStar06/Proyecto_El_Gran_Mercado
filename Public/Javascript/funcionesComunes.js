// Variables globales para gestionar el estado del juego, audio y UI.

let musicaFondoGlobal = null; // Instancia de música de fondo
let musicaActiva = localStorage.getItem('musicaActiva') !== 'false'; // Estado de música
let efectosActivos = localStorage.getItem('efectosActivos') !== 'false'; // Estado de efectos
// let capital = 1000; // Capital inicial
// let inventario = [
//     { id: 1, nombre: "Manzanas", cantidad: 20, precio: 15, codigo: "P001", demanda: 5 },
//     { id: 2, nombre: "Peras", cantidad: 15, precio: 18, codigo: "P002", demanda: 8 },
//     { id: 3, nombre: "Plátanos", cantidad: 30, precio: 12, codigo: "P003", demanda: 3 }
// ]; // Inventario de productos
// let ventas = []; // Transacciones de ventas
// let clientes = ["Edwin", "Manuela", "Liyan", "Luis", "Yamira"]; // Lista de clientes
let contenedorMensaje = null; // Contenedor de mensajes

//Configura música global respetando estado de musicaActiva.

function configurarMusicaGlobal() {
    if (!window.musicaFondoGlobal) {
        window.musicaFondoGlobal = new Audio("../Sonidos/fondo.mp3");
        window.musicaFondoGlobal.loop = true;
        window.musicaFondoGlobal.volume = 0.3;
        window.musicaFondoGlobal.addEventListener("ended", () => {
            this.currentTime = 0;
            this.play().catch((e) => console.log("Error al reiniciar música:", e));
        });
    }
    musicaActiva = localStorage.getItem("musicaActiva") !== "false";
    efectosActivos = localStorage.getItem("efectosActivos") !== "false";
    const btnMusica = document.getElementById("btn-musica");
    const btnEfectos = document.getElementById("btn-efectos");
    const soundIcon = document.getElementById("sound-icon");

    if (btnMusica) {
        btnMusica.addEventListener("click", toggleMusica);
        btnMusica.querySelector(".btn-texto").textContent = musicaActiva ? "Música On" : "Música Off";
    }
    if (btnEfectos) {
        btnEfectos.addEventListener("click", toggleEfectos);
        btnEfectos.querySelector(".btn-texto").textContent = efectosActivos ? "Efectos On" : "Efectos Off";
    }
    if (soundIcon) {
        soundIcon.addEventListener("click", toggleSoundMenu);
        soundIcon.classList.toggle("active", musicaActiva);
    }
    if (musicaActiva) {
        const intentarReproducir = () => {
            window.musicaFondoGlobal.play().then(() => {
                console.log("Música de fondo iniciada");
                document.removeEventListener("click", intentarReproducir);
                document.removeEventListener("keydown", intentarReproducir);
                document.removeEventListener("touchstart", intentarReproducir);
            }).catch((e) => console.log("Autoplay bloqueado:", e));
        };
        intentarReproducir();
        document.addEventListener("click", intentarReproducir);
        document.addEventListener("keydown", intentarReproducir);
        document.addEventListener("touchstart", intentarReproducir);
    } else {
        window.musicaFondoGlobal.pause();
    }
}

//Alterna música, actualiza localStorage y UI.
 
function toggleMusica() {
    musicaActiva = !musicaActiva;
    localStorage.setItem("musicaActiva", musicaActiva);
    const btnMusica = document.getElementById("btn-musica");
    if (btnMusica) btnMusica.querySelector(".btn-texto").textContent = musicaActiva ? "Música On" : "Música Off";
    if (window.musicaFondoGlobal) {
        if (musicaActiva) {
            window.musicaFondoGlobal.volume = 0.3;
            window.musicaFondoGlobal.play().catch((e) => {
                console.log("Error al reanudar música:", e);
                mostrarMensaje("Haz clic para activar música", "info", 3000);
            });
        } else {
            window.musicaFondoGlobal.pause();
        }
    }
    const soundIcon = document.getElementById("sound-icon");
    if (soundIcon) soundIcon.classList.toggle("active", musicaActiva);
}

//Alterna visibilidad del menú de sonido.

function toggleSoundMenu() {
    const soundMenu = document.getElementById('sound-menu');
    if (soundMenu) soundMenu.classList.toggle('active');
}

//Alterna efectos de sonido y actualiza UI.

function toggleEfectos() {
    efectosActivos = !efectosActivos;
    localStorage.setItem('efectosActivos', efectosActivos);
    const btnEfectos = document.getElementById('btn-efectos');
    if (btnEfectos) btnEfectos.querySelector('.btn-texto').textContent = efectosActivos ? 'Efectos On' : 'Efectos Off';
}

//Agrega efectos hover a las cajas del juego.
 
function configurarHoverCajas() {
    document.querySelectorAll('.caja-juego').forEach(caja => {
        caja.addEventListener('mouseenter', () => {
            caja.style.transform = 'translateY(-10px) scale(1.05)';
            caja.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
            reproducirSonido('clic');
        });
        caja.addEventListener('mouseleave', () => {
            caja.style.transform = '';
            caja.style.boxShadow = '';
        });
    });
}

// Agrega animaciones de clic a botones.
 
function configurarClicBotones() {
    document.querySelectorAll('.action-btn, .btn-juego, .btn-empezar').forEach(boton => {
        boton.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
        });
    });
}

// Reproduce sonidos si efectosActivos es true.

function reproducirSonido(tipo) {
    if (!efectosActivos) return;
    const sonidos = {
        'clic': '../Sonidos/click.mp3',
        'exito': '../Sonidos/success.mp3',
        'error': '../Sonidos/error.mp3',
        'monedas': '../Sonidos/coins.mp3',
        'notificacion': '../Sonidos/notification.mp3',
        'transicion': '../Sonidos/transition.mp3'
    };
    if (sonidos[tipo]) {
        const audio = new Audio(sonidos[tipo]);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Error al reproducir sonido:", e));
    }
}

//Crea partículas para retroalimentación visual.

function crearParticulas(elemento, tipo) {
    const cantidadParticulas = tipo === 'ganancia' ? 15 : 8;
    for (let i = 0; i < cantidadParticulas; i++) {
        const particula = document.createElement('div');
        particula.className = `particula particula-${tipo}`;
        particula.style.left = `${Math.random() * 100 - 50}%`;
        particula.style.top = `${Math.random() * 100 - 50}%`;
        particula.style.animationDelay = `${i * 0.1}s`;
        if (tipo === 'ganancia') {
            particula.style.setProperty('--tx', Math.random() * 2 - 1);
            particula.style.setProperty('--ty', Math.random() * -2 - 1);
        } else if (tipo === 'perdida') {
            particula.style.setProperty('--tx', Math.random() * 2 - 1);
            particula.style.setProperty('--ty', Math.random() * 1 + 1);
        }
        elemento.appendChild(particula);
        setTimeout(() => particula.remove(), 1000);
    }
}

//Agrega efectos de zoom y brillo a inputs y selects.
 
function configurarEfectosEntradas() {
    document.querySelectorAll('input, select').forEach(entrada => {
        entrada.classList.add('zoom-al-acercar');
        entrada.addEventListener('focus', () => {
            entrada.classList.add('brillo');
            reproducirSonido('clic');
        });
        entrada.addEventListener('blur', () => {
            entrada.classList.remove('brillo');
        });
    });
}

//Agrega efectos de hover, clic y pulso a botones.

function configurarEfectosBotones() {
    document.querySelectorAll('button').forEach(boton => {
        boton.classList.add('zoom-al-acercar');
        boton.addEventListener('mouseenter', () => boton.classList.add('efecto-flotar'));
        boton.addEventListener('mouseleave', () => boton.classList.remove('efecto-flotar'));
        boton.addEventListener('click', () => {
            reproducirSonido('clic');
            boton.classList.add('pulso');
            setTimeout(() => boton.classList.remove('pulso'), 500);
        });
    });
}

//Activa vibración del dispositivo si es compatible.
 
function retroalimentacionVibracion(patron = 50) {
    if ('vibrate' in navigator) navigator.vibrate(patron);
}

// Muestra mensajes temporales con animaciones.
function mostrarMensaje(texto, tipo = 'exito', duracion = 3000) {
    if (contenedorMensaje) contenedorMensaje.remove();
    const audio = new Audio(`../Sonidos/${tipo === 'exito' ? 'success.mp3' : 'error.mp3'}`);
    audio.volume = 0.6;
    if (efectosActivos) audio.play().catch(console.error);
    const superposicion = document.createElement('div');
    superposicion.className = 'superposicion-mensaje';
    document.body.appendChild(superposicion);
    const divMensaje = document.createElement('div');
    divMensaje.className = `mensaje-juego mensaje-${tipo}`;
    const icono = document.createElement('div');
    icono.className = 'icono-mensaje';
    icono.style.backgroundImage = `url('../Imagenes/icono-${tipo}.png')`;
    divMensaje.appendChild(icono);
    const elementoTexto = document.createElement('span');
    elementoTexto.textContent = texto;
    elementoTexto.style.textShadow = '0 2px 5px rgba(0, 0, 0, 0.7)';
    divMensaje.appendChild(elementoTexto);
    if (tipo === 'exito') {
        for (let i = 0; i < 15; i++) {
            const particula = document.createElement('div');
            particula.className = 'particula-mensaje';
            particula.style.setProperty('--tx', Math.random() * 2 - 1);
            particula.style.setProperty('--ty', Math.random() * -2 - 1);
            particula.style.left = `${Math.random() * 100}%`;
            particula.style.top = `${Math.random() * 100}%`;
            particula.style.animationDelay = `${i * 0.05}s`;
            divMensaje.appendChild(particula);
        }
    }
    document.body.appendChild(divMensaje);
    contenedorMensaje = divMensaje;
    setTimeout(() => {
        divMensaje.classList.add('desaparecer');
        superposicion.classList.add('desaparecer');
        setTimeout(() => {
            divMensaje.remove();
            superposicion.remove();
            contenedorMensaje = null;
        }, 500);
    }, duracion);
    divMensaje.style.transform = 'translate(-50%, -50%) scale(0.5)';
    divMensaje.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    setTimeout(() => divMensaje.style.transform = 'translate(-50%, -50%) scale(1)', 50);
}

//Actualiza capital con efectos visuales y de sonido.
 
// function actualizarCapital() {
//     const elementosCapital = document.querySelectorAll('#capital, .capital-value');
//     const nuevoCapital = parseFloat(capital.toFixed(2));
//     elementosCapital.forEach((elemento) => {
//         const capitalAnterior = parseFloat(elemento.getAttribute('data-previous-capital')) || 0;
//         elemento.textContent = nuevoCapital.toFixed(2);
//         elemento.classList.remove('zoom-capital', 'capital-bajo', 'resaltar');
//         if (nuevoCapital < 100) {
//             elemento.classList.add('capital-bajo', 'resaltar');
//             reproducirSonido('notificacion');
//             retroalimentacionVibracion([100, 50, 100]);
//         } else if (nuevoCapital > capitalAnterior) {
//             elemento.classList.add('zoom-capital');
//             crearParticulas(elemento, 'ganancia');
//             reproducirSonido('monedas');
//             retroalimentacionVibracion(30);
//         } else if (nuevoCapital < capitalAnterior) {
//             elemento.classList.add('zoom-capital');
//             crearParticulas(elemento, 'perdida');
//             retroalimentacionVibracion(100);
//         }
//         elemento.setAttribute('data-previous-capital', nuevoCapital);
//     });
// }

// Incrementa valor de entrada con retroalimentación.

function incrementarValor(id, paso = 1) {
    retroalimentacionVibracion(20);
    const entrada = document.getElementById(id);
    let valor = parseInt(entrada.value) || 0;
    entrada.value = valor + paso;
    dispararEventoEntrada(entrada);
    entrada.classList.add('resaltar');
    setTimeout(() => entrada.classList.remove('resaltar'), 300);
    calcularMontoVenta();
}

//Decrementa valor de entrada, evita negativos.

function decrementarValor(id, paso = 1) {
    retroalimentacionVibracion(20);
    const entrada = document.getElementById(id);
    let valor = parseInt(entrada.value) || 0;
    entrada.value = Math.max(0, valor - paso);
    dispararEventoEntrada(entrada);
    entrada.classList.add('resaltar');
    setTimeout(() => entrada.classList.remove('resaltar'), 300);
    calcularMontoVenta();
}
function calcularMontoVenta() {
    const entradaCantidad = document.getElementById("cantidadVender");
    const precioVenta = document.getElementById("precio"); // asegúrate que el input tenga este id
    const entradaMonto = document.getElementById("montoVenta");

    const cantidad = parseInt(entradaCantidad.value) || 0;
    const precio = parseFloat(precioVenta.value) || 0;

    if (cantidad > 0 && precio > 0) {
        const monto = cantidad * precio;
        entradaMonto.value = monto.toFixed(2);

        entradaMonto.classList.add("resaltar");
        setTimeout(() => entradaMonto.classList.remove("resaltar"), 300);
    } else {
        entradaMonto.value = "";
    }
}


//Dispara evento de entrada en un elemento.

function dispararEventoEntrada(entrada) {
    const evento = new Event('input', { bubbles: true });
    entrada.dispatchEvent(evento);
}

//Llena selectores de productos y clientes.
 
let clientesData = []; // Variable global para acceder a los datos

function cargarSelectores() {
    // Hacer fetch para obtener clientes con productos
    fetch('../../Config/clientes.php')
        .then(response => response.json())
        .then(data => {
            console.log("Clientes con productos recibidos:", data);
            clientesData = data;
            llenarSelectClientes(data);
        });

    // Evento: cambio de cliente
    const selectorCliente = document.getElementById('clienteSelect');
    if (selectorCliente) {
        selectorCliente.addEventListener('change', function () {
            const clienteId = this.value;
            const cliente = clientesData.find(c => c.cliente_id == clienteId);

            if (cliente) {
                llenarSelectProductos(cliente.productos_pedidos);
            } else {
                limpiarSelectProductos();
            }

            // Limpiar campos al cambiar de cliente
            document.getElementById('cantidadPedida').value = '';
            document.getElementById('cantidadDisponible').value = '';
            document.getElementById('precio').value = '';
            document.getElementById('montoVenta').value = '';
        });
    }

    // Evento: cambio de producto
    const selectorProducto = document.getElementById('productoSelect');
    if (selectorProducto) {
        selectorProducto.addEventListener('change', function () {
            const opcion = this.selectedOptions[0];

            const cantidadPedida = opcion?.dataset.cantidadPedida || 0;
            const cantidadDisponible = opcion?.dataset.cantidadDisponible || 0;
            const precio = opcion?.dataset.precio || 0;

            document.getElementById('cantidadPedida').value = cantidadPedida;
            document.getElementById('cantidadDisponible').value = cantidadDisponible;
            document.getElementById('precio').value = precio;
            document.getElementById('montoVenta').value = ''; // limpiar monto al seleccionar nuevo producto
        });
    }
}

// Llenar select de clientes
function llenarSelectClientes(clientes) {
    const selector = document.getElementById('clienteSelect');
    selector.innerHTML = '<option value="">Selecciona un cliente</option>';
    clientes.forEach(cliente => {
        const opcion = document.createElement('option');
        opcion.value = cliente.cliente_id;
        opcion.textContent = cliente.cliente_nombre;
        selector.appendChild(opcion);
    });
    selector.value = '';
}

// Llenar select de productos del cliente
function llenarSelectProductos(productos) {
    const selector = document.getElementById('productoSelect');
    selector.innerHTML = '<option value="">Selecciona un producto</option>';
    productos.forEach(producto => {
        const opcion = document.createElement('option');
        opcion.value = producto.id;
        opcion.textContent = `${producto.nombre}`;
        opcion.dataset.cantidadPedida = producto.cantidad_pedida;
        opcion.dataset.cantidadDisponible = producto.cantidad_disponible;
        opcion.dataset.precio = producto.precio_venta;
        selector.appendChild(opcion);
    });
    selector.value = '';
}

// Limpiar productos si no hay cliente seleccionado
function limpiarSelectProductos() {
    const selector = document.getElementById('productoSelect');
    selector.innerHTML = '<option value="">Selecciona un producto</option>';
}



//Actualiza UI según producto seleccionado y capital.
 
function actualizarInterfaz() {
    // actualizarCapital();
    const selectorProducto = document.getElementById('productoSelect');
    if (selectorProducto && selectorProducto.value) {
        const producto = inventario.find(p => p.nombre === selectorProducto.value);
        if (producto) {
            const entradaPrecioUnitario = document.getElementById('precioUnitario');
            if (entradaPrecioUnitario) entradaPrecioUnitario.value = producto.precio;
            const entradaCodigoProducto = document.getElementById('codigoProducto');
            if (entradaCodigoProducto) entradaCodigoProducto.value = producto.codigo;
            const entradaDisponible = document.getElementById('disponible');
            if (entradaDisponible) entradaDisponible.value = producto.cantidad;
            const entradaCantidadDisponible = document.getElementById('cantidadDisponible');
            if (entradaCantidadDisponible) entradaCantidadDisponible.value = producto.cantidad;
            const entradaDemanda = document.getElementById('demanda');
            if (entradaDemanda) entradaDemanda.value = producto.demanda || 0;
            // if (document.getElementById('cantidadVender')) calcularMonto();
            if (document.getElementById('cantidadCompra')) calcularMontoCompra();
        }
    }
}
// Realiza la compra de un producto
async function comprarProducto() {
    retroalimentacionVibracion();

    const selectorProducto = document.getElementById('productoSelect');
    const entradaCantidadCompra = document.getElementById('cantidadCompra');
    const entradaPrecioUnitario = document.getElementById('precioUnitario');

    const productoId = selectorProducto.value;
    const cantidad = parseInt(entradaCantidadCompra.value) || 0;
    const precioUnitario = parseFloat(entradaPrecioUnitario.value) || 0;
    const precioTotal = parseFloat((cantidad * precioUnitario).toFixed(2));

    // Validaciones visuales
    if (!productoId) {
        selectorProducto.classList.add('sacudir');
        setTimeout(() => selectorProducto.classList.remove('sacudir'), 500);
        mostrarMensaje("¡Selecciona un producto!", "error");
        return;
    }
    if (cantidad <= 0) {
        entradaCantidadCompra.classList.add('sacudir');
        setTimeout(() => entradaCantidadCompra.classList.remove('sacudir'), 500);
        mostrarMensaje("¡Cantidad inválida!", "error");
        return;
    }

    try {
        const res = await fetch('../../Config/comprar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                producto_id: productoId,
                cantidad: cantidad,
                precio_unitario: precioUnitario,
                precio_total: precioTotal
            })
        });

        const data = await res.json();

        if (data.success) {
            mostrarMensaje(`¡Compra exitosa! +${cantidad} unidades`, "exito");
            reiniciarFormularioCompras();
            document.querySelector('.contenedor-admin').classList.add('pulso');
            setTimeout(() => document.querySelector('.contenedor-admin').classList.remove('pulso'), 500);

            await actualizarCapital(); // Sincroniza el capital visual con backend
            obtenerNegocioYProductos(); // Refresca productos
        } else {
            mostrarMensaje("Error: " + data.message, "error");
        }
    } catch (error) {
        console.error("Error al realizar la compra:", error);
        mostrarMensaje("Error en la comunicación con el servidor.", "error");
    }
}
async function actualizarCapital() {
    try {
        const res = await fetch('../../Config/comprar.php'); // mismo archivo, pero GET
        const data = await res.json();
        
        if (!data.success || typeof data.capital === 'undefined') {
            console.error("No se pudo obtener el capital:", data.message);
            return;
        }

        const elementosCapital = document.querySelectorAll('#capital');
        const nuevoCapital = parseFloat(data.capital);
        
        if (isNaN(nuevoCapital)) {
            console.error("Capital recibido no es un número:", data.capital);
            return;
        }


        elementosCapital.forEach((elemento) => {
            const capitalAnterior = parseFloat(elemento.getAttribute('data-previous-capital')) || 0;

            elemento.textContent = nuevoCapital.toFixed(2);
            
            elemento.classList.remove('zoom-capital', 'capital-bajo', 'resaltar');
            void elemento.offsetWidth;

            if (nuevoCapital < 100) {
                elemento.classList.add('capital-bajo', 'resaltar');
                reproducirSonido('notificacion');
                retroalimentacionVibracion([100, 50, 100]);
            } else if (nuevoCapital > capitalAnterior) {
                elemento.classList.add('zoom-capital');
                crearParticulas(elemento, 'ganancia');
                reproducirSonido('monedas');
                retroalimentacionVibracion(30);
            } else if (nuevoCapital < capitalAnterior) {
                elemento.classList.add('zoom-capital');
                crearParticulas(elemento, 'perdida');
                retroalimentacionVibracion(100);
            }

            elemento.setAttribute('data-previous-capital', nuevoCapital);
        });

    } catch (error) {
        console.error("Error al obtener capital:", error);
    }
}
function reiniciarFormularioCompras() {
  const selectorProducto = document.getElementById("productoSelect");
  const entradaCantidadCompra = document.getElementById("cantidadCompra");
  const entradaPrecioUnitario = document.getElementById("precioUnitario");
  const entradaMontoCompra = document.getElementById("montoCompra");
//   const entradaDisponible = document.getElementById("disponible");
//   const entradaDemanda = document.getElementById("demanda");

  // Limpia valores de los elementos si existen
  if (selectorProducto) selectorProducto.value = "";
  if (entradaCantidadCompra) entradaCantidadCompra.value = "";
  if (entradaPrecioUnitario) entradaPrecioUnitario.value = "";
  if (entradaMontoCompra) entradaMontoCompra.value = "";
//   if (entradaDisponible) entradaDisponible.value = "";
//   if (entradaDemanda) entradaDemanda.value = "";
}
//Inicializa página con listeners y configuraciones.
 
document.addEventListener('DOMContentLoaded', () => {
    const transiciones = document.querySelectorAll('.transicion-pagina');
    transiciones.forEach(t => t.remove());
    cargarSelectores();
    actualizarInterfaz();
    configurarEfectosEntradas();
    configurarEfectosBotones();
    configurarClicBotones();
    configurarMusicaGlobal();
     actualizarCapital();
    document.querySelectorAll('.contenedor-entrada-numerica input[type="number"]').forEach(entrada => {
        entrada.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp') {
                incrementarValor(this.id);
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                decrementarValor(this.id);
                e.preventDefault();
            }
        });
    });
    // const selectorProducto = document.getElementById('productoSelect');
    // if (selectorProducto) selectorProducto.addEventListener('change', () => {
    //     actualizarInterfaz();
    //     if (document.getElementById('clienteSelect')) generarCantidadPedida();
    // });
    // const selectorCliente = document.getElementById('clienteSelect');
    // if (selectorCliente) selectorCliente.addEventListener('change', () => generarCantidadPedida());
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            const transiciones = document.querySelectorAll('.transicion-pagina');
            transiciones.forEach(t => t.remove());
            document.location.reload();
        }
    });
});

//Maneja transiciones de página con efectos.

function transicionPagina(destino) {
    const overlay = document.createElement('div');
    overlay.className = 'transicion-pagina';
    const logo = document.createElement('img');
    logo.src = '../Imagenes/logo.png';
    logo.className = 'transicion-logo';
    overlay.appendChild(logo);
    for (let i = 0; i < 10; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula-magic';
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.top = `${Math.random() * 100}%`;
        particula.style.animationDelay = `${i * 0.1}s`;
        particula.style.setProperty('--tx', Math.random() * 2 - 1);
        particula.style.setProperty('--ty', Math.random() * 2 - 1);
        overlay.appendChild(particula);
    }
    document.body.appendChild(overlay);
    reproducirSonido('transicion');
    setTimeout(() => window.location.href = destino, 1200);
}

//Aplica efecto de resaltado a un elemento.

function efectoActualizacion(elemento) {
    elemento.classList.add('destacar-actualizacion');
    setTimeout(() => elemento.classList.remove('destacar-actualizacion'), 1000);
}

// Retorna rutas de sonidos adicionales.

function cargarSonidosAdicionales() {
    return {
        'transicion': '../Sonidos/transition.mp3',
        'actualizacion': '../Sonidos/update.mp3'
    };
}