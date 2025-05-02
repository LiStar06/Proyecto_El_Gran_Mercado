// Asegúrate de que todo cargue después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    const tipoNegocioSelect = document.getElementById('tipoNegocio');
    const capitalInicialSelect = document.getElementById('capitalInicial');
    const formulario = document.getElementById('crear-negocio-form');

    // Función para cargar tipos de negocio
    function cargarTiposNegocio() {
        // Limpiar opciones previas y añadir opción de carga
        tipoNegocioSelect.innerHTML = '<option value="" disabled selected>Cargando tipos...</option>';
        tipoNegocioSelect.disabled = true;

        fetch('../../Config/obtenerTipos.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar tipos de negocio');
                }
                return response.json();
            })
            .then(data => {
                tipoNegocioSelect.innerHTML = '<option value="" disabled selected>Selecciona un tipo de negocio</option>';
                tipoNegocioSelect.disabled = false;

                if (data.length === 0) {
                    const option = document.createElement('option');
                    option.textContent = 'No hay tipos de negocio disponibles';
                    tipoNegocioSelect.appendChild(option);
                    tipoNegocioSelect.disabled = true;
                } else {
                    data.forEach(tipo => {
                        const option = document.createElement('option');
                        option.value = tipo.id;
                        option.textContent = tipo.nombre;
                        tipoNegocioSelect.appendChild(option);
                    });
                }
            })
            .catch(error => {
                console.error('Error en tipos de negocio:', error);
                tipoNegocioSelect.innerHTML = '<option value="" disabled selected>Error al cargar tipos</option>';
            });
    }

    // Función para cargar capitales iniciales
    function cargarCapitales() {
        // Limpiar opciones previas y añadir opción de carga
        capitalInicialSelect.innerHTML = '<option value="" disabled selected>Cargando capitales...</option>';
        capitalInicialSelect.disabled = true;

        fetch('../../Config/obtenerCapitales.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar capitales');
                }
                return response.json();
            })
            .then(data => {
                capitalInicialSelect.innerHTML = '<option value="" disabled selected>Selecciona un capital inicial</option>';
                capitalInicialSelect.disabled = false;

                if (data.length === 0) {
                    const option = document.createElement('option');
                    option.textContent = 'No hay capitales iniciales disponibles';
                    capitalInicialSelect.appendChild(option);
                    capitalInicialSelect.disabled = true;
                } else {
                    data.forEach(capital => {
                        const option = document.createElement('option');
                        option.value = capital.id;
                        option.textContent = '$' + capital.monto;
                        capitalInicialSelect.appendChild(option);
                    });
                }
            })
            .catch(error => {
                console.error('Error en capitales:', error);
                capitalInicialSelect.innerHTML = '<option value="" disabled selected>Error al cargar capitales</option>';
            });
    }

    // Evento de envío del formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const tipoNegocio = document.getElementById('tipoNegocio').value;
        const capitalInicial = document.getElementById('capitalInicial').value;

        fetch('../Config/crearNegocio.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, tipoNegocio, capitalInicial })
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje) {
                console.log('Negocio creado:', data.mensaje);
                alert('Negocio creado exitosamente!'); // Muestra una alerta de éxito
                formulario.reset(); // Limpia el formulario
                // Aquí podrías redirigir a otra página si es necesario
            } else if (data.error) {
                console.error('Error al crear negocio:', data.error);
                alert('Error al crear el negocio: ' + data.error); // Muestra una alerta de error
            }
            // Puedes añadir lógica adicional aquí según la respuesta del servidor
        })
        .catch(error => {
            console.error('Error al crear negocio:', error);
            alert('Ocurrió un error al crear el negocio. Por favor, intenta de nuevo.'); // Muestra una alerta de error genérico
        });
    });

    // Llamar las funciones para llenar los select
    cargarTiposNegocio();
    cargarCapitales();

});