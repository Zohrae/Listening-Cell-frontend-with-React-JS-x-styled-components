import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Fade } from 'react-reveal';
import Navbar from '../Navbar';



const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  
`;

const Title = styled.h2`
  color: var(--primary-color); 
  font-size: 2.2rem;
  text-align: center;
  padding-top: 4%;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 20px;
`;

const SearchIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 20px;
  color: var(--secondary-color);
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  font-size: 16px;
  border: 1px solid var(--pshade62);
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;

`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ImageContainer = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const FAQContainer = styled.div`
  flex: 2;
`;

const Question = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid var(--pshade62);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease, border 0.3s ease;
  background-color: var(--shade111);

  &:hover {
    background-color: var(--shade11);
  }
`;

const Answer = styled.div`
  padding: 20px;
  animation: ${fadeIn} 0.5s ease;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const PlusIcon = styled.i`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 24px;
`;

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(0); // First question is open by default
  const [searchTerm, setSearchTerm] = useState('');

  const toggleQuestion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm)
  );

  return (

    <Container>
      <Navbar />

      <style>
        {`
          @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
        `}
      </style>
      <Title>Questions Fréquemment Posées</Title>
      <SearchBarContainer>
        <SearchIcon className="bx bx-search"></SearchIcon>
        <SearchBar
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBarContainer>
      <Fade duration={1500}>
      <FlexContainer>
        <ImageContainer>
          <img src="img/question.jpg" alt="Question" style={{ width: '100%' }} />
        </ImageContainer>
        <FAQContainer>
          {filteredFaqs.map((faq, index) => (
            <Question key={index} onClick={() => toggleQuestion(index)}>
              {faq.question}
              <PlusIcon style={{color: '#4c8ab2'}} className={activeIndex === index ? 'bx bx-minus' : 'bx bx-plus'}></PlusIcon>
              <Answer isOpen={activeIndex === index}>
                {faq.answer}
              </Answer>
            </Question>
          ))}
        </FAQContainer>
      </FlexContainer>
      </Fade>

    </Container>
  );
};

// Example FAQ data
const faqs = [
  {
    question: 'What is Lorem Ipsum?',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    question: 'Why do we use it?',
    answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  },
  {
    question: 'Where does it come from?',
    answer: 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
  },
  {
    question: 'Where does it come from?',
    answer: 'Contrary to popular belief, Lorem Ipsum is not simply random text.'
  }
];

export default Help;
