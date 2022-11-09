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

    dibujarTablero() {
        document.write('<table>');

        for (let i = 0; i < this.filas; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.columnas; j++) {
                document.write(`<td>${this.arrayTablero[i][j]}</td>`);
            }

            document.write('</tr>');
        }
        document.write('</table>');
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
let memorin = new juegoMemoria(4,2);
console.log(memorin.arrayTablero);
memorin.dibujarTablero();