import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Home = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks-by-user", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const taskList = data.tasks || data || [];
        setTasks(taskList);
        calculateStats(taskList);
      }
    } catch (error) {
      console.error("Error cargando tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (taskList) => {
    const total = taskList.length;
    const completed = taskList.filter((t) => t.is_completed).length;
    const pending = total - completed;

    setStats({ total, completed, pending });
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto mt-10 p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bienvenido,{" "}
          <span className="text-blue-600 capitalize">
            {user?.username || "Usuario"}
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Aquí tienes el resumen de tus actividades.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-uppercase font-bold">
            Total Tareas
          </h3>
          <p className="text-4xl font-bold text-gray-800 mt-2">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-uppercase font-bold">
            Completadas
          </h3>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {stats.completed}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-uppercase font-bold">
            Pendientes
          </h3>
          <p className="text-4xl font-bold text-yellow-600 mt-2">
            {stats.pending}
          </p>
        </div>
      </div>

      <div className="text-center md:text-left">
        <Link
          to="/tasks"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg transform hover:-translate-y-1"
        >
          Gestionar mis Tareas →
        </Link>
      </div>
    </div>
  );
};

export default Home;
