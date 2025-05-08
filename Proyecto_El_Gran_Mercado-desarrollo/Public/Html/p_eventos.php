
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Gran Mercado</title>
    <link rel="shortcut icon" href="../Imagenes/logo.png">
    <style>
       
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-image: url("../Imagenes/fondo.png");
            margin: 0;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .container {
            background: linear-gradient(to right, rgb(6, 6, 49), blue);
            padding: 30px;
            border-radius: 25px;
            width: 80%;
            height: 80%;
            max-width: 500px;
        }
        #Caja_de_eventos{
            background: linear-gradient(to right, rgb(5, 11, 48), blue);
            height: 55%;
            border-radius: 25px;
        }
        .logo {
            width: 75px;
            margin-bottom: 10px;
        }
        h1 {
            color: orange;
            font-size: 28px;
        }
        .menu-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: linear-gradient(to right, #7b1fa2, #ff9800); 
            color: black;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
        }
        .menu-button:hover {
            transform: scale(1.05);
            background: linear-gradient(to right, #bb1717, #2010b1);
            
        }
        #oferta1 {
           
            position:absolute;
            top: 350px;
            margin-top: 10px;
            padding: 5px 10px;
            background: linear-gradient(to right, #7b1fa2, #ff9800); 
            color: black;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
        }    
        #oferta1:hover {
            transform: scale(1.05);
            background: linear-gradient(to right, #bb1717, #2010b1);
            
        }
        #oferta2 {
           
           position:absolute;
           top: 460px;
           margin-top: 10px;
           padding: 5px 10px;
           background: linear-gradient(to right, #7b1fa2, #ff9800); 
           color: black;
           text-decoration: none;
           border-radius: 10px;
           font-weight: bold;
       }    
       #oferta2:hover {
           transform: scale(1.05);
           background: linear-gradient(to right, #bb1717, #2010b1);
           
       }
       #oferta3 {
           
           position:absolute;
           top: 580px;
           margin-top: 10px;
           padding: 5px 10px;
           background: linear-gradient(to right, #7b1fa2, #ff9800); 
           color: black;
           text-decoration: none;
           border-radius: 10px;
           font-weight: bold;
       }    
       #oferta3:hover {
           transform: scale(1.05);
           background: linear-gradient(to right, #bb1717, #2010b1);
           
       }

       .slider {
           
           background: linear-gradient(to right, rgb(5, 11, 48), blue);
           height: 55%;
           border-radius: 25px;
       }

       .punto {
            width: 20px;
            height: 10px;
            background: gray;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
        }

       #flecha {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 100px;
            cursor: pointer;
            color: black;
        }

        #flecha.izquierda { left: 10px; }
        #flecha.derecha { right: 10px; }
        
        

    </style>
</head>
<body>

    <main class="container">
    
        <img src="../Imagenes/logo.png" alt="Logo" class="logo">
        
        
        <h1>Eventos del Mercado</h1>
        
        <div id="Caja_de_eventos">
        
        </div>
       
        <a href="EGM-002.php" class="menu-button">Menú Principal</a>
    </main>

        <button id="oferta3">Aceptar esta oferta</button>
       
        <button id="oferta2">Aceptar esta oferta</button>
        
        <button id="oferta1">Aceptar esta oferta</button>
       
       
        

       

<script src="../Javascript/eventos.js"></script>
</body>
</html>
