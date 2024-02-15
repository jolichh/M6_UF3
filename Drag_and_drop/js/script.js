
//Array buida on aniran tots els fitxers
var array_fitxers = new Array();
//Objectes que farem servir
var dropArea = document.querySelector('.drop-area');
var dragDropText = document.querySelector('h2');
var button = document.querySelector('button');
var input = document.querySelector('#input-file');
var preview = document.querySelector('#preview');

//invalidar accion por defecto del drag and drop
var eventos = ["dragover", "dragleave", "drop"];
console.log(dropArea);
console.log(button);
function prevDefault (e) {
    e.preventDefault();
}
eventos.forEach(evt => {
    dropArea.addEventListener(evt, prevDefault);

});

//Acció dragover que modifica el div
dropArea.addEventListener("dragover", function(){
    //CODE
    dropArea.classList.add("active");
    dragDropText.textContent = "Drop to upload files";
});

//Al momento de sacar los archivos del div, volverá al estado original
dropArea.addEventListener("dragleave", function(){
    //CODE
    dropArea.classList.remove("active");
    dragDropText.textContent = "Drag & Drop files";
});

//accion drop