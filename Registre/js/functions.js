var inputNom = document.getElementById("validationNom");
var inputCognom = document.getElementById("validationCognoms");
var inputDni = document.getElementById("validationDNI");
var inputUserName = document.getElementById("validationUsername");
var inputEmail = document.getElementById("validationEmail");
var inputTelefon = document.getElementById("validationTelf");

var btnArroba = document.querySelector("#btnUsername");
//console.log("hoola");


/* validar tots els camps al donar boto registre*/
//script al final de html para que esto funcione
$('#form-user-register').submit(function(e) {
  e.preventDefault(); //default hace la acción de submit
  validaNom();
  validaCognom();
  validaDni();
  validaUsername();
  validaEmail();
  validaTelefon();
});

btnArroba.addEventListener("click", function() {  
  validaNom();
  validaCognom();
  validaDni();
  var username = generarUsername();
  inputUserName.value = username;
  if(inputUserName.value == ""){
    noEsValid(inputUserName);
  } else {
    netejarAvisCamp();
    esValid(inputUserName);
  }
});

inputNom.addEventListener("focusout", function(e){
  validaNom();
});
inputCognom.addEventListener("focusout", function(e){
  validaCognom();
});
inputDni.addEventListener("focusout", function(e){
  validaDni();
});
inputUserName.addEventListener("focusout", function(e){
  validaUsername();
});
inputEmail.addEventListener("focusout", function(e){
  validaEmail();
});
inputTelefon.addEventListener("focusout", function(e){
  validaTelefon();
});


/* FUNCIONES VALIDACION */
function validaTelefon() {
  if(inputTelefon.value == ""){
    noEsValid(inputTelefon);
    noPotEstarBuit('#feedbackTelf');
  } else {
    //comprobar si es valido
    if (validateTelef(inputTelefon.value)){
      netejarAvisCamp("#feedbackTelf");
      esValid(inputTelefon);
    } else {
      netejarAvisCamp("#feedbackTelf");
      noEsValid(inputTelefon);
      valorNoValid("#feedbackTelf");
    }
  }
}
function validaEmail() {
  if(inputEmail.value == ""){
    noEsValid(inputEmail);
    noPotEstarBuit('#feedbackEmail');
  } else {
    //comprobar si es valido
    if (validateEmail(inputEmail.value)){
      netejarAvisCamp("#feedbackEmail");
      esValid(inputEmail);
    } else {
      console.log("correcto");
      netejarAvisCamp("#feedbackEmail");
      noEsValid(inputEmail);
      valorNoValid("#feedbackEmail");
    }
  }
}
function validaUsername(){
  if(inputUserName.value == ""){
    noEsValid(inputUserName);
    noPotEstarBuit('#feedbackUsername');
  } else {
    netejarAvisCamp('#feedbackUsername');
    esValid(inputUserName);
  }
}
// comprovar Nom i Cognom not nulls
function validaNom(){
  if (inputNom.value == "") {
    noEsValid(inputNom);  
    noPotEstarBuit('#feedbackNom');
  } else {        
    netejarAvisCamp('#feedbackNom');    //eliminar en caso de invalid
    esValid(inputNom);
  }
}
function validaCognom(){
  if (inputCognom.value == ""){
    noEsValid(inputCognom);
    noPotEstarBuit('#feedbackCognoms');
  } else {
    netejarAvisCamp('#feedbackCongoms');
    esValid(inputCognom);
  }

}
function validaDni(){
  if (inputDni.value == ""){
    noEsValid(inputDni);
    noPotEstarBuit('#feedbackDNI');
  } else {
    if (validateNIF_NIE(inputDni.value)) {
      netejarAvisCamp('#feedbackDNI');
      esValid(inputDni);
    } else {
      //formato no valido
      netejarAvisCamp('#feedbackDNI');
      noEsValid(inputDni);
      valorNoValid('#feedbackDNI');      
    }
  }
}

//mensaje al div del feedback formato no valido
function valorNoValid(etiqueta){
  $(etiqueta).addClass("invalid-feedback");
  $(etiqueta).html("Ha de ser un valor vàlid");
}
//afegir missatge al div del input
function noPotEstarBuit(etiqueta) {
  $(etiqueta).addClass("invalid-feedback");
  $(etiqueta).html("Aquest camp no pot estar buit")
}
//neteja missatge del div i color del input
function netejarAvisCamp(etiqueta){
  $(etiqueta).removeClass("invalid-feedback");
  $(etiqueta).html("");
}
function esValid(etiqueta) {
  etiqueta.classList.remove("is-invalid");
  etiqueta.classList.add("is-valid");
}
function noEsValid(etiqueta){
  etiqueta.classList.remove("is-valid");
  etiqueta.classList.add("is-invalid");
}
//genera un nombre a partir del nombre apellido y dni del usuario
// formato: primera letra en MINUSCULA + 4 primeras letras apellido(primera en MAYUSCULA) + numeros en POSICIONES impares del dni
function generarUsername() {
  // get primera letra en minusucla del nombre
  var primeraNombre = (inputNom.value.charAt(0)).toLowerCase();
  // 4 primeras letras del apellido
  var apellidoConcat = (inputCognom.value.split(" ").join("")).toLowerCase();
  var primerasLetras = apellidoConcat.substr(0,4);
  // numeros en posiciones impares del dni
  var numerosPosImpares = getImpar(inputDni.value);

  var usernameDefinitivo = primeraNombre + primerasLetras.charAt(0).toUpperCase() + primerasLetras.substr(1) + numerosPosImpares.toLowerCase();

  return usernameDefinitivo;
}
function getImpar(value) {
  var numsPosImpar = "";
  //contamos desde posicion 1 del dni
  for (let i=1; i<value.length; i++) {
    if (i%2!==0) {  //no es par
      numsPosImpar += value.charAt(i-1);  //index equivale a posicion-1
    }
  }
  return numsPosImpar;
}
function validateNIF_NIE(value){
  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}
function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    console.log("OK email");
    return true;
  }else{
    console.log("KO email");
    return false;
  }
}
function validateTelef(telf){
  var phoneno = /^\d{9}$/;
  if(telf.match(phoneno)){
      return true;
  } else {
     console.log("Not a valid Phone Number");
     return false;
  }
}

