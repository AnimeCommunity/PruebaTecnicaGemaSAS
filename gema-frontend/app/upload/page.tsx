"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

export default function HomePage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("archivo", file);

    try {
      const res = await fetch("http://localhost/gema/upload.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        router.push("/");
      } else {
        setError("Error al subir el archivo");
      }
    } catch (err) {
      setError("No se pudo conectar con php");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-semibold">Usuarios GEMA SAS</h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="bg-white text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-200"
        >
          Ver usuarios
        </button>
      </header>

      {/* BODY */}
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-80">
          <Upload className="mx-auto text-gray-500 h-12 w-12 mb-4" />
          <p className="text-gray-700 mb-2">Arrastra el documento aquí</p>
          <p className="text-gray-500 mb-2">o</p>
          <label className="cursor-pointer text-blue-600 hover:underline">
            Seleccionar archivo
            <input
              type="file"
              accept=".txt"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {loading && <p className="text-gray-600 mt-4">Subiendo...</p>}

          {error && (
            <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
