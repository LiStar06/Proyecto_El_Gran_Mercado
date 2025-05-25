async function obtenerNegocioYProductos() {
    try {
        const res = await fetch('../../Config/mostrar_prod.php');
        const data = await res.json();

        if (data.success) {
            // console.log("Negocio activo:", data.nombre_negocio);
            cargarProductosDesdeRespuesta(data.productos);
        } else {
            alert("No se pudo obtener el negocio activo: " + data.message);
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}
let id_producto;
function cargarProductosDesdeRespuesta(productos) {
    const select = document.getElementById("productoSelect");
    select.innerHTML = '<option value="">Selecciona un producto</option>';

    productos.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.nombre;
        option.dataset.precio = p.precio;
        select.appendChild(option);
    });

    select.addEventListener('change', () => {
        const selected = select.selectedOptions[0];
        const precio = selected?.dataset.precio || '';

        const precioActualInput = document.getElementById("precioActual");
        const nuevoPrecioInput = document.getElementById("precioUnitario");

        if (precioActualInput) precioActualInput.value = precio;
        if (nuevoPrecioInput) nuevoPrecioInput.value = precio;

        const cantidadInput = document.getElementById("cantidadCompra");
        const montoInput = document.getElementById("montoCompra");

        if (cantidadInput) cantidadInput.value = 0;
        if (montoInput) montoInput.value = 0;
    });

    const cantidadInput = document.getElementById("cantidadCompra");
    const precioUnitarioInput = document.getElementById("precioUnitario");
    const montoInput = document.getElementById("montoCompra");

    if (cantidadInput && precioUnitarioInput && montoInput) {
        cantidadInput.addEventListener("input", () => {
            const cantidad = parseInt(cantidadInput.value) || 0;
            const precio = parseFloat(precioUnitarioInput.value) || 0;
            montoInput.value = (cantidad * precio).toFixed(2);
        });
    }
}


obtenerNegocioYProductos();

