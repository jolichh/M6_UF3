var form = document.querySelector('#form');
var correo = document.querySelector('#correo');
var passwd = document.querySelector('#contrasena');

//validationPassword
var entreP = document.querySelector("#entre");
var mayuscula = document.querySelector("#mayuscula");
var minuscula = document.querySelector("#minuscula");
var numero = document.querySelector("#numero");
var especial = document.querySelector("#especial");

var confirmPasswd = document.querySelector("#confirmar_contrasena");


form.addEventListener("focusout", function(event) {
    if (correo == event.target) {
        if (validateEmail(event.target.value)) {
            setGreenBorder(event.target);
        } else {
            setRedBorder(event.target);
        }
    } else
    if(event.target.value.trim() == "" && correo !== event.target && passwd !== event.target) {
        
        console.log("red from form");
        setRedBorder(event.target);
        console.log(event.target);
    } else if (correo !== event.target && passwd !== event.target){
        console.log("green from form");
        setGreenBorder(event.target);
    }
    console.log(event.target);
});
confirmPasswd.addEventListener("focusout", function(event){
    if (event.target.value == passwd.value) {
        setGreenBorder(event.target);
    } else {
        setRedBorder(event.target);
    }
});
// para cada vez que se introduce algo en el correo
correo.addEventListener("input", function(event){
    var valorInput = event.target.value.trim();
    var esValido = validateEmail(valorInput);    
    if (esValido) {
        setGreenBorder(event.target);
    } else {
        setRedBorder(event.target);
    }
});

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    } else {
        console.log("false from validating email");
        return false;
    }
}
passwd.addEventListener("input", function(event){
    if (cumpleCondicion(event.target.value)) {
        console.log("contraseña: "+event.target.value);
        setGreenBorder(event.target);
    } else {
        console.log("No cumple: "+ event.target.value);
        setRedBorder(event.target);
    }
});

//condiciones que debe cumplir para considerarse valido
function cumpleCondicion(contrasenya) {
    let lowerCaseLetters = /[a-z]/;
    let upperCaseLetters = /[A-Z]/;
    let numbers = /[0-9]/;
    let specialChars =  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var counter = 0;

    if (contrasenya.length<8 || contrasenya.length>15 ) {
        setEntreFalse();
        //console.log("Debe contener entre 8 y 15 caracteres");        
    } else { setEntreTrue(); counter+=1;}

    if (!lowerCaseLetters.test(contrasenya)) {
        setMinusculaFalse();
        //console.log("Debe contener 1 letra minúscula");
    } else { setMinusculaTrue(); counter+=1;}

    if (!upperCaseLetters.test(contrasenya)) {
        setMayusculaFalse();
        //console.log("Debe contener 1 letra mayúscula");        
    } else { setMayusculaTrue(); counter+=1;}

    if (!numbers.test(contrasenya)) {
        setNumeroFalse();
        //console.log("Debe contener 1 número");
    } else {setNumeroTrue(); counter+=1;}

    if (!specialChars.test(contrasenya)) {
        setEspecialFalse();
        //console.log("Debe contener 1 carácter especial");
    } else {setEspecialTrue(); counter+=1;}    
console.log("counter: "+counter);
    if (counter == 5) {
        return true;
    }
    return false;
}

// entre 8 y 15 char
function setEntreFalse() {
    setRedColor(entreP);
}
function setEntreTrue() {
    setGreenColor(entreP);
}
// 1 mayuscula
function setMayusculaFalse() {
    setRedColor(mayuscula);
}
function setMayusculaTrue() {
    setGreenColor(mayuscula);
}
// 1 minuscula
function setMinusculaFalse() {
    setRedColor(minuscula);
}
function setMinusculaTrue() {
    setGreenColor(minuscula);
}
// 1 numero
function setNumeroFalse() {
    setRedColor(numero);
}
function setNumeroTrue() {
    setGreenColor(numero);
}
// 1 caracter especial
function setEspecialFalse() {
    setRedColor(especial);
}
function setEspecialTrue() {
    setGreenColor(especial);
}

function setGreenBorder(targetElement) {
    targetElement.style.border = "2px solid green";
}
function setRedBorder(targetElement) {
    targetElement.style.border = "2px solid red";
}
function setGreenColor(targetElement) {
    targetElement.style.color = "green";
}
function setRedColor(targetElement) {
    targetElement.style.color = "red";
}