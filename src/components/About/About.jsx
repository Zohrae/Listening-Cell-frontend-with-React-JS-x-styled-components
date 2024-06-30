import React from 'react';
import { Zoom } from 'react-reveal';
import './about.css'

const AboutUs = () => {
  return (
    <div id="about" className="about-section">
      <button className="btn btn-primary btn-lg about-button">À Propos</button>
      <h2 className="text-center mt-4">Vouliez vous savoir plus sur notre Cellule d'Ecoute?</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Zoom duration={2000}>
              <div className="main">
                <div className="service">
                  <div className="service-logo">
                    <img src="img/know.png" alt="" />
                  </div>
                  <h4>Accompagnement</h4>
                  <p>
                  Notre cellule d'écoute propose une écoute active et un soutien personnalisé 
                  aux étudiants dans un espace sécurisé et confidentiel.
                  </p>
                </div>
                <div className="shadow1"></div>
                <div className="shadow2"></div>
              </div>
            </Zoom>
          </div>

          <div className="col-md-4">
            <Zoom duration={2000}>
              <div className="main">
                <div className="service">
                  <div className="service-logo">
                    <img src="img/event.png" alt="" />
                  </div>
                  <h4>Support et Guide</h4>
                  <p>
                  Notre équipe offre un soutien personnalisé et confidentiel aux étudiants, les aidant à surmonter leurs défis académiques et personnels.                  </p>
                </div>
                <div className="shadow1"></div>
                <div className="shadow2"></div>
              </div>
            </Zoom>
          </div>

          <div className="col-md-4">
            <Zoom duration={2000}>
              <div className="main">
                <div className="service">
                  <div className="service-logo">
                    <img src="img/support.png" alt="" />
                  </div>
                  <h4>Événements</h4>
                  <p>
                  Nous planifions des événements pour renforcer le bien-être mental des étudiants, offrant un espace sûr et des ressources essentielles pour les aider à s'épanouir.
                  </p>
                </div>
                <div className="shadow1"></div>
                <div className="shadow2"></div>
              </div>
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
