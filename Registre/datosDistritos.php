<?php
    include('db_connection.php');

    $query_multiple = "SELECT * from `districtes`";
    if (mysqli_multi_query($connexio, $query_multiple)) {
        echo '<h1>DADES DISTRICTES</h1>';
        do {
            //primero guardamos resultado query
            if ($resultado = mysqli_store_result($connexio)) {
                //mostramos por cada fila de resultado
                while ($row = mysqli_fetch_array($resultado)) 
                {
            echo'Id: '.$row["id"].' '.$row["name"].'<br>';
                }
                mysqli_free_result($resultado);
            }                    
        } while (mysqli_next_result($connexio));    
        //mientras haya resultado hace bucle
    }
?>