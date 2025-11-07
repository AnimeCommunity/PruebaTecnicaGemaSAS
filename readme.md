# GEMA SAS – Sistema de Carga y Visualización de Usuarios

Este proyecto está dividido en dos partes:

1. **Backend (PHP / MySQL)** – Encargado de procesar la carga de archivos y exponer la información como API  
2. **Frontend (Next.js / React)** – Interfaz web para subir el archivo y visualizar los usuarios activos, inactivos y en espera

---

## Estructura del repositorio

```
/
├── gema/               → Backend en PHP
│   ├── upload.php
│   ├── api_usuarios.php
│   └── gema.sql
│
└── gema-frontend/      → Frontend en Next.js
    ├── app/
    │   ├── upload/page.tsx
    │   └── usuarios/page.tsx
    ├── package.json
    └── ...
```

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **PHP 8+**
- **MySQL o MariaDB**
- **Node.js 18+**
- **Git**
- Un servidor local como **XAMPP**, **Laragon** o **WAMP**

---

## Instalación del backend (PHP)

1. Copia la carpeta `gema/` dentro de tu carpeta del servidor local  
   (por ejemplo, `C:\xampp\htdocs\gema` o `C:\laragon\www\gema`).

2. Crea la base de datos:
   - Abre **phpMyAdmin** o tu cliente MySQL.
   - Ejecuta el script incluido en `gema/gema.sql`

   ```sql
   SOURCE ruta/al/archivo/gema.sql;
   ```

3. Configura la conexión si tuvieras un archivo `config.php` (ajusta usuario, contraseña, etc)

4. Verifica que el backend funcione abriendo en el navegador:
   ```
   http://localhost/gema/api_usuarios.php
   ```
   Si todo está correcto, debería mostrar un JSON (aunque esté vacío)

---

## Instalación del frontend (Next.js)

1. Abre una terminal en la carpeta `gema-frontend`:
   ```bash
   cd gema-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre en el navegador:
   ```
   http://localhost:3000
   ```

---

## Flujo de uso

1. En la **vista principal**, verás tres tablas:
   - **Usuarios Activos**
   - **Usuarios Inactivos**
   - **Usuarios en Espera**

   Cada tabla muestra los usuarios según el código correspondiente (1, 2 o 3)

2. Usa el botón **“Cargar documento”** (arriba a la derecha) para ir a la vista de carga

3. En la **vista de carga**, puedes:
   - Arrastrar un archivo txt
   - O seleccionarlo manualmente
   - El archivo se envía a `upload.php`, se procesa y guarda en la base de datos

4. Una vez cargado, vuelve a la vista principal para ver los registros actualizados

---

## Notas técnicas

- El backend devuelve los usuarios en formato **JSON** desde `api_usuarios.php`
- El frontend obtiene esos datos con `fetch()` y los filtra según el campo `codigo`
- Los colores y estilos están gestionados con **Tailwind CSS**

---

##  Desarrollo

- Para detener el servidor de Next.js:
  ```bash
  Ctrl + C
  ```
- Para limpiar dependencias y reinstalar:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## Despliegue (opcional)

Si deseas subir este proyecto a producción:

- Backend: súbelo a un hosting con soporte **PHP + MySQL**
- Frontend: genera la build optimizada con:
  ```bash
  npm run build
  npm start
  ```
- Asegúrate de actualizar las rutas del `fetch` en el frontend, reemplazando `http://localhost/gema/...` por la URL de tu servidor

---

## Autor

**GEMA SAS**  
Desarrollo: Santiago Pineda  
Proyecto Prueba Técnica – Integración PHP + Next.js  
2025
