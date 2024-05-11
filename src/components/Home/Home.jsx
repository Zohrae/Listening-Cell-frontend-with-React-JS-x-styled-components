import React, { useEffect } from 'react';

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
    }, []);

    return (
        <div className="home">
            <div className="overlay"></div>
            <img 
                src="/img/bg.png" 
                alt="Background" 
                className="background-image" 
            />
            <div className="text-container">
                <h1 className="welcome-text">Welcome</h1>
                <p id="quote" className="animated-quote"></p>
                <p className="static-quote">"Have a beautiful day ahead!"</p>
                <p className="paragraph">In the journey of life, challenges may arise, 
               <br /> but within each challenge lies an opportunity for growth. 
              <br /> Believe in your ability to overcome any obstacle that comes your way.</p>
                <button className="more-button">More</button>
            </div>
        </div>
    );
};

export default Home;
