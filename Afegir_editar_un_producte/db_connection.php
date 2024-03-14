<?php

    include("dbConf.php");

    //creem la connexió i comprobar connexió
    try {
        $conn = mysqli_connect(HOSTNAME, USERNAME, PASSWORD, DATABASE);
    } catch (Exception $e) {
        die("Query fail!");
    }
?>