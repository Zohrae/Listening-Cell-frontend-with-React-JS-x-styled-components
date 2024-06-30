import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Slide from 'react-reveal/Slide';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 15px;
`;

// Individual image styling with varying sizes and animation
const Image = styled.img`
  width: ${({ width }) => width}px;
  height: auto;
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
`;

// Read More button styling
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

const DateIcon = styled.i`
  color: var(--secondary-color);
  margin-right: 5px;
`;

// Bubble styling and animation
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
  justify-content: center; /* Horizontally center the content */
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

const ModalButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--shade2);
  }
`;

const Textarea = styled.textarea`
  width: 300px;
  height: 170px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  outline: none;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px; /* Adjust the width as needed */
  height: 20px; /* Adjust the height as needed */
  cursor: pointer;
  background-color: transparent; /* Remove background */
  border: none; /* Remove border */
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

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isVisiteur, setIsVisiteur] = useState(false);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/events/')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
    setIsVisiteur(false);
    setComment('');
  };

  const handleEtudiantClick = () => {
    window.alert('Vous devez se connecter en tant qu étudiant pour faire un commentaire sur l événement');
    navigate('/getin');
  };

  const handleVisiteurClick = () => {
    setIsVisiteur(true);
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

    return (
        <Container id='oureventspub'>
            <style>
            {`
                @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
            `}
            </style>
          <Title>Nos Événements</Title>
          <ImagesContainer>
        {events.map((event, index) => (
          <Slide key={event.id} left delay={index * 50}>
          <ImageContainer>
          <ButtonAboveImage>
                <img src="img/done.png" alt="Icon" />
              </ButtonAboveImage> 
              <Image src={event.image} alt={event.nomEvenement} width={360} />
              <Description>{event.nomEvenement}</Description>
              <DateContainer>
                <DateIcon className="bx bxs-calendar"></DateIcon>
                <DateText>{formatDate(event.date)}</DateText>
              </DateContainer>
              <EventButton onClick={() => openModal(event)}>Commenter</EventButton>
            </ImageContainer>
          </Slide>
        ))}
      </ImagesContainer>
          <Bubbles />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Comment Modal"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
              }
            }}
          >
            {selectedEvent && (
              <>
                <CloseButton src="img/x.png" alt="Close" onClick={closeModal} />
                <h2>{selectedEvent.nomEvenement}</h2>
                {!isVisiteur ? (
                  <div>
                    <ModalButton onClick={handleVisiteurClick}>Visiteur</ModalButton>
                    <ModalButton onClick={handleEtudiantClick}>Etudiant</ModalButton>
                  </div>
                ) : (
                  <div>
                    <Textarea
                      name="commentaire"
                      placeholder="Commentaire"
                      value={comment}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </>
            )}
          </Modal>
        </Container>
      );
    };

export default EventsPage;
