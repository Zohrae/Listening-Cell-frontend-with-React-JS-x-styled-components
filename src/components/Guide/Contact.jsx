import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Contact = () => {
  return (
    <ContactContainer>
      <style>
        {`
          @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
        `}
      </style>
      <Wrapper>
        <ImageContainer>
          <img src="img/contact.jpg" alt="Contact" />
        </ImageContainer>
        <FormContainer>
          <Title>Avez Vous des Questions?</Title>
          <Subtitle>Feel free to reach out to us by filling the form below.</Subtitle>
          <Form>
            <Input type="text" placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <Textarea placeholder="Your Message"></Textarea>
            <Button type="submit">Send</Button>
          </Form>
        </FormContainer>
      </Wrapper>
    </ContactContainer>
  );
};

export default Contact;

const ContactContainer = styled.div`
  width: 100%;
  padding: 20px;

`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: var(--shade111); 
  height: 480px;
  border: 1px solid var(--shade19);
  border-radius: 15px;
`;

const Title = styled.h2`
  color: var(--primary-color); 
  font-size: 2.2rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #696969;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--shade109);
  border-radius: 4px;
  transition: all 0.3s ease;
  &:hover, &:focus {
    border-color: var(--pshade62); /* Light maroon border on hover and focus */
    box-shadow: 0 0 5px rgb(230, 193, 177);
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--shade109);
  border-radius: 4px;
  transition: all 0.3s ease;
  &:hover, &:focus {
    border-color: var(--pshade62); /* Light maroon border on hover and focus */
    box-shadow: 0 0 5px rgb(230, 193, 177);
    outline: none;
  }
  height: 175px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: var(--pshade1); /* Light maroon background */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--pshade2); /* Darker maroon on hover */
  }
`;
