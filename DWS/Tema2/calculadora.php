<?php

class calculadora
{

    public function factorial($x)
    {
        if ($x == 0) {
            return 1;
        } else if ($x > 0) {
            $result = 1;
            while ($x > 0) {
                $result = $result * $x;
                $x = $x - 1;
            }
            return $result;
        }
    }

    public function coeficienteBinomial($n, $k)
    {
        $resultado = ($this->factorial($n) / ($this->factorial($k) * $this->factorial($n - $k)));
        return $resultado;
    }

    public function convierteBinarioDecimal($cadenaBits)
    {
        $cadenaRevertida = strrev($cadenaBits);
        $resultado = 0;
        for ($i = 0; $i < strlen($cadenaBits); $i++) {
            if ($cadenaRevertida[$i] != 0) {
                $resultado = $resultado + (2 ** $i);
            }
        }
        return $resultado;
    }

    public function sumaNumerosPares($array){
        $resultado = 0;
        for ($i = 0; $i < count($array); $i ++){

            if ($array[$i] % 2 == 0){
                $resultado = $resultado + $array[$i];
            }  
        }
        return $resultado;
    }

    public function esCapicua($cadena){
        $isCapicua = true;
        if ($cadena != strrev($cadena)){
            return 0;
        }
        return $isCapicua;
    }
}
