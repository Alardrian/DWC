<?php
    class cuadrado{
        public $suma1Fila;
        public $filasDistintas = [];
        public $columnasDistintas = [];
        public $diagonal1;
        public $diagonal2;

        function analizarCuadradoMagico($array){
            $this->suma1Fila = $this->sumaPrimeraFila($array);
        }

        function sumaPrimeraFila($array){
           $resultado = array_sum($array[0]);
           return $resultado;
        }
        function sumarFilas($array){
            $resultado = [];
            for ($i=0; $i < count($array); $i++) { 
                $resultado[$i] = array_sum($array[$i]);
            }
            return $resultado;
        }

        function compararFilas($array){
            $filasDistintas = [];
            for ($i=0; $i < count($array); $i++) { 
                
            }
            return $resultado;
        }

        function sumarColumnas($array){
            $resultado = [];
            for ($i=0; $i < count($array); $i++) { 
                for ($j=0; $j < count($array[$i]); $j++) { 
                    $resultado[$i] += $array[$j][$i];
                }
            }
            return $resultado;
        }

        function sumarDiagonal1($array){
            $resultado = 0;
            $indiceColumna = count($array)-1;
            for ($i=0; $i < count($array) ; $i++) { 
                $resultado += $array[$indiceColumna-$i][$i];
            }
            return $resultado;
        }

        function sumarDiagonal2($array){
            $resultado = 0;
            for ($i=0; $i < count($array) ; $i++) { 
                $resultado += $array[$i][$i];
            }
            return $resultado;

        }
        function pintarCuadradoMagico($array){
            
            echo '<table>';
                for ($i=0; $i < count($array) ; $i++) { 
                    echo '<tr>';
                    for ($j=0; $j < count($array) ; $j++) { 
                        echo '<td>'.$array[$i][$j];
                        echo '</td>';
                    }
                    echo '</tr>';
                }
            echo'</table>';
        }
    }
