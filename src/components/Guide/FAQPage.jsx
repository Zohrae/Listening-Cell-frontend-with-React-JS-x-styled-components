import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const bubbleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0) translateX(-50px);
  }
  50% {
    opacity: 1;
    transform: translateY(-50px) translateX(-50px);
  }
  100% {
    opacity: 0;
    transform: translateY(0) translateX(-50px);
  }
`;

const Bubble = styled.div`
  background-color: var(--primary-color);
  border-radius: 50%;
  position: absolute;
  animation: ${bubbleAnimation} 3s infinite ease-in-out;

  &:nth-child(1) { width: 15px; height: 15px; left: 100px; animation-delay: 0s; }
  &:nth-child(2) { width: 20px; height: 20px; left: 70px; animation-delay: 1s; }
  &:nth-child(3) { width: 12px; height: 12px; left: 90px; animation-delay: 2s; }
  &:nth-child(4) { width: 18px; height: 18px; left: 140px; animation-delay: 1.5s; }
  &:nth-child(5) { width: 25px; height: 25px; left: 170px; animation-delay: 0.5s; }
  &:nth-child(6) { width: 15px; height: 15px; right: 40px; animation-delay: 0.5s; }
  &:nth-child(7) { width: 20px; height: 20px; right: 70px; animation-delay: 1.5s; }
  &:nth-child(8) { width: 12px; height: 12px; right: 90px; animation-delay: 2.5s; }
  &:nth-child(9) { width: 18px; height: 18px; right: 120px; animation-delay: 1s; }
  &:nth-child(10) { width: 25px; height: 25px; right: 200px; animation-delay: 2s; }
`;

const Container = styled.div`
  width: 100vw;
  padding: 20px;
  text-align: center;
  background-color: var(--shade10);
  margin-left: calc(-50vw + 50%);
  padding-top: 7%;
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.9rem;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  border: 1px solid var(--secondary-color);
  background-color: var(--secondary-color);
  color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    background-color: var(--secondary-color);
    transform: scale(1.05);
    border: none;
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const CategoryCard = styled.div`
  background-color: var(--shade11);
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  width: 20%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
`;

const CategorySubtitle = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
`;

const IconImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--shade4);
  }
`;


const FAQPage = () => {
  const categories = [
    {
      title: 'Appelez-nous',
      subtitle: 'Contactez-nous pour toute demande ou assistance.',
      articles: 3,
      icon: '/img/callfaq.png',
    },
    {
      title: 'Prendre Rendez-vous',
      subtitle: 'Planifiez une réunion ou une démonstration avec notre équipe.',
      articles: 4,
      icon: 'img/calendarfaq.png',
    },
    {
      title: 'FAQ Générale',
      subtitle: 'Questions fréquemment posées sur nos services et politiques.',
      articles: 5,
      icon: 'img/faq.png',
    },
  ];

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/faq');
  };

  return (
    <Container>
      <TitleContainer>
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
        <Title>Comment pouvons-nous vous aider ?</Title>
      </TitleContainer>
      <Subtitle>Tout ce que vous devez savoir sur tous les sujets</Subtitle>
      <SearchContainer>
        <SearchInput type="text" placeholder="Vous avez une question ? Demandez ou entrez un terme de recherche." />
        <SearchButton>RECHERCHE</SearchButton>
      </SearchContainer>
      <CategoriesContainer>
        
        {categories.map((category, index) => (
    
          <CategoryCard key={index}>
            <IconImage src={category.icon} alt={category.title} />
            <CategoryTitle>{category.title}</CategoryTitle>
            <CategorySubtitle>{category.subtitle}</CategorySubtitle>
            <ActionButton onClick={handleNavigate}>En savoir plus</ActionButton>
          </CategoryCard>
        ))}
      </CategoriesContainer>
    </Container>
  );
};

export default FAQPage;
