import { Link, NavLink } from "react-router-dom";

const Navbar = ({ isAuth, onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={isAuth ? "/home" : "/login"}
          className="text-white text-2xl font-bold"
        >
          Trabajo Práctico Integrador III
        </Link>

        <div className="space-x-4">
          {isAuth ? (
            <>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Mis Tareas
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Perfil
              </NavLink>

              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-300"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
