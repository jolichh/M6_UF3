console.log("asda");
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