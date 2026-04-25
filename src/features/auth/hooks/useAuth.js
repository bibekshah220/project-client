import { useContext } from "react";
import { AuthContext } from "../auth/auth.context.jsx";
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

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const data = await registerUser({ username, email, password });
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

      useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();  
                setUser(data.user);
            } catch (error) {
                console.error("Failed to fetch user:", error);  
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);
  return { user, loading, handleLogin, handleRegister, handleLogout };
};
