var categoriaSelect = document.getElementById("categoria");
var subCategoriaSelect = document.getElementById("subcategoria");

function cargarCategorias() {
    
        fetch('getCategoria.php')
            .then(response => response.json())
            .then(data => {
            // Llenar el select de subcategorías
            console.log(data);
                data.forEach(categoria => {
                    var option = document.createElement("option");
                    option.value = categoria.id;
                    option.text = categoria.nom;
                    //categoriaSelect.add(option);
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