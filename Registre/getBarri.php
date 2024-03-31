<?php
    include('db_connection.php');

        $barris = array();
        //comprobar si recibe id
        if (isset($_POST['districteId'])) {
            $districteId = $_POST['districteId'];

            $query = "SELECT * FROM `barris` WHERE `id_districte` = $districteId ORDER BY id ASC";
                        
            // Ejecutar la consulta
            $result = mysqli_query($connexio, $query);
            if ($result) {
                // Recorrer los resultados y almacenarlos en el array de barrios
                while ($row = mysqli_fetch_assoc($result)) {
                    $barris[] = $row;
                }
                // Liberar el resultado
                mysqli_free_result($result);

                //devolver resultados
                echo json_encode($barris);
            }

        } else {
            echo "Error: Falta el ID del distrito.";
        }
        
    mysqli_close($connexio);
?>