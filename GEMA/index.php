<!DOCTYPE html>
<html>
<head>
  <title>Cargar archivo de usuarios</title>
</head>
<body>
  <h2>Cargar archivo .txt</h2>
  <form action="upload.php" method="POST" enctype="multipart/form-data">
    <input type="file" name="archivo" accept=".txt" required>
    <button type="submit">Subir</button>
  </form>
</body>
</html>
