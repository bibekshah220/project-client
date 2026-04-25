import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth.js";

const Login = () => {
  
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);

  }

  if (loading) {
    return (
      <main>
        <div className="form-container">  
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button className="button primary-button" type="submit">Login</button>
        </form>
        <p>Don't have an account? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Register</span></p>
      </div>
    </main>
  );
};

export default Login;