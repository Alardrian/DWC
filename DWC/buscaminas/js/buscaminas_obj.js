class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();
    }

    crearTablero() {
        // Crear array bidimensional para guardar las minas
        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    dibujarTableroHTML() {
        // Creamos el tablero en html
        document.write('<table>');

        for (let i = 0; i < this.filas; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.columnas; j++) {
                document.write(`<td></td>`);
            }

            document.write('</tr>');
        }
        document.write('</table>');
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
    
    modificarFilas(nuevasFilas) {
        // Modificar el número de filas y volver a crear el tablero con las filas nuevas
        this.filas = nuevasFilas;
        this.crearTablero();
    }

    modificarColumnas(nuevasColumnas) {
        // Modificar el número de columnas y volver a crear el tablero con las columnas nuevas
        this.columnas = nuevasColumnas;
        this.crearTablero();
    }
}

class Buscaminas extends Tablero {
    constructor(filas, columnas, numMinas) {
        super(filas, columnas);
        this.numMinas = numMinas;
        this.contadorBanderas = 0;

        this.colocarMinas();
        this.colocarNumMinas();
    }

    colocarMinas() {
        let contadorMinas = 0;
        let posFila;
        let posColumna;


        while (contadorMinas < this.numMinas) {
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);

            if (this.arrayTablero[posFila][posColumna] != 'MINA') {
                this.arrayTablero[posFila][posColumna] = 'MINA';
                contadorMinas++;
            };
        };
    }

    colocarNumMinas() {
        let numMinasAlrededor;

        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                numMinasAlrededor = 0;
                if (this.arrayTablero[fila][columna] != 'MINA') {
                    for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                        if (cFila >= 0 && cFila < this.filas) {
                            for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                                if (cColumna >= 0 && cColumna < this.columnas &&
                                    this.arrayTablero[cFila][cColumna] == 'MINA') {
                                    numMinasAlrededor++;
                                }
                            }
                        }
                        this.arrayTablero[fila][columna] = numMinasAlrededor;
                    }
                }
            }
        }
        console.log(this.arrayTablero);
    }

    dibujarTableroDOM(){
        super.dibujarTableroDOM();


        let celda;
        this.despejar = this.despejar.bind(this);
        this.marcar = this.marcar.bind(this);

        for (let i = 0; i < this.filas; i++) {
            
            for (let j = 0; j < this.columnas; j++) {
               celda = document.getElementById(`f${i}_c${j}`);

                celda.addEventListener("click",this.despejar);
                celda.addEventListener("contextmenu",this.marcar);
                document.oncontextmenu = function(){return false};
            }
            
        }
    }

    despejar(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        this.despejar2(celda);
    }

    despejar2(celda){
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);

        celda.removeEventListener("click",this.despejar);
        celda.removeEventListener("contextmenu",this.marcar);

        celda.dataset.despejado = true;
        celda.style.backgroundColor = "lightgrey";
        
        
        let valorCelda = this.arrayTablero[fila][columna];
        let esNumero = !isNaN(valorCelda) && valorCelda != 0;
        let esBomba = valorCelda === "MINA";
        let estaDespejado;

        let celdaNueva;
        
        if (celda.innerHTML === "🚩"){
            
        }
        if (celda.innerHTML === "" || celda.innerHTML === "❓"){

            if(esNumero){
                celda.innerHTML = valorCelda;
            }
            else if (esBomba){
                celda.innerHTML = valorCelda;

                for (let i = 0; i < this.filas; i++) {
                    for (let j = 0; j < this.columnas; j++) {

                        celda = document.getElementById(`f${i}_c${j}`);
                        celda.removeEventListener("click",this.despejar);
                        celda.removeEventListener("contextmenu",this.marcar);

                        if (celda.innerHTML === "🚩" && this.arrayTablero[i][j] != "MINA"){
                            celda.innerHTML = "";
                            celda.style.backgroundColor = "red";
                        }
                        if(this.arrayTablero[i][j] === "MINA"){
                            celda.innerHTML = this.arrayTablero[i][j];
                        }
                    }
                }
            }
            else if (valorCelda === 0){

                for (let i = fila-1; i <= fila+1; i++) {
                    if ((i >= 0) && (i < this.filas)) {
                        for (let j = columna-1; j <= columna+1; j++) {
                            if((j >= 0) && (j < this.columnas)){
                                celdaNueva = document.getElementById(`f${i}_c${j}`);
                                estaDespejado = (celdaNueva.dataset.despejado == "true");
                                if(!estaDespejado){
                                    celdaNueva.innerHTML = "";
                                    this.despejar2(celdaNueva); 
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    marcar(elEvento){
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;

        if (celda.innerHTML === "🚩"){
            celda.innerHTML = "❓";
            celda.addEventListener("click",this.despejar);
            this.contadorBanderas -= 1;
        }
        else if (celda.innerHTML === "❓"){
            celda.addEventListener("click",this.despejar);
            celda.innerHTML = "";
        }   
        else{
            if(this.contadorBanderas < this.numMinas){
                celda.innerHTML = "🚩";
                celda.removeEventListener("click",this.despejar);
                this.contadorBanderas += 1;

                if (this.contadorBanderas === this.numMinas){
                    this.ganar();
                }
            }
            else {
                alert ("No puedes poner mas banderas que minas hay en el tablero");
            }
        }
    }

    ganar(){
        let minasCorrectas = 0;

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                let celda = document.getElementById(`f${i}_c${j}`);
                if (this.arrayTablero[i][j] === "MINA" && celda.innerHTML == "🚩"){
                    minasCorrectas++;
                }
            }
        }
        if (minasCorrectas === this.numMinas){
            alert("Has ganado!");
        }
    }
}

window.onload = function() {
    let buscaminas1 = new Buscaminas(5,5,5);
    buscaminas1.dibujarTableroDOM();
}