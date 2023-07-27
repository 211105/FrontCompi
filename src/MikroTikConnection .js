import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './inicio.css';

axios.defaults.withCredentials = true;

const MikroTikConnection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const navigate = useNavigate();

  const handleConnect = (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
      ip_address: ipAddress,
    };

    axios.post('http://localhost:5000/login', formData)
      .then((response) => {
        if (response.data.message === 'login successful') {
          setResponseMessage('Conexión exitosa al MikroTik.');
          navigate('/document');
        } else {
          setResponseMessage(response.data.message);
        }
      })
      .catch((error) => {
        setResponseMessage('Error en la conexión al MikroTik.');
      });
  };

  return (
    <div className="login-box">
      <h2>MikroTik Router Connection</h2>
      <form onSubmit={handleConnect}>
        <div className="user-box">
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            id="ipAddress"
            name="ipAddress"
            required
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <label htmlFor="ipAddress">IP Address</label>
        </div>
        <button type="submit" className="connect-btn">Connect</button>
      </form>
      {responseMessage && <div id="response" className="alert">{responseMessage}</div>}
    </div>
  );
};

export default MikroTikConnection;
