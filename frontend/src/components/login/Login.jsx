import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for redirect

export const Login = () => {
  const [formData, setFormData] = useState({
    selectedcode: '',
    selectedpassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: formData.selectedcode,
        password: formData.selectedpassword
      });

      const { access, refresh, role } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Redirect based on role
      if (role === 'superadmin') {
        navigate('/superadmin-dashboard');
      } else if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (error) {
      alert('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-white rounded shadow"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <div className="form-group mb-3">
          <label htmlFor="employeeCode">Username</label>
          <input
            type="text"
            className="form-control"
            id="employeeCode"
            name="selectedcode"
            placeholder="Enter your Username"
            value={formData.selectedcode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="selectedpassword"
            placeholder="Enter your password"
            value={formData.selectedpassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};
