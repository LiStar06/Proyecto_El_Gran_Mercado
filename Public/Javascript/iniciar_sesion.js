document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const email = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    // Validación básica del cliente
    if (email === "" || password === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }

    const formData = new FormData(this);

    fetch('../../Config/procesar_login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: data.message,
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
            // Redirigir al dashboard u otra página después del login
            window.location.href = '../Html/partida.php'; // Aquí puedes poner la página a la que debe ir el usuario
            });
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
