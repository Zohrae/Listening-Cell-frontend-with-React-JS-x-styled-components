import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import AboutUs from '../About/About';
import './home.css'

const Home = () => {
    useEffect(() => {
        const quotes = ["Have a nice day!", "You're amazing!", "Keep smiling!"];
        const quoteElement = document.getElementById('quote');

        let index = 0;
        let isDeleting = false;
        let text = '';

        function type() {
            const currentQuote = quotes[index];
            let textSize = parseInt(getComputedStyle(quoteElement).fontSize);
            
            if (isDeleting) {
                textSize -= 2; // Decrease font size for deletion effect
            } else {
                textSize += 2; // Increase font size for typing effect
            }
            
            quoteElement.style.fontSize = textSize + "px"; // Update font size
            
            let typingSpeed = isDeleting ? 50 : 150;
        
            if (!isDeleting && textSize >= 36) { // Change direction when font size reaches certain threshold
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && textSize <= 24) { // Change direction when font size reaches certain threshold
                isDeleting = false;
                index = (index + 1) % quotes.length;
                typingSpeed = 500;
            }
        
            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
        document.body.id = 'home-body';
        document.body.className = 'home-body';

        // Clean up function to remove ID and class when the component unmounts
        return () => {
            document.body.id = '';
            document.body.className = '';
        };
    }, []);

    return (
        <div id="home" className="home">
            <Navbar />

            <div className="overlay"></div>
            <img 
                src="/img/bg.png" 
                alt="Background" 
                className="background-image" 
            />
            <div className="text-container">
                <h1 className="welcome-text">Welcome</h1>
                <p id="quote" className="animated-quote"></p>
                <p className="static-quote">"Passez une belle journée !"</p>
                <p className="paragraph">Dans le voyage de la vie, des défis peuvent surgir,
                <br /> mais dans chaque défi se trouve une opportunité de croissance.
                <br /> Croyez en votre capacité à surmonter tout obstacle qui se présente à vous.</p>
                <button className="more-button">Plus</button>
            </div>

            <div id="about-section">
                <AboutUs /> 
            </div>
            
        </div>

    );
    
};


export default Home;
