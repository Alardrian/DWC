/**
 * Función para validar el nombre y apellidos del formulario
 */
function validarNombre() {
    let patron = /^[A-Za-záéíóúüàèiòÁÉÍÓÚÀÈÒÜñÑçÇ]{2,}$/;

    this.className = "";
    if (patron.test(this.value)) {
        this.className = "verde";
    }
}

/**
 * Función para validar el email del formulario
 */
function validarEmail() {
    let patron = /^.+@.+$/;

    this.className = "";
    if (patron.test(this.value)) {
        this.className = "verde";
    }
}

/**
 * Función para validar varios patrones
 */
function validarDatos(){
    let patrones = new Map();

    patrones.set("nombre", /^[A-Za-záéíóúüàèiòÁÉÍÓÚÀÈÒÜñÑçÇ]{2,}$/);
    patrones.set("apellidos", /^[A-Za-záéíóúüàèiòÁÉÍÓÚÀÈÒÜñÑçÇ]{2,}$/);
    patrones.set("email", /^.+@.+$/);
    patrones.set("telefonoNacional", /^([89][^09]|[67][0-9])[0-9]{7}$/);
    patrones.set("telefonoConPrefijo", /^\(\+[0-9]{1,3}\)([89][^09]|[67][0-9])[0-9]{7}$/);
    patrones.set("data", /^([1-2][0-9]|[0-2][1-9]|[3][01])\/([0][1-9]|[1][12])\/[0-9]{4}$/);
    patrones.set("hora",/^(0[0-9]|1[0-9]|2[0123])\:[0-5][0-9]\:[0-5][0-9]$/);
    
    patrones.set("visa",/^4([0-9]{12}|[0-9]{15})$/);
    patrones.set("masterCard",/^5[1-5][0-9]{14}$/);
    patrones.set("discover",/^(5[0-9]{14}|6011[0-9]{12})$/);
    patrones.set("americanExpress",/^3[47][0-9]{13}$/);
    patrones.set("dinersClub",/^(30[0-5][0-9]{11}|3[68][0-9]{12})$/);
    patrones.set("JCB",/^((2131|1800)[0-9]{11}|35[0-9]{14})$/);
    
    
    this.className = "input";
    if (patrones.get(this.id).test(this.value)) {
        this.className = "verde";
    }

} 

// Ejecución de la aplicación
    window.addEventListener('load', function(){
    let nombre = document.getElementById('nombre');
    let apellidos = document.getElementById('apellidos');
    let email = document.getElementById('email');
    
    nombre.addEventListener('keyup', validarDatos);
    apellidos.addEventListener('keyup', validarDatos);
    email.addEventListener('keyup', validarDatos);
    
});