<?php

    class calculadora{

        function factorial($x){
            if ($x == 0){
                return 1;
            }
            else if ($x > 0){
                $result = 1;
                while ($x > 0){
                    $result = $result * $x;
                    $x = $x - 1;
                }
                return $result;
            }
        }

        function coeficienteBinomial($n, $k){
           $resultado = ($this->factorial($n) / ($this->factorial($k) * $this->factorial($n - $k)));
           return $resultado;
        }

        function convierteBinarioDecimal($cadenaBits){
            
        }
    }