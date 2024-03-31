<?php
    include('db_connection.php');

    $query_multiple = "SELECT * from `barris`";
    $barrios = array();

    if (mysqli_multi_query($connexio, $query_multiple)) {
        //echo '<h1>DADES BARRIS</h1>';
        do {
            //primero guardamos resultado query
            if ($resultado = mysqli_store_result($connexio)) {
                //mostramos por cada fila de resultado
                while ($row = mysqli_fetch_array($resultado)) 
                {
            //echo'Id: '.$row["id"].' '.$row["name"].'<br>';
                    $object = new stdClass();
                    $object->id = $row["id"];
                    $object->name = $row["name"];
                    $barrios[] = $object; 
                }
                //mysqli_free_result($resultado);
            }                    
        } while (mysqli_next_result($connexio));    
        //mientras haya resultado hace bucle
    }
    echo json_encode($barrios);
    
    mysqli_close($connexio);
?>