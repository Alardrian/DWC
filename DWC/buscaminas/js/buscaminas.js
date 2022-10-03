
let maxFilas = prompt("¿Cuantas filas quieres?");
let maxColumnas = prompt("¿Cuantas columnas quieres?");
let numMinas = prompt("¿Cuantas minas quieres introducir?")


//creamos tablero en html
document.write("<table>");



for (let i = 0; i < maxFilas; i++) {

    document.write("<tr>");

    for (let j = 0; j < maxColumnas; j++) {
        document.write("<td></td>");
    }
    
    document.write("</tr>");
}

document.write("</table>");

//crear array bidimensional para guardar las minas

let arrayTablero = [];

for (let mina = 0; mina < numMinas; mina++){
    posFila = Math.floor(Math.random()*maxFilas);
    console.log(posFila);
  //  arrayTablero[posFila][posColumna] = "MINA";
}

console.log(arrayTablero);