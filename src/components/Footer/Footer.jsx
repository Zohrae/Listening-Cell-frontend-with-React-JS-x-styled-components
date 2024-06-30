import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: #fff;
  padding: 50px 0;
  width: 100%;
  margin: 0;
  left: 0;
  right: 0;
  position: absolute; 
  z-index: 1; /* Added z-index */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Column = styled.div`
  flex: 1;
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
  }
`;

const Links = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
    cursor: pointer; // Added cursor pointer

`;

const SubscribeButton = styled.button`
  background-color: var(--secondary-color);
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #356a8c; 
    transform: scale(0.9); 
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SocialIconLink = styled.a`
  color: black;
  font-size: 1.5rem;
  margin: 0 10px;
  cursor: pointer; // Added cursor pointer
  transition: color 0.3s ease, transform 0.3s ease; /* Added transform transition */
  transform-origin: center; /* Ensure transform origin is centered */

  &:hover {
    color: #356a8c; 
    transform: scale(1.3); 
  }
`;

const CopyRight = styled.p`
  font-size: 0.8rem;
  margin-top: 20px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  background-color: var(--shade10);
  color: black;
  width: 80%; /* Keep the width as specified */
  border-radius: 5px;
  position: relative; /* Changed to relative */
  z-index: 2; /* Added z-index to ensure it is above other elements */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <style>
        {`
          @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
        `}
      </style>
      <Wrapper>
        <Column>
          <Title>À Propos de Nous</Title>
          <Links>
            <ListItem>Présentation de l'Entreprise</ListItem>
            <ListItem>Notre Équipe</ListItem>
            <ListItem>Contacts</ListItem>
          </Links>
        </Column>
        <Column>
          <Title>Nos Événements</Title>
          <Links>
            <ListItem>Événements à Venir</ListItem>
            <ListItem>Événements Passés</ListItem>
            <ListItem>Qu'est-ce qu'ils disent?</ListItem>
            <ListItem>Inscrivez-vous Maintenant</ListItem>
          </Links>
        </Column>
        <Column>
          <Title>Liens Utiles</Title>
          <Links>
            <ListItem>Se Connecter</ListItem>
            <ListItem>Blog Mental</ListItem> 
            <ListItem>Collaborer avec Nous</ListItem> 
            <ListItem>FAQs</ListItem>
          </Links>
        </Column>
        <Column>
          <Title>S'abonner</Title>
          <p>Recevez des mises à jour sur nos derniers événements et nouvelles.</p>
          <SubscribeButton>S'abonner</SubscribeButton>
        </Column>
      </Wrapper>
      <BottomContainer>
        <SocialIcons>
          <SocialIconLink href="#"><i className='bx bxl-facebook'></i></SocialIconLink>
          <SocialIconLink href="#"><i className='bx bxl-instagram'></i></SocialIconLink>
          <SocialIconLink href="#"><i className='bx bxl-linkedin'></i></SocialIconLink>
        </SocialIcons>
        <CopyRight>&copy; 2024 Cellule d'Écoute . Tous droits réservés.</CopyRight>
        <h2>L'École Supérieure de Technologie - Safi</h2>
      </BottomContainer>
    </FooterContainer>
  );
};

export default Footer;
