import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  withCredentials: true,
});

/**
 * POST /register
 * Registers a new user account
 */
export async function registerUser({ username, email, password }) {
  try {
    const res = await api.post("/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

/**
 * POST /login
 * Logs in a user and sets auth cookie
 */
export async function loginUser({ email, password }) {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

/**
 * GET /logout
 * Logs out the current user and blacklists the token
 */
export async function logoutUser() {
  try {
    await api.get("/logout");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}

/**
 * GET /getme
 * Returns the authenticated user's profile
 */
export async function getMe() {
  try {
    const res = await api.get("/getme");
    return res.data;
  } catch (error) {
    console.error("Get user failed:", error);
    throw error;
  }
}
