var inputNom = document.getElementById("validationNom");
var inputCognom = document.getElementById("validationCognoms");
console.log(inputCognom);



/* validar tots els camps al donar boto registre*/
//script al final de html para que esto funcione
$('#form-user-register').submit(function(e) {
  e.preventDefault(); //default hace la acción de submit
  alert("EE");
  validaNom();
  validaCognom();
});
// comprovar Nom i Cognom not nulls
function validaNom(){
  if (inputNom.value == "") {
    inputNom.classList.add("is-invalid");    
    noPotEstarBuit('#feedbackNom');
  } else {        
    netejarAvisCamp('#feedbackNom');    //eliminar en caso de invalid
    inputNom.classList.remove("is-invalid");
    inputNom.classList.add("is-valid");
  }
}
function validaCognom(){
  if (inputCognom.value == ""){

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
/* validar tots els camps */

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

