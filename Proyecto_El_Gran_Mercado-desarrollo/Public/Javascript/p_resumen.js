const gananciasTotalesElement = document.getElementById('ganancias-totales');
const resumenTabla = document.getElementById('resumenTabla');
const masVendidosSelect = document.getElementById('masVendidosSelect');
const listaMasVendidosElement = document.getElementById('lista-mas-vendidos-lista');
const listaMenosVendidosElement = document.getElementById('lista-menos-vendidos-lista');
const invertidoInput = document.getElementById('invertido');
const gananciasInput = document.getElementById('ganancias');
const capitalElement = document.getElementById('capital');
const paginacionElement = document.querySelector('.paginacion');
const detallesButton = document.querySelector('.nav-btn:nth-of-type(1)'); // Botón de Histórico de Precios

// Datos de ejemplo
let gananciasTotales = 125000;
const productosMasVendidos = [
    { nombre: 'Producto A', cantidad: 150, precio: 25 },
    { nombre: 'Producto B', cantidad: 120, precio: 18 },
    { nombre: 'Producto C', cantidad: 100, precio: 30 },
    { nombre: 'Producto D', cantidad: 200, precio: 15 },
    { nombre: 'Producto E', cantidad: 50, precio: 40 },
    { nombre: 'Producto F', cantidad: 80, precio: 22 },
    { nombre: 'Producto G', cantidad: 30, precio: 60 },
    { nombre: 'Producto H', cantidad: 180, precio: 12 },
    { nombre: 'Producto I', cantidad: 95, precio: 28 },
    { nombre: 'Producto J', cantidad: 110, precio: 33 },
];
const productosMenosVendidos = [
    { nombre: 'Producto X', cantidad: 10, precio: 40 },
    { nombre: 'Producto Y', cantidad: 20, precio: 35 },
    { nombre: 'Producto Z', cantidad: 30, precio: 50 },
    { nombre: 'Producto W', cantidad: 5, precio: 100 },
    { nombre: 'Producto K', cantidad: 12, precio: 75 },
    { nombre: 'Producto L', cantidad: 18, precio: 68 },
    { nombre: 'Producto M', cantidad: 25, precio: 55 },
    { nombre: 'Producto N', cantidad: 8, precio: 90 },
    { nombre: 'Producto O', cantidad: 15, precio: 80 },
    { nombre: 'Producto P', cantidad: 22, precio: 62 },
];

let paginaActual = 1;
const productosPorPagina = 5;
let tipoOrden = 'masVendidos';
let totalPaginas = 0;
let chartInitialized = false;


// Formatear el dinero a pesos dominicanos
function formatMoney(amount) {
    return amount.toLocaleString('es-DO', {
        style: 'currency',
        currency: 'DOP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

/**
 * Calcula el valor invertido y las ganancias totales
 */
function calcularInversionYGanancias() {
    let valorInvertido = 0;
    let productos = tipoOrden === 'masVendidos' ? productosMasVendidos : productosMenosVendidos;
    productos.forEach(producto => {
        valorInvertido += producto.precio * producto.cantidad;
    });
    const ganancias = gananciasTotales - valorInvertido;
    return { invertido: valorInvertido, ganancias: ganancias };
}

/**
 * Actualiza la tabla de resumen de productos
 * @param {Array} productos - Array de productos a mostrar
 * @param {number} pagina - Página a mostrar
 */
function actualizarTabla(productos, pagina) {
    const tablaBody = resumenTabla.querySelector('tbody');
    if (!tablaBody) {
        console.error("No se encontró el elemento tbody de la tabla.");
        return;
    }
    tablaBody.innerHTML = '';

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);

    if (productosPagina.length === 0) {
        tablaBody.innerHTML = '<tr><td colspan="3">No hay productos en esta página.</td></tr>';
    } else {
        productosPagina.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${formatMoney(producto.precio)}</td>
                `;
            tablaBody.appendChild(row);
        });
    }

    // Recalcular y mostrar los valores de inversión, ganancias y capital
    const { invertido, ganancias } = calcularInversionYGanancias();
    invertidoInput.value = formatMoney(invertido);
    gananciasInput.value = formatMoney(ganancias);
    capitalElement.textContent = formatMoney(obtenerCapitalInicial());
    gananciasTotalesElement.textContent = formatMoney(gananciasTotales);
}

/**
 * Actualiza las listas de "Productos Más Vendidos" y "Productos Menos Vendidos"
 */
function actualizarProductosVendidos() {
    if (!listaMasVendidosElement || !listaMenosVendidosElement) {
        console.error("No se pudieron encontrar los elementos de la lista de productos vendidos.");
        return;
    }

    listaMasVendidosElement.innerHTML = '';
    listaMenosVendidosElement.innerHTML = '';

    // Ordenar de mayor a menor cantidad
    const productosMasVendidosOrdenados = [...productosMasVendidos].sort((a, b) => b.cantidad - a.cantidad);
    // Ordenar de menor a mayor cantidad
    const productosMenosVendidosOrdenados = [...productosMenosVendidos].sort((a, b) => a.cantidad - b.cantidad);

    // Crear elementos de lista ordenada y agregar productos más vendidos
    const olMasVendidos = document.createElement('ol');
    productosMasVendidosOrdenados.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.cantidad} vendidos`;
        olMasVendidos.appendChild(li);
    });
    listaMasVendidosElement.appendChild(olMasVendidos);

    // Crear elementos de lista ordenada y agregar productos menos vendidos
    const olMenosVendidos = document.createElement('ol');
    productosMenosVendidosOrdenados.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.cantidad} vendidos`;
        olMenosVendidos.appendChild(li);
    });
    listaMenosVendidosElement.appendChild(olMenosVendidos);
}



/**
 * Calcula y muestra los valores de inversión, ganancias y capital
 */
function calcularYMostrarValores() {
    const { invertido, ganancias } = calcularInversionYGanancias();
    const capitalInicial = obtenerCapitalInicial();

    invertidoInput.value = formatMoney(invertido);
    gananciasInput.value = formatMoney(ganancias);
    capitalElement.textContent = formatMoney(capitalInicial);
    gananciasTotalesElement.textContent = formatMoney(gananciasTotales);
}

/**
 * Obtiene el capital inicial
 * @returns {number}
 */
function obtenerCapitalInicial() {
    return 100000;
}

/**
 * Actualiza la paginación
 */
function actualizarPaginacion() {
    paginacionElement.innerHTML = '';
    const productos = tipoOrden === 'masVendidos' ? productosMasVendidos : productosMenosVendidos;
    totalPaginas = Math.ceil(productos.length / productosPorPagina);

    if (totalPaginas <= 1) {
        paginacionElement.innerHTML = '<span class="active">1</span>';
        return;
    }

    for (let i = 1; i <= totalPaginas; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        if (i === paginaActual) {
            span.classList.add('active');
        }
        span.addEventListener('click', () => {
            paginaActual = i;
            actualizarTabla(productos, paginaActual);
            actualizarPaginacion();
        });
        paginacionElement.appendChild(span);
    }
    const prevSpan = document.createElement('span');
    prevSpan.textContent = '«';
    prevSpan.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            actualizarTabla(productos, paginaActual);
            actualizarPaginacion();
        }
    });
    paginacionElement.prepend(prevSpan);

    const nextSpan = document.createElement('span');
    nextSpan.textContent = '»';
    nextSpan.addEventListener('click', () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            actualizarTabla(productos, paginaActual);
            actualizarPaginacion();
        }
    });
    paginacionElement.appendChild(nextSpan);
}

// Inicialización de la página
function inicializarPagina() {
    // Establecer el valor por defecto del select
    masVendidosSelect.value = tipoOrden;

    let productosIniciales = [];
    if (tipoOrden === 'masVendidos') {
        productosMasVendidos.sort((a, b) => b.cantidad - a.cantidad);
        productosIniciales = productosMasVendidos;
    } else {
        productosMenosVendidos.sort((a, b) => a.cantidad - b.cantidad);
        productosIniciales = productosMenosVendidos;
    }

    actualizarProductosVendidos();
    actualizarTabla(productosIniciales, paginaActual);
    calcularYMostrarValores();
    actualizarPaginacion();
}

// Manejar el cambio en el select de Más/Menos vendidos
masVendidosSelect.addEventListener('change', () => {
    paginaActual = 1;
    tipoOrden = masVendidosSelect.value;
    let productos = [];
    if (tipoOrden === 'masVendidos') {
        productos = productosMasVendidos.slice();
        productos.sort((a, b) => b.cantidad - a.cantidad);
    } else {
        productos = productosMenosVendidos.slice();
        productos.sort((a, b) => a.cantidad - b.cantidad);
    }
    actualizarTabla(productos, paginaActual);
    actualizarProductosVendidos();
    actualizarPaginacion();
});

// Llama a la función de inicialización
inicializarPagina();

// Evento para el botón de Histórico de Precios
detallesButton.addEventListener('click', () => {
    alert('Mostrando histórico de precios...');
    // Aquí podrías redirigir a la página de histórico de precios o mostrar un modal con el gráfico.
    // Por ejemplo: window.location.href = 'historicoDePrecios.html';
});
