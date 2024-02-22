var form = document.querySelector('#form');
var correo = document.querySelector('#correo');
console.log(form);
console.log(correo);

function setGreenBorder(targetElement) {
    targetElement.style.border = "2px solid green";
}
function setRedBorder(targetElement) {
    targetElement.style.border = "2px solid red";
}

form.addEventListener("focusout", function() {
    //comprobar si esta vacío
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

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        console.log("es truee");
        return true;
    } else {
        return false;
    }
}

correo.addEventListener("focusout", function(){
    var esValido = validateEmail(event.target.value);
    
    if (esValido) {
        setGreenBorder(event.target);
    } else {
        setRedBorder(event.target);
    }
});