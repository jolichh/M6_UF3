console.log("asdaasssd");
// Deshabilitar select de barrios
$('#selectBarri').prop('disabled', true);

// Cargar opciones de distritos
$.ajax({
    url: 'datosDistritos.php',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
        // Limpiar opciones anteriores
        $('#selectDistricte').empty();
        $('#selectDistricte').append('<option value="" selected>Selecciona un districte</option>');
        // Agregar opciones nuevas
        $.each(response, function(index, districte) {
            $('#selectDistricte').append('<option value="' + districte.id + '">' + districte.name + '</option>');
        });
    },
    error: function(xhr, status, error) {
        console.error(xhr.responseText);
    }
});

$('#selectDistricte').change(function() {
    // Obtener el valor de la opción seleccionada
    var districteId = $(this).val();
    // Mostrar el valor en un alert
    console.log('Valor seleccionado: ' + districteId);
    // Enviar el ID del distrito al archivo PHP
    $.ajax({
        url: 'getBarri.php', 
        type: 'POST', 
        dataType: 'json', 
        data: { districteId: districteId }, // Datos a enviar 
        success: function(response) {
            console.log("Barrios del districto: ");
            console.log(response); 
            mostrarBarris(response);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
});

function mostrarBarris(response) {
    var selectBarri = $('#selectBarri');
    selectBarri.prop('disabled', false);
    selectBarri.empty();
    selectBarri.append('<option value="" selected>Selecciona un barri</option>');
    
    // Agregar opciones nuevas
    $.each(response, function(index, barri) {
        selectBarri.append('<option value="' + barri.id + '">' + barri.name + '</option>');
    });
}

//visualizar datos al div
$('#visualitzar').on("click", function(e){
    e.preventDefault();
    //datos 
    var nom = document.getElementById('nom').value;
    var barri = ($('#selectBarri option:selected')).text();
    var districte = ($('#selectDistricte option:selected')).text(); 
    var via = document.getElementById('nomVia').value;
    var numero = document.getElementById('num').value;
    var pis = document.getElementById('pis').value;
    var escala = document.getElementById('escala').value;
    var porta = document.getElementById('porta').value;
    var cp = document.getElementById('cp').value;
    var poblacio = ($('#selectPoblacio option:selected')).text();
    var preu = document.getElementById('preuInput').value;
    var text = document.getElementById('textArea').value;
    
    //elementos del div a mostrar
    $('#nomPis').text(nom+", "+barri+", "+districte); //h4
    $('#dir').text(via+" "+nom+" "+numero+" "+pis+" "+escala+" "+porta+"·"+cp+"·"+districte+"·"+barri+"·"+poblacio); //p direccio
    $('#preu').text(preu+"€");
    $('#text').text(text);
});