var inputNom = document.getElementById("validationNom");
var inputCognom = document.getElementById("validationCognoms");
var inputDni = document.getElementById("validationDNI");
var inputUserName = document.getElementById("validationUsername");

var btnArroba = document.querySelector("#btnUsername");
console.log(btnArroba);
// console.log("hoola");
// console.log("sdfdasssasdsdasdaf");


/* validar tots els camps al donar boto registre*/
//script al final de html para que esto funcione
$('#form-user-register').submit(function(e) {
  e.preventDefault(); //default hace la acción de submit
  validaNom();
  validaCognom();
  validaDni();
  validaUsername();
});

btnArroba.addEventListener("click", function() {
  
  var username = generarUsername();
  inputUserName.value = username;
  console.log("Username generado: "+username);
});
function validaEmail() {
  if(inputEmail.value == ""){

  } else {

  }
}
function validaUsername(){
  if(inputUserName.value == ""){
    inputUserName.classList.add("is-invalid");
    noPotEstarBuit('#feedbackUsername');
  } else {
    netejarAvisCamp('#feedbackUsername');
    esValid(inputUserName);
  }
}
// comprovar Nom i Cognom not nulls
function validaNom(){
  if (inputNom.value == "") {
    inputNom.classList.add("is-invalid");    
    noPotEstarBuit('#feedbackNom');
  } else {        
    netejarAvisCamp('#feedbackNom');    //eliminar en caso de invalid
    esValid(inputNom);
  }
}
function validaCognom(){
  if (inputCognom.value == ""){
    inputCognom.classList.add("is-invalid");
    noPotEstarBuit('#feedbackCognoms');
  } else {
    netejarAvisCamp('#feedbackCongoms');
    esValid(inputCognom);
  }

}
function validaDni(){
  if (inputDni.value == ""){
    inputDni.classList.add("is-invalid");
    noPotEstarBuit('#feedbackDNI');
  } else {
    if (validateNIF_NIE(inputDni.value)) {
      netejarAvisCamp('#feedbackDNI');
      esValid(inputDni);
    } else {
      netejarAvisCamp('#feedbackDNI');
      
      //formato no valido
    }
  }
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
    alert("OK");
  }else{
    alert("KO");
  }
}

