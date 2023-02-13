const registroPacientes = new Map([
    [`AAA024`, `Fernández M. (321790059) -> C/Recoletos, 50`],  
    [`BCD827`, `Ruíz P. (100973253) -> C/Esquerdo izquierdo, 103`],
    [`YUN835`,`Benítez E. (154811767) -> Av.Argentina, 5`]
]);

let keys = []
let pacientes = [];

registroPacientes.forEach(function(value, key){
    pacientes.push(value);
    keys.push(key);
});

const nuevoRegistroPacientes = new Map();

for (let i = 0; i < registroPacientes.size; i++) {
    nuevoRegistroPacientes.set(`Paciente ${i+1}`,
    `numeroRegistro: ${keys[i]}, nombreCompleto: ${pacientes[i].split(" ")[0]} ${pacientes[i].split(" ")[1]}, numeroSS: ${pacientes[i].split(" ")[2]}, direccion: ${pacientes[i].split("->")[1]}`)
}

let nombreCompleto = pacientes[0].split(" ");
let numeroSS = pacientes[0].split(" ");
let direccion = pacientes[0].split("->");


console.log(registroPacientes);
console.log(nuevoRegistroPacientes);
