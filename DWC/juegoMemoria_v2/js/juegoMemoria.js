class Tablero {
    constructor(filas, columnas) {
        do{
        filas = prompt('¿Cuántas filas quieres?');
        columnas = prompt('¿Cuántas columnas quieres?');
        }
        while (((filas*columnas%2) != 0) && (filas+columnas < 4));

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
                columna.dataset.puntuacion = 10;

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
        this.valorprevio;
        this.valoractual;
        this.contador = 0;
        this.puntuacion = 0;
        this.puntuacionMaxima = ((this.filas * this.columnas) / 2 * 10);

       this.colocarParejas();
    }

    dibujarTableroDOM(){
        super.dibujarTableroDOM();

        let celda;
        this.marcar = this.marcar.bind(this);
        this.reiniciar = this.reiniciar.bind(this);

        document.getElementById("h2").innerHTML = (`${this.puntuacion}/${this.puntuacionMaxima}`);
        const botonReiniciar = document.createElement('button');
        botonReiniciar.type = 'button';
        botonReiniciar.innerText = 'Reiniciar';
        document.body.appendChild(botonReiniciar);

        botonReiniciar.addEventListener("click", this.reiniciar);

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

        if (this.contador === 1){
            celda.innerHTML = this.arrayTablero[cFila][cColumna];
            celda.dataset.despejado = true;
            this.valoractual = [cFila,cColumna]
            this.contador = 0;
            if (this.arrayTablero[this.valoractual[0]][[this.valoractual[1]]] !=
                this.arrayTablero[this.valorprevio[0]][[this.valorprevio[1]]]){
    
            setTimeout(() => {
                this.quitarCartas(celda);
                }, 500);
            }else{
                this.sumarPuntuacion(celda);
            }
        }
        else {
            celda.innerHTML = this.arrayTablero[cFila][cColumna];
            celda.dataset.despejado = true;
            this.valorprevio = [cFila,cColumna];
            this.contador = 1;
            celda.removeEventListener("contextmenu",this.marcar);
        }
    }

    quitarCartas(celda){
        celda.innerHTML = "";
        celda.dataset.despejado = false;
        celda.addEventListener("contextmenu",this.marcar);
        this.comprobarPuntuacion(celda);

        celda = document.getElementById(`f${this.valorprevio[0]}_c${this.valorprevio[1]}`);
        celda.innerHTML = "";
        celda.dataset.despejado = false;
        celda.addEventListener("contextmenu",this.marcar);
        this.comprobarPuntuacion(celda);
    }

    comprobarPuntuacion(celda){
        switch (celda.dataset.puntuacion){
            case "10": celda.dataset.puntuacion = "5";
            break;

            case "5": celda.dataset.puntuacion = "2.5"
            break;

            case "2.5": celda.dataset.puntuacion = "0";
            break;
        }
    }
    sumarPuntuacion(celda){

        let puntuacion1 = parseFloat(celda.dataset.puntuacion);

        celda = document.getElementById(`f${this.valorprevio[0]}_c${this.valorprevio[1]}`);
        let puntuacion2 = parseFloat(celda.dataset.puntuacion);

        if (puntuacion1 < puntuacion2){
            this.puntuacion += puntuacion1;
        }
        else{
            this.puntuacion += puntuacion2;
        }
        document.getElementById("h2").innerHTML = (`${this.puntuacion}/${this.puntuacionMaxima}`);
    }

    reiniciar(){

        if (confirm("¿Seguro que quieres reiniciar? Se creará una partida nueva")) {
            let celda;
            this.valorprevio = null;
            this.valoractual = null;
            this.puntuacion = 0;
            this.contador = 0;
            document.getElementById("h2").innerHTML = (`${this.puntuacion}/${this.puntuacionMaxima}`);

            for (let i = 0; i < this.filas; i++) {
                for (let j = 0; j < this.columnas; j++) {
                    celda = document.getElementById(`f${i}_c${j}`);
                    celda.addEventListener("contextmenu",this.marcar);
                    celda.innerHTML = "";
                    celda.dataset.despejado = false;
                    celda.dataset.puntuacion = 10;
                    this.arrayTablero[i][j] = '';
                }
            }
            this.colocarParejas();
        }
    }

    colocarParejas(){

        let parejas = ["🐟","🥶","👹","🖕","👽","😺","💣","🤢","💥","🌴"];
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