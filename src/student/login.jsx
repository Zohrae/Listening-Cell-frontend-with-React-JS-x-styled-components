import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginEtudiant = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(''); // Define username state
    const [password, setPassword] = useState(''); // Define password state
    const [error, setError] = useState('');

    const solve = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const response = await fetch('http://localhost:8000/loginEtudiant/', {
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
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('etudiantId', data.id); // Store the etudiant's ID
                navigate('/mindCare');
            } else {
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
        <div>
            <h2>Student Login</h2>
            <form onSubmit={solve}>
                <div>
                    <label>Username:</label>
                    <input
                        name='username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        name='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}

        </div>
    );
};

export default LoginEtudiant;
