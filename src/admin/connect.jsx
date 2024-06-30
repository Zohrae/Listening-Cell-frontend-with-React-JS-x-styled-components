import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginForm = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--grey);
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Increased shadow */
    text-align: left; /* Align text to left */
`;

const LogoImage = styled.img`
    width: 200px; /* Adjust width as needed */
    margin: 0 auto 20px; /* Center image horizontally and add space at the bottom */
    display: block; /* Ensure the image is displayed as a block element */
`;


const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
    font-size: 16px;
    outline: none; /* Remove default focus outline */
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary-color);
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease; /* Transition for all properties */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Increased shadow */
    &:hover {
        background-color: var(--pshade1);
        transform: translateY(-2px); /* Move button up on hover */
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
    }
`;

const ErrorMessage = styled.p`
    color: red;
`;

const Connect = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const solve = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/connect/', {
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
                const adminId = data.id; 
    
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('admin_id', adminId); 
    
                navigate('/panel');
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
        <LoginForm>
            <LogoImage src="/img/loo.png" alt="Logo" />
            <form onSubmit={solve}>
                <label htmlFor="username">Nom d'Utilisateur:</label>
                <InputField
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Mot de Passe:</label>
                <InputField
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <SubmitButton type="submit">
                    Se Connecter
                </SubmitButton>
            </form>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            
        </LoginForm>
    );
};

export default Connect;
