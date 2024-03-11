var categoriaSelect = document.getElementById("categoria");
var subCategoriaSelect = document.getElementById("subcategoria");

function cargarCategorias() {
    
        fetch('getCategoria.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(categoria => {
                    //queremos que cargen todas, nos va bien usar appendChild
                    var option = document.createElement("option");
                    option.value = categoria.id;
                    option.text = categoria.nom;
                    //categoriaSelect.add(option); //esta funciona igual que appendChild
                    categoriaSelect.appendChild(option);
                    console.log(option);
                });
                
        }).catch((error) => {});
    
}
cargarCategorias();

categoriaSelect.addEventListener("change", function(){
    var idCategoria = categoriaSelect.value;
    fetch('getSubcategoria.php')
        .then(response => response.json())
        .then(data =>
            {
                //vamos a querer que aparezcan solo estas filtradas, usando innerHTML
                var optionsSub = "<option value='-1'>Selecciona una subcategoria</option>";
                data.forEach(subcategoria => {
                    //filtrar por categoria a la que pertenece
                    if (subcategoria.cat_id == idCategoria) {
                        optionsSub += '<option value="'+subcategoria.id+'">'+subcategoria.nom+'</option>';
                    }                    
                });
                console.log(optionsSub);
                subCategoriaSelect.innerHTML = optionsSub;
            })
});

var cat = document.getElementById("cat");
console.log(cat);
function cargarCat() {
    
    fetch('getCategoria.php')
        .then(response => response.json())
        .then(data => {
            var checkbox = "";
            data.forEach(categoria => {
                checkbox += "<div>"
                checkbox += '<input type="checkbox" name="cate" value="' + categoria.id + '">';
                checkbox += '<label for="'+categoria.id+'">' + categoria.nom + '</label>';
                checkbox += "</div>"
            });
            cat.innerHTML = checkbox;
            console.log(checkbox);
    }).catch((error) => {});

}
cargarCat();
// document.querySelectorAll(".checkCat").forEach(el=>
//     el.addEventListener("change", function(){
    
//     if(this.checked===true){
//     console.log(this.value + " check");
//     }else{
//     console.log(this.value + " uncheck");
//     }
//     })
//     )