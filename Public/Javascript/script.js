const gananciasTotalesElement = document.getElementById('ganancias-totales');
const historicoPreciosCanvas = document.getElementById('historico-precios');
const ctx = historicoPreciosCanvas.getContext('2d');
const resumenTabla = document.getElementById('resumenTabla');
const masVendidosSelect = document.getElementById('masVendidosSelect');
const listaMasVendidosElement = document.getElementById('lista-mas-vendidos-lista');
const listaMenosVendidosElement = document.getElementById('lista-menos-vendidos-lista');
const invertidoInput = document.getElementById('invertido');
const gananciasInput = document.getElementById('ganancias');
const capitalElement = document.getElementById('capital');
const paginacionElement = document.querySelector('.paginacion');
const detallesButton = document.querySelector('.nav-btn:nth-of-type(1)');


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

let historicoPreciosChart;
let paginaActual = 1;
const productosPorPagina = 5;
let tipoOrden = 'masVendidos';
let totalPaginas = 0; // Variable para almacenar el total de páginas


// Formatear el dinero
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
    return { invertido, ganancias };
}

/**
 * Actualiza la tabla de resumen de productos
 * @param {Array} productos - Array de productos a mostrar
 * @param {number} pagina - Página a mostrar
 */
function actualizarTabla(productos, pagina) {
    const tablaBody = resumenTabla.querySelector('tbody');
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


    // Recalcular y mostrar los valores
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
 * Crea y muestra el gráfico de histórico de precios
 */
function createChart(historicoPrecios) {
    const chartData = {
        labels: historicoPrecios[Object.keys(historicoPrecios)[0]].map(item => item.fecha),
        datasets: Object.keys(historicoPrecios).map(nombreProducto => ({
            label: nombreProducto,
            data: historicoPrecios[nombreProducto].map(item => item.precio),
            borderColor: ['#ff6f61', '#8884d8', '#3b82f6', '#22c55e'][Object.keys(historicoPrecios).indexOf(nombreProducto)],
            fill: false,
            lineTension: 0.4,
        })),
    };

    const chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Histórico de Precios de Productos',
            fontColor: '#333',
            fontSize: 16,
        },
        legend: {
            position: 'bottom',
            labels: {
                fontColor: '#333',
            },
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#555',
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#555',
                    callback: function (value) {
                        return '$' + value;
                    },
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            }],
        },
    };

    if (historicoPreciosChart) {
        historicoPreciosChart.destroy();
    }

    historicoPreciosChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions,
    });
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
        return; // No mostrar paginación si solo hay una página
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
    actualizarProductosVendidos();
    actualizarTabla(productosMasVendidos, paginaActual);
    const historicoPreciosData = {
        'Producto A': [
            { fecha: '2023-01-01', precio: 25 },
            { fecha: '2023-01-08', precio: 27 },
            { fecha: '2023-01-15', precio: 30 },
            { fecha: '2023-01-22', precio: 28 },
            { fecha: '2023-01-29', precio: 32 },
            { fecha: '2023-02-05', precio: 35 },
            { fecha: '2023-02-12', precio: 33 },
        ],
        'Producto B': [
            { fecha: '2023-01-01', precio: 15 },
            { fecha: '2023-01-08', precio: 16 },
            { fecha: '2023-01-15', precio: 18 },
            { fecha: '2023-01-22', precio: 17 },
            { fecha: '2023-01-29', precio: 20 },
            { fecha: '2023-02-05', precio: 22 },
            { fecha: '2023-02-12', precio: 21 },
        ],
        'Producto X': [
            { fecha: '2023-01-01', precio: 40 },
            { fecha: '2023-01-08', precio: 42 },
            { fecha: '2023-01-15', precio: 45 },
            { fecha: '2023-01-22', precio: 43 },
            { fecha: '2023-01-29', precio: 47 },
            { fecha: '2023-02-05', precio: 50 },
            { fecha: '2023-02-12', precio: 48 },
        ],
        'Producto Y': [
            { fecha: '2023-01-01', precio: 35 },
            { fecha: '2023-01-08', precio: 37 },
            { fecha: '2023-01-15', precio: 39 },
            { fecha: '2023-01-22', precio: 38 },
            { fecha: '2023-01-29', precio: 41 },
            { fecha: '2023-02-05', precio: 43 },
            { fecha: '2023-02-12', precio: 42 },
        ],
        'Producto Z': [
            { fecha: '2023-01-01', precio: 50 },
            { fecha: '2023-01-08', precio: 52 },
            { fecha: '2023-01-15', precio: 55 },
            { fecha: '2023-01-22', precio: 53 },
            { fecha: '2023-01-29', precio: 57 },
            { fecha: '2023-02-05', precio: 60 },
            { fecha: '2023-02-12', precio: 58 },
        ],
        'Producto W': [
            { fecha: '2023-01-01', precio: 100 },
            { fecha: '2023-01-08', precio: 105 },
            { fecha: '2023-01-15', precio: 110 },
            { fecha: '2023-01-22', precio: 108 },
            { fecha: '2023-01-29', precio: 115 },
            { fecha: '2023-02-05', precio: 120 },
            { fecha: '2023-02-12', precio: 118 },
        ],
    };
    createChart(historicoPreciosData);
    calcularYMostrarValores();
    actualizarPaginacion();
}

// Manejar el cambio en el select de Más/Menos vendidos
masVendidosSelect.addEventListener('change', () => {
    paginaActual = 1;
    tipoOrden = masVendidosSelect.value;
    const productos = tipoOrden === 'masVendidos' ? productosMasVendidos : productosMenosVendidos;
     // Ordenar los productos aquí, antes de actualizar la tabla y las listas
    if (tipoOrden === 'masVendidos') {
        productos.sort((a, b) => b.cantidad - a.cantidad);
    } else {
        productos.sort((a, b) => a.cantidad - b.cantidad);
    }
    actualizarTabla(productos, paginaActual);
    actualizarProductosVendidos();
    actualizarPaginacion();
});



// Llama a la función de inicialización
inicializarPagina();


// Evento para el botón de detalles
detallesButton.addEventListener('click', () => {
    alert('Mostrando detalles...');
});
