console.log("asdaasd");
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