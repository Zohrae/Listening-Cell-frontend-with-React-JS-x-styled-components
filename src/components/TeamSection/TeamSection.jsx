
import React, { useState, useEffect } from 'react';

const TeamSection = () => {
  const [advisors, setAdvisors] = useState([]);
  

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

  return (
    <html>
      <head>
        <title> Our Team Section Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className='bodi'>
      <div className="team-section-container">
        <div className="main2">
          {advisors.map(advisor => (
            <div className="profile-card" key={advisor.idUtilisateur}>
              <div className="img">
                <img src="img/sidna.jpg" alt="Profile 1" />
              </div>
              <div className="caption">
              <h3>{advisor.Prenom} {advisor.Nom}</h3>
            <p>{advisor.department}</p>
                <div className="social-links">
                <a href={`mailto:${advisor.Gmail}`}><i className="fab fa-facebook"></i></a>
                <a href={`https://www.instagram.com/${advisor.Instagram}`}><i className="fab fa-instagram"></i></a>
                <a href={`https://www.linkedin.com/in/${advisor.Linkedin}`}><i className="fab fa-linkedin"></i></a>


                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

      </body>
    </html>
  );
};

export default TeamSection;
