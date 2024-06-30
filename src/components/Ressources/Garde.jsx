import React from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from '../Navbar';


const bubbleAnimation = keyframes`
    0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
    25% {
        transform: translate(40px, -40px) scale(1);
        opacity: 1;
    }
    50% {
        transform: translate(80px, 0) scale(1);
        opacity: 1;
    }
    75% {
        transform: translate(40px, 40px) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
    }
`;

const BubbleLineAnimation = keyframes`
    0% {
        transform: translateY(0) translateX(0) scale(0.5);
        opacity: 0;
    }
    50% {
        transform: translateY(-100px) translateX(50px) scale(1.2);
        opacity: 1;
    }
    100% {
        transform: translateY(0) translateX(100px) scale(0.5);
        opacity: 0;
    }
`;

const Garde = () => {
    return (
        <Container>
            <Navbar />
            <Content>
                <LeftSide>
                    <Title>Your Mental Health Matters !</Title>
                    <MotivationText>Your daily dose of motivation to conquer the world!</MotivationText>
                    <Description>
                        This page is designed to provide you with mental health information about various topics and issues that can affect students in their academic lives. Our website offers insights, resources, and support to help you navigate the challenges and enhance your well-being.
                    </Description>
                    <Button>Get Started</Button>
                </LeftSide>
                
                <RightSide>
                    <Illustration src="img/mental.png" alt="Mental Illustration" />

                </RightSide>
                <BubbleLine>
                    <Bubble style={{ animationDelay: '0s', width: '10px', height: '10px' }} />
                    <Bubble style={{ animationDelay: '1s', width: '15px', height: '15px' }} />
                    <Bubble style={{ animationDelay: '2s', width: '20px', height: '20px' }} />
                    <Bubble style={{ animationDelay: '3s', width: '12px', height: '12px' }} />
                    <Bubble style={{ animationDelay: '4s', width: '15px', height: '15px' }} />
                    <Bubble style={{ animationDelay: '3s', width: '18px', height: '18px' }} />
                </BubbleLine>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    position: relative;
`;

const LeftSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding: 20px;
`;

const Button = styled.button`
    background: linear-gradient(to right, var(--secondary-color), var(--shade3));
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 1em;
    cursor: pointer;
    transition: box-shadow 0.6s ease;
    margin-bottom: 20px;
    width: 150px;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const Title = styled.h2`
    font-size: 3em;
    margin-bottom: 20px;
    text-align: left;
`;

const MotivationText = styled.p`
    font-size: 1.2em;
    text-align: left;
    
`;

const RightSide = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Illustration = styled.img`
    max-width: 100%;
    height: auto;
`;

const Description = styled.p`
    font-size: 1em;
    margin-bottom: 20px;
    text-align: left;
    max-width: 400px;
`;


const BubbleLine = styled.div`
    position: absolute;
    top: 35%;
    left: 40%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    pointer-events: none;
`;

const Bubble = styled.div`
    border-radius: 50%;
    background-color: var(--shade2);
    margin: 0 10px;
    animation: ${BubbleLineAnimation} 5s infinite;
`;

export default Garde;
