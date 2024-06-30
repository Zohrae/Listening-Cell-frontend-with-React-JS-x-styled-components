import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const defaultImage = "img/avatars/who.png";

const TestimonialCarousel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/feedbacks/`);
        if (response.ok) {
          const data = await response.json();
          const filteredFeedbacks = data.filter(feedback => feedback.valide_par_admin);
          const feedbacksWithImages = await Promise.all(filteredFeedbacks.map(async (feedback) => {
            const studentResponse = await fetch(`http://127.0.0.1:8000/api/etudiants/${feedback.etudiant}/`);
            if (studentResponse.ok) {
              const studentData = await studentResponse.json();
              return {
                ...feedback,
                etudiant: `${studentData.Nom} ${studentData.Prenom}`,
                image: studentData.image || defaultImage
              };
            } else {
              console.error('Failed to fetch student data:', studentResponse.statusText);
              return {
                ...feedback,
                image: defaultImage
              };
            }
          }));
          setFeedbacks(feedbacksWithImages);
        } else {
          console.error('Failed to fetch feedbacks:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % Math.max(feedbacks.length - 2, 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [feedbacks]);

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  return (
    <Container>
      <TitleTest>Découvrez les témoignages de nos étudiants sur nos événements et services</TitleTest> 
      <TestimonialWrapper>
        {feedbacks.slice(current, current + 3).map((feedback, index) => (
          <TestimonialCard key={index} isMiddle={index === 1}>
            <TestimonialContent>
              <TestimonialImage src={feedback.image} alt={feedback.etudiant} />
              <TestimonialText>{feedback.contenu}</TestimonialText>
              <TestimonialAuthor>- {feedback.etudiant}</TestimonialAuthor>
            </TestimonialContent>
          </TestimonialCard>
        ))}
      </TestimonialWrapper>
      <Dots>
        {feedbacks.slice(0, feedbacks.length - 2).map((_, index) => (
          <Dot key={index} active={current === index} onClick={() => handleDotClick(index)} />
        ))}
      </Dots>
    </Container>
  );
}

export default TestimonialCarousel;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; 
  margin-left: calc(-50vw + 50%);
  position: relative; /* Add this line */
  padding-top: 7%;
  padding-BOTTOM: 4%;

    @media (max-width: 768px) {
    padding-top: 10%;
    padding-bottom: 6%;
  }
`;



const revealAnimation = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const TestimonialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  height: 300px;
  overflow: hidden;
  position: relative;

    @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;

const TestimonialCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 30%;
  padding: 20px;
  margin: 10px;
  transition: all 0.3s ease;
  animation: ${revealAnimation} 1s ease;
  opacity: ${props => props.isMiddle ? '1' : '0.5'};
  transform: ${props => props.isMiddle ? 'scale(1.05)' : 'scale(1)'};
  &:hover {
    transform: ${props => props.isMiddle ? 'translateY(-5px) scale(1.05)' : 'none'};
    box-shadow: ${props => props.isMiddle ? '0px 6px 20px rgba(0, 0, 0, 0.2)' : '0px 4px 15px rgba(0, 0, 0, 0.1)'};
  }

    @media (max-width: 768px) {
    width: 80%;
    margin: 15px 0;
    opacity: 1;
    transform: scale(1);
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    }
  }
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TestimonialImage = styled.img`
  width: 60px;
  height: 60px;
  border: 1px solid var(--secondary-color);
  border-radius: 50%;
  margin-bottom: 10px;
`;

const TestimonialText = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
`;

const TestimonialAuthor = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: var(--primary-color);
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Dot = styled.span`
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: ${props => props.active ? '#000' : '#bbb'};
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
`;


const TitleTest = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;

    @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
    padding: 0 20px;
  }
`;

