<html>
<head>
    <title>Esto es el titulo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="contenedor">
        <div class="primera_caja">
        </div>
        <div class="segunda_caja">

            <div class="primera_columna">
                <ul>
                    <a href="0_hola_mundo.php"><li>ejercicio 1 php</li></a>
                    <a href="1_hola_mundo.php"><li>ejercicio 2 php</li></a>
                    <a href="2_variables_y_tipos.php"><li>ejercicio 3 php</li></a> 
                </ul>
            </div>
            <div class="segunda_columna">
              <p>
                <?php
                    $numero_entero = 5;
                    $numero_flotante = 6.5;
                    $cadena = "Hi";

                    echo gettype($numero_entero). " ".$numero_entero . "<br>";
                    echo gettype($numero_flotante). " ".$numero_flotante . "<br>";
                    echo gettype($cadena). " ".$cadena . "<br>";

                ?>
              </p>
            </div>
            <div class="tercera_columna">assasas</div>
        </div>
        <div class="tercera_caja">ccc</div>
    <div>
</body>
</html>
