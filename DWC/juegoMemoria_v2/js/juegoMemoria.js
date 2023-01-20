class Tablero {
    constructor(filas, columnas) {
        do{
        filas = prompt('¿Cuántas filas quieres?');
        columnas = prompt('¿Cuántas columnas quieres?');
        }
        while (filas*columnas%2 != 0 || (filas*columnas)/2 < 2);

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
        this.parejasCorrectas = 0;

        this.tiempoInicio;
        this.tiempoFinal;
        this.tiempoTranscurrido;

        this.colocarParejas();
    }

    dibujarTableroDOM(){
        super.dibujarTableroDOM();

        let celda;
        this.marcar = this.marcar.bind(this);
        this.reiniciar = this.reiniciar.bind(this);

        document.getElementById("h2").innerHTML = (`${this.puntuacion}/${this.puntuacionMaxima}`);
        //Creamos el boton de reiniciar y le damos un evento.
        const botonReiniciar = document.createElement('button');
        botonReiniciar.type = 'button';
        botonReiniciar.innerText = 'Reiniciar';
        document.body.appendChild(botonReiniciar);

        botonReiniciar.addEventListener("click", this.reiniciar);

        for (let i = 0; i < this.filas; i++) {
            
            for (let j = 0; j < this.columnas; j++) {
               celda = document.getElementById(`f${i}_c${j}`);
                //A cada celda del array le ponemos su propio evento marcar
                celda.addEventListener("contextmenu",this.marcar);
                document.oncontextmenu = function(){return false};
            }
        }  
        this.timerInicial();
    }

    marcar(elEvento){

        let evento = elEvento || window.event;
        let celda = evento.currentTarget;

        let cFila = celda.dataset.fila;
        let cColumna = celda.dataset.columna;

        if (this.contador === 1){
            //Aqui se mete si ya hay una casilla clicada, osea que esta segunda es la 2 que compararemos
            //desvelamos la casilla, ponemos valor a la variable valoractual con la posicion de esta casilla
            celda.innerHTML = this.arrayTablero[cFila][cColumna];
            this.valoractual = [cFila,cColumna]
            this.contador = 0;
            //Este if comprueba si las 2 casillas son de la misma pareja, con los valores que hemos guardado previamente
            if (this.arrayTablero[this.valoractual[0]][[this.valoractual[1]]] !=
                this.arrayTablero[this.valorprevio[0]][[this.valorprevio[1]]]){
            //Si no son iguales espera 0.5seg y utiliza el metodo de quitar cartas.
            setTimeout(() => {
                this.quitarCartas(celda);
                }, 500);
            }else{
            //Si son iguales sumamos 1 pareja correcta y suma la puntuacion con el metodo sumar puntuacion
                this.sumarPuntuacion(celda);
                this.parejasCorrectas++;
            //Este comprueba si hemos llegado al limite maximo de parejas correctas y si es así nos lleva al metodo
            //de ganar y al de timer, que nos da un valor que utilizamos para el metodo ganar también.
                if(this.parejasCorrectas == this.filas*this.columnas/2){
                    this.timerFinal();
                    this.ganar();
                };
            }
        }
        else {
            //Aquí se metera si es la primera que compararemos( el primer click de cada pareja )
            //Lo desvela y le quita el event listener y damos valor a la variable valorprevio con la 
            //posicion de esta casilla.
            celda.innerHTML = this.arrayTablero[cFila][cColumna];
            this.valorprevio = [cFila,cColumna];
            this.contador = 1;
            celda.removeEventListener("contextmenu",this.marcar);
        }
    }

    ganar(){
        alert(`¡Has ganado! tu puntuación es de ${this.puntuacion}
    Tiempo tardado: ${this.tiempoTranscurrido} seg`);
    }
    timerInicial(){
        let tiempo = new Date();
        this.tiempoInicio = tiempo.getTime();
    }
    timerFinal(){
        let tiempo = new Date();
        this.tiempoFinal = tiempo.getTime();
        this.tiempoTranscurrido = parseInt((this.tiempoFinal - this.tiempoInicio) / 1000);
    }

    quitarCartas(celda){
        celda.innerHTML = "";
        celda.addEventListener("contextmenu",this.marcar);
        this.comprobarPuntuacion(celda);

        celda = document.getElementById(`f${this.valorprevio[0]}_c${this.valorprevio[1]}`);
        celda.innerHTML = "";
        celda.addEventListener("contextmenu",this.marcar);
        this.comprobarPuntuacion(celda);
    }

    comprobarPuntuacion(celda){
        //Comprueba la puntuación de la casilla en caso de haber fallado y la reduce, 
        //dependiendo de la que fuera la anterior.
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
        //Esto suma la puntuación y actualiza el valor de la variable puntuacion, que a la vez metemos
        //en el elemento h2.
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
        //nos pregunta si queremos reiniciar y en caso de aceptar procede a crear
        //una partida nueva, dejando todo como estaba al principio

        if (confirm("¿Seguro que quieres reiniciar? Se creará una partida nueva")) {
            location.reload()
        }
    }

    colocarParejas(){

        let parejas = ["🐟","🥶","👹","😈 ","💥 ","😺","💣","🤢","💥","🌴"];
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