import axios from "axios";

export async function registerUser({ username, email, password }) {
  try {
    const res = await axios.post("http://localhost:8080/api/auth/register", {
      username,
      email,
      password,
    }, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    }, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}