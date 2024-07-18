import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LogInn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate('/todo')
    }

  return (
    <div className="container" style={{ marginTop: "10vh" }}>
    <form >
        <h2>Log In Page</h2>
        <p>Welcome </p>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address :</label>
            <input onChange={e => { setEmail(e.target.value) }} type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password :</label>
            <input onChange={e => { setPassword(e.target.value) }} type="password" className="form-control" id="password" />
        </div>
        <button onClick={handleLogin}>Login</button>
    </form>
  </div>
  )
}
export default LogInn;
