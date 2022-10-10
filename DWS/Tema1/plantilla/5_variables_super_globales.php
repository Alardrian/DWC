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
                    <a href="5_variables_super_globales.php"><li>ejercicio 6 php</li></a>
                </ul>

            </div>
            <div class="segunda_columna">
              
                <div>
                    <?php
                        function obtenerInformacion($variable){
                            $cadena ="[";
                            foreach($variable as $key=>$val){
                                $cadena.=$key."=>".$val.",<br>";
                            }

                            $cadena.="]";
                            return $cadena;
                        }
                    ?>
                </div>

                <?php
                    echo 'Variable $_SERVER'. obtenerInformacion($_SERVER);
                ?>

            </div>
            <div class="tercera_columna">assasas</div>
        </div>
        <div class="tercera_caja">ccc</div>
    <div>
</body>
</html>

