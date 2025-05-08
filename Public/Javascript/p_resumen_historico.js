const productosContainer = document.getElementById('productos-container');
const detallesProductoContainer = document.getElementById('detalles-producto');


const productos = [
    {
        id: 1,
        nombre: 'Producto A',
        descripcion: 'Descripción del Producto A. Este producto es increíble.',
        precio: 25,
        disponible: true,
        imagen: 'https://placehold.co/400x300/EEE/31343C?text=Producto+A&font=Montserrat',
    },
    {
        id: 2,
        nombre: 'Producto B',
        descripcion: 'Descripción del Producto B. ¡No te lo pierdas!',
        precio: 18,
        disponible: true,
        imagen: 'https://placehold.co/400x300/EEE/31343C?text=Producto+B&font=Montserrat',
    },
    {
        id: 3,
        nombre: 'Producto C',
        descripcion: 'Descripción del Producto C. El mejor de su clase.',
        precio: 30,
        disponible: false,
        imagen: 'https://placehold.co/400x300/EEE/31343C?text=Producto+C&font=Montserrat',
    },
    {
        id: 4,
        nombre: 'Producto D',
        descripcion: 'Descripción del Producto D. Para los amantes de la calidad.',
        precio: 15,
        disponible: true,
        imagen: 'https://placehold.co/400x300/EEE/31343C?text=Producto+D&font=Montserrat',
    },
    {
        id: 5,
        nombre: 'Producto E',
        descripcion: 'Descripción del Producto E. El más vendido.',
        precio: 40,
        disponible: true,
        imagen: 'https://placehold.co/400x300/EEE/31343C?text=Producto+E&font=Montserrat',
    },
    {
        id: 6,
        nombre: 'Producto F',
        descripcion: 'Descripción del Producto F. Innovación y diseño.',
        precio: 22,
        disponible: false,
        imagen: 'https://placehold.co/400x300/EEE/31343C?text=Producto+F&font=Montserrat',
    },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function formatMoney(amount) {
    return amount.toLocaleString('es-DO', {
        style: 'currency',
        currency: 'DOP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

function mostrarProductos() {
    productosContainer.innerHTML = '';
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        productoCard.dataset.productoId = producto.id;

        const imagenProducto = document.createElement('img');
        imagenProducto.className = 'producto-imagen';
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;

        const tituloProducto = document.createElement('h3');
        tituloProducto.className = 'producto-titulo';
        tituloProducto.textContent = producto.nombre;

        const descripcionProducto = document.createElement('p');
        descripcionProducto.className = 'producto-descripcion';
        descripcionProducto.textContent = producto.descripcion;

        const precioProducto = document.createElement('p');
        precioProducto.className = 'producto-precio';
        precioProducto.textContent = formatMoney(producto.precio);

        const disponibilidadProducto = document.createElement('p');
        disponibilidadProducto.className = producto.disponible
            ? 'producto-disponible'
            : 'producto-agotado';
        disponibilidadProducto.textContent = producto.disponible
            ? 'Disponible'
            : 'Agotado';

        const botonAgregarCarrito = document.createElement('button');
        botonAgregarCarrito.className = 'btn-agregar-carrito';
        botonAgregarCarrito.textContent = 'Agregar al Carrito';
        botonAgregarCarrito.disabled = !producto.disponible;
        botonAgregarCarrito.addEventListener('click', () => agregarAlCarrito(producto.id));

        productoCard.appendChild(imagenProducto);
        productoCard.appendChild(tituloProducto);
        productoCard.appendChild(descripcionProducto);
        productoCard.appendChild(precioProducto);
        productoCard.appendChild(disponibilidadProducto);
        productoCard.appendChild(botonAgregarCarrito);

        productoCard.addEventListener('click', () => mostrarDetallesProducto(producto.id));
        productosContainer.appendChild(productoCard);
    });
}

function mostrarDetallesProducto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        detallesProductoContainer.innerHTML = `
            <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-1/2">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="rounded-md w-full">
                </div>
                <div class="md:w-1/2">
                    <h3 class="text-3xl font-bold text-gray-800 mb-4">${producto.nombre}</h3>
                    <p class="text-gray-600 text-lg mb-4">${producto.descripcion}</p>
                    <p class="text-2xl font-semibold text-green-600 mb-4">Precio: ${formatMoney(producto.precio)}</p>
                    <p class="${producto.disponible ? 'text-green-500' : 'text-red-500'} font-medium mb-4">
                        Disponibilidad: ${producto.disponible ? 'Disponible' : 'Agotado'}
                    </p>
                    <button class="btn-agregar-carrito" onclick="agregarAlCarrito(${producto.id})" ${producto.disponible ? '' : 'disabled'}>
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
        detallesProductoContainer.classList.add('show');
        // Hacer scroll hasta la sección de detalles
        detallesProductoContainer.scrollIntoView({ behavior: 'smooth' });
    }
}


function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (producto && producto.disponible) {
        const existeEnCarrito = carrito.find(item => item.id === productoId);
        if (existeEnCarrito) {
            existeEnCarrito.cantidad += 1;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1,
                imagen: producto.imagen
            });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${producto.nombre} ha sido añadido al carrito.`);
        // Actualizar la vista del carrito si el usuario está en la página del carrito
        if (window.location.pathname.includes("carrito.html")) {
            mostrarCarrito();
        }
    } else {
        alert('Producto no disponible.');
    }
}

// ---------------------------------------------------------------------
// Sección de Historial de Precios (p_historial_precios.html)
// ---------------------------------------------------------------------

const historicoPreciosCanvas = document.getElementById('historicoPreciosChart');
const ctx = historicoPreciosCanvas.getContext('2d');
const productoSelect = document.getElementById('productoSelect');

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
    'Producto C': [
        { fecha: '2023-01-01', precio: 30 },
        { fecha: '2023-01-08', precio: 32 },
        { fecha: '2023-01-15', precio: 34 },
        { fecha: '2023-01-22', precio: 33 },
        { fecha: '2023-01-29', precio: 36 },
        { fecha: '2023-02-05', precio: 38 },
        { fecha: '2023-02-12', precio: 37 },
    ],
    'Producto D': [
        { fecha: '2023-01-01', precio: 15 },
        { fecha: '2023-01-08', precio: 17 },
        { fecha: '2023-01-15', precio: 16 },
        { fecha: '2023-01-22', precio: 18 },
        { fecha: '2023-01-29', precio: 20 },
        { fecha: '2023-02-05', precio: 19 },
        { fecha: '2023-02-12', precio: 21 },
    ],
    'Producto E': [
        { fecha: '2023-01-01', precio: 40 },
        { fecha: '2023-01-08', precio: 41 },
        { fecha: '2023-01-15', precio: 43 },
        { fecha: '2023-01-22', precio: 42 },
        { fecha: '2023-01-29', precio: 45 },
        { fecha: '2023-02-05', precio: 47 },
        { fecha: '2023-02-12', precio: 46 },
    ],
    'Producto F': [
        { fecha: '2023-01-01', precio: 22 },
        { fecha: '2023-01-08', precio: 24 },
        { fecha: '2023-01-15', precio: 23 },
        { fecha: '2023-01-22', precio: 25 },
        { fecha: '2023-01-29', precio: 27 },
        { fecha: '2023-02-05', precio: 26 },
        { fecha: '2023-02-12', precio: 28 },
    ],
};

let historicoPreciosChart;

function createChart(data, title) {
    const chartData = {
        labels: data[Object.keys(data)[0]].map(item => item.fecha),
        datasets: Object.keys(data).map(nombreProducto => ({
            label: nombreProducto,
            data: data[nombreProducto].map(item => item.precio),
            borderColor: ['#ff6f61', '#8884d8', '#3b82f6', '#22c55e', '#f97316', '#ec4899'][Object.keys(data).indexOf(nombreProducto)],
            backgroundColor: 'transparent',
            fill: false,
            lineTension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: ['#ff6f61', '#8884d8', '#3b82f6', '#22c55e', '#f97316', '#ec4899'][Object.keys(data).indexOf(nombreProducto)],
        })),
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                },
                color: '#333',
                padding: {
                    bottom: 10
                }
            },
            legend: {
                position: 'bottom',
                labels: {
                    fontColor: '#555',
                    usePointStyle: true,
                    padding: 20,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#ddd',
                borderWidth: 1,
                displayColors: true,
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
        },
        hover: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Fecha',
                    font: {
                        size: 14,
                    },
                    color: '#555',
                    padding: 10
                },
                ticks: {
                    fontColor: '#666',
                    padding: 5,
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Precio',
                    font: {
                        size: 14,
                    },
                    color: '#555',
                    padding: 10
                },
                ticks: {
                    fontColor: '#666',
                    padding: 5,
                    callback: function (value) {
                        return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(value);
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1
                },
            },
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

function populateProductoSelect() {
    for (const producto in historicoPreciosData) {
        const option = document.createElement('option');
        option.value = producto;
        option.textContent = producto;
        productoSelect.appendChild(option);
    }
}

function handleProductoSelectChange() {
    const selectedProducto = productoSelect.value;
    if (selectedProducto) {
        const data = { [selectedProducto]: historicoPreciosData[selectedProducto] };
        createChart(data, `Histórico de Precios de ${selectedProducto}`);
    } else {
        createChart(historicoPreciosData, 'Histórico de Precios de Todos los Productos');
    }
}

// ---------------------------------------------------------------------
// Inicialización
// ---------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(); // Inicializar la sección de productos
    populateProductoSelect(); // Inicializar el selector de productos del historial de precios
    createChart(historicoPreciosData, 'Histórico de Precios de Todos los Productos'); // Inicializar el gráfico del historial de precios
    productoSelect.addEventListener('change', handleProductoSelectChange); // Evento para el selector de productos
});