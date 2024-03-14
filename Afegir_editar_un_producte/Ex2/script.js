
let btnEdit = document.querySelectorAll(".btnEdit");
btnEdit.forEach(el=>{
    el.addEventListener("click", function(){
        let formData = new FormData();
        formData.append("id", this.getAttribute("idProd"));
        let options = {
                method: 'POST',
                body: formData
        }

        fetch("getProducte.php", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("nomProducte").value = data.nom;
            document.getElementById("addEdit").value = data.addEdit;
        })
        .catch((error) => {});
    })
});
//Upload Files
let btnImg = document.querySelectorAll(".btnImg");
let input = document.querySelectorAll(".input-file");
var array_img = new Array();

btnImg.forEach(function(el, index){
    el.addEventListener("click", function(e){
        e.preventDefault();
        input[index].click();    
    })    
});
input.forEach(function(el, index){
    el.addEventListener("change", function(){
        array_img[index] = el.files;
        document.getElementById('preview').innerHTML = '<p class="texto-img mb-3"><strong>Aquestes imatges no se están guardant a la bbdd*</strong></p>';
        //comprovar que no sea empty
        if (array_img.length > 0) {
            array_img.forEach(function(elem, index){
                processFile(elem, index);
            })
        }
    })
});

//muestra img
async function showFiles(){
    //comprovar que no sea empty
    if (array_img.length > 0) {
        array_img.forEach(function(elem, index){
            processFile(elem, index);
        })
    }
}
//process files
async function processFile(elem, index) {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    var element = elem[0];
    //extension del fichero
    const docType = element.type;
    //mirar la extension
    if (!validExtensions.includes(docType)) {        
        alert("Només extensions jpeg, jpg, png, gif");
        //eliminar
        array_img.splice(index,1);
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var prev = `<div class="previewImage">
                        <span style="padding: 0px 20px"><strong># ${index+1}</strong></span>
                        <img src="${reader.result}" alt="${element.name}">
                        <span>${element.name}</span>
                        <span onclick="removeBtn(${index})" class="material-symbols-outlined removeBtn" hidden>close</span>
                    </div>`;
        //añadir div al div de preview
        document.getElementById("preview").innerHTML += prev;
    }        
    reader.readAsDataURL(element);
}