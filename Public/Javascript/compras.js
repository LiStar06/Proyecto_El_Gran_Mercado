// Datos iniciales del juego
let capital = 1000; // Capital inicial del jugador
let inventario = [
    { id: 1, nombre: "Manzanas", cantidad: 20, precio: 15, codigo: "P001", demanda: 5 },
    { id: 2, nombre: "Peras", cantidad: 15, precio: 18, codigo: "P002", demanda: 8 },
    { id: 3, nombre: "Plátanos", cantidad: 30, precio: 12, codigo: "P003", demanda: 3 }
];
let ventas = []; // Registro de ventas
let clientes = ["Edwin", "Manuela", "Liyan","Luis","Yamira"];
let contenedorMensaje = null; // Contenedor para mensajes emergentes
let sonidoActivado = true; // Estado del sonido

// Crea el control de sonido en la interfaz
function crearControlSonido() {
    const controlSonido = document.createElement('div');
    controlSonido.className = 'control-sonido';
    
    const iconoSonido = document.createElement('div');
    iconoSonido.className = 'icono-sonido';
    
    const interruptor = document.createElement('div');
    interruptor.className = `interruptor-sonido ${sonidoActivado ? 'encendido' : ''}`;
    interruptor.addEventListener('click', alternarSonido);
    
    const etiqueta = document.createElement('span');
    etiqueta.className = 'etiqueta-control-sonido';
    etiqueta.textContent = sonidoActivado ? 'ON' : 'OFF'; // Mantenido en inglés por solicitud
    
    controlSonido.appendChild(iconoSonido);
    controlSonido.appendChild(interruptor);
    controlSonido.appendChild(etiqueta);
    
    document.body.appendChild(controlSonido);
}

// Alterna el estado del sonido
function alternarSonido() {
    const interruptor = document.querySelector('.interruptor-sonido');
    const etiqueta = document.querySelector('.etiqueta-control-sonido');
    
    interruptor.classList.add('animando');
    
    setTimeout(() => {
        sonidoActivado = !sonidoActivado;
        interruptor.classList.toggle('encendido');
        etiqueta.textContent = sonidoActivado ? 'ON' : 'OFF';
        document.querySelector('.icono-sonido').style.filter = sonidoActivado 
            ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' 
            : 'grayscale(100%) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))';
        if (sonidoActivado) reproducirSonido('clic');
        setTimeout(() => interruptor.classList.remove('animando'), 400);
    }, 100);
}

// Reproduce sonidos según el tipo
const reproducirSonido = (tipo) => {
    if (!sonidoActivado) return;
    
    const sonidos = {
        'clic': '../Sonidos/click.mp3',
        'exito': '../Sonidos/success.mp3',
        'error': '../Sonidos/error.mp3',
        'monedas': '../Sonidos/coins.mp3',
        'notificacion': '../Sonidos/notification.mp3',
    };
    
    if (sonidos[tipo]) {
        try {
            const audio = new Audio(sonidos[tipo]);
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Error al reproducir sonido:", e));
        } catch (e) {
            console.log("Error con el sistema de audio:", e);
        }
    }
};

// Crea partículas visuales
const crearParticulas = (elemento, tipo) => {
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
};

// Configura efectos en entradas
const configurarEfectosEntradas = () => {
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
};

// Configura efectos en botones
const configurarEfectosBotones = () => {
    document.querySelectorAll('button').forEach(boton => {
        boton.classList.add('zoom-al-acercar');
        
        boton.addEventListener('mouseenter', () => {
            boton.classList.add('efecto-flotar');
        });
        
        boton.addEventListener('mouseleave', () => {
            boton.classList.remove('efecto-flotar');
        });
        
        boton.addEventListener('click', () => {
            reproducirSonido('clic');
            boton.classList.add('pulso');
            setTimeout(() => boton.classList.remove('pulso'), 500);
        });
    });
};

// Activa vibración si está disponible
const retroalimentacionVibracion = (patron = 50) => {
    if ('vibrate' in navigator) {
        navigator.vibrate(patron);
    }
};

// Muestra mensajes emergentes
function mostrarMensaje(texto, tipo = 'exito', duracion = 3000) {
    if (contenedorMensaje) {
        contenedorMensaje.remove();
    }

    const audio = new Audio(`../Sonidos/${tipo === 'exito' ? 'success.mp3' : 'error.mp3'}`);
    audio.volume = 0.6;
    if (sonidoActivado) audio.play().catch(console.error);

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
}

// Actualiza el capital en la interfaz
function actualizarCapital() {
    const elementosCapital = document.querySelectorAll('#capital');
    const nuevoCapital = parseFloat(capital.toFixed(2));
    
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
}

// Calcula el monto de una compra
function calcularMontoCompra() {
    const entradaCantidadCompra = document.getElementById('cantidadCompra');
    const entradaPrecioUnitario = document.getElementById('precioUnitario');
    const entradaMontoCompra = document.getElementById('montoCompra');
    
    if (entradaCantidadCompra && entradaPrecioUnitario && entradaMontoCompra) {
        const cantidad = parseInt(entradaCantidadCompra.value) || 0;
        const precio = parseFloat(entradaPrecioUnitario.value) || 0;
        entradaMontoCompra.value = (cantidad * precio).toFixed(2);
        
        if (cantidad > 0 && precio > 0) {
            entradaMontoCompra.classList.add('pulso');
            setTimeout(() => entradaMontoCompra.classList.remove('pulso'), 500);
        }
    }
}

// Realiza la compra de un producto
function comprarProducto() {
    retroalimentacionVibracion();
    
    const selectorProducto = document.getElementById('productoSelect');
    const entradaCantidadCompra = document.getElementById('cantidadCompra');
    const entradaPrecioUnitario = document.getElementById('precioUnitario');
    const cantidad = parseInt(entradaCantidadCompra.value) || 0;
    const precio = parseFloat(entradaPrecioUnitario.value) || 0;
    const monto = cantidad * precio;

    if (!selectorProducto.value) {
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
    if (monto > capital) {
        document.querySelector('.visualizador-capital').classList.add('sacudir');
        setTimeout(() => document.querySelector('.visualizador-capital').classList.remove('sacudir'), 500);
        mostrarMensaje("¡Capital insuficiente!", "error");
        return;
    }

    let producto = inventario.find(p => p.nombre === selectorProducto.value);
    
    if (producto) {
        producto.cantidad += cantidad;
    } else {
        producto = {
            id: inventario.length + 1,
            nombre: selectorProducto.value,
            cantidad: cantidad,
            precio: precio,
            codigo: `P${inventario.length + 1}`,
            demanda: Math.floor(Math.random() * 10) + 1
        };
        inventario.push(producto);
        
        const opcion = document.createElement('option');
        opcion.value = producto.nombre;
        opcion.textContent = producto.nombre;
        opcion.dataset.id = producto.id;
        selectorProducto.appendChild(opcion);
        selectorProducto.classList.add('resaltar');
        setTimeout(() => selectorProducto.classList.remove('resaltar'), 1000);
    }

    capital -= monto;
    actualizarInterfaz();
    mostrarMensaje(`¡Compra exitosa! +${cantidad} unidades`, "exito");

    reiniciarFormularioCompras();
    document.querySelector('.contenedor-admin').classList.add('pulso');
    setTimeout(() => document.querySelector('.contenedor-admin').classList.remove('pulso'), 500);
}

// Genera una cantidad pedida aleatoria
function generarCantidadPedida() {
    const selectorCliente = document.getElementById('clienteSelect');
    const selectorProducto = document.getElementById('productoSelect');
    if (selectorCliente && selectorProducto && selectorCliente.value && selectorProducto.value) {
        const cantidadPedida = Math.floor(Math.random() * 10) + 1;
        const entradaCantidadPedida = document.getElementById('cantidadPedida');
        if (entradaCantidadPedida) {
            entradaCantidadPedida.value = cantidadPedida;
            entradaCantidadPedida.classList.add('resaltar');
            setTimeout(() => entradaCantidadPedida.classList.remove('resaltar'), 1000);
            calcularMonto();
        }
    }
}

// Calcula el monto de una venta
function calcularMonto() {
    const selectorProducto = document.getElementById('productoSelect');
    const entradaCantidadVender = document.getElementById('cantidadVender');
    const entradaMontoVenta = document.getElementById('montoVenta');
    
    if (selectorProducto && entradaCantidadVender && entradaMontoVenta && selectorProducto.value) {
        const cantidad = parseInt(entradaCantidadVender.value) || 0;
        const producto = inventario.find(p => p.nombre === selectorProducto.value);
        if (producto) {
            entradaMontoVenta.value = (cantidad * producto.precio).toFixed(2);
            
            if (cantidad > 0) {
                entradaMontoVenta.classList.add('pulso');
                setTimeout(() => entradaMontoVenta.classList.remove('pulso'), 500);
            }
        } else {
            entradaMontoVenta.value = '';
        }
    }
}

// Realiza la venta de un producto
async function venderProducto() {
    retroalimentacionVibracion();
    
    const selectorCliente = document.getElementById('clienteSelect');
    const selectorProducto = document.getElementById('productoSelect');
    const entradaCantidadVender = document.getElementById('cantidadVender');
    const cantidadVender = parseInt(entradaCantidadVender.value) || 0;
    const producto = inventario.find(p => p.nombre === selectorProducto.value);

    if (!selectorCliente.value) {
        selectorCliente.classList.add('sacudir');
        setTimeout(() => selectorCliente.classList.remove('sacudir'), 500);
        mostrarMensaje("Selecciona un cliente", "error");
        return;
    }
    if (!selectorProducto.value) {
        selectorProducto.classList.add('sacudir');
        setTimeout(() => selectorProducto.classList.remove('sacudir'), 500);
        mostrarMensaje("Selecciona un producto", "error");
        return;
    }
    if (cantidadVender <= 0) {
        entradaCantidadVender.classList.add('sacudir');
        setTimeout(() => entradaCantidadVender.classList.remove('sacudir'), 500);
        mostrarMensaje("Cantidad inválida", "error");
        return;
    }
    if (!producto || producto.cantidad < cantidadVender) {
        const entradaDisponible = document.getElementById('cantidadDisponible');
        entradaDisponible.classList.add('sacudir');
        setTimeout(() => entradaDisponible.classList.remove('sacudir'), 500);
        mostrarMensaje("Stock insuficiente", "error");
        return;
    }

    try {
        const monto = cantidadVender * producto.precio;
        producto.cantidad -= cantidadVender;
        capital += monto;
        
        ventas.push({
            producto_id: producto.id,
            nombre: producto.nombre,
            cantidad: cantidadVender,
            monto: monto,
            cliente: selectorCliente.value,
            fecha: new Date().toISOString()
        });

        actualizarInterfaz();
        mostrarMensaje(`Venta realizada: ${cantidadVender} unidades por $${monto}`, "exito");

        reiniciarFormularioVentas();
        document.querySelector('.contenedor-admin').classList.add('pulso');
        setTimeout(() => document.querySelector('.contenedor-admin').classList.remove('pulso'), 500);
    } catch (error) {
        mostrarMensaje("Error al procesar venta: " + error.message, "error");
    }
}

// Incrementa el valor de una entrada numérica
function incrementarValor(id, paso = 1) {
    retroalimentacionVibracion(20);
    
    const entrada = document.getElementById(id);
    let valor = parseInt(entrada.value) || 0;
    entrada.value = valor + paso;
    dispararEventoEntrada(entrada);
    
    entrada.classList.add('resaltar');
    setTimeout(() => entrada.classList.remove('resaltar'), 300);
}

// Decrementa el valor de una entrada numérica
function decrementarValor(id, paso = 1) {
    retroalimentacionVibracion(20);
    
    const entrada = document.getElementById(id);
    let valor = parseInt(entrada.value) || 0;
    entrada.value = Math.max(0, valor - paso);
    dispararEventoEntrada(entrada);
    
    entrada.classList.add('resaltar');
    setTimeout(() => entrada.classList.remove('resaltar'), 300);
}

// Dispara un evento de entrada
function dispararEventoEntrada(entrada) {
    const evento = new Event('input', { bubbles: true });
    entrada.dispatchEvent(evento);
}

// Reinicia el formulario de ventas
function reiniciarFormularioVentas() {
    const selectorCliente = document.getElementById('clienteSelect');
    const selectorProducto = document.getElementById('productoSelect');
    const entradaCantidadPedida = document.getElementById('cantidadPedida');
    const entradaCantidadVender = document.getElementById('cantidadVender');
    const entradaCantidadDisponible = document.getElementById('cantidadDisponible');
    const entradaMontoVenta = document.getElementById('montoVenta');

    if (selectorCliente) selectorCliente.value = '';
    if (selectorProducto) selectorProducto.value = '';
    if (entradaCantidadPedida) entradaCantidadPedida.value = '';
    if (entradaCantidadVender) entradaCantidadVender.value = '0';
    if (entradaCantidadDisponible) entradaCantidadDisponible.value = '';
    if (entradaMontoVenta) entradaMontoVenta.value = '';
}

// Reinicia el formulario de compras
function reiniciarFormularioCompras() {
    const selectorProducto = document.getElementById('productoSelect');
    const entradaCantidadCompra = document.getElementById('cantidadCompra');
    const entradaPrecioUnitario = document.getElementById('precioUnitario');
    const entradaMontoCompra = document.getElementById('montoCompra');
    const entradaDisponible = document.getElementById('disponible');
    const entradaDemanda = document.getElementById('demanda');

    if (selectorProducto) selectorProducto.value = '';
    if (entradaCantidadCompra) entradaCantidadCompra.value = '';
    if (entradaPrecioUnitario) entradaPrecioUnitario.value = '';
    if (entradaMontoCompra) entradaMontoCompra.value = '';
    if (entradaDisponible) entradaDisponible.value = '';
    if (entradaDemanda) entradaDemanda.value = '';
}

// Carga los selectores con datos iniciales
function cargarSelectores() {
    const selectorProducto = document.getElementById('productoSelect');
    if (selectorProducto) {
        selectorProducto.innerHTML = '<option value="">Selecciona un producto</option>';
        inventario.forEach(producto => {
            const opcion = document.createElement('option');
            opcion.value = producto.nombre;
            opcion.textContent = producto.nombre;
            opcion.dataset.id = producto.id;
            selectorProducto.appendChild(opcion);
        });
        selectorProducto.value = '';
    }

    const selectorCliente = document.getElementById('clienteSelect');
    if (selectorCliente) {
        selectorCliente.innerHTML = '<option value="">Selecciona un cliente</option>';
        clientes.forEach(cliente => {
            const opcion = document.createElement('option');
            opcion.value = cliente;
            opcion.textContent = cliente;
            selectorCliente.appendChild(opcion);
        });
        selectorCliente.value = '';
    }
}

// Actualiza toda la interfaz
function actualizarInterfaz() {
    actualizarCapital();

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

            calcularMonto();
            calcularMontoCompra();
        }
    }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarSelectores();
    actualizarInterfaz();
    reiniciarFormularioVentas();
    reiniciarFormularioCompras();
    configurarEfectosEntradas();
    configurarEfectosBotones();
    crearControlSonido();

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

    const selectorProducto = document.getElementById('productoSelect');
    if (selectorProducto) {
        selectorProducto.addEventListener('change', () => {
            actualizarInterfaz();
            generarCantidadPedida();
        });
    }

    const selectorCliente = document.getElementById('clienteSelect');
    if (selectorCliente) {
        selectorCliente.addEventListener('change', () => {
            generarCantidadPedida();
        });
    }

    const entradaCantidadCompra = document.getElementById('cantidadCompra');
    if (entradaCantidadCompra) {
        entradaCantidadCompra.addEventListener('input', calcularMontoCompra);
    }

    const entradaCantidadVender = document.getElementById('cantidadVender');
    if (entradaCantidadVender) {
        entradaCantidadVender.addEventListener('input', calcularMonto);
    }
});