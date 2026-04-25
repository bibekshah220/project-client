import { useContext } from "react";
import { AuthContext } from "../auth/auth.context.jsx";
import { loginUser, registerUser, logoutUser, getMe } from "../services/auth.api.js";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async (email, password) => {
        setLoading(true)    
        const data = await loginUser({ email, password })
        setUser(userData)
        setLoading(false)
    }   

}   