import React from 'react';
import { Zoom } from 'react-reveal';


const AboutUs = () => {
  return (
    <div className='B'>
    <button className="btn btn-primary btn-lg about-button">À Propos</button>
    <h2 className="text-center mt-4">Vouliez vous savoir plus sur notre Cellule d'Ecoute?</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
          <Zoom duration={2000}> {/* Adjust the duration here */}
            <div className="main">
              <div className="service">
                <div className="service-logo">
                  <img src="img/know.png" alt="" />
                </div>
                <h4>Accompagnement</h4>
                <p>
                  Notre cellule d'écoute met l'accent sur l'écoute active et
                  le soutien personnalisé des étudiants. Nous offrons un espace
                  sécurisé et confidentiel où les étudiants peuvent exprimer
                  leurs préoccupations, partager leurs expériences et recevoir
                  un accompagnement adapté à leurs besoins individuels.
                </p>
              </div>
              <div className="shadow1"></div>
              <div className="shadow2"></div>
            </div>
            </Zoom>

          </div>

          <div className="col-md-4">
          <Zoom duration={2000}> {/* Adjust the duration here */}

            <div className="main">
              <div className="service">
                <div className="service-logo">
                  <img src="img/event.png" alt="" />
                </div>
                <h4>Accompagnement</h4>
                <p>
                  Notre cellule d'écoute met l'accent sur l'écoute active et
                  le soutien personnalisé des étudiants. Nous offrons un espace
                  sécurisé et confidentiel où les étudiants peuvent exprimer
                  leurs préoccupations, partager leurs expériences et recevoir
                  un accompagnement adapté à leurs besoins individuels.
                </p>
              </div>
              <div className="shadow1"></div>
              <div className="shadow2"></div>
            </div>
            </Zoom>

          </div>

          <div className="col-md-4">
          <Zoom duration={2000}> {/* Adjust the duration here */}

            <div className="main">
              <div className="service">
                <div className="service-logo">
                  <img src="img/support.png" alt="" />
                </div>
                <h4>Accompagnement</h4>
                <p>
                  Notre cellule d'écoute met l'accent sur l'écoute active et
                  le soutien personnalisé des étudiants. Nous offrons un espace
                  sécurisé et confidentiel où les étudiants peuvent exprimer
                  leurs préoccupations, partager leurs expériences et recevoir
                  un accompagnement adapté à leurs besoins individuels.
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
