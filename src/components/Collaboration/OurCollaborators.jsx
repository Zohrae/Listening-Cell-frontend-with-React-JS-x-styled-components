import React, { useState } from 'react';
import '../TeamSection/teamSection.css';
import styled from 'styled-components'; // Import de styled-components



const Collaborators = () => {
  const staticAdvisors = [
    {
      _id: 1,
      Prenom: 'John',
      Nom: 'Doe',
      department: 'Finance',
      email: 'john.doe@example.com',
      Gmail: 'john.doe',
      Instagram: 'john.doe',
      Linkedin: 'john.doe',
      image: 'img/sidna.jpg'
    },
    {
      _id: 2,
      Prenom: 'Jane',
      Nom: 'Smith',
      department: 'Marketing',
      email: 'jane.smith@example.com',
      Gmail: 'jane.smith',
      Instagram: 'jane.smith',
      Linkedin: 'jane.smith',
      image: 'img/bahia.jpg'
    },
    {
      _id: 3,
      Prenom: 'Alice',
      Nom: 'Johnson',
      department: 'Sales',
      email: 'alice.johnson@example.com',
      Gmail: 'alice.johnson',
      Instagram: 'alice.johnson',
      Linkedin: 'alice.johnson',
      image: 'img/yassin.jpg'
    },
    {
      _id: 4,
      Prenom: 'Bob',
      Nom: 'Brown',
      department: 'Development',
      email: 'bob.brown@example.com',
      Gmail: 'bob.brown',
      Instagram: 'bob.brown',
      Linkedin: 'bob.brown',
      image: 'img/raja.jpg'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? staticAdvisors.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % staticAdvisors.length
    );
  };

  const getAdvisorsToDisplay = () => {
    if (staticAdvisors.length <= 3) {
      return staticAdvisors;
    }

    const startIndex = currentIndex % staticAdvisors.length;
    return [
      staticAdvisors[startIndex],
      staticAdvisors[(startIndex + 1) % staticAdvisors.length],
      staticAdvisors[(startIndex + 2) % staticAdvisors.length],
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
            <img src={advisor.image} alt="" />
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

export default Collaborators;
