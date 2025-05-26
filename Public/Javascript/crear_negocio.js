// Asegúrate de que todo cargue después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    const tipoNegocioSelect = document.getElementById('tipo');
    const capitalInicialDiv = document.getElementById('valorCapital');
    const formulario = document.getElementById('formularioNegocio');

    let tiposNegocioData = []; // Aquí guardaremos los tipos con su saldo

    // Función para cargar tipos de negocio
    function cargarTiposNegocio() {
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
                tiposNegocioData = data; // Guardamos los tipos para usarlos luego
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

    // Mostrar capital inicial cuando se seleccione un tipo
    tipoNegocioSelect.addEventListener('change', () => {
        const tipoSeleccionadoId = tipoNegocioSelect.value;
        const tipo = tiposNegocioData.find(t => t.id === tipoSeleccionadoId);
        if (tipo) {
            capitalInicialDiv.textContent = `${Number(tipo.saldo_inicial).toLocaleString()}`;
        } else {
            capitalInicialDiv.textContent = '';
        }
    });

    // Evento de envío del formulario
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const tipoNegocio = document.getElementById('tipo').value;
        const capitalInicial = tiposNegocioData.find(t => t.id === tipoNegocio)?.saldo_inicial || 0;
        
        fetch('../../Config/crearNegocio.php', {
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
                mostrarMensaje('Negocio creado exitosamente!');
                formulario.reset();
                capitalInicialDiv.textContent = ''; // Limpia el div
            } else if (data.error) {
                console.error('Error al crear negocio:', data.error);
                alert('Error al crear el negocio: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error al crear negocio:', error);
            alert('Ocurrió un error al crear el negocio. Por favor, intenta de nuevo.');
        });
    });

    // Llamar funciones
    cargarTiposNegocio();
    // Nota: debes eliminar o definir cargarCapitales si no la usas
});
