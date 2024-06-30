import React from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from '../Navbar';

// Keyframes for bubble animation
const bubbleAnimation = keyframes`
  0% {
    transform: scale(0.3) translate(-50%, -50%);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: scale(0.3) translate(-50%, -50%);
    opacity: 0;
  }
`;

const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: white;
  margin-left: calc(-50vw + 50%);

`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  position: relative;
  left: 5%;
`;

const Title = styled.h2`
  font-size: 2.9rem;
  margin: 0 0 20px 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin: 0 0 20px 0;
  line-height: 1.7;
  text-align: left;
  width: 85%;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background: linear-gradient(45deg, var(--primary-color) 0%, var(--pshade4) 100%);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// Image styling
const Image = styled.img`
  width: 100%;
  height: auto;
`;

// Bubble styling with adjusted sizes and positions
const Bubble = styled.div`
  position: absolute;
  background-color: var(--secondary-color);
  border-radius: 50%;
  animation: ${bubbleAnimation} 5s infinite ease-in-out;
  opacity: 0.7;
  &:nth-child(1) {
    width: 30px;
    height: 30px;
    top: 76%;
    left: 68%;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    width: 25px;
    height: 25px;
    top: 75%;
    left: 75%;
    animation-delay: 1s;
  }
  &:nth-child(3) {
    width: 20px;
    height: 20px;
    top: 80%;
    left: 73%;
    animation-delay: 2s;
  }
`;

const Collaborate = () => {
  return (
    <PageContainer>
      <Navbar />
      <TextContainer>
        <Bubble />
        <Bubble />
        <Bubble />
        <Title>Voulez-vous collaborer avec nous ?</Title>
        <Description>
          Dans notre cellule d'écoute présente dans notre école, nous organisons des événements et <br />
          accueillons des conférenciers et des coachs pour donner des conférences et des ateliers. <br />
          Ces événements visent à améliorer les connaissances et les compétences de nos étudiants. Ici, nous vous offrons l'opportunité de nous contacter et de collaborer. 
          <br /> Laissons la connaissance se dévoiler !
        </Description>
        <Button>Commencer</Button>
      </TextContainer>
      <ImageContainer>
        <Image src="img/collaboration.jpg" alt="Collaboration" />
      </ImageContainer>
    </PageContainer>
  );
};

export default Collaborate;
