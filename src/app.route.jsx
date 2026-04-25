import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/login.jsx";
import Register from "./features/auth/pages/Register.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <h1> homepage</h1>, },
]);
