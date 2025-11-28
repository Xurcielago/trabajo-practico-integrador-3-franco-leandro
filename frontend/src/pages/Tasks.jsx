import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import Loading from "../components/Loading";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const {
    title,
    description,
    is_completed,
    onInputChange,
    onResetForm,
    setFormState,
  } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks-by-user", {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data.tasks || data || []);
      }
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim())
      return alert("Completa los campos obligatorios");

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/tasks/${editingId}` : "/api/tasks";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, is_completed }),
      });

      if (response.ok) {
        fetchTasks();
        onResetForm();
        setEditingId(null);
      } else {
        alert("Error al guardar la tarea");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setFormState({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta tarea?")) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...task, is_completed: !task.is_completed }),
      });

      if (response.ok) fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    onResetForm();
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              {editingId ? "Editar Tarea" : "Nueva Tarea"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={onInputChange}
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Titulo de la tarea..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Detalles de la tarea..."
                ></textarea>
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="is_completed"
                  checked={is_completed}
                  onChange={onInputChange}
                  className="h-4 w-4 text-blue-600"
                  id="checkCompleted"
                />
                <label htmlFor="checkCompleted" className="ml-2 text-gray-700">
                  Marcar como completada
                </label>
              </div>

              <button
                type="submit"
                className={`w-full text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-300 ${
                  editingId
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {editingId ? "Actualizar Tarea" : "Guardar Tarea"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full mt-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="lg:col-span-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Mis Tareas</h2>

          {tasks.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
              <p>No tienes tareas pendientes. ¡Crea una!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white p-4 rounded-lg shadow border-l-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition duration-300 ${
                    task.is_completed
                      ? "border-green-500 bg-green-50"
                      : "border-blue-500"
                  }`}
                >
                  <div className="flex-grow">
                    <h3
                      className={`font-bold text-lg ${
                        task.is_completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p
                      className={`text-gray-600 ${
                        task.is_completed ? "line-through" : ""
                      }`}
                    >
                      {task.description}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                        task.is_completed
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {task.is_completed ? "Completada" : "Pendiente"}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleToggleStatus(task)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded tooltip"
                      title={
                        task.is_completed
                          ? "Marcar pendiente"
                          : "Marcar completada"
                      }
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => handleEdit(task)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
