<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}


include "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['archivo'])) {
    $file = $_FILES['archivo']['tmp_name'];

    if (($handle = fopen($file, "r")) !== false) {
        while (($data = fgetcsv($handle, 1000, ",")) !== false) {
            if (count($data) < 4) {
                die("Error: El archivo no tiene el formato correcto (faltan columnas)");
            }

            list($email, $nombre, $apellido, $codigo) = $data;

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) continue;
            if (!in_array($codigo, ["1", "2", "3"])) continue;

            $stmt = $conn->prepare("INSERT INTO usuarios (email, nombre, apellido, codigo) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("sssi", $email, $nombre, $apellido, $codigo);
            $stmt->execute();
        }
        fclose($handle);
        echo json_encode(["success" => true]);

        exit;
    } else {
        echo "No se pudo abrir el archivo.";
    }
}
?>
