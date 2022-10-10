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

                </ul>

            </div>
            <div class="segunda_columna">

            <?php
                $personas = ["Carlos", "Oscar", "Jose"];
            ?>

            <ul>
                <?php

                    foreach ($personas as $persona){
                        echo "<li>$persona</li>";
                    }
              

                    for($i = 1; $i <= 10; $i++){
                        echo $i;
                    }

                    $i = 1;
                    while ($i <=10){
                        echo $i++;
                    }
                ?>
            </ul>
              
            </div>
            <div class="tercera_columna">assasas</div>
        </div>
        <div class="tercera_caja">ccc</div>
    <div>
</body>
</html>

