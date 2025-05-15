async function obtenerNegocioYProductos() {
    try {
        const res = await fetch('../../Config/mostrar_prod.php');
        const data = await res.json();

        if (data.success) {
            console.log("Negocio activo:", data.nombre_negocio);
            cargarProductosDesdeRespuesta(data.productos);
        } else {
            alert("No se pudo obtener el negocio activo: " + data.message);
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

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
        document.getElementById("precioUnitario").value = selected.dataset.precio || '';
        document.getElementById("cantidadCompra").value = 0;
        document.getElementById("montoCompra").value = 0;
    });

    document.getElementById("cantidadCompra").addEventListener("input", () => {
        const cantidad = parseInt(document.getElementById("cantidadCompra").value) || 0;
        const precio = parseFloat(document.getElementById("precioUnitario").value) || 0;
        document.getElementById("montoCompra").value = (cantidad * precio).toFixed(2);
    });
}

obtenerNegocioYProductos();

