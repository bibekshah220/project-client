import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import React, { useEffect } from "react";

const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <main><h1>Loading...</h1></main>;
    }

    if (!user) {
        return null;
    }

    return children;
};

export default Protected;