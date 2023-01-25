function validarNombre(){
    let patron = /^[A-Za-záéíóúüïàèìòùÁÉÍÓÚÀÈÒÜñÑçÇ]{2,}$/;

    let esValido = patron.test(this.value);

    this.className = "input";
    if(esValido){
        this.className = "verde";
    }
}

function validarEmail(){
    let patron = /^.+@.$/;

    let esValido = patron.test(this.value);

    this.className = "input";
    if(esValido){
        this.className = "verde";
    }
}

window.addEventListener('load', function(){
    let nombre = document.getElementById('nombre');
    let apellido = this.document.getElementById("apellidos");
    let email = this.document.getElementById("email");

    nombre.addEventListener('keyup', validarNombre);
    apellido.addEventListener("keyup", validarNombre);
    email.addEventListener("keyup", validarEmail);
});

/**
 * Funcion para validar varios patrones
 */

function validarDatos(tipoValidacion){
    let patrones = new Map();

    patrones.set("nombre",/^[A-Za-záéíóúüïàèìòùÁÉÍÓÚÀÈÒÜñÑçÇ]{2,}$/);
    console.log(patrones);


}