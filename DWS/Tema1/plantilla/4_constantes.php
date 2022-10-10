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
                    <a href="3_arrays_bucles.php"><li>ejercicio 4 php</li></a>
                    <a href="4_constantes.php"><li>ejercicio 5 php</li></a>
                </ul>

            </div>
            <div class="segunda_columna">
              
                <?php
                    define ("MAX_VALUE",10);

                    echo "el valor de la constante MAX_VALUE es: ". MAX_VALUE."<br>";

                    const MIN_VALUE = 1;

                    echo "el valor de la constante MIN_VALUE es: ". MIN_VALUE. "<br>";
                    
                ?>

            </div>
            <div class="tercera_columna">assasas</div>
        </div>
        <div class="tercera_caja">ccc</div>
    <div>
</body>
</html>
