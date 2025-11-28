import { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Loading from "./components/Loading";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user || data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error de conexión al verificar sesión:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AppRouter
      isAuth={!!user}
      user={user}
      setUser={setUser}
      onLogout={handleLogout}
    />
  );
}

export default App;
