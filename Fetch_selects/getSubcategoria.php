<?php
    include('db_connection.php');

    $query = "SELECT * FROM subcategoria";
    
    try {
        $result = mysqli_query($conn, $query);
        
        $subcategorias = array();

        //guardar en un array los datos
        while ($fila = mysqli_fetch_assoc($result)) {
            $subcategorias[] = $fila;
        }
        
        echo json_encode($subcategorias);

    } catch (Exception $e) {
        echo "error fetch";
    }
?>