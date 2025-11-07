<?php include "db.php"; ?>

<!DOCTYPE html>
<html>
<head>
  <title>Usuarios GEMA SAS</title>
  <style>
    table, th, td { border: 1px solid #ccc; border-collapse: collapse; padding: 6px; }
    table { margin-bottom: 30px; width: 60%; }
  </style>
</head>
<body>
  <h1>Usuarios cargados</h1>

  <?php
  $estados = [
    1 => "Activos",
    2 => "Inactivos",
    3 => "En espera"
  ];

  foreach ($estados as $codigo => $nombreEstado) {
      echo "<h2>Usuarios $nombreEstado</h2>";
      $resultado = $conn->query("SELECT * FROM usuarios WHERE codigo = $codigo");
      if ($resultado->num_rows > 0) {
          echo "<table><tr><th>Email</th><th>Nombre</th><th>Apellido</th></tr>";
          while ($fila = $resultado->fetch_assoc()) {
              echo "<tr><td>{$fila['email']}</td><td>{$fila['nombre']}</td><td>{$fila['apellido']}</td></tr>";
          }
          echo "</table>";
      } else {
          echo "<p>No hay usuarios $nombreEstado.</p>";
      }
  }
  ?>
</body>
</html>
