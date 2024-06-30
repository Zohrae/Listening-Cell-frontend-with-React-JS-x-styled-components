import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const CollabForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise_associee: '',
    poste_occupe: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/collaborateurs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Informations soumises avec succès!');
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          entreprise_associee: '',
          poste_occupe: ''
        });
      } else {
        alert('Erreur lors de la soumission des informations.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la soumission des informations.');
    }
  };

  return (
    <FormContainer>
      <style>
        {`
          @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
        `}
      </style>
      <FormTitle>Formulaire de Collaboration</FormTitle>
      <FormSubtitle>Collaborer et attendre notre réponse dans votre email.</FormSubtitle>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <LabelContainer>
              <Icon className='bx bx-user'></Icon>
              <InputLabel>Nom:</InputLabel>
            </LabelContainer>
            <InputContainer>
              <Input type="text" name="nom" value={formData.nom} onChange={handleChange} />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <LabelContainer>
              <Icon className='bx bx-user'></Icon>
              <InputLabel>Prénom:</InputLabel>
            </LabelContainer>
            <InputContainer>
              <Input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <LabelContainer>
              <Icon className='bx bx-envelope'></Icon>
              <InputLabel>Email:</InputLabel>
            </LabelContainer>
            <InputContainer>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </InputContainer>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <LabelContainer>
              <Icon className='bx bx-phone'></Icon>
              <InputLabel>Numéro de Téléphone:</InputLabel>
            </LabelContainer>
            <InputContainer>
              <Input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <LabelContainer>
              <Icon className='bx bx-building'></Icon>
              <InputLabel>Entreprise Associée:</InputLabel>
            </LabelContainer>
            <InputContainer>
              <Input type="text" name="entreprise_associee" value={formData.entreprise_associee} onChange={handleChange} />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <LabelContainer>
              <Icon className='bx bx-briefcase'></Icon>
              <InputLabel>Poste Occupé/Travail:</InputLabel>
            </LabelContainer>
            <InputContainer>
              <Input type="text" name="poste_occupe" value={formData.poste_occupe} onChange={handleChange} />
            </InputContainer>
          </FormGroup>
        </FormRow>
        <SubmitButton type="submit">Envoyer</SubmitButton>
      </Form>
    </FormContainer>
  );
};



const FormContainer = styled.div`
  background: var(--shade11);
  padding: 20px;
  width: 100vw;
  text-align: center;
  margin-left: calc(-50vw + 50%);

`;

const FormTitle = styled.h2`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 20px;
  margin-left: -0.5%;

`;

const FormSubtitle = styled.p`
  color: gray;
  text-align: center;
  margin-bottom: 20px;
  margin-left: -0.5%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-left: 8.5%;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  &:first-child {
    margin-right: 10px;
  }

  &:last-child {
    margin-left: 10px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Icon = styled.i`
  color: var(--secondary-color);
  margin-right: 10px;
`;

const InputLabel = styled.label`
  color: var(--secondary-color);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  width: 200px;
  cursor: pointer;
  margin-right: 75%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--shade2);
  }
`;

export default CollabForm;
