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

$result = $conn->query("SELECT * FROM usuarios");
$usuarios = [];

while ($row = $result->fetch_assoc()) {
  $usuarios[] = $row;
}

echo json_encode($usuarios);
?>
