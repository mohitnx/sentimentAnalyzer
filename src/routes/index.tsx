import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Main/Dashboard";
import Register from "../pages/Auth/Register";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
