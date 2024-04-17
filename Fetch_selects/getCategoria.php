<?php
    include('db_connection.php');

    $query = "SELECT * FROM categoria";
    
    try {
        $result = mysqli_query($conn, $query);
        
        //var_dump($result);
        //print_r($result);
        //$data = mysqli_fetch_assoc($result);
        $categorias = array();
        while ($fila = mysqli_fetch_assoc($result)) {
            $categorias[] = $fila;
        }
        
        echo json_encode($categorias);
        //var_dump($data);
        //header("Location: user.php");
        // if(!$data) {
        //     include"../view/login.html";
        //     echo "Login incorrecte";
        // }
    } catch (Exception $e) {
        echo "error fetch";
    }
?>