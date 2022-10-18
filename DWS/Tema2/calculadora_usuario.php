<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora usuario</title>
</head>
<body>

    <?php

        require 'calculadora.php';
        $calc = new calculadora();

        echo $calc->factorial(5);
        echo '<br>';
        echo $calc->coeficienteBinomial(5,2);
    ?>
    
</body>
</html>