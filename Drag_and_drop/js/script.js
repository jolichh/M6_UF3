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
dropArea.addEventListener("drop", function(e){
    //Aquesta acció ens retornarà una FileList, 
    //que és un objecte de JS que només és de lectura, 
    //per tant no podrem concatenar aquesta array amb futurs arxius. 
    //Per a fer-ho passarem aquest FileList a Array mitjançant 
    //la funció Array.from() i la concatenarem amb l’array definida a l’inici del programa.
    array_fitxers = array_fitxers.concat(Array.from(e.dataTransfer.files));
    showFiles();
    dropArea.classList.remove("active");
    dragDropText.textContent = "Drag & Drop files";
});

function showFiles(){
    // limpiar el contenido del div preview para evitar que concatene resultados
    document.getElementById('preview').innerHTML = '';
    //comprovar que no sea empty
    if (array_fitxers.length > 0) {
        array_fitxers.forEach(function(elem, index){
            processFile(elem, index);
        })
    }
}

//process files
function processFile(element, index) {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    //extension del fichero
    const docType = element.type;

    //mirar la extension
    if (!validExtensions.includes(docType)) {        
        alert("Només extensions jpeg, jpg, png, gif");
        //eliminar
        array_fitxers.splice(index,1);
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var prev = `<div class="previewImage">
                        <img src="${reader.result}" alt="${element.name}">
                        <span>${element.name}</span>
                        <span onclick="removeBtn(${index})" class="material-symbols-outlined removeBtn">close</span>
                    </div>`;
        //añadir div al div de preview
        document.getElementById("preview").innerHTML += prev;
    }        
    reader.readAsDataURL(element);
}

//elimina el array en posicion i
function removeBtn(i) {
    array_fitxers.splice(i,1);
    showFiles();
}

//Upload Files
button.addEventListener("click", function(e){
    e.preventDefault();
    input.click();    
});


input.addEventListener("change", function(){
    array_fitxers = array_fitxers.concat(Array.from(input.files));
    showFiles();
});

form.addEventListener("submit", function(e){
    e.preventDefault();
    const dataTransfer = new DataTransfer();
    array_fitxers.forEach(file=>{
        dataTransfer.items.add(file);
    })
    input.files = dataTransfer.files;
    form.submit();
    console.log("Submitted form");
});