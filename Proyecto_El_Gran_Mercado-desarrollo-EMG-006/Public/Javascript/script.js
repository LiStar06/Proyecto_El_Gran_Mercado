// Número máximo de ofertas permitidas
let intentos = 5;

// Función para generar un descuento aleatorio entre 10% y 35%
function generarDescuento() {
    return Math.floor(Math.random() * (35 - 10 + 1)) + 10;
}

// Función para aplicar DOS ofertas dentro de Caja_de_eventos
function aplicarOfertas() {
    if (intentos > 0) {
        const precioBase1 = 200; // Precio del primer producto
        const precioBase2 = 300; // Precio del segundo producto
        const precioBase3 = 400;
        // Generar dos descuentos aleatorios
        const descuento1 = generarDescuento();
        const descuento2 = generarDescuento();
        const descuento3 = generarDescuento();
        

        // Calcular los precios finales con el descuento aplicado
        const precioFinal1 = precioBase1 - (precioBase1 * (descuento1 / 100));
        const precioFinal2 = precioBase2 - (precioBase2 * (descuento2 / 100));
        const precioFinal3 = precioBase3 - (precioBase3 * (descuento2 / 100));


        // Seleccionar el contenedor de eventos y actualizar su contenido con dos ofertas
        const cajaEventos = document.getElementById("Caja_de_eventos");
        cajaEventos.innerHTML = `
            <h2 style="color: white;"> Ofertas Especiales </h2>
            <div style="color: orange; font-size: 16px;">
                <p>Precio sin descuento ${precioBase1} - Descuento: ${descuento1}%</p>
                <p style="color: lightgray;">Precio Final: $${precioFinal1.toFixed(2)}</p>
             
                <br>
             
                </div>
            <hr style="border: 1px solid white; width: 80%;">
            <div style="color: orange; font-size: 16px;">
                <p>Precio sin descuento ${precioBase2}- Descuento: ${descuento2}%</p>
                <p style="color: lightgray;">Precio Final: $${precioFinal2.toFixed(2)}</p>
                <br>
                </div>
           
           
            </div>
            <hr style="border: 1px solid white; width: 80%;">
            <div style="color: orange; font-size: 16px;">
                <p>Precio sin descuento ${precioBase3} - Descuento: ${descuento3}%</p>
                <p style="color: lightgray;">Precio Final: $${precioFinal3.toFixed(2)}</p>
            <br>
                
                
                </div>
               
        `;

        
        
       
           
        
    }
}

function actualizarPrecios() {
    fetch('p_eventos.php')
        .then(response => response.json())
        .then(data => {
            data.forEach((evento, index) => {
                document.querySelectorAll(".contenido")[index].textContent = 
                    `${evento.nombre}: $${evento.precio.toFixed(2)}`;
            });
        })
        .catch(error => console.error("Error al obtener los precios:", error));
}

// Llamar a la función al cargar la página
actualizarPrecios();

// O actualizar cada 10 segundos automáticamente
setInterval(actualizarPrecios, 10000);


// Aplicar dos ofertas iniciales al cargar la página
aplicarOfertas();
