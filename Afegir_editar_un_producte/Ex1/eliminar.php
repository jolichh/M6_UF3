<?php
    include("../db_connection.php");

    if(isset($_GET['id'])) {

        $sql = "DELETE FROM productes WHERE id=" . $_GET["id"];
        $result = mysqli_query($conn, $sql);
    }
    header('Location: ex1Llistat.php');
?>