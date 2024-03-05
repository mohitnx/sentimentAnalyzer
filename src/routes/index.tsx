// import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./protectedRoutes";
import Login from "../pages/Auth/Login";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Main/Dashboard";
import Register from "../pages/Auth/Register";
// import AuthContext from "../hooks/authHooks/AuthContext";

const Router = () => {
  //   const context = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            // <ProtectedRoute>
            <Register />
            // </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
