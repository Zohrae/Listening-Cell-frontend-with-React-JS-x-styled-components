import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const solve = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                const conseillerId = data.id; // Utiliser data.id pour récupérer l'ID du conseiller
    
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('conseiller_id', conseillerId); // Stocker correctement l'ID du conseiller dans la session
    
                navigate('/dashboard');
            } else {
                // Check if response status is 401 (Unauthorized) to handle incorrect credentials
                if (response.status === 401) {
                    setError('Invalid username or password.');
                } else {
                    const data = await response.json();
                    setError(data.detail || 'Unknown error occurred');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };
    
    return (
        <div className="mainL">
            <h1 className='titleL'>GeeksforGeeks</h1>
            <h3>Enter your login credentials</h3>
            <form onSubmit={solve}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="wrap">
                    <button className='login' type="submit">
                        Submit
                    </button>
                </div>
            </form>

            {error && <p>{error}</p>}
            <p>
                Not registered?{' '}
                <a href="#" style={{ textDecoration: 'none' }}>
                    Create an account
                </a>
            </p>
        </div>
    );
};

export default Login;
