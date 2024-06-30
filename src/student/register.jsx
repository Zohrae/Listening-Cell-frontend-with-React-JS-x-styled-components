import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterBody = styled.div`
`;

const RegisterContainer = styled.div`
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RegisterFormContainer = styled.form`
    width: 550px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    @media screen and (max-width: 768px) {
        width: 80%;
        max-width: 350px;
    }
`;

const RegisterInputGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

const RegisterInputContainer = styled.div`
    margin-bottom: 20px;
    width: 48%;
`;

const RegisterInputContainerEmail = styled(RegisterInputContainer)`
    margin-bottom: 20px;
    width: 100%;
`;

const RegisterLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    color: var(--primary-color);
    text-align: left;
`;

const RegisterInput = styled.input`
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

const RegisterSubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: var(--primary-color);
    border: none;
    border-radius: 15px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var(--pshade3);
    }
`;

const RegisterErrorMessage = styled.p`
    color: red;
    margin-bottom: 10px;
`;


const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const ModalInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;


const RegisterEtudiant = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nomUtilisateur: '',
        motDePasse: '',
        email: '',
        phoneNumber: '',
        Nom: '',
        Prenom: '',
        major: '',
        age: '',
        image: '',
    });
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalInputValue, setModalInputValue] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Handling the file input
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleModalInputChange = (e) => {
        setModalInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        switch (step) {
            case 1:
                setStep(2);
                break;
            case 2:
                // Check if the email is an academic email
                if (!formData.email.endsWith('@uca.ac.ma')) {
                    setError('L\'email doit être un email académique (exemple: example@uca.ac.ma)');
                    return;
                }
                
                const formDataToSend = new FormData();
                for (const key in formData) {
                    formDataToSend.append(key, formData[key]);
                }
    
                try {
                    const response = await fetch('http://localhost:8000/api/etudiants/', {
                        method: 'POST',
                        body: formDataToSend,
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        setShowModal(true);
                    } else {
                        const data = await response.json();
                        setError(data.detail || 'Unknown error occurred');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setError('An unexpected error occurred');
                }
                break;
            default:
                break;
        }
    };
    

    const handleModalSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/etudiants/${formData.nomUtilisateur}/verify/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ verification_code: modalInputValue }),
            });

            if (response.ok) {
                closeModal();
            } else {
                const data = await response.json();
                setError(data.detail || 'Verification failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/getin');
    };

    return (
        <RegisterBody>
            <RegisterContainer>
                <RegisterFormContainer onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                        {step === 2 && (
                            <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', marginLeft: '10px', marginTop:'-10px' }}>
                                <img src="img/back.png" alt="Go Back" style={{ width: '20px' }} />
                            </button>
                        )}
                     <h2 style={{ margin: '0', textAlign:'center' }}>Inscription des étudiants - Étape {step}</h2>

                    </div>
                    {step === 1 && (
                        <>
                            <RegisterInputGroup>
                                <RegisterInputContainer>
                                    <RegisterLabel>Nom:<span style={{color: 'red'}}> *</span></RegisterLabel>
                                    <RegisterInput
                                        name='Nom'
                                        type='text'
                                        value={formData.Nom}
                                        onChange={handleChange}
                                        required
                                    />
                                </RegisterInputContainer>
                                <RegisterInputContainer>
                                    <RegisterLabel>Prénom:<span style={{color: 'red'}}> *</span></RegisterLabel>
                                    <RegisterInput
                                        name='Prenom'
                                        type='text'
                                        value={formData.Prenom}
                                        onChange={handleChange}
                                        required
                                    />
                                </RegisterInputContainer>
                            </RegisterInputGroup>
                            <RegisterInputGroup>
                                <RegisterInputContainer>
                                    <RegisterLabel>N° Télé:<span style={{color: 'red'}}> *</span></RegisterLabel>
                                    <RegisterInput
                                        name='phoneNumber'
                                        type='tel'
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </RegisterInputContainer>
                                <RegisterInputContainer>
                                    <RegisterLabel>Age:<span style={{color: 'red'}}> *</span></RegisterLabel>
                                    <RegisterInput
                                        name='age'
                                        type='number'
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </RegisterInputContainer>
                            </RegisterInputGroup>
                            <RegisterInputGroup>
                                <RegisterInputContainer>
                                    <RegisterLabel>Filière:<span style={{color: 'red'}}> *</span></RegisterLabel>
                                    <RegisterInput
                                        name='major'
                                        type='text'
                                        value={formData.major}
                                        onChange={handleChange}
                                        required
                                    />
                                </RegisterInputContainer>
                                <RegisterInputContainer>
                                    <RegisterLabel>Image:</RegisterLabel>
                                    <RegisterInput
                                        name='image'
                                        type='file'
                                        onChange={handleChange}
                                    />
                                </RegisterInputContainer>
                            </RegisterInputGroup>

                        </>
                    )}

                    {step === 2 && (
                        <>
                        <RegisterInputGroup>
                            <RegisterInputContainer>
                                <RegisterLabel>Nom d'Utilisateur:<span style={{color: 'red'}}> *</span></RegisterLabel>
                                <RegisterInput
                                    name='nomUtilisateur'
                                    type='text'
                                    value={formData.nomUtilisateur}
                                    onChange={handleChange}
                                    required
                                />
                            </RegisterInputContainer>
                            <RegisterInputContainer>
                                <RegisterLabel>Mot de Passe:<span style={{color: 'red'}}> *</span></RegisterLabel>
                                <RegisterInput
                                    name='motDePasse'
                                    type='password'
                                    value={formData.motDePasse}
                                    onChange={handleChange}
                                    required
                                />
                            </RegisterInputContainer>
                        </RegisterInputGroup>
                        <RegisterInputContainerEmail>
                            <RegisterLabel>Email:<span style={{color: 'red'}}> *</span></RegisterLabel>
                            <RegisterInput
                                name='email'
                                type='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <p style={{ fontSize: '14px', color: '#4c8ab2' }}>L'email doit être un email académique, exemple: example@uca.ac.ma</p>
                        </RegisterInputContainerEmail>

                        </>
                    )}
                    <RegisterSubmitButton type='submit'>
                        {step === 2 ? 'Register' : 'Continue'}
                    </RegisterSubmitButton>
                </RegisterFormContainer>
            </RegisterContainer>
            {error && <RegisterErrorMessage>{error}</RegisterErrorMessage>}
            {showModal && (
                <ModalBackdrop>
                    <ModalContent>
                        <RegisterLabel>Entrez le Code de Vérification:</RegisterLabel>
                        <RegisterInput
                            type='text'
                            value={modalInputValue}
                            onChange={handleModalInputChange}
                        />
                        <RegisterSubmitButton style={{marginTop: '10px'}} onClick={handleModalSubmit}>Valider</RegisterSubmitButton>
                        
                    </ModalContent>
                </ModalBackdrop>
            )}
        </RegisterBody>
    );
};

export default RegisterEtudiant;





