import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/userForm.js";

export const Login = ({ setUser }) => {
  const { username, password, onInputChange, onResetForm } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user || data);
        onResetForm();
      } else {
        setError(data.message || "Credenciales incorrectas.");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="******************"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Cargando..." : "Ingresar"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-bold"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
