function cargarCategorias() {
    var categoriaSelect = document.getElementById("categoria");
        fetch('getCategoria.php')
            .then(response => response.json())
            .then(data => {
            // Llenar el select de subcategorías
            console.log(data);
                data.forEach(subcategoria => {
                    var option = document.createElement("option");
                    option.value = subcategoria.id;
                    option.text = subcategoria.nom;
                    //categoriaSelect.add(option);
                    categoriaSelect.appendChild(option);
                    console.log(option);
                });
                
        }).catch((error) => {});
    
}
cargarCategorias();
function cargarSubCategorias() {
    var subcateCategoria = document.getElementById("subcategoria");
        fetch('getSubcategoria.php')
            .then(response => response.json())
            .then(data =>
                {
                    
                })
}