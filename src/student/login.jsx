import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
`;

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    margin-right: 200px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-right: 0;
    }
`;

const FormContainer = styled.form`
    width: 350px; /* Same width as ImageContainer */
    padding: 20px;
    background-color: #f9f9f9; /* Lighter color */
    border-radius: 15px; /* Increased border radius */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 350px;

    @media screen and (max-width: 768px) {
        width: 98%; /* Adjusted width for smaller screens */
        max-width: 450px;
    }
`;

const InputContainer = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    color: var(--primary-color);
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: var(--primary-color);
    border: none;
    border-radius: 15px; /* Increased border radius */
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var(--pshade3);
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin-bottom: 10px; /* Adjust margin */
`;

const ImageContainer = styled.div`
    width: 150px; /* Adjusted size */

    @media screen and (max-width: 768px) {
        display: none; /* Hide the image on smaller screens */
    }
`;

const StudentImage = styled.img`
    width: 350px;
    height: auto;
    height: 350px;
    border-radius: 15px;

    @media screen and (max-width: 768px) {
        width: 80%; /* Adjusted width for smaller screens */
        max-width: 200px;
    }
`;
const LoginEtudiant = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const solve = async (e) => {
        e.preventDefault();
        if (!/^[a-zA-Z]+$/.test(username)) {
            setError('Username must contain only letters.');
            return;
        }
        setError('');
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
                localStorage.setItem('username', username); // Changed to localStorage
                localStorage.setItem('etudiantId', data.id); // Changed to localStorage
                navigate('/mindCare');
            } else {
                if (response.status === 401) {
                    setError('Invalid username or password.');
                } else if (response.status === 403) {
                    setError('Veuillez activer votre compte.');
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
        <Container>
            <LoginContainer>
                <FormContainer onSubmit={solve}>
                    <h2>Connectez-vous à votre Compte</h2>
                    <InputContainer>
                        <Label>Nom d'Utilisateur:</Label>
                        <Input
                            name='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Mot de Passe:</Label>
                        <Input
                            name='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputContainer>
                    <SubmitButton type='submit'>Login</SubmitButton>
                </FormContainer>
                <ImageContainer>
                    <StudentImage src="/img/quote.png" alt="Student" />
                </ImageContainer>
            </LoginContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
};

export default LoginEtudiant;