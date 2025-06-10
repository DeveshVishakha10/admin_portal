import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/API';


export const Admin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/api/token/', credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/dashboard'); // redirect after login
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm" style={{width:'50%'}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="username"
                placeholder="Enter Employee ID" 
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>

            {error && <p className="text-danger mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>

  );
};
