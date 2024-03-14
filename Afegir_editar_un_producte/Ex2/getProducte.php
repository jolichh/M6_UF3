<?php

if(isset($_POST["id"]) && !empty($_POST["id"])){
    include("../db_connection.php");

    $sql = "SELECT * FROM productes WHERE id=" . $_POST["id"];

    $result = $conn->query($sql);

    $array = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $object = new stdClass();
        $object->nom = $row["nom"];
        $object->addEdit = $row["id"];
       
        echo json_encode($object);

    } else {
        echo "0 results";
    }

    $conn->close();
}


?>