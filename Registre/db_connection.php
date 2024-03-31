<?php

    include("dbConf.php");

    //creem la connexió i comprobar connexió
    try {
        $connexio = mysqli_connect(HOSTNAME, USERNAME, PASSWORD, DATABASE);
    } catch (Exception $e) {
        die("Query fail!");
    }

?>