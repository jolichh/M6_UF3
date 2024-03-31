$(document).ready(function() {
    // Deshabilitar select de barrios
    $('#barri').prop('disabled', true);

    // Cargar opciones de distritos
    $.ajax({
        url: 'cargar_distritos.php', // Ruta de tu script PHP que consulta la base de datos
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Limpiar opciones anteriores
            $('#districte').empty();
            $('#districte').append('<option value="" selected>Selecciona un districte</option>');
            // Agregar opciones nuevas
            $.each(response, function(index, districte) {
                $('#districte').append('<option value="' + districte.id + '">' + districte.nom + '</option>');
            });
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });

    // Cuando se selecciona un distrito, cargar opciones de barrios
    $('#districte').change(function() {
        var districteId = $(this).val();
        $.ajax({
            url: 'cargar_barrios.php', // Ruta de tu script PHP que consulta la base de datos
            type: 'GET',
            data: { districteId: districteId },
            dataType: 'json',
            success: function(response) {
                // Habilitar select de barrios
                $('#barri').prop('disabled', false);
                // Limpiar opciones anteriores
                $('#barri').empty();
                $('#barri').append('<option value="" selected>Selecciona un barri</option>');
                // Agregar opciones nuevas
                $.each(response, function(index, barri) {
                    $('#barri').append('<option value="' + barri.id + '">' + barri.nom + '</option>');
                });
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});
