function AppFuncionando(){
    let filas = prompt('Cuantas filas quieres que tenga el tablero?');
    let columnas = prompt('Cuantas columnas quieres que tenga el tablero?');

    while ((filas*columnas)%2 != 0){
        filas = prompt('Cuantas filas quieres que tenga el tablero?');
        columnas = prompt('Cuantas columnas quieres que tenga el tablero?');
    }

    pintarTablero(crearArrayTablero(filas,columnas),filas,columnas);
}

function crearArrayTablero(filas, columnas){

    let arrayTablero = [];

    for (let i = 0; i < filas; i++) {
        arrayTablero[i] = new Array(columnas);

        for (let j = 0; j < columnas; j++) {
            arrayTablero[i][j] = '';
        }
    }
    return arrayTablero;
}

function pintarTablero(tablero,filas,columnas){

    let numeros = [1,2,3,4,5,7,8,9,10];
    
    document.write('<table>');
    for (let i = 0; i <filas; i++) {
        document.write('<tr>');

        for (let j = 0; j <columnas; j++) {
           document.write(`<td>${tablero[i][j]}</td>`)
        }
        document.write('</tr>')
    }
    document.write('</table>');
}

AppFuncionando();