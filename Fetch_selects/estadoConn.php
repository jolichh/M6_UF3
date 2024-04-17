<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="procesar.php" method="post">
        <label for="categoria">Categoría:</label>
        <select name="categoria" id="categoria" onchange="cargarSubcategoria()">
            <!-- Aquí irán las opciones de categoría -->
            <option value="">Seleccionar</option>
        </select>
        <label for="subcategoria">Subcategoría:</label>
        <select id="subcategoria">
            <option value="">Seleccione una subcategoría</option>
        </select>
    </form>
    <?php
        // Incluye el archivo de conexión
        include('db_connection.php');

        // Verifica si la conexión ha sido exitosa
        if ($conn) {
            echo "Conexión exitosa a la base de datos.";

            // Aquí puedes realizar otras operaciones con la base de datos
            // ...

            // Cierra la conexión al finalizar las operaciones
            $conn->close();
        } else {
            echo "Error en la conexión a la base de datos.";
        }
    ?>
    <script src="javascript/script.js"></script>
</body>
</html>
