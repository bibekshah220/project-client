import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth.js";

const Login = () => {
  
  const navigate = useNavigate();
  const { user, loading, handleLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState(null);

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
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await handleLogin(formData.email, formData.password);
      navigate('/home');
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setPopup(message);
    }
  }

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  if (loading) {
    return (
      <main>
        <div className="form-container">  
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  if (user) {
    navigate('/home', { replace: true });
    return null;
  }

  return (
    <main>
      {popup && (
        <div className="error-popup">
          <span>{popup}</span>
          <button onClick={() => setPopup(null)}>&times;</button>
        </div>
      )}
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
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
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