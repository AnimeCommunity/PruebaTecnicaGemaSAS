"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  codigo: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost/gema/api_usuarios.php")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(() => console.error("Error cargando usuarios"));
  }, []);

  // eliminar duplicados por email
  const usuariosUnicos = usuarios.filter(
    (value, index, self) =>
      index === self.findIndex((u) => u.email === value.email)
  );

  const filtrar = (codigo: string) =>
    usuariosUnicos.filter((u) => u.codigo === codigo);

  const renderTabla = (titulo: string, lista: Usuario[]) => (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl mb-8 text-black">
      <h2 className="text-xl font-semibold mb-3 text-black flex items-center justify-between">
        <span>{titulo}</span>
        <span className="text-sm text-gray-600">({lista.length})</span>
      </h2>

      {lista.length === 0 ? (
        <p className="text-black">No hay usuarios.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-left text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellido</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.nombre}</td>
                <td className="border p-2">{u.apellido}</td>
                <td className="border p-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-md w-full">
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-semibold">Usuarios GEMA SAS</h1>
        </div>
        <button
          onClick={() => router.push("/upload")}
          className="bg-white text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-200"
        >
          Cargar documento
        </button>
      </header>

      {/* TABLAS */}
      <main className="flex flex-col items-center w-full p-6">
        {renderTabla("Usuarios Activos", filtrar("1"))}
        {renderTabla("Usuarios Inactivos", filtrar("2"))}
        {renderTabla("Usuarios en Espera", filtrar("3"))}
      </main>
    </div>
  );
}
