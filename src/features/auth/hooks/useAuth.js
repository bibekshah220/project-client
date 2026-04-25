import { useContext } from "react";
import { AuthContext } from "../auth/auth.context.jsx";
import { loginUser, registerUser, logoutUser, getMe } from "../services/auth.api.js";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async (email, password) => {
        setLoading(true)    
        const data = await loginUser({ email, password })
        setUser(data.user)
        setLoading(false)
    }   

    const handleRegister = async (username, email, password) => {
        setLoading(true)    
        const data = await registerUser({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async () => {
        setLoading(true)    
       const data = await logoutUser()
        setUser(null)
        setLoading(false)
    }
    return { user, loading, handleLogin, handleRegister, handleLogout }
}   