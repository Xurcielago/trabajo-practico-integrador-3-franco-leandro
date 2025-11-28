import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const AppRouter = ({ isAuth, user, setUser, onLogout }) => {
  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} onLogout={onLogout} />

      <main className="flex-grow min-h-[calc(100vh-150px)]">
        <Routes>
          <Route element={<PublicRoute isAuth={isAuth} />}>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
          </Route>

          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to={isAuth ? "/home" : "/login"} />}
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
