import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Zoom } from 'react-reveal';

const GuideContainer = styled.div`
  text-align: center;
  padding: 20px;
  // background-color: #fbefe9;
  background-color: var(--shade11);

  width: 100vw; 
  margin-left: calc(-50vw + 50%); 
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;



const StepCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 2px var(--secondary-color);
  width: 180px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const StepTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  font-size: 14px;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 2px dashed var(--primary-color);
  border-radius: 50%;
  position: relative;

  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-left: 2px solid var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    transform: rotate(-45deg);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -6px;
    margin-left: -6px;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 25px; /* Increased border radius */
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: var(--pshade3);
  }
`;

// Component
const StepByStepGuide = () => {
  return (
    <GuideContainer>
      <Title>Guide Étape par Étape de Notre Plateforme</Title>
      <Button>Comment ça marche</Button>
      <StepsContainer>
        <Zoom delay={0}>
          <StepCard>
            <StepTitle>Visualisation Mise à Jour</StepTitle>
            <StepDescription>Vérifiez notre contenu</StepDescription>
          </StepCard>
        </Zoom>
        <Arrow />
        <Zoom delay={400}>
          <StepCard>
            <StepTitle>Inscription en tant qu'Étudiant</StepTitle>
            <StepDescription>Créez votre compte</StepDescription>
          </StepCard>
        </Zoom>
        <Arrow />
        <Zoom delay={600}>
          <StepCard>
            <StepTitle>Demandez</StepTitle>
            <StepDescription>Contactez votre conseiller</StepDescription>
          </StepCard>
        </Zoom>
        <Arrow />
        <Zoom delay={900}>
          <StepCard>
            <StepTitle>Obtenir Votre Rendez-vous</StepTitle>
            <StepDescription>Planifiez une réunion</StepDescription>
          </StepCard>
        </Zoom>
        <Arrow />
        <Zoom delay={1200}>
          <StepCard>
            <StepTitle>Messagerie</StepTitle>
            <StepDescription>Discuter avec Vos Conseillers</StepDescription>
          </StepCard>
        </Zoom>
      </StepsContainer>
    </GuideContainer>
  );
};

export default StepByStepGuide;
