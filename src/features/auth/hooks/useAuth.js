import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email, password) => {
    setLoading(true);
    try {
      const data = await registerUser({ email, password });
      setUser(data.user);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return { user, loading, handleLogin, handleRegister, handleLogout };
};
