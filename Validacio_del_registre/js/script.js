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
    console.log(event.target.value);
    //comprobar si esta vacío
    if(event.target.value.trim() == "") {
        setRedBorder(event.target);
    } else {
        setGreenBorder(event.target);
    }
    
});

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
       return true;
    }else{
       return false;
    }
}

correo.addEventListener("focusout", validateEmail);