import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";
import Home from "./features/interview/pages/home.jsx";
import Interview from "./features/interview/pages/interview.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", 
    element: <ProtectedRoute><Home /></ProtectedRoute>, },
  { path: "/interview/:id",
    element: <ProtectedRoute><Interview /></ProtectedRoute>, },
]);
