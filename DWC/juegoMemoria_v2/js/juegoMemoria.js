class Tablero {
    constructor(filas, columnas) {
        do{
        filas = prompt('¿Cuántas filas quieres?');
        columnas = prompt('¿Cuántas columnas quieres?');
        }
        while (filas*columnas%2 != 0)

        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();
    }

    crearTablero() {
        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    dibujarTableroDOM(){
        // Creamos el tablero en DOM
        let tabla = document.createElement('table');
        let fila;
        let columna;

        for (let i = 0; i < this.filas; i++) {
            fila = document.createElement('tr');
            tabla.appendChild(fila);


            for (let j = 0; j < this.columnas; j++) {
                columna = document.createElement('td');
                fila.appendChild(columna);

                columna.id= `f${i}_c${j}`;
                columna.dataset.fila = i;
                columna.dataset.columna = j;
                columna.dataset.despejado = false;

                document.oncontextmenu = function(){return false};
            }
        }
        document.body.appendChild(tabla);
    }
    modificarFilas(nuevasFilas){
        this.filas = nuevasFilas;

        this.crearTablero();
    }

    modificarColumnas(nuevasColumnas) {
        this.columnas = nuevasColumnas;

        this.crearTablero();
    }

}
class juegoMemoria extends Tablero {
    constructor(filas, columnas){
        super(filas,columnas);

       this.colocarParejas();
    }

    dibujarTableroDOM(){
        super.dibujarTableroDOM();

        let celda;
        this.marcar = this.marcar.bind(this);

        for (let i = 0; i < this.filas; i++) {
            
            for (let j = 0; j < this.columnas; j++) {
               celda = document.getElementById(`f${i}_c${j}`);

                celda.addEventListener("contextmenu",this.marcar);
                document.oncontextmenu = function(){return false};
            }
            
        }
    }

    marcar(elEvento){
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        let cFila = celda.dataset.fila;
        let cColumna = celda.dataset.columna;

        celda.innerHTML = this.arrayTablero[cFila][cColumna];
    }


    colocarParejas(){
        //let parejas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
        /* var imgArray = new Array();
        imgArray[0] = new Image();
        imgArray[0].src = '/imgs/1.jpg';
        document.getElementById("mainImage").src = imgArray[0].src;
        */
       //let imagen1 = new Image;
       //imagen1.src = 'DWC\juegoMemoria\imgs\1.jpg';

       
        let parejas = ["☻","☺","♥","♦","♣","◄","☼","♫","◘","§"];
        let casillasOcupadas = 0;
        let numParejas = 0;
        let repetidos = 0;

        do {
            let fila = Math.floor(Math.random() * this.filas);
            let columna = Math.floor(Math.random() * this.columnas);

            while (numParejas < 2 && this.arrayTablero[fila][columna] == '') {

                this.arrayTablero[fila][columna] = parejas[repetidos];
                casillasOcupadas += 1;
                numParejas += 1;
            }
            if (numParejas > 1){
                numParejas -= numParejas;
                repetidos += 1;

                if (repetidos == parejas.length){
                    repetidos -= repetidos;
                }
            }
        }
        while (casillasOcupadas != (this.filas*this.columnas)) 
    }

 }
 window.onload = function() {
    let memorin1 = new juegoMemoria();
    memorin1.dibujarTableroDOM();
}