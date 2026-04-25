import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", 
    element: <ProtectedRoute><h1>homepage</h1></ProtectedRoute>, },
]);
