import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Para redirigir

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de campos
    if (credentials.username && credentials.password) {
      console.log('Iniciar sesión con:', credentials);
      setIsLoggedIn(true); // Seteamos el estado de sesión como iniciado
      navigate('/'); // Redirigimos al Home
    } else {
      alert('Por favor, ingrese su usuario y contraseña');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f0f8ff' }}>
      <div className="card shadow-lg p-4 rounded" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">
            <i className="bi bi-hospital"></i> Hospital Login
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Ingrese su usuario"
                id="username"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                id="password"
                className="form-control"
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
            </div>
            <div className="mt-3 text-center">
              <a href="#" className="text-muted">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
