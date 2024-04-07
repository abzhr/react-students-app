import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { loginUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const Login = ({ updateToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const users = await loginUser(email, password);
      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem('is_authenticated', true);
        Swal.fire({
          icon: 'success',
          title: 'Successfully logged in!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      } else {
        throw new Error('Incorrect email or password.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
