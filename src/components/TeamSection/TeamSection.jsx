import React, { useState, useEffect } from 'react';
import './teamSection.css';

const TeamSection = () => {
  const [advisors, setAdvisors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000/api/conseillers/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch advisors');
        }
        return response.json();
      })
      .then(data => {
        console.log('Advisors fetched successfully:', data);
        setAdvisors(data);
      })
      .catch(error => console.error('Error fetching advisors:', error));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? advisors.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % advisors.length
    );
  };

  const getAdvisorsToDisplay = () => {
    if (advisors.length <= 3) {
      return advisors;
    }

    const startIndex = currentIndex % advisors.length;
    return [
      advisors[startIndex],
      advisors[(startIndex + 1) % advisors.length],
      advisors[(startIndex + 2) % advisors.length],
    ];
  };

  return (
    <div id='team' className="container">
        <div className="header-container">
          <h2 className="header">Notre Équipe de Conseillers</h2>
          <div className="bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
        </div>
        <p className="description">
          Rencontrez notre équipe de conseillers dévoués,
          prêts à vous aider avec leur expertise et leur expérience.
        </p>
      <div className="sub-container">
        {getAdvisorsToDisplay().map(advisor => (
          <div key={advisor._id} className="teams">
            <img src="img/sidna.jpg" alt="" />
            <div className="name">{advisor.Prenom} {advisor.Nom}</div>
            <div className="desig">{advisor.department}</div>
            <div className="about">{advisor.email}</div>
            <div className="social-links">
              <a href={`https://www.facebook.com/${advisor.Gmail}`}><i className="fa fa-facebook"></i></a>
              <a href={`https://www.instagram.com/${advisor.Instagram}`}><i className="fa fa-instagram"></i></a>
              <a href={`https://www.linkedin.com/in/${advisor.Linkedin}`}><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button className="prev" onClick={handlePrev}>❮</button>
        <button className="next" onClick={handleNext}>❯</button>
      </div>
    </div>
  );
};

export default TeamSection;
