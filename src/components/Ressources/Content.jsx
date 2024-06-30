import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Slide from 'react-reveal/Slide';

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
`;

// Container for the section
const Container = styled.div`
  width: 100vw;
  margin: 0;
  padding: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-left: calc(-50vw + 50%);
`;

// Title for the section
const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
`;

// Container for the images and their descriptions
const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  position: relative;
`;

// Individual image container
const ImageContainer = styled.div`
  position: relative;
  text-align: center;
`;

// Description below each image
const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 15px;
`;

// Individual image styling with varying sizes and animation
const Image = styled.img`
  width: ${({ width }) => width}px;
  height: 200px;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
    filter: brightness(110%);
  }
  border-radius: 5px;
  box-shadow: 1px 0 2px var(--secondary-color); /* Added box-shadow */
`;

// Date styling
const DateText = styled.span`
  font-size: 0.9rem;
  color: #777;
  margin-right: 5px;
//   text-align: left;
`;

const EventButton = styled.button`
  background-color: var(--primary-color);
  border: none;
  color: white;
  padding: 5px 10px; 
  text-align: center;
  text-decoration: none;
  margin-top: 7px;
  display: inline-block;
  font-size: 0.8rem; /* Reduced font size */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: var(--pshade3);
  }
`;


const Bubble = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: var(--secondary-color);
  border-radius: 50%;
  animation: ${bubbleAnimation} 5s infinite;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  animation-delay: ${({ delay }) => delay}s;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: row; /* Make it row instead of column */
  align-items: center;
  justify-content: center; 
  width: 400px;
`;



// Button above each image
const ButtonAboveImage = styled.button`
  position: absolute;
  top: -42px; /* Adjust this value as needed */
  left: 9%;
  transform: translateX(-50%);
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 28px; /* Adjust size as needed */
    height: 28px;
  }

  &:hover img {
    filter: brightness(1.2); /* Optional: make the icon brighter on hover */
  }
`;


const Bubbles = () => {
  const bubbles = Array.from({ length: 6 }).map((_, i) => (
    <Bubble
      key={i}
      size={Math.random() * 20 + 10} // Random size between 10 and 30
      top={Math.random() * 100}
      left={i < 3 ? Math.random() * 10 : 90 + Math.random() * 10} // 3 bubbles on left, 3 on right
      delay={Math.random() * 5}
    />
  ));
  return <>{bubbles}</>;
};

const Content = () => {
    const [resources, setResources] = useState([]);
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/ressources/') // Endpoint pour les ressources
        .then(response => response.json())
        .then(data => setResources(data))
        .catch(error => console.error('Error fetching resources:', error));
    }, []);

    const handleReadMore = (url) => {
        window.open(url, '_blank');
    };
  
    return (
      <Container>
        <style>
          {`
            @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
          `}
        </style>
        <Title>Mental Topics</Title>
        <ImagesContainer>
          {resources.map((resource, index) => (
            <Slide key={resource.id} left delay={index * 50}>
              <ImageContainer>
                <ButtonAboveImage>
                  <img src="img/done.png" alt="Icon" />
                </ButtonAboveImage>
                <Image src={resource.image} alt={resource.titre} width={360} /> {/* Affichez l'image de la ressource */}
                <Description>{resource.titre}</Description> {/* Affichez le titre de la ressource */}
                <DateContainer>
                  <DateText>{resource.description}</DateText> {/* Affichez la description de la ressource */}
                </DateContainer>
                <EventButton onClick={() => handleReadMore(resource.url)}>Lire Plus</EventButton>
                </ImageContainer>
            </Slide>
          ))}
        </ImagesContainer>
      </Container>
    );
  };
  
  export default Content;