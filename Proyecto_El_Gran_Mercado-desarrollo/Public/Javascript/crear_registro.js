document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recarga

    const formData = new FormData(this);

    fetch('http://localhost/Proyecto_El_Gran_Mercado/Config/procesar_reg.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: data.message,
            }).then(() => {
                // Opcional: Redirigir al login o página principal del juego
                window.location.href = "../Html/crearnegocio.php"; 
            });
            this.reset(); // Limpiar formulario
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor.',
        });
    });
});

