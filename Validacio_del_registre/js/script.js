var form = document.querySelector('#form');
var correo = document.querySelector('#correo');
var passwd = document.querySelector('#contrasena');
console.log(form);
console.log(correo);
console.log(passwd);

function setGreenBorder(targetElement) {
    targetElement.style.border = "2px solid green";
}
function setRedBorder(targetElement) {
    targetElement.style.border = "2px solid red";
}

form.addEventListener("focusout", function(event) {
    //comprobar si esta vacío
    if (correo == event.target) {
        if (validateEmail(event.target.value)) {
            setGreenBorder(event.target);
        } else {
            setRedBorder(event.target);
        }
    } else
    if(event.target.value.trim() == "" && correo !== event.target) {
        console.log("red from form");
        setRedBorder(event.target);
    } else if (correo !== event.target){
        console.log("green from form");
        setGreenBorder(event.target);
    }

    // if(correo == event.target) {
    //     console.log("desde form "+ validateEmail(event.target));
    //     validateEmail(event.target);
    // }
    
});

//Problema que no marca correo como focusout
//correo.addEventListener("focusout", function())
correo.addEventListener("input", function(event){
    var valorInput = event.target.value.trim();
    // if (valorInput == "") {
    //     setRedBorder(event.target);
    // }
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
        setGreenBorder(event.target);
    } else {
        setRedBorder(event.target);
    }
});
//condiciones que debe cumplir para considerarse valido
function cumpleCondicion(contrasenya) {
    let lowerCaseLetters = /[a-z]/;
    let upperCaseLetters = /[A-Z]/;
    let numbers = /[0-9]/;
    let specialChars =  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var cumpleTodas = false;
console.log("contraseña itroducida: "+contrasenya);
    if (contrasenya.length<8 || contrasenya.length>15 ) {
        console.log("Debe contener entre 8 y 15 caracteres");
        //return false;
    }
    if (!lowerCaseLetters.test(contrasenya)) {
        console.log("Debe contener 1 letra minúscula");
        //return false;
    }
    if (!upperCaseLetters.test(contrasenya)) {
        console.log("Debe contener 1 letra mayúscula");
        //return false;
    }
    if (!numbers.test(contrasenya)) {
        console.log("Debe contener 1 número");
        //return false;
    }
    if (!specialChars.test(contrasenya)) {
        console.log("Debe contener 1 carácter especial");
        //return false;
    }
    return false;
}

// document.getElementById("validationPassword").addEventListener("input");

document.getElementById("validationPassword").addEventListener("click",function(event){crearDivCondicionesContrasena(event.target)})
function crearDivCondicionesContrasena(target) {
    // var nuevoDiv = document.createElement("div");
    // nuevoDiv.id = "validationPassword";

    var arrayText = ["Entre 8 y 15 char", "1 mayuscula", "1 numero", "1 caracter especial", "1 minuscula"];

    var arrayID = ["entre", "mayuscula", "numero", "especial", "minuscula"];

    // Crear 5 elementos p y agregarlos al nuevo div con IDs basados en los criterios
    for (var i = 0; i < criterios.length; i++) {
        var nuevoP = document.createElement("p");
        
        nuevoP.textContent = arrayText[i];       
        nuevoP.id = arrayID[i];
        
        target.appendChild(nuevoP);
    }
    // // Obtener el cuerpo del documento
    // var cuerpo = document.body;

    // // Agregar el nuevo div al cuerpo del documento
    // cuerpo.appendChild(nuevoDiv);
}